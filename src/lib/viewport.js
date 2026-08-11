/**
 * iOS reports env(safe-area-inset-*) only to CSS, so we mirror the values onto
 * custom properties that JS can read (the "no" button needs real numbers to
 * stay clear of the notch and the home indicator).
 */
export function readSafeAreaInsets() {
  const probe = document.getElementById('safe-probe');
  if (!probe) return { top: 0, bottom: 0, left: 0, right: 0 };

  const cs = getComputedStyle(probe);
  const px = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };

  return {
    top: px(cs.paddingTop),
    bottom: px(cs.paddingBottom),
    left: px(cs.paddingLeft),
    right: px(cs.paddingRight),
  };
}

/** Publishes the insets as CSS vars so the stylesheet can use plain numbers. */
export function syncSafeAreaVars() {
  const { top, bottom } = readSafeAreaInsets();
  const root = document.documentElement;
  root.style.setProperty('--safe-t', `${top}px`);
  root.style.setProperty('--safe-b', `${bottom}px`);
}

/**
 * The visual viewport is the honest one on mobile — it excludes the dynamic
 * browser chrome that `innerHeight` happily includes mid-scroll.
 */
export function viewportSize() {
  const vv = window.visualViewport;
  return {
    width: Math.round(vv?.width ?? window.innerWidth),
    height: Math.round(vv?.height ?? window.innerHeight),
  };
}
