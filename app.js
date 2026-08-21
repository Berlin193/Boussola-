"use strict";

/* =========================================
   BOUSSOLA
   Main Application
========================================= */

const state = {
    currentScreen: "home",
    currentStage: 0,
    currentChapter: 1,
    progress: 12,
    answers: [],
    music: true,
    reducedMotion: false
};


/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY = "boussoula_progress_v1";

function saveProgress() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                currentStage: state.currentStage,
                currentChapter: state.currentChapter,
                progress: state.progress,
                answers: state.answers,
                music: state.music,
                reducedMotion: state.reducedMotion
            })
        );
    } catch (error) {
        console.log("Save error:", error);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return;
        }

        const data = JSON.parse(saved);

        if (typeof data.currentStage === "number") {
            state.currentStage = data.currentStage;
        }

        if (typeof data.currentChapter === "number") {
            state.currentChapter = data.currentChapter;
        }

        if (typeof data.progress === "number") {
            state.progress = data.progress;
        }

        if (Array.isArray(data.answers)) {
            state.answers = data.answers;
        }

        if (typeof data.music === "boolean") {
            state.music = data.music;
        }

        if (typeof data.reducedMotion === "boolean") {
            state.reducedMotion = data.reducedMotion;
        }

    } catch (error) {
        console.log("Load error:", error);
    }
}


/* =========================================
   DOM
========================================= */

const screens = document.querySelectorAll(".screen");

const settings = document.getElementById("settings");

const startJourneyButton =
    document.getElementById("startJourney");

const closeSettingsButton =
    document.getElementById("closeSettings");

const musicSwitch =
    document.getElementById("musicSwitch");

const motionSwitch =
    document.getElementById("motionSwitch");


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(screenName) {

    const target = document.getElementById(screenName);

    if (!target) {
        return;
    }

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    target.classList.add("active");

    state.currentScreen = screenName;

    updateNavigation();

    window.scrollTo(0, 0);
}

function updateNavigation() {

    document.querySelectorAll(".bottom-nav").forEach(function(nav) {

        nav.querySelectorAll("button").forEach(function(button) {

            button.classList.remove("active");

            const target =
                button.getAttribute("data-screen");

            if (target === state.currentScreen) {
                button.classList.add("active");
            }

        });

    });
}


/* =========================================
   SETTINGS
========================================= */

function openSettings() {

    if (!settings) {
        return;
    }

    settings.classList.add("active");
}

function closeSettings() {

    if (!settings) {
        return;
    }

    settings.classList.remove("active");
}

function setupSettings() {

    const settingButtons = [
        "homeSettings",
        "settingsFromChapters",
        "settingsFromMap",
        "settingsFromProfile"
    ];

    settingButtons.forEach(function(id) {

        const button = document.getElementById(id);

        if (!button) {
            return;
        }

        button.addEventListener("click", function() {
            openSettings();
        });

    });


    if (closeSettingsButton) {

        closeSettingsButton.addEventListener(
            "click",
            closeSettings
        );

    }


    if (settings) {

        settings.addEventListener(
            "click",
            function(event) {

                if (event.target === settings) {
                    closeSettings();
                }

            }
        );

    }


    if (musicSwitch) {

        musicSwitch.checked = state.music;

        musicSwitch.addEventListener(
            "change",
            function() {

                state.music = musicSwitch.checked;

                saveProgress();

            }
        );

    }


    if (motionSwitch) {

        motionSwitch.checked =
            state.reducedMotion;

        motionSwitch.addEventListener(
            "change",
            function() {

                state.reducedMotion =
                    motionSwitch.checked;

                document.body.classList.toggle(
                    "reduced-motion",
                    state.reducedMotion
                );

                saveProgress();

            }
        );

    }

}


/* =========================================
   BACK BUTTONS
========================================= */

function setupBackButtons() {

    document.querySelectorAll(
        "[data-back]"
    ).forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const destination =
                    button.getAttribute("data-back");

                showScreen(destination);

            }
        );

    });

}


