import Link from 'next/link';
import type { ScamAccount } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

type ScamAccountCardProps = {
  account: ScamAccount;
};

export function ScamAccountCard({ account }: ScamAccountCardProps) {
  const isVerifiedScam = account.status === 'verified_scam';

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold font-headline">{account.instagramId}</CardTitle>
            <Badge variant={isVerifiedScam ? 'destructive' : 'secondary'}>
                {isVerifiedScam ? <AlertTriangle className="mr-1 h-4 w-4" /> : <CheckCircle2 className="mr-1 h-4 w-4" />}
                {isVerifiedScam ? 'Verified Scam' : 'Under Investigation'}
            </Badge>
        </div>
        <CardDescription>{account.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground space-y-2">
            <p>Reports: <span className="font-semibold text-foreground">{account.reportCount}</span></p>
            <p>Last Reported: <span className="font-semibold text-foreground">{new Date(account.lastReported).toLocaleDateString()}</span></p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/directory/${account.id}`}>View Details & Testimonials</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
