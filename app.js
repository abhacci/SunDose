const welcomeScreen = document.getElementById("welcomeScreen");

const sanaWrapper = document.getElementById("sanaWrapper");

const sanaImage = document.getElementById("sanaImage");

const sanaSpeech = document.getElementById("sanaSpeech");

const speechText = document.getElementById("speechText");

const appContent = document.getElementById("appContent");


/* =====================================
   الكلام
===================================== */

const messages = [

    "أهلًا بيك ☀️",

    "أنا سنا 💛",

    "وهساعدك تاخد جرعتك المناسبة من الشمس بطريقة صحية ومناسبة ليك."

];


/* =====================================
   كتابة الكلام تدريجيًا
===================================== */

function typeText(text, speed = 45) {

    return new Promise(resolve => {

        speechText.textContent = "";

        let index = 0;

        const timer = setInterval(() => {

            speechText.textContent += text[index];

            index++;

            if (index >= text.length) {

                clearInterval(timer);

                resolve();
            }

        }, speed);

    });

}


/* =====================================
   إظهار فقاعة الكلام
===================================== */

async function speak(text) {

    sanaSpeech.classList.remove("show");

    await wait(250);

    sanaSpeech.classList.add("show");

    await wait(250);

    await typeText(text);

    await wait(1100);

}


/* =====================================
   تغيير صورة الترحيب
===================================== */

async function changeWelcomeImage(src) {

    sanaImage.style.opacity = "0";

    sanaImage.style.transform = "scale(0.97)";

    await wait(300);

    sanaImage.src = src;

    await wait(100);

    sanaImage.style.opacity = "1";

    sanaImage.style.transform = "scale(1.01)";

    await wait(450);

    sanaImage.style.transform = "scale(1)";

}


/* =====================================
   الانتظار
===================================== */

function wait(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });

}


/* =====================================
   بداية سنا
===================================== */

async function startWelcome() {

    /*
       1 — تظهر سنا
    */

    welcomeScreen.classList.add("start");

    await wait(1100);


    /*
       2 — تقرب من الشاشة
    */

    welcomeScreen.classList.add("approach");

    await wait(1300);


    /*
       3 — تثبت
    */

    welcomeScreen.classList.add("ready");

    await wait(500);


    /*
       4 — أول جملة
    */

    await speak(messages[0]);


    /*
       5 — ننتقل للصورة الثانية
    */

    const secondImage = "assets/sana_welcome_02.png";

    const test = new Image();

    test.src = secondImage;

    test.onload = async () => {

        await changeWelcomeImage(secondImage);

        await speak(messages[1]);

        await speak(messages[2]);

        finishWelcome();

    };

    test.onerror = async () => {

        /*
           لو الصورة الثانية مش موجودة
           نكمل عادي بالصورة الأولى
        */

        await speak(messages[1]);

        await speak(messages[2]);

        finishWelcome();

    };

}


/* =====================================
   نهاية الترحيب
===================================== */

async function finishWelcome() {

    await wait(600);

    sanaSpeech.classList.remove("show");

    await wait(500);

    welcomeScreen.classList.add("idle");

    await wait(900);

    appContent.classList.add("visible");

}


/* =====================================
   تشغيل عند فتح الصفحة
===================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        startWelcome();

    }, 400);

});
