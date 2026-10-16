"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiSend } from "react-icons/fi";
import SectionHeading from "@/components/SectionHeading";
import { contacts } from "@/utils/contact";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const validEmail = (mail: string) => /\S+@\S+\.\S+/.test(mail);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 2) return void toast.error("Please enter your name.");
    if (!validEmail(email)) return void toast.error("Enter a valid email address.");
    if (message.trim().length < 10)
      return void toast.error("Write at least 10 characters so I know how to help.");

    setSending(true);
    const loading = toast.loading("Sending your message...");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      toast.dismiss(loading);
      if (data.success) {
        toast.success("Message sent. I'll reply soon.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(`Couldn't send: ${data.error ?? "unknown error"}`);
      }
    } catch {
      toast.dismiss(loading);
      toast.error("Couldn't reach the server. Try emailing me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="band">
      <div className="wrap">
        <SectionHeading
          title="Let's build something together"
          text="Open to internships, collaborations and open-source work. Send a message and it lands straight in my inbox."
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <motion.ul
            className="min-w-0 space-y-3"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.link}
                  target={c.link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="panel group flex items-center justify-between gap-4 p-5 transition hover:-translate-y-1"
                  style={{ boxShadow: "none" }}
                >
                  <span className="min-w-0">
                    <span className="block text-sm" style={{ color: "var(--muted)" }}>
                      {c.label}
                    </span>
                    <span className="block truncate font-semibold" style={{ color: "var(--text)" }}>
                      {c.value}
                    </span>
                  </span>
                  <FiArrowUpRight
                    size={22}
                    className="shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: "var(--accent-text)" }}
                  />
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="panel flex min-w-0 flex-col gap-5 p-6 sm:p-8"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="mb-2 block text-sm font-semibold">
                  Your name
                </label>
                <input
                  id="c-name"
                  className="field"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block text-sm font-semibold">
                  Your email
                </label>
                <input
                  id="c-email"
                  type="email"
                  className="field"
                  autoComplete="email"
                  placeholder="ada@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-2 block text-sm font-semibold">
                Message
              </label>
              <textarea
                id="c-msg"
                rows={6}
                className="field resize-none"
                placeholder="Tell me about the project or role."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={sending} className="btn btn-primary self-start disabled:opacity-60">
              {sending ? "Sending..." : "Send message"}
              <FiSend size={16} />
            </button>
          </motion.form>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--line)",
          },
        }}
      />
    </section>
  );
}
