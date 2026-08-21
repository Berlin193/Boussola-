"use strict";

/* =========================================================
   BOUSSOLA
   Local AI + Journey Engine + Ambient Sound
========================================================= */

const STORAGE = "boussoula_v3";

const chapters = [
  "البداية",
  "الخوف",
  "المرآة",
  "الاختيار",
  "التحول",
  "الاتجاه"
];

const questions = [
  ["لو اختفى الخوف الآن، ماذا ستفعل؟","الخوف أحيانًا يكون أكبر من الشيء الذي نخاف منه.","الشجاعة"],
  ["ما أكثر شيء لا تريد خسارته؟","إجابتك تكشف ما تعتبره مهمًا فعلًا.","التأمل"],
  ["هل تفضل أن تعرف الحقيقة حتى لو كانت مؤلمة؟","بعض الإجابات تغير الطريقة التي ترى بها العالم.","الفضول"],
  ["متى تشعر أنك أقوى؟","القوة ليست دائمًا في عدم السقوط.","الشجاعة"],
  ["هل النجاح أهم أم السلام الداخلي؟","لا توجد إجابة صحيحة هنا.","الطموح"],
  ["لو استطعت تغيير شيء في الماضي، ماذا ستغير؟","الماضي لا يتغير، لكن نظرتنا إليه يمكن أن تتغير.","التأمل"],
  ["هل تثق بنفسك عندما تكون وحدك؟","هذه الإجابة لك أنت فقط.","الشجاعة"],
  ["ما الشيء الذي تؤجله رغم أنك تعرف أنه مهم؟","أحيانًا نعرف الطريق ونخاف من أول خطوة.","الطموح"],
  ["هل تفضل حياة مستقرة أم حياة مليئة بالمغامرة؟","الاستقرار والمغامرة لهما ثمن.","المغامرة"],
  ["من أنت عندما لا يراك أحد؟","هذه ربما أهم إجابة في الرحلة.","التأمل"],

  ["هل تسامح نفسك بسهولة؟","أحيانًا نكون أقسى على أنفسنا من الآخرين.","التأمل"],
  ["ما أكثر شيء يجعلك تستمر؟","اعرف الوقود الذي يحركك.","الطموح"],
  ["هل يمكن للفشل أن يكون مفيدًا؟","ربما يكون الفشل مجرد اتجاه جديد.","الشجاعة"],
  ["هل تخاف من أن تبدأ من الصفر؟","الصفر ليس دائمًا نهاية.","الشجاعة"],
  ["هل تهتم برأي الناس فيك؟","العيش لنظرة الآخرين قد يجعلك تنسى نفسك.","التأمل"],
  ["ما الحلم الذي لم تخبر به أحدًا؟","بعض الأحلام تحتاج وقتًا قبل أن ترى النور.","الطموح"],
  ["لو حصلت على المال الذي تريده، ماذا ستفعل؟","المال يكشف أحيانًا ما نبحث عنه فعلًا.","الطموح"],
  ["هل تستطيع ترك شيء تحبه إذا كان يؤذيك؟","الترك أحيانًا يحتاج شجاعة أكثر من البقاء.","الشجاعة"],
  ["ما أكثر شيء يثير فضولك؟","الفضول قد يكون بداية الطريق.","الفضول"],
  ["هل تريد أن يعرفك الآخرون كما أنت؟","أم أنك تفضل أن يحتفظوا بصورة معينة عنك؟","التأمل"],

  ["هل أنت مستعد لسماع شيء لا يعجبك عن نفسك؟","لا يمكن تغيير شيء لا نراه.","التأمل"],
  ["ما الشيء الذي تريد أن تصبح أفضل فيه؟","اختيار واحد قد يكون بداية تحول كبير.","الطموح"],
  ["هل تفضل الطريق السهل أم الطريق الذي يقودك لحلمك؟","الطريق الأصعب ليس دائمًا الأفضل، لكنه أحيانًا ضروري.","الشجاعة"],
  ["هل تؤمن أن الإنسان يستطيع تغيير نفسه؟","التغيير يبدأ بفكرة صغيرة.","الطموح"],
  ["ماذا تفعل عندما تفشل؟","رد فعلك بعد السقوط أهم من السقوط نفسه.","الشجاعة"],
  ["هل تعرف ما تريد من حياتك؟","عدم معرفة الاتجاه ليست مشكلة إذا كنت مستعدًا للبحث.","الفضول"],
  ["ما الشيء الذي يمنعك من الحركة؟","سمِّ العائق وستصبح أقرب لتجاوزه.","التأمل"],
  ["لو كان أمامك طريق مجهول، هل ستدخل؟","المجهول ليس دائمًا خطرًا.","المغامرة"],
  ["هل يمكن أن تبدأ بدون أن تكون مستعدًا؟","أحيانًا الاستعداد الحقيقي يأتي بعد البداية.","الشجاعة"],
  ["ما الشيء الذي تريد إثباته؟","ولمن تريد إثباته؟","الطموح"],

  ["هل تستطيع أن تقول لا؟","الحدود جزء من معرفة نفسك.","الشجاعة"],
  ["هل تعطي فرصًا كثيرة للآخرين؟","وأنت، كم فرصة تعطي لنفسك؟","التأمل"],
  ["ما أكثر قرار غير حياتك؟","حتى القرار الصغير يمكن أن يغير الاتجاه.","التأمل"],
  ["هل تريد أن تعيش كما يتوقع الآخرون؟","أم كما تختار أنت؟","الشجاعة"],
  ["ما الشيء الذي تريد تركه خلفك؟","يمكن أن يكون خوفًا أو عادة أو شخصًا أو فكرة.","التحول"],
  ["ماذا تريد أن تأخذ معك؟","اختيار ما تحتفظ به مهم مثل اختيار ما تتركه.","التأمل"],
  ["هل ترى نفسك في المستقبل مختلفًا؟","المستقبل يبدأ من قرارات الحاضر.","الطموح"],
  ["هل تستطيع الانتظار من أجل شيء أكبر؟","الصبر ليس توقفًا دائمًا.","الطموح"],
  ["متى تشعر أنك حي فعلًا؟","ربما تكمن الإجابة هناك.","المغامرة"],
  ["هل تبحث عن معنى أم عن نتيجة؟","كل واحد منهما يقود لطريق مختلف.","الفضول"],

  ["هل أنت مستعد لتغيير عادة واحدة؟","لا تحاول تغيير كل شيء دفعة واحدة.","التحول"],
  ["ما أول خطوة يمكنك فعلها اليوم؟","الفكرة التي لا تتحول إلى فعل تبقى فكرة.","الشجاعة"],
  ["هل تحتاج إلى بداية جديدة؟","البداية الجديدة لا تحتاج تاريخًا جديدًا.","التحول"],
  ["هل تخاف أن يراك الآخرون وأنت تفشل؟","الفشل أمام الآخرين لا يقلل من قيمتك.","الشجاعة"],
  ["ما الذي يجعلك مختلفًا؟","لا تبحث عن إجابة جميلة، ابحث عن إجابة صادقة.","التأمل"],
  ["هل تعرف متى تتوقف؟","الاستمرار قوة، لكن معرفة متى تتوقف قوة أيضًا.","التأمل"],
  ["هل تختار ما تريده أم ما تحتاجه؟","أحيانًا نحتاج شيئًا لا نريده.","التأمل"],
  ["ما الذي ستفعله لو عرفت أنك لن تفشل؟","هذه الإجابة قد تكون أقرب حلم لك.","الطموح"],
  ["هل تريد أن تصبح أقوى أم أكثر هدوءًا؟","القوة والهدوء ليسا متناقضين.","التأمل"],
  ["هل تثق بالطريق حتى عندما لا ترى نهايته؟","هنا يظهر معنى البوصلة.","المغامرة"],

  ["هل أنت مستعد للمجهول؟","المجهول يبدأ بعد آخر شيء تعرفه.","المغامرة"],
  ["ماذا ستختار لو لم يكن هناك حكم من أحد؟","أحيانًا نعيش تحت مراقبة غير موجودة أصلًا.","الشجاعة"],
  ["ما الشيء الذي تتمنى أن تسمعه الآن؟","ربما تستطيع قوله لنفسك.","التأمل"],
  ["هل تستطيع أن تبدأ وحدك؟","ليس كل طريق يحتاج جمهورًا.","الشجاعة"],
  ["هل النجاح بالنسبة لك رقم أم شعور؟","تعريفك للنجاح يغير طريقك.","الطموح"],
  ["ماذا لو كانت حياتك الحالية مجرد فصل؟","الفصل لا يحدد الكتاب كله.","التحول"],
  ["هل ستختار نفسك هذه المرة؟","ربما هذا هو السؤال الحقيقي.","الشجاعة"],
  ["ماذا تريد أن يحدث بعد هذه الرحلة؟","لا تجعل الرحلة تنتهي عند الشاشة.","الطموح"],
  ["هل تعرف اتجاهك الآن؟","ربما لا تحتاج أن تعرف النهاية، فقط الاتجاه.","الفضول"],
  ["لو كانت هذه آخر لحظة، ماذا ستبدأ؟","لا تجب بسرعة.","الشجاعة"]
];

