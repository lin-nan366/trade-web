import * as React from "react";

import { cn } from "@/lib/utils";

const Badge = ({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline";
}) => (
  <div
    className={cn(
      "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
      variant === "default" && "bg-primary text-primary-foreground",
      variant === "secondary" && "bg-secondary text-secondary-foreground",
      variant === "outline" && "border border-border text-foreground",
      className,
    )}
    {...props}
  />
);
Badge.displayName = "Badge";

export { Badge };
