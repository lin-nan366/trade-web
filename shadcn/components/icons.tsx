import * as React from "react";

import { cn } from "@/lib/utils";

type IconProps = React.SVGAttributes<SVGSVGElement>;

function Icon({
  className,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Plus = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Icon>
);

export const Menu = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </Icon>
);

export const MoreVertical = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </Icon>
);

export const ChevronDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const FileDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M12 18v-6" />
    <path d="m9 15 3 3 3-3" />
  </Icon>
);

export const Pencil = (props: IconProps) => (
  <Icon {...props}>
    <path d="M17 3a2.8 2.8 0 0 1 4 4L8 20l-5 1 1-5Z" />
    <path d="m15 5 4 4" />
  </Icon>
);

export const Trash = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="m19 6-1 14H6L5 6" />
    <path d="M10 11v5" />
    <path d="M14 11v5" />
  </Icon>
);

export const Wallet = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
    <path d="M16 12h6v5h-6a2.5 2.5 0 0 1 0-5Z" />
    <path d="M19 14.5h.01" />
  </Icon>
);

export const Sun = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </Icon>
);

export const Moon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
  </Icon>
);

export const Activity = (props: IconProps) => (
  <Icon {...props}>
    <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
  </Icon>
);

export const ArrowUpRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </Icon>
);

export const ArrowDownRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="m7 7 10 10" />
    <path d="M17 7v10H7" />
  </Icon>
);
