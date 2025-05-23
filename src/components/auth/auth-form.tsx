"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconAlertCircle } from "@tabler/icons-react";

interface FormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  type: "login" | "register" | "forgot-password" | "reset-password";
  onSubmit: (data: FormData) => void;
  submitButtonClassName?: string;
}

export function AuthForm({ type, onSubmit, submitButtonClassName }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as FormData;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy validation
      if (type === "login") {
        // Default credentials for easy login
        if ((data.email === "admin@example.com" && data.password === "admin123") ||
            (data.email === "demo@example.com" && data.password === "demo123")) {
          onSubmit(data);
          router.push("/dashboard");
        } else {
          setError("Invalid email or password");
        }
      } else if (type === "register") {
        if (data.password !== data.confirmPassword) {
          setError("Passwords do not match");
        } else {
          onSubmit(data);
          router.push("/login");
        }
      } else if (type === "forgot-password") {
        if (data.email === "admin@example.com" || data.email === "demo@example.com") {
          onSubmit(data);
          router.push("/reset-password");
        } else {
          setError("Email not found");
        }
      } else if (type === "reset-password") {
        if (data.password !== data.confirmPassword) {
          setError("Passwords do not match");
        } else {
          onSubmit(data);
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <IconAlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {type !== "reset-password" && (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            defaultValue={type === "login" ? "admin@example.com" : ""}
            required
          />
        </div>
      )}

      {type !== "forgot-password" && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            defaultValue={type === "login" ? "admin123" : ""}
            required
          />
        </div>
      )}

      {(type === "register" || type === "reset-password") && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </div>
      )}

      {type === "login" && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Default credentials:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>Demo: demo@example.com / demo123</p>
        </div>
      )}

      <Button 
        type="submit" 
        className={submitButtonClassName || "w-full"} 
        disabled={loading}
      >
        {loading ? "Loading..." : type === "login" ? "Sign In" : type === "register" ? "Create Account" : type === "forgot-password" ? "Send Reset Link" : "Reset Password"}
      </Button>
    </form>
  );
} 