import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';

export function SimilarProducts({ currentProductId }) {
    const { products } = useStore();

    // Filter out current product and take top 4
    const similarProducts = products
        .filter(p => p.id !== currentProductId)
        .slice(0, 4);

    return (
        <section className="mt-20">
            <h2 className="font-display text-2xl mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {similarProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
