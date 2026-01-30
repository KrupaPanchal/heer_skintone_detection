import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container max-w-5xl">
                    <h1 className="text-section text-center mb-4">Contact Us</h1>
                    <p className="text-body text-center max-w-2xl mx-auto mb-12">
                        Have a question about your order, our AI technology, or just want to say hello?
                        We'd love to hear from you.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="card-elevated p-8">
                                <h3 className="text-card-title mb-6">Get in Touch</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                            <Mail className="h-5 w-5 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Email Us</h4>
                                            <p className="text-sm text-muted-foreground">support@heerfashion.com</p>
                                            <p className="text-sm text-muted-foreground">press@heerfashion.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                            <Phone className="h-5 w-5 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Call Us</h4>
                                            <p className="text-sm text-muted-foreground">+91 (800) 123-4567</p>
                                            <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am - 6pm IST</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                            <MapPin className="h-5 w-5 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Visit Us</h4>
                                            <p className="text-sm text-muted-foreground">
                                                123 Fashion Street, Cyber City<br />
                                                Gurugram, Haryana, India 122002
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="card-elevated p-8">
                            <h3 className="text-card-title mb-6">Send a Message</h3>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input placeholder="Jane" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" placeholder="jane@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Subject</label>
                                    <Input placeholder="How can we help?" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Message</label>
                                    <Textarea placeholder="Type your message here..." rows={4} className="resize-none" />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
