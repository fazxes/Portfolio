const NODE = {
  fill: "var(--color-card)",
  stroke: "var(--color-border)",
  text: "var(--color-foreground)",
};

function Box({
  x,
  y,
  w,
  h,
  label,
  sublabel,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel?: string;
  accent?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={NODE.fill}
        stroke={accent ?? NODE.stroke}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text
        x={x + w / 2}
        y={sublabel ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
        fill={NODE.text}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontSize={10}
          fill="var(--color-muted-foreground)"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function Edge({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const mx = (x1 + x2) / 2;
  return (
    <path
      d={`M ${String(x1)} ${String(y1)} C ${String(mx)} ${String(y1)}, ${String(mx)} ${String(y2)}, ${String(x2)} ${String(y2)}`}
      fill="none"
      stroke="var(--color-border)"
      strokeWidth={1.25}
    />
  );
}

const WORKERS = [60, 130, 200];
const SUBWORKERS = [30, 75, 120, 165, 210, 255];

export function SubagentTreeDiagram() {
  return (
    <figure className="my-8 not-prose">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl border border-border p-4">
          <div className="text-2xl font-semibold tracking-tight tabular-nums">
            5h 45m
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            wall-clock time to an answer
          </div>
        </div>
        <div className="rounded-xl border border-border p-4">
          <div className="text-2xl font-semibold tracking-tight">
            1 plan, 0 code
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            what came back
          </div>
        </div>
        <div className="rounded-xl border border-border p-4">
          <div className="text-2xl font-semibold tracking-tight">
            &ldquo;Keep it simple&rdquo;
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            the instruction it was given
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 640 320"
        role="img"
        aria-label="Diagram of one agent session: a single task to fix a file picker fans out into a plan, then into workers, then into workers spawned by those workers, and ends five hours and forty-five minutes later with an over-engineered plan and no code."
        className="w-full h-auto rounded-xl border border-border bg-card/30 p-2"
      >
        <Box x={16} y={125} w={128} h={44} label="Task" sublabel="fix the file picker" accent="#3b82f6" />

        <Edge x1={144} y1={147} x2={196} y2={147} />
        <Box x={196} y={125} w={116} h={44} label="Plan drafted" sublabel="work split up" />

        {WORKERS.map((wy, i) => (
          <g key={wy}>
            <Edge x1={312} y1={147} x2={356} y2={wy + 16} />
            <Box x={356} y={wy} w={92} h={32} label={`Subagent ${String(i + 1)}`} />
          </g>
        ))}

        {SUBWORKERS.map((sy, i) => {
          const parentIndex = Math.floor(i / 2);
          const parentY = (WORKERS[parentIndex] ?? 130) + 16;
          return (
            <g key={sy}>
              <Edge x1={448} y1={parentY} x2={484} y2={sy + 12} />
              <Box x={484} y={sy} w={76} h={24} label={`Sub ${String(i + 1)}`} />
            </g>
          );
        })}

        {SUBWORKERS.map((sy) => (
          <Edge key={`out-${String(sy)}`} x1={560} y1={sy + 12} x2={596} y2={220} />
        ))}
        <Box
          x={572}
          y={198}
          w={52}
          h={44}
          label="Plan"
          sublabel="unusable"
          accent="#d97706"
        />

        <line
          x1={16}
          x2={624}
          y1={296}
          y2={296}
          stroke="var(--color-border)"
          strokeWidth={1}
        />
        <text x={16} y={288} fontSize={10.5} fill="var(--color-muted-foreground)">
          0:00
        </text>
        <text x={624} y={288} textAnchor="end" fontSize={10.5} fill="var(--color-muted-foreground)">
          5:45
        </text>
        <text x={320} y={288} textAnchor="middle" fontSize={10.5} fill="var(--color-muted-foreground)">
          elapsed time
        </text>
      </svg>
      <figcaption className="mt-2 text-xs text-muted-foreground">
        Reconstruction of one real session: GPT-5.6 on ultra effort, asked to fix
        an asset file picker in a Zig codebase, with explicit instructions not to
        over-engineer.
      </figcaption>
    </figure>
  );
}
