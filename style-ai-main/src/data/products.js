



// Updated at 21:28
import menNew1 from '@/assets/men_new_1.jpg';
import menNew2 from '@/assets/men_new_2.jpg';
import menNew3 from '@/assets/men_new_3.jpg';
import recImg1 from '@/assets/style_rec_1.jpg';
import recImg2 from '@/assets/style_rec_2.jpg';
import recImg3 from '@/assets/style_rec_3.jpg';
import recImg4 from '@/assets/style_rec_4.jpg';
import recImg5 from '@/assets/style_rec_5.jpg';
import favNew1 from '@/assets/fav_new_1.jpg';
import favNew2 from '@/assets/fav_new_2.jpg';
import favNew3 from '@/assets/fav_new_3.jpg';
import favNew4 from '@/assets/fav_new_4.jpg';

const topImages = [
    recImg2, // Green Vincent
    recImg3, // Black Sketches
    recImg4, // Blue Wave
    recImg5, // White Squares
    "https://images.unsplash.com/photo-1551163943-3f6a29e39bb7?fm=jpg&q=60&w=800", // Woman Tee
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?fm=jpg&q=60&w=800", // Woman Blouse
    "https://images.unsplash.com/photo-1534126511673-b6899657816a?fm=jpg&q=60&w=800", // Woman Crop
    "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?fm=jpg&q=60&w=800", // Woman Shirt
    "https://images.unsplash.com/photo-1503342394128-c104d54dba01?fm=jpg&q=60&w=800", // Woman Tee
];

// ... (bottomImages remain unchanged) ...

// ... (menTopImages/menBottomImages remain unchanged) ...

// export const products = generateProducts(); // Moved to bottom to fix hoisting access

export const staticRecommendations = [
    {
        id: 'fav-new-1',
        name: 'Oversized Plaid Flannel',
        image: favNew1,
        price: 1899,
        category: 'women',
        isNew: true
    },
    {
        id: 'fav-new-2',
        name: 'Striped V-Neck Blouse',
        image: favNew2,
        price: 1299,
        category: 'women',
        isNew: false
    },
    {
        id: 'fav-new-3',
        name: 'Lavender Ruched Crop Top',
        image: favNew3,
        price: 1499,
        category: 'women',
        isNew: true
    },
    {
        id: 'fav-new-4',
        name: 'Elegant Tie-Waist Shirt',
        image: favNew4,
        price: 2199,
        category: 'women',
        isNew: true
    }
];

const bottomImages = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", // White Tee
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800", // Graphic Tee
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800", // Black Tee
    "https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&q=80&w=800", // Grey Tee
];

// Colors: Red(0), Orange(1), Yellow(2), Green(3), Teal(4), Blue(5), Indigo(6), Purple(7)
// Pink(8), Gold(9), Charcoal(10), Cream(11), Navy(12), Black(13), White(14), Brown(15)
const menTopImages = [
    "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&q=80&w=800", // Red (Varsity)
    menNew3, // Orange (Brown/Orange tone)
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", // Yellow (Tee)
    recImg2, // Green (Vincent)
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800", // Teal (T-shirt)
    recImg4, // Blue (Wave)
    "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?auto=format&fit=crop&q=80&w=800", // Indigo (Polo)
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", // Purple (Hoodie)
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800", // Pink (Jacket)
    menNew2, // Gold
    menNew1, // Charcoal
    recImg5, // Cream (Using White Squares as Substitute for Cream/Westside)
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800", // Navy (Shirt)
    recImg3, // Black (Sketches) -- Using this for Black
    recImg5, // White (Squares)
    "https://images.unsplash.com/photo-1589465885857-44edb59ef526?auto=format&fit=crop&q=80&w=800", // Brown (Linen)
];

const menBottomImages = [
    "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800", // Men Jeans
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800", // Men Chinos
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800", // Men Trousers
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800", // Men Shorts
    "https://images.unsplash.com/photo-1552066344-2464c1135c32?auto=format&fit=crop&q=80&w=800", // Men Joggers
    "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800", // Jeans
];

// Base templates for generation
const templates = {
    top: {
        name: 'Designer Top',
        price: 15120,
        originalPrice: 19920,
        category: 'women',
        subcategory: 'top',
        colors: ['gold'],
        fabric: 'silk',
        fit: 'relaxed',
        stock: 20,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        isSale: true,
    },
    bottom: {
        name: 'Designer Bottom',
        price: 23600,
        category: 'women',
        subcategory: 'bottom',
        colors: ['charcoal'],
        fabric: 'wool',
        fit: 'slim',
        stock: 15,
        sizes: ['24', '26', '28', '30', '32'],
    }
};

const topNames = [
    "Silk Blouse", "Cotton Shirt", "Summer Crop", "Knit Sweater", "Vintage Tee",
    "Linen Tunic", "Satin Camisole", "Chiffon Blouse", "Structured Blazer", "Casual Hoodie",
    "Evening Top", "Lace Bodysuit", "Denim Jacket", "Wrap Top", "Peplum Blouse",
    "Off-Shoulder Top", "Turtleneck", "Graphic Tee", "Kimono Cover-up", "Velvet Top"
];

