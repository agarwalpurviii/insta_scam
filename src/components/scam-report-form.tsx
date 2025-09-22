'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitScamReport, type ScamReportFormState } from '@/app/report/actions';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ShieldAlert, Loader2 } from 'lucide-react';

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
    const [category, setCategory] = useState('');
    return (
        <Select name="category" required value={category} onValueChange={setCategory}>
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
    
    const initialState: ScamReportFormState = {
        message: '',
        isScam: null,
        reasoning: null,
        success: false,
    };
    const [state, formAction] = useFormState(submitScamReport, initialState);

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
                        <Textarea
                            id="evidence"
                            name="evidence"
                            placeholder="Provide links to screenshots, transaction records, or any other evidence. Separate multiple links with commas."
                        />
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
