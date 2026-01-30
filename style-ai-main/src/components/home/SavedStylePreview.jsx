import { Link } from 'react-router-dom';
import { Shirt, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

export function SavedStylePreview() {
    const { user, savedStyles } = useStore();
    const hasStyles = user && savedStyles.length > 0;

    // Mock styles for display if user has none or not logged in, just for the "preview" logic if I want to show what it looks like.
    // But requirement says: "If not logged in: Soft illustration + CTA".

    return (
        <section className="py-20 md:py-28 bg-muted">
            <div className="container">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-small text-accent mb-4 block">Your Digital Wardrobe</span>
                        <h2 className="text-section text-foreground">Saved Styles</h2>
                    </div>
                    {hasStyles && (
                        <Link to="/saved-styles" className="hidden md:flex items-center gap-2 text-sm font-medium underline-gold text-foreground">
                            View All
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>

                {hasStyles ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {savedStyles.slice(0, 3).map((style, index) => (
                            <div key={style.id || index} className="bg-background rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-display text-lg">{style.name || `Outfit #${index + 1}`}</h3>
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                        95% Match
                                    </span>
                                </div>
                                {/* Visual representation of outfit - simplified */}
                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                                        {style.top?.image ? (
                                            <img src={style.top.image} alt="Top" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-50">Top</div>
                                        )}
                                    </div>
                                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                                        {style.bottom?.image ? (
                                            <img src={style.bottom.image} alt="Bottom" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-50">Btm</div>
                                        )}
                                    </div>
                                </div>
                                <Link to="/saved-styles">
                                    <Button variant="outline" className="w-full btn-outline">View Details</Button>
                                </Link>
                            </div>
                        ))}
                        <div className="bg-background/50 border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-background transition-colors cursor-pointer group">
                            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                <Plus className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="font-display text-lg mb-2">Create New Look</h3>
                            <p className="text-sm text-muted-foreground">Mix & match to find your perfect style</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-background rounded-2xl p-12 text-center max-w-3xl mx-auto shadow-subtle border border-border/50">
                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shirt className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-display font-medium mb-4 text-foreground">Start Building Your Wardrobe</h3>
                        <p className="text-muted-foreground mb-8 text-lg font-light">
                            {user
                                ? "You haven't saved any styles yet. Start exploring collections to create your perfect outfits."
                                : "Log in to save your favorite outfit combinations and access them anytime."}
                        </p>
                        <Link to={user ? "/collections" : "/login"}>
                            <Button size="lg" className="btn-primary">
                                {user ? "Create First Style" : "Login to Save Styles"}
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
