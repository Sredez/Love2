import { useMemo } from "react";

// Import model images (full body with visible t-shirt)
import femaleAsianTshirt from "@/assets/models/female-asian-tshirt.jpg";
import maleCaucasianTshirt from "@/assets/models/male-caucasian-tshirt.jpg";
import femaleCaucasianTshirt from "@/assets/models/female-caucasian-tshirt.jpg";
import maleAfricanTshirt from "@/assets/models/male-african-tshirt.jpg";
import femaleAfricanTshirt from "@/assets/models/female-african-tshirt.jpg";
import maleAsianTshirt from "@/assets/models/male-asian-tshirt.jpg";

interface ModelPreviewProps {
  garmentType: string;
  color: string;
  colorHex: string;
  size: string;
  gender: string;
  modelType: string;
  uploadedImage: string | null;
  designScale?: number;
  designOffsetX?: number;
  designOffsetY?: number;
  designRotation?: number;
}

// Model images mapping - using new full-body shots
const modelImages: Record<string, string> = {
  "caucasian-male": maleCaucasianTshirt,
  "caucasian-female": femaleCaucasianTshirt,
  "african-male": maleAfricanTshirt,
  "african-female": femaleAfricanTshirt,
  "asian-male": maleAsianTshirt,
  "asian-female": femaleAsianTshirt,
  "hispanic-male": maleCaucasianTshirt, // Fallback
  "hispanic-female": femaleCaucasianTshirt, // Fallback
};

// Shirt area masks for color overlay - adjusted to avoid head/neck area
// These polygons start below the neckline to prevent color bleeding onto skin
const shirtMasks: Record<string, string> = {
  tshirt: "polygon(18% 28%, 40% 24%, 50% 23%, 60% 24%, 82% 28%, 88% 35%, 92% 50%, 88% 100%, 12% 100%, 8% 50%, 12% 35%)",
  hoodie: "polygon(15% 26%, 38% 22%, 50% 20%, 62% 22%, 85% 26%, 92% 35%, 95% 55%, 90% 100%, 10% 100%, 5% 55%, 8% 35%)",
  polo: "polygon(20% 28%, 40% 25%, 50% 24%, 60% 25%, 80% 28%, 86% 35%, 90% 50%, 86% 100%, 14% 100%, 10% 50%, 14% 35%)",
  tank: "polygon(28% 26%, 42% 24%, 50% 23%, 58% 24%, 72% 26%, 78% 35%, 82% 50%, 78% 100%, 22% 100%, 18% 50%, 22% 35%)",
  longsleeve: "polygon(25% 28%, 40% 24%, 50% 23%, 60% 24%, 75% 28%, 80% 35%, 82% 50%, 80% 100%, 20% 100%, 18% 50%, 20% 35%)",
  sweatshirt: "polygon(10% 28%, 38% 22%, 50% 20%, 62% 22%, 90% 28%, 95% 38%, 95% 100%, 5% 100%, 5% 38%)",
};

// Print area positions for different garment types (as percentages)
const printAreas: Record<string, { top: number; left: number; width: number; height: number }> = {
  tshirt: { top: 35, left: 30, width: 40, height: 30 },
  hoodie: { top: 38, left: 28, width: 44, height: 32 },
  polo: { top: 36, left: 30, width: 40, height: 28 },
  tank: { top: 34, left: 32, width: 36, height: 30 },
  longsleeve: { top: 36, left: 35, width: 30, height: 28 },
  sweatshirt: { top: 38, left: 28, width: 44, height: 32 },
};

const ModelPreview = ({
  garmentType,
  color,
  colorHex,
  size,
  gender,
  modelType,
  uploadedImage,
  designScale = 100,
  designOffsetX = 0,
  designOffsetY = 0,
  designRotation = 0,
}: ModelPreviewProps) => {
  const modelImage = modelImages[modelType] || modelImages["caucasian-male"];
  const printArea = printAreas[garmentType] || printAreas.tshirt;
  const shirtMask = shirtMasks[garmentType] || shirtMasks.tshirt;
  
  // Calculate size adjustments for print area
  const sizeMultiplier = useMemo(() => {
    const multipliers: Record<string, number> = {
      xs: 0.85,
      s: 0.92,
      m: 1,
      l: 1.08,
      xl: 1.15,
      xxl: 1.22,
      xxxl: 1.3,
    };
    return multipliers[size] || 1;
  }, [size]);

  const adjustedPrintArea = useMemo(() => ({
    top: printArea.top - ((sizeMultiplier - 1) * printArea.height / 2),
    left: printArea.left - ((sizeMultiplier - 1) * printArea.width / 2),
    width: printArea.width * sizeMultiplier,
    height: printArea.height * sizeMultiplier,
  }), [printArea, sizeMultiplier]);

  // Determine text color based on shirt color
  const textColor = ["white", "gray"].includes(color) ? "#333" : "#fff";

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-muted/30 to-muted/50 rounded-2xl overflow-hidden">
      {/* Model Image */}
      <div className="relative w-full h-full">
        <img
          src={modelImage}
          alt="Model preview"
          className="w-full h-full object-cover object-top"
          style={{
            filter: color !== "white" ? `hue-rotate(0deg) saturate(1.2)` : "none"
          }}
        />
        
        {/* Color overlay on the shirt - using clip-path for precise masking */}
        {color !== "white" && (
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-300 z-10"
            style={{
              backgroundColor: colorHex,
              mixBlendMode: "color-dodge",
              clipPath: shirtMask,
              opacity: 0.4,
            }}
          />
        )}

        {/* Print area with uploaded image or placeholder - z-20 to appear on top */}
        <div
          className="absolute flex items-center justify-center overflow-visible transition-all duration-300 z-20"
          style={{
            top: `${adjustedPrintArea.top + designOffsetY}%`,
            left: `${adjustedPrintArea.left + designOffsetX}%`,
            width: `${adjustedPrintArea.width}%`,
            height: `${adjustedPrintArea.height}%`,
          }}
        >
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Your design"
              className="object-contain drop-shadow-lg transition-transform duration-200"
              style={{
                mixBlendMode: "screen",
                filter: color === "white" ? "none" : "brightness(1.1)",
                transform: `scale(${designScale / 100}) rotate(${designRotation}deg)`,
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <div
              className="w-full h-full border-2 border-dashed rounded-lg flex items-center justify-center backdrop-blur-sm"
              style={{ 
                borderColor: `${textColor}40`,
                backgroundColor: `${textColor}08`,
              }}
            >
              <span
                className="text-sm font-medium px-3 py-1.5 rounded-full shadow-sm"
                style={{ 
                  color: textColor,
                  backgroundColor: `${textColor}15`,
                }}
              >
                Your Design Here
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50 shadow-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full border-2 border-border shadow-sm"
              style={{ backgroundColor: colorHex }}
            />
            <span className="text-foreground font-medium capitalize">{color}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium">
              {size.toUpperCase()}
            </span>
            <span>•</span>
            <span className="capitalize">
              {modelType.split("-").reverse().join(" ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPreview;
