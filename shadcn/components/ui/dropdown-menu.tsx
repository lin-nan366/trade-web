"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  position: { top: number; left: number };
  setPosition: (position: { top: number; left: number }) => void;
};

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenu() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenu components must be used inside DropdownMenu");
  }
  return context;
}

function DropdownMenu({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen);
      }
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <DropdownMenuContext.Provider
      value={{ open, setOpen, triggerRef, position, setPosition }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  children,
  asChild,
}: {
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
  asChild?: boolean;
}) {
  const { open, setOpen, triggerRef, setPosition } = useDropdownMenu();

  const child = React.Children.only(children);
  const childProps = child.props as React.HTMLAttributes<HTMLElement>;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    childProps.onClick?.(event);
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 8,
      left: Math.min(rect.left + window.scrollX, window.innerWidth - 220),
    });
    setOpen(!open);
  };

  if (!asChild) {
    return (
      <button
        ref={(node) => {
          triggerRef.current = node;
        }}
        type="button"
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }

  return React.cloneElement(child, { onClick: handleClick });
}

function DropdownMenuContextTrigger({
  children,
  asChild,
}: {
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
  asChild?: boolean;
}) {
  const { setOpen, setPosition, triggerRef } = useDropdownMenu();
  const child = React.Children.only(children);
  const childProps = child.props as React.HTMLAttributes<HTMLElement>;

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    childProps.onContextMenu?.(event);
    event.preventDefault();
    triggerRef.current = event.currentTarget;
    setPosition({
      top: Math.min(event.clientY + window.scrollY, window.innerHeight - 140),
      left: Math.min(event.clientX + window.scrollX, window.innerWidth - 220),
    });
    setOpen(true);
  };

  if (!asChild) {
    return (
      <div onContextMenu={handleContextMenu} role="presentation">
        {children}
      </div>
    );
  }

  return React.cloneElement(child, { onContextMenu: handleContextMenu });
}

function DropdownMenuContent({
  className,
  align = "start",
  children,
}: {
  className?: string;
  align?: "start" | "end";
  children: React.ReactNode;
}) {
  const { open, setOpen, position } = useDropdownMenu();
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!contentRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  const left = align === "end" ? Math.max(position.left - 28, 8) : position.left;

  return (
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "fixed z-50 min-w-[11rem] rounded-lg border bg-card p-1 text-card-foreground shadow-lg outline-none",
        className,
      )}
      style={{ top: position.top, left }}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({
  className,
  inset,
  onSelect,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  inset?: boolean;
  onSelect?: () => void;
}) {
  const { setOpen } = useDropdownMenu();

  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "relative flex h-9 w-full select-none items-center rounded-md px-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent disabled:pointer-events-none disabled:opacity-50",
        inset && "pl-8",
        className,
      )}
      onClick={(event) => {
        props.onClick?.(event);
        onSelect?.();
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContextTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
