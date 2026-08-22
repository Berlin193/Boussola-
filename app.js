"use strict";

/* =========================================================
   BOUSSOLA — رحلة لاكتشاف الذات
   app.js — منطق التطبيق الكامل
   ========================================================= */

(function () {

  /* =======================================================
     1. البيانات — الفصول والأسئلة
     ======================================================= */

  var STORAGE_KEY = "boussola_state_v2";
  var TOTAL_STAGES = 60;
  var STAGES_PER_CHAPTER = 10;

  var chapters = [
    { id: 1, title: "البداية", description: "الاختيارات الأولى", symbol: "✦" },
    { id: 2, title: "الخوف", description: "الأشياء التي لا نقولها", symbol: "♧" },
    { id: 3, title: "العقل", description: "الصراع الداخلي", symbol: "◇" },
    { id: 4, title: "السقوط", description: "عندما لا تسير الأمور كما تريد", symbol: "♧" },
    { id: 5, title: "النهوض", description: "التغيير والمجازفة من جديد", symbol: "✧" },
    { id: 6, title: "الطموح", description: "النجاح وما وراءه", symbol: "★" }
  ];

  // كل سؤال: t = النص، h = تلميح، a = [تسمية، سمة، وزن][]
  var questions = [

    // الفصل 1 — البداية
    { t: "ماذا تبحث عنه الآن؟", h: "اختر ما يشبهك أكثر", a: [["الأمان", "security", 1], ["النجاح", "ambition", 2], ["المجهول", "curiosity", 2]] },
    { t: "لو كان أمامك طريقان، ماذا تختار؟", h: "لا توجد إجابة صحيحة", a: [["الطريق السهل", "security", 1], ["الطريق الأصعب", "courage", 2], ["طريق لم يجربه أحد", "curiosity", 3]] },
    { t: "ما الشيء الذي تخاف أن تخسره؟", h: "فكر في أول إجابة تأتي إلى ذهنك", a: [["الاستقرار", "security", 2], ["فرصتي", "ambition", 2], ["حريتي", "change", 2]] },
    { t: "عندما تفشل في شيء مهم...", h: "كيف تتصرف غالبًا؟", a: [["أتوقف قليلًا", "security", 1], ["أحاول مرة أخرى", "courage", 3], ["أغير الخطة", "change", 3]] },
    { t: "ما الذي يجذبك أكثر؟", h: "اختر الشعور الأقرب لك", a: [["حياة مستقرة", "security", 2], ["إنجاز كبير", "ambition", 3], ["تجربة جديدة", "curiosity", 3]] },
    { t: "لو لم يعرف أحد قرارك، ماذا ستختار؟", h: "تجاهل رأي الآخرين", a: [["ما يجعلني مرتاحًا", "security", 2], ["ما أريده فعلًا", "ambition", 3], ["ما يخيفني", "courage", 3]] },
    { t: "هل تفضل أن تعرف المستقبل؟", h: "تخيل أن لديك هذه القدرة", a: [["نعم", "security", 2], ["لا", "curiosity", 2], ["أريد أن أصنعه بنفسي", "ambition", 3]] },
    { t: "ماذا تفعل عندما تكون وحدك؟", h: "اختر الأقرب", a: [["أفكر كثيرًا", "curiosity", 2], ["أخطط", "ambition", 2], ["أبحث عن شيء يلهيني", "change", 1]] },
    { t: "ما الذي يمنحك القوة؟", h: "فكر في أصعب أوقاتك", a: [["الناس الذين أحبهم", "security", 2], ["هدفي", "ambition", 3], ["إيماني بنفسي", "courage", 3]] },
    { t: "أول فصل انتهى. ماذا تريد من الفصل القادم؟", h: "اختر شعورًا", a: [["أن أفهم نفسي", "curiosity", 3], ["أن أتغير", "change", 3], ["أن أصبح أقوى", "courage", 3]] },

    // الفصل 2 — الخوف
    { t: "ما أكثر شيء يجعلك تتردد؟", h: "كن صريحًا مع نفسك", a: [["الخوف من الفشل", "security", 2], ["رأي الناس", "security", 2], ["عدم معرفة النتيجة", "curiosity", 2]] },
    { t: "عندما يخاف الجميع، ماذا تفعل؟", h: "تخيل موقفًا حقيقيًا", a: [["أبتعد", "security", 2], ["أراقب", "curiosity", 2], ["أتقدم", "courage", 3]] },
    { t: "هل تخفي خوفك عن الآخرين؟", h: "اختر بصراحة", a: [["دائمًا تقريبًا", "security", 2], ["أحيانًا", "courage", 1], ["لا أهتم بإخفائه", "change", 2]] },
    { t: "ماذا تفعل عندما ينتقدك شخص؟", h: "رد فعلك الأول", a: [["أتأثر", "security", 2], ["أفكر في كلامه", "curiosity", 2], ["أثبت له العكس", "ambition", 3]] },
    { t: "أي خوف تريد التخلص منه؟", h: "اختيارك مهم", a: [["الخوف من الفشل", "courage", 3], ["الخوف من الوحدة", "security", 2], ["الخوف من التغيير", "change", 3]] },
    { t: "لو ضمنت أنك لن تخسر، ماذا ستفعل؟", h: "أطلق خيالك", a: [["أبدأ مشروعًا", "ambition", 3], ["أسافر", "curiosity", 3], ["أغير حياتي", "change", 3]] },
    { t: "ما الذي يجعلك تشعر أنك ضعيف؟", h: "لا تبحث عن إجابة مثالية", a: [["الفشل", "courage", 2], ["الوحدة", "security", 2], ["عدم السيطرة", "change", 2]] },
    { t: "هل تفضل مواجهة المشكلة أم تجاهلها؟", h: "ما الذي تفعله فعلًا؟", a: [["أواجهها", "courage", 3], ["أؤجلها", "security", 1], ["أبحث عن حل مختلف", "curiosity", 3]] },
    { t: "إذا عاد بك الزمن، ماذا ستغير؟", h: "فكر في قرار واحد فقط", a: [["قرارًا مهمًا", "change", 3], ["لا شيء", "security", 1], ["كنت سأغامر أكثر", "courage", 3]] },
    { t: "ما الشيء الذي لا تريد أن تصبح عليه؟", h: "الإجابة تكشف شيئًا عنك", a: [["شخصًا مستسلمًا", "ambition", 3], ["شخصًا خائفًا", "courage", 3], ["شخصًا بلا هدف", "ambition", 3]] },

    // الفصل 3 — العقل
    { t: "هل تثق بعقلك أم شعورك؟", h: "اختر الأقرب", a: [["العقل", "curiosity", 2], ["الشعور", "courage", 2], ["كلاهما", "change", 2]] },
    { t: "عندما تفكر كثيرًا، ماذا يحدث؟", h: "راقب نفسك", a: [["أجد حلولًا", "curiosity", 3], ["أتوتر", "security", 2], ["أغير رأيي", "change", 2]] },
    { t: "هل تحلل كل شيء؟", h: "حتى الأشياء الصغيرة؟", a: [["نعم", "curiosity", 3], ["أحيانًا", "security", 1], ["لا", "courage", 2]] },
    { t: "ماذا تفعل عندما لا تجد إجابة؟", h: "هذه اللحظة مهمة", a: [["أبحث أكثر", "curiosity", 3], ["أترك الأمر", "security", 1], ["أجرب شيئًا جديدًا", "change", 3]] },
    { t: "ما أهم شيء في القرار؟", h: "اختر واحدًا", a: [["المنطق", "curiosity", 2], ["النتيجة", "ambition", 3], ["الإحساس", "courage", 2]] },
    { t: "هل تتغير أفكارك بسرعة؟", h: "فكر في السنوات الأخيرة", a: [["نعم", "change", 3], ["قليلًا", "security", 1], ["نادراً", "ambition", 2]] },
    { t: "لو اكتشفت أنك كنت مخطئًا؟", h: "ماذا تفعل؟", a: [["أعترف", "courage", 3], ["أراجع نفسي", "curiosity", 3], ["أحاول تبرير موقفي", "security", 1]] },
    { t: "ما الذي يزعجك أكثر؟", h: "اختر الأقرب", a: [["الفوضى", "security", 2], ["الجهل", "curiosity", 3], ["الركود", "change", 3]] },
    { t: "هل تحب الأسئلة أكثر أم الإجابات؟", h: "فكر في نفسك", a: [["الأسئلة", "curiosity", 3], ["الإجابات", "security", 2], ["التجربة", "change", 3]] },
    { t: "لو كان عقلك مكانًا، كيف سيكون؟", h: "اختر الصورة الأقرب", a: [["مدينة مزدحمة", "curiosity", 3], ["غرفة هادئة", "security", 2], ["طريق مفتوح", "change", 3]] },

    // الفصل 4 — السقوط
    { t: "هل تعتبر الفشل نهاية؟", h: "فكر في آخر فشل مررت به", a: [["أحيانًا", "security", 1], ["لا", "courage", 3], ["هو بداية جديدة", "change", 3]] },
    { t: "ماذا تفعل بعد خسارة كبيرة؟", h: "رد فعلك الطبيعي", a: [["أحتاج وقتًا", "security", 2], ["أتعلم منها", "curiosity", 3], ["أبدأ من جديد", "courage", 3]] },
    { t: "من أين تأتي قوتك بعد السقوط؟", h: "اختيار واحد", a: [["من نفسي", "courage", 3], ["من الآخرين", "security", 2], ["من رغبتي في التغيير", "change", 3]] },
    { t: "هل سبق أن غيرك الفشل؟", h: "انظر إلى الماضي", a: [["نعم كثيرًا", "change", 3], ["قليلًا", "curiosity", 2], ["لا أظن", "security", 1]] },
    { t: "ماذا تقول لنفسك بعد الخطأ؟", h: "كن صادقًا", a: [["كان يجب أن أعرف", "security", 1], ["سأتعلم", "curiosity", 3], ["سأحاول مرة أخرى", "courage", 3]] },
    { t: "هل تسامح نفسك بسهولة؟", h: "لا توجد إجابة خاطئة", a: [["لا", "security", 2], ["أحيانًا", "change", 2], ["نعم", "courage", 2]] },
    { t: "لو سقطت أمام الجميع؟", h: "تخيل الموقف", a: [["أشعر بالإحراج", "security", 2], ["أكمل", "courage", 3], ["أضحك وأتعلم", "change", 3]] },
    { t: "ما أصعب شيء في البداية من جديد؟", h: "اختر إحساسًا", a: [["الخوف", "courage", 2], ["الشك", "security", 2], ["ترك الماضي", "change", 3]] },
    { t: "هل الماضي يحددك؟", h: "فكر قبل الاختيار", a: [["أحيانًا", "security", 1], ["لا", "change", 3], ["هو جزء مني", "curiosity", 2]] },
    { t: "وصلت إلى نهاية السقوط. ماذا تختار؟", h: "هذه إجابة مهمة", a: [["أستسلم", "security", 0], ["أتعلم", "curiosity", 3], ["أنهض", "courage", 4]] },

    // الفصل 5 — النهوض
    { t: "ماذا يعني التغيير بالنسبة لك؟", h: "اختر المعنى الأقرب", a: [["خطر", "security", 1], ["فرصة", "ambition", 3], ["مغامرة", "curiosity", 3]] },
    { t: "هل تستطيع ترك شيء تحبه؟", h: "فكر في شيء من الماضي", a: [["صعب جدًا", "security", 2], ["إذا كان ضروريًا", "change", 2], ["نعم إذا كان هناك شيء أفضل", "ambition", 3]] },
    { t: "ما الذي يجعلك تبدأ؟", h: "ما المحرك الحقيقي؟", a: [["الحاجة", "security", 2], ["الحلم", "ambition", 3], ["الفضول", "curiosity", 3]] },
    { t: "هل تحب المخاطرة؟", h: "اختيارك سيؤثر على النتيجة", a: [["قليلًا", "security", 1], ["إذا كانت محسوبة", "curiosity", 2], ["نعم", "courage", 3]] },
    { t: "لو فتحت أمامك فرصة كبيرة؟", h: "ماذا ستفعل؟", a: [["أدرسها", "curiosity", 2], ["أدخل فورًا", "courage", 3], ["أحسب المكسب", "ambition", 3]] },
    { t: "ما أكثر شيء تريد تغييره في حياتك؟", h: "اختر الاتجاه", a: [["روتيني", "change", 3], ["وضعي", "ambition", 3], ["طريقة تفكيري", "curiosity", 3]] },
    { t: "هل تؤمن بأن الإنسان يستطيع تغيير نفسه؟", h: "اختر ما تؤمن به", a: [["نعم", "change", 3], ["إلى حد ما", "curiosity", 2], ["ليس بسهولة", "security", 2]] },
    { t: "إذا كنت ستبدأ غدًا، ماذا ستفعل الليلة؟", h: "التخطيط يكشف الكثير", a: [["أخطط", "curiosity", 3], ["أجهز نفسي", "security", 2], ["أبدأ فورًا", "ambition", 3]] },
    { t: "ماذا تفضل؟", h: "اختيار واحد", a: [["حياة هادئة", "security", 2], ["حياة كبيرة", "ambition", 3], ["حياة مختلفة", "change", 3]] },
    { t: "أنت على بعد خطوة من النهاية. هل ستكمل؟", h: "هذه ليست إجابة عادية", a: [["نعم", "courage", 4], ["أحتاج وقتًا", "security", 1], ["سأعرف بنفسي", "curiosity", 3]] },

    // الفصل 6 — الطموح
    { t: "ماذا يعني النجاح بالنسبة لك؟", h: "ليس ما يقوله الناس", a: [["المال", "ambition", 3], ["الحرية", "change", 3], ["السلام", "security", 3]] },
    { t: "لو حصلت على كل ما تريد؟", h: "ماذا بعد ذلك؟", a: [["أرتاح", "security", 2], ["أبحث عن هدف جديد", "ambition", 3], ["أجرب شيئًا مختلفًا", "curiosity", 3]] },
    { t: "ما الشيء الذي تريد أن يتذكرك الناس به؟", h: "اختر معنى", a: [["قوتي", "courage", 3], ["إنجازي", "ambition", 3], ["اختلافي", "change", 3]] },
    { t: "هل تخاف من النجاح؟", h: "نعم، النجاح نفسه", a: [["أحيانًا", "security", 2], ["لا", "ambition", 3], ["أخاف من فقدانه", "security", 2]] },
    { t: "إذا أصبحت أقوى، ماذا ستفعل؟", h: "تخيل نفسك", a: [["أحمي من أحب", "security", 3], ["أحقق أهدافي", "ambition", 3], ["أغير حياتي", "change", 3]] },
    { t: "ما الشيء الذي لن تتنازل عنه؟", h: "قيمتك الأساسية", a: [["حريتي", "change", 3], ["كرامتي", "courage", 3], ["استقراري", "security", 3]] },
    { t: "هل ما زلت الشخص نفسه الذي بدأ الرحلة؟", h: "قارن نفسك بالبداية", a: [["لا", "change", 3], ["ربما", "curiosity", 2], ["نعم", "security", 1]] },
    { t: "ما الذي اكتشفته عن نفسك؟", h: "اختر الأقرب", a: [["أني أقوى مما توقعت", "courage", 4], ["أني أريد أكثر", "ambition", 4], ["أني ما زلت أبحث", "curiosity", 4]] },
    { t: "لو كان أمامك باب أخير، هل ستفتحه؟", h: "لا يوجد رجوع", a: [["نعم", "courage", 4], ["أفكر أولًا", "curiosity", 3], ["أفتح الباب وأرى", "change", 4]] },
    { t: "أين تريد أن تذهب من هنا؟", h: "آخر اختيار في الرحلة", a: [["إلى نفسي", "curiosity", 5], ["إلى حلمي", "ambition", 5], ["إلى حياة جديدة", "change", 5]] }
  ];

  // رسائل البوصلة الإرشادية — تتنوع حسب السمة المختارة
  var guideMessages = {
    security: ["الأمان اختيار، وليس ضعفًا.", "من يحمي ما يملك يبني على أساس ثابت.", "التوازن أيضًا نوع من الشجاعة."],
    ambition: ["طموحك هو وقودك. لا تُطفئه.", "الأهداف الكبيرة تبدأ باختيار صغير كهذا.", "أنت تصنع مسارك بوضوح."],
    courage: ["الشجاعة ليست غياب الخوف، بل التقدم رغمه.", "كل خطوة صعبة تجعلك أقوى.", "أنت تختار المواجهة، وهذا نادر."],
    curiosity: ["الفضول هو بوصلتك الحقيقية.", "الأسئلة التي تطرحها تقربك من نفسك.", "الاستكشاف طريق، ليس وجهة."],
    change: ["التغيير ليس خسارة، بل نسخة جديدة منك.", "أنت لا تخشى إعادة البناء.", "كل تحوّل يبدأ من قرار كهذا."]
  };

  // الأنماط الخمسة — تُحدَّد حسب السمة الأعلى
  var archetypes = {
    ambition: { symbol: "★", title: "الساعي", desc: "طموحك يدفعك دائمًا للأمام. لا تكتفي بالقليل، وتبحث دومًا عن الهدف التالي." },
    courage: { symbol: "⚑", title: "المحارب", desc: "تواجه خوفك مباشرة، وتنهض في كل مرة تسقط فيها. القوة عندك اختيار يومي." },
    curiosity: { symbol: "◇", title: "المستكشف", desc: "فضولك يقودك للبحث عن معنى أعمق لكل شيء حولك، ولنفسك قبل كل شيء." },
    change: { symbol: "⟲", title: "المتحوّل", desc: "لا تخاف من هدم ما بنيته لتبني شيئًا أصدق. التغيير عندك طريقة حياة." },
    security: { symbol: "⛨", title: "الحارس", desc: "تبني حياتك على أساس ثابت، وتحمي ما يهمك بصبر وثبات نادرين." }
  };

  var traitLabels = {
    ambition: "الطموح",
    courage: "الشجاعة",
    curiosity: "الفضول",
    change: "التغيير",
    security: "الأمان"
  };

  var traitOrder = ["ambition", "courage", "curiosity", "change", "security"];


  /* =======================================================
     2. الحالة (State)
     ======================================================= */

  var defaultState = function () {
    return {
      stage: 1,
      answers: [],
      stats: { ambition: 0, courage: 0, curiosity: 0, change: 0, security: 0 },
      finished: false,
      settings: {
        sound: true,
        haptics: true,
        reducedMotion: (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || false
      }
    };
  };

  var state = defaultState();


  /* =======================================================
     3. أدوات مساعدة
     ======================================================= */

  function $(id) { return document.getElementById(id); }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function completedStages() { return state.answers.length; }

  function currentChapterIndex() {
    return clamp(Math.ceil(state.stage / STAGES_PER_CHAPTER), 1, chapters.length);
  }

  function isChapterUnlocked(chapterId) {
    if (chapterId === 1) return true;
    return completedStages() >= (chapterId - 1) * STAGES_PER_CHAPTER;
  }

  function isChapterComplete(chapterId) {
    return completedStages() >= chapterId * STAGES_PER_CHAPTER;
  }

  function chapterPercent(chapterId) {
    var start = (chapterId - 1) * STAGES_PER_CHAPTER;
    var done = clamp(completedStages() - start, 0, STAGES_PER_CHAPTER);
    return Math.round((done / STAGES_PER_CHAPTER) * 100);
  }

  function dominantTrait() {
    var best = "curiosity";
    var bestVal = -1;
    traitOrder.forEach(function (k) {
      if (state.stats[k] > bestVal) {
        bestVal = state.stats[k];
        best = k;
      }
    });
    return best;
  }

  function statTotal() {
    var sum = 0;
    traitOrder.forEach(function (k) { sum += state.stats[k]; });
    return sum;
  }


  /* =======================================================
     4. التخزين المحلي
     ======================================================= */

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* التخزين غير متاح — نستمر بدون حفظ */
    }
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (saved && typeof saved === "object") {
        var fresh = defaultState();
        state = {
          stage: clamp(saved.stage || 1, 1, TOTAL_STAGES + 1),
          answers: Array.isArray(saved.answers) ? saved.answers : [],
          stats: Object.assign(fresh.stats, saved.stats || {}),
          finished: !!saved.finished,
          settings: Object.assign(fresh.settings, saved.settings || {})
        };
      }
    } catch (e) {
      state = defaultState();
    }
  }

  function resetProgress() {
    state = defaultState();
    saveState();
    render("home");
    showToast("بدأت رحلة جديدة");
  }


  /* =======================================================
     5. الصوت والاهتزاز (تفاعل حسي خفيف)
     ======================================================= */

  var audioCtx = null;

  function unlockAudio() {
    if (audioCtx || !window.AudioContext) return;
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { audioCtx = null; }
  }

  function playTone(freq, duration, type) {
    if (!state.settings.sound || !audioCtx) return;
    try {
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = type || "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) { /* تجاهل أخطاء الصوت */ }
  }

  function soundTap() { playTone(420, 0.12, "sine"); }
  function soundAdvance() { playTone(560, 0.16, "sine"); }
  function soundChapter() { playTone(660, 0.2, "triangle"); setTimeout(function () { playTone(880, 0.25, "triangle"); }, 120); }
  function soundFinish() {
    [523, 659, 784, 1046].forEach(function (f, i) {
      setTimeout(function () { playTone(f, 0.35, "triangle"); }, i * 130);
    });
  }

  function haptic(ms) {
    if (state.settings.haptics && "vibrate" in navigator) {
      try { navigator.vibrate(ms || 10); } catch (e) { /* تجاهل */ }
    }
  }


  /* =======================================================
     6. التوست (إشعارات صغيرة)
     ======================================================= */

  function showToast(message) {
    var host = $("toastHost");
    if (!host) return;
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    host.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 300);
    }, 2600);
  }


  /* =======================================================
     7. التنقل بين الشاشات
     ======================================================= */

  var screenRenderers = {};

  function render(screenName) {
    if (screenName === "journey" && (state.stage > TOTAL_STAGES || state.finished)) {
      screenName = "result";
    }
    if (screenName === "result" && !state.finished) {
      screenName = "home";
    }

    document.querySelectorAll(".screen").forEach(function (el) {
      el.classList.remove("active");
    });
    document.querySelectorAll(".bottom-nav button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.screen === screenName);
    });

    var target = $(screenName);
    if (!target) return;

    if (screenRenderers[screenName]) screenRenderers[screenName]();

    target.classList.add("active");
    if (!state.settings.reducedMotion) {
      target.classList.remove("enter");
      void target.offsetWidth; // إعادة تشغيل الأنيميشن
      target.classList.add("enter");
    }
    window.scrollTo(0, 0);
  }


  /* =======================================================
     8. عرض الشاشة الرئيسية
     ======================================================= */

  screenRenderers.home = function () {
    var pct = Math.round((completedStages() / TOTAL_STAGES) * 100);
    $("homeProgress").textContent = pct + "%";
    $("homeProgressBar").style.width = pct + "%";

    var btn = $("startJourney");
    if (state.finished) {
      btn.querySelector("span").textContent = "شاهد نتيجتك";
    } else if (completedStages() > 0) {
      btn.querySelector("span").textContent = "تابع الرحلة";
    } else {
      btn.querySelector("span").textContent = "ابدأ الرحلة";
    }

    updateCompass($("homeCompass"));
  };


  /* =======================================================
     9. عرض الفصول
     ======================================================= */

  screenRenderers.chapters = function () {
    var grid = $("chaptersGrid");
    grid.innerHTML = "";

    chapters.forEach(function (ch) {
      var unlocked = isChapterUnlocked(ch.id);
      var complete = isChapterComplete(ch.id);
      var pct = chapterPercent(ch.id);

      var card = document.createElement("article");
      card.className = "chapter-card" + (unlocked ? "" : " locked") + (complete ? " complete" : "");
      card.dataset.chapter = ch.id;

      card.innerHTML =
        '<div class="chapter-icon">' + ch.symbol + '</div>' +
        '<div class="chapte