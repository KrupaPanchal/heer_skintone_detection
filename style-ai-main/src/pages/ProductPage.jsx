import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// New Components
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { AIStyleInsights } from '@/components/product/AIStyleInsights';
import { ProductTabs } from '@/components/product/ProductTabs';
import { SimilarProducts } from '@/components/product/SimilarProducts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ProductPage() {
    const { id } = useParams();
    const { products, addToCart, user } = useStore();
    const product = products.find((p) => p.id === parseInt(id) || p.id === id);
    const navigate = useNavigate();

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Product not found.</p>
            </div>
        );
    }

    // Sticky Bottom Bar for Mobile
    const MobileStickyBar = () => (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-40 flex items-center justify-between shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="font-bold">₹{product.price}</span>
            </div>
            <Button
                onClick={() => {
                    if (!user) {
                        toast.error("Please log in to add items to bag");
                        navigate('/login');
                        return;
                    }
                    addToCart(product, 'M', product.color || 'Black');
                    toast.success("Added to Bag");
                }}
                className="btn-primary px-8"
            >
                Add to Cart
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-32 lg:pb-20">
                <div className="container">

                    {/* Breadcrumb & Trust */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Link to="/" className="hover:text-foreground">Home</Link>
                            <ChevronRight className="h-3 w-3" />
                            <Link to="/collections" className="hover:text-foreground">Collections</Link>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-foreground font-medium">{product.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                            <ShieldCheck className="h-3 w-3" />
                            Verified Quality &middot; Easy Returns
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
                        {/* Left: Gallery */}
                        <ProductGallery product={product} />

                        {/* Right: Info */}
                        <div>
                            <ProductInfo product={product} />
                            <AIStyleInsights product={product} />
                            <ProductTabs product={product} />
                        </div>
                    </div>

                    {/* Similar Products */}
                    <SimilarProducts currentProductId={product.id} />
                </div>
            </main>

            <MobileStickyBar />
            <Footer />
        </div>
    );
}
