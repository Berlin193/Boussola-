"use strict";

const screens = {
    home: document.getElementById("homeScreen"),
    journey: document.getElementById("journeyScreen"),
    chapters: document.getElementById("chaptersScreen"),
    profile: document.getElementById("profileScreen")
};

const startButton = document.getElementById("startButton");

const choicesContainer =
    document.getElementById("choices");

const continueButton =
    document.getElementById("continueButton");

const questionTitle =
    document.getElementById("questionTitle");

const questionText =
    document.getElementById("questionText");

const chapterNumber =
    document.getElementById("chapterNumber");

const chapterTitle =
    document.getElementById("chapterTitle");

const stageLabel =
    document.getElementById("stageLabel");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const chaptersList =
    document.getElementById("chaptersList");

const settingsOverlay =
    document.getElementById("settingsOverlay");

const toast =
    document.getElementById("toast");

let currentNode = "start";

let selectedChoice = null;

let musicEnabled =
    localStorage.getItem("boussola_music") !== "off";

let reducedMotion =
    localStorage.getItem("boussola_motion") === "on";

const journey = {

    start: {

        chapter: "الفصل الأول",

        chapterTitle: "البداية",

        label: "البداية",

        title: "كل شيء يبدأ بسؤال",

        text:
            "قبل أن تبحث عن مستقبلك اسأل نفسك ماذا تريد فعلًا؟",

        choices: [

            {
                text: "أبحث عن الأمان",
                next: "safety_01",
                stats: {
                    ambition: 0,
                    courage: 1,
                    curiosity: 0,
                    change: 1
                }
            },

            {
                text: "أبحث عن النجاح",
                next: "success_01",
                stats: {
                    ambition: 2,
                    courage: 1,
                    curiosity: 0,
                    change: 0
                }
            },

            {
                text: "أبحث عن المجهول",
                next: "unknown_01",
                stats: {
                    ambition: 1,
                    courage: 2,
                    curiosity: 2,
                    change: 2
                }
            }

        ]

    },


    safety_01: {

        chapter: "الفصل الأول",

        chapterTitle: "البداية",

        label: "طريق الأمان",

        title: "ماذا تخشى أن تخسر؟",

        text:
            "أحيانًا لا نبحث عن الأمان لأننا نحبه فقط بل لأن هناك شيئًا نخاف أن نفقده.",

        choices: [

            {
                text: "الاستقرار",
                next: "safety_02",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 0,
                    change: 0
                }
            },

            {
                text: "الأشخاص الذين أحبهم",
                next: "fear_01",
                stats: {
                    ambition: 0,
                    courage: 1,
                    curiosity: 1,
                    change: 0
                }
            },

            {
                text: "نفسي التي أعرفها",
                next: "mirror_01",
                stats: {
                    ambition: 1,
                    courage: 1,
                    curiosity: 2,
                    change: 1
                }
            }

        ]

    },


    success_01: {

        chapter: "الفصل الأول",

        chapterTitle: "البداية",

        label: "طريق الطموح",

        title: "لو وصلت ماذا بعد؟",

        text:
            "تخيل أنك وصلت إلى الشيء الذي تحلم به منذ سنوات. ماذا ستفعل بعد ذلك؟",

        choices: [

            {
                text: "أبحث عن هدف أكبر",
                next: "ambition_01",
                stats: {
                    ambition: 2,
                    courage: 1,
                    curiosity: 1,
                    change: 1
                }
            },

            {
                text: "أعيش بهدوء",
                next: "safety_02",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 1,
                    change: 0
                }
            },

            {
                text: "لا أعرف",
                next: "future_01",
                stats: {
                    ambition: 1,
                    courage: 0,
                    curiosity: 2,
                    change: 1
                }
            }

        ]

    },


    unknown_01: {

        chapter: "الفصل الأول",

        chapterTitle: "البداية",

        label: "طريق المجهول",

        title: "هل تستطيع ألا تعرف؟",

        text:
            "المجهول لا يخيف الجميع بنفس الطريقة. أحيانًا يكون الخوف الحقيقي هو ألا تعرف إلى أين ستصل.",

        choices: [

            {
                text: "أجرب حتى لو فشلت",
                next: "failure_01",
                stats: {
                    ambition: 1,
                    courage: 2,
                    curiosity: 2,
                    change: 2
                }
            },

            {
                text: "أحتاج خطة أولًا",
                next: "mind_01",
                stats: {
                    ambition: 1,
                    courage: 0,
                    curiosity: 2,
                    change: 0
                }
            },

            {
                text: "أعود للطريق الآمن",
                next: "safety_01",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 1,
                    change: 0
                }
            }

        ]

    },


    safety_02: {

        chapter: "الفصل الثاني",

        chapterTitle: "الخوف",

        label: "الفصل الثاني",

        title: "ماذا لو تغير كل شيء؟",

        text:
            "لو تغيرت حياتك فجأة هل ستتمسك بما تعرفه أم تسمح لنفسك بأن تبدأ من جديد؟",

        choices: [

            {
                text: "أتمسك بما أعرفه",
                next: "fear_01",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 0,
                    change: 0
                }
            },

            {
                text: "أحاول التكيف",
                next: "change_01",
                stats: {
                    ambition: 1,
                    courage: 1,
                    curiosity: 1,
                    change: 2
                }
            },

            {
                text: "أبدأ من الصفر",
                next: "future_01",
                stats: {
                    ambition: 2,
                    courage: 2,
                    curiosity: 1,
                    change: 2
                }
            }

        ]

    },


    fear_01: {

        chapter: "الفصل الثاني",

        chapterTitle: "الخوف",

        label: "الخوف",

        title: "الخوف لا يتحدث بصوت واحد",

        text:
            "هناك خوف يجعلك تتراجع وخوف آخر يجعلك تستعد وخوف ثالث يجعلك تغير الطريق بالكامل.",

        choices: [

            {
                text: "أتراجع",
                next: "mind_01",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 1,
                    change: 0
                }
            },

            {
                text: "أستعد",
                next: "future_01",
                stats: {
                    ambition: 1,
                    courage: 1,
                    curiosity: 2,
                    change: 1
                }
            },

            {
                text: "أواجهه",
                next: "failure_01",
                stats: {
                    ambition: 1,
                    courage: 2,
                    curiosity: 2,
                    change: 2
                }
            }

        ]

    },


    mirror_01: {

        chapter: "الفصل الثاني",

        chapterTitle: "الخوف",

        label: "المرآة",

        title: "من أنت عندما لا يراك أحد؟",

        text:
            "بعيدًا عن توقعات الآخرين توجد نسخة منك لا تحتاج إلى إثبات أي شيء.",

        choices: [

            {
                text: "أعرفها",
                next: "mind_01",
                stats: {
                    ambition: 1,
                    courage: 1,
                    curiosity: 2,
                    change: 1
                }
            },

            {
                text: "ما زلت أبحث عنها",
                next: "future_01",
                stats: {
                    ambition: 1,
                    courage: 0,
                    curiosity: 2,
                    change: 2
                }
            },

            {
                text: "أخاف منها",
                next: "fear_01",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 2,
                    change: 0
                }
            }

        ]

    },


    ambition_01: {

        chapter: "الفصل الثالث",

        chapterTitle: "الطموح",

        label: "الطموح",

        title: "كم يكفي؟",

        text:
            "هناك لحظة يصبح فيها الوصول أقل أهمية من السؤال عن سبب رغبتك في الوصول.",

        choices: [

            {
                text: "لن أتوقف",
                next: "future_01",
                stats: {
                    ambition: 2,
                    courage: 2,
                    curiosity: 0,
                    change: 1
                }
            },

            {
                text: "أريد حياة متوازنة",
                next: "change_01",
                stats: {
                    ambition: 1,
                    courage: 1,
                    curiosity: 1,
                    change: 1
                }
            },

            {
                text: "لا أعرف ماذا أريد",
                next: "mirror_01",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 2,
                    change: 1
                }
            }

        ]

    },


    future_01: {

        chapter: "الفصل الثالث",

        chapterTitle: "المستقبل",

        label: "المستقبل",

        title: "خمس سنوات من الآن",

        text:
            "تخيل نفسك بعد خمس سنوات. هل تخاف أكثر مما ستصبح عليه أم مما قد لا تصبح عليه؟",

        choices: [

            {
                text: "أخاف أن أفشل",
                next: "failure_01",
                stats: {
                    ambition: 1,
                    courage: 0,
                    curiosity: 1,
                    change: 1
                }
            },

            {
                text: "أخاف أن أبقى كما أنا",
                next: "change_01",
                stats: {
                    ambition: 1,
                    courage: 1,
                    curiosity: 1,
                    change: 2
                }
            },

            {
                text: "متحمس لما سيحدث",
                next: "ambition_01",
                stats: {
                    ambition: 2,
                    courage: 2,
                    curiosity: 2,
                    change: 2
                }
            }

        ]

    },


    failure_01: {

        chapter: "الفصل الرابع",

        chapterTitle: "السقوط",

        label: "الفشل",

        title: "لو فشلت الآن",

        text:
            "الفشل لا يخبرك دائمًا أنك غير قادر. أحيانًا يخبرك أن الطريقة التي استخدمتها لم تكن مناسبة.",

        choices: [

            {
                text: "أحاول مرة أخرى",
                next: "change_01",
                stats: {
                    ambition: 2,
                    courage: 2,
                    curiosity: 1,
                    change: 2
                }
            },

            {
                text: "أغير الخطة",
                next: "mind_01",
                stats: {
                    ambition: 1,
                    courage: 1,
                    curiosity: 2,
                    change: 2
                }
            },

            {
                text: "أحتاج وقتًا",
                next: "mirror_01",
                stats: {
                    ambition: 0,
                    courage: 1,
                    curiosity: 1,
                    change: 1
                }
            }

        ]

    },


    mind_01: {

        chapter: "الفصل الرابع",

        chapterTitle: "العقل",

        label: "العقل",

        title: "عندما لا يتوقف التفكير",

        text:
            "أحيانًا ننتظر اللحظة المثالية حتى لا نرتكب خطأ. لكن الانتظار نفسه قد يصبح قرارًا.",

        choices: [

            {
                text: "أبدأ رغم عدم اليقين",
                next: "change_01",
                stats: {
                    ambition: 1,
                    courage: 2,
                    curiosity: 2,
                    change: 2
                }
            },

            {
                text: "أجمع معلومات أكثر",
                next: "future_01",
                stats: {
                    ambition: 1,
                    courage: 0,
                    curiosity: 2,
                    change: 1
                }
            },

            {
                text: "أتوقف",
                next: "fear_01",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 1,
                    change: 0
                }
            }

        ]

    },


    change_01: {

        chapter: "الفصل الخامس",

        chapterTitle: "التغيير",

        label: "التغيير",

        title: "قرار صغير",

        text:
            "ليست كل التغييرات كبيرة. أحيانًا يبدأ طريق جديد بقرار صغير لا يراه أحد غيرك.",

        choices: [

            {
                text: "أغير شيئًا اليوم",
                next: "ambition_01",
                stats: {
                    ambition: 2,
                    courage: 2,
                    curiosity: 1,
                    change: 2
                }
            },

            {
                text: "أراقب أولًا",
                next: "mirror_01",
                stats: {
                    ambition: 0,
                    courage: 0,
                    curiosity: 2,
                    change: 1
                }
            },

            {
                text: "أحتاج دفعة",
                next: "failure_01",
                stats: {
                    ambition: 1,
                    courage: 1,
                    curiosity: 1,
                    change: 2
                }
            }

        ]

    }

};


