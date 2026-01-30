import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ProductTabs({ product }) {
    return (
        <Tabs defaultValue="description" className="mt-12 w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none p-0 mb-8 space-x-8">
                <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium"
                >
                    Description
                </TabsTrigger>
                <TabsTrigger
                    value="specs"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium"
                >
                    Specifications
                </TabsTrigger>
                <TabsTrigger
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium"
                >
                    Reviews (124)
                </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4 animate-fade-in text-muted-foreground leading-relaxed">
                <p>
                    Elevate your wardrobe with this {product.name}. Crafted from premium materials, it offers a perfect blend of style and comfort.
                    Whether you're heading to work or a casual outing, this versatile piece ensures you look your best.
                </p>
                <p>
                    The breathable fabric keeps you cool throughout the day, while the AI-optimized fit accentuates your best features.
                    Designed for long-lasting durability without compromising on softness.
                </p>
            </TabsContent>

            <TabsContent value="specs" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <SpecRow label="Material" value="100% Premium Cotton" />
                    <SpecRow label="Fit" value="Regular Tailored Fit" />
                    <SpecRow label="Pattern" value="Solid" />
                    <SpecRow label="Wash Care" value="Machine Wash Cold" />
                    <SpecRow label="Country of Origin" value="India" />
                </div>
            </TabsContent>

            <TabsContent value="reviews" className="animate-fade-in">
                <div className="space-y-6">
                    {/* Mock Review */}
                    <div className="border-b pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span className="font-medium">Priya W.</span>
                            </div>
                            <div className="flex text-amber-500">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                            </div>
                        </div>
                        <div className="flex gap-2 mb-3">
                            <Badge variant="secondary" className="text-xs font-normal">Warm Undertone</Badge>
                            <Badge variant="outline" className="text-xs font-normal">Size M</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            "Absolutely love the recommendation! The AI suggested this color for my skin tone and it really does pop. The fabric is super soft too."
                        </p>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}

function SpecRow({ label, value }) {
    return (
        <div className="flex justify-between py-3 border-b border-dashed">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
