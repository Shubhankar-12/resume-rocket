"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

const inputClass =
  "w-full rounded-md border border-rr-border-muted bg-rr-bg px-2.5 py-1.5 text-sm text-rr-text placeholder:text-rr-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-[11px] font-medium text-rr-text-muted">{label}</span>
      )}
      <input
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-[11px] font-medium text-rr-text-muted">{label}</span>
      )}
      <textarea
        className={`${inputClass} resize-y`}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/** A comma/enter-to-add chip list (skills, languages, interests, technologies). */
export function ChipList({
  label,
  values,
  onChange,
  placeholder = "Type and press Enter",
}: {
  label?: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const parts = draft
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => !values.includes(s));
    if (parts.length) onChange([...values, ...parts]);
    setDraft("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add();
    } else if (e.key === "Backspace" && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  };

  return (
    <div>
      {label && (
        <span className="mb-1 block text-[11px] font-medium text-rr-text-muted">{label}</span>
      )}
      <div className="flex flex-wrap gap-1.5 rounded-md border border-rr-border-muted bg-rr-bg p-1.5">
        {values.map((v, i) => (
          <span
            key={`${v}-${i}`}
            className="inline-flex items-center gap-1 rounded bg-rr-accent-light px-2 py-0.5 text-xs font-medium text-rr-accent"
          >
            {v}
            <button
              type="button"
              aria-label={`Remove ${v}`}
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="text-rr-accent/70 hover:text-rr-accent"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          className="min-w-[120px] flex-1 bg-transparent px-1 text-sm text-rr-text placeholder:text-rr-text-muted focus-visible:outline-none"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={add}
        />
      </div>
    </div>
  );
}
