import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { Heart, Sparkles, ChevronDown, X } from 'lucide-react';
import { FilterSection } from '@/components/collections/FilterSection';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { colors } from '@/data/products';

export default function CollectionsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { wishlist, products } = useStore();

    // Filter State
    const activeGender = searchParams.get('category') || 'men';
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    // Filter Options
    const categoryOptions = [
        { label: 'Tops', value: 'top' },
        { label: 'Bottoms', value: 'bottom' },
    ];

    const topSizes = [
        { label: 'XS', value: 'XS' },
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
    ];

    const bottomSizes = [
        { label: '28', value: '28' },
        { label: '30', value: '30' },
        { label: '32', value: '32' },
        { label: '34', value: '34' },
        { label: '36', value: '36' },
    ];

    const sizeOptions = useMemo(() => {
        const isTopSelected = selectedCategories.includes('top');
        const isBottomSelected = selectedCategories.includes('bottom');

        if (isTopSelected && !isBottomSelected) return topSizes;
        if (isBottomSelected && !isTopSelected) return bottomSizes;

        return [...topSizes, ...bottomSizes];
    }, [selectedCategories]);

    const colorOptions = colors.map(c => ({
        // We still provide label for list view fallbacks if needed, but for palette we use hex
        label: c.name,
        value: c.id,
        hex: c.hex,
        name: c.name
    }));

    // Toggle Gender
    const handleGenderChange = (gender) => {
        setSearchParams({ category: gender });
        setSelectedCategories([]);
        setSelectedSizes([]);
        setSelectedColors([]);
    };

    // Filter Logic
    const displayedProducts = useMemo(() => {
        return products.filter(p => {
            // 1. Gender Match
            if (p.category !== activeGender) return false;

            // 2. Category Match
            if (selectedCategories.length > 0 && !selectedCategories.includes(p.subcategory)) return false;

            // 3. Size Match (Item must have AT LEAST one of the selected sizes)
            if (selectedSizes.length > 0) {
                const hasSize = p.sizes?.some(size => selectedSizes.includes(size));
                if (!hasSize) return false;
            }

            // 4. Color Match
            if (selectedColors.length > 0) {
                if (!p.colors || !p.colors.some(c => selectedColors.includes(c))) return false;
            }

            return true;
        });
    }, [products, activeGender, selectedCategories, selectedSizes, selectedColors]);

    const activeFilterCount = selectedCategories.length + selectedSizes.length + selectedColors.length;

    const FilterPopover = ({ title, options, selected, onChange, variant = "list" }) => {
        const isWheel = variant === "wheel";
        const widthClass = isWheel ? "w-[240px]" : "w-[200px]";

        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("border-dashed", selected.length > 0 && "border-solid border-primary bg-primary/5")}>
                        {title}
                        {selected.length > 0 && (
                            <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal lg:hidden">
                                {selected.length}
                            </Badge>
                        )}
                        {selected.length > 0 && (
                            <div className="hidden lg:flex ml-2 h-4 min-w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary px-1">
                                {selected.length}
                            </div>
                        )}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn("p-4", widthClass)} align="start">
                    <FilterSection
                        title={title}
                        options={options}
                        selected={selected}
                        onChange={onChange}
                        variant={variant}
                    />
                    {selected.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-4 w-full h-8 text-xs font-normal text-muted-foreground hover:text-primary"
                            onClick={() => onChange([])}
                        >
                            Clear {title}
                        </Button>
                    )}
                </PopoverContent>
            </Popover>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container">

                    {/* Page Header */}
                    <div className="flex flex-col items-center mb-10 text-center animate-fade-in-up">
                        <h1 className="font-display text-4xl md:text-5xl mb-3">Explore Our Collections</h1>
                        <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                            Refine your style with our curated selection.
                        </p>

                        {/* Gender Toggle */}
                        <div className="flex justify-center mb-0">
                            <div className="bg-secondary/50 p-1 rounded-full flex gap-1">
                                {['men', 'women'].map((gender) => (
                                    <button
                                        key={gender}
                                        onClick={() => handleGenderChange(gender)}
                                        className={cn(
                                            "px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize",
                                            activeGender === gender
                                                ? "bg-background shadow-sm text-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                        )}
                                    >
                                        {gender}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Filters Bar - Centered */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <FilterPopover
                                title="Category"
                                options={categoryOptions}
                                selected={selectedCategories}
                                onChange={setSelectedCategories}
                            />
                            <FilterPopover
                                title="Size"
                                options={sizeOptions}
                                selected={selectedSizes}
                                onChange={setSelectedSizes}
                            />
                            <FilterPopover
                                title="Color"
                                options={colorOptions}
                                selected={selectedColors}
                                onChange={setSelectedColors}
                                variant="wheel"
                            />

                            {activeFilterCount > 0 && (
                                <Button
                                    variant="ghost"
                                    className="h-8 px-2 lg:px-3 text-muted-foreground hover:text-destructive"
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setSelectedSizes([]);
                                        setSelectedColors([]);
                                    }}
                                >
                                    Reset
                                    <X className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>


                    {/* Product Grid */}
                    <div className="min-h-[400px]">
                        {displayedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 animate-fade-in">
                                {displayedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-secondary/20 rounded-lg">
                                <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="font-display text-2xl mb-2">No styles found</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto mb-6">
                                    Try adjusting your filters to find what you're looking for.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setSelectedSizes([]);
                                        setSelectedColors([]);
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
