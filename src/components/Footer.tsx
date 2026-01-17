import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">P</span>
              </div>
              <span className="font-display text-xl font-semibold">PrintCraft</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium custom printing for individuals, businesses, and brands worldwide.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">T-Shirts</Link></li>
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">Hoodies</Link></li>
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">Polo Shirts</Link></li>
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">Tank Tops</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
              <li><Link to="/gallery" className="hover:text-primary-foreground transition-colors">Gallery</Link></li>
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/help" className="hover:text-primary-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-foreground transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-primary-foreground transition-colors">Returns</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} PrintCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
