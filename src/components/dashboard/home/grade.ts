export function getGrade(score: number): string {
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 80) return "B+";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "E";
}
