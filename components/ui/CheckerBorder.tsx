interface CheckerBorderProps {
  className?: string;
  position?: "top" | "bottom";
}

export function CheckerBorder({
  className = "",
  position = "top",
}: CheckerBorderProps) {
  return (
    <div
      aria-hidden="true"
      className={`checker-border checker-border--${position} ${className}`.trim()}
    />
  );
}
