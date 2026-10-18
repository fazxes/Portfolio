import type { Html, Nodes, Root, RootContent } from "mdast";

/**
 * Skills often wrap a rule in a prompt tag for the agent, e.g.
 *
 *   <HARD-GATE>
 *   Do NOT write code until ...
 *   </HARD-GATE>
 *
 * Markdown sees that as raw HTML, which the skill page prints as text. This turns
 * such a block into a callout labelled with the tag name ("Hard gate"). The
 * content becomes plain text, so nothing in it is ever run as HTML. Tags inside
 * code are untouched, because code is never an `html` node.
 */
const TAG_BLOCK = /^<([A-Za-z][\w-]*)>\s*([\s\S]*?)\s*<\/\1>$/;

/** "HARD-GATE" -> "Hard gate" */
function labelFor(tag: string): string {
  const words = tag.toLowerCase().replace(/[-_]+/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function toCallout(node: Html): RootContent | null {
  const match = TAG_BLOCK.exec(node.value.trim());
  if (!match?.[1] || !match[2]) {return null;}
  return {
    type: "blockquote",
    data: {
      hName: "aside",
      hProperties: { className: "not-prose my-6 rounded-xl border border-border bg-muted/40 px-4 py-3" },
    },
    children: [
      {
        type: "paragraph",
        data: { hProperties: { className: "mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground" } },
        children: [{ type: "text", value: labelFor(match[1]) }],
      },
      {
        type: "paragraph",
        data: { hProperties: { className: "text-sm leading-relaxed text-foreground/90" } },
        children: [{ type: "text", value: match[2].replace(/\s*\n\s*/g, " ") }],
      },
    ],
  };
}

export function remarkAgentTags() {
  return (tree: Root): void => {
    const walk = (node: Nodes): void => {
      if (!("children" in node)) {return;}
      node.children = node.children.map((child) => {
        if (child.type === "html") {return toCallout(child) ?? child;}
        walk(child);
        return child;
      }) as typeof node.children;
    };
    walk(tree);
  };
}
