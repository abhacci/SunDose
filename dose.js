document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".choice-card");
    const panel = document.getElementById("sanaPanel");

    const panelIcon = document.getElementById("panelIcon");
    const panelTitle = document.getElementById("panelTitle");
    const panelText = document.getElementById("panelText");
    const panelTip = document.getElementById("panelTip");
    const startDose = document.getElementById("startDose");

    if (!cards.length) {
        console.error("SunDose: choice cards not found");
        return;
    }

    if (!panel) {
        console.error("SunDose: sanaPanel not found");
        return;
    }

    const replies = {

        sun: {
            icon: "☀️",
            title: "اختيار ممتاز يا وليد 💛",
            text: "الشمس ممكن تكون بداية جميلة. هنخلي التعرض ليها بطريقة مناسبة وآمنة، وبخطوة بسيطة تقدر تستمر عليها.",
            tip: "💛 سنا: مش محتاج تعمل حاجة كبيرة دلوقتي... خطوة صغيرة كفاية.",
            button: "ابدأ جرعة الشمس ☀️"
        },

        water: {
            icon: "💧",
            title: "اختيار ممتاز يا وليد 💧",
            text: "المياه عادة بسيطة ومهمة. هنبدأ بطريقة سهلة ونخلي شرب المياه جزء طبيعي من يومك.",
            tip: "💙 سنا: شوية شوية... العادة الصغيرة لما تتكرر بتفرق.",
            button: "ابدأ جرعة المياه 💧"
        },

        activity: {
            icon: "🏃",
            title: "اختيار ممتاز يا وليد 🏃",
            text: "الحركة مش لازم تكون تمرين صعب. هنبدأ بمستوى مناسب ليك ونبني عليه واحدة واحدة.",
            tip: "💚 سنا: المهم تتحرك بالطريقة اللي تقدر تكمل عليها.",
            button: "ابدأ جرعة الحركة 🏃"
        },

        treatment: {
            icon: "💊",
            title: "تمام يا وليد 💊",
            text: "هننظم معلومات العلاج أو المكملات اللي عندك، من غير ما نقترح دواء أو مكمل من نفسنا.",
            tip: "❤️ سنا: العلاج حاجة مهمة، فخلينا دايمًا نمشي حسب تعليمات المختص.",
            button: "ابدأ تنظيم العلاج 💊"
        },

        sleep: {
            icon: "🌙",
            title: "اختيار ممتاز يا وليد 🌙",
            text: "النوم والراحة جزء مهم من يومك. هنبدأ بتنظيم بسيط تقدر تلتزم بيه.",
            tip: "💜 سنا: جسمك محتاج الراحة زي ما محتاج النشاط.",
            button: "ابدأ جرعة النوم 🌙"
        }

    };


    function showReply(type) {

        const reply = replies[type];

        if (!reply) {
            console.error("SunDose: unknown choice:", type);
            return;
        }

        panel.hidden = false;

        panelIcon.textContent = reply.icon;
        panelTitle.textContent = reply.title;
        panelText.textContent = reply.text;
        panelTip.textContent = reply.tip;
        startDose.textContent = reply.button;

        startDose.dataset.type = type;

        cards.forEach(function (card) {
            card.classList.remove("selected");
        });

        const selected = document.querySelector(
            '.choice-card[data-type="' + type + '"]'
        );

        if (selected) {
            selected.classList.add("selected");
        }

        setTimeout(function () {
            panel.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);

    }


    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            const type = card.dataset.type;

            console.log("SunDose choice:", type);

            showReply(type);

        });

    });


    startDose.addEventListener("click", function () {

        const type = startDose.dataset.type;

        if (!type) {
            return;
        }

        const pages = {
            sun: "sun-dose.html",
            water: "water-dose.html",
            activity: "activity-dose.html",
            treatment: "treatment-dose.html",
            sleep: "sleep-dose.html"
        };

        const nextPage = pages[type];

        if (!nextPage) {
            return;
        }

        startDose.disabled = true;
        startDose.textContent = "ثواني يا وليد ☀️";

        setTimeout(function () {
            window.location.href = nextPage;
        }, 300);

    });

});
