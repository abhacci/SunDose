/* =========================================
   SunDose ☀️
   اختيار الجرعة والانتقال للصفحة الخاصة بها
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".choice-card");

    if (!cards.length) {
        return;
    }


    /*
     * الصفحات الخاصة بكل اختيار
     */

    const nextPages = {

        sun: "sun-dose.html",

        water: "water-dose.html",

        activity: "activity-dose.html",

        treatment: "treatment-dose.html",

        sleep: "sleep-dose.html"

    };


    /*
     * عند الضغط على أي اختيار
     */

    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            const type = card.dataset.type;

            const nextPage = nextPages[type];

            if (!nextPage) {
                console.error("لا توجد صفحة لهذا الاختيار:", type);
                return;
            }


            /*
             * إظهار أن الاختيار تم
             */

            cards.forEach(function (item) {

                item.classList.remove("selected");

            });


            card.classList.add("selected");


            /*
             * منع الضغط المتكرر
             */

            cards.forEach(function (item) {

                item.disabled = true;

            });


            /*
             * انتقال سريع للصفحة الجديدة
             */

            setTimeout(function () {

                window.location.href = nextPage;

            }, 200);

        });

    });

});
