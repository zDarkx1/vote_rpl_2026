"use client";

import { motion } from "framer-motion";

interface ChartCandidate {
  name: string;
  candidate_number: number;
  vote_count: number;
  position: string;
}

interface VoteChartProps {
  title: string;
  icon: string;
  candidates: ChartCandidate[];
}

const CHART_COLORS = [
  "var(--retro-teal)",
  "var(--retro-amber)",
  "var(--retro-rose)",
  "var(--retro-gold)",
  "var(--retro-mint)",
  "var(--retro-coral)",
];

export function VoteChart({ title, icon, candidates }: VoteChartProps) {
  const maxVotes = Math.max(...candidates.map((c) => c.vote_count), 1);
  const totalVotes = candidates.reduce((sum, c) => sum + c.vote_count, 0);

  return (
    <div
      className="p-5 rounded-xl border-2"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <h3
        className="text-lg font-bold mb-4 flex items-center gap-2"
        style={{
          color: "var(--retro-espresso)",
        }}
      >
        {icon} {title}
      </h3>

      <div className="space-y-4">
        {candidates.map((candidate, index) => {
          const percentage =
            totalVotes > 0
              ? ((candidate.vote_count / totalVotes) * 100).toFixed(1)
              : "0.0";
          const barWidth =
            maxVotes > 0 ? (candidate.vote_count / maxVotes) * 100 : 0;

          return (
            <div key={candidate.name} className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--retro-espresso)" }}
                >
                  {candidate.candidate_number}. {candidate.name}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: CHART_COLORS[index % CHART_COLORS.length] }}
                >
                  {candidate.vote_count} suara ({percentage}%)
                </span>
              </div>
              <div
                className="w-full h-8 rounded-lg overflow-hidden border border-solid"
                style={{ background: "rgba(0,0,0,0.05)", borderColor: "var(--border)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-lg flex items-center px-2"
                  style={{
                    background: `linear-gradient(90deg, ${
                      CHART_COLORS[index % CHART_COLORS.length]
                    }, ${CHART_COLORS[index % CHART_COLORS.length]}CC)`,
                    minWidth: candidate.vote_count > 0 ? "2rem" : "0",
                  }}
                >
                  {barWidth > 15 && (
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--retro-cream)" }}
                    >
                      {percentage}%
                    </span>
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-4 pt-3 border-t text-sm text-right font-medium"
        style={{
          borderColor: "var(--border)",
          color: "var(--muted-foreground)",
        }}
      >
        Total: {totalVotes} suara
      </div>
    </div>
  );
}
