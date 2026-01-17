import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Pencil } from "lucide-react";

import tshirtImg from "@/assets/products/tshirt.jpg";
import hoodieImg from "@/assets/products/hoodie.jpg";
import poloImg from "@/assets/products/polo.jpg";
import tankImg from "@/assets/products/tank.jpg";
import longsleeveImg from "@/assets/products/longsleeve.jpg";
import sweatshirtImg from "@/assets/products/sweatshirt.jpg";

const garmentTypes = [
  { value: "tshirt", label: "T-Shirt", price: 19.99, image: tshirtImg },
  { value: "hoodie", label: "Hoodie", price: 39.99, image: hoodieImg },
  { value: "polo", label: "Polo Shirt", price: 29.99, image: poloImg },
  { value: "tank", label: "Tank Top", price: 17.99, image: tankImg },
  { value: "longsleeve", label: "Long Sleeve", price: 24.99, image: longsleeveImg },
  { value: "sweatshirt", label: "Sweatshirt", price: 34.99, image: sweatshirtImg },
];

const colors = [
  { value: "white", label: "White", hex: "#FFFFFF" },
  { value: "black", label: "Black", hex: "#1a1a1a" },
  { value: "navy", label: "Navy", hex: "#1e3a5f" },
  { value: "gray", label: "Gray", hex: "#6b7280" },
  { value: "red", label: "Red", hex: "#dc2626" },
  { value: "forest", label: "Forest Green", hex: "#166534" },
];

const genders = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
];

const Products = () => {
  const [selectedGarment, setSelectedGarment] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const isSelectionComplete = selectedGarment && selectedColor && selectedGender;

  const getEditLink = () => {
    const params = new URLSearchParams();
    if (selectedGarment) params.set("garment", selectedGarment);
    if (selectedColor) params.set("color", selectedColor);
    if (selectedGender) params.set("gender", selectedGender);
    return `/customize?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your Apparel
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select your garment type, color, and style to get started with customization.
            </p>
          </div>

          {/* Selection Steps */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Step 1: Garment Type */}
            <div className="space-y-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  selectedGarment ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {selectedGarment ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <h2 className="text-xl font-semibold text-foreground">Select Garment Type</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pl-11">
                {garmentTypes.map((garment) => (
                  <button
                    key={garment.value}
                    onClick={() => setSelectedGarment(garment.value)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedGarment === garment.value
                        ? "border-accent bg-accent/10 shadow-md"
                        : "border-border hover:border-accent/50 bg-card"
                    }`}
                  >
                    <img 
                      src={garment.image} 
                      alt={garment.label} 
                      className="w-full h-32 object-contain mb-3"
                    />
                    <h3 className="font-semibold text-foreground">{garment.label}</h3>
                    <p className="text-sm text-muted-foreground">From ${garment.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Color */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  selectedColor ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {selectedColor ? <Check className="h-4 w-4" /> : "2"}
                </div>
                <h2 className="text-xl font-semibold text-foreground">Choose Color</h2>
              </div>
              <div className="flex flex-wrap gap-3 pl-11">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      selectedColor === color.value
                        ? "border-accent bg-accent/10 shadow-md"
                        : "border-border hover:border-accent/50 bg-card"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-border shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium text-foreground">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Gender */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  selectedGender ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {selectedGender ? <Check className="h-4 w-4" /> : "3"}
                </div>
                <h2 className="text-xl font-semibold text-foreground">Select Style</h2>
              </div>
              <div className="flex flex-wrap gap-3 pl-11">
                {genders.map((gender) => (
                  <button
                    key={gender.value}
                    onClick={() => setSelectedGender(gender.value)}
                    className={`px-6 py-3 rounded-xl border-2 transition-all font-medium ${
                      selectedGender === gender.value
                        ? "border-accent bg-accent/10 shadow-md text-foreground"
                        : "border-border hover:border-accent/50 bg-card text-foreground"
                    }`}
                  >
                    {gender.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Edit Button */}
            <div className="pt-8 pl-11 animate-slide-up" style={{ animationDelay: "300ms" }}>
              {isSelectionComplete ? (
                <div className="bg-card rounded-xl p-6 border border-border shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Your Selection</h3>
                      <p className="text-muted-foreground">
                        {garmentTypes.find(g => g.value === selectedGarment)?.label} • {" "}
                        {colors.find(c => c.value === selectedColor)?.label} • {" "}
                        {genders.find(g => g.value === selectedGender)?.label}
                      </p>
                    </div>
                    <Link to={getEditLink()}>
                      <Button size="lg" className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit & Customize
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Complete all selections above to customize your apparel.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
