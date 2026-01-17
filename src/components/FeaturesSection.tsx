import { Upload, Palette, Truck, Shield } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Your Design",
    description: "Drag and drop your artwork or choose from our library of designs",
  },
  {
    icon: Palette,
    title: "Customize Everything",
    description: "Pick colors, sizes, and placement. See real-time previews on models",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Premium quality prints shipped directly to your door in days",
  },
  {
    icon: Shield,
    title: "Satisfaction Guaranteed",
    description: "Not happy? We'll make it right with our 100% satisfaction guarantee",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create custom apparel in four simple steps. No design experience needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