/* =========================================
   BOTTOM NAVIGATION
========================================= */

function setupNavigation() {

    document.querySelectorAll(
        "[data-screen]"
    ).forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const destination =
                    button.getAttribute("data-screen");

                showScreen(destination);

            }
        );

    });

}


/* =========================================
   START JOURNEY
========================================= */

function startJourney() {

    state.currentStage = 0;

    showScreen("journey");

    renderStage();

    saveProgress();
}

if (startJourneyButton) {

    startJourneyButton.addEventListener(
        "click",
        startJourney
    );

}


/* =========================================
   JOURNEY DATA
========================================= */

const stages = [

    {
        chapter: 1,
        number: "01",
        title: "ماذا تبحث<br>عنه الآن؟",
        description: "اختر ما يعبر عنك أكثر",

        answers: [
            {
                text: "الأمان",
                icon: "◇",
                next: 1,
                type: "security"
            },
            {
                text: "النجاح",
                icon: "★",
                next: 2,
                type: "success"
            },
            {
                text: "المجهول",
                icon: "?",
                next: 3,
                type: "unknown"
            }
        ]
    },


    {
        chapter: 1,
        number: "02",
        title: "لو اختفى<br>الخوف ماذا ستفعل؟",
        description: "أحيانًا يمنعنا الخوف من رؤية الطريق",

        answers: [
            {
                text: "أبدأ من جديد",
                icon: "↗",
                next: 4,
                type: "restart"
            },
            {
                text: "أحقق حلمًا قديمًا",
                icon: "★",
                next: 5,
                type: "dream"
            },
            {
                text: "أبحث عن إجابة",
                icon: "?",
                next: 6,
                type: "answer"
            }
        ]
    },


    {
        chapter: 1,
        number: "03",
        title: "ماذا لو فشلت<br>مرة أخرى؟",
        description: "الفشل ليس دائمًا نهاية الطريق",

        answers: [
            {
                text: "سأحاول مرة أخرى",
                icon: "↻",
                next: 4,
                type: "resilience"
            },
            {
                text: "سأغير الطريق",
                icon: "◇",
                next: 5,
                type: "change"
            },
            {
                text: "سأتوقف قليلًا",
                icon: "Ⅱ",
                next: 6,
                type: "pause"
            }
        ]
    },


    {
        chapter: 1,
        number: "04",
        title: "ما الشيء الذي<br>لا تريد خسارته؟",
        description: "أجابتك تكشف شيئًا عن أولوياتك",

        answers: [
            {
                text: "نفسي",
                icon: "✦",
                next: 7,
                type: "self"
            },
            {
                text: "من أحبهم",
                icon: "♡",
                next: 7,
                type: "people"
            },
            {
                text: "مستقبلي",
                icon: "∞",
                next: 7,
                type: "future"
            }
        ]
    },


    {
        chapter: 2,
        number: "05",
        title: "هل أنت خائف<br>من المستقبل؟",
        description: "الخوف من المجهول جزء من الإنسان",

        answers: [
            {
                text: "نعم",
                icon: "!",
                next: 8,
                type: "fear"
            },
            {
                text: "أحيانًا",
                icon: "◇",
                next: 8,
                type: "sometimes"
            },
            {
                text: "لا",
                icon: "✓",
                next: 8,
                type: "brave"
            }
        ]
    },


    {
        chapter: 2,
        number: "06",
        title: "لو كان بإمكانك<br>تغيير شيء واحد؟",
        description: "ماضيك أم مستقبلك؟",

        answers: [
            {
                text: "الماضي",
                icon: "←",
                next: 9,
                type: "past"
            },
            {
                text: "الحاضر",
                icon: "●",
                next: 9,
                type: "present"
            },
            {
                text: "المستقبل",
                icon: "→",
                next: 9,
                type: "future"
            }
        ]
    },


    {
        chapter: 2,
        number: "07",
        title: "ماذا تتمنى<br>أن تصبح؟",
        description: "لا توجد إجابة صغيرة على سؤال كبير",

        answers: [
            {
                text: "شخصًا أقوى",
                icon: "✦",
                next: 10,
                type: "strong"
            },
            {
                text: "شخصًا حرًا",
                icon: "∞",
                next: 10,
                type: "free"
            },
            {
                text: "شخصًا ناجحًا",
                icon: "★",
                next: 10,
                type: "successful"
            }
        ]
    },


    {
        chapter: 2,
        number: "08",
        title: "هل تختار<br>الطريق السهل؟",
        description: "بعض الطرق السهلة لا تصل إلى الأماكن التي نحلم بها",

        answers: [
            {
                text: "نعم",
                icon: "→",
                next: 11,
                type: "easy"
            },
            {
                text: "لا",
                icon: "↗",
                next: 11,
                type: "hard"
            },
            {
                text: "حسب الموقف",
                icon: "◇",
                next: 11,
                type: "balanced"
            }
        ]
    },


    {
        chapter: 3,
        number: "09",
        title: "متى تشعر<br>أنك أقوى؟",
        description: "القوة ليست دائمًا في عدم السقوط",

        answers: [
            {
                text: "بعد الفشل",
                icon: "↻",
                next: 12,
                type: "failure"
            },
            {
                text: "عندما أساعد غيري",
                icon: "♡",
                next: 12,
                type: "help"
            },
            {
                text: "عندما أكون وحدي",
                icon: "◇",
                next: 12,
                type: "alone"
            }
        ]
    },


    {
        chapter: 3,
        number: "10",
        title: "ما الذي<br>يوقظك من الداخل؟",
        description: "هناك دائمًا شيء لا يعرفه الآخرون عنك",

        answers: [
            {
                text: "حلمي",
                icon: "★",
                next: 13,
                type: "dream"
            },
            {
                text: "خوفي",
                icon: "!",
                next: 13,
                type: "fear"
            },
            {
                text: "فضولي",
                icon: "?",
                next: 13,
                type: "curiosity"
            }
        ]
    },


    {
        chapter: 3,
        number: "11",
        title: "لو عرفت أن<br>الفشل مؤقت؟",
        description: "هل ستخاطر أكثر؟",

        answers: [
            {
                text: "بالتأكيد",
                icon: "↗",
                next: 14,
                type: "risk"
            },
            {
                text: "ربما",
                icon: "◇",
                next: 14,
                type: "maybe"
            },
            {
                text: "لا",
                icon: "×",
                next: 14,
                type: "safe"
            }
        ]
    },


    {
        chapter: 3,
        number: "12",
        title: "من تكون<br>عندما لا يراك أحد؟",
        description: "هذا السؤال ليس للآخرين",

        answers: [
            {
                text: "أنا الحقيقي",
                icon: "✦",
                next: 15,
                type: "real"
            },
            {
                text: "شخص مختلف",
                icon: "◇",
                next: 15,
                type: "different"
            },
            {
                text: "لا أعرف",
                icon: "?",
                next: 15,
                type: "unknown"
            }
        ]
    },


    {
        chapter: 4,
        number: "13",
        title: "هل تريد أن<br>يفهمك الآخرون؟",
        description: "أم أنك تعودت ألا تشرح نفسك؟",

        answers: [
            {
                text: "أريد أن يفهموني",
                icon: "♡",
                next: 16,
                type: "understood"
            },
            {
                text: "لا يهم",
                icon: "◇",
                next: 16,
                type: "independent"
            },
            {
                text: "أحيانًا",
                icon: "∞",
                next: 16,
                type: "sometimes"
            }
        ]
    },


    {
        chapter: 4,
        number: "14",
        title: "لو عاد بك<br>الزمن؟",
        description: "ماذا ستقول لنفسك القديمة؟",

        answers: [
            {
                text: "لا تخف",
                icon: "✦",
                next: 17,
                type: "dontfear"
            },
            {
                text: "استمر",
                icon: "→",
                next: 17,
                type: "continue"
            },
            {
                text: "استمتع أكثر",
                icon: "◇",
                next: 17,
                type: "enjoy"
            }
        ]
    },


    {
        chapter: 4,
        number: "15",
        title: "ما الشيء الذي<br>تطارده؟",
        description: "ربما الإجابة ليست كما تتوقع",

        answers: [
            {
                text: "المال",
                icon: "$",
                next: 18,
                type: "money"
            },
            {
                text: "النجاح",
                icon: "★",
                next: 18,
                type: "success"
            },
            {
                text: "السلام",
                icon: "◇",
                next: 18,
                type: "peace"
            }
        ]
    },


    {
        chapter: 4,
        number: "16",
        title: "ماذا لو كان<br>كل شيء ممكنًا؟",
        description: "تخيل للحظة فقط",

        answers: [
            {
                text: "أغير حياتي",
                icon: "↗",
                next: 19,
                type: "life"
            },
            {
                text: "أساعد غيري",
                icon: "♡",
                next: 19,
                type: "help"
            },
            {
                text: "أبحث عن الحقيقة",
                icon: "?",
                next: 19,
                type: "truth"
            }
        ]
    },


    {
        chapter: 5,
        number: "17",
        title: "هل أنت مستعد<br>لمعرفة المزيد؟",
        description: "المرحلة التالية أعمق",

        answers: [
            {
                text: "نعم",
                icon: "→",
                next: 20,
                type: "yes"
            },
            {
                text: "أحتاج وقتًا",
                icon: "Ⅱ",
                next: 20,
                type: "wait"
            },
            {
                text: "لا أعرف",
                icon: "?",
                next: 20,
                type: "unknown"
            }
        ]
    },


    {
        chapter: 5,
        number: "18",
        title: "ما أكثر شيء<br>يخيفك؟",
        description: "لا تحتاج أن تقول الإجابة بصوت مرتفع",

        answers: [
            {
                text: "الفشل",
                icon: "!",
                next: 21,
                type: "failure"
            },
            {
                text: "الوحدة",
                icon: "◇",
                next: 21,
                type: "loneliness"
            },
            {
                text: "المستقبل",
                icon: "?",
                next: 21,
                type: "future"
            }
        ]
    },


    {
        chapter: 5,
        number: "19",
        title: "ماذا ستفعل<br>لو نجحت؟",
        description: "النجاح لا ينهي الأسئلة",

        answers: [
            {
                text: "أكمل",
                icon: "→",
                next: 22,
                type: "continue"
            },
            {
                text: "أرتاح",
                icon: "◇",
                next: 22,
                type: "rest"
            },
            {
                text: "أبدأ حلمًا جديدًا",
                icon: "★",
                next: 22,
                type: "dream"
            }
        ]
    },


    {
        chapter: 5,
        number: "20",
        title: "وأخيرًا...",
        description: "هل ما زلت تعرف إلى أين أنت ذاهب؟",

        answers: [
            {
                text: "نعم",
                icon: "✓",
                next: 23,
                type: "yes"
            },
            {
                text: "لا",
                icon: "?",
                next: 23,
                type: "no"
            },
            {
                text: "سأكتشف",
                icon: "✦",
                next: 23,
                type: "discover"
            }
        ]
    },


    {
        chapter: 6,
        number: "21",
        title: "لو اضطررت<br>للاختيار...",
        description: "بين ما تريده وما تحتاجه",

        answers: [
            {
                text: "ما أريده",
                icon: "★",
                next: 24,
                type: "want"
            },
            {
                text: "ما أحتاجه",
                icon: "◇",
                next: 24,
                type: "need"
            },
            {
                text: "أبحث عن حل ثالث",
                icon: "∞",
                next: 24,
                type: "third"
            }
        ]
    },


    {
        chapter: 6,
        number: "22",
        title: "هل تستطيع<br>البدء من الصفر؟",
        description: "الصفر ليس دائمًا نهاية",

        answers: [
            {
                text: "نعم",
                icon: "↗",
                next: 25,
                type: "start"
            },
            {
                