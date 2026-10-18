import { homeMarkdown, markdownResponse } from "@/lib/agent-markdown";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(homeMarkdown(), { canonical: "/" });
}
