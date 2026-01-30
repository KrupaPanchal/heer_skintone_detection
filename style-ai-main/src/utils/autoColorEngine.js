// autoColorEngine.js

const BASE_COLORS = {
  red: { name: "Crimson Red", hex: "#E63946" },
  blue: { name: "Steel Blue", hex: "#457B9D" },
  green: { name: "Teal Green", hex: "#2A9D8F" },
  yellow: { name: "Golden Yellow", hex: "#F4D35E" },
  pink: { name: "Coral Pink", hex: "#F28482" },
  purple: { name: "Royal Purple", hex: "#9D4EDD" },
  brown: { name: "Chocolate Brown", hex: "#8D5524" },
  black: { name: "Jet Black", hex: "#1A1A1A" },
  white: { name: "Soft White", hex: "#F8F9FA" },
  grey: { name: "Light Grey", hex: "#ADB5BD" }
};

const adjustColor = (hex, percent) => {
  let num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00ff) + percent;
  let b = (num & 0x0000ff) + percent;

  return (
    "#" +
    (
      0x1000000 +
      (Math.min(255, Math.max(0, r)) << 16) +
      (Math.min(255, Math.max(0, g)) << 8) +
      Math.min(255, Math.max(0, b))
    )
      .toString(16)
      .slice(1)
  );
};

export const generatePalette = (skinTone, undertone) => {
  let brightness = 0;

  // Skin tone brightness logic
  if (skinTone === "Fair") brightness = 40;
  else if (skinTone === "Light") brightness = 25;
  else if (skinTone === "Medium") brightness = 10;
  else if (skinTone === "Olive") brightness = 0;
  else if (skinTone === "Dark") brightness = -20;

  // Undertone influence
  if (undertone === "cool") brightness -= 5;
  if (undertone === "warm") brightness += 5;

  return Object.keys(BASE_COLORS).map(key => ({
    id: key,
    name: BASE_COLORS[key].name,
    hex: adjustColor(BASE_COLORS[key].hex, brightness)
  }));
};
