/**
 * The gift box, split into layers so the bouquet can sit *inside* it:
 * shadow → back wall → [bouquet] → front panel → lid → ribbon.
 *
 * Geometry lives in the 400×760 stage view box. The box body spans
 * x 104…296, y 462…600, which the bouquet clip path mirrors.
 */

export function BoxShadow() {
  return (
    <ellipse
      className="box-shadow"
      cx="200"
      cy="606"
      rx="122"
      ry="18"
      fill="url(#groundShadow)"
    />
  );
}

export function BoxBack() {
  return (
    <g className="box-back">
      {/* Inner wall, seen once the lid is off */}
      <path d="M110 444 H290 V600 H110 Z" fill="url(#boxInner)" />
      <path
        d="M110 444 H290 V456 H110 Z"
        fill="rgba(0,0,0,0.28)"
      />
    </g>
  );
}

export function BoxFront() {
  return (
    <g className="box-front">
      <rect
        x="104"
        y="462"
        width="192"
        height="138"
        rx="5"
        fill="url(#boxFace)"
      />
      {/* Top lip highlight */}
      <path
        d="M104 464 H296"
        stroke="rgba(255,214,206,0.32)"
        strokeWidth="2"
        fill="none"
      />
      {/* Soft sheen down the left third */}
      <path
        d="M118 464 H150 V598 H118 Z"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="104"
        y="462"
        width="192"
        height="138"
        rx="5"
        fill="none"
        stroke="rgba(40,6,12,0.35)"
        strokeWidth="1"
      />
    </g>
  );
}

export function BoxLid() {
  return (
    <g className="box-lid">
      <rect
        x="94"
        y="424"
        width="212"
        height="42"
        rx="7"
        fill="url(#boxLid)"
      />
      <path
        d="M100 429 H300"
        stroke="rgba(255,220,212,0.34)"
        strokeWidth="2.2"
        fill="none"
      />
      <rect
        x="94"
        y="452"
        width="212"
        height="14"
        rx="4"
        fill="rgba(38,6,12,0.26)"
      />
    </g>
  );
}

export function BoxRibbon() {
  return (
    <g className="box-ribbon">
      <rect
        className="ribbon-h"
        x="104"
        y="512"
        width="192"
        height="27"
        fill="url(#ribbonGrad)"
      />
      <rect
        className="ribbon-v"
        x="186"
        y="424"
        width="28"
        height="176"
        fill="url(#ribbonGrad)"
      />

      <g className="bow" transform="translate(200 424)">
        {/* tails */}
        <path
          className="bow-tail"
          d="M-5 3 C-19 26 -32 37 -46 42 C-39 25 -27 12 -9 1 Z"
          fill="url(#ribbonGradSoft)"
        />
        <path
          className="bow-tail"
          d="M5 3 C19 26 32 37 46 42 C39 25 27 12 9 1 Z"
          fill="url(#ribbonGradSoft)"
        />
        {/* loops */}
        <path
          d="M-2 0 C-32 -32 -66 -24 -61 2 C-57 22 -22 20 -2 0 Z"
          fill="url(#ribbonGrad)"
          stroke="rgba(120,92,38,0.28)"
          strokeWidth="0.8"
        />
        <path
          d="M2 0 C32 -32 66 -24 61 2 C57 22 22 20 2 0 Z"
          fill="url(#ribbonGrad)"
          stroke="rgba(120,92,38,0.28)"
          strokeWidth="0.8"
        />
        {/* knot */}
        <ellipse rx="10.5" ry="8" fill="url(#ribbonGradSoft)" />
        <ellipse
          rx="10.5"
          ry="8"
          fill="none"
          stroke="rgba(120,92,38,0.3)"
          strokeWidth="0.8"
        />
      </g>
    </g>
  );
}
