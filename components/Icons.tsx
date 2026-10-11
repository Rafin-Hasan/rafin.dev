import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 18, strokeWidth = 1.75, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icon>
);
export const ArrowUpRight = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></Icon>
);
export const ArrowUp = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></Icon>
);
export const ChevronLeft = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}><path d="m15 18-6-6 6-6" /></Icon>
);
export const Download = (p: IconProps) => (
  <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></Icon>
);
export const Send = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></Icon>
);
export const Copy = (p: IconProps) => (
  <Icon {...p}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>
);
export const Check = (p: IconProps) => (
  <Icon strokeWidth={2.25} {...p}><path d="M20 6 9 17l-5-5" /></Icon>
);
export const Search = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>
);
export const Grid = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></Icon>
);
export const List = (p: IconProps) => (
  <Icon {...p}><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></Icon>
);
export const Menu = (p: IconProps) => (
  <Icon {...p}><path d="M4 8h16" /><path d="M4 16h16" /></Icon>
);
export const Close = (p: IconProps) => (
  <Icon {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>
);
export const Info = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></Icon>
);
export const Alert = (p: IconProps) => (
  <Icon strokeWidth={2} {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></Icon>
);
export const Spinner = (p: IconProps) => (
  <Icon strokeWidth={2.25} {...p}><path d="M21 12a9 9 0 1 1-6.2-8.56" /></Icon>
);
export const FileText = (p: IconProps) => (
  <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></Icon>
);
export const GitHub = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </Icon>
);
export const LinkedIn = (p: IconProps) => (
  <Icon {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Icon>
);
