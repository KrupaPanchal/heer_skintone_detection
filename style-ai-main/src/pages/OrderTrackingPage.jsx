import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { Check, Clock, Package, Truck, ArrowLeft, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OrderTrackingPage() {
    const location = useLocation();
    const { orderId = 'HF-123456' } = location.state || {}; // Fallback if direct access

    // Mock Tracking Steps
    const steps = [
        { id: 1, label: 'Order Placed', date: 'Oct 24, 10:30 AM', status: 'completed', icon: Package },
        { id: 2, label: 'Processing', date: 'Oct 24, 2:00 PM', status: 'completed', icon: Clock },
        { id: 3, label: 'Shipped', date: 'Oct 25, 9:00 AM', status: 'current', icon: Truck },
        { id: 4, label: 'Delivered', date: 'Estimated Oct 28', status: 'upcoming', icon: Check },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container max-w-3xl animate-fade-in-up">

                    <div className="flex items-center gap-4 mb-8">
                        <Link to="/order-confirmation" state={location.state}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-display font-medium">Track Order</h1>
                            <p className="text-muted-foreground text-sm">Order ID: <span className="font-mono text-foreground font-medium">{orderId}</span></p>
                        </div>
                    </div>

                    <div className="card-elevated p-8 mb-8">
                        {/* Courier Info */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-border gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Courier Partner</p>
                                <p className="font-medium text-lg flex items-center gap-2">
                                    FedEx Express
                                    <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">Fast</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                                <p className="font-mono font-medium text-lg">FDX-88592031</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-4 md:pl-0">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex gap-4 pb-10 last:pb-0 relative">
                                    {/* Line connector */}
                                    {index !== steps.length - 1 && (
                                        <div className={cn(
                                            "absolute left-[15px] top-10 bottom-0 w-[2px]",
                                            step.status === 'completed' ? "bg-primary" : "bg-border"
                                        )} />
                                    )}

                                    {/* Icon Circle */}
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-300",
                                        step.status === 'completed' || step.status === 'current' ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                                    )}>
                                        <step.icon className="h-4 w-4" />
                                    </div>

                                    {/* Content */}
                                    <div className={cn(
                                        "flex-1 pt-1",
                                        step.status === 'upcoming' && "opacity-50"
                                    )}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-lg">{step.label}</h3>
                                            <span className="text-sm text-muted-foreground">{step.date}</span>
                                        </div>
                                        {step.status === 'current' && (
                                            <p className="text-sm text-primary mt-1 font-medium">In Transit - Arriving Soon</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Support Block */}
                    <div className="bg-secondary/30 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-medium mb-1">Need help with your order?</h3>
                            <p className="text-sm text-muted-foreground">Our support team is available 24/7 to assist you.</p>
                        </div>
                        <Link to="/contact">
                            <Button variant="outline" className="gap-2 bg-background">
                                <MessageCircle className="h-4 w-4" />
                                Contact Support
                            </Button>
                        </Link>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