let state = {
  stage: 0,
  answers: [],
  sound: true,
  motion: true
};


/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

const screens = {
  home: $("home"),
  map: $("map"),
  journey: $("journey"),
  profile: $("profile")
};


/* =========================================================
   SAVE / LOAD
========================================================= */

function save() {

  localStorage.setItem(
    STORAGE,
    JSON.stringify(state)
  );

}

function load() {

  try {

    const data =
      JSON.parse(localStorage.getItem(STORAGE));

    if (!data) return;

    state = {
      ...state,
      ...data
    };

  } catch (error) {

    console.log("Boussola storage error");

  }

}


/* =========================================================
   NAVIGATION
========================================================= */

function show(name) {

  Object.values(screens)
    .forEach(screen => {

      screen.classList.remove("active");

    });

  screens[name].classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: state.motion ? "smooth" : "auto"
  });

}


document
  .querySelectorAll("[data-screen]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => show(button.dataset.screen)
    );

  });


/* =========================================================
   START
========================================================= */

$("startBtn").addEventListener(
  "click",
  () => {

    if (state.stage >= questions.length) {

      state.stage = 0;
      state.answers = [];

    }

    show("journey");

    startAtmosphere();

    renderQuestion();

  }
);


/* =========================================================
   JOURNEY
========================================================= */

