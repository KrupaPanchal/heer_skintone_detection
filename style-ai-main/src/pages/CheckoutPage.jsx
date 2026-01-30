import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Lock } from 'lucide-react';
import axios from 'axios';

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    const subtotal = cartTotal();
    const shipping = subtotal > 2000 ? 0 : 1200;
    const total = subtotal + shipping;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const shippingAddress = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address: formData.address,
            city: "N/A", // Default value
            state: "N/A", // Default value
            zipCode: "000000", // Default value
        };

        if (
            !formData.firstName ||
            !formData.address ||
            !formData.email
        ) {
            toast.error("Please fill in all required shipping details.");
            setIsProcessing(false);
            return;
        }

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            setIsProcessing(false);
            return;
        }

        try {
            // 1. Create Order on Backend
            const { data: orderData } = await axios.post("http://localhost:5000/api/orders", {
                amount: total,
            });

            // CHECK FOR MOCK MODE
            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
            if (razorpayKey === 'rzp_test_placeholder') {
                toast.info("Using Mock Payment Mode");

                // Simulating Razorpay success after a brief delay
                setTimeout(async () => {
                    try {
                        const { data: verifyData } = await axios.post("http://localhost:5000/api/orders/verify", {
                            razorpay_payment_id: "pay_mock_" + Date.now(),
                            razorpay_order_id: orderData.id,
                            razorpay_signature: "mock_signature",
                            orderItems: cart,
                            shippingAddress,
                            totalPrice: total,
                        });

                        clearCart();
                        navigate('/order-confirmation', {
                            state: {
                                orderId: verifyData.orderId,
                                items: cart,
                                total: total
                            }
                        });
                        toast.success('Mock Payment Successful!');
                    } catch (err) {
                        console.error("Mock Verify Error", err);
                        toast.error("Mock verification failed");
                    }
                }, 1500);
                return;
            }

            const options = {
                key: razorpayKey, // Enter the Key ID generated from the Dashboard
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Heer Enterprise",
                description: "Test Transaction",
                image: "https://example.com/your_logo", // You can add a logo here
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        // 2. Verify Payment on Backend
                        const { data: verifyData } = await axios.post("http://localhost:5000/api/orders/verify", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderItems: cart,
                            shippingAddress,
                            totalPrice: total,
                            // user: user._id // TODO: Add user from context
                        });

                        clearCart();
                        navigate('/order-confirmation', {
                            state: {
                                orderId: verifyData.orderId,
                                items: cart,
                                total: total
                            }
                        });
                        toast.success('Payment Successful! Order placed.');

                    } catch (error) {
                        console.error("Verification Error:", error);
                        console.error("Verification Details:", error.response?.data);
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: "9999999999", // TODO: Add contact field to form
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Order Creation Error:", error);
            toast.error("Something went wrong with order creation.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        setTimeout(() => navigate('/cart'), 0);
        return null;
    }


    return (
        <div className="min-h-screen bg-secondary/20">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container max-w-5xl">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/cart')}
                        className="mb-8 hover:bg-transparent hover:text-accent pl-0"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Forms Section */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Shipping Details */}
                            <div className="card-elevated p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                                        <Truck className="h-5 w-5 text-accent" />
                                    </div>
                                    <h2 className="text-xl font-display">Shipping Information</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" name="firstName" placeholder="John" required value={formData.firstName} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" name="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" name="address" placeholder="123 Fashion St" required value={formData.address} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Selection - Simplified for Razorpay */}
                            <div className="card-elevated p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-accent" />
                                    </div>
                                    <h2 className="text-xl font-display">Payment Method</h2>
                                </div>

                                <RadioGroup defaultValue="card" onValueChange={setPaymentMethod} className="grid grid-cols-1 gap-4 mb-6">
                                    <div>
                                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                        <Label
                                            htmlFor="card"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <CreditCard className="h-6 w-6" />
                                                <span className="font-medium">Online Payment (Cards, UPI, NetBanking) via Razorpay</span>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="card-elevated p-6 sticky top-28">
                                <h3 className="font-display text-lg mb-4">Order Summary</h3>
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                    {cart.map((item) => (
                                        <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 text-sm">
                                            <div className="w-12 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium truncate">{item.name}</p>
                                                <p className="text-muted-foreground text-xs">{item.selectedSize} | Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-border pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-2 text-lg">
                                        <span>Total</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full btn-gold mt-6 h-12 text-base shadow-lg shadow-accent/20"
                                    onClick={handleSubmit}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2">
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4" /> Pay ₹{total.toFixed(2)}
                                        </span>
                                    )}
                                </Button>
                                <div className="mt-4 flex justify-center gap-2 text-muted-foreground">
                                    <Lock className="w-3 h-3" /> <span className="text-xs">Secure 256-bit SSL Encrypted Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
