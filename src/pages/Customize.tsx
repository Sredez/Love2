import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModelPreview from "@/components/ModelPreview";
import FullscreenPreviewModal from "@/components/FullscreenPreviewModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Image, RotateCcw, ShoppingCart, Sparkles, ZoomIn, Move, RotateCw, Maximize2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Import model thumbnails
import femaleAsianTshirt from "@/assets/models/female-asian-tshirt.jpg";
import maleCaucasianTshirt from "@/assets/models/male-caucasian-tshirt.jpg";
import femaleCaucasianTshirt from "@/assets/models/female-caucasian-tshirt.jpg";
import maleAfricanTshirt from "@/assets/models/male-african-tshirt.jpg";
import femaleAfricanTshirt from "@/assets/models/female-african-tshirt.jpg";
import maleAsianTshirt from "@/assets/models/male-asian-tshirt.jpg";

// Model thumbnails mapping
const modelThumbnails: Record<string, string> = {
  "caucasian-male": maleCaucasianTshirt,
  "caucasian-female": femaleCaucasianTshirt,
  "african-male": maleAfricanTshirt,
  "african-female": femaleAfricanTshirt,
  "asian-male": maleAsianTshirt,
  "asian-female": femaleAsianTshirt,
  "hispanic-male": maleCaucasianTshirt,
  "hispanic-female": femaleCaucasianTshirt,
};

const garmentTypes = [
  { value: "tshirt", label: "T-Shirt" },
  { value: "hoodie", label: "Hoodie" },
  { value: "polo", label: "Polo Shirt" },
  { value: "tank", label: "Tank Top" },
  { value: "longsleeve", label: "Long Sleeve" },
  { value: "sweatshirt", label: "Sweatshirt" },
];

const colors = [
  { value: "white", label: "White", hex: "#FFFFFF" },
  { value: "black", label: "Black", hex: "#1a1a1a" },
  { value: "navy", label: "Navy", hex: "#1e3a5f" },
  { value: "darkgray", label: "Dark Gray", hex: "#374151" },
  { value: "charcoal", label: "Charcoal", hex: "#2d3748" },
  { value: "gray", label: "Gray", hex: "#6b7280" },
  { value: "lightgray", label: "Light Gray", hex: "#d1d5db" },
  { value: "red", label: "Red", hex: "#dc2626" },
  { value: "darkred", label: "Dark Red", hex: "#7f1d1d" },
  { value: "maroon", label: "Maroon", hex: "#4c0519" },
  { value: "crimson", label: "Crimson", hex: "#a41d3e" },
  { value: "forest", label: "Forest Green", hex: "#166534" },
  { value: "darkgreen", label: "Dark Green", hex: "#1b4332" },
  { value: "lightgreen", label: "Light Green", hex: "#86efac" },
  { value: "darkblue", label: "Dark Blue", hex: "#1e40af" },
  { value: "royalblue", label: "Royal Blue", hex: "#2563eb" },
  { value: "lightblue", label: "Light Blue", hex: "#93c5fd" },
  { value: "purple", label: "Purple", hex: "#7c3aed" },
  { value: "darkpurple", label: "Dark Purple", hex: "#4c1d95" },
  { value: "orange", label: "Orange", hex: "#ea580c" },
  { value: "darkorange", label: "Dark Orange", hex: "#b45309" },
  { value: "yellow", label: "Yellow", hex: "#eab308" },
  { value: "gold", label: "Gold", hex: "#d97706" },
  { value: "pink", label: "Pink", hex: "#ec4899" },
  { value: "rose", label: "Rose", hex: "#f43f5e" },
  { value: "teal", label: "Teal", hex: "#14b8a6" },
  { value: "cyan", label: "Cyan", hex: "#06b6d4" },
  { value: "brown", label: "Brown", hex: "#92400e" },
  { value: "tan", label: "Tan", hex: "#d2691e" },
  { value: "beige", label: "Beige", hex: "#f5f5dc" },
];

const sizes = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "2XL" },
  { value: "xxxl", label: "3XL" },
];

const genders = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
];

const modelGenders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const modelEthnicities = [
  { value: "caucasian", label: "Caucasian" },
  { value: "african", label: "African" },
  { value: "asian", label: "Asian" },
  { value: "hispanic", label: "Hispanic" },
];