let stats = {
    ambition: 0,
    courage: 0,
    curiosity: 0,
    change: 0
};


function showScreen(name) {

    Object.values(screens).forEach(function(screen) {
        screen.classList.remove("active");
    });

    screens[name].classList.add("active");

    updateNavigation(name);
}


function updateNavigation(name) {

    document
        .querySelectorAll(".nav-item")
        .forEach(function(item) {
            item.classList.remove("active");
        });

    if (name === "home") {
        document
            .getElementById("navHome")
            .classList.add("active");
    }

    if (name === "chapters") {
        document
            .getElementById("navChapters")
            .classList.add("active");
    }

    if (name === "profile") {
        document
            .getElementById("navProfile")
            .classList.add("active");
    }
}


function loadData() {

    const saved =
        localStorage.getItem("boussola_data");

    if (!saved) {
        return;
    }

    try {

        const data = JSON.parse(saved);

        currentNode =
            data.currentNode || "start";

        stats =
            data.stats || stats;

    } catch (error) {

        currentNode = "start";

    }
}


function saveData() {

    localStorage.setItem(
        "boussola_data",
        JSON.stringify({
            currentNode,
            stats
        })
    );
}


function renderQuestion() {

    const node =
        journey[currentNode];

    if (!node) {
        return;
    }

    chapterNumber.textContent =
        node.chapter;

    chapterTitle.textContent =
        node.chapterTitle;

    stageLabel.textContent =
        node.label;

    questionTitle.textContent =
        node.title;

    questionText.textContent =
        node.text;

    progressText.textContent =
        String(currentNode.length).padStart(2, "0");

    progressBar.style.width =
        Math.min(
            95,
            8 + currentNode.length * 4
        ) + "%";

    choicesContainer.innerHTML = "";

    continueButton.style.display =
        "none";

    selectedChoice = null;

    node.choices.forEach(function(choice, index) {

        const button =
            document.createElement("button");

        button.className = "choice";

        button.textContent =
            choice.text;

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".choice")
                    .forEach(function(item) {
                        item.classList.remove("selected");
                    });

                button.classList.add("selected");

                selectedChoice = choice;

                continueButton.style.display =
                    "flex";

            }
        );

        choicesContainer.appendChild(button);

    });
}


