"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies `text` to the clipboard; shows a check for two seconds and announces it to screen readers. */
export function CopyButton({ text, label = "Copy command" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {return;}
    const timer = setTimeout(() => { setCopied(false); }, 2000);
    return () => { clearTimeout(timer); };
  }, [copied]);

  const copy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => { setCopied(true); })
      .catch((error: unknown) => { console.error("Failed to copy:", error); });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={copy}
      aria-label={label}
      title={label}
      className="size-8 shrink-0 cursor-pointer rounded-md border border-border text-primary shadow-none"
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </Button>
  );
}
