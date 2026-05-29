"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useVotingStore } from "@/lib/voting-store";
import { Card, CardContent } from "@/components/ui/card";

// Confetti colors
const CONFETTI_COLORS = ["#C8922A", "#1B6B6B", "#B85C5F", "#DAA520", "#98D4BB", "#CD5C5C"];

function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 3;
  const duration = 3 + Math.random() * 3;
  const size = 6 + Math.random() * 10;
  const shape = Math.random() > 0.5 ? "50%" : "0%";

  return (
    <div
      className="confetti-piece"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        borderRadius: shape,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

export default function ThankYouPage() {
  const router = useRouter();
  const { selectedWakorjur, selectedKorjur, studentName, reset } = useVotingStore();
  const [countdown, setCountdown] = useState(3);

  const handleRedirect = useCallback(() => {
    reset();
    router.replace("/");
  }, [reset, router]);

  useEffect(() => {
    if (countdown <= 0) {
      handleRedirect();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, handleRedirect]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Confetti */}
      {Array.from({ length: 40 }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}

      {/* Success card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card
          className="retro-card overflow-hidden"
          style={{ borderColor: "var(--retro-teal)", borderWidth: "3px" }}
        >
          <CardContent className="p-6 sm:p-8 text-center space-y-6">
            {/* Big checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              className="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{
                background: "linear-gradient(135deg, var(--retro-teal), #247A7A)",
                color: "var(--retro-cream)",
                boxShadow: "0 0 30px rgba(27, 107, 107, 0.3)",
              }}
            >
              ✓
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--retro-espresso)",
                }}
              >
                Terima Kasih! 🗳️
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Suara {studentName || "kamu"} telah tercatat
              </motion.p>
            </div>

            {/* Vote summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              {selectedWakorjur && (
                <div
                  className="p-3 rounded-lg border text-left"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: "var(--retro-teal)" }}
                  >
                    🏅 Wakil Koordinator
                  </p>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--retro-espresso)" }}
                  >
                    {selectedWakorjur.candidate_number}. {selectedWakorjur.name}
                  </p>
                </div>
              )}

              {selectedKorjur && (
                <div
                  className="p-3 rounded-lg border text-left"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: "var(--retro-teal)" }}
                  >
                    👑 Koordinator
                  </p>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--retro-espresso)" }}
                  >
                    {selectedKorjur.candidate_number}. {selectedKorjur.name}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Kembali ke halaman utama dalam
              </p>
              <motion.p
                key={countdown}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold mt-1"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--retro-teal)",
                }}
              >
                {countdown}
              </motion.p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                detik
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
