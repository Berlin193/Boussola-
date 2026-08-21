// ==========================================
// BOUSSOLA
// JavaScript Engine
// Version 0.3.0
// ==========================================

"use strict";


// ==========================================
// 1. بيانات المراحل
// ==========================================

const stages = [

    {
        chapter: "الفصل 01",
        title: "كل شيء يبدأ بسؤال",
        text:
            "قبل أن تبحث عن مستقبلك، اسأل نفسك سؤالًا بسيطًا: ماذا تريد فعلًا؟"
    },

    {
        chapter: "الفصل 01",
        title: "ثلاثة أبواب",
        text:
            "أمامك ثلاثة أبواب. لا يوجد اختيار صحيح. اختر الباب الذي يجذبك أولًا.",
        choices: [
            "الأمان — حياة مستقرة ومخاطرة أقل",
            "المعرفة — سنة كاملة لتتعلم شيئًا جديدًا",
            "المجهول — تبدأ طريقًا لا تعرف نهايته"
        ]
    },

    {
        chapter: "الفصل 02",
        title: "الخوف من الغد",
        text:
            "أحيانًا لا نخاف من المستقبل نفسه... بل من احتمال أن نفشل فيه.",
        choices: [
            "أخاف أن أفشل",
            "أخاف أن أضيع وقتي",
            "أخاف أن أبقى كما أنا"
        ]
    },

    {
        chapter: "الفصل 02",
        title: "الأمنية",
        text:
            "لو اختفى الخوف لمدة دقيقة واحدة فقط... ما أول شيء ستفعله؟",
        choices: [
            "أبدأ شيئًا كنت أؤجله",
            "أخبر شخصًا بما أشعر به",
            "أغير اتجاه حياتي"
        ]
    },

    {
        chapter: "الفصل 03",
        title: "الفشل",
        text:
            "الفشل ليس دائمًا نهاية الطريق. أحيانًا يكون معلومة لم تكن تملكها قبل أن تبدأ.",
        choices: [
            "أحاول مرة أخرى",
            "أغير الخطة",
            "أترك الأمر"
        ]
    },

    {
        chapter: "الفصل 03",
        title: "العقل تحت الضغط",
        text:
            "القلق والتفكير الزائد والتسويف قد يؤثرون في طريقة اتخاذ القرارات. هذه المرحلة للتأمل وليست تشخيصًا طبيًا.",
        choices: [
            "أفكر كثيرًا قبل أن أبدأ",
            "أبدأ ثم أقلق",
            "أؤجل حتى أشعر أنني مستعد"
        ]
    },

    {
        chapter: "الفصل 04",
        title: "ماذا لو؟",
        text:
            "تخيل أنك عدت خمس سنوات إلى الوراء. ما القرار الذي كنت تتمنى لو اتخذته؟",
        choices: [
            "التعلم",
            "العمل",
            "الشجاعة في اتخاذ قرار"
        ]
    },

    {
        chapter: "الفصل 04",
        title: "المستقبل",
        text:
            "تخيل حياتك بعد خمس سنوات إذا لم تغير أي شيء من عاداتك الحالية.",
        choices: [
            "هذا يخيفني",
            "هذا يطمئنني",
            "لا أستطيع تخيله"
        ]
    },

    {
        chapter: "الفصل 05",
        title: "المرآة",
        text:
            "هناك فرق بين الشخص الذي تراه أمام الناس... والشخص الذي تعرفه عندما تكون وحدك.",
        choices: [
            "أعرف نفسي جيدًا",
            "ما زلت أبحث عن نفسي",
            "أحيانًا لا أعرف ماذا أريد"
        ]
    },

    {
        chapter: "الفصل 05",
        title: "النمط",
        text:
            "اختياراتك بدأت تكشف نمطًا. لكن النمط ليس حكمًا عليك؛ يمكنك تغييره.",
        choices: [
            "أريد معرفة النمط",
            "أريد أن أغيره",
            "أريد الاستمرار"
        ]
    },

    {
        chapter: "THE FIRST KEY",
        title: "المستقبل لم يُكتب",
        text:
            "أنت لم تكتشف مستقبلك. أنت اكتشفت طريقة اختيارك. والاختيارات يمكن أن تتغير."
    }

];


// ==========================================
// 2. حالة التطبيق
// ==========================================

let currentStage = 0;

let selectedChoice = null;

let musicEnabled = true;

let reducedMotion = false;


// ==========================================
// 3. عناصر الصفحة
// ==========================================

const homeScreen =
    document.getElementById("home");

const journeyScreen =
    document.getElementById("journey");

const endingScreen =
    document.getElementById("ending");

