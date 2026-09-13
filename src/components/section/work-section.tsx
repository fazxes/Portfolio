/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Markdown from "react-markdown";
import { DATA } from "@/data/resume";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 rounded-full shadow outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 rounded-full shadow outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 overflow-hidden object-contain flex-none"
      onError={() => { setImageError(true); }}
    />
  );
}

export default function WorkSection() {
  return (
    <div className="grid w-full gap-8">
      {DATA.work.map((work) => (
        <article key={work.company} className="grid gap-3">
          <div className="flex items-center justify-between gap-x-3">
            <div className="flex min-w-0 flex-1 items-center gap-x-3">
              <LogoImage src={work.logoUrl} alt={work.company} />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="font-semibold leading-none">
                  {work.company}
                </div>
                <div className="font-sans text-sm text-muted-foreground">
                  {work.title}
                </div>
              </div>
            </div>
            <div className="flex-none text-right text-xs tabular-nums text-muted-foreground">
              {work.start} - {work.end}
            </div>
          </div>
          <div className="prose ml-11 max-w-full text-pretty font-sans text-xs leading-relaxed text-muted-foreground prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:underline sm:text-sm md:ml-13 dark:prose-invert">
            <Markdown>{work.description}</Markdown>
          </div>
        </article>
      ))}
    </div>
  );
}
