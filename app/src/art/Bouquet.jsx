import Bloom from './Bloom';

/**
 * The bouquet: a dome of blooms on a cone of wrapping paper, drawn around a
 * base point at (0,0) that sits at the mouth of the gift box.
 *
 * Blooms and leaves each get their own wrapper group so the scroll timeline
 * can open them one at a time without disturbing their placement.
 */

const BLOOMS = [
  { x: 0, y: -250, s: 1, r: 0, kind: 'peony', tone: 0 },
  { x: -74, y: -224, s: 0.92, r: -12, kind: 'rose', tone: 1 },
  { x: 74, y: -222, s: 0.92, r: 11, kind: 'rose', tone: 1 },
  { x: -42, y: -300, s: 0.86, r: -18, kind: 'rose', tone: 0 },
  { x: 44, y: -298, s: 0.86, r: 16, kind: 'peony', tone: 2 },
  { x: 0, y: -330, s: 0.7, r: 4, kind: 'rose', tone: 3 },
  { x: -104, y: -282, s: 0.66, r: -28, kind: 'rose', tone: 2 },
  { x: 104, y: -280, s: 0.66, r: 26, kind: 'peony', tone: 0 },
  { x: -40, y: -192, s: 0.74, r: -8, kind: 'rose', tone: 2 },
  { x: 42, y: -190, s: 0.74, r: 7, kind: 'rose', tone: 3 },
  { x: -96, y: -176, s: 0.6, r: -34, kind: 'rose', tone: 0 },
  { x: 96, y: -174, s: 0.6, r: 32, kind: 'rose', tone: 1 },
];

const LEAVES = [
  { x: -84, y: -196, s: 0.92, r: -58 },
  { x: 84, y: -192, s: 0.92, r: 56 },
  { x: -116, y: -232, s: 0.78, r: -40 },
  { x: 116, y: -228, s: 0.78, r: 38 },
  { x: -20, y: -338, s: 0.58, r: -18 },
  { x: 26, y: -332, s: 0.58, r: 16 },
];

const LEAF_PATH = 'M0 0 C11 -17 13 -39 0 -58 C-13 -39 -11 -17 0 0 Z';

/** Stems fan out of the paper throat and up to each bloom. */
const THROAT_Y = -118;
const stemPath = (b) =>
  `M0 ${THROAT_Y} Q ${b.x * 0.34} ${b.y * 0.58} ${b.x * 0.9} ${b.y + 20}`;

export default function Bouquet() {
  return (
    <g className="bouquet-inner">
      {/* Paper, back sheet */}
      <g className="wrap">
        <path
          d="M0 0 L-86 -196 C-42 -214 42 -214 86 -196 Z"
          fill="url(#wrapGradBack)"
        />
      </g>

      {/* Stems */}
      <g className="stems" fill="none" strokeLinecap="round">
        {BLOOMS.map((b, i) => (
          <path
            key={`s${i}`}
            d={stemPath(b)}
            stroke="#3F5C36"
            strokeWidth={1.8 + b.s * 1.4}
          />
        ))}
      </g>

      {/* Foliage */}
      {LEAVES.map((l, i) => (
        <g key={`l${i}`} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <g className="sprig">
            <path d={LEAF_PATH} fill="url(#leafGrad)" />
            <path
              d="M0 -4 L0 -52"
              stroke="rgba(240,246,232,0.32)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      ))}

      {/* Paper, two front sheets folded into a cone */}
      <g className="wrap">
        <path
          d="M0 2 L-76 -188 C-46 -204 -10 -206 2 -192 Z"
          fill="url(#wrapGrad)"
        />
        {/* Opaque, or the stems behind it show through as a ghost */}
        <path d="M0 2 L76 -188 C46 -204 10 -206 -2 -192 Z" fill="url(#wrapGrad)" />
        <path
          d="M0 2 L76 -188 C46 -204 10 -206 -2 -192 Z"
          fill="rgba(120,92,58,0.07)"
        />
        {/* The fold where the two sheets meet */}
        <path
          d="M0 2 L0 -196"
          stroke="rgba(150,120,84,0.18)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M-76 -188 C-46 -204 -10 -206 2 -192"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M76 -188 C46 -204 10 -206 -2 -192"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.4"
          fill="none"
        />
      </g>

      {/* Blooms */}
      {BLOOMS.map((b, i) => (
        <g key={`b${i}`} transform={`translate(${b.x} ${b.y}) rotate(${b.r}) scale(${b.s})`}>
          <Bloom className="bloom" kind={b.kind} tone={b.tone} />
        </g>
      ))}

      {/* Ribbon tied around the neck of the cone, clear of the tip */}
      <g className="wrap">
        <path
          d="M-34 -98 C-11 -110 11 -110 34 -98 L29 -68 C10 -80 -10 -80 -29 -68 Z"
          fill="url(#ribbonGradSoft)"
        />
        <path
          d="M-8 -78 C-24 -60 -30 -42 -26 -28 C-17 -40 -10 -54 -5 -66 Z"
          fill="url(#ribbonGradSoft)"
        />
        <path
          d="M8 -78 C24 -60 30 -42 26 -28 C17 -40 10 -54 5 -66 Z"
          fill="url(#ribbonGradSoft)"
        />
      </g>
    </g>
  );
}
