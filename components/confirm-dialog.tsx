"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CandidateInfo } from "@/lib/voting-store";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  wakorjur: CandidateInfo | null;
  korjur: CandidateInfo | null;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  wakorjur,
  korjur,
  loading,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent
        style={{
          background: "var(--retro-cream)",
          borderColor: "var(--retro-amber)",
          borderWidth: "2px",
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className="text-center text-xl"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--retro-espresso)",
            }}
          >
            Konfirmasi Pilihan
          </AlertDialogTitle>
          <AlertDialogDescription
            className="text-center text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Pastikan pilihan kamu sudah benar. Suara tidak dapat diubah setelah dikonfirmasi.
          </AlertDialogDescription>

          <div className="space-y-3 pt-2">
            <div
              className="p-3 rounded-lg border"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--retro-teal)" }}
              >
                🏅 Wakil Koordinator Jurusan
              </p>
              <p
                className="font-bold text-sm"
                style={{ color: "var(--retro-espresso)" }}
              >
                {wakorjur
                  ? `${wakorjur.candidate_number}. ${wakorjur.name}`
                  : "-"}
              </p>
            </div>

            <div
              className="p-3 rounded-lg border"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--retro-teal)" }}
              >
                👑 Koordinator Jurusan
              </p>
              <p
                className="font-bold text-sm"
                style={{ color: "var(--retro-espresso)" }}
              >
                {korjur
                  ? `${korjur.candidate_number}. ${korjur.name}`
                  : "-"}
              </p>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 sm:gap-3">
          <AlertDialogCancel
            className="flex-1 cursor-pointer"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
            }}
            disabled={loading}
          >
            Kembali
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 cursor-pointer font-bold"
            style={{
              background: "var(--retro-teal)",
              color: "var(--retro-cream)",
            }}
          >
            {loading ? "Mengirim..." : "✓ Konfirmasi"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
