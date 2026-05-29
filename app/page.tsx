"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useVotingStore } from "@/lib/voting-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ClassOption {
  id: string;
  name: string;
  angkatan: string;
}

interface StudentOption {
  id: string;
  name: string;
}

export default function HomePage() {
  const router = useRouter();
  const { setStudent } = useVotingStore();

  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch classes on mount
  useEffect(() => {
    async function fetchClasses() {
      const { data, error } = await supabase
        .from("classes")
        .select("id, name, angkatan")
        .order("name");
      if (error) {
        setError("Gagal memuat data kelas");
        return;
      }
      setClasses(data || []);
    }
    fetchClasses();
  }, []);

  // Fetch students when class changes
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setSelectedStudent("");
      return;
    }

    async function fetchStudents() {
      const { data, error } = await supabase
        .from("students")
        .select("id, name")
        .eq("class_id", selectedClass)
        .order("name");
      if (error) {
        setError("Gagal memuat data siswa");
        return;
      }
      setStudents(data || []);
    }
    fetchStudents();
    setSelectedStudent("");
  }, [selectedClass]);

  const handleStartVoting = async () => {
    if (!selectedStudent || !selectedClass) return;

    setLoading(true);
    setError(null);

    // Check if student has already voted
    const { data: student } = await supabase
      .from("students")
      .select("id, name, has_voted")
      .eq("id", selectedStudent)
      .single();

    if (student?.has_voted) {
      setError("Kamu sudah melakukan voting sebelumnya!");
      setLoading(false);
      return;
    }

    const classInfo = classes.find((c) => c.id === selectedClass);
    setStudent(selectedStudent, student?.name || "", classInfo?.name || "");
    router.push("/vote");
  };

  const selectedClassName = classes.find((c) => c.id === selectedClass)?.name;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 pt-12 sm:pt-16 md:pt-24">
      {/* Decorative retro header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-lg mb-8 text-center flex flex-col items-center justify-center z-10"
      >
        {/* Image headline replacing the text */}
        <div className="relative w-full max-w-sm mx-auto">
          {/* We use a standard img tag here, Next.js will look for it in the public folder */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/headline.png" 
            alt="ORASI RPL 2026" 
            className="w-full max-w-sm sm:max-w-md mx-auto h-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </motion.div>

      {/* Identity Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="vintage-tv overflow-hidden border-0">
          <CardContent className="p-8 sm:p-10 space-y-6 relative z-10">
            <div className="text-center">
              <h3
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "#F9E5BA", /* Matching the vintage-tv theme colors */
                  textShadow: "1px 1px 0 #3E2723"
                }}
              >
                Data Pemilih
              </h3>
              <p className="text-sm font-medium" style={{ color: "#E68E24" }}>
                Pilih kelas dan nama kamu untuk mulai voting
              </p>
            </div>

            {/* Class Selector */}
            <div className="space-y-2">
              <label
                htmlFor="class-select"
                className="text-sm font-bold"
                style={{ color: "#F9E5BA" }}
              >
                Asal Kelas
              </label>
              <Select value={selectedClass} onValueChange={(v) => setSelectedClass(v ?? "")}>
                <SelectTrigger
                  id="class-select"
                  className="w-full h-12 text-base cursor-pointer"
                  style={{
                    borderColor: "var(--retro-amber)",
                    background: "var(--retro-cream)",
                  }}
                >
                  <SelectValue placeholder="-- Pilih Kelas --">
                    {selectedClass ? classes.find(c => c.id === selectedClass)?.name : undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "var(--retro-cream)",
                    borderColor: "var(--retro-amber)",
                  }}
                >
                  {classes.map((cls) => (
                    <SelectItem
                      key={cls.id}
                      value={cls.id}
                      className="cursor-pointer text-base"
                    >
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Student Selector */}
            <AnimatePresence>
              {selectedClass && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label
                    htmlFor="student-select"
                    className="text-sm font-bold"
                    style={{ color: "#F9E5BA" }}
                  >
                    Nama Kamu
                  </label>
                  <Select
                    value={selectedStudent}
                    onValueChange={(v) => setSelectedStudent(v ?? "")}
                  >
                    <SelectTrigger
                      id="student-select"
                      className="w-full h-12 text-base cursor-pointer"
                      style={{
                        borderColor: "var(--retro-amber)",
                        background: "var(--retro-cream)",
                      }}
                    >
                      <SelectValue placeholder="-- Pilih Nama --">
                        {selectedStudent ? students.find(s => s.id === selectedStudent)?.name : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      className="max-h-60"
                      style={{
                        background: "var(--retro-cream)",
                        borderColor: "var(--retro-amber)",
                      }}
                    >
                      {students.map((s) => (
                        <SelectItem
                          key={s.id}
                          value={s.id}
                          className="cursor-pointer text-base"
                        >
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-lg text-sm font-medium text-center"
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

            {/* Start button */}
            <Button
              onClick={handleStartVoting}
              disabled={!selectedStudent || loading}
              className="w-full h-12 text-base font-bold tracking-wide cursor-pointer retro-glow disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: selectedStudent
                  ? "linear-gradient(135deg, var(--retro-teal), #247A7A)"
                  : undefined,
                color: selectedStudent ? "var(--retro-cream)" : undefined,
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                  />
                  Memproses...
                </span>
              ) : (
                "🗳️ MULAI VOTING"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xs text-center"
        style={{ color: "var(--retro-cream)" }}
      >
        Pemilihan bersifat rahasia • Satu siswa satu suara
      </motion.p>
    </div>
  );
}