const Customize = () => {
  const [searchParams] = useSearchParams();
  
  // Read initial values from URL params (passed from Products page)
  const initialGarment = searchParams.get("garment") || "tshirt";
  const initialColor = searchParams.get("color") || "white";
  const initialGender = searchParams.get("gender") || "unisex";

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [garmentType, setGarmentType] = useState(initialGarment);
  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState("m");
  const [gender, setGender] = useState(initialGender);
  const [modelGender, setModelGender] = useState("male");
  const [modelEthnicity, setModelEthnicity] = useState("caucasian");
  const modelType = `${modelEthnicity}-${modelGender}`;
  const [isDragging, setIsDragging] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [fullscreenPreviewOpen, setFullscreenPreviewOpen] = useState(false);
  
  // Design positioning controls
  const [designScale, setDesignScale] = useState(100);
  const [designOffsetX, setDesignOffsetX] = useState(0);
  const [designOffsetY, setDesignOffsetY] = useState(0);
  const [designRotation, setDesignRotation] = useState(0);
  
  // Color threshold control for shadow-to-color transition
  const [colorThreshold, setColorThreshold] = useState(210);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedColor = colors.find((c) => c.value === color);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Design Studio
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload your design, customize your apparel, and see it on a model before you buy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Preview Area */}
            <div className="space-y-6 animate-slide-up">
              {/* Live Model Preview */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl group">
                <ModelPreview
                  garmentType={garmentType}
                  color={color}
                  colorHex={selectedColor?.hex || "#FFFFFF"}
                  size={size}
                  gender={gender}
                  modelType={modelType}
                  uploadedImage={uploadedImage}
                  designScale={designScale}
                  designOffsetX={designOffsetX}
                  designOffsetY={designOffsetY}
                  designRotation={designRotation}
                  colorThreshold={colorThreshold}
                />
                {/* Fullscreen button overlay */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg gap-2"
                  onClick={() => setFullscreenPreviewOpen(true)}
                >
                  <Maximize2 className="h-4 w-4" />
                  Fullscreen
                </Button>
              </div>

              {/* Model Selection - Visual Thumbnails */}
              <div className="bg-card rounded-xl p-6 shadow-md space-y-4">
                <h3 className="font-semibold text-foreground">Choose Model</h3>
                
                {/* Model Grid with Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {modelEthnicities.map((ethnicity) => (
                    modelGenders.map((gender) => {
                      const key = `${ethnicity.value}-${gender.value}`;
                      const isSelected = modelEthnicity === ethnicity.value && modelGender === gender.value;
                      const thumbnail = modelThumbnails[key];
                      
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setModelEthnicity(ethnicity.value);
                            setModelGender(gender.value);
                          }}
                          className={`relative group rounded-xl overflow-hidden transition-all ${
                            isSelected
                              ? "ring-2 ring-accent ring-offset-2 ring-offset-background shadow-lg scale-105"
                              : "hover:ring-2 hover:ring-accent/50 hover:shadow-md"
                          }`}
                        >
                          <div className="aspect-[3/4] overflow-hidden">
                            <img
                              src={thumbnail}
                              alt={`${gender.label} ${ethnicity.label}`}
                              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className={`absolute bottom-0 left-0 right-0 py-1.5 px-1 text-center text-xs font-medium transition-all ${
                            isSelected
                              ? "bg-accent text-accent-foreground"
                              : "bg-background/80 backdrop-blur-sm text-foreground"
                          }`}>
                            {gender.label}
                          </div>
                        </button>
                      );
                    })
                  )).flat()}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Click a model to preview instantly
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                  isDragging
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <div className="space-y-4">
                  {uploadedImage ? (
                    <>
                      <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden shadow-md">
                        <img
                          src={uploadedImage}
                          alt="Uploaded design"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-foreground font-medium">Design uploaded!</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedImage(null);
                        }}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Change Design
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto rounded-xl bg-accent/10 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-accent" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">Drop your design here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supports PNG, JPG, SVG up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Design Position Controls - Only show when image is uploaded */}
              {uploadedImage && (
                <div className="bg-card rounded-xl p-6 shadow-md space-y-5 border border-border">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Move className="h-4 w-4" />
                    Adjust Design Position
                  </h3>
                  
                  {/* Scale */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <ZoomIn className="h-4 w-4 text-muted-foreground" />
                        Size
                      </label>
                      <span className="text-sm text-muted-foreground">{designScale}%</span>
                    </div>
                    <Slider
                      value={[designScale]}
                      onValueChange={(value) => setDesignScale(value[0])}
                      min={30}
                      max={150}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>

                  {/* Horizontal Position */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Horizontal Position</label>
                      <span className="text-sm text-muted-foreground">{designOffsetX > 0 ? `+${designOffsetX}` : designOffsetX}%</span>
                    </div>
                    <Slider
                      value={[designOffsetX]}
                      onValueChange={(value) => setDesignOffsetX(value[0])}
                      min={-30}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>← Left</span>
                      <span>Right →</span>
                    </div>
                  </div>

                  {/* Vertical Position */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Vertical Position</label>
                      <span className="text-sm text-muted-foreground">{designOffsetY > 0 ? `+${designOffsetY}` : designOffsetY}%</span>
                    </div>
                    <Slider
                      value={[designOffsetY]}
                      onValueChange={(value) => setDesignOffsetY(value[0])}
                      min={-20}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>↑ Up</span>
                      <span>Down ↓</span>
                    </div>
                  </div>

                  {/* Rotation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <RotateCw className="h-4 w-4 text-muted-foreground" />
                        Rotation
                      </label>
                      <span className="text-sm text-muted-foreground">{designRotation}°</span>
                    </div>
                    <Slider
                      value={[designRotation]}
                      onValueChange={(value) => setDesignRotation(value[0])}
                      min={-180}
                      max={180}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Reset Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setDesignScale(100);
                      setDesignOffsetX(0);
                      setDesignOffsetY(0);
                      setDesignRotation(0);
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Position
                  </Button>
                </div>
              )}

              {/* Use AI to Generate */}
              <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">AI Design Generator</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Don't have a design? Let AI create one for you based on your description.
                    </p>
                    <Button variant="outline" size="sm">
                      <Image className="h-4 w-4 mr-2" />
                      Generate with AI
                    </Button>
                  </div>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Garment Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Garment Type</label>
                  <Select value={garmentType} onValueChange={setGarmentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {garmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Gender</label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Size */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Size</label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Color</label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: c.hex }}
                            />
                            {c.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Quick Color Select</label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setColor(c.value)}
                      className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 ${
                        color === c.value ? "border-accent ring-2 ring-accent/30" : "border-border"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Color Threshold Control */}
              <div className="bg-card rounded-xl p-6 shadow-md space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Shadow to Color Transition</label>
                    <span className="text-sm text-accent font-semibold">{colorThreshold}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lower values = more shadows colored, Higher values = only bright areas colored
                  </p>
                  <Slider
                    value={[colorThreshold]}
                    onValueChange={(value) => setColorThreshold(value[0])}
                    min={150}
                    max={240}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>More Shadows</span>
                    <span>Bright Only</span>
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="bg-card rounded-xl p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-3xl font-bold text-foreground">$24.99</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Shipping</p>
                    <p className="text-sm font-medium text-accent">FREE over $50</p>
                  </div>
                </div>
                  <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full"
                  disabled={isAddingToCart}
                  onClick={async () => {
                    setIsAddingToCart(true);
                    console.log("Add to cart:", {
                      garment_type: garmentType,
                      color,
                      size,
                      gender,
                      design_image_url: uploadedImage,
                      design_scale: designScale,
                      design_offset_x: designOffsetX,
                      design_offset_y: designOffsetY,
                      design_rotation: designRotation,
                      quantity: 1,
                      price: 24.99,
                    });
                    setIsAddingToCart(false);
                  }}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout • 30-day returns • Quality guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <FullscreenPreviewModal
        open={fullscreenPreviewOpen}
        onOpenChange={setFullscreenPreviewOpen}
        garmentType={garmentType}
        color={color}
        colorHex={selectedColor?.hex || "#FFFFFF"}
        size={size}
        gender={gender}
        modelType={modelType}
        uploadedImage={uploadedImage}
        designScale={designScale}
        designOffsetX={designOffsetX}
        designOffsetY={designOffsetY}
        designRotation={designRotation}
      />
    </div>
  );
};

export default Customize;
