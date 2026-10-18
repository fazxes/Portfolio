/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Link-preview card (1200x630) in the same style as the blog post images: avatar
 * top left, title and description at the bottom. Rendered at build time for
 * static routes, so it costs nothing per request.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "public/fonts", file));

export async function ogCard({ title, description, footer }: { title: string; description: string; footer?: string }) {
  const [cabinet, clash] = await Promise.all([font("CabinetGrotesk-Medium.ttf"), font("ClashDisplay-Semibold.ttf")]);
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", backgroundColor: "#ffffff", padding: "40px" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#fafafa",
            padding: "40px",
            border: "1px solid #e5e5e5",
            borderRadius: "12px",
            fontFamily: "Cabinet Grotesk",
          }}
        >
          {/* GitHub PNG: the image renderer can't read the site's WebP avatar */}
          <img
            src={DATA.avatarUrl}
            alt=""
            width={140}
            height={140}
            style={{ borderRadius: "24px", border: "4px solid #e5e5e5", objectFit: "cover" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Clash Display",
                fontSize: "56px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#000000",
                marginBottom: "16px",
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: "24px", lineHeight: 1.45, color: "#404040", maxWidth: "900px" }}>{description}</div>
            {footer && <div style={{ fontSize: "18px", color: "#666666", marginTop: "20px" }}>{footer}</div>}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Cabinet Grotesk", data: cabinet, weight: 400, style: "normal" },
        { name: "Clash Display", data: clash, weight: 600, style: "normal" },
      ],
    },
  );
}
