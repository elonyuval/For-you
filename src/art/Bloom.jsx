/**
 * A single flower head, built from rings of wide, overlapping petals.
 *
 * Petal bases all meet at (0,0) and the tips point outward, so a bloom can be
 * dropped anywhere and scaled from its own base. The rings are deliberately
 * dense — sparse petals read as a daisy, not a rose.
 */

const PETAL_ROSE =
  'M0 0 C-16 -6 -23 -20 -17 -31 C-12 -39 -4 -41 0 -41 C4 -41 12 -39 17 -31 C23 -20 16 -6 0 0 Z';

const PETAL_PEONY =
  'M0 0 C-19 -7 -26 -21 -21 -31 C-17 -39 -8 -35 0 -39 C8 -35 17 -39 21 -31 C26 -21 19 -7 0 0 Z';

const PETAL_EDGE = 'rgba(64,14,24,0.14)';

const RINGS = {
  rose: [
    { count: 7, scale: 1, spin: 0 },
    { count: 6, scale: 0.78, spin: 27 },
    { count: 5, scale: 0.55, spin: 52 },
    { count: 4, scale: 0.34, spin: 74 },
  ],
  peony: [
    { count: 9, scale: 1, spin: 0 },
    { count: 7, scale: 0.8, spin: 21 },
    { count: 5, scale: 0.56, spin: 44 },
    { count: 4, scale: 0.33, spin: 68 },
  ],
};

export default function Bloom({ kind = 'rose', tone = 0, className }) {
  const d = kind === 'peony' ? PETAL_PEONY : PETAL_ROSE;
  const fill = `url(#petal${tone})`;
  const rings = RINGS[kind];

  return (
    <g className={className}>
      {rings.map((ring, ri) =>
        Array.from({ length: ring.count }, (_, i) => (
          <path
            key={`${ri}-${i}`}
            d={d}
            fill={fill}
            stroke={PETAL_EDGE}
            strokeWidth="0.7"
            transform={`rotate(${ring.spin + (i * 360) / ring.count}) scale(${ring.scale})`}
          />
        ))
      )}

      {/* Curled heart of the flower */}
      <circle r="3.6" fill="url(#bloomCore)" opacity="0.85" />
    </g>
  );
}
