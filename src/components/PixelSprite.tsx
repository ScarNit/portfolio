import { PALETTE } from "./sprites";

/** Renders a text sprite as crisp SVG, merging horizontal runs into one rect. */
export default function PixelSprite({ rows, className }: { rows: string[]; className?: string }) {
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      if (ch !== ".") {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} fill={PALETTE[ch]} />);
      }
      x = end;
    }
  });
  return (
    <svg
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {rects}
    </svg>
  );
}
