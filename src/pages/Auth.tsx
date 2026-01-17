import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Mail, Lock, User, Building2 } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<"customer" | "developer">("customer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-primary-foreground">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xl">P</span>
            </div>
            <span className="font-display text-xl font-semibold">PrintCraft</span>
          </Link>
        </div>

        <div className="space-y-8">
          <h1 className="font-display text-5xl font-bold leading-tight">
            Create Amazing
            <br />
            <span className="text-accent">Custom Prints</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Join our community of designers and creators. Turn your ideas into wearable art.
          </p>
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-primary-foreground/60">Active creators</p>
            </div>
            <div>
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm text-primary-foreground/60">Designs created</p>
            </div>
            <div>
              <p className="text-2xl font-bold">99%</p>
              <p className="text-sm text-primary-foreground/60">Satisfaction</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} PrintCraft. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl font-bold text-foreground">Welcome</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to your account or create a new one
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-accent hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              {/* Account Type Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType("customer")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    accountType === "customer"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <User className={`h-6 w-6 mx-auto mb-2 ${accountType === "customer" ? "text-accent" : "text-muted-foreground"}`} />
                  <p className="font-medium text-foreground">Customer</p>
                  <p className="text-xs text-muted-foreground">Order custom prints</p>
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("developer")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    accountType === "developer"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <Building2 className={`h-6 w-6 mx-auto mb-2 ${accountType === "developer" ? "text-accent" : "text-muted-foreground"}`} />
                  <p className="font-medium text-foreground">Developer</p>
                  <p className="text-xs text-muted-foreground">Sell your designs</p>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Minimum 8 characters with a number and symbol
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="rounded border-border mt-1" required />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <a href="#" className="text-accent hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-accent hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="hidden lg:block">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