function startJourney() {

    loadData();

    showScreen("journey");

    renderQuestion();
}


function continueJourney() {

    if (!selectedChoice) {

        showToast("اختر إجابة أولًا");

        return;
    }

    const choice =
        selectedChoice;

    stats.ambition +=
        choice.stats.ambition;

    stats.courage +=
        choice.stats.courage;

    stats.curiosity +=
        choice.stats.curiosity;

    stats.change +=
        choice.stats.change;

    currentNode =
        choice.next;

    saveData();

    renderQuestion();
}


function buildChapters() {

    const chapters = [

        ["01", "البداية", "الاختيارات الأولى"],

        ["02", "الخوف", "الأشياء التي لا نقولها"],

        ["03", "المستقبل", "الطريق الذي لم تره بعد"],

        ["04", "السقوط", "عندما لا تسير الأمور كما تريد"],

        ["05", "التغيير", "القرار الذي يبدأ كل شيء"],

        ["06", "الطموح", "إلى أي مكان تريد الوصول"],

        ["07", "المتاهة", "بعض الطرق لا تظهر للجميع"],

        ["08", "الأمنيات", "ما تريده عندما لا يراك أحد"],

        ["09", "المجهول", "الجزء الذي لا يمكن توقعه"],

        ["10", "المرآة", "ما تكشفه اختياراتك"]

    ];

    chaptersList.innerHTML = "";

    chapters.forEach(function(chapter, index) {

        const card =
            document.createElement("div");

        card.className =
            "chapter-card";

        if (index > 1) {
            card.classList.add("locked");
        }

        card.innerHTML = `
            <span class="chapter-card-number">
                الفصل ${chapter[0]}
            </span>

            <h3>
                ${chapter[1]}
            </h3>

            <p>
                ${chapter[2]}
            </p>

            <div
                class="chapter-card-progress"
                style="width:${index === 0 ? 100 : index === 1 ? 45 : 0}%"
            ></div>
        `;

        chaptersList.appendChild(card);

    });
}


function updateProfile() {

    document.getElementById(
        "ambitionStat"
    ).textContent = stats.ambition;

    document.getElementById(
        "courageStat"
    ).textContent = stats.courage;

    document.getElementById(
        "curiosityStat"
    ).textContent = stats.curiosity;

    document.getElementById(
        "changeStat"
    ).textContent = stats.change;


    const total =
        stats.ambition +