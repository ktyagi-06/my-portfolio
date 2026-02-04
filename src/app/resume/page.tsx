"use client";

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-6 p-10">
      <iframe 
        src="/resume.pdf"
        className="w-full h-[90vh] border rounded-lg"
      />

      <a
        href="/resume.pdf"
        download
        className="px-4 py-2 text-center rounded-md border 
                   border-gray-300 dark:border-gray-700
                   text-gray-800 dark:text-gray-200
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        Download Resume
      </a>
    </div>
  );
}