const bottomNames = [
    "Tailored Trousers", "Denim Jeans", "Midi Skirt", "Leather Pants", "Cargo Pants",
    "Pleated Skirt", "Linen Shorts", "Wide Leg Pants", "Pencil Skirt", " Joggers",
    "Palazzo Pants", "Mini Skirt", "Corduroy Pants", "Biker Shorts", "Maxi Skirt",
    "High-Waisted Jeans", "Culottes", "A-Line Skirt", "Chino Pants", "Silk Skirt"
];

// Mappings for image colors
// Corrected based on user feedback (Index 3 of women tops is Blue, not Pink)
const menTopColors = ['black', 'white', 'black', 'blue', 'orange', 'navy', 'cream', 'red'];
const menBottomColors = ['blue', 'cream', 'black', 'green', 'charcoal', 'cream', 'blue', 'charcoal'];
const womenTopColors = ['gold', 'white', 'black', 'blue', 'green', 'pink', 'purple', 'yellow']; // Swapped blue and pink position roughly
const womenBottomColors = ['blue', 'black', 'white', 'black', 'green', 'white', 'white', 'blue'];

// Generate products
const generateProducts = () => {
    const items = [];
    const allColors = colors.map(c => c.id);

    // Helper to get random image from arrays (cycling)
    const getImg = (arr, idx) => arr[idx % arr.length];

    // Helper to Get Price
    const getPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 1. Generate WOMEN'S Products (All Colors)
    allColors.forEach((colorId, i) => {
        const colorName = colors.find(c => c.id === colorId).name;

        // Woman Top
        items.push({
            ...templates.top,
            id: `w-top-${colorId}`,
            name: `${colorName} ${topNames[i % topNames.length]}`, // e.g. "Red Silk Blouse"
            image: getImg(topImages, i),
            colors: [colorId],
            price: getPrice(800, 2500),
            category: 'women',
            subcategory: 'top',
            stock: 50,
            isNew: i < 4,
            isSale: i > 10
        });

        // Woman Bottom
        items.push({
            ...templates.bottom,
            id: `w-bottom-${colorId}`,
            name: `${colorName} ${bottomNames[i % bottomNames.length]}`,
            image: getImg(bottomImages, i),
            colors: [colorId],
            price: getPrice(1200, 3500),
            category: 'women',
            subcategory: 'bottom',
            stock: 50,
            isNew: i > 12,
            isSale: i < 3
        });
    });

    // 2. Generate MEN'S Products (All Colors)
    allColors.forEach((colorId, i) => {
        const colorName = colors.find(c => c.id === colorId).name;

        // Man Top
        items.push({
            ...templates.top,
            id: `m-top-${colorId}`,
            name: `${colorName} ${['T-Shirt', 'Polo', 'Shirt', 'Hoodie', 'Jacket'][i % 5]}`,
            image: getImg(menTopImages, i),
            colors: [colorId],
            price: getPrice(700, 2000),
            category: 'men',
            subcategory: 'top',
            stock: 50,
            sizes: ['S', 'M', 'L', 'XL'],
            isNew: i < 3,
            isSale: i > 8
        });

        // Man Bottom
        items.push({
            ...templates.bottom,
            id: `m-bottom-${colorId}`,
            name: `${colorName} ${['Chinos', 'Jeans', 'Trousers', 'Shorts', 'Joggers'][i % 5]}`,
            image: getImg(menBottomImages, i),
            colors: [colorId],
            price: getPrice(1000, 3000),
            category: 'men',
            subcategory: 'bottom',
            stock: 50,
            sizes: ['30', '32', '34', '36'],
            isNew: i > 10,
            isSale: i < 5
        });
    });

    return items;
};

export const categories = [
    { id: 'women', name: 'Women', count: 16 },
    { id: 'men', name: 'Men', count: 16 },
];

export const colors = [
    { id: 'red', name: 'Red', hex: '#EF4444' },
    { id: 'orange', name: 'Orange', hex: '#F97316' },
    { id: 'yellow', name: 'Yellow', hex: '#EAB308' },
    { id: 'green', name: 'Green', hex: '#22C55E' },
    { id: 'teal', name: 'Teal', hex: '#14B8A6' },
    { id: 'blue', name: 'Blue', hex: '#3B82F6' },
    { id: 'indigo', name: 'Indigo', hex: '#6366F1' },
    { id: 'purple', name: 'Purple', hex: '#A855F7' },
    { id: 'pink', name: 'Pink', hex: '#EC4899' },
    { id: 'gold', name: 'Gold', hex: '#C9A962' },
    { id: 'charcoal', name: 'Charcoal', hex: '#36454F' },
    { id: 'cream', name: 'Cream', hex: '#FFFDD0' },
    { id: 'navy', name: 'Navy', hex: '#000080' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'brown', name: 'Brown', hex: '#8B4513' },
];

export const fabrics = ['Silk', 'Cashmere', 'Wool', 'Cotton', 'Linen', 'Denim'];

export const fits = ['Slim', 'Regular', 'Relaxed', 'Oversized'];



export const products = generateProducts();
