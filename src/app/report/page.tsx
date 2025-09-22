import { ScamReportForm } from '@/components/scam-report-form';

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
      <ScamReportForm />
    </div>
  );
}
