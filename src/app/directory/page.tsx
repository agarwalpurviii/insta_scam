import { ScammerProfileCard } from '@/components/scammer-profile-card';
import { scamAccounts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShieldCheck, Hourglass, DollarSign } from 'lucide-react';

const stats = [
  { title: 'Total Scammers', value: '2,347', color: 'text-destructive' },
  { title: 'Verified Scams', value: '1,923', color: 'text-destructive' },
  { title: 'Under Review', value: '424', color: 'text-yellow-500' },
  { title: 'Total Losses', value: '$1.2M', color: 'text-green-500' },
];

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-transparent border-border/50 text-center">
              <CardHeader className="flex flex-col items-center justify-center space-y-2 pb-2">
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
            {scamAccounts.map((account) => (
                <ScammerProfileCard key={account.id} account={account} />
            ))}
        </div>
      </div>
    </div>
  );
}
