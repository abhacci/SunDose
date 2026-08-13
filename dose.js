/* =========================================
   SunDose ☀️
   Dose Selection & Sana Conversation
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".choice-card");

    const panel = document.getElementById("sanaPanel");
    const panelIcon = document.getElementById("panelIcon");
    const panelTitle = document.getElementById("panelTitle");
    const panelText = document.getElementById("panelText");
    const panelTip = document.getElementById("panelTip");
    const startDose = document.getElementById("startDose");

    if (!cards.length || !panel) return;


    /* =========================================
       رد سنا بعد اختيار العادة
       ========================================= */

    const sanaReplies = {

        sun: {
            icon: "☀️",
            title: "اختيار جميل 🌞",
            text:
                "حلو إنك اخترت الشمس. خلينا نخليها عادة بسيطة وآمنة تناسب يومك، مش مجرد قعدة طويلة تحت الشمس.",
            tip:
                "💛 الحكمة: المفيد مش دايمًا محتاج يكون كتير… المهم يكون مناسب."
        },

        water: {
            icon: "💧",
            title: "اختيار ممتاز 💧",
            text:
                "المياه بداية بسيطة جدًا، لكن تأثيرها مهم. خلينا ننظمها مع بعض بطريقة تناسب يومك بدل ما تفتكر تشرب بس لما تعطش.",
            tip:
                "💙 الحكمة: عادة صغيرة تتكرر كل يوم أقوى من قرار كبير ما نكملوش."
        },

        activity: {
            icon: "🏃",
            title: "جامد! نتحرك شوية 🏃",
            text:
                "مش محتاج تبدأ بتمرين صعب. هنختار حركة تقدر تعملها وتكررها، لأن الاستمرار أهم من إنك تتعب نفسك من أول يوم.",
            tip:
                "💚 الحكمة: خطوة صغيرة كل يوم أحسن من خطوة كبيرة مرة واحدة."
        },

        treatment: {
            icon: "💊",
            title: "اختيار مهم ❤️",
            text:
                "لو عندك علاج موصوف أو مكمل بتستخدمه، هننظمه مع بعض. بس سنا مش هتقترح عليك دواء من نفسها؛ العلاج لازم يكون مناسب لحالتك وتوجيه المختص.",
            tip:
                "❤️ الحكمة: اعرف ليه بتاخد الحاجة قبل ما تخليها جزء من روتينك."
        },

        sleep: {
            icon: "🌙",
            title: "اختيار هادي وجميل 🌙",
            text:
                "النوم جزء مهم من يومك. هنبدأ بخطوة بسيطة تساعدك تنظم وقت نومك وراحتك من غير ما نحول الموضوع لضغط.",
            tip:
                "💜 الحكمة: الراحة مش تعطيل… الراحة هي اللي بتخليك تكمل."
        }

    };


    /* =========================================
       تفاصيل الجرعات
       ========================================= */

    const doseData = {

        sun: {
            icon: "☀️",
            title: "جرعة الشمس",
            text:
                "خلينا نبدأ ببساطة. اختار الوقت اللي يناسب يومك للخروج، وسنا تساعدك تعملها عادة منتظمة مع مراعاة الأمان من الشمس.",
            options: [
                "🌅 صباحًا",
                "🌇 بعد العصر",
                "⏰ وقت مناسب لجدولي"
            ]
        },

        water: {
            icon: "💧",
            title: "جرعة المياه",
            text:
                "هنخلي شرب المياه موزع على اليوم بدل ما نحاول نشرب كمية كبيرة مرة واحدة.",
            options: [
                "💧 أبدأ بكوب دلوقتي",
                "⏰ أعمل تذكير",
                "📅 أنظمها على مدار اليوم"
            ]
        },

        activity: {
            icon: "🏃",
            title: "جرعة الحركة",
            text:
                "اختار بداية تقدر تكررها. مش هدفنا نكسر رقم قياسي؛ هدفنا نخلي الحركة جزء من يومك.",
            options: [
                "🚶 مشي",
                "🏠 حركة خفيفة في البيت",
                "🏋️ تمرين"
            ]
        },

        treatment: {
            icon: "💊",
            title: "جرعة العلاج",
            text:
                "لو عندك علاج موصوف بالفعل، نقدر ننظم مواعيده ومعلوماته. ولو عندك مكمل، نقدر نسجل بياناته بدون ما نفترض إنه مناسب لك.",
            options: [
                "💊 عندي علاج موصوف",
                "🧴 عندي مكمل",
                "📋 عايز أسجل معلوماته"
            ]
        },

        sleep: {
            icon: "🌙",
            title: "جرعة النوم",
            text:
                "نبدأ بخطوة واحدة: اختار الوقت اللي نفسك تثبت عنده موعد نومك.",
            options: [
                "🌙 أنظم وقت النوم",
                "⏰ أنظم وقت الاستيقاظ",
                "😴 أبدأ بروتين قبل النوم"
            ]
        }

    };


    let selectedType = null;


    /* =========================================
       إظهار رد سنا
       ========================================= */

    function openSanaReply(type) {

        const reply = sanaReplies[type];

        if (!reply) return;

        selectedType = type;

        panel.hidden = false;

        panelIcon.textContent = reply.icon;
        panelTitle.textContent = reply.title;
        panelText.textContent = reply.text;
        panelTip.textContent = reply.tip;

        startDose.disabled = false;
        startDose.textContent = "نكمل مع بعض 💛";

        cards.forEach(card => {
            card.classList.remove("selected");
        });

        const selectedCard = document.querySelector(
            `.choice-card[data-type="${type}"]`
        );

        if (selectedCard) {
            selectedCard.classList.add("selected");
        }

        startDose.dataset.type = type;

        setTimeout(() => {
            panel.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);

    }


    /* =========================================
       اختيار العادة
       ========================================= */

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const type = card.dataset.type;

            if (!type) return;

            openSanaReply(type);

        });

    });


    /* =========================================
       الدخول إلى الجرعة نفسها
       ========================================= */

    startDose.addEventListener("click", () => {

        const type = selectedType || startDose.dataset.type;

        if (!type || !doseData[type]) return;

        const dose = doseData[type];

        panelIcon.textContent = dose.icon;

        panelTitle.textContent = dose.title;

        panelText.textContent = dose.text;

        panelTip.textContent =
            "سنا معاك خطوة بخطوة 💛 اختار البداية اللي تناسبك:";

        startDose.hidden = true;


        /* إزالة أي اختيارات قديمة */

        const oldOptions = panel.querySelector(".dose-options");

        if (oldOptions) {
            oldOptions.remove();
        }


        /* إنشاء اختيارات الجرعة */

        const optionsBox = document.createElement("div");

        optionsBox.className = "dose-options";

        optionsBox.style.display = "flex";
        optionsBox.style.flexDirection = "column";
        optionsBox.style.gap = "12px";
        optionsBox.style.marginTop = "20px";


        dose.options.forEach(option => {

            const button = document.createElement("button");

            button.type = "button";
            button.textContent = option;

            button.style.width = "100%";
            button.style.padding = "15px 18px";
            button.style.border = "1px solid #f0d98a";
            button.style.borderRadius = "16px";
            button.style.background = "#fffaf0";
            button.style.color = "#4b4032";
            button.style.fontSize = "16px";
            button.style.fontFamily = "inherit";
            button.style.cursor = "pointer";


            button.addEventListener("click", () => {

                optionsBox.querySelectorAll("button").forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = "0.55";
                });

                button.disabled = false;
                button.style.opacity = "1";

                panelTitle.textContent = "تمام جدًا 💛";

                panelText.textContent =
                    "اختيار حلو. كده بدأنا أول خطوة فعلية في جرعتك. سنا هتكمل معاك الخطوة اللي بعدها واحدة واحدة، من غير استعجال.";

                panelTip.textContent =
                    "☀️ أهم حاجة مش إنك تعمل كل حاجة النهارده… أهم حاجة إنك تبدأ بحاجة تقدر تكمل عليها.";

                const continueButton = document.createElement("button");

                continueButton.type = "button";
                continueButton.textContent = "نكمل يا سنا 💛";

                continueButton.style.width = "100%";
                continueButton.style.marginTop = "18px";
                continueButton.style.padding = "15px";
                continueButton.style.border = "0";
                continueButton.style.borderRadius = "16px";
                continueButton.style.background = "#f6b51b";
                continueButton.style.color = "#fff";
                continueButton.style.fontSize = "17px";
                continueButton.style.fontFamily = "inherit";
                continueButton.style.fontWeight = "700";
                continueButton.style.cursor = "pointer";

                continueButton.addEventListener("click", () => {

                    panelTitle.textContent =
                        "جرعتك بدأت ☀️";

                    panelText.textContent =
                        "ممتاز. خليك معايا، وهنبني عادتك خطوة بخطوة حسب بياناتك واختياراتك.";

                    panelTip.textContent =
                        "💛 سنا مش مستعجلة عليك… المهم إن كل خطوة تكون مناسبة ليك.";

                    continueButton.remove();

                });

                panel.querySelector(".panel-content")
                    .appendChild(continueButton);

            });

            optionsBox.appendChild(button);

        });


        panel.querySelector(".panel-content")
            .appendChild(optionsBox);


        setTimeout(() => {

            panel.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    });

});
