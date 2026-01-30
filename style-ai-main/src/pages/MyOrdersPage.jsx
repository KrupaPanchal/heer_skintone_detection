import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useStore();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                toast.error('Failed to fetch orders');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-12 w-12 bg-secondary rounded-full mb-4"></div>
                        <div className="h-4 w-48 bg-secondary rounded"></div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container max-w-4xl animate-fade-in-up">
                    <h1 className="text-3xl font-display mb-8">My Orders</h1>

                    {orders.length === 0 ? (
                        <div className="text-center py-20 bg-secondary/20 rounded-2xl">
                            <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="h-8 w-8 text-accent" />
                            </div>
                            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                            <p className="text-muted-foreground mb-8">Looks like you haven't placed any orders yet.</p>
                            <Link to="/collections">
                                <Button className="btn-primary">Start Shopping</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order._id} className="card-elevated p-6 transition-all hover:shadow-lg">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-border pb-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Order Placed</p>
                                            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                                            <p className="font-medium">₹{order.totalPrice?.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Status</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.isPaid ? 'Paid' : 'Pending Payment'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                                            <p className="font-mono text-sm">#{order._id.slice(-6).toUpperCase()}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <div className="h-16 w-16 bg-secondary rounded-md overflow-hidden shrink-0">
                                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.qty} × ₹{item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Link to="/order-tracking" state={{ orderId: order._id }}>
                                            <Button variant="outline" className="gap-2 text-sm">
                                                Track Order <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
