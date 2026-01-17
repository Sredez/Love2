import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, Share2 } from "lucide-react";
import ModelPreview from "@/components/ModelPreview";

interface FullscreenPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  garmentType: string;
  color: string;
  colorHex: string;
  size: string;
  gender: string;
  modelType: string;
  uploadedImage: string | null;
  designScale: number;
  designOffsetX: number;
  designOffsetY: number;
  designRotation: number;
}

const FullscreenPreviewModal = ({
  open,
  onOpenChange,
  garmentType,
  color,
  colorHex,
  size,
  gender,
  modelType,
  uploadedImage,
  designScale,
  designOffsetX,
  designOffsetY,
  designRotation,
}: FullscreenPreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-background/95 backdrop-blur-md border-none">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 bg-background/80 hover:bg-background shadow-md rounded-full"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Action buttons */}
        <div className="absolute top-4 left-4 z-50 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 hover:bg-background shadow-md gap-2"
          >
            <Download className="h-4 w-4" />
            Save Image
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 hover:bg-background shadow-md gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Fullscreen Model Preview */}
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <ModelPreview
              garmentType={garmentType}
              color={color}
              colorHex={colorHex}
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
        </div>

        {/* Product info footer */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-border/50">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: colorHex }}
              />
              <span className="text-foreground font-medium capitalize">{color}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground capitalize">{garmentType.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground uppercase">{size}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground capitalize">{gender}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullscreenPreviewModal;
