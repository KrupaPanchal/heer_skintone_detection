import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { loginUserApi } from "@/lib/authApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginUserApi({ email, password });

      // save user in store
      login({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.email === "admin@heer.com" ? "admin" : "user",
        token: data.token,
      });

      // redirect based on role (ZIP LOGIC)
      if (data.email === "admin@heer.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center container py-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-display font-medium">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-gold"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* ✅ ADMIN LOGIN INFO */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Admin access available using admin credentials
            </p>
           
          </div>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Create one
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
