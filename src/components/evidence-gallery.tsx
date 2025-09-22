import { getImagePlaceholderById, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from './ui/card';

type EvidenceGalleryProps = {
    evidenceIds: string[];
};

export function EvidenceGallery({ evidenceIds }: EvidenceGalleryProps) {
    const images = evidenceIds
        .map(id => getImagePlaceholderById(id))
        .filter((img): img is ImagePlaceholder => !!img);

    if (images.length === 0) {
        return null;
    }

    return (
        <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Attached Evidence:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map(image => (
                    <Card key={image.id} className="overflow-hidden group">
                        <Link href={image.imageUrl} target="_blank" rel="noopener noreferrer">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                width={400}
                                height={200}
                                className="object-cover w-full h-auto aspect-video group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint={image.imageHint}
                            />
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}
