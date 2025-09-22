import { Card, CardContent } from '@/components/ui/card';
import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HomeTestimonial } from '@/lib/testimonials';

type HomeTestimonialCardProps = {
  testimonial: HomeTestimonial;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-5 w-5',
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'
          )}
        />
      ))}
    </div>
  );
}

export function HomeTestimonialCard({ testimonial }: HomeTestimonialCardProps) {
  const isLoss = testimonial.statusType === 'lost';
  const isSaved = testimonial.statusType === 'saved';

  return (
    <Card className={cn(
        "bg-card/80 border-2 border-transparent relative overflow-hidden p-6 flex flex-col h-full",
        isLoss && "border-l-primary"
    )}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
            <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" /> Verified
                </span>
            </div>
            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      <CardContent className="p-0 flex-grow">
        <p className="text-muted-foreground">&ldquo;{testimonial.text}&rdquo;</p>
      </CardContent>

      <div className="mt-6 pt-4">
        {isLoss && (
            <div className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-destructive/10 text-primary border border-destructive/20">
                Lost ${testimonial.amount} &bull; Helped Others
            </div>
        )}
        {isSaved && (
             <div className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-green-600/10 text-green-400 border border-green-600/20">
                Saved ${testimonial.amount}
            </div>
        )}
      </div>
    </Card>
  );
}
