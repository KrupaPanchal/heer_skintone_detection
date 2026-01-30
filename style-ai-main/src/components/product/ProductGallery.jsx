import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function ProductGallery({ product }) {
    // Generate dummy images if product only has one
    const images = product.images || [
        product.image,
        product.image, // Placeholder for Side View
        product.image, // Placeholder for Back View
        product.image, // Placeholder for Fabric
    ];

    const [mainImage, setMainImage] = useState(images[0]);
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 h-full sticky top-24">
            {/* Thumbnails (Left on Desktop, Bottom on Mobile) */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:h-[600px] scrollbar-hide py-2 lg:py-0 px-1">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setMainImage(img)}
                        className={cn(
                            "relative flex-shrink-0 w-20 h-24 lg:w-24 lg:h-32 rounded-lg overflow-hidden border-2 transition-all",
                            mainImage === img ? "border-primary shadow-md" : "border-transparent hover:border-primary/50"
                        )}
                    >
                        <img
                            src={img}
                            alt={`${product.name} view ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative group bg-secondary/30 rounded-2xl overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-[600px]">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <Badge variant="secondary" className="gap-1 bg-white/90 backdrop-blur text-primary border-primary/20 shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        AI Recommended
                    </Badge>
                    {/* Dynamic Skin Tone Badge (Mock logic) */}
                    <Badge variant="outline" className="bg-black/5 backdrop-blur border-white/20 text-white">
                        Best for {['Warm', 'Cool', 'Neutral'][Math.floor(Math.random() * 3)]} Skin
                    </Badge>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-5 w-5" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] h-[90vh] p-0 overflow-hidden bg-black/95 border-none">
                        <div className="w-full h-full flex items-center justify-center">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </DialogContent>
                </Dialog>


                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 cursor-zoom-in"
                />
            </div>
        </div>
    );
}
