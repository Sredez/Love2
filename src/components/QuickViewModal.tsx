import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

interface QuickViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  garment: {
    value: string;
    label: string;
    price: number;
    image: string;
  } | null;
  color: {
    value: string;
    label: string;
    hex: string;
  } | null;
  gender: string | null;
}

const QuickViewModal = ({
  open,
  onOpenChange,
  garment,
  color,
  gender,
}: QuickViewModalProps) => {
  if (!garment) return null;

  const getEditLink = () => {
    const params = new URLSearchParams();
    params.set("garment", garment.value);
    if (color) params.set("color", color.value);
    if (gender) params.set("gender", gender);
    return `/customize?${params.toString()}`;
  };

  // Get color overlay style based on selected color
  const getColorOverlay = () => {
    if (!color) return {};
    
    // For white, we don't need an overlay
    if (color.value === "white") {
      return {};
    }
    
    return {
      backgroundColor: color.hex,
      mixBlendMode: "multiply" as const,
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {garment.label} Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Preview Image with Color Overlay */}
          <div className="relative bg-muted rounded-xl overflow-hidden aspect-square">
            <img
              src={garment.image}
              alt={garment.label}
              className="w-full h-full object-contain"
            />
            {color && color.value !== "white" && (
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-300"
                style={getColorOverlay()}
              />
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                {garment.label}
              </h3>
              <span className="text-xl font-bold text-accent">
                ${garment.price.toFixed(2)}
              </span>
            </div>
            
            {/* Selected Options */}
            <div className="flex flex-wrap gap-2">
              {color && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm">
                  <div
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-foreground">{color.label}</span>
                </div>
              )}
              {gender && (
                <div className="px-3 py-1.5 bg-muted rounded-full text-sm text-foreground capitalize">
                  {gender}
                </div>
              )}
            </div>

            {!color && (
              <p className="text-sm text-muted-foreground">
                Select a color to see how it looks
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Continue Shopping
            </Button>
            <Link to={getEditLink()} className="flex-1">
              <Button className="w-full gap-2">
                <Pencil className="h-4 w-4" />
                Customize
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
