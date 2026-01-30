import { useState } from 'react';
import { Heart, Info, Check, ScanFace, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function ProductInfo({ product }) {
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, user } = useStore();
    const [selectedColor, setSelectedColor] = useState(product.color || 'Black');
    const [selectedSize, setSelectedSize] = useState('');
    const navigate = useNavigate();

    // Derived state
    const inWishlist = isInWishlist(product.id);
    const aiSuggestedSize = 'M'; // Mock logic

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please log in to add items to bag");
            navigate('/login');
            return;
        }

        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }
        addToCart(product, selectedSize, selectedColor);
        toast.success(`Added ${product.name} to bag`);
    };

    const handleWishlist = () => {
        if (!user) {
            toast.error("Please log in to save items");
            navigate('/login');
            return;
        }

        if (inWishlist) {
            removeFromWishlist(product.id);
            toast.success("Removed from Saved Styles");
        } else {
            addToWishlist(product);
            toast.success("Added to Saved Styles");
        }
    };

    // Placeholder data for swatches (replace with actual logic if available)
    const swatches = [
        { name: 'Black', hex: '#000000', suitable: true },
        { name: 'Navy', hex: '#000080', suitable: true },
        { name: 'Red', hex: '#FF0000', suitable: false, reason: "May clash with your undertone" },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Title & Price */}
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">{product.name}</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-medium">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                            )}
                            {product.isSale && (
                                <Badge variant="destructive" className="bg-rose">Sale</Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Inclusive of all taxes</p>
                    </div>

                    {/* Share/Wishlist Top Action */}
                    <Button variant="ghost" size="icon" onClick={handleWishlist} className="rounded-full h-12 w-12 hover:bg-rose/10 transition-colors">
                        <Heart className={cn("h-6 w-6", inWishlist && "fill-rose text-rose")} />
                    </Button>
                </div>
            </div>

            {/* AI Skin Tone Match Box */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-4 flex gap-4 items-start">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full text-amber-600 dark:text-amber-400 shrink-0">
                    <ScanFace className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-medium text-amber-900 dark:text-amber-100 flex items-center gap-2">
                        Perfect Match for You <Check className="h-4 w-4" />
                    </h3>
                    <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                        Based on your Warm Undertone, this {selectedColor} shade will make your skin glow!
                    </p>
                    <Button variant="link" className="p-0 h-auto text-amber-700 dark:text-amber-400 text-xs mt-2 gap-1 group">
                        Re-scan My Skin <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                </div>
            </div>

            {/* Color Selection */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Color: <span className="text-muted-foreground font-normal">{selectedColor}</span></span>
                </div>
                <div className="flex flex-wrap gap-3">
                    <TooltipProvider>
                        {swatches.map((swatch) => (
                            <Tooltip key={swatch.name}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setSelectedColor(swatch.name)}
                                        className={cn(
                                            "w-10 h-10 rounded-full border-2 ring-1 ring-offset-2 ring-transparent transition-all",
                                            selectedColor === swatch.name ? "ring-primary" : "hover:ring-primary/30",
                                            !swatch.suitable && "opacity-50 grayscale"
                                        )}
                                        style={{ backgroundColor: swatch.hex }}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    {swatch.suitable ? (
                                        <div className="flex items-center gap-1 text-green-500"><Check className="h-3 w-3" /> Suits You</div>
                                    ) : (
                                        <span className="text-destructive">{swatch.reason}</span>
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Size</span>
                    <Button variant="link" className="h-auto p-0 text-muted-foreground text-xs">Size Guide</Button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                                "h-12 border rounded-md flex flex-col items-center justify-center transition-all relative overflow-hidden",
                                selectedSize === size
                                    ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                                    : "border-border hover:border-primary/50"
                            )}
                        >
                            <span className="font-medium">{size}</span>
                            {size === aiSuggestedSize && (
                                <span className="absolute bottom-0 w-full text-[9px] bg-primary/10 text-primary text-center py-0.5">
                                    AI Pick
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4">
                <Button size="lg" className="w-full btn-primary h-14 text-lg shadow-lg shadow-primary/20" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
                <Button
                    size="lg"
                    variant="secondary"
                    className="w-full h-14 text-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300"
                    onClick={() => {
                        if (!user) {
                            toast.error("Please log in to buy items");
                            navigate('/login');
                            return;
                        }
                        handleAddToCart();
                    }}
                >
                    Buy Now
                </Button>
            </div>

            {/* Delivery check mock */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                <Check className="h-4 w-4 text-green-500" />
                <span>Free delivery by <span className="font-medium text-foreground">Wed, Jan 15</span></span>
            </div>
        </div>
    );
}
