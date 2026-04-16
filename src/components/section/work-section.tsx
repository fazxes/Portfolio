/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Markdown from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.work.map((work) => (
        <AccordionItem
          key={work.company}
          value={work.company}
          className="w-full border-b-0 grid gap-2"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex items-center gap-x-3 justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <LogoImage src={work.logoUrl} alt={work.company} />
                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-none flex items-center gap-2">
                    {work.company}
                    <ChevronRight
                      className={cn(
                        "size-3.5 shrink-0 text-muted-foreground stroke-2",
                        "transition-all duration-300 ease-out",
                        "opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100",
                        "group-data-[state=open]:rotate-90"
                      )}
                      aria-hidden
                    />
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {work.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                <span>
                  {work.start} - {work.end}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:underline">
              <Markdown>{work.description}</Markdown>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

