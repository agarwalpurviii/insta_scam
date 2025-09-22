import Image from 'next/image';
import { getImagePlaceholderById } from '@/lib/placeholder-images';

type EvidencePhotoProps = {
  evidenceId: string;
};

export function EvidencePhoto({ evidenceId }: EvidencePhotoProps) {
  const imagePlaceholder = getImagePlaceholderById(evidenceId);

  if (!imagePlaceholder) {
    return null;
  }
  
  // Extract width and height from picsum URL, e.g. https://picsum.photos/seed/ev1/400/200
  const urlParts = imagePlaceholder.imageUrl.split('/');
  const height = parseInt(urlParts.pop() || '200', 10);
  const width = parseInt(urlParts.pop() || '400', 10);


  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-md group">
       <Image
        src={imagePlaceholder.imageUrl}
        alt={imagePlaceholder.description}
        width={width}
        height={height}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        data-ai-hint={imagePlaceholder.imageHint}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
        <p className="text-white text-xs text-center">{imagePlaceholder.description}</p>
      </div>
    </div>
  );
}
