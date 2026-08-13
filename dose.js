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


    const sanaReplies = {

        sun: {
            icon: "☀️",

            title: "الشمس ممكن تكون بداية جميلة",

            text:
                "التعرّض للشمس في الوقت والمدة المناسبين ممكن يساعد جسمك في تكوين فيتامين D. المهم إننا نخلي التعرض آمن ومناسب ليك، مش مجرد وقت طويل في الشمس.",

            tip:
                "💛 الحكمة: مش كل حاجة مفيدة لما نزودها… أحيانًا الصح هو إننا نعرف القدر المناسب.",

            button: "ابدأ جرعة الشمس ☀️"
        },


        water: {
            icon: "💧",

            title: "نبدأ بالمياه؟ اختيار بسيط ومهم",

            text:
                "المياه أساسية لجسمك، والترطيب الجيد بيساعد جسمك يحافظ على وظائفه الطبيعية. بدل ما نفتكر نشرب لما نعطش جدًا، نقدر نخلي شرب المياه عادة موزعة على اليوم.",

            tip:
                "💙 الحكمة: العادات الصغيرة اللي بتتكرر كل يوم أقوى من الحماس اللي بيظهر يوم ويختفي أسبوع.",

            button: "ابدأ جرعة المياه 💧"
        },


        activity: {
            icon: "🏃",

            title: "حركة بسيطة ممكن تغيّر يومك",

            text:
                "مش لازم تبدأ بتمرين صعب. المشي أو أي حركة مناسبة لمستواك تعتبر بداية كويسة. هدفنا إن جسمك يتحرك بشكل منتظم وبطريقة تقدر تستمر عليها.",

            tip:
                "💚 الحكمة: مش مهم تبدأ بأقوى خطوة… المهم تبدأ بخطوة تقدر تكررها.",

            button: "ابدأ جرعة الحركة 🏃"
        },


        treatment: {
            icon: "💊",

            title: "العلاج والمكملات محتاجين اهتمام",

            text:
                "لو عندك علاج موصوف من طبيب أو مكمل بتستخدمه، سنا تساعدك تنظم معلوماته وتفتكره في وقته. لكن مش هنعتبر أي دواء أو مكمل علاجًا لمجرد إنه موجود.",

            tip:
                "❤️ الحكمة: صحتك مش مكان للتجربة… اسأل المختص، واعرف ليه بتاخد الحاجة قبل ما تدخلها في روتينك.",

            button: "ابدأ جرعة العلاج 💊"
        },


        sleep: {
            icon: "🌙",

            title: "النوم جزء من الجرعة كمان",

            text:
                "النوم والراحة بيدوا جسمك فرصة يستعيد نشاطه. تنظيم وقت النوم والاستيقاظ ممكن يكون من أبسط العادات اللي نبدأ بيها.",

            tip:
                "💜 الحكمة: الراحة مش تضييع وقت… الراحة جزء من الاستمرار.",

            button: "ابدأ جرعة النوم 🌙"
        }

    };


    function openSanaReply(type) {

        const reply = sanaReplies[type];

        if (!reply) return;


        panel.hidden = false;

        panelIcon.textContent = reply.icon;

        panelTitle.textContent = reply.title;

        panelText.textContent = reply.text;

        panelTip.textContent = reply.tip;

        startDose.textContent = reply.button;


        cards.forEach(card => {
            card.classList.remove("selected");
        });


        const selectedCard = document.querySelector(
            `.choice-card[data-type="${type}"]`
        );

        if (selectedCard) {
            selectedCard.classList.add("selected");
        }


        panel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        startDose.dataset.type = type;
    }


    cards.forEach(card => {

        card.addEventListener("click", () => {

            const type = card.dataset.type;

            openSanaReply(type);

        });

    });


    startDose.addEventListener("click", () => {

        const type = startDose.dataset.type;

        if (!type) return;


        /*
         * المرحلة التالية هنربطها هنا.
         *
         * كل اختيار هيكون له جرعة خاصة به:
         *
         * الشمس      → sun-dose.html
         * المياه     → water-dose.html
         * الرياضة    → activity-dose.html
         * العلاج     → treatment-dose.html
         * النوم      → sleep-dose.html
         */

        const nextPages = {

            sun: "sun-dose.html",

            water: "water-dose.html",

            activity: "activity-dose.html",

            treatment: "treatment-dose.html",

            sleep: "sleep-dose.html"

        };


        const nextPage = nextPages[type];

        if (nextPage) {

            startDose.disabled = true;

            startDose.textContent = "ثواني يا صديقي ☀️";

            setTimeout(() => {

                window.location.href = nextPage;

            }, 450);

        }

    });

});
