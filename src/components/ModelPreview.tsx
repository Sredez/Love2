import { useMemo } from "react";

interface ModelPreviewProps {
  garmentType: string;
  color: string;
  colorHex: string;
  size: string;
  gender: string;
  modelType: string;
  uploadedImage: string | null;
}

// Garment SVG paths for different types
const garmentShapes: Record<string, { path: string; printArea: { x: number; y: number; width: number; height: number } }> = {
  tshirt: {
    path: "M 50 20 L 30 25 L 20 45 L 30 50 L 35 35 L 35 90 L 65 90 L 65 35 L 70 50 L 80 45 L 70 25 L 50 20 Z",
    printArea: { x: 38, y: 35, width: 24, height: 30 },
  },
  hoodie: {
    path: "M 50 15 C 45 15 42 20 42 25 L 30 30 L 15 55 L 28 60 L 32 40 L 32 95 L 68 95 L 68 40 L 72 60 L 85 55 L 70 30 L 58 25 C 58 20 55 15 50 15 Z M 45 18 Q 50 22 55 18",
    printArea: { x: 36, y: 38, width: 28, height: 32 },
  },
  polo: {
    path: "M 50 18 L 45 18 L 42 25 L 30 28 L 22 48 L 32 52 L 35 35 L 35 88 L 65 88 L 65 35 L 68 52 L 78 48 L 70 28 L 58 25 L 55 18 L 50 18 Z M 48 18 L 48 32 M 52 18 L 52 32",
    printArea: { x: 38, y: 36, width: 24, height: 28 },
  },
  tank: {
    path: "M 50 22 L 38 22 L 35 30 L 35 90 L 65 90 L 65 30 L 62 22 L 50 22 Z",
    printArea: { x: 38, y: 32, width: 24, height: 32 },
  },
  longsleeve: {
    path: "M 50 20 L 30 25 L 10 80 L 20 82 L 35 40 L 35 90 L 65 90 L 65 40 L 80 82 L 90 80 L 70 25 L 50 20 Z",
    printArea: { x: 38, y: 35, width: 24, height: 30 },
  },
  sweatshirt: {
    path: "M 50 18 L 28 25 L 8 78 L 20 82 L 32 42 L 32 92 L 68 92 L 68 42 L 80 82 L 92 78 L 72 25 L 50 18 Z",
    printArea: { x: 36, y: 38, width: 28, height: 30 },
  },
};

// Model silhouettes based on gender/ethnicity
const getModelDescription = (modelType: string) => {
  const [ethnicity, gender] = modelType.split("-");
  return { ethnicity, gender };
};

