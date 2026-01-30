import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/collections?new=true' },
    { label: 'Women', href: '/collections?category=women' },
    { label: 'Men', href: '/collections?category=men' },
    { label: 'Sale', href: '/collections?sale=true' },
  ],
  help: [
    { label: 'Customer Service', href: '/contact' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'FAQs', href: '/faqs' },
  ],
  about: [
    { label: 'Our Story', href: '/about' },
    { label: 'AI Style Technology', href: '/ai-policy' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-section mb-4">Join the Heer Circle</h3>
            <p className="text-primary-foreground/70 mb-6">
              Subscribe for exclusive access to new collections, personalized style tips, and member-only offers.
            </p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h4 className="font-display text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-wide text-primary-foreground">
              <span className="text-2xl"></span>
              Heer Enterprise
            </Link>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
            <span>© 2026 Heer Enterprise. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-primary-foreground/5 py-4">
        <div className="container flex flex-wrap items-center justify-center gap-6 text-xs text-primary-foreground/60">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Free Shipping Over ₹2000</span>
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>14-Day Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>AI-Powered Personalization</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
