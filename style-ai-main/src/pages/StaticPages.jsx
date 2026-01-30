import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Shared Layout for text-heavy pages
const StaticLayout = ({ title, children }) => (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
            <div className="container max-w-3xl prose prose-neutral dark:prose-invert">
                <h1 className="text-3xl font-display font-medium mb-8">{title}</h1>
                {children}
            </div>
        </main>
        <Footer />
    </div>
);

export function PrivacyPolicy() {
    return (
        <StaticLayout title="Privacy Policy">
            <p>Last updated: January 2026</p>
            <h3>1. Introduction</h3>
            <p>Welcome to Heer Enterprise. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
            <h3>2. Data We Collect</h3>
            <p>We collect Identity Data (name), Contact Data (email, phone, address), and Technical Data (IP address, browser type). For our AI features, we process facial images momentarily for analysis but do not store them.</p>
            <h3>3. How We Use Your Data</h3>
            <p>We use your data to process orders, deliver products, and improve our store. We do not sell your data to third parties.</p>
        </StaticLayout>
    );
}

export function TermsConditions() {
    return (
        <StaticLayout title="Terms & Conditions">
            <h3>1. Agreement to Terms</h3>
            <p>By accessing our website, you agree to be bound by these Terms of Service.</p>
            <h3>2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Heer Enterprise's website for personal, non-commercial transitory viewing only.</p>
            <h3>3. Disclaimer</h3>
            <p>The materials on Heer Enterprise's website are provided on an 'as is' basis.</p>
        </StaticLayout>
    );
}

export function CookiePolicy() {
    return (
        <StaticLayout title="Cookie Policy">
            <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.</p>
            <h3>Types of Cookies</h3>
            <ul>
                <li><strong>Essential Cookies:</strong> Required for the site to function (e.g., cart).</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use the site.</li>
            </ul>
        </StaticLayout>
    );
}

export function ShippingReturns() {
    return (
        <StaticLayout title="Shipping & Returns">
            <h3>Shipping Policy</h3>
            <p><strong>Standard Shipping:</strong> 3-5 business days. Free for orders over ₹2000.</p>
            <p><strong>Express Shipping:</strong> 1-2 business days. Flat rate of ₹250.</p>

            <h3 className="mt-8">Return Policy</h3>
            <p>We accept returns within 14 days of delivery. Items must be unworn, unwashed, and with original tags attached.</p>
            <p>To initiate a return, please contact our support team or visit your account portal.</p>
        </StaticLayout>
    );
}

export function SizeGuide() {
    return (
        <StaticLayout title="Size Guide">
            <p>Use this guide to find your perfect fit.</p>
            <div className="not-prose mt-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-secondary">
                                <th className="p-3 text-left border">Size</th>
                                <th className="p-3 text-left border">Bust (in)</th>
                                <th className="p-3 text-left border">Waist (in)</th>
                                <th className="p-3 text-left border">Hips (in)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-3 border">XS</td><td className="p-3 border">32-33</td><td className="p-3 border">24-25</td><td className="p-3 border">34-35</td></tr>
                            <tr><td className="p-3 border">S</td><td className="p-3 border">34-35</td><td className="p-3 border">26-27</td><td className="p-3 border">36-37</td></tr>
                            <tr><td className="p-3 border">M</td><td className="p-3 border">36-37</td><td className="p-3 border">28-29</td><td className="p-3 border">38-39</td></tr>
                            <tr><td className="p-3 border">L</td><td className="p-3 border">38-40</td><td className="p-3 border">30-32</td><td className="p-3 border">40-42</td></tr>
                            <tr><td className="p-3 border">XL</td><td className="p-3 border">41-43</td><td className="p-3 border">33-35</td><td className="p-3 border">43-45</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </StaticLayout>
    );
}

export function TrackOrder() {
    return (
        <StaticLayout title="Track Your Order">
            <div className="card text-center p-8 bg-secondary/20 rounded-xl not-prose">
                <p className="mb-4 text-muted-foreground">Please enter your Order ID to see the status.</p>
                <div className="flex gap-2 max-w-sm mx-auto">
                    <input type="text" placeholder="Order ID (e.g. HF-1234)" className="flex-1 h-10 px-3 rounded-md border border-input bg-background" />
                    <button className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium">Track</button>
                </div>
            </div>
        </StaticLayout>
    );
}

export function Sustainability() {
    return (
        <StaticLayout title="Sustainability">
            <p>Fashion shouldn't cost the earth.</p>
            <h3>Our Commitments</h3>
            <ul>
                <li><strong>Ethical Sourcing:</strong> We partner with factories that pay fair wages and ensure safe working conditions.</li>
                <li><strong>Eco-Friendly Fabrics:</strong> We prioritize organic cotton, linen, and recycled polyester.</li>
                <li><strong>Zero-Waste Packaging:</strong> All our packaging is plastic-free and 100% recyclable.</li>
            </ul>
        </StaticLayout>
    );
}

export function Careers() {
    return (
        <StaticLayout title="Careers">
            <p>Join the team that's revolutionizing fashion with AI.</p>
            <div className="not-prose mt-8 grid gap-4">
                {['Senior Frontend Engineer', 'AI Research Scientist', 'Fashion Merchandiser'].map((job) => (
                    <div key={job} className="p-4 border rounded-lg flex justify-between items-center hover:bg-secondary/20 transition-colors cursor-pointer text-left">
                        <div>
                            <h4 className="font-medium">{job}</h4>
                            <p className="text-xs text-muted-foreground">Gurugram, India • Full-time</p>
                        </div>
                        <span className="text-sm font-medium text-accent">View Role →</span>
                    </div>
                ))}
            </div>
        </StaticLayout>
    );
}

export function Press() {
    return (
        <StaticLayout title="Press">
            <p>See what others are saying about Heer Enterprise.</p>
            <div className="not-prose mt-8 gap-6 grid md:grid-cols-2">
                <div className="p-6 border rounded-lg">
                    <h3 className="font-display text-xl mb-2">Vogue India</h3>
                    <p className="text-muted-foreground mb-4">"The AI stylist that actually gets it right. Heer Enterprise is changing how we shop."</p>
                    <a href="#" className="text-sm underline">Read Article</a>
                </div>
                <div className="p-6 border rounded-lg">
                    <h3 className="font-display text-xl mb-2">TechCrunch</h3>
                    <p className="text-muted-foreground mb-4">"Startup Spotlight: How Computer Vision is solving the 'return rate' crisis in e-commerce."</p>
                    <a href="#" className="text-sm underline">Read Article</a>
                </div>
            </div>
        </StaticLayout>
    );
}
