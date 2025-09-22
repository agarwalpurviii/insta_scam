'use client';

import { useFormStatus } from 'react-dom';
import { verifyImageAction, type ImageSearchFormState } from '@/app/image-search/actions';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ShieldAlert, Loader2, UploadCloud, Link as LinkIcon } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full md:w-auto" size="lg">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Search for Image Sources
        </Button>
    );
}

export function ImageSearchForm() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const initialState: ImageSearchFormState = {
        message: '',
        summary: null,
        sources: [],
        success: false,
    };
    const [state, formAction] = useActionState(verifyImageAction, initialState);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    useEffect(() => {
        if (state.message && !state.success) {
            toast({
                variant: 'destructive',
                title: 'Error processing image',
                description: state.message,
            });
        }
        if (state.success) {
            formRef.current?.reset();
            setPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [state, toast]);

    return (
        <div>
            <form
                ref={formRef}
                action={formAction}
                className="space-y-8"
            >
                <div className="space-y-4">
                    <div className="relative flex items-center justify-center w-full">
                        <label htmlFor="productImage" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                            {preview ? (
                                <img src={preview} alt="Image preview" className="object-contain h-full w-full p-2" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">Click to upload a product image</p>
                                    <div className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 bg-secondary text-secondary-foreground">Choose File</div>
                                    <p className="text-xs text-muted-foreground mt-4">Max 5MB. JPG, PNG, WEBP supported.</p>
                                </div>
                            )}
                            <Input id="productImage" ref={fileInputRef} name="productImage" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" required onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
                <CardFooter className="p-0">
                    <SubmitButton />
                </CardFooter>
            </form>
            
            {state.success && (
                <div className="mt-8">
                    <Alert variant="default" className="w-full">
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle className="font-headline">
                           Analysis Complete
                        </AlertTitle>
                        <AlertDescription>
                            {state.summary}
                        </AlertDescription>
                    </Alert>
                    
                    {state.sources.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Potential Sources Found:</h3>
                            <div className="space-y-4">
                                {state.sources.map((source, index) => (
                                    <Card key={index} className="bg-card/50">
                                        <CardContent className="p-4">
                                            <a href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline font-medium break-all">
                                                <LinkIcon className="h-4 w-4 flex-shrink-0" />
                                                {source.url}
                                            </a>
                                            <p className="text-muted-foreground text-sm mt-2">{source.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
