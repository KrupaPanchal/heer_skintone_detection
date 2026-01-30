import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useStore();
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    const subtotal = cartTotal();
    const shipping = subtotal > 2000 ? 0 : 1200;
    const discount = appliedCoupon ? subtotal * 0.1 : 0;
    const total = subtotal + shipping - discount;

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === 'save10') {
            setAppliedCoupon(couponCode);
            toast.success('Coupon applied! 10% discount');
        } else {
            toast.error('Invalid coupon code');
        }
        setCouponCode('');
    };

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Navigate to checkout page
        setTimeout(() => {
            setIsCheckingOut(false);
            navigate('/checkout');
        }, 500);
    };

    return (
        <div className="min-h-screen">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="text-section mb-2">Shopping Bag</h1>
                        <p className="text-muted-foreground">
                            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag
                        </p>
                    </div>

                    {cart.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                            {/* Cart Items */}
                            <div className="flex-1 space-y-4">
                                {cart.map((item) => (
                                    <div
                                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                        className="flex gap-4 md:gap-6 p-4 bg-card rounded-lg border border-border"
                                    >
                                        {/* Image */}
                                        <Link to={`/product/${item.id}`} className="shrink-0">
                                            <div className="w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden bg-secondary">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </Link>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <Link to={`/product/${item.id}`}>
                                                    <h3 className="font-display text-lg mb-1 hover:text-accent transition-colors">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Size: {item.selectedSize} • Color:{' '}
                                                    <span className="capitalize">{item.selectedColor}</span>
                                                </p>
                                                <p className="font-medium">₹{item.price}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Stepper */}
                                                <div className="flex items-center border border-border rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="h-8 w-8 flex items-center justify-center hover:bg-secondary transition-colors"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="h-8 w-8 flex items-center justify-center hover:bg-secondary transition-colors"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-2"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price (Desktop) */}
                                        <div className="hidden md:block text-right shrink-0 py-1">
                                            <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:w-96 shrink-0">
                                <div className="card-elevated p-6 sticky top-28">
                                    <h2 className="font-display text-xl mb-6">Order Summary</h2>

                                    {/* Coupon */}
                                    <div className="mb-6 pb-6 border-b border-border">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Enter coupon code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                className="flex-1"
                                            />
                                            <Button variant="outline" onClick={handleApplyCoupon}>
                                                Apply
                                            </Button>
                                        </div>
                                        {appliedCoupon && (
                                            <div className="flex items-center gap-2 mt-2 text-sm text-accent">
                                                <Tag className="h-4 w-4" />
                                                <span>{appliedCoupon} applied</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-sm text-accent">
                                                <span>Discount</span>
                                                <span>-₹{discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between pt-3 border-t border-border">
                                            <span className="font-display text-lg">Total</span>
                                            <span className="font-display text-lg">₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Free Shipping Notice */}
                                    {subtotal < 2000 && (
                                        <p className="text-sm text-muted-foreground mb-6 text-center">
                                            Add ₹{(2000 - subtotal).toFixed(2)} more for free shipping
                                        </p>
                                    )}

                                    {/* Checkout Button */}
                                    <Button
                                        className="w-full btn-primary gap-2"
                                        size="lg"
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                    >
                                        {isCheckingOut ? (
                                            <>Processing...</>
                                        ) : (
                                            <>
                                                Proceed to Checkout
                                                <ArrowRight className="h-5 w-5" />
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                        Secure checkout powered by Razorpay
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h2 className="font-display text-2xl mb-2">Your bag is empty</h2>
                            <p className="text-muted-foreground mb-6">
                                Looks like you haven't added anything to your bag yet
                            </p>
                            <Link to="/collections">
                                <Button className="btn-primary">Start Shopping</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
