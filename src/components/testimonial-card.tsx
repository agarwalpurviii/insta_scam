import type { Testimonial } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import Image from 'next/image';

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
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
                <span>Date: <span className="font-semibold text-foreground">{new Date(testimonial.date).toLocaleDateString()}</span></span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{testimonial.content}</p>
        {testimonial.evidenceLinks.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Submitted Evidence:</h4>
            <div className="flex flex-wrap gap-4">
              {testimonial.evidenceLinks.map((link, index) => (
                <a href={link} key={index} target="_blank" rel="noopener noreferrer" className="block rounded-md overflow-hidden border hover:opacity-80 transition-opacity">
                  <Image
                    src={link}
                    alt={`Evidence ${index + 1}`}
                    width={200}
                    height={100}
                    className="object-cover"
                    data-ai-hint="receipt screenshot"
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
