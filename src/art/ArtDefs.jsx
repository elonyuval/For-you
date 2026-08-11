/**
 * Shared gradients and filters for every piece of artwork.
 *
 * Rendered inside each <svg> that needs them. The definitions are identical
 * everywhere, so duplicate ids across the two stages resolve harmlessly.
 */
export default function ArtDefs() {
  return (
    <defs>
      {/* --- petals: tip light, base deep --- */}
      <linearGradient id="petal0" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C4344B" />
        <stop offset="55%" stopColor="#9C1E33" />
        <stop offset="100%" stopColor="#6B1322" />
      </linearGradient>
      <linearGradient id="petal1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D9576A" />
        <stop offset="55%" stopColor="#B12639" />
        <stop offset="100%" stopColor="#7C1729" />
      </linearGradient>
      <linearGradient id="petal2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F3CFC9" />
        <stop offset="58%" stopColor="#DFA9A2" />
        <stop offset="100%" stopColor="#B87F79" />
      </linearGradient>
      <linearGradient id="petal3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFCF6" />
        <stop offset="60%" stopColor="#F3E4CE" />
        <stop offset="100%" stopColor="#DCC3A2" />
      </linearGradient>

      <radialGradient id="bloomCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#5A1020" />
        <stop offset="100%" stopColor="#3B0A15" />
      </radialGradient>

      {/* --- foliage --- */}
      <linearGradient id="leafGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#33502D" />
        <stop offset="100%" stopColor="#63834F" />
      </linearGradient>

      {/* --- wrapping paper --- */}
      <linearGradient id="wrapGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFBF3" />
        <stop offset="48%" stopColor="#F6EADA" />
        <stop offset="100%" stopColor="#E4D0B6" />
      </linearGradient>
      <linearGradient id="wrapGradBack" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F0E2CE" />
        <stop offset="100%" stopColor="#D9C2A4" />
      </linearGradient>

      {/* --- gift box --- */}
      <linearGradient id="boxFace" x1="0" y1="0" x2="1" y2="0.35">
        <stop offset="0%" stopColor="#8E2133" />
        <stop offset="42%" stopColor="#7C1B2C" />
        <stop offset="100%" stopColor="#54101D" />
      </linearGradient>
      <linearGradient id="boxLid" x1="0" y1="0" x2="1" y2="0.6">
        <stop offset="0%" stopColor="#A0273B" />
        <stop offset="45%" stopColor="#871E30" />
        <stop offset="100%" stopColor="#5E1220" />
      </linearGradient>
      <linearGradient id="boxInner" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#330B14" />
        <stop offset="100%" stopColor="#4C0F1B" />
      </linearGradient>
      <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#D8B871" />
        <stop offset="35%" stopColor="#F0DCA9" />
        <stop offset="62%" stopColor="#C9A65A" />
        <stop offset="100%" stopColor="#A8843F" />
      </linearGradient>
      <linearGradient id="ribbonGradSoft" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F2DFB0" />
        <stop offset="100%" stopColor="#C09B51" />
      </linearGradient>

      <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(88,16,30,0.30)" />
        <stop offset="65%" stopColor="rgba(88,16,30,0.12)" />
        <stop offset="100%" stopColor="rgba(88,16,30,0)" />
      </radialGradient>

      {/* --- mentos roll --- */}
      <linearGradient id="rollBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#C9A65A" />
        <stop offset="18%" stopColor="#F6E7C4" />
        <stop offset="52%" stopColor="#FFFBF2" />
        <stop offset="86%" stopColor="#E4CF9F" />
        <stop offset="100%" stopColor="#B99447" />
      </linearGradient>
      <linearGradient id="rollBand" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5E1220" />
        <stop offset="20%" stopColor="#8E2133" />
        <stop offset="55%" stopColor="#A52236" />
        <stop offset="100%" stopColor="#6B1322" />
      </linearGradient>
      <linearGradient id="mintGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E3EDE2" />
      </linearGradient>

      {/* Soft, cheap drop shadow — one blur, reused */}
      <filter id="softDrop" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow
          dx="0"
          dy="10"
          stdDeviation="10"
          floodColor="#58101E"
          floodOpacity="0.26"
        />
      </filter>

      {/* Bouquet may only be seen above the box, or inside it */}
      <clipPath id="boxReveal">
        <rect x="-40" y="-420" width="480" height="882" />
        <rect x="108" y="462" width="184" height="140" />
      </clipPath>
    </defs>
  );
}
