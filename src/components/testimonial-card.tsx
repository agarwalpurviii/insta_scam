import type { Testimonial } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const evidencePlaceholders = testimonial.evidenceLinks
    .map(link => PlaceHolderImages.find(p => p.imageUrl === link))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

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
        {evidencePlaceholders.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Submitted Evidence:</h4>
            <div className="flex flex-wrap gap-4">
              {evidencePlaceholders.map((placeholder, index) => (
                <a href={placeholder.imageUrl} key={index} target="_blank" rel="noopener noreferrer" className="block rounded-md overflow-hidden border hover:opacity-80 transition-opacity">
                  <Image
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    width={200}
                    height={100}
                    className="object-cover"
                    data-ai-hint={placeholder.imageHint}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
