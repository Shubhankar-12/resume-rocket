import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      {eyebrow && <p className="text-eyebrow uppercase text-rr-accent">{eyebrow}</p>}
      <h2
        id={id}
        className={cn(
          "text-3xl font-bold tracking-[-0.02em] text-rr-text sm:text-4xl",
          eyebrow && "mt-3"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-rr-text-secondary sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
