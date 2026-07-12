"use client";
import { useState } from "react";

const X_LABELS = ["minimal", "low", "medium", "high", "extended"];

const SERIES = [
  {
    name: "Clean task",
    color: "#3b82f6",
    values: [96, 97, 95, 94, 93],
  },
  {
    name: "Same task with distractors",
    color: "#d97706",
    values: [95, 85, 68, 47, 33],
  },
];

const W = 640;
const H = 340;
const M = { top: 16, right: 0, bottom: 48, left: 0 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;

function x(i: number): number {
  return M.left + (i * PLOT_W) / (X_LABELS.length - 1);
}

function y(v: number): number {
  return M.top + ((100 - v) / 100) * PLOT_H;
}

export function EffortAccuracyChart() {
  const [hover, setHover] = useState<{ s: number; i: number } | null>(null);

  const hoverSeries = hover ? SERIES[hover.s] : undefined;
  const hoverValue = hover ? hoverSeries?.values[hover.i] : undefined;

  return (
    <figure className="my-8 not-prose">
      <div className="flex flex-wrap items-center gap-4 mb-2">
        {SERIES.map((s) => (
          <span
            key={s.name}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
              aria-hidden
            />
            {s.name}
          </span>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${String(W)} ${String(H)}`}
        role="img"
        aria-label="Line chart: on a clean task, accuracy stays roughly flat as reasoning budget grows. On the same task with distractors, accuracy falls from about 95 percent at minimal reasoning to about 33 percent at extended reasoning."
        className="w-full h-auto overflow-visible"
      >
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1={M.left}
              x2={W - M.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
            <text
              x={M.left}
              y={y(tick) - 5}
              textAnchor="start"
              fontSize={10.5}
              fill="var(--color-muted-foreground)"
            >
              {tick === 100 ? "100% accuracy" : `${String(tick)}%`}
            </text>
          </g>
        ))}
        {X_LABELS.map((label, i) => (
          <text
            key={label}
            x={x(i)}
            y={H - M.bottom + 20}
            textAnchor={
              i === 0 ? "start" : i === X_LABELS.length - 1 ? "end" : "middle"
            }
            fontSize={11}
            fill="var(--color-muted-foreground)"
          >
            {label}
          </text>
        ))}
        <text
          x={M.left + PLOT_W / 2}
          y={H - 6}
          textAnchor="middle"
          fontSize={11}
          fill="var(--color-muted-foreground)"
        >
          Reasoning budget
        </text>
        {SERIES.map((s, si) => (
          <g key={s.name}>
            <polyline
              points={s.values.map((v, i) => `${String(x(i))},${String(y(v))}`).join(" ")}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {s.values.map((v, i) => (
              <g key={`${s.name}-${String(i)}`}>
                <circle
                  cx={x(i)}
                  cy={y(v)}
                  r={4}
                  fill={s.color}
                  stroke="var(--color-background)"
                  strokeWidth={2}
                />
                <circle
                  cx={x(i)}
                  cy={y(v)}
                  r={14}
                  fill="transparent"
                  onMouseEnter={() => { setHover({ s: si, i }); }}
                  onMouseLeave={() => { setHover(null); }}
                />
              </g>
            ))}
          </g>
        ))}
        {hover && hoverSeries && hoverValue !== undefined && (
          <g
            transform={`translate(${String(Math.min(x(hover.i), W - 150))}, ${String(
              Math.max(y(hoverValue) - 44, 8)
            )})`}
            pointerEvents="none"
          >
            <rect
              width={140}
              height={34}
              rx={6}
              fill="var(--color-card)"
              stroke="var(--color-border)"
            />
            <text x={8} y={14} fontSize={10.5} fill="var(--color-muted-foreground)">
              {hoverSeries.name}
            </text>
            <text x={8} y={27} fontSize={11} fontWeight={600} fill="var(--color-foreground)">
              {hoverValue}% accuracy at {X_LABELS[hover.i]}
            </text>
          </g>
        )}
      </svg>
      <details className="mt-2">
        <summary className="text-xs text-muted-foreground cursor-pointer">
          View data
        </summary>
        <table className="mt-2 text-xs text-muted-foreground w-full text-left">
          <thead>
            <tr>
              <th className="font-medium pr-4 pb-1">Reasoning budget</th>
              {SERIES.map((s) => (
                <th key={s.name} className="font-medium pr-4 pb-1">
                  {s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {X_LABELS.map((label, i) => (
              <tr key={label}>
                <td className="pr-4 py-0.5">{label}</td>
                {SERIES.map((s) => (
                  <td key={s.name} className="pr-4 py-0.5">
                    {s.values[i]}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <figcaption className="mt-2 text-xs text-muted-foreground">
        Schematic of the pattern reported in the inverse-scaling and overthinking
        papers cited below. Values are illustrative of the reported curves, not a
        reproduction of a specific benchmark table.
      </figcaption>
    </figure>
  );
}
