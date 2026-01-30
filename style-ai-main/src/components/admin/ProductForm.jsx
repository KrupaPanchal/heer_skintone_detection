import { Upload, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { categories, colors, fabrics, fits } from '@/data/products';

export function ProductForm({ open, onOpenChange, onSubmit, initialData }) {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'women',
        subcategory: 'top',
        colors: [], // Changed from single color string
        fabric: 'Cotton',
        stock: '',
        fit: 'Regular',
        image: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                price: initialData.price.toString(),
                stock: initialData.stock ? initialData.stock.toString() : '',
                description: initialData.description || ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                category: 'women',
                subcategory: 'top',
                colors: [],
                fabric: 'Cotton',
                stock: '',
                fit: 'Regular',
                image: ''
            });
        }
    }, [initialData, open]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({ ...prev, image: '' }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            id: initialData ? initialData.id : crypto.randomUUID(),
            sizes: ['XS', 'S', 'M', 'L', 'XL'], // Default sizes for now
            originalPrice: Number(formData.price) * 1.2, // Fake orig price
            isNew: !initialData
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update product details below.' : 'Fill in the details for the new product.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter product description..."
                            className="resize-none"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input
                                id="stock"
                                type="number"
                                min="0"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(val) => setFormData({ ...formData, category: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="men">Men</SelectItem>
                                    <SelectItem value="women">Women</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subcategory">Type</Label>
                            <Select
                                value={formData.subcategory}
                                onValueChange={(val) => setFormData({ ...formData, subcategory: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="top">Top</SelectItem>
                                    <SelectItem value="bottom">Bottom</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>



                    <div className="space-y-2">
                        <Label>Colors</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between font-normal">
                                    {formData.colors.length > 0 ? (
                                        <div className="flex gap-1 flex-wrap truncate">
                                            {formData.colors.map((c) => (
                                                <Badge key={c} variant="secondary" className="px-1 py-0 text-[10px] h-5">
                                                    {colors.find(col => col.id === c)?.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">Select colors...</span>
                                    )}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>Select Colors</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {colors.map((c) => (
                                    <DropdownMenuCheckboxItem
                                        key={c.id}
                                        checked={formData.colors.includes(c.id)}
                                        onCheckedChange={(checked) => {
                                            const newColors = checked
                                                ? [...formData.colors, c.id]
                                                : formData.colors.filter((id) => id !== c.id);
                                            setFormData({ ...formData, colors: newColors });
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full border border-muted-foreground/30" style={{ backgroundColor: c.hex }} />
                                            {c.name}
                                        </div>
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="space-y-2">
                        <Label>Product Image</Label>
                        <div className="flex flex-col gap-4">
                            {formData.image ? (
                                <div className="relative aspect-[3/4] w-32 overflow-hidden rounded-lg border">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
                                >
                                    <Upload className="h-8 w-8 mb-2" />
                                    <span className="text-sm font-medium">Click to upload image</span>
                                    <span className="text-xs mt-1">JPG, PNG up to 5MB</span>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">{initialData ? 'Save Changes' : 'Create Product'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
