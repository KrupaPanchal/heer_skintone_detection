import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { QuickShopModal } from '@/components/product/QuickShopModal';
import { useState } from 'react';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useStore();
    const [quickShopProduct, setQuickShopProduct] = useState(null);

    return (
        <div className="min-h-screen">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container max-w-4xl">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="text-section mb-2">Wishlist</h1>
                        <p className="text-muted-foreground">
                            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>

                    {wishlist.length > 0 ? (
                        <div className="space-y-4">
                            {wishlist.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 md:gap-6 p-4 bg-card rounded-lg border border-border"
                                >
                                    {/* Image */}
                                    <Link to={`/product/${item.id}`} className="shrink-0">
                                        <div className="w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden bg-secondary">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <Link to={`/product/${item.id}`}>
                                                <h3 className="font-display text-lg mb-1 hover:text-accent transition-colors">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-muted-foreground capitalize mb-2">
                                                {item.category} • {item.color}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">₹{item.price}</span>
                                                {item.originalPrice && (
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        ₹{item.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <Button
                                                size="sm"
                                                className="gap-2"
                                                onClick={() => setQuickShopProduct(item)}
                                            >
                                                <ShoppingBag className="h-4 w-4" />
                                                Add to Bag
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="gap-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                                <Heart className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h2 className="font-display text-2xl mb-2">Your wishlist is empty</h2>
                            <p className="text-muted-foreground mb-6">
                                Start saving items you love by clicking the heart icon
                            </p>
                            <Link to="/collections">
                                <Button className="btn-primary">Start Shopping</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {quickShopProduct && (
                <QuickShopModal
                    product={quickShopProduct}
                    isOpen={!!quickShopProduct}
                    onClose={() => setQuickShopProduct(null)}
                />
            )}
        </div>
    );
}
