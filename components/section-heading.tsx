type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  level?: 1 | 2;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = 2,
}: SectionHeadingProps) {
  const HeadingTag = level === 1 ? "h1" : "h2";

  return (
    <div
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "mx-0 text-left"
      }`}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
        {eyebrow}
      </p>
      <HeadingTag className="text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </HeadingTag>
      {description ? (
        <p className="mt-5 text-base leading-8 text-white/64 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
