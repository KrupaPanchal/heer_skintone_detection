import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function QuickShopModal({ product, isOpen, onClose }) {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, user } = useStore();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please log in to add items to bag");
            navigate('/login');
            onClose();
            return;
        }

        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }
        addToCart(product, selectedSize, product.color);
        toast.success('Added to bag', {
            description: `${product.name} - Size ${selectedSize}`,
        });
        onClose();
        setSelectedSize('');
        setQuantity(1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
                <DialogHeader className="sr-only">
                    <DialogTitle>Quick Shop - {product.name}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="sm:w-1/2 aspect-[3/4] bg-secondary">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="sm:w-1/2 p-6 flex flex-col">
                        <h2 className="font-display text-xl mb-2">{product.name}</h2>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-lg font-medium">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                    ₹{product.originalPrice}
                                </span>
                            )}
                        </div>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <label className="text-small mb-3 block">Size</label>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={cn(
                                            'h-10 min-w-[2.5rem] px-3 border rounded text-sm font-medium transition-all duration-200',
                                            selectedSize === size
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border hover:border-primary'
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="text-small mb-3 block">Quantity</label>
                            <div className="flex items-center border border-border rounded w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-10 w-10 flex items-center justify-center hover:bg-secondary transition-colors"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="h-10 w-10 flex items-center justify-center hover:bg-secondary transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <Button onClick={handleAddToCart} className="w-full btn-primary mt-auto">
                            Add to Bag — ₹{(product.price * quantity).toFixed(2)}
                        </Button>

                        {/* Add to Wishlist */}
                        <Button
                            variant="ghost"
                            className="w-full mt-3 gap-2 border border-border"
                            onClick={() => {
                                if (!user) {
                                    toast.error("Please log in to save items");
                                    navigate('/login');
                                    onClose();
                                    return;
                                }

                                if (isInWishlist(product.id)) {
                                    removeFromWishlist(product.id);
                                    toast.success("Removed from Saved Styles");
                                } else {
                                    addToWishlist(product);
                                    toast.success("Added to Saved Styles");
                                }
                            }}
                        >
                            <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-rose text-rose")} />
                            {isInWishlist(product.id) ? "Saved to Styles" : "Add to Saved Styles"}
                        </Button>

                        <div className="mt-4 text-center">
                            <Link
                                to={`/product/${product.id}`}
                                className="text-sm text-muted-foreground hover:text-foreground underline"
                                onClick={onClose}
                            >
                                View full details
                            </Link>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
