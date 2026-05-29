"use client";

import { create } from "zustand";

export interface CandidateInfo {
  id: string;
  name: string;
  position: string;
  kelas_asal: string | null;
  angkatan: string | null;
  visi: string | null;
  misi: string | null;
  photo_url: string | null;
  candidate_number: number;
}

interface VotingState {
  // Student identity
  studentId: string | null;
  studentName: string | null;
  className: string | null;

  // Voting state
  currentStep: "wakorjur" | "korjur";
  selectedWakorjur: CandidateInfo | null;
  selectedKorjur: CandidateInfo | null;

  // Actions
  setStudent: (id: string, name: string, className: string) => void;
  setCurrentStep: (step: "wakorjur" | "korjur") => void;
  selectWakorjur: (candidate: CandidateInfo | null) => void;
  selectKorjur: (candidate: CandidateInfo | null) => void;
  reset: () => void;
}

export const useVotingStore = create<VotingState>((set) => ({
  studentId: null,
  studentName: null,
  className: null,
  currentStep: "wakorjur",
  selectedWakorjur: null,
  selectedKorjur: null,

  setStudent: (id, name, className) =>
    set({ studentId: id, studentName: name, className }),

  setCurrentStep: (step) => set({ currentStep: step }),

  selectWakorjur: (candidate) => set({ selectedWakorjur: candidate }),

  selectKorjur: (candidate) => set({ selectedKorjur: candidate }),

  reset: () =>
    set({
      studentId: null,
      studentName: null,
      className: null,
      currentStep: "wakorjur",
      selectedWakorjur: null,
      selectedKorjur: null,
    }),
}));
