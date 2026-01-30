import { Link } from 'react-router-dom';
import { User, MapPin, Package, Sparkles, Heart, Settings, LogOut, Edit2, Plus, Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProfilePage() {
  const { savedStyles, wishlist, user, logout } = useStore();

  // Mock Data
  const orders = [
    { id: 'HF-885921', date: 'Oct 24, 2024', status: 'In Transit', total: 15490, items: 3 },
    { id: 'HF-774102', date: 'Sep 12, 2024', status: 'Delivered', total: 8900, items: 2 },
    { id: 'HF-663019', date: 'Aug 05, 2024', status: 'Delivered', total: 4500, items: 1 },
  ];

  const addresses = [
    { id: 1, type: 'Home', name: 'Jeet Pitale', address: '123 Fashion Street, Cyber City', city: 'Mumbai', zip: '400001', phone: '+91 98765 43210', isDefault: true },
    { id: 2, type: 'Office', name: 'Jeet Pitale', address: '45 Tech Park, Andheri East', city: 'Mumbai', zip: '400093', phone: '+91 98765 43210', isDefault: false },
  ];

  const styleDNA = [
    { label: 'Color Palette', value: 'Warm Earth Tones', color: '#C9A962' },
    { label: 'Fit Preference', value: 'Relaxed & Oversized', color: '#5A185B' },
    { label: 'Top Categories', value: 'Linen Shirts, Chinos', color: '#D61F69' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container max-w-6xl">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-accent/20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-display text-3xl font-medium">{user ? user.name : 'Jeet Pitale'}</h1>
                <p className="text-muted-foreground">{user ? user.email : 'jeet@example.com'}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">Premier Member</Badge>
                  <Badge variant="outline">Mumbai, IN</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" className="gap-2" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-secondary/50 p-1 h-auto flex-wrap justify-start">
              <TabsTrigger value="overview" className="px-6 py-2">Overview</TabsTrigger>
              <TabsTrigger value="orders" className="px-6 py-2">Orders</TabsTrigger>
              <TabsTrigger value="saved" className="px-6 py-2">Saved Styles</TabsTrigger>
              <TabsTrigger value="addresses" className="px-6 py-2">Addresses</TabsTrigger>
              <TabsTrigger value="settings" className="px-6 py-2">Settings</TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="space-y-8 animate-fade-in">
              {/* AI Style Profile */}
              <section>
                <h2 className="font-display text-xl mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Your AI Style DNA
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {styleDNA.map((dna) => (
                    <Card key={dna.label} className="border-l-4" style={{ borderLeftColor: dna.color }}>
                      <CardHeader className="py-4">
                        <CardDescription>{dna.label}</CardDescription>
                        <CardTitle className="text-lg">{dna.value}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recent Orders Preview */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl flex items-center gap-2">
                    <Package className="h-5 w-5 text-accent" />
                    Recent Orders
                  </h2>
                  <Button variant="link" className="text-accent">View All</Button>
                </div>
                <div className="space-y-3">
                  {orders.slice(0, 1).map((order) => (
                    <div key={order.id} className="card-elevated p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">Ordered on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === 'Delivered' ? 'secondary' : 'default'} className="mb-1">
                          {order.status}
                        </Badge>
                        <p className="text-sm font-medium">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </TabsContent>

            {/* ORDERS TAB */}
            <TabsContent value="orders" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your past purchases.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-secondary/20 transition-colors">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-medium">{order.id}</span>
                          <Badge variant="outline" className={order.status === 'In Transit' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-green-600 border-green-200 bg-green-50'}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.date} • {order.items} items • Total: ₹{order.total.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">View Details</Button>
                        {order.status === 'In Transit' && <Button size="sm" className="btn-primary">Track Order</Button>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* SAVED STYLES TAB */}
            <TabsContent value="saved" className="animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {savedStyles.length > 0 ? (
                  savedStyles.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-muted-foreground bg-secondary/20 rounded-lg">
                    <Heart className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p>No saved styles yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* ADDRESSES TAB */}
            <TabsContent value="addresses" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                  <Card key={addr.id} className="relative group">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            {addr.type}
                            {addr.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                          </CardTitle>
                          <CardDescription>{addr.name}</CardDescription>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p>{addr.address}</p>
                      <p>{addr.city} - {addr.zip}</p>
                      <p className="mt-2 text-foreground">{addr.phone}</p>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="h-auto min-h-[180px] border-dashed flex flex-col gap-2 hover:border-primary hover:text-primary">
                  <Plus className="h-8 w-8" />
                  <span>Add New Address</span>
                </Button>
              </div>
            </TabsContent>

            {/* SETTINGS TAB */}
            <TabsContent value="settings" className="animate-fade-in max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" defaultValue="Jeet" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" defaultValue="Pitale" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="jeet@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <Button className="mt-4">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

        </div>
      </main>

      <Footer />
    </div>
  );
}
