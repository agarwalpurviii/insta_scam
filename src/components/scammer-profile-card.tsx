import type { ScamAccount } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, DollarSign, Clock, Instagram, Users } from 'lucide-react';
import Link from 'next/link';

type ScamAccountProps = {
  account: ScamAccount;
};

export function ScammerProfileCard({ account }: ScamAccountProps) {
  const isVerified = account.status === 'verified_scam';

  return (
    <Card className="bg-card/60 border border-border/40 p-4 shadow-md hover:border-primary/50 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
              <h3 className="text-xl font-bold font-headline">{account.instagramId}</h3>
              <div className="flex items-center gap-2">
                  <Badge variant={isVerified ? 'destructive' : 'secondary'}>
                    {isVerified ? 'Verified Scam' : 'Under Investigation'}
                  </Badge>
                  <Badge variant="outline">{account.scamType}</Badge>
              </div>
          </div>
           <p className="text-sm text-muted-foreground mb-4">{account.displayName}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <span><span className="font-bold text-foreground">{account.reportCount}</span> reports</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                 <span><span className="font-bold text-foreground">${account.amountLost.toLocaleString()}</span> lost</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span><span className="font-bold text-foreground">{account.followers}</span> followers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Active <span className="font-bold text-foreground">{account.lastActive}</span></span>
              </div>
          </div>
           <p className="text-xs text-muted-foreground">Verified by {account.verifiedBy} community members</p>
        </div>

        <div className="md:col-span-1 flex flex-col items-stretch justify-center gap-2">
            <Button variant="secondary" size="sm" asChild>
                <Link href={`/directory/${account.id}`}>
                    View Details
                </Link>
            </Button>
            <Button variant="destructive" size="sm" asChild>
                 <Link href="/report">
                    Add Report
                </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
                <Link 
                    href={`https://www.instagram.com/${account.instagramId.substring(1)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground justify-center"
                >
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                </Link>
            </Button>
        </div>
      </div>
    </Card>
  );
}
