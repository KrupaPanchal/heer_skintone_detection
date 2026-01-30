import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, Shirt, Shield, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { CollectionCard } from '@/components/collections/CollectionCard';
import { useStore } from '@/store/useStore';
import heroImage from '@/assets/hero-new-v1.png';
import womenCollection from '@/assets/collections/women.jpg';
import menCollection from '@/assets/collections/men.jpg';

const features = [
    {
        icon: Sparkles,
        title: 'AI Color Analysis',
        description: 'Discover your perfect palette with our advanced skin tone analysis technology.',
    },
    {
        icon: Palette,
        title: 'Personalized Picks',
        description: 'Receive curated recommendations based on your unique style profile.',
    },
    {
        icon: Shirt,
        title: 'Virtual Styling',
        description: 'Build complete outfits with AI-powered outfit suggestions.',
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your data and photos are encrypted and never shared.',
    },
];

const collections = [
    { title: 'Women', image: womenCollection, href: '/collections?category=women' },
    { title: 'Men', image: menCollection, href: '/collections?category=men' },
];

export default function HomePage() {
    const { products, savedStyles } = useStore();

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative w-full bg-secondary/20">
                <div className="relative w-full">
                    <img
                        src={heroImage}
                        alt="Fashion editorial"
                        className="w-full h-auto object-contain blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />

                    <div className="absolute inset-0 flex items-center">
                        <div className="container">
                            <div className="max-w-2xl pt-8 md:pt-0">
                                <span className="text-small text-accent mb-2 md:mb-4 block animate-fade-in shadow-sm">
                                    AI-Powered Fashion
                                </span>
                                <h1 className="text-3xl md:text-6xl lg:text-7xl font-display font-medium mb-4 md:mb-6 animate-fade-in-delay-1 text-foreground drop-shadow-sm">
                                    Your Perfect Style,<br />
                                    <span className="italic text-accent">Decoded</span>
                                </h1>
                                <p className="text-sm md:text-lg text-foreground/80 max-w-md mb-6 md:mb-8 animate-fade-in-delay-2 hidden md:block font-medium">
                                    Discover colors that complement your unique features with our AI Style Scanner.
                                    Personalized fashion, curated just for you.
                                </p>
                                <div className="flex flex-wrap gap-4 animate-fade-in-delay-3">
                                    <Link to="/style-scan">
                                        <Button size="lg" className="btn-gold gap-2 text-sm md:text-base">
                                            <Sparkles className="h-5 w-5" />
                                            Start AI Style Scan
                                        </Button>
                                    </Link>
                                    <Link to="/collections">
                                        <Button size="lg" variant="outline" className="btn-outline gap-2 text-sm md:text-base bg-background/50 backdrop-blur-sm">
                                            Explore Collections
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-28 bg-secondary">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-small text-accent mb-4 block">Why Heer Enterprise</span>
                        <h2 className="text-section mb-4">Fashion Meets Intelligence</h2>
                        <p className="text-body">
                            Our AI technology analyzes your skin tone and undertones to recommend colors
                            and styles that truly flatter you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="card-elevated p-6 hover-lift"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-accent" />
                                </div>
                                <h3 className="text-card-title mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collections Section */}
            <section className="py-20 md:py-28">
                <div className="container">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-small text-accent mb-4 block">Shop by Category</span>
                            <h2 className="text-section">Our Collections</h2>
                        </div>
                        <Link
                            to="/collections"
                            className="hidden md:flex items-center gap-2 text-sm font-medium underline-gold"
                        >
                            View All
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {collections.map((collection) => (
                            <CollectionCard key={collection.title} {...collection} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommended Products */}
            <section className="py-20 md:py-28 bg-secondary">
                <div className="container">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-small text-accent mb-4 block">Curated for You</span>
                            <h2 className="text-section">New Arrivals</h2>
                        </div>
                        <Link
                            to="/collections"
                            className="hidden md:flex items-center gap-2 text-sm font-medium underline-gold"
                        >
                            Shop All
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/collections">
                            <Button variant="outline" className="btn-outline">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* AI CTA Section */}
            <section className="py-20 md:py-28">
                <div className="container">
                    <div className="relative rounded-2xl overflow-hidden bg-primary text-primary-foreground p-8 md:p-16">
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-l from-accent via-accent/50 to-transparent" />
                        </div>

                        <div className="relative z-10 max-w-xl">
                            <span className="text-small text-accent mb-4 block">Unlock Your Style</span>
                            <h2 className="text-section text-primary-foreground mb-4">
                                Ready to Find Your Perfect Palette?
                            </h2>
                            <p className="text-primary-foreground/70 mb-8">
                                Upload a photo and let our AI analyze your unique features.
                                Receive personalized color recommendations and product suggestions in seconds.
                            </p>
                            <Link to="/style-scan">
                                <Button size="lg" className="btn-gold gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    Start Your Style Scan
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Saved Styles Preview */}
            {savedStyles.length > 0 && (
                <section className="py-20 md:py-28 bg-secondary/30">
                    <div className="container">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-small text-accent mb-4 block">Your Personal Lookbook</span>
                                <h2 className="text-section">Saved Styles</h2>
                            </div>
                            <Link
                                to="/saved-styles"
                                className="hidden md:flex items-center gap-2 text-sm font-medium underline-gold"
                            >
                                View All
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedStyles.slice(0, 3).map((style) => (
                                <Link key={style.id} to="/saved-styles">
                                    <div className="card-elevated p-6 hover-lift cursor-pointer group">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="font-display text-lg group-hover:text-accent transition-colors">{style.name}</h3>
                                            <span className="text-xs text-muted-foreground">{new Date(style.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex gap-2 mb-4">
                                            {style.colorPalette.slice(0, 5).map((color, i) => (
                                                <div
                                                    key={i}
                                                    className="w-8 h-8 rounded-full border border-border shadow-sm"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">{style.skinTone} • {style.undertone}</span>
                                            <span className="text-accent flex items-center gap-1">
                                                View Style <ArrowRight className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Trust Badges */}
            <section className="py-12 border-t border-border bg-background">
                <div className="container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 bg-accent/10 rounded-full text-accent">
                                <Truck className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium mb-1">Free Shipping</h3>
                            <p className="text-sm text-muted-foreground">On all orders over ₹2000</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 bg-accent/10 rounded-full text-accent">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium mb-1">Secure Payment</h3>
                            <p className="text-sm text-muted-foreground">100% secure transactions</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 bg-accent/10 rounded-full text-accent">
                                <RotateCcw className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium mb-1">Easy Returns</h3>
                            <p className="text-sm text-muted-foreground">30-day return policy</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 bg-accent/10 rounded-full text-accent">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium mb-1">Authentic Products</h3>
                            <p className="text-sm text-muted-foreground">Sourced directly from brands</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div >
    );
}
