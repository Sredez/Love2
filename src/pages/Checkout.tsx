import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Lock, Package, CheckCircle } from "lucide-react";

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

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Placeholder items data
  const items: any[] = [];
  const totalPrice = 0;
  const clearCart = () => {};

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const shippingCost = totalPrice >= 50 ? 0 : 5.99;
  const total = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get current user if logged in
      const { data: { user } } = await supabase.auth.getUser();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id || null,
          session_id: user ? null : sessionId,
          email: formData.email,
          status: "confirmed",
          total_amount: total,
          shipping_address: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        garment_type: item.garment_type,
        color: item.color,
        size: item.size,
        gender: item.gender,
        design_image_url: item.design_image_url,
        design_scale: item.design_scale,
        design_offset_x: item.design_offset_x,
        design_offset_y: item.design_offset_y,
        design_rotation: item.design_rotation,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      setOrderId(order.id);
      setOrderComplete(true);

      toast({
        title: "Order placed successfully!",
        description: "Check your email for order confirmation.",
      });
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your order. We've sent a confirmation to{" "}
                <span className="font-medium text-foreground">{formData.email}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Order ID: <span className="font-mono">{orderId}</span>
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Continue Shopping
                </Button>
                <Button variant="hero" onClick={() => navigate("/customize")}>
                  Create Another Design
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center py-16">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground mb-6">
                Add some custom apparel to get started!
              </p>
              <Button variant="hero" onClick={() => navigate("/customize")}>
                Start Designing
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  Checkout
                </h1>
                <p className="text-muted-foreground">
                  Complete your order details below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-card rounded-xl p-6 shadow-md space-y-4">
                  <h2 className="font-semibold text-lg text-foreground">
                    Contact Information
                  </h2>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-xl p-6 shadow-md space-y-4">
                  <h2 className="font-semibold text-lg text-foreground">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        required
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        required
                        placeholder="12345"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment (Demo) */}
                <div className="bg-card rounded-xl p-6 shadow-md space-y-4">
                  <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment
                  </h2>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Lock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      This is a demo checkout. No real payment will be processed.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Place Order • ${total.toFixed(2)}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="bg-card rounded-xl p-6 shadow-md space-y-6">
                <h2 className="font-semibold text-lg text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden"
                        style={{ backgroundColor: colorHexMap[item.color] || "#f5f5f5" }}
                      >
                        {item.design_image_url && (
                          <img
                            src={item.design_image_url}
                            alt="Design"
                            className="w-10 h-10 object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm">
                          {garmentLabels[item.garment_type]}
                        </h4>
                        <p className="text-xs text-muted-foreground capitalize">
                          {item.color} • {item.size.toUpperCase()} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shippingCost === 0 ? "text-accent font-medium" : "text-foreground"}>
                      {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-accent/10 rounded-lg p-3 text-center">
                  <p className="text-sm text-accent font-medium">
                    🎉 {totalPrice >= 50 ? "You qualify for FREE shipping!" : `Add $${(50 - totalPrice).toFixed(2)} more for FREE shipping`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
