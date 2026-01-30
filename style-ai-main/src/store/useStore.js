import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '@/data/products';

export const useStore = create()(
    persist(
        (set, get) => ({
            // Cart
            cart: [],
            addToCart: (product, size, color) => {
                set((state) => {
                    const existingItem = state.cart.find(
                        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
                    );
                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id && item.selectedSize === size && item.selectedColor === color
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return {
                        cart: [...state.cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }],
                    };
                });
            },
            removeFromCart: (productId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== productId),
                }));
            },
            updateQuantity: (productId, quantity) => {
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                }));
            },
            clearCart: () => set({ cart: [] }),
            cartTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
            cartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

            // Wishlist
            wishlist: [],
            addToWishlist: (product) => {
                set((state) => {
                    if (state.wishlist.find((item) => item.id === product.id)) {
                        return state;
                    }
                    return { wishlist: [...state.wishlist, product] };
                });
            },
            removeFromWishlist: (productId) => {
                set((state) => ({
                    wishlist: state.wishlist.filter((item) => item.id !== productId),
                }));
            },
            isInWishlist: (productId) => get().wishlist.some((item) => item.id === productId),

            // Saved Styles
            savedStyles: [],
            addSavedStyle: (style) => {
                set((state) => ({ savedStyles: [...state.savedStyles, style] }));
            },
            removeSavedStyle: (styleId) => {
                set((state) => ({
                    savedStyles: state.savedStyles.filter((style) => style.id !== styleId),
                }));
            },
            updateSavedStyleName: (styleId, name) => {
                set((state) => ({
                    savedStyles: state.savedStyles.map((style) =>
                        style.id === styleId ? { ...style, name } : style
                    ),
                }));
            },

            // Products & Admin
            products: initialProducts,
            addProduct: (product) => {
                set((state) => ({ products: [...state.products, product] }));
            },
            updateProduct: (id, updates) => {
                set((state) => ({
                    products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
                }));
            },
            deleteProduct: (id) => {
                set((state) => ({
                    products: state.products.filter((p) => p.id !== id),
                }));
            },

            // Inventory
            inventory: [
                { id: 1, name: 'Linen Shirt', sku: 'LIN-001', stock: 12, status: 'Low Stock' },
                { id: 2, name: 'Chino Trousers', sku: 'CHI-004', stock: 45, status: 'In Stock' },
                { id: 3, name: 'Silk Saree', sku: 'SAR-009', stock: 5, status: 'Critical' },
            ],
            addInventoryItem: (item) => set((state) => ({ inventory: [...state.inventory, item] })),
            updateInventoryItem: (id, updates) => set((state) => ({
                inventory: state.inventory.map((i) => (i.id === id ? { ...i, ...updates } : i)),
            })),
            deleteInventoryItem: (id) => set((state) => ({
                inventory: state.inventory.filter((i) => i.id !== id),
            })),

            // Users
            users: [
                { id: 1, name: 'Jeet Pitale', email: 'jeet@example.com', role: 'User', joined: '2024-01-15' },
                { id: 2, name: 'Admin User', email: 'admin@heer.com', role: 'Admin', joined: '2023-11-20' },
                { id: 3, name: 'Guest User', email: 'guest@example.com', role: 'User', joined: '2024-10-01' },
            ],
            addUser: (user) => set((state) => ({ users: [...state.users, user] })),
            updateUser: (id, updates) => set((state) => ({
                users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
            })),
            deleteUser: (id) => set((state) => ({
                users: state.users.filter((u) => u.id !== id),
            })),

            // Orders (Mock)
            orders: [
                { id: 'ORD-1001', customer: 'Jeet Pitale', date: '2024-10-24', total: 15490, status: 'Processing' },
                { id: 'ORD-1002', customer: 'Sarah Khan', date: '2024-10-23', total: 8900, status: 'Shipped' },
                { id: 'ORD-1003', customer: 'Rahul Verma', date: '2024-10-22', total: 4500, status: 'Delivered' },
            ],
            updateOrderStatus: (id, status) => set((state) => ({
                orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
            })),

            // Authentication
            user: null,
            login: (userData) => {
                // Check if admin
                if (userData.email === 'admin@heer.com') {
                    set({ user: { ...userData, role: 'admin' } });
                } else {
                    set({ user: { ...userData, role: 'user' } });
                }
            },
            logout: () => set({ user: null }),
        }),
        {
            name: 'aurelia-store',

            // Persist valid state parts, ensure products persist
            partialize: (state) => ({
                cart: state.cart,
                wishlist: state.wishlist,
                savedStyles: state.savedStyles,
                user: state.user,
                products: state.products,
                inventory: state.inventory,
                users: state.users,
                orders: state.orders,
            }),
        }
    )
);
