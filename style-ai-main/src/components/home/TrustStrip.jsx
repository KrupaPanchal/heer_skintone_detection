import { ShieldCheck, Sparkles, Truck, Award } from 'lucide-react';

const benefits = [
    {
        icon: ShieldCheck,
        title: 'Secure Payments',
        description: 'Encrypted & Safe',
    },
    {
        icon: Sparkles,
        title: 'AI Powered Styling',
        description: 'Personalized Fits',
    },
    {
        icon: Truck,
        title: 'Fast Delivery',
        description: 'Express Shipping',
    },
    {
        icon: Award,
        title: 'Quality Fabrics',
        description: 'Premium Materials',
    },
];

export function TrustStrip() {
    return (
        <section className="border-y border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="flex flex-col md:flex-row items-center justify-center gap-3 p-6 text-center md:text-left hover:bg-white/50 transition-colors">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <benefit.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm text-foreground">{benefit.title}</h3>
                                <p className="text-xs text-muted-foreground">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
