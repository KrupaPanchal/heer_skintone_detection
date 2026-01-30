import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function InventoryForm({ open, onOpenChange, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        stock: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                sku: initialData.sku,
                stock: initialData.stock,
            });
        } else {
            setFormData({
                name: '',
                sku: '',
                stock: '',
            });
        }
    }, [initialData, open]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Auto-calculate status based on stock
        let status = 'In Stock';
        const stockNum = parseInt(formData.stock);
        if (stockNum <= 5) status = 'Critical';
        else if (stockNum <= 15) status = 'Low Stock';

        onSubmit({
            ...formData,
            id: initialData ? initialData.id : Date.now(),
            stock: stockNum,
            status
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Inventory' : 'Add Inventory Item'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update stock details below.' : 'Add a new item to tracking.'}
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
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                            id="sku"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            placeholder="ABC-123"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                            id="stock"
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
