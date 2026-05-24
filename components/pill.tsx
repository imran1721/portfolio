import { cn } from "@/lib/cn";

export function Pill({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "accent";
  className?: string;
}) {
  const styles = {
    default: "bg-zinc-100 text-zinc-700 border-zinc-200",
    outline: "bg-transparent text-zinc-700 border-zinc-300",
    accent: "bg-teal-50 text-teal-700 border-teal-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
