import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, Trash2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const garmentLabels: Record<string, string> = {
  tshirt: "T-Shirt",
  hoodie: "Hoodie",
  polo: "Polo Shirt",
  tank: "Tank Top",
  longsleeve: "Long Sleeve",
  sweatshirt: "Sweatshirt",
};

const colorHexMap: Record<string, string> = {
  white: "#FFFFFF",
  black: "#1a1a1a",
  navy: "#1e3a5f",
  gray: "#6b7280",
  red: "#dc2626",
  forest: "#166534",
};

const CartDrawer = () => {
  // Placeholder cart data
  const items: any[] = [];
  const totalItems = 0;
  const totalPrice = 0;
  const updateQuantity = () => {};
  const removeFromCart = () => {};
  const isLoading = false;
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Add some custom apparel to get started!
              </p>
              <Button variant="outline" onClick={() => navigate("/customize")}>
                Start Designing
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  {/* Item Preview */}
                  <div
                    className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden"
                    style={{ backgroundColor: colorHexMap[item.color] || "#f5f5f5" }}
                  >
                    {item.design_image_url && (
                      <img
                        src={item.design_image_url}
                        alt="Design"
                        className="w-12 h-12 object-contain"
                        style={{
                          transform: `scale(${item.design_scale / 100}) rotate(${item.design_rotation}deg)`,
                        }}
                      />
                    )}
                    {!item.design_image_url && (
                      <span
                        className="text-xs font-medium"
                        style={{ color: item.color === "white" ? "#333" : "#fff" }}
                      >
                        {garmentLabels[item.garment_type] || item.garment_type}
                      </span>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {garmentLabels[item.garment_type] || item.garment_type}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: colorHexMap[item.color] }}
                      />
                      <span className="text-sm text-muted-foreground capitalize">
                        {item.color} • Size {item.size.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border pt-4 mt-auto">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-accent font-medium">
                  {totalPrice >= 50 ? "FREE" : "$5.99"}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold border-t border-border pt-3">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice >= 50 ? 0 : 5.99)).toFixed(2)}</span>
              </div>
              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
