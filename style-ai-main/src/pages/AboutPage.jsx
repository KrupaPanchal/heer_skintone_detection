import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, Heart, Globe, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container">
                    {/* Hero */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-section mb-6">Redefining Personal Style with AI</h1>
                        <p className="text-body-large">
                            At Heer Enterprise, we believe everyone deserves to feel confident in what they wear.
                            We combine premium fashion with cutting-edge AI to help you discover colors and styles
                            that naturally complement your unique beauty.
                        </p>
                    </div>

                    {/* Stats/Values */}
                    <div className="grid md:grid-cols-4 gap-8 mb-20">
                        {[
                            { icon: Sparkles, label: 'AI Powered', text: 'Advanced skin tone analysis' },
                            { icon: Heart, label: 'Inclusive', text: 'Fashion for every unique tone' },
                            { icon: Globe, label: 'Sustainable', text: 'Eco-conscious production' },
                            { icon: Users, label: 'Community', text: 'Over 50k happy customers' }
                        ].map((item, i) => (
                            <div key={i} className="text-center p-6 bg-secondary/30 rounded-lg">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="h-6 w-6 text-accent" />
                                </div>
                                <h3 className="font-display font-medium text-lg mb-2">{item.label}</h3>
                                <p className="text-sm text-muted-foreground">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Story Sections */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="aspect-square bg-neutral-200 rounded-2xl overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000"
                                alt="Fashion Design Studio"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <span className="text-small text-accent mb-2 block">Our Story</span>
                            <h2 className="text-3xl font-display font-medium mb-6">Born from a Question: "Does this color suit me?"</h2>
                            <p className="text-body mb-4">
                                It started with a simple struggle we all face: standing in front of a mirror, holding up a shirt, and wondering if it truly works.
                                Traditional shopping relies on guessing. We wanted to rely on science.
                            </p>
                            <p className="text-body mb-4">
                                Our founders, a team of fashion designers and data scientists, built Heer Enterprise to bridge the gap between
                                personal aesthetics and color theory. By analyzing skin undertones, we take the guesswork out of shopping.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="order-2 md:order-1">
                            <span className="text-small text-accent mb-2 block">Our Technology</span>
                            <h2 className="text-3xl font-display font-medium mb-6">The Science of Style</h2>
                            <p className="text-body mb-4">
                                Our proprietary <strong>AI Style Scan™</strong> analyzes lighting, skin pigmentation, and contrast levels to identify your specific season/color palette.
                            </p>
                            <ul className="space-y-3 mt-6">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span className="text-sm font-medium"> Instant Undertone Detection</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span className="text-sm font-medium"> Personalized Color Palettes</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span className="text-sm font-medium"> Smart Fabric Recommendations</span>
                                </li>
                            </ul>
                        </div>
                        <div className="aspect-square bg-neutral-200 rounded-2xl overflow-hidden relative order-1 md:order-2">
                            <img
                                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000"
                                alt="AI Technology Visualization"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
