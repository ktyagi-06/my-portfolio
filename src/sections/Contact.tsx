"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (mail: string) => {
    return /\S+@\S+\.\S+/.test(mail);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // --- FRONTEND VERIFICATION ---
    if (name.trim().length < 2) {
      toast.error("Name is too short.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    const loading = toast.loading("Sending message...");

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    toast.dismiss(loading);

    if (data.success) {
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      toast.error("Failed: " + data.error);
    }
  };

  return (
    <section id="contact" className="mt-24 px-10 flex justify-center">
  <div
    className="
      w-full
      bg-white/5
      border border-white/10
      backdrop-blur-md
      rounded-xl
      p-10
      shadow-lg
      hover:shadow-blue-500/10
      transition
    "
  >

        <h2
          className="
          text-center text-3xl font-bold mb-6
          bg-gradient-to-r
          from-blue-500 to-purple-500
          bg-clip-text text-transparent
          dark:from-blue-300 dark:to-purple-300
          drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]
        "
        >
          Let's Develop and Build Something Together
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Your Name Here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
              w-full p-3 rounded-md text-black dark:text-white
              bg-white dark:bg-gray-900
              border border-gray-300 dark:border-gray-700
              focus:ring-2 focus:ring-blue-500 outline-none
            "
          />

          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full p-3 rounded-md text-black dark:text-white
              bg-white dark:bg-gray-900
              border border-gray-300 dark:border-gray-700
              focus:ring-2 focus:ring-blue-500 outline-none
            "
          />

          <textarea
            rows={6}
            placeholder="Send Your Message (It will be sent as a Mail directly to me from you, Thanks!)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="
              w-full p-3 rounded-md text-black dark:text-white
              bg-white dark:bg-gray-900
              border border-gray-300 dark:border-gray-700
              focus:ring-2 focus:ring-blue-500 outline-none resize-none
            "
          />

          <button
            type="submit"
            className="
              mt-3 px-6 py-2
              bg-blue-600 hover:bg-blue-700
              text-white font-medium
              rounded-lg transition
            "
          >
            Send Message
          </button>
        </form>
      </div>

      <Toaster position="top-right" />
    </section>
  );
}