function renderQuestion() {

  const index = state.stage;

  const q = questions[index];

  if (!q) {

    finish();

    return;

  }

  const chapter =
    Math.floor(index / 10);

  $("chapterLabel").textContent =
    `الفصل ${chapter + 1}`;

  $("chapterTitle").textContent =
    chapters[chapter];

  $("stageCurrent").textContent =
    String(index + 1).padStart(2, "0");

  $("stageLabel").textContent =
    String(index + 1).padStart(2, "0");

  $("questionTitle").textContent =
    q[0];

  $("questionDescription").textContent =
    q[1];

  $("questionSymbol").textContent =
    symbolFor(q[2]);

  const percent =
    Math.round((index / questions.length) * 100);

  $("progressBar").style.width =
    `${percent}%`;

  createAnswers();

  aiSay(
    `المرحلة ${index + 1} من ${questions.length}. ${aiHint(q[2])}`
  );

  updateMap();

}


function createAnswers() {

  const box = $("answers");

  box.innerHTML = "";

  const options = [
    ["نعم", "yes"],
    ["لا", "no"],
    ["ربما", "maybe"],
    ["لا أعرف", "unknown"]
  ];

  options.forEach(
    ([text, type], i) => {

      const button =
        document.createElement("button");

      button.className = "answer";

      button.innerHTML = `
        <span class="answer-icon">
          ${["✓","×","◇","?"][i]}
        </span>

        <span>${text}</span>

        <b>←</b>
      `;

      button.addEventListener(
        "click",
        () => choose(text, type, button)
      );

      box.appendChild(button);

    }
  );

}


