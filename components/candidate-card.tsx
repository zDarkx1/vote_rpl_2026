"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CandidateInfo } from "@/lib/voting-store";

interface CandidateCardProps {
  candidate: CandidateInfo;
  isSelected: boolean;
  onSelect: (candidate: CandidateInfo) => void;
  onViewDetail: (candidate: CandidateInfo) => void;
  index: number;
  bannerImageUrl?: string;
  step?: "wakorjur" | "korjur";
}

export function CandidateCard({
  candidate,
  isSelected,
  onSelect,
  onViewDetail,
  index,
  bannerImageUrl,
  step,
}: CandidateCardProps) {
  // Alternate colors for the banners
  const bannerColors = ["#8C9975", "#8B5A2B", "#1B6B6B", "#C8922A"];
  const bgColor = bannerColors[index % bannerColors.length];

  // If a full banner image is provided, render it directly
  if (bannerImageUrl) {
    // Berikan margin negatif atas HANYA untuk korjur, dan margin negatif bawah untuk mendekatkan card 2
    const topMargin = step === "korjur" ? "-mt-12 sm:-mt-20" : "";
    const marginClass = index === 0 ? `${topMargin} -mb-24 sm:-mb-40 relative z-20` : "mb-4 sm:mb-6 relative z-10";

    return (
      <div className={`w-full max-w-5xl mx-auto ${marginClass}`}>
        <motion.div
          whileHover={!isSelected ? { scale: 1.02, y: -5 } : {}}
          onClick={() => onSelect(candidate)}
          className="cursor-pointer relative z-10"
          style={{
            filter: isSelected ? "drop-shadow(0 0 20px var(--retro-gold))" : "drop-shadow(0 10px 15px rgba(0,0,0,0.5))",
            zIndex: isSelected ? 40 : 10,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bannerImageUrl} alt={candidate.name} className="w-full h-auto object-contain" />

          {/* Detail Button */}
          <div className={`absolute right-4 sm:right-6 z-50 ${
            index === 0 
              ? (step === 'korjur' ? 'top-20 sm:top-28' : 'top-4 sm:top-8') 
              : index === 1 ? 'top-20 sm:top-40' 
              : 'top-4 sm:top-6'
          }`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetail(candidate);
              }}
              className="px-4 py-2 bg-white/90 hover:bg-white text-black rounded-md font-medium transition-colors text-sm shadow-sm"
            >
              Lihat Visi & Misi
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-2 sm:mb-4">
      {/* The Banner Container */}
      <motion.div
        whileHover={!isSelected ? { scale: 1.02, x: 10 } : {}}
        onClick={() => onSelect(candidate)}
        className="racing-banner group"
        style={{
          background: bgColor,
          borderColor: isSelected ? "var(--retro-cream)" : "var(--retro-espresso)",
          boxShadow: isSelected ? `0 0 30px ${bgColor}` : undefined,
          zIndex: isSelected ? 40 : 10,
        }}
      >
        <div className="racing-banner-content flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1 min-w-0 pr-4 sm:pr-[250px]">
            <h2 className="racing-name truncate" title={candidate.name}>
              {candidate.name}
            </h2>
          </div>

          {/* Detail Button */}
          <div className="mt-2 sm:mt-0 flex-shrink-0 relative z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetail(candidate);
              }}
              className="px-4 py-2 bg-white/90 hover:bg-white text-black rounded-md font-medium transition-colors text-sm shadow-sm"
            >
              Lihat Visi & Misi
            </button>
          </div>
        </div>
      </motion.div>

      {/* Background Watermark/Silhouette inside the banner bounds (simulated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10" style={{ zIndex: 5, transform: "skewY(-5deg)" }}>
        <span className="absolute right-10 top-[-20px] text-[150px] font-black">{candidate.candidate_number}</span>
      </div>

      {/* Character Reveal (Photo) */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ x: 300, y: 50, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            exit={{ x: 300, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="absolute -right-4 sm:right-8 -bottom-12 sm:-bottom-16 pointer-events-none racing-aura"
            style={{ zIndex: 60 }}
          >
            <div className="relative">
              {/* Class Badge */}
              <div className="absolute top-1/4 -left-12 sm:-left-20 racing-badge z-50 shadow-xl text-sm sm:text-lg">
                KELAS {index % 2 === 0 ? "XI RPL A" : "XI RPL B"}
              </div>

              {/* Photo or Placeholder Avatar */}
              {candidate.photo_url ? (
                <img
                  src={candidate.photo_url}
                  alt={candidate.name}
                  className="h-48 sm:h-64 md:h-80 w-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
                />
              ) : (
                <div className="h-48 sm:h-64 md:h-80 aspect-square flex items-end justify-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
                  <span className="text-[120px] sm:text-[180px] md:text-[220px] leading-none">🧍‍♂️</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
