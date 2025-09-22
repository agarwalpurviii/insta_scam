import { ScammerProfileCard } from '@/components/scammer-profile-card';
import { scamAccounts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShieldCheck, Hourglass, DollarSign, Instagram, ArrowRight } from 'lucide-react';

const stats = [
  { title: 'Total Scammers', value: '2,347', icon: Users, color: 'text-primary' },
  { title: 'Verified Scams', value: '1,923', icon: ShieldCheck, color: 'text-primary' },
  { title: 'Under Review', value: '424', icon: Hourglass, color: 'text-yellow-500' },
  { title: 'Total Losses', value: '$1.2M', icon: DollarSign, color: 'text-green-500' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card/80 border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
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
