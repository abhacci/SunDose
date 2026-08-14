document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".choice-card");
    const panel = document.getElementById("sanaPanel");
    const panelIcon = document.getElementById("panelIcon");
    const panelTitle = document.getElementById("panelTitle");
    const panelText = document.getElementById("panelText");
    const panelTip = document.getElementById("panelTip");
    const startDose = document.getElementById("startDose");

    if (!cards.length || !panel || !startDose) {
        console.error("SunDose: عناصر الصفحة المطلوبة غير موجودة.");
        return;
    }

    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            const type = card.getAttribute("data-type");

            if (type !== "sun") {
                return;
            }

            panel.hidden = false;

            panelIcon.textContent = "☀️";

            panelTitle.textContent = "اختيار حلو يا وليد 😊 نبدأ بالشمس";

            panelText.textContent =
                "خليني أمشي معاك فيها واحدة واحدة وبشكل يناسبك.";

            panelTip.textContent =
                "سنا معاك خطوة بخطوة 💛";

            startDose.textContent = "ابدأ جرعة الشمس ☀️";

            startDose.style.display = "block";

            cards.forEach(function (item) {
                item.classList.remove("selected");
            });

            card.classList.add("selected");

            panel.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    });


    startDose.addEventListener("click", function () {

        console.log("SunDose: تم الضغط على زر جرعة الشمس.");

        startDose.disabled = true;

        startDose.textContent = "بنجهز جرعتك ☀️";

        setTimeout(function () {

            window.location.href = "sun-dose.html";

        }, 300);

    });

});
