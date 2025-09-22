import { ScamAccountCard } from '@/components/scam-account-card';
import { scamAccounts } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function DirectoryPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Directory of Scam Accounts</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Browse our list of community-reported fraudulent Instagram accounts.
        </p>
      </div>
      <div className="mb-8 max-w-lg mx-auto">
        <form className="flex gap-2">
          <Input
            type="text"
            placeholder="Search by Instagram ID or category..."
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </form>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scamAccounts.map((account) => (
          <ScamAccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}
