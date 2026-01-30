import { Camera, Brain, Palette, ShoppingBag } from 'lucide-react';

const steps = [
    {
        icon: Camera,
        title: 'Scan',
        description: 'Upload a selfie or use your camera to capture your features.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: Brain,
        title: 'Analyze',
        description: 'Our AI detects your unique skin tone and undertone instantly.',
        color: 'bg-purple-50 text-purple-600',
    },
    {
        icon: Palette,
        title: 'Match',
        description: 'Get a personalized color palette that perfectly suits you.',
        color: 'bg-pink-50 text-pink-600',
    },
    {
        icon: ShoppingBag,
        title: 'Shop',
        description: 'Browse curated styles filtered for your best colors.',
        color: 'bg-amber-50 text-amber-600',
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 bg-background" id="how-it-works">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-small text-accent mb-4 block">Simple Process</span>
                    <h2 className="text-section mb-4 text-foreground">How AI Styling Works</h2>
                    <p className="text-body">
                        From selfie to style in four simple steps. No more guessing what looks good on you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="card-elevated p-8 text-center group hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-accent/30"
                        >
                            <div className={`mx-auto h-16 w-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-display font-medium mb-3 text-foreground">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
