import type { Root, Code, Nodes } from "mdast";

type ParentNode = Extract<Nodes, { children: Nodes[] }>;

function hasChildren(node: Nodes): node is ParentNode {
  return "children" in node && Array.isArray((node as { children?: unknown }).children);
}

function isCode(node: Nodes): node is Code {
  return node.type === "code";
}

export function remarkCodeMeta() {
  return (tree: Root): void => {
    const walk = (node: Nodes): void => {
      if (isCode(node)) {
        const meta = node.meta;
        if (meta) {
          const data = (node.data ??= {});
          const hProperties = ((data as { hProperties?: Record<string, string> }).hProperties ??= {});

          hProperties["data-meta"] = meta;

          const titleMatch = /title="([^"]+)"/.exec(meta);
          if (titleMatch?.[1]) {
            hProperties["data-title"] = titleMatch[1];
          }
        }
      }

      if (hasChildren(node)) {
        for (const child of node.children) {
          walk(child);
        }
      }
    };

    walk(tree);
  };
}
