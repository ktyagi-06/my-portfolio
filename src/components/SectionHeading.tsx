export default function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight mb-2 dark:text-white">
      {title}
    </h2>
  );
}
