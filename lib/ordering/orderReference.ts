const REFERENCE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderReference(): string {
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += REFERENCE_CHARS[Math.floor(Math.random() * REFERENCE_CHARS.length)];
  }
  return `JY-${suffix}`;
}
