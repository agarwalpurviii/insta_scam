import { getScamAccountById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { TestimonialCard } from '@/components/testimonial-card';
import { AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';

type PageProps = {
  params: { id: string };
};

export default function ScamAccountDetailsPage({ params }: PageProps) {
  const account = getScamAccountById(params.id);

  if (!account) {
    notFound();
  }

  const isVerifiedScam = account.status === 'verified_scam';

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/directory">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight font-headline">{account.instagramId}</h1>
             <Badge variant={isVerifiedScam ? 'destructive' : 'secondary'} className="text-base px-4 py-2">
                {isVerifiedScam ? <AlertTriangle className="mr-2 h-5 w-5" /> : <CheckCircle2 className="mr-2 h-5 w-5" />}
                {isVerifiedScam ? 'Verified Scam' : 'Under Investigation'}
            </Badge>
        </div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
            <span>Category: <span className="font-semibold text-foreground">{account.category}</span></span>
            <span>Reports: <span className="font-semibold text-foreground">{account.reportCount}</span></span>
            <span>Last Reported: <span className="font-semibold text-foreground">{formatDate(account.lastReported)}</span></span>
        </div>
      </div>
      
      <Separator className="my-8" />

      <div>
        <h2 className="text-3xl font-bold mb-6 font-headline">User Testimonials & Evidence</h2>
        <div className="space-y-6">
          {account.testimonials.length > 0 ? (
            account.testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))
          ) : (
            <p className="text-muted-foreground">No testimonials have been submitted for this account yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
