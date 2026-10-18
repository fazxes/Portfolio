import { llmsTxt, markdownResponse } from "@/lib/agent-markdown";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(llmsTxt(), { type: "text/plain" });
}