const startButton =
    document.getElementById("startButton");

const backButton =
    document.getElementById("backButton");

const settingsButton =
    document.getElementById("settingsButton");

const continueButton =
    document.getElementById("continueButton");

const restartButton =
    document.getElementById("restartButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const closeSettings =
    document.getElementById("closeSettings");

const musicToggle =
    document.getElementById("musicToggle");

const motionToggle =
    document.getElementById("motionToggle");

const chapterElement =
    document.getElementById("chapter");

const stageNumberElement =
    document.getElementById("stageNumber");

const stageTitleElement =
    document.getElementById("stageTitle");

const stageTextElement =
    document.getElementById("stageText");

const choicesElement =
    document.getElementById("choices");

const progressBar =
    document.getElementById("progressBar");

const toastElement =
    document.getElementById("toast");


// ==========================================
// 4. قراءة الإعدادات المحفوظة
// ==========================================

function loadSettings() {

    const savedMusic =
        localStorage.getItem("boussola_music");

    const savedMotion =
        localStorage.getItem("boussola_motion");


    if (savedMusic !== null) {

        musicEnabled =
            savedMusic === "on";

    }


    if (savedMotion !== null) {

        reducedMotion =
            savedMotion === "reduced";

    }


    applyMotionSetting();

    updateSettingsUI();

}


// ==========================================
// 5. حفظ الإعدادات
// ==========================================

function saveSettings() {

    localStorage.setItem(
        "boussola_music",
        musicEnabled ? "on" : "off"
    );


    localStorage.setItem(
        "boussola_motion",
        reducedMotion ? "reduced" : "normal"
    );

}


// ==========================================
// 6. حفظ تقدم المستخدم
// ==========================================

function saveProgress() {

    const progress = {

        stage: currentStage,

        selectedChoice: selectedChoice,

        updatedAt: Date.now()

    };


    localStorage.setItem(
        "boussola_progress",
        JSON.stringify(progress)
    );

}


// ==========================================
// 7. تحميل التقدم
// ==========================================

function loadProgress() {

    const saved =
        localStorage.getItem(
            "boussola_progress"
        );


    if (!saved) {

        currentStage = 0;

        return;

    }


    try {

        const progress =
            JSON.parse(saved);


        if (
            Number.isInteger(progress.stage) &&
            progress.stage >= 0 &&
            progress.stage < stages.length
        ) {

            currentStage =
                progress.stage;

        }

    } catch (error) {

        currentStage = 0;

    }

}


// ==========================================
// 8. تغيير الشاشة
// ==========================================

function showScreen(screen) {

    const screens =
        document.querySelectorAll(".screen");


    screens.forEach(function(item) {

        item.classList.remove("active");

    });


    screen.classList.add("active");

}


// ==========================================
// 9. بداية الرحلة
// ==========================================

function startJourney() {

    loadProgress();

    showScreen(journeyScreen);

    renderStage();

}


// ==========================================
// 10. عرض المرحلة
// ==========================================

function renderStage() {

    const stage =
        stages[currentStage];


    if (!stage) {

        showEnding();

        return;

    }


    selectedChoice = null;


    chapterElement.textContent =
        stage.chapter;


    stageNumberElement.textContent =
        "المرحلة " +
        (currentStage + 1) +
        " / " +
        stages.length;


    stageTitleElement.textContent =
        stage.title;


    stageTextElement.textContent =
        stage.text;


    const percentage =
        ((currentStage + 1) / stages.length) * 100;


    progressBar.style.width =
        percentage + "%";


    choicesElement.innerHTML = "";


    if (stage.choices) {

        stage.choices.forEach(
            function(choice, index) {

                createChoiceButton(
                    choice,
                    index
                );

            }
        );


        continueButton.style.display =
            "none";

    } else {

        continueButton.style.display =
            "block";

    }


    saveProgress();

}


// ==========================================
// 11. إنشاء زر اختيار
// ==========================================

function createChoiceButton(
    choiceText,
    index
) {

    const button =
        document.createElement("button");


    button.type = "button";

    button.className =
        "choice";


    button.textContent =
        choiceText;


    button.addEventListener(
        "click",
        function() {

            selectChoice(
                button,
                index
            );

        }
    );


    choicesElement.appendChild(
        button
    );

}


// ==========================================
// 12. اختيار إجابة
// ==========================================

function selectChoice(
    button,
    index
) {

    const buttons =
        document.querySelectorAll(
            ".choice"
        );


    buttons.forEach(
        function(item) {

            item.classList.remove(
                "selected"
            );

        }
    );


    button.classList.add(
        "selected"
    );


    selectedChoice = index;


    continueButton.style.display =
        "block";


    saveProgress();

}


// ==========================================
// 13. الانتقال للمرحلة التالية
// ==========================================

function nextStage() {

    const stage =
        stages[currentStage];


    if (
        stage.choices &&
        selectedChoice === null
    ) {

        showToast(
            "اختار إجابة الأول"
        );

        return;

    }


    playTransition(
        function() {

            currentStage++;

            selectedChoice = null;


            if (
                currentStage >=
                stages.length
            ) {

                saveProgress();

                showEnding();

                return;

            }


            renderStage();

        }
    );

}


// ==========================================
// 14. الانتقال السينمائي
// ==========================================

function playTransition(callback) {

    if (reducedMotion) {

        callback();

        return;

    }


    journeyScreen.classList.add(
        "leaving"
    );


    setTimeout(
        function() {

            callback();

            journeyScreen.classList.remove(
                "leaving"
            );

        },
        180
    );

}


// ==========================================
// 15. الرجوع
// ==========================================

function goBack() {

    if (currentStage <= 0) {

        showScreen(homeScreen);

        return;

    }


    currentStage--;

    selectedChoice = null;

    renderStage();

}


// ==========================================
// 16. النهاية
// ==========================================

function showEnding() {

    showScreen(endingScreen);

}


// ==========================================
// 17. إعادة الرحلة
// ==========================================

function restartJourney() {

    localStorage.removeItem(
        "boussola_progress"
    );


    currentStage = 0;

    selectedChoice = null;


    showScreen(homeScreen);

}


// ==========================================
// 18. فتح الإعدادات
// ==========================================

function openSettings() {

    settingsPanel.classList.add(
        "active"
    );


    settingsPanel.setAttribute(
        "aria-hidden",
        "false"
    );


    updateSettingsUI();

}


// ==========================================
// 19. إغلاق الإعدادات
// ==========================================

function closeSettingsPanel() {

    settingsPanel.classList.remove(
        "active"
    );


    settingsPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


// ==========================================
// 20. الموسيقى
// ==========================================

function toggleMusic() {

    musicEnabled =
        !musicEnabled;


    saveSettings();

    updateSettingsUI();


    if (musicEnabled) {

        showToast(
            "الموسيقى مفعلة"
        );

    } else {

        showToast(
            "الموسيقى متوقفة"
        );

    }

}


// ==========================================
// 21. تقليل الحركة
// ==========================================

function toggleMotion() {

    reducedMotion =
        !reducedMotion;


    applyMotionSetting();

    saveSettings();

    updateSettingsUI();


    if (reducedMotion) {

        showToast(
            "تم تقليل الحركة"
        );

    } else {

        showToast(
            "الحركة عادية"
        );

    }

}


// ==========================================
// 22. تطبيق إعداد الحركة
// ==========================================

function applyMotionSetting() {

    document.body.classList.toggle(
        "reduce-motion",
        reducedMotion
    );

}


// ==========================================
// 23. تحديث واجهة الإعدادات
// ==========================================

function updateSettingsUI() {

    musicToggle.textContent =
        musicEnabled
            ? "تشغيل"
            : "إيقاف";


    motionToggle.textContent =
        reducedMotion
            ? "تقليل"
            : "عادي";

}


// ==========================================
// 24. رسالة صغيرة
// ==========================================

function showToast(message) {

    toastElement.textContent =
        message;


    toastElement.classList.add(
        "show"
    );


    clearTimeout(
        window.boussolaToastTimer
    );


    window.boussolaToastTimer =
        setTimeout(
            function() {

                toastElement.classList.remove(
                    "show"
                );

            },
            1500
        );

}


// ==========================================
// 25. اختصارات لوحة المفاتيح
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeSettingsPanel();

        }

    }
);


// ==========================================
// 26. الضغط خارج الإعدادات
// ==========================================

settingsPanel.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            settingsPanel
        ) {

            closeSettingsPanel();

        }

    }
);


// ==========================================
// 27. ربط الأزرار
// ==========================================

startButton.addEventListener(
    "click",
    startJourney
);


backButton.addEventListener(
    "click",
    goBack
);


settingsButton.addEventListener(
    "click",
    openSettings
);


closeSettings.addEventListener(
    "click",
    closeSettingsPanel
);


continueButton.addEventListener(
    "click",
    nextStage
);


restartButton.addEventListener(
    "click",
    restartJourney
);


musicToggle.addEventListener(
    "click",
    toggleMusic
);


motionToggle.addEventListener(
    "click",
    toggleMotion
);


// ==========================================
// 28. تشغيل التطبيق
// ==========================================

loadSettings();

loadProgress();

showScreen(homeScreen);