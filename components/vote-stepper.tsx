"use client";

import { motion } from "framer-motion";

interface VoteStepperProps {
  currentStep: "wakorjur" | "korjur";
}

const steps = [
  { key: "wakorjur", label: "Wakil Koordinator", icon: "🏅" },
  { key: "korjur", label: "Koordinator", icon: "👑" },
] as const;

export function VoteStepper({ currentStep }: VoteStepperProps) {
  const currentIndex = currentStep === "wakorjur" ? 0 : 1;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between relative">
        {/* Connection line */}
        <div
          className="absolute top-5 left-[15%] right-[15%] h-1 rounded-full"
          style={{ background: "var(--border)" }}
        />
        <motion.div
          className="absolute top-5 left-[15%] h-1 rounded-full"
          style={{ background: "var(--retro-teal)" }}
          initial={{ width: "0%" }}
          animate={{ width: currentIndex === 0 ? "0%" : "70%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10">
              <motion.div
                animate={
                  isActive
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: isActive ? Infinity : 0,
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 mb-2"
                style={{
                  background: isActive
                    ? "var(--retro-teal)"
                    : isCompleted
                    ? "var(--retro-teal)"
                    : "var(--card)",
                  borderColor: isActive
                    ? "var(--retro-teal)"
                    : isCompleted
                    ? "var(--retro-teal)"
                    : "var(--border)",
                  color: isActive || isCompleted
                    ? "var(--retro-cream)"
                    : "var(--muted-foreground)",
                }}
              >
                {isCompleted ? "✓" : step.icon}
              </motion.div>
              <span
                className="text-xs font-semibold text-center"
                style={{
                  color: isActive
                    ? "var(--retro-teal)"
                    : isCompleted
                    ? "var(--retro-teal)"
                    : "var(--muted-foreground)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {step.label}
              </span>
              <span
                className="text-[10px] mt-0.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                Tahap {index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
