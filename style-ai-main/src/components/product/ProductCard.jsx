import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { QuickShopModal } from './QuickShopModal';
import { toast } from 'sonner';

export function ProductCard({ product, className }) {
    const { addToWishlist, removeFromWishlist, isInWishlist, user } = useStore();
    const [isQuickShopOpen, setIsQuickShopOpen] = useState(false);
    const inWishlist = isInWishlist(product.id);
    const navigate = useNavigate();

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.error("Please log in to save items");
            navigate('/login');
            return;
        }

        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <>
            <div
                className={cn('card-product group relative', className)}
                onClick={() => setIsQuickShopOpen(true)}
            >
                <div>
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-2 img-zoom"
                            loading="lazy"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                                    New
                                </span>
                            )}
                            {product.isSale && product.originalPrice && (
                                <span className="bg-rose text-rose-foreground text-xs font-medium px-2 py-1 rounded">
                                    Sale
                                </span>
                            )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                            onClick={handleWishlistToggle}
                            className={cn(
                                'absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-background',
                                inWishlist && 'text-rose'
                            )}
                            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            <Heart
                                className={cn(
                                    'h-4 w-4 transition-colors',
                                    inWishlist ? 'fill-rose text-rose' : 'text-foreground'
                                )}
                            />
                        </button>

                        {/* Quick Shop Text/Overlay on Hover */}
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <span className="text-white font-medium tracking-wide">Quick View</span>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                        <h3 className="text-card-title mb-1 line-clamp-1">{product.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                    ₹{product.originalPrice}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div >

            <QuickShopModal
                product={product}
                isOpen={isQuickShopOpen}
                onClose={() => setIsQuickShopOpen(false)}
            />
        </>
    );
}
