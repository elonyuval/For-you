/* ==================================================================
   DATE RUN
   משחק ריצה קטן בוונילה JS. אין framework, אין שרת, אין build.
   ==================================================================

   ⬇⬇⬇ כל מה שכדאי לשנות נמצא ב-CONFIG הזה, ורק בו. ⬇⬇⬇ */

const CONFIG = {
  /* כמה מטבעות יש במסלול. המספר הזה הוא גם מחיר ההפתעה וגם התקציב
     המקסימלי בחנות. שינוי כאן מעדכן את המסלול, ה-HUD וכל הטקסטים. */
  coinsTotal: 100,

  /* המשחק עצמו — מהירות, אורך, פיזיקה של הקפיצה */
  run: {
    speed: 210, // יחידות לשנייה. יותר גדול = מהיר וקשה יותר
    durationSec: 27, // אורך המסלול בשניות (בערך)
    gravity: 2100, // כמה חזק מושכים אותה חזרה לקרקע
    jumpVelocity: 760, // עוצמת הקפיצה
    stumbleSec: 0.7, // כמה זמן היא מואטת אחרי פגיעה במכשול
    stumbleFactor: 0.5, // ומה המהירות באותו זמן (0.5 = חצי)
    hitPenalty: 5, // כמה מטבעות יורדים על פגיעה במכשול. 0 = בלי קנס
  },

  /* מי משחק. אין כאן תאריך ושעה בכוונה — הכרטיס בסוף הוא קופון פתוח */
  date: {
    player1: 'את',
    player2: 'אני',
  },

  /* החנות — מחירים, שמות, והשורות המצחיקות מתחת לכל פריט */
  shop: {
    items: [
      { id: 'movie', emoji: '🎬', name: 'סרט', price: 20, note: 'שעתיים שאת לא יכולה להגיד לי שאני חופר.' },
      { id: 'dessert', emoji: '🍰', name: 'רק קינוח', price: 25, note: 'ישר לחלק החשוב, מכבד.' },
      { id: 'burger', emoji: '🍔', name: 'המבורגר', price: 35, note: 'בלי להתבייש עם הצ׳יפס, כן?' },
      { id: 'sushi', emoji: '🍣', name: 'סושי', price: 40, note: 'בחירה של מקצוענים.' },
      { id: 'dairy', emoji: '🍝', name: 'חלבי', price: 50, note: 'פסטה, פיצה וכל הדברים הטובים.' },
      { id: 'standup', emoji: '🎤', name: 'בר וסטנדאפ', price: 60, note: 'מישהו אחר יצחיק אותך בשישי בלילה, ואני אשב ואקנא.' },
    ],
    /* נפתחת רק במאה מלאה, ולוקחת את כל התקציב */
    surprise: {
      id: 'surprise',
      emoji: '🎁',
      name: 'הפתעה',
      note: 'לא תדעי לאן הולכים עד שתגיעי. סומכת עליי?',
    },
    /* לחיצה — כן. קנייה — לעולם לא. */
    impossible: {
      id: 'alone',
      emoji: '🚶‍♀️',
      name: 'דייט בלעדיי',
      price: 1000000,
      priceLabel: '1,000,000',
    },
  },

  /* כל הטקסטים שעל המסך */
  texts: {
    start: {
      title1: 'DATE',
      title2: 'RUN',
      icons: '🪙 ❤️ 🪙',
      play: 'START',
      tagline: 'A very serious dating game.',
    },
    howto: {
      title: 'איך משחקים?',
      main: 'תאספי כמה שיותר מטבעות בדרך כדי שתוכלי להרכיב את הדייט שלך 🪙',
      tipLabel: 'אבל טיפ קטן…',
      tip: 'כדאי לך להשיג את כל ה־100. זה ישתלם 😉',
      hint: '📱 לחיצה על המסך = קפיצה',
      hintDesktop: '🖱️ במחשב: רווח או קליק',
      penalty: (n) => `ופגיעה במכשול? מורידה לך ${n} מטבעות 😬`,
      go: 'הבנתי, יאללה',
    },
    finish: {
      title: 'FINISH! 🏁',
      score: (got, total) => `אספת ${got}/${total} מטבעות 🪙`,
      perfectTitle: '🏆 PERFECT RUN',
      perfectSub: 'אמרתי לך שזה ישתלם… 😉',
      toShop: 'כניסה ל-DATE SHOP',
    },
    shop: {
      title: 'DATE SHOP',
      budget: (coins) => `התקציב שלך: ${coins} 🪙`,
      basketTitle: 'הדייט שלך ❤️',
      empty: 'עוד לא בחרת כלום…',
      totals: (total, left) => `סה״כ: ${total} 🪙 · נשארו: ${left} 🪙`,
      confirm: 'סגרתי דייט ❤️',
      ok: 'טוב נו',
      poorTitle: 'הלו הלו, מי נתן לך כרטיס אשראי?',
      poorSub: (missing) => `חסרים לך ${missing} מטבעות 🪙`,
      surpriseLocked: 'אמרתי לך לאסוף את כולם 😉',
      surpriseTaken: 'אמיצה… אהבתי. מפה אני מחליט 😌',
      surpriseBlocks: 'ההפתעה לוקחת את הכל. או היא, או כל השאר 😌',
      /* ההודעות של "דייט בלעדיי", לפי מספר הניסיונות */
      alone: ['אין לך מספיק מטבעות.', 'אמרתי שאין.', 'את באמת ממשיכה לנסות?', 'אני מתחיל להיעלב.'],
      aloneSub: 'וגם לא יהיה לך לעולם.',
    },
    ticket: {
      title: '🎟️ DATE TICKET',
      p1: 'PLAYER 1',
      p2: 'PLAYER 2',
      plan: 'תוכנית',
      coupon: '📸 תצלמי מסך',
      couponSub: 'וזה קופון פתוח — למתי שתרצי',
      closing: 'קבענו. בלי איחורים 😌',
    },
    /* ההומור במהלך הריצה. לא להגזים בכמות — יש cooldown של 2.6 שניות. */
    toasts: {
      start: 'שיהיה בהצלחה. אני מסתכל 👀',
      milestones: [
        { at: 10, text: 'יפה… יש תקציב למים.' },
        { at: 30, text: 'אוקיי, כבר אפשר להתחיל לדבר על אוכל.' },
        { at: 50, text: 'חצי דרך. אני כבר קצת מתרגש.' },
        { at: 70, text: 'רגע, את באמת הולכת על ה-100?' },
        { at: 90, text: 'עוד קצת. אל תתביישי עכשיו.' },
      ],
      missed: 'את יודעת שצריך לאסוף אותם, כן?',
      combo: 'חשוד. שיחקת בזה לפני?',
      hit: ['ככה את גם נוהגת?', 'זה היה מכשול, לא אתגר.'],
    },
  },

  sound: { enabled: true, volume: 0.3 },
};

