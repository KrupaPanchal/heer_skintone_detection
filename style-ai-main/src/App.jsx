import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CollectionsPage from "./pages/CollectionsPage";
import StyleScanPage from "./pages/StyleScanPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import SavedStylesPage from "./pages/SavedStylesPage";
import ProfilePage from "./pages/ProfilePage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import NotFound from "./pages/NotFound";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import AdminDashboard from "./pages/AdminDashboard";

import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import {
    PrivacyPolicy, TermsConditions, CookiePolicy,
    ShippingReturns, SizeGuide, TrackOrder,
    Sustainability, Careers, Press
} from "./pages/StaticPages";

const queryClient = new QueryClient();

import ScrollToTop from "@/components/layout/ScrollToTop";

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/style-scan" element={<StyleScanPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/order-tracking" element={<OrderTrackingPage />} />
                    <Route path="/my-orders" element={<MyOrdersPage />} />
                    <Route path="/saved-styles" element={<SavedStylesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Footer Pages */}
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/faqs" element={<FAQPage />} />

                    {/* Static Pages */}
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="/cookies" element={<CookiePolicy />} />
                    <Route path="/shipping" element={<ShippingReturns />} />
                    <Route path="/size-guide" element={<SizeGuide />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/sustainability" element={<Sustainability />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/press" element={<Press />} />
                    <Route path="/ai-policy" element={<AboutPage />} /> {/* Reusing About for now */}

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
