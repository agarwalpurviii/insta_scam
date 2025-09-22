import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { getImagePlaceholderById, type ImagePlaceholder } from '@/lib/placeholder-images';

type EvidencePhotoProps = {
  evidenceId: string;
};

export function EvidencePhoto({ evidenceId }: EvidencePhotoProps) {
  const imagePlaceholder = getImagePlaceholderById(evidenceId);

  if (!imagePlaceholder) {
    return null;
  }
  
  const [_, seed, widthStr, heightStr] = imagePlaceholder.imageUrl.split('/').slice(3);
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Image
          src={imagePlaceholder.imageUrl}
          alt={imagePlaceholder.description}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          data-ai-hint={imagePlaceholder.imageHint}
        />
      </CardContent>
    </Card>
  );
}
