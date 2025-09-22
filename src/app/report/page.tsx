import { ScamReportForm } from '@/components/scam-report-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

function QuickSafetyTips() {
    return (
        <Card className="bg-card/50 mb-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                    Quick Safety Tips
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Always verify seller identity before making payments.</li>
                    <li>Use secure payment methods with buyer protection.</li>
                    <li>Be suspicious of deals that seem too good to be true.</li>
                    <li>Check for verified badges and authentic follower engagement.</li>
                </ul>
            </CardContent>
        </Card>
    );
}


export default function ReportPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Report a Scammer</h1>
        <p className="mt-4 text-muted-foreground">
          Help our community by submitting a detailed report of scam activity.
          Your contribution can prevent others from falling victim.
        </p>
      </div>
      <QuickSafetyTips />
      <ScamReportForm />
    </div>
  );
}
