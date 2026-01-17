import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-tshirt.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2 border border-primary-foreground/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Custom Print On Demand</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Design,
              <br />
              <span className="text-accent">Your Style</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
              Upload your artwork, choose your apparel, and create stunning custom prints. 
              From t-shirts to hoodies, bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/customize">
                <Button variant="hero" size="xl" className="group">
                  Start Designing
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="hero-outline" size="xl">
                  Browse Products
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div>
                <p className="text-3xl font-bold text-primary-foreground">50+</p>
                <p className="text-primary-foreground/60 text-sm">Product Types</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-foreground">10K+</p>
                <p className="text-primary-foreground/60 text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-foreground">4.9★</p>
                <p className="text-primary-foreground/60 text-sm">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="relative animate-float">
              <img
                src={heroImage}
                alt="Custom printed t-shirt"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-xl p-4 animate-fade-in">
                <p className="text-xs text-muted-foreground">Starting from</p>
                <p className="text-2xl font-bold text-foreground">$19.99</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground rounded-xl shadow-xl px-4 py-3 animate-fade-in">
                <p className="font-semibold">Free Shipping</p>
                <p className="text-xs opacity-90">On orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
