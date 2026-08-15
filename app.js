"use strict";

/*
    SunDose - Sana Reaction System
*/


/* =========================================
   العناصر
========================================= */

const sanaImage = document.getElementById("sanaImage");
const sanaWrap = document.getElementById("sanaWrap");
const speech = document.getElementById("speech");
const speechText = document.getElementById("speechText");
const autoButton = document.getElementById("autoButton");


/* =========================================
   صور سنا
========================================= */

const images = {

    welcome01:
        "assets/sana_welcome_01.png",

    welcome02:
        "assets/sana_welcome_02.png",

    happy:
        "assets/sana_happy.png",

    flirty:
        "assets/sana_flirty.png",

    questioning:
        "assets/sana_questioning.png",

    thinking:
        "assets/sana_thinking.png",

    excited:
        "assets/sana_excited.png",

    sun01:
        "assets/sana_sun_01.png",

    sun02:
        "assets/sana_sun_02.png",

    water:
        "assets/sana_water.png",

    calm:
        "assets/sana_calm.png",

    sport:
        "assets/sana_sport.png",

    sad:
        "assets/sana_sad.png",

    surprised:
        "assets/sana_surprised.png"
};


/* =========================================
   تحميل الصور مسبقًا
   عشان مفيش شاشة فاضية أثناء التبديل
========================================= */

Object.values(images).forEach((src) => {

    const img = new Image();

    img.src = src;

});


/* =========================================
   كلام سنا
========================================= */

const messages = {

    welcome:
        "أهلًا بيك ☀️ أنا سنا، وهنمشي سوا خطوة بخطوة.",

    happy:
        "برافووو! 😍 إجابة حلوة جدًا.",

    flirty:
        "أهو كده الكلام اللي يخليني أبتسم 😉",

    questioning:
        "استنى بس... الرقم ده شد انتباهي 🤨",

    thinking:
        "هممم 🧐 خليني أربط المعلومات دي ببعض.",

    excited:
        "ياااه! ✨ كده الصورة بدأت تكتمل!",

    sun:
        "يلا ناخد جرعتنا من الشمس ☀️",

    water:
        "ممتاز 💧 الترطيب مهم جدًا.",

    calm:
        "بهدوء 🌿 كل حاجة ليها تفسير.",

    sport:
        "يلاااا 🏃‍♀️ وقت الحركة!",

    sad:
        "ممم 😔 الاختيار ده مش أحسن حاجة لينا.",

    surprised:
        "إيه ده! 😳 دي جديدة عليا!"
};


/* =========================================
   إخفاء كل حالات الحركة
========================================= */

function clearReactions() {

    sanaWrap.classList.remove(
        "reaction-happy",
        "reaction-flirty",
        "reaction-questioning",
        "reaction-thinking",
        "reaction-excited",
        "reaction-sun",
        "reaction-water",
        "reaction-calm",
        "reaction-sport",
        "reaction-sad",
        "reaction-surprised"
    );
}


/* =========================================
   إعادة تشغيل animation
========================================= */

function restartAnimation(className) {

    clearReactions();

    /*
        إجبار المتصفح على إعادة حساب الـanimation
    */

    void sanaWrap.offsetWidth;

    sanaWrap.classList.add(className);
}


/* =========================================
   تغيير الصورة
========================================= */

function changeSana(src) {

    return new Promise((resolve) => {

        const newImage = new Image();

        newImage.onload = () => {

            sanaImage.src = src;

            resolve();

        };

        newImage.onerror = () => {

            console.error(
                "لم يتم العثور على الصورة:",
                src
            );

            resolve();

        };

        newImage.src = src;

    });
}


/* =========================================
   الكتابة التدريجية
========================================= */

let typingTimer = null;

function typeMessage(message) {

    clearInterval(typingTimer);

    speechText.textContent = "";

    speech.classList.add("show");

    let index = 0;

    typingTimer = setInterval(() => {

        speechText.textContent += message[index];

        index++;

        if (index >= message.length) {

            clearInterval(typingTimer);

        }

    }, 38);
}


/* =========================================
   إخفاء الكلام
========================================= */

