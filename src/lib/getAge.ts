// Compute age from an ISO date (YYYY-MM-DD). Never hardcode age in the UI.
export function getAge(dobISO: string, now: Date = new Date()): number {
  const dob = new Date(dobISO + "T00:00:00");
  if (Number.isNaN(dob.getTime())) return 0;
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}
