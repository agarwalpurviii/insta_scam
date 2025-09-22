import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageSearchForm } from '@/components/image-search-form';
import { Image } from 'lucide-react';

export default function ImageSearchPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Reverse Image Search</h1>
        <p className="mt-4 text-muted-foreground">
          Upload a product image to check if it's stolen from another website or a stock photo.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-6 w-6" />
            Verify Product Image
          </CardTitle>
          <CardDescription>
            This tool helps you identify fraudulent sellers who use stolen product photos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageSearchForm />
        </CardContent>
      </Card>
    </div>
  );
}