function choose(text, type, button) {

  if (button.classList.contains("selected"))
    return;

  button.classList.add("selected");

  const category =
    questions[state.stage][2];

  state.answers[state.stage] = {
    answer: text,
    type,
    category
  };

  save();

  aiAfterAnswer(text, category);

  setTimeout(
    () => {

      state.stage++;

      save();

      if (
        state.stage >= questions.length
      ) {

        finish();

      } else {

        renderQuestion();

      }

    },
    state.motion ? 650 : 100
  );

}


/* =========================================================
   LOCAL AI
========================================================= */

function aiHint(category) {

  const hints = {

    "الشجاعة":
      "لا تبحث عن الإجابة التي تبدو قوية. ابحث عن الإجابة الصادقة.",

    "التأمل":
      "خذ لحظة قبل أن تختار. بعض الأسئلة تحتاج صمتًا.",

    "الفضول":
      "إذا شعرت أن السؤال غريب، فهذا جيد. استكشفه.",

    "الطموح":
      "فكر فيما تريده فعلًا، وليس فيما يريده الآخرون منك.",

    "المغامرة":
      "ليس عليك معرفة النهاية حتى تبدأ.",

    "التحول":
      "التغيير يبدأ غالبًا من قرار صغير."
  };

  return hints[category] || hints["التأمل"];

}


function aiAfterAnswer(answer, category) {

  const responses = {

    yes: [
      "إجابة مباشرة... البوصلة سجلتها.",
      "لم تتردد كثيرًا.",
      "إذن هناك شيء بداخلك يعرف الإجابة.",
      "اختيار واضح. interesting..."
    ],

    no: [
      "الرفض أحيانًا يكون بداية فهم.",
      "لا تعتبر كلمة لا ضعفًا.",
      "البوصلة لاحظت هذا الاختيار.",
      "ربما هذه الـ لا تخفي وراءها شيئًا."
    ],

    maybe: [
      "التردد ليس دائمًا ضعفًا.",
      "ربما لأن السؤال أقرب مما توقعت.",
      "البوصلة لم تحكم عليك.",
      "هناك أشياء لا يمكن الإجابة عنها بسرعة."
    ],

    unknown: [
      "عدم المعرفة إجابة أيضًا.",
      "ربما تحتاج وقتًا.",
      "احتفظ بهذا السؤال.",
      "قد تعرف الإجابة في مرحلة قادمة."
    ]
  };

  const list =
    responses[answer === "نعم" ? "yes" :
             answer === "لا" ? "no" :
             answer === "ربما" ? "maybe" : "unknown"];

  aiSay(
    list[Math.floor(Math.random() * list.length)]
  );

}


function aiSay(text) {

  $("aiMessage").style.opacity = "0";

  setTimeout(
    () => {

      $("aiMessage").textContent =
        text;

      $("aiMessage").style.opacity =
        "1";

    },
    state.motion ? 150 : 0
  );

}


/* =========================================================
   SYMBOL
========================================================= */

function symbolFor(category) {

  const symbols = {

    "الشجاعة": "✦",
    "التأمل": "◌",
    "الفضول": "?",
    "الطموح": "↑",
    "المغامرة": "◇",
    "التحول": "↻"

  };

  return symbols[category] || "◈";

}


/* =========================================================
   MAP
========================================================= */

function buildMap() {

  const container =
    $("mapNodes");

  container.innerHTML = "";

  for (
    let i = 0;
    i < questions.length;
    i++
  ) {

    const node =
      document.createElement("button");

    node.className =
      "map-node";

    if (i < state.stage)
      node.classList.add("done");

    if (i === state.stage)
      node.classList.add("active");

    if (i > state.stage)
      node.classList.add("locked");

    node.textContent =
      i + 1;

    node.addEventListener(
      "click",
      () => {

        if (i > state.stage)
          return;

        state.stage = i;

        save();

        show("journey");

        renderQuestion();

      }
    );

    container.appendChild(node);

  }

}


