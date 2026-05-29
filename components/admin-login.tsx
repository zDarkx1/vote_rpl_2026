"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simple password check against env
    // In production, this should be done server-side
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin_rpl2026")) {
      onLogin();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Card className="retro-card overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1
                className="text-2xl mb-1"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--retro-espresso)",
                }}
              >
                🔐 Admin Panel
              </h1>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Masukkan password untuk mengakses dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password admin"
                  className="h-12 text-base"
                  style={{
                    borderColor: error ? "var(--retro-rose)" : "var(--retro-amber)",
                    background: "var(--retro-cream)",
                  }}
                  aria-label="Admin password"
                  aria-invalid={error}
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm mt-2 text-center font-medium"
                    style={{ color: "var(--retro-rose)" }}
                    role="alert"
                  >
                    Password salah!
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!password || loading}
                className="w-full h-12 cursor-pointer font-normal"
                style={{
                  background: "var(--retro-teal)",
                  color: "var(--retro-cream)",
                }}
              >
                {loading ? "Memverifikasi..." : "Masuk"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
