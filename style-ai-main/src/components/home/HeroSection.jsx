import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-fashion.jpg';

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary/5">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/10 -skew-x-12 translate-x-1/3" />

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="order-2 lg:order-1 pt-12 lg:pt-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
                        <Sparkles className="h-4 w-4" />
                        <span>AI Powered Styling</span>
                    </div>

                    <h1 className="text-hero mb-6 animate-fade-in-delay-1 text-foreground">
                        Fashion That Matches You — <span className="text-primary italic">Not Trends.</span>
                    </h1>

                    <p className="text-body-large mb-8 max-w-lg animate-fade-in-delay-2">
                        Discover clothes perfectly matched to your skin tone using AI.
                        Stop guessing, start wearing what truly suits you.
                    </p>

                    <div className="flex flex-wrap gap-4 animate-fade-in-delay-3">
                        <Link to="/style-scan">
                            <Button size="lg" className="btn-gold h-14 px-8 text-lg gap-2 shadow-gold hover:scale-105 transition-transform">
                                <Sparkles className="h-5 w-5" />
                                Start AI Skin Scan
                            </Button>
                        </Link>
                        <Link to="/collections">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg gap-2 border-primary text-primary hover:bg-primary/5">
                                Explore Collection
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="order-1 lg:order-2 relative animate-fade-in-delay-1">
                    <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-h-[80vh] mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2rem] transform rotate-3 opacity-20 blur-xl" />
                        <img
                            src={heroImage}
                            alt="Model with perfect color match"
                            className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl z-10"
                        />

                        {/* Floating Color Swatches */}
                        <div className="absolute -left-8 top-20 bg-white p-3 rounded-2xl shadow-xl animate-float z-20">
                            <div className="h-12 w-12 rounded-full bg-[#E5C29F]" /> {/* Skin tone */}
                        </div>
                        <div className="absolute -right-4 bottom-32 bg-white p-3 rounded-2xl shadow-xl animate-float z-20" style={{ animationDelay: '1.5s' }}>
                            <div className="h-12 w-12 rounded-full bg-accent" /> {/* Gold match */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
