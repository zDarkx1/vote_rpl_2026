"use client";

import { CandidateInfo } from "@/lib/voting-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CandidateModalProps {
  candidate: CandidateInfo | null;
  open: boolean;
  onClose: () => void;
}

export function CandidateModal({
  candidate,
  open,
  onClose,
}: CandidateModalProps) {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        style={{
          background: "var(--retro-cream)",
          borderColor: "var(--retro-amber)",
          borderWidth: "2px",
        }}
      >
        <DialogHeader className="pt-2">
          <DialogTitle
            className="text-center text-xl font-bold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--retro-espresso)",
            }}
          >
            Detail Kandidat
          </DialogTitle>
          <DialogDescription className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
            {candidate.position === "koordinator"
              ? "Calon Koordinator Jurusan"
              : "Calon Wakil Koordinator Jurusan"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Name */}
          <div className="flex flex-col items-center">
            <h3
              className="text-xl font-bold text-center"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--retro-espresso)",
              }}
            >
              {candidate.name}
            </h3>
            <Badge
              className="mt-2 text-sm px-4 py-1"
              style={{
                background: "var(--retro-amber)",
                color: "var(--retro-cream)",
                border: "none",
              }}
            >
              Nomor Urut {candidate.candidate_number}
            </Badge>
          </div>

          <Separator style={{ background: "var(--border)" }} />

          {/* Bio info */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-3 rounded-lg"
              style={{ background: "var(--card)" }}
            >
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Asal Kelas
              </p>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--retro-espresso)" }}
              >
                {candidate.kelas_asal || "-"}
              </p>
            </div>
            <div
              className="p-3 rounded-lg"
              style={{ background: "var(--card)" }}
            >
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Angkatan
              </p>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--retro-espresso)" }}
              >
                {candidate.angkatan || "-"}
              </p>
            </div>
          </div>

          <Separator style={{ background: "var(--border)" }} />

          {/* Visi */}
          <div>
            <h4
              className="font-bold text-sm mb-2 flex items-center gap-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--retro-teal)",
              }}
            >
              🎯 VISI
            </h4>
            <p
              className="text-sm leading-relaxed p-3 rounded-lg"
              style={{
                background: "var(--card)",
                color: "var(--retro-espresso)",
              }}
            >
              {candidate.visi || "Belum tersedia"}
            </p>
          </div>

          {/* Misi */}
          <div>
            <h4
              className="font-bold text-sm mb-2 flex items-center gap-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--retro-teal)",
              }}
            >
              🚀 MISI
            </h4>
            <div
              className="text-sm leading-relaxed p-3 rounded-lg whitespace-pre-line"
              style={{
                background: "var(--card)",
                color: "var(--retro-espresso)",
              }}
            >
              {candidate.misi || "Belum tersedia"}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
