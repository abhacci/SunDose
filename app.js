/* =========================================
   SunDose
   SANA WELCOME
========================================= */


/* العناصر */

const sanaCharacter =
    document.getElementById("sanaCharacter");

const sanaSpeech =
    document.getElementById("sanaSpeech");


/* =========================================
   كلام الترحيب
========================================= */

const welcomeText =
    "أهلًا بيك ☀️ أنا سنا، وهنبدأ سوا خطوة بخطوة.";


/* =========================================
   بداية الترحيب
========================================= */

window.addEventListener("load", () => {

    /*
       نستنى سنا تظهر وتقرب الأول.
    */

    setTimeout(() => {

        startSanaSpeech();

    }, 2400);

});


/* =========================================
   بدء كلام سنا
========================================= */

function startSanaSpeech() {

    /* سنا تبدأ حركة بسيطة أثناء الكلام */

    sanaCharacter.classList.add("talking");


    /* إظهار فقاعة الكلام */

    sanaSpeech.classList.add("show");

    sanaSpeech.classList.add("typing");


    /* كتابة الكلام تدريجيًا */

    typeSanaText(
        sanaSpeech,
        welcomeText,
        55
    );

}


/* =========================================
   الكتابة حرف حرف
========================================= */

function typeSanaText(element, text, speed) {

    element.textContent = "";

    let index = 0;


    const typingInterval =
        setInterval(() => {

            if (index < text.length) {

                element.textContent +=
                    text[index];

                index++;

            } else {

                clearInterval(
                    typingInterval
                );

                element.classList.remove(
                    "typing"
                );

            }

        }, speed);
}
