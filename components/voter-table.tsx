"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface VoterDetail {
  student_name: string;
  class_name: string;
  voted_at: string;
  wakorjur_name: string | null;
  wakorjur_number: number | null;
  korjur_name: string | null;
  korjur_number: number | null;
}

interface VoterTableProps {
  voters: VoterDetail[];
  classes: string[];
}

export function VoterTable({ voters, classes }: VoterTableProps) {
  const [filterClass, setFilterClass] = useState<string>("all");

  const filtered =
    filterClass === "all"
      ? voters
      : voters.filter((v) => v.class_name === filterClass);

  return (
    <div
      className="rounded-xl border-2 overflow-hidden"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Header */}
      <div
        className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
        style={{
          borderBottom: "2px solid var(--border)",
        }}
      >
        <h3
          className="text-lg font-bold flex items-center gap-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--retro-espresso)",
          }}
        >
          📋 Detail Pemilih
        </h3>

        <div className="flex items-center gap-2">
          <span
            className="text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Filter:
          </span>
          <Select value={filterClass} onValueChange={(v) => setFilterClass(v ?? "all")}>
            <SelectTrigger
              className="w-40 h-9 text-sm cursor-pointer"
              style={{
                borderColor: "var(--retro-amber)",
                background: "var(--retro-cream)",
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              style={{
                background: "var(--retro-cream)",
                borderColor: "var(--retro-amber)",
              }}
            >
              <SelectItem value="all" className="cursor-pointer">
                Semua Kelas
              </SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls} className="cursor-pointer">
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge
            className="text-xs"
            style={{
              background: "var(--retro-teal)",
              color: "var(--retro-cream)",
              border: "none",
            }}
          >
            {filtered.length} pemilih
          </Badge>
        </div>
      </div>

      {/* Table */}
      <ScrollArea className="max-h-96">
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--border)" }}>
              <TableHead
                className="font-bold text-xs"
                style={{ color: "var(--retro-espresso)" }}
              >
                No
              </TableHead>
              <TableHead
                className="font-bold text-xs"
                style={{ color: "var(--retro-espresso)" }}
              >
                Nama
              </TableHead>
              <TableHead
                className="font-bold text-xs"
                style={{ color: "var(--retro-espresso)" }}
              >
                Kelas
              </TableHead>
              <TableHead
                className="font-bold text-xs"
                style={{ color: "var(--retro-espresso)" }}
              >
                Waktu
              </TableHead>
              <TableHead
                className="font-bold text-xs"
                style={{ color: "var(--retro-espresso)" }}
              >
                🏅 Wakorjur
              </TableHead>
              <TableHead
                className="font-bold text-xs"
                style={{ color: "var(--retro-espresso)" }}
              >
                👑 Korjur
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Belum ada pemilih{filterClass !== "all" ? ` dari ${filterClass}` : ""}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((voter, index) => (
                <TableRow
                  key={index}
                  style={{ borderColor: "var(--border)" }}
                  className="text-sm"
                >
                  <TableCell
                    className="font-medium"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className="font-semibold"
                    style={{ color: "var(--retro-espresso)" }}
                  >
                    {voter.student_name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: "var(--retro-amber)",
                        color: "var(--retro-amber)",
                      }}
                    >
                      {voter.class_name}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className="text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {new Date(voter.voted_at).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell
                    className="text-xs font-medium"
                    style={{ color: "var(--retro-teal)" }}
                  >
                    {voter.wakorjur_number}. {voter.wakorjur_name || "-"}
                  </TableCell>
                  <TableCell
                    className="text-xs font-medium"
                    style={{ color: "var(--retro-rose)" }}
                  >
                    {voter.korjur_number}. {voter.korjur_name || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
