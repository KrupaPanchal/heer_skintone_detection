import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import womenCollection from '@/assets/collections/women.jpg';
import menCollection from '@/assets/collections/men.jpg';

export function CollectionPreview() {
    return (
        <section className="py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
                {/* Men Collection */}
                <div className="group relative overflow-hidden h-full min-h-[500px]">
                    <img
                        src={menCollection}
                        alt="Men's Collection"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                        <h2 className="text-5xl font-display mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">Men</h2>
                        <div className="flex gap-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            <Link to="/collections?category=men&subcategory=top">
                                <Button variant="secondary" className="bg-white text-black hover:bg-white/90 min-w-[120px]">
                                    Shop Tops
                                </Button>
                            </Link>
                            <Link to="/collections?category=men&subcategory=bottom">
                                <Button variant="secondary" className="bg-white text-black hover:bg-white/90 min-w-[120px]">
                                    Shop Bottoms
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Women Collection */}
                <div className="group relative overflow-hidden h-full min-h-[500px]">
                    <img
                        src={womenCollection}
                        alt="Women's Collection"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                        <h2 className="text-5xl font-display mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">Women</h2>
                        <div className="flex gap-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            <Link to="/collections?category=women&subcategory=top">
                                <Button variant="secondary" className="bg-white text-black hover:bg-white/90 min-w-[120px]">
                                    Shop Tops
                                </Button>
                            </Link>
                            <Link to="/collections?category=women&subcategory=bottom">
                                <Button variant="secondary" className="bg-white text-black hover:bg-white/90 min-w-[120px]">
                                    Shop Bottoms
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
