import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import clothingCollection from "@/assets/clothing-collection.jpg";

const products = [
  { name: "T-Shirts", price: "From $19.99", category: "Popular" },
  { name: "Hoodies", price: "From $39.99", category: "Bestseller" },
  { name: "Polo Shirts", price: "From $29.99", category: "New" },
  { name: "Tank Tops", price: "From $17.99", category: "" },
];

const ProductsPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative animate-slide-up">
            <img
              src={clothingCollection}
              alt="Clothing collection"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/40 to-transparent" />
          </div>

          {/* Right Content */}
          <div className="space-y-8 animate-slide-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Premium Apparel,
              <br />
              <span className="text-accent">Endless Possibilities</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Choose from our curated selection of high-quality blank apparel. 
              Every piece is crafted for comfort and durability, perfect for your custom designs.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="group bg-secondary rounded-xl p-5 hover:bg-accent/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{product.name}</h4>
                    {product.category && (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{product.price}</p>
                </div>
              ))}
            </div>

            <Link to="/products">
              <Button variant="default" size="lg" className="group">
                View All Products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;
