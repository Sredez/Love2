import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground space-y-8 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Ready to Create Your
            <br />
            <span className="text-accent">Custom Apparel?</span>
          </h2>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Join thousands of creators, businesses, and brands who trust PrintCraft 
            for their custom printing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/customize">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero-outline" size="xl">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
