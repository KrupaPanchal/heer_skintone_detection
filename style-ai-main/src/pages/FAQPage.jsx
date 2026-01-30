import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
    const faqs = [
        {
            question: "How does the AI Style Scan work?",
            answer: "Our AI analyzes a photo of your face to detect your skin's unique undertones (warm, cool, or neutral). Based on this analysis, it recommends a specific color palette that enhances your natural features."
        },
        {
            question: "Is my photo stored securely?",
            answer: "Yes, absolutely. Your privacy is our priority. Photos uploaded for the Style Scan are processed in real-time and are immediately deleted after analysis. We do not store your personal photos."
        },
        {
            question: "Can I return items if they don't fit?",
            answer: "We offer a hassle-free 14-day return policy. If you're not completely satisfied with the fit or style, you can return the item in its original condition for a full refund or exchange."
        },
        {
            question: "How much is shipping?",
            answer: "We offer free standard shipping on all orders over ₹2000. For orders under ₹2000, a flat shipping rate of ₹150 applies."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we only ship within India. We are working on expanding our shipping to international locations soon!"
        },
        {
            question: "How do I take the best photo for the AI scan?",
            answer: "For the best results, take your photo in natural daylight without makeup. Avoid shadows on your face and ensure your face is clearly visible."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container max-w-3xl">
                    <h1 className="text-section text-center mb-8">Frequently Asked Questions</h1>

                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-12 text-center p-8 bg-secondary/50 rounded-xl">
                        <h3 className="font-medium mb-2">Still have questions?</h3>
                        <p className="text-sm text-muted-foreground mb-4">We're here to help.</p>
                        <a href="/contact" className="text-accent hover:underline font-medium text-sm">Contact Support</a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
