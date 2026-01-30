import { Link } from 'react-router-dom';
import { Trash2, Edit2, Sparkles, Package, ChevronRight, User, MapPin, LogOut } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useStore } from '@/store/useStore';
import { staticRecommendations } from '@/data/products';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SavedStylesPage() {
    const { savedStyles, removeSavedStyle, updateSavedStyleName } = useStore();
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

    const handleEditStart = (id, currentName) => {
        setEditingId(id);
        setEditName(currentName);
    };

    const handleEditSave = (id) => {
        if (editName.trim()) {
            updateSavedStyleName(id, editName.trim());
            toast.success('Style renamed');
        }
        setEditingId(null);
        setEditName('');
    };

    const handleDelete = (id) => {
        removeSavedStyle(id);
        toast.success('Style deleted');
    };

    return (
        <div className="min-h-screen">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container max-w-4xl">
                    {/* Page Header */}
                    <div className="mb-12">
                        <span className="text-small text-accent mb-4 block">Your Profile</span>
                        <h1 className="text-section mb-2">Saved Styles</h1>
                        <p className="text-muted-foreground">
                            View and manage your AI-analyzed style profiles
                        </p>
                    </div>

                    {savedStyles && savedStyles.length > 0 ? (
                        <div className="space-y-6">
                            {savedStyles.filter(s => s).map((style) => (
                                <div key={style.id} className="card-elevated p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            {editingId === style.id ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        className="font-display text-xl bg-transparent border-b border-accent outline-none"
                                                        autoFocus
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleEditSave(style.id);
                                                            if (e.key === 'Escape') setEditingId(null);
                                                        }}
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleEditSave(style.id)}
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            ) : (
                                                <h3 className="font-display text-xl mb-1">{style.name}</h3>
                                            )}
                                            <p className="text-sm text-muted-foreground">
                                                Created {new Date(style.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleEditStart(style.id, style.name)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleDelete(style.id)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Style Details */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-4 bg-secondary rounded-lg">
                                            <p className="text-small mb-1">Skin Tone</p>
                                            <p className="font-display">{style.skinTone}</p>
                                        </div>
                                        <div className="p-4 bg-secondary rounded-lg">
                                            <p className="text-small mb-1">Undertone</p>
                                            <p className="font-display capitalize">{style.undertone}</p>
                                        </div>
                                    </div>

                                    {/* Color Palette */}
                                    <div className="mb-6">
                                        <p className="text-small mb-3">Your Palette</p>
                                        <div className="flex gap-2">
                                            <div className="flex gap-2">
                                                {style.colorPalette && style.colorPalette.map((color, index) => {
                                                    const hex = typeof color === 'string' ? color : color?.hex;
                                                    const name = typeof color === 'string' ? color : color?.name;
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="h-10 w-10 rounded-full border-2 border-background shadow-sm"
                                                            style={{ backgroundColor: hex || '#ccc' }}
                                                            title={name}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recommended Outfits */}
                                    {style.recommendedProducts && style.recommendedProducts.length > 0 && (
                                        <div className="mb-6">
                                            <p className="text-small mb-3">Saved Outfits</p>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {style.recommendedProducts.map((product) => (
                                                    <ProductCard key={product.id} product={product} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                                        <Link to="/collections">
                                            <Button variant="outline" className="gap-2">
                                                <Package className="h-4 w-4" />
                                                Shop This Style
                                            </Button>
                                        </Link>
                                        <Link to="/wishlist">
                                            <Button variant="ghost" className="gap-2">
                                                View Wishlist
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h2 className="font-display text-2xl mb-2">No saved styles yet</h2>
                            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                                Take an AI Style Scan to discover your perfect colors and save your style profile
                            </p>
                            <Link to="/style-scan">
                                <Button className="btn-gold gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    Start Style Scan
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
