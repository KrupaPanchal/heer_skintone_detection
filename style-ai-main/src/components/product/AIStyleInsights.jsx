import { Lightbulb, Calendar, Shirt, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AIStyleInsights({ product }) {
    return (
        <section className="bg-secondary/20 rounded-2xl p-6 md:p-8 mt-12 border border-border/50">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg text-white shadow-lg">
                    <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="font-display text-2xl">Heer AI Style Insights</h2>
                    <p className="text-muted-foreground text-sm">Personalized analysis for your profile</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Analysis */}
                <div className="bg-background rounded-xl p-5 shadow-sm border border-border">
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-primary">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Why it suits you
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        This {product.color} tone perfectly complements your Warm undertone, adding a healthy radiance to your complexion. The tailored fit enhances your defined shoulder line.
                    </p>
                </div>

                {/* Occasions */}
                <div className="bg-background rounded-xl p-5 shadow-sm border border-border">
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-violet-600">
                        <Calendar className="h-4 w-4" />
                        Best Occasions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {['Casual Fridays', 'Evening Coffee', 'Date Night'].map(tag => (
                            <span key={tag} className="text-xs bg-violet-50 text-violet-700 px-2 py-1 rounded-md font-medium border border-violet-100">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Styling Suggestions */}
                <div className="bg-background rounded-xl p-5 shadow-sm border border-border">
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-indigo-600">
                        <Shirt className="h-4 w-4" />
                        Style With
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            Beige Chinos or Dark Denim
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            White Sneakers for a clean look
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <Button variant="link" className="text-primary gap-1 group">
                    View Full AI Style Report <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </section>
    );
}