/* ⬆⬆⬆ סוף אזור העריכה הנוח. מכאן זה הקוד עצמו. ⬆⬆⬆ */

(() => {
  'use strict';

  const T = CONFIG.texts;

  /* ================================================================
     עזרים קטנים
     ================================================================ */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* מצב המשחק כולו — מה שנאסף, מה שנבחר, ומה שנקבע */
  const state = {
    coins: 0,
    perfect: false,
    basket: [], // מזהי פריטים, לפי סדר הבחירה
    surprise: false,
    aloneTries: 0,
  };

  /* ================================================================
     סאונד — כמה צפצופים קצרים, בלי ספריות.
     ה-AudioContext נוצר רק בלחיצה על START, אחרת אייפון חוסם אותו.
     ================================================================ */
  const Sound = {
    ctx: null,
    master: null,
    on: true,

    unlock() {
      if (!CONFIG.sound.enabled) return;
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = CONFIG.sound.volume;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
    },

    tone(from, { to = from, dur = 0.12, type = 'square', vol = 0.4, delay = 0 } = {}) {
      if (!this.ctx || !this.on) return;
      const t0 = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(from, t0);
      if (to !== from) osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t0 + dur);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(t0);
      osc.stop(t0 + dur + 0.03);
    },

    coin() {
      this.tone(1046, { to: 1568, dur: 0.09, vol: 0.35 });
      this.tone(1568, { dur: 0.08, vol: 0.25, delay: 0.055 });
    },
    jump() {
      this.tone(320, { to: 720, dur: 0.13, vol: 0.3 });
    },
    bump() {
      this.tone(190, { to: 70, dur: 0.22, type: 'sawtooth', vol: 0.4 });
    },
    buy() {
      this.tone(660, { to: 990, dur: 0.1, vol: 0.35, type: 'triangle' });
    },
    drop() {
      this.tone(420, { to: 220, dur: 0.1, vol: 0.25, type: 'triangle' });
    },
    perfect() {
      [523, 659, 784, 1046].forEach((f, i) =>
        this.tone(f, { dur: 0.18, vol: 0.35, type: 'triangle', delay: i * 0.09 })
      );
    },
    finale() {
      [523, 659, 784, 1046, 1318].forEach((f, i) =>
        this.tone(f, { dur: 0.3, vol: 0.32, type: 'triangle', delay: i * 0.12 })
      );
    },
  };

  /* ================================================================
     קונפטי (וגם כמה לבבות) — קנבס אחד מעל הכול
     ================================================================ */
  const FX = (() => {
    const canvas = $('#fx');
    const ctx = canvas.getContext('2d');
    const COLORS = ['#ff2d78', '#ffc93c', '#5ce0c6', '#ff9ec4', '#ffffff'];
    let parts = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;

    function fit() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick(now) {
      const dt = Math.min(0.05, (now - last) / 1000) || 0;
      last = now;
      ctx.clearRect(0, 0, w, h);

      parts = parts.filter((p) => p.y < h + 40);
      parts.forEach((p) => {
        p.vy += 420 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.heart) drawHeart(ctx, 0, 0, p.r * 1.2);
        else ctx.fillRect(-p.r, -p.r * 0.6, p.r * 2, p.r * 1.2);
        ctx.restore();
      });

      if (parts.length) raf = requestAnimationFrame(tick);
      else raf = 0;
    }

    function burst(count = 90) {
      fit();
      const n = reduced ? Math.min(24, count) : count;
      for (let i = 0; i < n; i++) {
        parts.push({
          x: rand(0, w),
          y: rand(-h * 0.4, -10),
          vx: rand(-60, 60),
          vy: rand(40, 200),
          r: rand(4, 9),
          rot: rand(0, Math.PI * 2),
          vr: rand(-6, 6),
          color: COLORS[(Math.random() * COLORS.length) | 0],
          heart: Math.random() < 0.28,
        });
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }

    window.addEventListener('resize', fit);
    return { burst };
  })();

  /* לב קטן — משמש גם בקונפטי וגם על המטבעות */
  function drawHeart(ctx, x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.35);
    ctx.bezierCurveTo(x + s * 0.5, y - s * 0.35, x + s, y + s * 0.25, x, y + s);
    ctx.bezierCurveTo(x - s, y + s * 0.25, x - s * 0.5, y - s * 0.35, x, y + s * 0.35);
    ctx.fill();
  }

  /* ================================================================
     מסכים
     ================================================================ */
  let currentScreen = null;

  function show(id) {
    const next = $(id);
    if (!next || next === currentScreen) return;
    if (currentScreen) currentScreen.classList.remove('is-on');
    next.classList.add('is-on');
    if (next.classList.contains('screen--scroll')) next.scrollTop = 0;
    currentScreen = next;
  }

  /* שותל את הטקסטים מ-CONFIG לתוך ה-HTML (כל אלמנט עם data-text) */
  function applyTexts() {
    $$('[data-text]').forEach((el) => {
      const value = el.dataset.text
        .split('.')
        .reduce((obj, key) => (obj == null ? obj : obj[key]), T);
      if (typeof value === 'string') el.textContent = value;
    });
    $('#hud-total').textContent = CONFIG.coinsTotal;
    // הטקסטים שמכילים מספר מ-CONFIG נבנים כאן ולא דרך data-text
    $('#howto-penalty').textContent = T.howto.penalty(CONFIG.run.hitPenalty);
  }

  /* חלונית הודעה אחת שמשרתת את כל הודעות החנות */
  function modal(title, sub = '', onClose) {
    const box = $('#modal');
    $('#modal-title').textContent = title;
    $('#modal-sub').textContent = sub;
    $('#modal-ok').textContent = T.shop.ok;
    box.hidden = false;
    $('#modal-ok').onclick = () => {
      box.hidden = true;
      if (onClose) onClose();
    };
  }

  /* ================================================================
     המשחק
     ================================================================ */
  const Game = (() => {
    const canvas = $('#game');
    const ctx = canvas.getContext('2d');

    /* הכול מצויר ביחידות וירטואליות: הרוחב תמיד VW, והגובה נגזר מיחס
       המסך. ככה הקפיצה מרגישה זהה בכל טלפון. */
    const VW = 300;
    const PLAYER_X = 72;
    const PLAYER_W = 34;
    const PLAYER_H = 54;
    const ART = PLAYER_H / 46; // האיור צויר לגובה 46 — כאן הוא נמתח לגודל האמיתי
    const COIN_R = 13;
    const OBST_W = 24;
    const OBST_H = 52;

    let scale = 1;
    let VH = 600;
    let groundY = 400;
    let level = null;
    let g = null;
    let raf = 0;
    let last = 0;
    let onDone = null;

    const stars = Array.from({ length: 36 }, () => ({
      x: rand(0, VW),
      y: rand(0, 0.55),
      r: rand(0.6, 1.7),
    }));

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width || 320;
      const cssH = rect.height || 560;
      scale = cssW / VW;
      VH = cssH / scale;
      groundY = VH - clamp(VH * 0.2, 60, 130);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
    }

    /* --------------------------------------------------------------
       בניית המסלול.
       מטבעות הקרקע נאספים בריצה רגילה; מטבעות הקשת מונחים *בדיוק* על
       מסלול הקפיצה, סביב הנקודה הגבוהה שבה היא הכי שטוחה — ככה באמת
       אפשר לאסוף את כל המאה, אבל רק אם קופצים בזמן.
       -------------------------------------------------------------- */
    function buildLevel() {
      const { speed, durationSec, gravity, jumpVelocity } = CONFIG.run;
      const flight = (2 * jumpVelocity) / gravity; // משך קפיצה מלאה
      const arcSpan = speed * flight;
      const arcAt = [0.28, 0.39, 0.5, 0.61, 0.72]; // איפה על הקשת יושבים המטבעות
      // שורות ארוכות וצפופות עולות מעט מאוד זמן, בניגוד לרווחים ביניהן —
      // ככה נכנסות כל המאה למסלול קצר בלי שהוא ירגיש דחוס.
      const rowGap = 36;
      const rowMax = 10;

      const total = CONFIG.coinsTotal;
      const arcs = Math.max(1, Math.floor((total * 0.4) / arcAt.length));
      let rest = total - arcs * arcAt.length;

      const rows = [];
      while (rest > 0) {
        const n = Math.min(rowMax, rest);
        rows.push(n);
        rest -= n;
      }

      // שורה, קשת, שורה, קשת… עד שנגמרות שתי הרשימות
      const groups = [];
      let ri = 0;
      let ai = 0;
      while (ri < rows.length || ai < arcs) {
        if (ri < rows.length) groups.push({ type: 'row', n: rows[ri++] });
        if (ai < arcs) {
          groups.push({ type: 'arc' });
          ai++;
        }
      }

      const lenOf = (gr) => (gr.type === 'row' ? (gr.n - 1) * rowGap : arcSpan);
      const lead = 400; // ריצה שקטה בהתחלה
      const tail = 500; // ריצה שקטה לפני קו הסיום
      const groupsLen = groups.reduce((sum, gr) => sum + lenOf(gr), 0);
      const gapCount = Math.max(1, groups.length - 1);
      const gap = Math.max(120, (speed * durationSec - groupsLen - lead - tail) / gapCount);

      const coins = [];
      const obstacles = [];
      let x = lead;

      groups.forEach((gr, i) => {
        if (gr.type === 'row') {
          for (let k = 0; k < gr.n; k++) {
            coins.push(coin(x + k * rowGap, PLAYER_H / 2 + 2));
          }
        } else {
          arcAt.forEach((f) => {
            const t = f * flight;
            const height = jumpVelocity * t - 0.5 * gravity * t * t;
            coins.push(coin(x + speed * t, PLAYER_H / 2 + height));
          });
          // המכשול יושב בשיא הקפיצה — מי שקפצה בזמן, גם עברה וגם אספה
          obstacles.push({ x: x + (speed * flight) / 2, w: OBST_W, h: OBST_H });
        }
        x += lenOf(gr);
        if (i < groups.length - 1) x += gap;
      });

      return { coins, obstacles, length: x + tail };
    }

    const coin = (x, dy) => ({ x, dy, taken: false, seen: false, spin: rand(0, Math.PI * 2) });

    /* --------------------------------------------------------------
       טוסטים — הודעה אחת בכל פעם, עם cooldown, כדי שלא יהיה מעצבן
       -------------------------------------------------------------- */
    const toastEl = $('#toast');
    let toastUntil = 0;
    let toastTimer = 0;

    function toast(text, force = false) {
      const now = performance.now();
      if (!force && now < toastUntil) return;
      toastUntil = now + 2600;
      toastEl.textContent = text;
      toastEl.classList.add('is-on');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 1900);
    }

    /* --------------------------------------------------------------
       לולאת המשחק
       -------------------------------------------------------------- */
    function start(done) {
      onDone = done;
      resize();
      level = buildLevel();
      g = {
        dist: 0,
        y: 0, // גובה כפות הרגליים מעל הקרקע
        vy: 0,
        onGround: true,
        jumpBuffer: 0,
        collected: 0,
        missStreak: 0,
        comboStreak: 0,
        stumble: 0,
        invuln: 0,
        shake: 0,
        hitIndex: 0,
        milestone: 0,
        finished: false,
      };
      updateHud();
      toastEl.classList.remove('is-on');
      toastUntil = 0;
      setTimeout(() => toast(T.toasts.start, true), 900);

      last = performance.now();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function jump() {
      if (!g || g.finished) return;
      if (g.onGround) {
        g.vy = CONFIG.run.jumpVelocity;
        g.onGround = false;
        Sound.jump();
      } else {
        g.jumpBuffer = 0.12; // לחצה קצת מוקדם? נזכור לה את זה לרגע
      }
    }

    function frame(now) {
      const dt = Math.min(0.033, (now - last) / 1000) || 0;
      last = now;
      update(dt);
      draw();
      if (!g.finished) raf = requestAnimationFrame(frame);
    }

    function update(dt) {
      const { speed, gravity, stumbleFactor } = CONFIG.run;

      g.stumble = Math.max(0, g.stumble - dt);
      g.invuln = Math.max(0, g.invuln - dt);
      g.shake = Math.max(0, g.shake - dt);

      g.dist += speed * (g.stumble > 0 ? stumbleFactor : 1) * dt;

      // קפיצה ונחיתה
      g.vy -= gravity * dt;
      g.y += g.vy * dt;
      if (g.y <= 0) {
        g.y = 0;
        g.vy = 0;
        if (!g.onGround) {
          g.onGround = true;
          if (g.jumpBuffer > 0) {
            g.jumpBuffer = 0;
            jump();
          }
        }
      }
      g.jumpBuffer = Math.max(0, g.jumpBuffer - dt);

      const centerY = g.y + PLAYER_H / 2;

      // מטבעות
      for (const c of level.coins) {
        if (c.taken) continue;
        c.spin += dt * 5;
        const dx = Math.abs(c.x - g.dist);
        if (dx < 31 && Math.abs(c.dy - centerY) < 36) {
          c.taken = true;
          c.seen = true;
          g.collected++;
          g.comboStreak++;
          g.missStreak = 0;
          Sound.coin();
          updateHud();
          checkMilestones();
        } else if (!c.seen && c.x < g.dist - 30) {
          c.seen = true;
          g.missStreak++;
          g.comboStreak = 0;
          if (g.missStreak >= 6) {
            g.missStreak = 0;
            toast(T.toasts.missed);
          }
        }
      }

      // מכשולים — בלי Game Over, רק מעידה קצרה
      if (g.invuln <= 0) {
        for (const o of level.obstacles) {
          if (Math.abs(o.x - g.dist) < o.w / 2 + PLAYER_W / 2 - 4 && g.y < o.h - 4) {
            g.stumble = CONFIG.run.stumbleSec;
            g.invuln = 1;
            g.shake = 0.35;
            g.comboStreak = 0;
            // הקנס: פסילה מורידה מטבעות, אבל אף פעם לא מתחת לאפס
            const lost = Math.min(g.collected, CONFIG.run.hitPenalty);
            if (lost > 0) {
              g.collected -= lost;
              updateHud();
              showPenalty(lost);
            }
            Sound.bump();
            toast(T.toasts.hit[g.hitIndex++ % T.toasts.hit.length], true);
            break;
          }
        }
      }

      if (g.dist >= level.length) {
        g.finished = true;
        stop();
        toastEl.classList.remove('is-on');
        if (onDone) onDone(g.collected);
      }
    }

    function checkMilestones() {
      const list = T.toasts.milestones;
      while (g.milestone < list.length && g.collected >= list[g.milestone].at) {
        toast(list[g.milestone].text);
        g.milestone++;
        return;
      }
      if (g.comboStreak >= 18) {
        g.comboStreak = 0;
        toast(T.toasts.combo);
      }
    }

    /* "5-" קטן שעולה מתחת למונה, כדי שהקנס יורגש ולא רק ייספר */
    function showPenalty(n) {
      const chip = document.createElement('span');
      chip.className = 'hud__delta';
      chip.textContent = `-${n}`;
      $('.hud__coins').appendChild(chip);
      setTimeout(() => chip.remove(), 900);
    }

    function updateHud() {
      $('#hud-count').textContent = g.collected;
      $('#hud-progress').style.width = `${clamp((g.dist / level.length) * 100, 0, 100)}%`;
    }

    /* --------------------------------------------------------------
       ציור
       -------------------------------------------------------------- */
    function draw() {
      ctx.save();
      if (g.shake > 0) {
        ctx.translate(rand(-2, 2) * g.shake * 3, rand(-2, 2) * g.shake * 3);
      }
      drawSky();
      drawSkyline();
      drawGround();
      drawFinish();
      drawObstacles();
      drawCoins();
      drawPlayer();
      ctx.restore();
      $('#hud-progress').style.width = `${clamp((g.dist / level.length) * 100, 0, 100)}%`;
    }

    function drawSky() {
      const sky = ctx.createLinearGradient(0, 0, 0, groundY);
      sky.addColorStop(0, '#150c26');
      sky.addColorStop(0.55, '#3d1246');
      sky.addColorStop(1, '#8d2f5c');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, VW, groundY);

      // ירח
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffe9c9';
      ctx.beginPath();
      ctx.arc(VW * 0.78, groundY * 0.22, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.arc(VW * 0.78, groundY * 0.22, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // כוכבים, עם פרלקסה עדינה
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      stars.forEach((s) => {
        let x = (s.x - g.dist * 0.08) % VW;
        if (x < 0) x += VW;
        ctx.beginPath();
        ctx.arc(x, s.y * groundY, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawSkyline() {
      const period = 58;
      const off = (g.dist * 0.35) % period;
      const base = groundY + 2;
      ctx.fillStyle = '#2a1038';
      for (let i = -1; i < VW / period + 2; i++) {
        const idx = Math.floor((g.dist * 0.35) / period) + i;
        const noise = Math.abs(Math.sin(idx * 12.9898) * 43758.5453) % 1;
        const h = 40 + noise * 70;
        const w = period - 12;
        const x = i * period - off;
        ctx.fillRect(x, base - h, w, h);
        // חלונות דלוקים
        ctx.fillStyle = 'rgba(255,201,60,0.28)';
        for (let r = 0; r < Math.floor(h / 22); r++) {
          for (let c = 0; c < 2; c++) {
            if ((idx + r + c) % 3 === 0) continue;
            ctx.fillRect(x + 8 + c * 16, base - h + 12 + r * 22, 7, 9);
          }
        }
        ctx.fillStyle = '#2a1038';
      }
    }

    function drawGround() {
      ctx.fillStyle = '#1c0a2c';
      ctx.fillRect(0, groundY, VW, VH - groundY);
      ctx.fillStyle = '#ff2d78';
      ctx.fillRect(0, groundY, VW, 3);
      ctx.fillStyle = 'rgba(255,158,196,0.35)';
      const step = 40;
      const off = g.dist % step;
      for (let x = -off; x < VW + step; x += step) {
        ctx.fillRect(x, groundY + 14, 16, 3);
      }
    }

    function drawCoins() {
      for (const c of level.coins) {
        if (c.taken) continue;
        const sx = c.x - g.dist + PLAYER_X;
        if (sx < -30 || sx > VW + 30) continue;
        const y = groundY - c.dy;
        const rx = Math.max(1.5, COIN_R * Math.abs(Math.cos(c.spin)));

        ctx.save();
        ctx.translate(sx, y);
        const grd = ctx.createLinearGradient(0, -COIN_R, 0, COIN_R);
        grd.addColorStop(0, '#ffe9a8');
        grd.addColorStop(0.5, '#ffc93c');
        grd.addColorStop(1, '#c98a10');
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, COIN_R, 0, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(120,70,0,0.45)';
        ctx.stroke();
        if (rx > 6) {
          ctx.fillStyle = 'rgba(190,110,20,0.55)';
          drawHeart(ctx, 0, -4, rx * 0.45);
        }
        ctx.restore();
      }
    }

    function drawObstacles() {
      for (const o of level.obstacles) {
        const sx = o.x - g.dist + PLAYER_X;
        if (sx < -40 || sx > VW + 40) continue;
        const base = groundY;
        ctx.save();
        ctx.translate(sx, base);
        // עציץ קטן וחמוד. גם מכשול, גם קישוט.
        ctx.fillStyle = '#1f7a5a';
        ctx.beginPath();
        ctx.ellipse(-5, -o.h + 12, 7, 12, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(6, -o.h + 16, 6, 10, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff9ec4';
        ctx.beginPath();
        ctx.arc(0, -o.h + 6, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#c96a3f';
        ctx.beginPath();
        ctx.moveTo(-o.w / 2, -22);
        ctx.lineTo(o.w / 2, -22);
        ctx.lineTo(o.w / 2 - 4, 0);
        ctx.lineTo(-o.w / 2 + 4, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#e08658';
        ctx.fillRect(-o.w / 2 - 2, -25, o.w + 4, 5);
        ctx.restore();
      }
    }

    function drawFinish() {
      const sx = level.length - g.dist + PLAYER_X;
      if (sx < -60 || sx > VW + 60) return;
      ctx.save();
      ctx.translate(sx, groundY);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillRect(-2, -150, 4, 150);
      const cell = 9;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
          ctx.fillStyle = (r + c) % 2 ? '#ffffff' : '#2a1038';
          ctx.fillRect(2 + c * cell, -150 + r * cell, cell, cell);
        }
      }
      ctx.restore();
    }

    function drawPlayer() {
      const feetY = groundY - g.y;
      const phase = g.dist / 13;
      const air = !g.onGround;

      ctx.save();
      ctx.translate(PLAYER_X, feetY);
      ctx.scale(ART, ART);
      if (g.invuln > 0) ctx.globalAlpha = 0.55 + 0.45 * Math.sin(g.invuln * 40);
      if (g.stumble > 0) ctx.rotate(-0.12);

      const bob = air ? 0 : Math.sin(phase * 2) * 1.2;
      ctx.translate(0, bob);

      // רגליים
      ctx.strokeStyle = '#f2c3a3';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      const swing = air ? 0.7 : Math.sin(phase);
      [1, -1].forEach((dir) => {
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(dir * swing * 9, -1);
        ctx.stroke();
      });

      // שמלה
      ctx.fillStyle = '#ff2d78';
      ctx.beginPath();
      ctx.moveTo(-4, -34);
      ctx.lineTo(6, -34);
      ctx.lineTo(12, -14);
      ctx.lineTo(-11, -14);
      ctx.closePath();
      ctx.fill();

      // יד
      ctx.strokeStyle = '#f2c3a3';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(1, -31);
      ctx.lineTo(8 - swing * 5, air ? -38 : -24);
      ctx.stroke();

      // ראש
      ctx.fillStyle = '#ffd8c2';
      ctx.beginPath();
      ctx.arc(1, -40, 9, 0, Math.PI * 2);
      ctx.fill();

      // שיער וקוקו
      ctx.fillStyle = '#3d2033';
      ctx.beginPath();
      ctx.arc(1, -42, 9, Math.PI * 0.95, Math.PI * 2.15);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-9, -40 + (air ? -3 : Math.sin(phase * 2) * 2), 6, 4, 0.6, 0, Math.PI * 2);
      ctx.fill();

      // פנים
      ctx.fillStyle = '#3d2033';
      ctx.beginPath();
      ctx.arc(6, -40, 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#c96a8a';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(5, -37, 3, 0.1, Math.PI * 0.8);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,120,160,0.35)';
      ctx.beginPath();
      ctx.arc(9, -38, 2.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    window.addEventListener('resize', () => {
      if (g && !g.finished) resize();
    });
    window.addEventListener('orientationchange', () => setTimeout(resize, 300));

    return { start, stop, jump, resize };
  })();

  /* ================================================================
     DATE SHOP
     ================================================================ */
  const Shop = (() => {
    const itemsEl = $('#shop-items');
    const specialsEl = $('#shop-specials');
    const surprise = { ...CONFIG.shop.surprise, price: CONFIG.coinsTotal };
    const impossible = CONFIG.shop.impossible;
    const byId = new Map();

    const allItems = [...CONFIG.shop.items, surprise];
    allItems.forEach((it) => byId.set(it.id, it));

    const spent = () => state.basket.reduce((sum, id) => sum + byId.get(id).price, 0);
    const left = () => state.coins - spent();

    function makeItem(item, extraClass = '') {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = `item ${extraClass}`.trim();
      btn.type = 'button';
      btn.innerHTML = `
        <span class="item__emoji"></span>
        <span class="item__body">
          <span class="item__name"></span>
          <span class="item__note"></span>
        </span>
        <span class="item__price"></span>`;
      btn.querySelector('.item__emoji').textContent = item.emoji;
      btn.querySelector('.item__name').textContent = item.name;
      btn.querySelector('.item__note').textContent = item.note || '';
      btn.querySelector('.item__price').textContent = `${item.priceLabel || item.price} 🪙`;
      li.appendChild(btn);
      return { li, btn };
    }

    function build() {
      itemsEl.innerHTML = '';
      specialsEl.innerHTML = '';

      CONFIG.shop.items.forEach((item) => {
        const { li, btn } = makeItem(item);
        btn.dataset.id = item.id;
        btn.addEventListener('click', () => pick(item));
        itemsEl.appendChild(li);
      });

      const s = makeItem(surprise, 'item--surprise');
      s.btn.dataset.id = surprise.id;
      s.btn.addEventListener('click', pickSurprise);
      specialsEl.appendChild(s.li);

      const imp = makeItem(impossible, 'item--impossible');
      imp.btn.addEventListener('click', () => tryAlone(imp.btn));
      specialsEl.appendChild(imp.li);
    }

    /* פריט רגיל: בחירה, ביטול בחירה, ואם אין מספיק — ההודעה */
    function pick(item) {
      if (state.surprise) {
        modal(T.shop.surpriseBlocks);
        return;
      }
      const at = state.basket.indexOf(item.id);
      if (at >= 0) {
        state.basket.splice(at, 1);
        Sound.drop();
        render();
        return;
      }
      const missing = item.price - left();
      if (missing > 0) {
        modal(T.shop.poorTitle, T.shop.poorSub(missing));
        return;
      }
      state.basket.push(item.id);
      Sound.buy();
      render();
    }

    /* ההפתעה: נפתחת רק במאה מלאה, ולוקחת את כל התקציב לעצמה */
    function pickSurprise() {
      if (state.surprise) {
        state.surprise = false;
        state.basket = [];
        Sound.drop();
        render();
        return;
      }
      if (state.coins < surprise.price) {
        modal(T.shop.surpriseLocked);
        return;
      }
      state.surprise = true;
      state.basket = [surprise.id];
      Sound.perfect();
      FX.burst(50);
      render();
      modal(T.shop.surpriseTaken);
    }

    /* "דייט בלעדיי" — לחיץ תמיד, נרכש לעולם לא. */
    function tryAlone(btn) {
      const lines = T.shop.alone;
      const line = lines[Math.min(state.aloneTries, lines.length - 1)];
      const sub = state.aloneTries === 0 ? T.shop.aloneSub : '';
      state.aloneTries++;
      Sound.drop();
      modal(line, sub, () => {
        // מהניסיון השני הכפתור מתחיל לזוז קצת. עדיין אפשר לתפוס אותו.
        if (state.aloneTries >= 2 && !reduced) {
          btn.style.transform = `translate(${rand(-26, 26)}px, ${rand(-10, 10)}px) rotate(${rand(-4, 4)}deg)`;
        }
      });
    }

    function render() {
      $('#budget').textContent = T.shop.budget(state.coins);

      const remaining = left();
      $$('.item').forEach((btn) => {
        const id = btn.dataset.id;
        if (!id) return;
        const item = byId.get(id);
        const picked = state.basket.includes(id);
        btn.classList.toggle('is-picked', picked);
        btn.classList.toggle('is-poor', !picked && item.price > remaining);
      });

      const sBtn = specialsEl.querySelector('.item--surprise');
      const unlocked = state.coins >= surprise.price;
      sBtn.classList.toggle('is-unlocked', unlocked);
      sBtn.classList.toggle('is-locked', !unlocked);

      // הסל
      const list = $('#basket-list');
      list.innerHTML = '';
      if (!state.basket.length) {
        const li = document.createElement('li');
        li.className = 'basket__empty';
        li.textContent = T.shop.empty;
        list.appendChild(li);
      } else {
        state.basket.forEach((id) => {
          const item = byId.get(id);
          const li = document.createElement('li');
          const label = document.createElement('span');
          label.textContent = `${item.emoji} ${item.name} — ${item.price} 🪙`;
          const remove = document.createElement('button');
          remove.className = 'basket__remove';
          remove.type = 'button';
          remove.textContent = '✕';
          remove.setAttribute('aria-label', `הסרה של ${item.name}`);
          remove.addEventListener('click', () =>
            id === surprise.id ? pickSurprise() : pick(item)
          );
          li.append(label, remove);
          list.appendChild(li);
        });
      }

      $('#basket-totals').textContent = T.shop.totals(spent(), left());
      $('#btn-confirm').disabled = state.basket.length === 0;
    }

    function open() {
      build();
      render();
      show('#screen-shop');
    }

    const items = () => state.basket.map((id) => byId.get(id));

    return { open, items };
  })();

  /* ================================================================
     הכרטיס
     ================================================================ */
  function openTicket() {
    const rows = $('#ticket-rows');
    rows.innerHTML = '';
    const data = [
      [T.ticket.p1, CONFIG.date.player1],
      [T.ticket.p2, CONFIG.date.player2],
    ];
    data.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'ticket__row';
      const b = document.createElement('b');
      b.textContent = label;
      const span = document.createElement('span');
      span.innerHTML = `<bdi>${value}</bdi>`;
      row.append(b, span);
      rows.appendChild(row);
    });

    const plan = $('#ticket-plan');
    plan.innerHTML = '';
    Shop.items().forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.emoji} ${item.name}`;
      plan.appendChild(li);
    });

    show('#screen-ticket');
    Sound.finale();
    FX.burst(110);
    setTimeout(() => FX.burst(70), 700);
  }

  /* ================================================================
     הזרימה: פתיחה → הוראות → משחק → סיום → חנות → כרטיס
     ================================================================ */
  function finishRun(collected) {
    state.coins = collected;
    state.perfect = collected >= CONFIG.coinsTotal;
    $('#finish-score').innerHTML = `<bdi>${T.finish.score(collected, CONFIG.coinsTotal)}</bdi>`;
    $('#perfect-block').hidden = !state.perfect;
    show('#screen-finish');
    if (state.perfect) {
      Sound.perfect();
      FX.burst(140);
      setTimeout(() => FX.burst(90), 800);
    }
  }

  function boot() {
    applyTexts();
    show('#screen-start');

    $('#btn-start').addEventListener('click', () => {
      // מכאן ואילך יש סאונד — האייפון מרשה רק אחרי מגע של המשתמשת
      Sound.unlock();
      $('#btn-mute').hidden = false;
      show('#screen-howto');
    });

    $('#btn-go').addEventListener('click', () => {
      show('#screen-game');
      // מחכים לסוף המעבר כדי שהקנבס יימדד במידות הסופיות שלו
      setTimeout(() => Game.start(finishRun), 380);
    });

    $('#btn-shop').addEventListener('click', () => Shop.open());
    $('#btn-confirm').addEventListener('click', () => {
      Sound.buy();
      openTicket();
    });

    $('#btn-mute').addEventListener('click', () => {
      Sound.on = !Sound.on;
      $('#btn-mute').textContent = Sound.on ? '🔊' : '🔇';
    });

    // קפיצה: מגע בכל מקום במסך המשחק, או רווח/קליק במחשב
    $('#screen-game').addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      e.preventDefault();
      Game.jump();
    });
    window.addEventListener('keydown', (e) => {
      if (e.code !== 'Space' && e.code !== 'ArrowUp') return;
      if (!currentScreen || currentScreen.id !== 'screen-game') return;
      e.preventDefault();
      Game.jump();
    });
  }

  boot();
})();
