import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function CollectionCard({ title, image, href, className }) {
    return (
        <Link
            to={href}
            className={cn(
                'relative block overflow-hidden rounded-lg group hover-scale',
                className
            )}
        >
            <div className="aspect-[3/4] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-primary-foreground mb-2">{title}</h3>
                <span className="text-sm text-primary-foreground/80 underline-gold inline-block">
                    Shop Now
                </span>
            </div>
        </Link>
    );
}