function hideSpeech() {

    speech.classList.remove("show");

    clearInterval(typingTimer);

}


/* =========================================
   ردود سنا
========================================= */

async function showReaction(reaction) {

    hideSpeech();

    sanaWrap.classList.remove("idle");

    switch (reaction) {

        case "welcome":

            await changeSana(images.welcome01);

            restartAnimation("");

            await delay(1200);

            await changeSana(images.welcome02);

            restartAnimation("");

            await delay(450);

            typeMessage(messages.welcome);

            break;


        case "happy":

            await changeSana(images.happy);

            restartAnimation("reaction-happy");

            typeMessage(messages.happy);

            break;


        case "flirty":

            await changeSana(images.flirty);

            restartAnimation("reaction-flirty");

            typeMessage(messages.flirty);

            break;


        case "questioning":

            await changeSana(images.questioning);

            restartAnimation("reaction-questioning");

            typeMessage(messages.questioning);

            break;


        case "thinking":

            await changeSana(images.thinking);

            restartAnimation("reaction-thinking");

            typeMessage(messages.thinking);

            break;


        case "excited":

            await changeSana(images.excited);

            restartAnimation("reaction-excited");

            typeMessage(messages.excited);

            break;


        case "sun":

            await changeSana(images.sun01);

            restartAnimation("reaction-sun");

            await delay(900);

            await changeSana(images.sun02);

            restartAnimation("reaction-sun");

            typeMessage(messages.sun);

            break;


        case "water":

            await changeSana(images.water);

            restartAnimation("reaction-water");

            typeMessage(messages.water);

            break;


        case "calm":

            await changeSana(images.calm);

            restartAnimation("reaction-calm");

            typeMessage(messages.calm);

            break;


        case "sport":

            await changeSana(images.sport);

            restartAnimation("reaction-sport");

            typeMessage(messages.sport);

            break;


        case "sad":

            await changeSana(images.sad);

            restartAnimation("reaction-sad");

            typeMessage(messages.sad);

            break;


        case "surprised":

            await changeSana(images.surprised);

            restartAnimation("reaction-surprised");

            typeMessage(messages.surprised);

            break;

    }

    await delay(1200);

    sanaWrap.classList.add("idle");
}


/* =========================================
   أزرار التجربة
========================================= */

document
    .querySelectorAll("[data-reaction]")
    .forEach((button) => {

        button.addEventListener("click", () => {

            const reaction =
                button.dataset.reaction;

            stopAuto();

            showReaction(reaction);

        });

    });


/* =========================================
   التبديل التلقائي
========================================= */

const autoReactions = [

    "happy",
    "questioning",
    "thinking",
    "excited",
    "flirty",
    "sun",
    "water",
    "calm",
    "sport",
    "surprised",
    "sad"
];

let autoMode = false;
let autoIndex = 0;
let autoTimer = null;


function startAuto() {

    if (autoMode) {
        return;
    }

    autoMode = true;

    autoButton.textContent =
        "⏸️ إيقاف التبديل التلقائي";

    runNextAuto();

}


async function runNextAuto() {

    if (!autoMode) {
        return;
    }

    const reaction =
        autoReactions[autoIndex];

    autoIndex++;

    if (autoIndex >= autoReactions.length) {
        autoIndex = 0;
    }

    await showReaction(reaction);

    if (!autoMode) {
        return;
    }

    autoTimer = setTimeout(
        runNextAuto,
        2200
    );
}


function stopAuto() {

    autoMode = false;

    clearTimeout(autoTimer);

    autoTimer = null;

    autoButton.textContent =
        "▶️ تشغيل التبديل التلقائي";

}


autoButton.addEventListener("click", () => {

    if (autoMode) {

        stopAuto();

    } else {

        startAuto();

    }

});


/* =========================================
   مساعد تأخير
========================================= */

function delay(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


/* =========================================
   البداية
========================================= */

window.addEventListener("load", async () => {

    /*
        أول ظهور لسنا
    */

    await delay(300);

    sanaWrap.classList.add("idle");

    /*
        تشغيل الترحيب
    */

    await showReaction("welcome");

});
