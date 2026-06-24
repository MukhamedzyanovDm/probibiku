import { createHash } from "crypto";

export function computeHistoryHash(
  records: Array<{
    date: string;
    odometer: number | null;
    totalAmount: string;
  }>
): string {
  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));
  const data = JSON.stringify(sorted.map(r => ({
    date: r.date,
    odometer: r.odometer,
    totalAmount: r.totalAmount
  })));
  return createHash("sha256").update(data).digest("hex");
}
