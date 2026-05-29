"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { AdminLogin } from "@/components/admin-login";
import { VoteChart } from "@/components/vote-chart";
import { VoterTable } from "@/components/voter-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CandidateVoteCount {
  name: string;
  candidate_number: number;
  vote_count: number;
  position: string;
}

interface VoterDetail {
  student_name: string;
  class_name: string;
  voted_at: string;
  wakorjur_name: string | null;
  wakorjur_number: number | null;
  korjur_name: string | null;
  korjur_number: number | null;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Stats
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalVoted, setTotalVoted] = useState(0);
  const [wakorjurCandidates, setWakorjurCandidates] = useState<CandidateVoteCount[]>([]);
  const [korjurCandidates, setKorjurCandidates] = useState<CandidateVoteCount[]>([]);
  const [voters, setVoters] = useState<VoterDetail[]>([]);
  const [classNames, setClassNames] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    // 1. Get total students
    const { count: studentCount } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true });
    setTotalStudents(studentCount || 0);

    // 2. Get total voted
    const { count: votedCount } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true })
      .eq("has_voted", true);
    setTotalVoted(votedCount || 0);

    // 3. Get candidates with vote counts
    const { data: candidates } = await supabase
      .from("candidates")
      .select("id, name, candidate_number, position")
      .order("candidate_number");

    if (candidates) {
      const withCounts: CandidateVoteCount[] = [];
      for (const c of candidates) {
        const { count } = await supabase
          .from("votes")
          .select("*", { count: "exact", head: true })
          .eq("candidate_id", c.id);
        withCounts.push({
          name: c.name,
          candidate_number: c.candidate_number,
          vote_count: count || 0,
          position: c.position,
        });
      }
      setWakorjurCandidates(
        withCounts.filter((c) => c.position === "wakil_koordinator")
      );
      setKorjurCandidates(
        withCounts.filter((c) => c.position === "koordinator")
      );
    }

    // 4. Get class names
    const { data: classes } = await supabase
      .from("classes")
      .select("name")
      .order("name");
    setClassNames(classes?.map((c) => c.name) || []);

    // 5. Get voter details
    const { data: votesData } = await supabase
      .from("votes")
      .select(`
        voted_at,
        position,
        student:students(name, class_id, classes(name)),
        candidate:candidates(name, candidate_number)
      `)
      .order("voted_at", { ascending: false });

    if (votesData) {
      // Group votes by student
      const voterMap = new Map<string, VoterDetail>();

      for (const vote of votesData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const v = vote as any;
        const studentName = v.student?.name || "Unknown";
        const className = v.student?.classes?.name || "Unknown";
        const candidateName = v.candidate?.name || null;
        const candidateNumber = v.candidate?.candidate_number || null;

        if (!voterMap.has(studentName)) {
          voterMap.set(studentName, {
            student_name: studentName,
            class_name: className,
            voted_at: v.voted_at,
            wakorjur_name: null,
            wakorjur_number: null,
            korjur_name: null,
            korjur_number: null,
          });
        }

        const voter = voterMap.get(studentName)!;
        if (v.position === "wakil_koordinator") {
          voter.wakorjur_name = candidateName;
          voter.wakorjur_number = candidateNumber;
        } else {
          voter.korjur_name = candidateName;
          voter.korjur_number = candidateNumber;
        }
      }

      setVoters(Array.from(voterMap.values()));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated, fetchData]);

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  const participationRate =
    totalStudents > 0
      ? ((totalVoted / totalStudents) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold"
              style={{
                color: "var(--retro-espresso)",
              }}
            >
              📊 Admin Dashboard
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--muted-foreground)" }}
            >
              Monitoring hasil pemilihan Kojur & Wakojur RPL 2026
            </p>
          </div>
          <Button
            onClick={fetchData}
            disabled={loading}
            variant="outline"
            className="cursor-pointer"
            style={{
              borderColor: "var(--retro-teal)",
              color: "var(--retro-teal)",
            }}
          >
            {loading ? "Memuat..." : "🔄 Refresh Data"}
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Card
            className="border-2"
            style={{ borderColor: "var(--retro-teal)", background: "var(--card)" }}
          >
            <CardContent className="p-5 text-center">
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Total Siswa
              </p>
              <p
                className="text-3xl font-bold"
                style={{
                  color: "var(--retro-teal)",
                }}
              >
                {totalStudents}
              </p>
            </CardContent>
          </Card>

          <Card
            className="border-2"
            style={{ borderColor: "var(--retro-amber)", background: "var(--card)" }}
          >
            <CardContent className="p-5 text-center">
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Sudah Memilih
              </p>
              <p
                className="text-3xl font-bold"
                style={{
                  color: "var(--retro-amber)",
                }}
              >
                {totalVoted}
              </p>
            </CardContent>
          </Card>

          <Card
            className="border-2"
            style={{ borderColor: "var(--retro-rose)", background: "var(--card)" }}
          >
            <CardContent className="p-5 text-center">
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Partisipasi
              </p>
              <p
                className="text-3xl font-bold"
                style={{
                  color: "var(--retro-rose)",
                }}
              >
                {participationRate}%
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <VoteChart
            title="Wakil Koordinator Jurusan"
            icon="🏅"
            candidates={wakorjurCandidates}
          />
          <VoteChart
            title="Koordinator Jurusan"
            icon="👑"
            candidates={korjurCandidates}
          />
        </motion.div>

        {/* Voter Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <VoterTable voters={voters} classes={classNames} />
        </motion.div>
      </div>
    </div>
  );
}
