export function WarehouseMark({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Roofline */}
      <path
        d="M4 21L24 5L44 21"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Posts */}
      <path
        d="M8 17.5V42M40 17.5V42M17 12.5V42M31 12.5V42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Base */}
      <path d="M4 42H44" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      {/* Stacked boxes */}
      <rect x="15" y="30.5" width="9" height="9" rx="1.4" fill="var(--mark-accent, #E8722A)" />
      <rect x="24.5" y="34" width="8" height="5.5" rx="1.2" fill="var(--mark-accent, #E8722A)" opacity="0.85" />
    </svg>
  );
}
