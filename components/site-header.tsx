import Link from "next/link";
import { Container } from "./container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200/70 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <Container size="wide">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-tight text-zinc-900 hover:text-teal-600 transition-colors"
            aria-label="Home"
          >
            Imran Ansari
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2 text-sm">
            <div className="hidden sm:flex items-center gap-1">
              <HeaderLink href="/#work">Work</HeaderLink>
              <HeaderLink href="/#personal">Personal</HeaderLink>
              <HeaderLink href="/#skills">Skills</HeaderLink>
              <HeaderLink href="/#contact">Contact</HeaderLink>
            </div>
            <Link
              href="/resume"
              className="sm:ml-2 inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-white text-xs font-medium hover:bg-teal-600 transition-colors"
            >
              Resume
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}

function HeaderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-2.5 py-1.5 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
    >
      {children}
    </Link>
  );
}
