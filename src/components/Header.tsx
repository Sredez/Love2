import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-xl">P</span>
          </div>
          <span className="font-display text-xl font-semibold text-foreground">
            PrintCraft
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/customize" 
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Design Studio
          </Link>
          <Link 
            to="/products" 
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Products
          </Link>
          <Link 
            to="/gallery" 
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Gallery
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <CartDrawer />
          <Link to="/auth">
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link to="/customize">
            <Button variant="accent">Start Creating</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <CartDrawer />
          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-slide-up">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <Link 
              to="/customize" 
              className="text-foreground font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Design Studio
            </Link>
            <Link 
              to="/products" 
              className="text-foreground font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/gallery" 
              className="text-foreground font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <hr className="border-border" />
            <div className="flex flex-col gap-3">
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/customize" onClick={() => setIsMenuOpen(false)}>
                <Button variant="accent" className="w-full">Start Creating</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
