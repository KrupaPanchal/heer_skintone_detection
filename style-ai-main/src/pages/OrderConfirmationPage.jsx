import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag, ArrowRight, MapPin, CreditCard, Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function OrderConfirmationPage() {
    const [orderId, setOrderId] = useState('');
    const location = useLocation();
    const { items = [], total = 0, orderId: stateOrderId } = location.state || {}; // Fallback if direct access

    useEffect(() => {
        if (stateOrderId) {
            setOrderId(stateOrderId);
        } else {
            // Generate a random order ID on mount if not provided
            const randomId = 'HF-' + Math.floor(100000 + Math.random() * 900000);
            setOrderId(randomId);
        }
    }, [stateOrderId]);

    // Mock Date for Estimation
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const dateString = deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container max-w-3xl animate-fade-in-up">

                    {/* Success Header */}
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                        <h1 className="text-3xl font-display font-medium mb-2">Thank you for your order!</h1>
                        <p className="text-muted-foreground">Order #{orderId} has been placed successfully.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left: Order Details */}
                        <div className="md:col-span-2 space-y-6">

                            {/* Items Card */}
                            <div className="card-elevated p-6">
                                <h2 className="font-display text-lg mb-4 flex items-center gap-2">
                                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                    Order Items
                                </h2>
                                <div className="space-y-4">
                                    {items.length > 0 ? (
                                        items.map((item) => (
                                            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0">
                                                <div className="h-16 w-16 bg-secondary rounded overflow-hidden shrink-0">
                                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">Size: {item.selectedSize} • Color: {item.selectedColor}</p>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                        <p className="font-medium text-sm">₹{item.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic">No items found (Direct page access)</p>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                                    <span className="font-medium">Total Paid</span>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">PAID</Badge>
                                        <span className="font-display text-lg">₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address (Mock) */}
                            <div className="card-elevated p-6">
                                <h2 className="font-display text-lg mb-4 flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    Delivery Address
                                </h2>
                                <div className="text-sm text-muted-foreground leading-relaxed">
                                    <p className="font-medium text-foreground">Jeet Pitale</p>
                                    <p>123 Fashion Street, Cyber City</p>
                                    <p>Mumbai, Maharashtra, 400001</p>
                                    <p>India</p>
                                    <p className="mt-2">Phone: +91 98765 43210</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions & Tracking */}
                        <div className="space-y-6">
                            <div className="card-elevated p-6 bg-secondary/20 border-accent/20">
                                <h2 className="font-display text-lg mb-2">Estimated Delivery</h2>
                                <p className="text-2xl font-medium mb-1">{dateString}</p>
                                <p className="text-xs text-muted-foreground mb-6">By FedEx Express</p>

                                <Link to="/order-tracking" state={{ orderId, items }}>
                                    <Button className="w-full btn-primary gap-2 shadow-lg shadow-accent/20">
                                        Track Order
                                        <Truck className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link to="/collections">
                                    <Button variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </Link>
                                <Link to="/">
                                    <Button variant="ghost" className="w-full">
                                        Back to Home
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
