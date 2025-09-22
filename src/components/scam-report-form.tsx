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
import { ShieldAlert, Loader2, UploadCloud, FileText, Image, Link as LinkIcon } from 'lucide-react';
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
    
    const initialState: ScamReportFormState = {
        message: '',
        isScam: null,
        reasoning: null,
        imageAnalysisSummary: null,
        imageSources: [],
        success: false,
    };
    const [state, formAction] = useActionState(submitScamReport, initialState);


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
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
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
                        </div>
                    </div>

                    {/* Evidence Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold font-headline">Evidence*</h3>
                         <div className="relative flex items-center justify-center w-full">
                            <label htmlFor="evidence-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">Upload screenshots, chat logs, payment receipts, or other evidence</p>
                                    <Button type="button" size="sm" variant="secondary" className="pointer-events-none mt-2">Choose File</Button>
                                    <p className="text-xs text-muted-foreground mt-4">Required. Max 1 file, 5MB. JPG, PNG supported.</p>
                                </div>
                                <Input id="evidence-file" ref={fileInputRef} name="evidence" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" required />
                            </label>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold font-headline">Your Contact Information (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="reporterName">Your Name</Label>
                                <Input id="reporterName" name="reporterName" placeholder="Anonymous" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reporterEmail">Your Email</Label>
                                <Input id="reporterEmail" name="reporterEmail" type="email" placeholder="For follow-up questions" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                    <SubmitButton />

                    {state.success && (
                        <div className="w-full space-y-4">
                            <Alert variant={state.isScam ? "destructive" : "default"} className="w-full">
                                <ShieldAlert className="h-4 w-4" />
                                <AlertTitle className="font-headline">
                                    {state.isScam ? "High Probability of Scam Detected" : "Analysis Complete"}
                                </AlertTitle>
                                <AlertDescription>
                                    {state.reasoning}
                                </AlertDescription>
                            </Alert>

                            {state.imageAnalysisSummary && (
                                 <Card className="bg-muted/50">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-base font-headline">
                                            <Image className="h-5 w-5" />
                                            Evidence Image Analysis
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-muted-foreground">{state.imageAnalysisSummary}</p>
                                        {state.imageSources.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2">Potential Sources Found:</h4>
                                                <div className="space-y-2">
                                                    {state.imageSources.map((source, index) => (
                                                        <a 
                                                            key={index}
                                                            href={source.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="flex items-center gap-2 text-sm text-primary hover:underline break-all"
                                                        >
                                                            <LinkIcon className="h-4 w-4 flex-shrink-0" />
                                                            {source.url}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}
