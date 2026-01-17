import { useMemo } from "react";

// Import all model images
import maleCaucasian from "@/assets/models/male-caucasian.jpg";
import femaleCaucasian from "@/assets/models/female-caucasian.jpg";
import maleAfrican from "@/assets/models/male-african.jpg";
import femaleAfrican from "@/assets/models/female-african.jpg";
import maleAsian from "@/assets/models/male-asian.jpg";
import femaleAsian from "@/assets/models/female-asian.jpg";
import maleHispanic from "@/assets/models/male-hispanic.jpg";
import femaleHispanic from "@/assets/models/female-hispanic.jpg";

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

// Model images mapping
const modelImages: Record<string, string> = {
  "caucasian-male": maleCaucasian,
  "caucasian-female": femaleCaucasian,
  "african-male": maleAfrican,
  "african-female": femaleAfrican,
  "asian-male": maleAsian,
  "asian-female": femaleAsian,
  "hispanic-male": maleHispanic,
  "hispanic-female": femaleHispanic,
};

// Print area positions for different garment types (as percentages)
const printAreas: Record<string, { top: number; left: number; width: number; height: number }> = {
  tshirt: { top: 28, left: 32, width: 36, height: 28 },
  hoodie: { top: 30, left: 30, width: 40, height: 30 },
  polo: { top: 30, left: 33, width: 34, height: 26 },
  tank: { top: 26, left: 34, width: 32, height: 28 },
  longsleeve: { top: 28, left: 32, width: 36, height: 28 },
  sweatshirt: { top: 30, left: 30, width: 40, height: 30 },
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
    <div className="relative w-full h-full bg-gradient-to-b from-muted/20 to-muted/40 rounded-2xl overflow-hidden">
      {/* Model Image with color overlay */}
      <div className="relative w-full h-full">
        <img
          src={modelImage}
          alt="Model preview"
          className="w-full h-full object-cover object-top"
        />
        
        {/* Color overlay on the t-shirt area - more visible approach */}
        {color !== "white" && (
          <>
            {/* Primary color tint with hue-rotate technique */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 55% 45% at 50% 42%, ${colorHex}90 0%, ${colorHex}70 40%, transparent 75%)`,
                mixBlendMode: "multiply",
              }}
            />
            {/* Secondary overlay for stronger color */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 50% 40% at 50% 42%, ${colorHex}50 0%, transparent 60%)`,
                mixBlendMode: "color",
              }}
            />
          </>
        )}

        {/* Print area with uploaded image or placeholder */}
        <div
          className="absolute flex items-center justify-center overflow-visible transition-all duration-300"
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
                mixBlendMode: "multiply",
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
                backgroundColor: `${textColor}10`,
              }}
            >
              <span
                className="text-sm font-medium px-3 py-1 rounded-full"
                style={{ 
                  color: textColor,
                  backgroundColor: `${textColor}20`,
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
