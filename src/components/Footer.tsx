import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { profile } from "@/utils/data";

const links = [
  { href: profile.github, label: "GitHub", Icon: FiGithub },
  { href: profile.linkedin, label: "LinkedIn", Icon: FiLinkedin },
  { href: profile.x, label: "X (Twitter)", Icon: FaXTwitter },
  { href: `mailto:${profile.email}`, label: "Email", Icon: FiMail },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="wrap flex flex-col items-center justify-between gap-4 py-8 text-sm sm:flex-row" style={{ color: "var(--muted)" }}>
        <p>© {new Date().getFullYear()} Kunal Tyagi. Built with Next.js and Framer Motion.</p>
        <ul className="flex items-center gap-2">
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border transition hover:-translate-y-0.5"
                style={{ borderColor: "var(--line)", color: "var(--text)" }}
              >
                <Icon size={17} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
