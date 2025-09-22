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
import { ShieldAlert, Loader2, UploadCloud, X, FileText } from 'lucide-react';
import Image from 'next/image';
import { DatePicker } from './ui/date-picker';


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full md:w-auto" size="lg">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Analyze & Submit Report
        </Button>
    );
}

function CategorySelect() {
    return (
        <Select name="scamType" required>
            <SelectTrigger id="scamType">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                <SelectItem value="pets">Pets</SelectItem>
                <SelectItem value="financial">Financial Scams</SelectItem>
                <SelectItem value="home_goods">Home Goods</SelectItem>
                <SelectItem value="health_beauty">Health & Beauty</SelectItem>
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
                title: 'Error submitting report',
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
                    <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                        <FileText className="h-6 w-6" />
                        Scam Report Form
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Scammer Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold font-headline">Scammer Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="instagramUsername">Instagram Username*</Label>
                                <Input id="instagramUsername" name="instagramUsername" placeholder="@scammer_account" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input id="displayName" name="displayName" placeholder="Fake Store Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" name="phone" placeholder="+1 (555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" type="email" placeholder="scammer@fake.com" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="website">Website/Additional Links</Label>
                                <Input id="website" name="website" placeholder="https://fake-store.com" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Incident Details Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold font-headline">Incident Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="scamType">Type of Scam*</Label>
                                <CategorySelect />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amountLost">Amount Lost (USD)</Label>
                                <Input id="amountLost" name="amountLost" type="number" placeholder="0.00" step="0.01" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="incidentDate">When did this happen?</Label>
                                <DatePicker name="incidentDate" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="scamDetails">Detailed Description*</Label>
                                <Textarea
                                    id="scamDetails"
                                    name="scamDetails"
                                    placeholder="Describe what happened in detail. Include dates, conversation summaries, etc."
                                    className="min-h-[120px]"
                                    required
                                    minLength={20}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="evidence">Evidence</Label>
                                <div className="relative flex items-center justify-center w-full">
                                {!imagePreview ? (
                                        <label htmlFor="evidence-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 5MB)</p>
                                            </div>
                                            <Input id="evidence-file" ref={fileInputRef} name="evidence" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
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
