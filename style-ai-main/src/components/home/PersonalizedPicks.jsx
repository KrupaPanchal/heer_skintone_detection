import { Link } from 'react-router-dom';
import { Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useStore } from '@/store/useStore';
import { products } from '@/data/products';

export function PersonalizedPicks() {
    const { savedStyles } = useStore();
    const hasScanned = savedStyles.length > 0;

    // Simulate matched products by taking a few from the list
    const matchedProducts = products.slice(0, 4).map(p => ({ ...p, isMatch: true }));

    return (
        <section className="py-20 bg-background">
            <div className="container">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-4 w-4 text-accent" />
                            <span className="text-small text-accent mb-0 block">AI Curated</span>
                        </div>
                        <h2 className="text-section text-foreground">Picked Just for Your Skin Tone</h2>
                    </div>
                </div>

                {hasScanned ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
                        {matchedProducts.map((product) => (
                            <div key={product.id} className="relative group">
                                <div className="absolute -top-3 -right-3 z-20 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-gold animate-float">
                                    98% Match
                                </div>
                                <div className="ring-2 ring-accent/20 rounded-lg overflow-hidden group-hover:ring-accent transition-all duration-300 shadow-gold">
                                    <ProductCard product={product} />
                                </div>
                            </div>
                        ))}
                        <div className="col-span-full text-center mt-8">
                            <Link to="/collections">
                                <Button variant="outline" className="btn-outline">
                                    View Full Match Collection
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="relative rounded-2xl overflow-hidden bg-secondary border- border-border p-12 text-center">
                        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6">
                            <div className="bg-background p-4 rounded-full shadow-elevated mb-6">
                                <Lock className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-display font-medium mb-3">Unlock Personalization</h3>
                            <p className="text-muted-foreground mb-8 max-w-md">
                                Complete your AI Skin Scan to reveal products perfectly matched to your unique complexion tone.
                            </p>
                            <Link to="/style-scan">
                                <Button size="lg" className="btn-gold gap-2 shadow-gold">
                                    <Sparkles className="h-4 w-4" />
                                    Start AI Skin Scan
                                </Button>
                            </Link>
                        </div>

                        {/* Blurred Background Preview */}
                        <div className="grid grid-cols-4 gap-6 opacity-30 blur-md pointer-events-none">
                            {matchedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
