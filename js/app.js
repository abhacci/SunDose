/* =========================================
   SunDose ☀️
   Main Application
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("startButton");

    if (!startButton) return;

    startButton.addEventListener("click", () => {

        startButton.disabled = true;

        startButton.innerHTML = `
            جاري البدء...
            <span>☀️</span>
        `;

        setTimeout(() => {

            /*
             * لاحقًا هنوجه المستخدم إلى
             * شاشة التعارف الحقيقية.
             */

            window.location.href = "pages/welcome.html";

        }, 700);

    });

});