function updateMap() {

  $("mapProgress").textContent =
    `${Math.round(
      (state.stage / questions.length) * 100
    )}%`;

  buildMap();

}


/* =========================================================
   FINISH
========================================================= */

function finish() {

  state.stage = questions.length;

  save();

  calculateResult();

  show("profile");

  stopAtmosphere();

}


function calculateResult() {

  const scores = {
    الشجاعة: 0,
    الطموح: 0,
    الفضول: 0,
    التأمل: 0,
    المغامرة: 0,
    التحول: 0
  };

  state.answers.forEach(
    answer => {

      if (!answer) return;

      scores[answer.category]++;

    }
  );

  const max =
    Math.max(...Object.values(scores));

  const winner =
    Object.keys(scores)
      .find(key => scores[key] === max)
      || "التأمل";

  const total =
    state.answers.filter(Boolean).length;

  const percentage =
    Math.round(
      (total / questions.length) * 100
    );

  const descriptions = {

    الشجاعة:
      "أنت لا تحتاج إلى اختفاء الخوف حتى تتحرك. لديك ميل واضح لمواجهة الأشياء بدل الهروب منها.",

    الطموح:
      "داخلك رغبة قوية في بناء شيء أكبر. أنت لا تريد مجرد البقاء، بل تريد الوصول.",

    الفضول:
      "عقلك يبحث دائمًا عن إجابة أخرى. بالنسبة لك، الطريق أهم من الوصول السريع.",

    التأمل:
      "أنت شخص يفكر كثيرًا في المعنى والاختيارات. ترى تفاصيل قد لا يلاحظها الآخرون.",

    المغامرة:
      "المجهول لا يخيفك بالكامل. لديك استعداد لأن تدخل طرقًا لا تعرف نهايتها.",

    التحول:
      "أنت في مرحلة تغيير. ربما لم تصل بعد، لكنك لم تعد الشخص نفسه الذي بدأ الرحلة."
  };

  $("resultTitle").textContent =
    winner;

  $("resultDescription").textContent =
    descriptions[winner];

  $("homeProgress").textContent =
    `${percentage}%`;

  const stats = {

    courage:
      scorePercent(scores["الشجاعة"], max),

    ambition:
      scorePercent(scores["الطموح"], max),

    curiosity:
      scorePercent(scores["الفضول"], max),

    reflection:
      scorePercent(scores["التأمل"], max)

  };

  setStat(
    "courage",
    stats.courage
  );

  setStat(
    "ambition",
    stats.ambition
  );

  setStat(
    "curiosity",
    stats.curiosity
  );

  setStat(
    "reflection",
    stats.reflection
  );

  $("resultMessage").textContent =
    `أجبت عن ${total} سؤالًا. ` +
    `البوصلة ترى أنك تميل إلى ${winner}. ` +
    `لكن النتيجة ليست حكمًا عليك. أنت من يقرر اتجاهك.`;

}


function scorePercent(value, max) {

  if (!max) return 0;

  return Math.min(
    100,
    Math.round(
      (value / max) * 100
    )
  );

}


function setStat(name, value) {

  $(`${name}Stat`).textContent =
    `${value}%`;

  $(`${name}Bar`).style.width =
    `${value}%`;

}


/* =========================================================
   RESTART
========================================================= */

$("restartBtn").addEventListener(
  "click",
  () => {

    state.stage = 0;

    state.answers = [];

    save();

    show("journey");

    startAtmosphere();

    renderQuestion();

  }
);


/* =========================================================
   JOURNEY BACK
========================================================= */

$("journeyBack").addEventListener(
  "click",
  () => {

    show("home");

    stopAtmosphere();

  }
);


/* =========================================================
   SETTINGS
========================================================= */

$("settingsOpen").addEventListener(
  "click",
  () => {

    $("settings").classList.add("active");

  }
);


