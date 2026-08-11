import ArtDefs from './ArtDefs';

/** A stylised roll of mints, drawn to match the cream-and-wine palette. */
export default function MentosRoll({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 260"
      role="img"
      aria-label="חפיסת מנטוס"
    >
      <ArtDefs />

      <ellipse cx="60" cy="248" rx="42" ry="8" fill="url(#groundShadow)" />

      {/* Mints peeking out of the torn top */}
      <g>
        <ellipse cx="60" cy="40" rx="33" ry="11" fill="url(#mintGrad)" />
        <ellipse cx="60" cy="36" rx="33" ry="11" fill="#FFFFFF" />
        <ellipse
          cx="60"
          cy="36"
          rx="33"
          ry="11"
          fill="none"
          stroke="rgba(90,110,90,0.28)"
          strokeWidth="1"
        />
        <ellipse cx="60" cy="34" rx="18" ry="5.5" fill="rgba(180,205,180,0.35)" />
      </g>

      {/* Wrapper */}
      <path
        d="M27 44 C27 40 93 40 93 44 L93 236 C93 242 27 242 27 236 Z"
        fill="url(#rollBody)"
      />
      {/* Torn edge */}
      <path
        d="M27 46 L36 40 L45 47 L54 39 L63 47 L72 40 L81 47 L90 40 L93 45"
        fill="none"
        stroke="rgba(150,120,70,0.5)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Label band */}
      <path d="M27 74 L93 74 L93 198 L27 198 Z" fill="url(#rollBand)" />
      <path
        d="M27 74 L93 74"
        stroke="rgba(255,220,212,0.3)"
        strokeWidth="1.6"
      />
      <path
        d="M27 198 L93 198"
        stroke="rgba(40,6,12,0.3)"
        strokeWidth="1.6"
      />

      {/* Wordmark, set vertically down the roll. textLength pins it inside
          the band whatever font actually resolves. */}
      <text
        x="60"
        y="136"
        textAnchor="middle"
        transform="rotate(-90 60 136)"
        fill="#FFF6EE"
        fontFamily="'Frank Ruhl Libre', Georgia, serif"
        fontSize="21"
        fontWeight="700"
        letterSpacing="2"
        textLength="104"
        lengthAdjust="spacingAndGlyphs"
        direction="ltr"
      >
        MENTOS
      </text>

      {/* Ribs so it reads as a stack of mints */}
      <g stroke="rgba(120,92,50,0.22)" strokeWidth="1.1" fill="none">
        <path d="M29 210 H91" />
        <path d="M29 221 H91" />
        <path d="M29 232 H91" />
      </g>

      {/* Specular highlight */}
      <path
        d="M38 46 C34 110 34 176 38 234"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
