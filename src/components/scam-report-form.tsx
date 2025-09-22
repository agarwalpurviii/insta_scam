'use client';

import { useFormStatus } from 'react-dom';
import { submitScamReport, type ScamReportFormState } from '@/app/report/actions';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ShieldAlert, Loader2, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Analyze & Submit Report
        </Button>
    );
}

function CategorySelect() {
    return (
        <Select name="category" required>
            <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                <SelectItem value="pets">Pets</SelectItem>
                <SelectItem value="other">Other</SelectItem>
            </SelectContent>
        </Select>
    )
}

export function ScamReportForm() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const initialState: ScamReportFormState = {
        message: '',
        isScam: null,
        reasoning: null,
        success: false,
    };
    const [state, formAction] = useActionState(submitScamReport, initialState);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    useEffect(() => {
        if (state.message && !state.success) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
        if (state.success) {
            formRef.current?.reset();
            setImagePreview(null);
        }
    }, [state, toast]);

    return (
        <Card>
            <form
                ref={formRef}
                action={formAction}
            >
                <CardHeader>
                    <CardTitle className="font-headline">Scam Details</CardTitle>
                    <CardDescription>All fields are required. Provide as much detail as possible.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="instagramId">Instagram Seller ID</Label>
                        <Input id="instagramId" name="instagramId" placeholder="@fraudulent_seller" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category of Scam</Label>
                         <CategorySelect />
                    </div>
                    
                     <div className="space-y-2">
                        <Label htmlFor="scamDetails">Detailed Description</Label>
                        <Textarea
                            id="scamDetails"
                            name="scamDetails"
                            placeholder="Describe what happened in detail. Include dates, payment methods, and conversation summaries."
                            className="min-h-[150px]"
                            required
                            minLength={50}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="evidence">Evidence</Label>
                        <div className="relative flex items-center justify-center w-full">
                           {!imagePreview ? (
                                <label htmlFor="evidence-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 5MB)</p>
                                    </div>
                                    <Input id="evidence-file" ref={fileInputRef} name="evidence" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" required />
                                </label>
                            ) : (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                    <Image src={imagePreview} alt="Evidence preview" layout="fill" objectFit="contain" />
                                     <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleRemoveImage}>
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Remove image</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                    <SubmitButton />

                    {state.success && (
                        <Alert variant={state.isScam ? "destructive" : "default"} className="w-full">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle className="font-headline">
                                {state.isScam ? "High Probability of Scam Detected" : "Analysis Complete"}
                            </AlertTitle>
                            <AlertDescription>
                                {state.reasoning}
                            </AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}
