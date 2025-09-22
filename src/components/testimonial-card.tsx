import type { Testimonial } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const evidenceImages = testimonial.evidenceLinks
    .map(link => PlaceHolderImages.find(img => img.imageUrl === link))
    .filter(Boolean);

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Report by: <span className="font-semibold text-foreground">{testimonial.author}</span></span>
            </div>
            <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Date: <span className="font-semibold text-foreground">{formatDate(testimonial.date)}</span></span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{testimonial.content}</p>
        {evidenceImages.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-foreground">Submitted Evidence:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {evidenceImages.map((image) => image && (
                <div key={image.id} className="relative aspect-video rounded-md overflow-hidden border">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
