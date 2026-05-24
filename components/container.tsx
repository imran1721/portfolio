import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-5xl",
    wide: "max-w-6xl",
  };
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", widths[size], className)}>
      {children}
    </div>
  );
}
