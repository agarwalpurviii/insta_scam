import { scamAccounts } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ScamAccountCard } from '@/components/scam-account-card';
import type { ScamAccount } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DirectoryPage() {
  const categories = [
    'Fashion & Apparel',
    'Electronics',
    'Jewelry & Accessories',
    'Pets',
    'Financial Scams',
    'Home Goods',
    'Health & Beauty',
    'Other',
  ];

  const categoryImageMap: Record<string, string> = {
    'Fashion & Apparel': 'sneaker2',
    'Electronics': 'iphone1',
    'Jewelry & Accessories': 'jewelry1',
    'Pets': 'pet1',
    'Financial Scams': 'finance1',
    'Home Goods': 'home1',
    'Health & Beauty': 'health1',
    'Other': 'ev9', // Using a generic evidence image for 'Other'
  };

  const groupedAccounts = categories.reduce((acc, category) => {
    const accountsInCategory = scamAccounts.filter(
      (account) => account.category === category
    );
    if (accountsInCategory.length > 0) {
      acc[category] = accountsInCategory;
    }
    return acc;
  }, {} as Record<string, ScamAccount[]>);

  const getImageForCategory = (category: string) => {
    const imageId = categoryImageMap[category];
    return PlaceHolderImages.find(img => img.id === imageId);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Directory of Scam Accounts</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Browse our list of community-reported fraudulent Instagram accounts.
        </p>
      </div>
      <div className="mb-12 max-w-lg mx-auto">
        <form className="flex gap-2">
          <Input
            type="text"
            placeholder="Search by Instagram ID..."
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </form>
      </div>
      
      <div className="space-y-12">
        {Object.entries(groupedAccounts).map(([category, accounts]) => {
            const image = getImageForCategory(category);
            return (
              <section key={category}>
                <h2 className="text-2xl font-bold font-headline mb-4">{category}</h2>
                {image && (
                  <div className="mb-6 rounded-lg overflow-hidden relative aspect-video max-h-[250px] w-full">
                    <Image
                      src={image.imageUrl}
                      alt={`Reference image for ${category} scams`}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accounts.map((account) => (
                    <ScamAccountCard key={account.id} account={account} />
                  ))}
                </div>
                <Separator className="mt-12" />
              </section>
            );
        })}
      </div>
    </div>
  );
}
