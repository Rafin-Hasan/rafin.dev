"use client";

import { useState } from "react";
import { Check, Copy } from "./Icons";

export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={className ?? "flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-line-strong bg-raised text-text transition-colors hover:border-signal-line"}
    >
      {copied ? <Check className="text-signal" /> : <Copy />}
    </button>
  );
}