const ModelPreview = ({
  garmentType,
  color,
  colorHex,
  size,
  gender,
  modelType,
  uploadedImage,
}: ModelPreviewProps) => {
  const garment = garmentShapes[garmentType] || garmentShapes.tshirt;
  const modelInfo = getModelDescription(modelType);
  
  const skinTones: Record<string, string> = {
    caucasian: "#FFDAB5",
    african: "#8D5524",
    asian: "#F1C27D",
    hispanic: "#C68642",
  };
  
  const skinTone = skinTones[modelInfo.ethnicity] || skinTones.caucasian;
  const isFemale = modelInfo.gender === "female";
  
  const textColor = ["white", "gray"].includes(color) ? "#333" : "#fff";

  const sizeScale = useMemo(() => {
    const scales: Record<string, number> = {
      xs: 0.85,
      s: 0.9,
      m: 1,
      l: 1.05,
      xl: 1.1,
      xxl: 1.15,
      xxxl: 1.2,
    };
    return scales[size] || 1;
  }, [size]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-muted/30 to-muted/50 rounded-2xl overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Model visualization */}
      <svg viewBox="0 0 100 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Head */}
        <ellipse
          cx="50"
          cy="12"
          rx={isFemale ? 7 : 8}
          ry="9"
          fill={skinTone}
        />
        
        {/* Hair */}
        {isFemale ? (
          <path
            d="M 42 8 Q 42 2 50 2 Q 58 2 58 8 Q 60 5 58 12 L 58 18 Q 55 22 50 22 Q 45 22 42 18 L 42 12 Q 40 5 42 8"
            fill="#2d1810"
            opacity="0.9"
          />
        ) : (
          <path
            d="M 43 10 Q 43 4 50 4 Q 57 4 57 10 Q 57 6 50 6 Q 43 6 43 10"
            fill="#2d1810"
            opacity="0.9"
          />
        )}

        {/* Neck */}
        <rect
          x="47"
          y="18"
          width="6"
          height="5"
          fill={skinTone}
        />

        {/* Arms - positioned behind garment */}
        <g>
          {/* Left arm */}
          <path
            d={garmentType === "tank" 
              ? "M 35 28 Q 28 40 25 60 Q 24 70 26 75"
              : garmentType === "longsleeve" || garmentType === "sweatshirt"
              ? "M 35 40 Q 28 55 22 78 L 18 80"
              : "M 35 50 Q 28 55 25 70 Q 24 80 26 85"
            }
            stroke={skinTone}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right arm */}
          <path
            d={garmentType === "tank"
              ? "M 65 28 Q 72 40 75 60 Q 76 70 74 75"
              : garmentType === "longsleeve" || garmentType === "sweatshirt"
              ? "M 65 40 Q 72 55 78 78 L 82 80"
              : "M 65 50 Q 72 55 75 70 Q 76 80 74 85"
            }
            stroke={skinTone}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hands */}
          <circle
            cx={garmentType === "longsleeve" || garmentType === "sweatshirt" ? 17 : 26}
            cy={garmentType === "longsleeve" || garmentType === "sweatshirt" ? 82 : (garmentType === "tank" ? 77 : 87)}
            r="4"
            fill={skinTone}
          />
          <circle
            cx={garmentType === "longsleeve" || garmentType === "sweatshirt" ? 83 : 74}
            cy={garmentType === "longsleeve" || garmentType === "sweatshirt" ? 82 : (garmentType === "tank" ? 77 : 87)}
            r="4"
            fill={skinTone}
          />
        </g>

        {/* Garment with size scaling */}
        <g transform={`translate(${50 - 50 * sizeScale}, ${55 - 55 * sizeScale}) scale(${sizeScale})`}>
          <path
            d={garment.path}
            fill={colorHex}
            stroke={color === "white" ? "#e5e5e5" : "rgba(0,0,0,0.2)"}
            strokeWidth="0.5"
          />
          
          {/* Print area indicator or uploaded image */}
          <defs>
            <clipPath id="printClip">
              <rect
                x={garment.printArea.x}
                y={garment.printArea.y}
                width={garment.printArea.width}
                height={garment.printArea.height}
                rx="1"
              />
            </clipPath>
          </defs>

          {uploadedImage ? (
            <image
              href={uploadedImage}
              x={garment.printArea.x}
              y={garment.printArea.y}
              width={garment.printArea.width}
              height={garment.printArea.height}
              preserveAspectRatio="xMidYMid meet"
              clipPath="url(#printClip)"
            />
          ) : (
            <g opacity="0.3">
              <rect
                x={garment.printArea.x}
                y={garment.printArea.y}
                width={garment.printArea.width}
                height={garment.printArea.height}
                fill="none"
                stroke={textColor}
                strokeWidth="0.3"
                strokeDasharray="1,1"
                rx="1"
              />
              <text
                x={garment.printArea.x + garment.printArea.width / 2}
                y={garment.printArea.y + garment.printArea.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={textColor}
                fontSize="3"
              >
                Your Design
              </text>
            </g>
          )}

          {/* Collar detail for polo */}
          {garmentType === "polo" && (
            <path
              d="M 45 18 L 48 32 L 50 30 L 52 32 L 55 18"
              fill="none"
              stroke={color === "white" ? "#ddd" : "rgba(255,255,255,0.3)"}
              strokeWidth="0.5"
            />
          )}

          {/* Hood drawstrings for hoodie */}
          {garmentType === "hoodie" && (
            <g stroke={color === "white" ? "#ccc" : "rgba(255,255,255,0.4)"} strokeWidth="0.3">
              <path d="M 46 30 L 46 45" />
              <path d="M 54 30 L 54 45" />
            </g>
          )}
        </g>

        {/* Legs/Pants indication */}
        <path
          d="M 40 90 L 38 115 M 60 90 L 62 115"
          stroke="#3b4a5a"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: colorHex }}
            />
            <span className="text-foreground font-medium capitalize">{color}</span>
          </div>
          <div className="text-muted-foreground">
            Size {size.toUpperCase()} • {modelInfo.gender === "female" ? "Female" : "Male"} Model
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPreview;