$("settingsClose").addEventListener(
  "click",
  () => {

    $("settings").classList.remove("active");

  }
);


$("soundSwitch").addEventListener(
  "change",
  e => {

    state.sound =
      e.target.checked;

    $("soundBtn").textContent =
      state.sound ? "◉" : "○";

    if (!state.sound)
      stopAtmosphere();

    save();

  }
);


$("motionSwitch").addEventListener(
  "change",
  e => {

    state.motion =
      e.target.checked;

    document.body.classList.toggle(
      "reduced-motion",
      !state.motion
    );

    save();

  }
);


$("soundBtn").addEventListener(
  "click",
  () => {

    state.sound =
      !state.sound;

    $("soundSwitch").checked =
      state.sound;

    $("soundBtn").textContent =
      state.sound ? "◉" : "○";

    if (state.sound)
      startAtmosphere();
    else
      stopAtmosphere();

    save();

  }
);


$("clearBtn").addEventListener(
  "click",
  () => {

    if (
      confirm(
        "هل تريد مسح رحلتك بالكامل؟"
      )
    ) {

      localStorage.removeItem(STORAGE);

      state.stage = 0;
      state.answers = [];

      $("settings")
        .classList.remove("active");

      show("home");

      updateMap();

      $("homeProgress").textContent =
        "0%";

    }

  }
);


/* =========================================================
   AMBIENT HORROR SOUND
   Generated using Web Audio API
========================================================= */

let audioContext = null;
let masterGain = null;
let drone = null;
let droneGain = null;
let wind = null;
let windGain = null;

function createAudio() {

  if (audioContext)
    return;

  audioContext =
    new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

  masterGain =
    audioContext.createGain();

  masterGain.gain.value =
    0.0001;

  masterGain.connect(
    audioContext.destination
  );

}


function startAtmosphere() {

  if (!state.sound)
    return;

  createAudio();

  if (
    audioContext.state ===
    "suspended"
  ) {

    audioContext.resume();

  }

  if (drone)
    return;

  drone =
    audioContext.createOscillator();

  droneGain =
    audioContext.createGain();

  drone.type =
    "sine";

  drone.frequency.value =
    48;

  droneGain.gain.value =
    0.035;

  drone.connect(droneGain);

  droneGain.connect(masterGain);

  drone.start();


  /*
    Noise generator
    creates a very quiet distant wind.
  */

  const bufferSize =
    audioContext.sampleRate * 2;

  const buffer =
    audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate
    );

  const data =
    buffer.getChannelData(0);

  for (
    let i = 0;
    i < bufferSize;
    i++
  ) {

    data[i] =
      Math.random() * 2 - 1;

  }

  wind =
    audioContext.createBufferSource();

  wind.buffer =
    buffer;

  wind.loop =
    true;

  windGain =
    audioContext.createGain();

  windGain.gain.value =
    0.006;

  wind.connect(windGain);

  windGain.connect(masterGain);

  wind.start();


  masterGain.gain.cancelScheduledValues(
    audioContext.currentTime
  );

  masterGain.gain.exponentialRampToValueAtTime(
    0.75,
    audioContext.currentTime + 2
  );

}


function stopAtmosphere() {

  if (!audioContext)
    return;

  masterGain.gain.cancelScheduledValues(
    audioContext.currentTime
  );

  masterGain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 1
  );

  setTimeout(
    () => {

      try {

        if (drone)
          drone.stop();

        if (wind)
          wind.stop();

      } catch(e) {}

      drone = null;
      wind = null;

    },
    1100
  );

}


/* =========================================================
   INITIALIZATION
========================================================= */

load();

$("soundSwitch").checked =
  state.sound;

$("motionSwitch").checked =
  state.motion;

$("soundBtn").textContent =
  state.sound ? "◉" : "○";

document.body.classList.toggle(
  "reduced-motion",
  !state.motion
);

$("homeProgress").textContent =
  `${Math.round(
    (state.stage / questions.length) *