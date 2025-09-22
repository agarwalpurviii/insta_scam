
import type { Testimonial } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { EvidencePhoto } from './evidence-photo';

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
                <span>Date: <span className="font-semibold text-foreground">{formatDate(testimonial.date)}</span></span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{testimonial.content}</p>
      </CardContent>
       {testimonial.evidenceLinks && testimonial.evidenceLinks.length > 0 && (
        <CardFooter className="flex-col items-start gap-4">
            <h4 className="text-sm font-semibold text-muted-foreground">Evidence:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {testimonial.evidenceLinks.map((evidenceId) => (
                    <EvidencePhoto key={evidenceId} evidenceId={evidenceId} />
                ))}
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
