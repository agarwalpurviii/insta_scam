'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScamAccountCard } from '@/components/scam-account-card';
import type { ScamAccount } from '@/lib/types';

type DirectoryTabsProps = {
  accounts: ScamAccount[];
};

export function DirectoryTabs({ accounts }: DirectoryTabsProps) {
  const categories = [
    'All',
    'Fashion & Apparel',
    'Electronics',
    'Jewelry & Accessories',
    'Pets',
    'Other',
  ];

  return (
    <Tabs defaultValue="All" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value="All">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <ScamAccountCard key={account.id} account={account} />
          ))}
        </div>
      </TabsContent>
      {categories.slice(1).map((category) => (
        <TabsContent key={category} value={category}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts
              .filter((account) => account.category === category || (category === 'Other' && account.category.toLowerCase() === 'other'))
              .map((account) => (
                <ScamAccountCard key={account.id} account={account} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
