# for-you

הזמנה אינטראקטיבית לדייט — חוויית גלילה אחת רציפה, בעברית, Mobile First.

## מה יש כאן

גלילה אחת מתחילתה ועד סופה: קופסת מתנה נפתחת → זר פרחים עולה ופורח → כרטיס
ברכה נשלף מתוך הזר → ההזמנה → בחירת שעה → רשימת הדברים לדייט → מנטוס.

האנימציה של החלק הראשון היא **scrubbed**: היא לא רצה לבד אלא נשלטת ישירות
בתנועת האצבע, כך שהתחושה היא שהמשתמשת עצמה פותחת את המתנה.

## הרצה מקומית

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # פלט ל-dist/
npm run preview  # תצוגה מקדימה של הבילד
```

## פריסה

דחיפה ל-`main` מפעילה את `.github/workflows/deploy.yml`, שבונה ומעלה ל-GitHub
Pages. ה-workflow מדליק את Pages בעצמו בהרצה הראשונה (`enablement: true`),
אז אין מה להגדיר ידנית. הכתובת: `https://<user>.github.io/for-you/`.

`base` ב-`vite.config.js` הוא `'./'` — הבילד עובד גם מתת-נתיב של Pages וגם
מכל אירוח אחר.

## מבנה

```
src/
  App.jsx              שלד: מערכה 1, מערכה 2, שכבת החגיגה
  state/store.jsx      state מרכזי — שלב, השעה שנבחרה, celebration
  scenes/
    GiftStage.jsx      מערכה 1: ציר הזמן ה-scrubbed של פתיחת המתנה
    InviteCard.jsx     כרטיס הברכה וכל השלבים שעליו
    NoButton.jsx       כפתור "לא" הבורח
    TimePicker.jsx     בחירת שעה
    ChecklistStage.jsx מערכה 2: הרשימה, ההפוגה, והמנטוס
    FinalScene.jsx     כרטיס הסיכום וסצנת הסיום
  art/                 כל האיורים — SVG בלבד, בלי תמונות
  fx/Petals.jsx        עלי ורדים על canvas
  lib/viewport.js      safe-area ו-visual viewport
```

## החלטות שכדאי להכיר לפני שנוגעים

**הצמדה עם `position: sticky`, לא עם pin של ScrollTrigger.** Sticky חלק יותר
ב-Safari iOS. ScrollTrigger רק מזיז את ציר הזמן.

**אסור `transform`, `filter` או `perspective` על `.stage`, `.scene` או
`.card-layer`.** כל אחד מהם הופך את האלמנט ל-containing block, ואז כפתור "לא"
ו-canvas עלי הוורדים — ששניהם `position: fixed` — נשברים. מאותה סיבה כפתור
"לא" עובר ל-portal על `<body>` ברגע שהוא מתחיל לברוח, והחגיגה מרונדרת בשורש.

**מערכה 2 לא קיימת ב-DOM עד שנבחרה שעה.** ככה הדף פשוט נגמר אחרי ההזמנה, בלי
לחטוף את הגלילה. אחרי הבחירה היא נטענת ו-`ScrollTrigger.refresh()` נקרא.

**אחרי "כן" ה-ScrollTrigger של מערכה 1 מנוטרל.** אחרת גלילה למעלה הייתה
מגלגלת את הכרטיס אחורה באמצע החגיגה.

**כל ציר זמן באורך 1.** יש tween ריק באורך 1 בהתחלה, ולכן כל מיקום בציר הזמן
נקרא ישירות כאחוז מהגלילה.

**RTL:** שעות עטופות ב-`<bdi>`, ו-"שישי | 22:30" בנוי כ-flex row ולא נשען על
אלגוריתם ה-bidi. הסמיילי `:)` חייב `<bdi dir="ltr">` — אחרת הסוגר מתהפך והוא
נראה עצוב.

**`prefers-reduced-motion`:** אין scrub, אין particles, והמערכות נפרשות
כדף גלילה רגיל (`.is-static`) כדי ששום תוכן לא יהיה תלוי באנימציה.
