import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function SearchPage() {
  const searchResult = {
    instagramId: '@fake_designer_store',
    status: 'verified_scam',
    reportCount: 23,
    lastSeen: '2 days ago',
    risk: 'high',
    id: '1', 
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Verify Seller Safety</h1>
        <p className="mt-4 text-muted-foreground">
          Search our database of verified scam accounts and suspicious sellers
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Search className="h-6 w-6" />
            Advanced Seller Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="instagram-username" className="text-sm font-medium text-muted-foreground">Instagram username</label>
                <Input id="instagram-username" placeholder="e.g., fraudulent_seller" />
              </div>
              <div className="space-y-2">
                 <label htmlFor="seller-name" className="text-sm font-medium text-muted-foreground">Seller name or business</label>
                <Input id="seller-name" placeholder="e.g., Fake Kicks Inc." />
              </div>
              <div className="space-y-2">
                 <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">Phone number (optional)</label>
                <Input id="phone" placeholder="e.g., 555-123-4567" />
              </div>
              <div className="space-y-2">
                 <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email (optional)</label>
                <Input id="email" placeholder="e.g., scammer@email.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                 <label htmlFor="website" className="text-sm font-medium text-muted-foreground">Website/Link (optional)</label>
                <Input id="website" placeholder="e.g., www.fakestore.com" />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full md:w-auto">Search Database</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-6 font-headline">Search Results</h2>
        <div className="space-y-4">
            <Card className="border-l-4 border-primary">
                <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-xl font-bold font-headline">{searchResult.instagramId}</h3>
                            <Badge variant="destructive">
                                <AlertTriangle className="mr-1 h-4 w-4" />
                                Verified Scam
                            </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
                            <span><span className="font-bold text-primary">{searchResult.reportCount}</span> reports</span>
                            <span>Last seen: {searchResult.lastSeen}</span>
                            <span>Risk: <span className="font-bold text-primary capitalize">{searchResult.risk}</span></span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
                        <Button variant="secondary" className="w-full md:w-auto" asChild>
                           <Link href={`/directory/${searchResult.id}`}>View Details</Link>
                        </Button>
                         <Button className="w-full md:w-auto" asChild>
                           <Link href="/report">Report More</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
