import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function FilterSection({ title, options, selected, onChange, variant = "list" }) {
    // options: array of { label: string | ReactNode, value: string, count?: number, hex?: string }
    // selected: array of strings (values)
    // variant: "list" | "palette"

    if (variant === "wheel") {
        const radius = 80; // Radius of the wheel
        const center = 100; // Center offset (half of container size 200px)

        // Sort options by hue if possible, or just assume they are passed in order
        // For now, mapping rainbow order manually or assuming data is sorted.
        // Let's assume input 'options' are sorted.

        return (
            <div className="space-y-3">
                <h3 className="font-medium text-sm text-foreground text-center">{title}</h3>
                <div className="relative h-[200px] w-[200px] mx-auto">
                    {/* Central white circle or indicator could go here */}
                    <div className="absolute inset-0 m-auto h-16 w-16 bg-muted/20 rounded-full flex items-center justify-center text-xs text-muted-foreground">
                        {selected.length > 0 ? `${selected.length} Selected` : 'Pick Color'}
                    </div>

                    {options.map((option, index) => {
                        const total = options.length;
                        const angle = (index / total) * 360;
                        // Convert polar to cartesian
                        // x = r * cos(theta)
                        // y = r * sin(theta)
                        // Offset by -90deg to start at top? Or just use transform.

                        const rotate = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;

                        return (
                            <button
                                key={option.value}
                                onClick={() => {
                                    if (selected.includes(option.value)) {
                                        onChange(selected.filter((v) => v !== option.value));
                                    } else {
                                        onChange([...selected, option.value]);
                                    }
                                }}
                                className={cn(
                                    "absolute top-[calc(50%-12px)] left-[calc(50%-12px)] h-6 w-6 rounded-full border border-border shadow-sm transition-all hover:scale-125 hover:z-10",
                                    selected.includes(option.value) && "ring-2 ring-primary ring-offset-2 z-10 scale-110"
                                )}
                                style={{
                                    transform: rotate,
                                    backgroundColor: option.hex
                                }}
                                title={option.name}
                            >
                                <span className="sr-only">{option.name || option.value}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === "palette") {
        return (
            <div className="space-y-3">
                <h3 className="font-medium text-sm text-foreground">{title}</h3>
                <div className="flex flex-wrap gap-2">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                if (selected.includes(option.value)) {
                                    onChange(selected.filter((v) => v !== option.value));
                                } else {
                                    onChange([...selected, option.value]);
                                }
                            }}
                            className={cn(
                                "h-8 w-8 rounded-full border border-border relative flex items-center justify-center transition-all hover:scale-105",
                                selected.includes(option.value) && "ring-2 ring-primary ring-offset-2 border-primary"
                            )}
                            style={{ backgroundColor: option.hex }}
                            title={option.name} // basic tooltip
                        >
                            {/* Checkmark for accessibility/visibility on selected items */}
                            {selected.includes(option.value) && (
                                <span className={cn(
                                    "block h-2 w-2 rounded-full",
                                    // Contrast check logic is complex, simpler to just use ring or invert color
                                    // For now just relying on the ring
                                    option.hex === '#FFFFFF' || option.hex === '#FFFFF0' || option.hex === '#FFFDD0' ? "bg-black" : "bg-white"
                                )} />
                            )}
                            <span className="sr-only">{option.name || option.value}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">{title}</h3>
            <div className="space-y-2">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                            id={`filter-${title}-${option.value}`}
                            checked={selected.includes(option.value)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    onChange([...selected, option.value]);
                                } else {
                                    onChange(selected.filter((v) => v !== option.value));
                                }
                            }}
                        />
                        <Label
                            htmlFor={`filter-${title}-${option.value}`}
                            className="text-sm font-normal text-muted-foreground hover:text-foreground cursor-pointer flex-1 flex justify-between"
                        >
                            <span>{option.label}</span>
                            {option.count !== undefined && <span className="text-xs text-muted-foreground/60">({option.count})</span>}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
