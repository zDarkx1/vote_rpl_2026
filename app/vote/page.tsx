"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useVotingStore, CandidateInfo } from "@/lib/voting-store";
import { CandidateCard } from "@/components/candidate-card";
import { CandidateModal } from "@/components/candidate-modal";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";

export default function VotePage() {
  const router = useRouter();
  const {
    studentId,
    studentName,
    className,
    currentStep,
    selectedWakorjur,
    selectedKorjur,
    setCurrentStep,
    selectWakorjur,
    selectKorjur,
  } = useVotingStore();

  const [candidates, setCandidates] = useState<CandidateInfo[]>([]);
  const [detailCandidate, setDetailCandidate] = useState<CandidateInfo | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if no student selected
  useEffect(() => {
    if (!studentId) {
      router.replace("/");
    }
  }, [studentId, router]);

  // Fetch candidates
  useEffect(() => {
    async function fetchCandidates() {
      const position =
        currentStep === "wakorjur" ? "wakil_koordinator" : "koordinator";
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .eq("position", position)
        .order("candidate_number");

      if (error) {
        setError("Gagal memuat data kandidat");
        return;
      }
      setCandidates(data || []);
    }
    fetchCandidates();
  }, [currentStep]);

  const currentSelection =
    currentStep === "wakorjur" ? selectedWakorjur : selectedKorjur;

  const handleSelect = (candidate: CandidateInfo) => {
    if (currentStep === "wakorjur") {
      selectWakorjur(
        selectedWakorjur?.id === candidate.id ? null : candidate
      );
    } else {
      selectKorjur(
        selectedKorjur?.id === candidate.id ? null : candidate
      );
    }
  };

  const handleNext = () => {
    if (currentStep === "wakorjur" && selectedWakorjur) {
      setCurrentStep("korjur");
    } else if (currentStep === "korjur" && selectedKorjur) {
      setShowConfirm(true);
    }
  };

  const handleBack = () => {
    if (currentStep === "korjur") {
      setCurrentStep("wakorjur");
    } else {
      router.replace("/");
    }
  };

  const handleSubmitVote = async () => {
    if (!studentId || !selectedWakorjur || !selectedKorjur) return;

    setSubmitting(true);
    setError(null);

    try {
      // Insert votes
      const { error: voteError } = await supabase.from("votes").insert([
        {
          student_id: studentId,
          candidate_id: selectedWakorjur.id,
          position: "wakil_koordinator",
        },
        {
          student_id: studentId,
          candidate_id: selectedKorjur.id,
          position: "koordinator",
        },
      ]);

      if (voteError) {
        setError("Gagal mengirim suara. Mungkin kamu sudah voting sebelumnya.");
        setSubmitting(false);
        setShowConfirm(false);
        return;
      }

      // Mark student as voted
      await supabase
        .from("students")
        .update({ has_voted: true })
        .eq("id", studentId);

      // Navigate to thank you
      router.push("/thankyou");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setSubmitting(false);
      setShowConfirm(false);
    }
  };

  if (!studentId) return null;

  const stepTitle =
    currentStep === "wakorjur"
      ? "Pilih Wakil Koordinator Jurusan"
      : "Pilih Koordinator Jurusan";

  const stepEmoji = currentStep === "wakorjur" ? "🏅" : "👑";

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2 text-white drop-shadow-md"
      >
        <p className="text-sm font-medium mb-1">
          Pemilih: <strong>{studentName}</strong> • {className}
        </p>
      </motion.div>

      {/* Step Title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="text-center mb-2"
        >
          <div className="relative w-full max-w-md sm:max-w-lg mx-auto mb-2 translate-x-8 sm:translate-x-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/headline2.png" 
              alt="Headline Pemilihan" 
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md mx-auto mb-6 p-3 rounded-lg text-sm font-medium text-center"
            role="alert"
            style={{
              background: "#FDE8E8",
              color: "var(--retro-rose)",
              border: "1px solid var(--retro-rose)",
            }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candidate Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 flex items-start justify-center"
        >
          <div className={`flex flex-col w-full max-w-5xl overflow-hidden ${currentStep === "wakorjur" ? "py-12" : "pt-0 pb-12"} px-2 sm:px-8`}>
            {candidates.map((candidate, index) => {
              // Menentukan banner khusus untuk masing-masing kandidat wakorjur & korjur
              let bannerImg = undefined;
              if (currentStep === "wakorjur") {
                if (index === 0) bannerImg = "/zulfikarcard.png";
                else if (index === 1) bannerImg = "/rajendracard.png";
                else if (index === 2) bannerImg = "/corelcard.png";
              } else if (currentStep === "korjur") {
                if (index === 0) bannerImg = "/revancard.png";
                else if (index === 1) bannerImg = "/adhyacard.png";
                else if (index === 2) bannerImg = "/zakiicard.png";
              }

              return (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={currentSelection?.id === candidate.id}
                  onSelect={handleSelect}
                  onViewDetail={setDetailCandidate}
                  index={index}
                  bannerImageUrl={bannerImg}
                  step={currentStep}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center mt-8 max-w-4xl mx-auto w-full"
      >
        <Button
          variant="outline"
          onClick={handleBack}
          className="cursor-pointer px-6"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          ← Kembali
        </Button>

        <Button
          onClick={handleNext}
          disabled={!currentSelection}
          className="cursor-pointer px-8 font-bold retro-glow disabled:opacity-50"
          style={{
            background: currentSelection
              ? "linear-gradient(135deg, var(--retro-teal), #247A7A)"
              : undefined,
            color: currentSelection ? "var(--retro-cream)" : undefined,
          }}
        >
          {currentStep === "wakorjur"
            ? "Lanjut ke Kojur →"
            : "Konfirmasi Pilihan ✓"}
        </Button>
      </motion.div>

      {/* Candidate Detail Modal */}
      <CandidateModal
        candidate={detailCandidate}
        open={!!detailCandidate}
        onClose={() => setDetailCandidate(null)}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={showConfirm}
        onConfirm={handleSubmitVote}
        onCancel={() => setShowConfirm(false)}
        wakorjur={selectedWakorjur}
        korjur={selectedKorjur}
        loading={submitting}
      />
    </div>
  );
}
