import { createRoot } from 'react-dom/client';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import App from './App';
import { syncSafeAreaVars } from './lib/viewport';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

// A refresh should always start the story from the beginning. Setting
// scrollRestoration alone is not enough — browsers still restore the old
// offset after this script runs, so we insist once more after load.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const toTop = () => window.scrollTo(0, 0);
toTop();
window.addEventListener('load', () => {
  toTop();
  requestAnimationFrame(toTop);
});

syncSafeAreaVars();
window.addEventListener('orientationchange', syncSafeAreaVars);
window.addEventListener('resize', syncSafeAreaVars);

// Mobile browsers resize the viewport as their chrome slides away; only react
// to real width changes so the stage doesn't twitch mid-scroll on iOS.
ScrollTrigger.config({ ignoreMobileResize: true });

createRoot(document.getElementById('root')).render(<App />);
