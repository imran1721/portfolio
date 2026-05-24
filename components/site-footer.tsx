import { Container } from "./container";
import { EmailLink } from "./email-link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-zinc-200 bg-zinc-50/50">
      <Container size="wide">
        <div className="grid gap-6 sm:grid-cols-3 py-8 text-sm text-zinc-600">
          {/* identity */}
          <div>
            <p className="font-semibold text-zinc-900">Imran Ansari</p>
            <p className="mt-1">Senior Full-Stack Engineer</p>
            <p>Gurgaon, India</p>
          </div>

          {/* direct contact */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
              Contact
            </p>
            <p className="mt-2">
              <EmailLink className="hover:text-teal-600 transition-colors break-all">
                m.imran.ansari.2020@gmail.com
              </EmailLink>
            </p>
            <p>
              <a
                href="tel:+918797005465"
                className="hover:text-teal-600 transition-colors"
              >
                +91 87970 05465
              </a>
            </p>
          </div>

          {/* socials + resume */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
              Elsewhere
            </p>
            <div className="mt-2 flex flex-col gap-1">
              <a
                href="https://www.linkedin.com/in/imran-ansari-a4b178199/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/imran1721"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600 transition-colors"
              >
                GitHub
              </a>
              <a
                href="/resume"
                className="hover:text-teal-600 transition-colors"
              >
                Résumé (PDF)
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-200 py-4 text-xs text-zinc-500">
          © {new Date().getFullYear()} Imran Ansari. Built with Next.js,
          IBM Plex Sans, and a lot of tea.
        </div>
      </Container>
    </footer>
  );
}
