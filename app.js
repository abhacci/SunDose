/* =========================================
   SunDose ☀️
   التعارف + شخصية سنا + محطة الشمس
========================================= */


/* =========================================
   بيانات المستخدم
========================================= */

const user = {

    name: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    country: "",
    skinTone: "",
    sunTime: ""

};


/* =========================================
   عناصر الصفحات
========================================= */

const home =
    document.getElementById("home");

const welcome =
    document.getElementById("welcome");

const habits =
    document.getElementById("habits");

const sunDose =
    document.getElementById("sunDose");

const sunEducation =
    document.getElementById("sunEducation");


/* =========================================
   الأزرار
========================================= */

const startButton =
    document.getElementById("startButton");

const introNext =
    document.getElementById("introNext");

const nextButton =
    document.getElementById("nextButton");

const educationNext =
    document.getElementById("educationNext");


/* =========================================
   النصوص
========================================= */

const introText =
    document.getElementById("introText");

const question =
    document.getElementById("question");

const answerArea =
    document.getElementById("answerArea");

const progressBar =
    document.getElementById("progressBar");

const stepNumber =
    document.getElementById("stepNumber");

const stepTotal =
    document.getElementById("stepTotal");

const educationText =
    document.getElementById("educationText");


/* =========================================
   العادات
========================================= */

const habitMessage =
    document.getElementById("habitMessage");

const habitList =
    document.getElementById("habitList");


/* =========================================
   محطة الشمس
========================================= */

const sunMessage =
    document.getElementById("sunMessage");

const backToHabits =
    document.getElementById("backToHabits");

const locationButton =
    document.getElementById("locationButton");

const sunStatus =
    document.getElementById("sunStatus");

const sunSkinValue =
    document.getElementById("sunSkinValue");

const sunTimeValue =
    document.getElementById("sunTimeValue");

const sunLocationValue =
    document.getElementById("sunLocationValue");

const uvValue =
    document.getElementById("uvValue");

const analysisTitle =
    document.getElementById("analysisTitle");

const analysisText =
    document.getElementById("analysisText");

const analysisIcon =
    document.getElementById("analysisIcon");


/* =========================================
   صور سنا
========================================= */

const sanaImage =
    document.getElementById("sanaImage");

const questionSana =
    document.getElementById("questionSana");

const habitSana =
    document.getElementById("habitSana");

const sunSana =
    document.getElementById("sunSana");

const educationSana =
    document.getElementById("educationSana");

const sanaReaction =
    document.getElementById("sanaReaction");


/* =========================================
   الحالة
========================================= */

let introStep = 0;

let currentStep = 0;

let isTyping = false;

let typingTimer = null;

let waitingForContinue = false;

let sunData = null;


/* =========================================
   تغيير صورة سنا
========================================= */

function changeSanaImage(
    element,
    image,
    reaction = ""
){

    if(!element) return;


    element.classList.remove(
        "sana-changing"
    );


    void element.offsetWidth;


    element.classList.add(
        "sana-changing"
    );


    element.src = image;


    if(sanaReaction){

        if(reaction){

            sanaReaction.textContent =
                reaction;

            sanaReaction.classList.remove(
                "hidden"
            );

        }else{

            sanaReaction.classList.add(
                "hidden"
            );

        }

    }

}


/* =========================================
   عرض صفحة
========================================= */

function showPage(page){

    [
        home,
        welcome,
        habits,
        sunDose,
        sunEducation
    ].forEach(section => {

        if(section){

            section.classList.add(
                "hidden"
            );

        }

    });


    if(page){

        page.classList.remove(
            "hidden"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   الكتابة
========================================= */

function typeSanaText(
    text,
    element,
    speed = 35,
    callback = null
){

    if(!element) return;


    if(typingTimer){

        clearInterval(
            typingTimer
        );

        typingTimer = null;

    }


    isTyping = true;

    element.textContent = "";


    let index = 0;


    typingTimer =
        setInterval(() => {

            element.textContent +=
                text.charAt(index);

            index++;


            if(index >= text.length){

                clearInterval(
                    typingTimer
                );

                typingTimer = null;

                isTyping = false;


                if(callback){

                    callback();

                }

            }

        }, speed);

}


function finishTypingImmediately(){

    if(
        !isTyping ||
        !typingTimer
    ){

        return false;

    }


    clearInterval(
        typingTimer
    );

    typingTimer = null;

    isTyping = false;

    return true;

}


/* =========================================
   شخصية سنا
========================================= */

const introMessages = [

    "أهلًااا 😌💛 أنا سنا... بس متقلقش، مش جاية أعملك تحقيق.",

    "أنا هنا عشان نخلي الشمس والعادات المهمة جزء طبيعي من يومك ☀️",

    "بس الأول عايزة أعرفك كويس... كل معلومة منك هتفرق معايا بعدين.",

    "ومش هديك رقم محفوظ وخلاص 😏 أنا هحاول أفهمك وأفهم يومك.",

    "يلا نبدأ بحاجة بسيطة... اختارلي الأول أخاطبك إزاي 😄"

];


function setIntroSana(){

    if(!sanaImage) return;


    const images = [

        [
            "assets/sana_welcome_01.png",
            "✨"
        ],

        [
            "assets/sana_welcome_02.png",
            "👋"
        ],

        [
            "assets/sana_curious.png",
            "👀"
        ],

        [
            "assets/sana_happy.png",
            "💛"
        ],

        [
            "assets/sana_excited.png",
            "☀️"
        ]

    ];


    const current =
        images[
            Math.min(
                introStep,
                images.length - 1
            )
        ];


    changeSanaImage(
        sanaImage,
        current[0],
        current[1]
    );

}


function renderIntro(){

    if(
        !introText ||
        !introNext
    ){

        return;

    }


    introNext.disabled = true;

    setIntroSana();


    typeSanaText(

        introMessages[introStep],

        introText,

        34,

        function(){

            introNext.disabled = false;

            introNext.textContent =
                introStep ===
                introMessages.length - 1

                    ? "يلا نبدأ ☀️"
                    : "نكمل 😄";

        }

    );

}


if(
    introText &&
    introNext
){

    renderIntro();


    introNext.addEventListener(
        "click",
        function(){

            if(
                finishTypingImmediately()
            ){

                introText.textContent =
                    introMessages[introStep];

                introNext.disabled =
                    false;

                introNext.textContent =
                    introStep ===
                    introMessages.length - 1

                        ? "يلا نبدأ ☀️"
                        : "نكمل 😄";

                return;

            }


            if(
                introStep <
                introMessages.length - 1
            ){

                introStep++;

                renderIntro();

            }else{

                introNext.classList.add(
                    "hidden"
                );

                if(startButton){

                    startButton.classList.remove(
                        "hidden"
                    );

                }

            }

        }
    );

}


/* =========================================
   الأسئلة
   الجنس أولًا
========================================= */

const steps = [

    {
        key: "gender",
        question:
            "نبدأ بيك إنت 😌 أخاطبك إزاي؟",
        type: "gender"
    },


    {
        key: "name",
        question:
            "حلو 😏 طب اسمك إيه عشان أناديك بيه؟",
        type: "text",
        label: "اسمك",
        placeholder: "اكتب اسمك"
    },


    {
        key: "age",
        question:
            "طيب يا ${name}، عندك كام سنة؟ 😄",
        type: "number",
        label: "السن",
        placeholder: "مثال: 23",
        unit: "سنة"
    },


    {
        key: "weight",
        question:
            "ووزنك تقريبًا كام يا ${name}؟ الرقم لوحده مش بيحكم عليك 💛",
        type: "number",
        label: "الوزن",
        placeholder: "مثال: 80",
        unit: "كجم"
    },


    {
        key: "height",
        question:
            "وطولك كام؟ 😄 كده الصورة عندي بتكمل واحدة واحدة.",
        type: "number",
        label: "الطول",
        placeholder: "مثال: 175",
        unit: "سم"
    },


    {
        key: "country",
        question:
            "إنت في أنهي بلد؟ 🌍 الشمس مش واحدة في كل مكان.",
        type: "text",
        label: "البلد",
        placeholder: "مثال: مصر"
    },


    {
        key: "skinTone",
        question:
            "وصلنا لحاجة مهمة ☀️ بشرتك أقرب لأنهي درجة؟",
        type: "skin"
    },


    {
        key: "sunTime",
        question:
            "ولو هتختار وقت للشمس... أنهي وقت يناسب يومك؟ ☀️",
        type: "time"
    }

];


if(stepTotal){

    stepTotal.textContent =
        steps.length;

}


/* =========================================
   صور سنا حسب السؤال
========================================= */

function setQuestionSana(){

    if(!questionSana) return;


    const step =
        steps[currentStep];


    const map = {

        gender: [
            "assets/sana_flirty.png",
            "😏"
        ],

        name: [
            "assets/sana_curious.png",
            "👀"
        ],

        age: [
            "assets/sana_happy.png",
            "😄"
        ],

        weight: [
            "assets/sana_calm.png",
            "💛"
        ],

        height: [
            "assets/sana_thinking.png",
            "🤔"
        ],

        country: [
            "assets/sana_curious.png",
            "🌍"
        ],

        skinTone: [
            "assets/sana_thinking.png",
            "☀️"
        ],

        sunTime: [
            "assets/sana_sun_01.png",
            "☀️"
        ]

    };


    const selected =
        map[step.key];


    if(selected){

        changeSanaImage(
            questionSana,
            selected[0],
            selected[1]
        );

    }

}


/* =========================================
   تخصيص السؤال
========================================= */

function personalizeQuestion(text){

    return text
        .replace(
            "${name}",
            user.name || "يا صديقي"
        );

}


/* =========================================
   عرض السؤال
========================================= */

function renderStep(){

    const step =
        steps[currentStep];


    question.textContent =
        personalizeQuestion(
            step.question
        );


    if(progressBar){

        progressBar.style.width =
            (
                (currentStep + 1) /
                steps.length *
                100
            ) + "%";

    }


    if(stepNumber){

        stepNumber.textContent =
            currentStep + 1;

    }


    answerArea.innerHTML = "";

    nextButton.textContent =
        "نكمل 😄";

    nextButton.disabled = false;

    waitingForContinue = false;

    setQuestionSana();


    /* =====================================
       الجنس
    ===================================== */

    if(step.type === "gender"){

        answerArea.innerHTML = `

            <div class="choice-grid gender-choice">

                <button
                    type="button"
                    class="choice-btn gender-btn"
                    data-gender="male"
                >
                    <span class="choice-art male-art">♂</span>
                    <span>ولد</span>
                </button>

                <button
                    type="button"
                    class="choice-btn gender-btn"
                    data-gender="female"
                >
                    <span class="choice-art female-art">♀</span>
                    <span>بنت</span>
                </button>

            </div>

        `;


        document
            .querySelectorAll(".gender-btn")
            .forEach(button => {

                if(
                    user.gender ===
                    button.dataset.gender
                ){

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    function(){

                        user.gender =
                            this.dataset.gender;


                        document
                            .querySelectorAll(
                                ".gender-btn"
                            )
                            .forEach(btn =>
                                btn.classList.remove(
                                    "active"
                                )
                            );


                        this.classList.add(
                            "active"
                        );


                        if(user.gender === "female"){

                            changeSanaImage(
                                questionSana,
                                "assets/sana_flirty.png",
                                "💗"
                            );

                        }else{

                            changeSanaImage(
                                questionSana,
                                "assets/sana_happy.png",
                                "😄"
                            );

                        }

                    }
                );

            });

        return;

    }


    /* =====================================
       البشرة
    ===================================== */

    if(step.type === "skin"){

        answerArea.innerHTML = `

            <div class="skin-picker">

                <button
                    type="button"
                    class="skin-option skin-1"
                    data-skin="very-light"
                >
                    <span class="skin-circle"></span>
                    <span>فاتحة جدًا</span>
                </button>

                <button
                    type="button"
                    class="skin-option skin-2"
                    data-skin="light"
                >
                    <span class="skin-circle"></span>
                    <span>فاتحة</span>
                </button>

                <button
                    type="button"
                    class="skin-option skin-3"
                    data-skin="medium"
                >
                    <span class="skin-circle"></span>
                    <span>متوسطة</span>
                </button>

                <button
                    type="button"
                    class="skin-option skin-4"
                    data-skin="dark"
                >
                    <span class="skin-circle"></span>
                    <span>سمراء</span>
                </button>

                <button
                    type="button"
                    class="skin-option skin-5"
                    data-skin="very-dark"
                >
                    <span class="skin-circle"></span>
                    <span>داكنة</span>
                </button>

            </div>

        `;


        document
            .querySelectorAll(".skin-option")
            .forEach(button => {

                if(
                    user.skinTone ===
                    button.dataset.skin
                ){

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    function(){

                        user.skinTone =
                            this.dataset.skin;


                        document
                            .querySelectorAll(
                                ".skin-option"
                            )
                            .forEach(btn =>
                                btn.classList.remove(
                                    "active"
                                )
                            );


                        this.classList.add(
                            "active"
                        );


                        changeSanaImage(
                            questionSana,
                            "assets/sana_thinking.png",
                            "☀️"
                        );

                    }
                );

            });

        return;

    }


    /* =====================================
       الوقت
    ===================================== */

    if(step.type === "time"){

        answerArea.innerHTML = `

            <div class="time-picker">

                <button
                    type="button"
                    class="time-option"
                    data-time="morning"
                >
                    <span class="time-art">🌅</span>
                    <span>الصبح</span>
                </button>

                <button
                    type="button"
                    class="time-option"
                    data-time="midday"
                >
                    <span class="time-art">☀️</span>
                    <span>الظهر</span>
                </button>

                <button
                    type="button"
                    class="time-option"
                    data-time="afternoon"
                >
                    <span class="time-art">🌤️</span>
                    <span>بعد الظهر</span>
                </button>

                <button
                    type="button"
                    class="time-option"
                    data-time="evening"
                >
                    <span class="time-art">🌇</span>
                    <span>العصر</span>
                </button>

            </div>

        `;


        document
            .querySelectorAll(".time-option")
            .forEach(button => {

                if(
                    user.sunTime ===
                    button.dataset.time
                ){

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    function(){

                        user.sunTime =
                            this.dataset.time;


                        document
                            .querySelectorAll(
                                ".time-option"
                            )
                            .forEach(btn =>
                                btn.classList.remove(
                                    "active"
                                )
                            );


                        this.classList.add(
                            "active"
                        );


                        changeSanaImage(
                            questionSana,
                            "assets/sana_sun_01.png",
                            "☀️"
                        );

                    }
                );

            });

        return;

    }


    /* =====================================
       باقي الأسئلة
    ===================================== */

    answerArea.innerHTML = `

        <div class="field">

            <label>
                ${step.label}
            </label>

            <div class="input-wrap">

                <input
                    id="answerInput"
                    type="${step.type}"
                    placeholder="${step.placeholder}"
                    value="${user[step.key]}"
                >

                ${
                    step.unit
                        ? `<span class="unit">${step.unit}</span>`
                        : ""
                }

            </div>

        </div>

    `;


    const input =
        document.getElementById(
            "answerInput"
        );


    if(input){

        setTimeout(
            () => input.focus(),
            80
        );


        input.addEventListener(
            "keydown",
            event => {

                if(
                    event.key === "Enter"
                ){

                    nextButton.click();

                }

            }
        );

    }

}


/* =========================================
   حفظ الإجابة
========================================= */

function saveCurrentAnswer(){

    const step =
        steps[currentStep];


    if(step.type === "gender"){

        if(!user.gender){

            alert(
                "اختار الأول 😄"
            );

            return false;

        }

        return true;

    }


    if(step.type === "skin"){

        if(!user.skinTone){

            alert(
                "اختار درجة بشرتك الأول ☀️"
            );

            return false;

        }

        return true;

    }


    if(step.type === "time"){

        if(!user.sunTime){

            alert(
                "اختار الوقت اللي يناسبك ☀️"
            );

            return false;

        }

        return true;

    }


    const input =
        document.getElementById(
            "answerInput"
        );


    if(!input){

        return false;

    }


    const value =
        input.value.trim();


    if(!value){

        alert(
            "اكتبلي الإجابة الأول 😄"
        );

        input.focus();

        return false;

    }


    user[step.key] =
        value;


    return true;

}


/* =========================================
   صياغة سنا حسب الجنس
========================================= */

function maleText(text){

    if(user.gender === "female"){

        return text
            .replaceAll("يا صديقي", "يا جميلة")
            .replaceAll("يا صاحبي", "يا جميلة");

    }


    return text;

}


/* =========================================
   ردود سنا
========================================= */

function getResponse(step){

    const name =
        user.name ||
        (
            user.gender === "female"
                ? "يا جميلة"
                : "يا صاحبي"
        );


    const female =
        user.gender === "female";


    if(step.key === "gender"){

        changeSanaImage(
            questionSana,
            female
                ? "assets/sana_flirty.png"
                : "assets/sana_happy.png",
            female
                ? "💗"
                : "😄"
        );


        return female

            ? "تمام يا جميلة 😌💗 كده عرفت أكلمك براحتك."

            : "تمام يا صاحبي 😄 كده عرفت أخاطبك صح.";

    }


    if(step.key === "name"){

        changeSanaImage(
            questionSana,
            female
                ? "assets/sana_flirty.png"
                : "assets/sana_happy.png",
            female ? "😉" : "💛"
        );


        return female

            ? `تشرفت بيكي يا ${user.name} 💗 من هنا بقى هندهلك باسمك.`

            : `تشرفت بيك يا ${user.name} 💛 من هنا بقى هندهلك باسمك.`;

    }


    if(step.key === "age"){

        return `
            تمام يا ${name} 😄
            ${user.age} سنة واتسجلت.
        `;

    }


    if(step.key === "weight"){

        return `
            تمام يا ${name} 💛
            سجلت وزنك ${user.weight} كجم.
        `;

    }


    if(step.key === "height"){

        return `
            حلو يا ${name} 🌱
            ${user.height} سم... كده الصورة بتكمل.
        `;

    }


    if(step.key === "country"){

        return `
            تمام يا ${name} 🌍
            سجلت ${user.country}.
            المكان ده هيفرق معانا لما نقرأ الشمس.
        `;

    }


    if(step.key === "skinTone"){

        return `
            حلو ☀️
            درجة بشرتك مهمة عندي، وسجلتها.
        `;

    }


    if(step.key === "sunTime"){

        return `
            استنى بقى يا ${name} 😏☀️
            اختيار الوقت ده مش سؤال عشوائي.
            أنا بسألك عنه عشان الشمس مش بنفس القوة طول اليوم.
        `;

    }


    return `
        تمام يا ${name} 💛
        سجلت المعلومة.
    `;

}


/* =========================================
   زر نكمل
========================================= */

if(nextButton){

    nextButton.addEventListener(
        "click",
        function(){

            if(isTyping){

                finishTypingImmediately();

                nextButton.disabled =
                    false;

                return;

            }


            if(waitingForContinue){

                waitingForContinue =
                    false;

                currentStep++;


                if(
                    currentStep <
                    steps.length
                ){

                    renderStep();

                }else{

                    showSunEducation();

                }

                return;

            }


            if(!saveCurrentAnswer()){

                return;

            }


            const step =
                steps[currentStep];


            const response =
                getResponse(step);


            answerArea.innerHTML =
                "";


            waitingForContinue =
                true;


            nextButton.disabled =
                true;


            typeSanaText(

                response,

                question,

                32,

                function(){

                    nextButton.disabled =
                        false;

                }

            );

        }
    );

}


/* =========================================
   بدء التعارف
========================================= */

if(startButton){

    startButton.addEventListener(
        "click",
        function(){

            showPage(welcome);

            currentStep = 0;

            renderStep();

        }
    );

}


/* =========================================
   شرح الشمس
========================================= */

function showSunEducation(){

    showPage(sunEducation);


    changeSanaImage(
        educationSana,
        "assets/sana_sun_01.png",
        "☀️"
    );


    const name =
        user.name ||
        (
            user.gender === "female"
                ? "يا جميلة"
                : "يا صاحبي"
        );


    const text =

        `بصي يا ${name} ☀️\n\n` +

        `في حاجة اسمها UV.\n` +

        `ببساطة ده رقم بيقولنا الأشعة فوق البنفسجية قوية قد إيه.\n\n` +

        `كل ما الرقم يعلى، الجلد والعين ممكن يتأثروا أسرع.\n\n` +

        `والشمس مش عدو 😄 الجسم بيستخدم الأشعة فوق البنفسجية في تصنيع فيتامين D، بس التعرض الزيادة مش معناه فايدة أكتر.\n\n` +

        `عشان كده أنا مش هديك رقم محفوظ وأقولك امشي عليه.\n\n` +

        `هشوف بشرتك + الوقت + مكانك + الـUV الحقيقي + حالة الجو... وبعدها نبدأ الحساب ☀️`;


    if(educationText){

        typeSanaText(
            text,
            educationText,
            20,
            function(){

                if(educationNext){

                    educationNext.disabled =
                        false;

                }

            }
        );

    }

}


/* =========================================
   دخول محطة الشمس
========================================= */

if(educationNext){

    educationNext.addEventListener(
        "click",
        function(){

            if(isTyping){

                finishTypingImmediately();

                educationNext.disabled =
                    false;

                return;

            }


            openSunDose();

        }
    );

}


/* =========================================
   صفحة العادات
========================================= */

function showHabits(){

    showPage(habits);


    changeSanaImage(
        habitSana,
        "assets/sana_happy.png",
        "💛"
    );


    const name =
        user.name ||
        (
            user.gender === "female"
                ? "يا جميلة"
                : "يا صاحبي"
        );


    habitMessage.textContent =

        `تمام يا ${name} 💛 خلينا نبدأ بأول حاجة نقدر نخليها فعلية في يومك.`;


    const habitData = [

        {
            id: "sun",
            icon: "☀️",
            title: "الشمس",
            text: "المكان + UV + بشرتك + الوقت."
        },

        {
            id: "water",
            icon: "💧",
            title: "المياه",
            text: "هنبنيها من يومك."
        },

        {
            id: "exercise",
            icon: "🏃",
            title: "الحركة",
            text: "نشاط يناسبك."
        },

        {
            id: "supplements",
            icon: "💊",
            title: "العلاج",
            text: "تنظيم المعلومات."
        }

    ];


    habitList.innerHTML =

        habitData.map(
            habit => `

                <button
                    type="button"
                    class="habit"
                    data-habit="${habit.id}"
                >

                    <span class="habit-icon">
                        ${habit.icon}
                    </span>

                    <span class="habit-title">
                        ${habit.title}
                    </span>

                    <span class="habit-text">
                        ${habit.text}
                    </span>

                </button>

            `
        ).join("");


    document
        .querySelectorAll(".habit")
        .forEach(element => {

            element.addEventListener(
                "click",
                function(){

                    const selected =
                        this.dataset.habit;


                    if(selected === "sun"){

                        openSunDose();

                    }

                    else{

                        changeSanaImage(
                            habitSana,
                            "assets/sana_thinking.png",
                            "😏"
                        );


                        alert(
                            "هنوصله بعد محطة الشمس ☀️"
                        );

                    }

                }
            );

        });

}


/* =========================================
   فتح محطة الشمس
========================================= */

function openSunDose(){

    showPage(sunDose);


    changeSanaImage(
        sunSana,
        "assets/sana_sun_01.png",
        "☀️"
    );


    const name =
        user.name ||
        (
            user.gender === "female"
                ? "يا جميلة"
                : "يا صاحبي"
        );


    sunMessage.textContent =

        `أهو وصلنا يا ${name} ☀️ دلوقتي مش هخمن... عايزة أشوف الشمس الحقيقية عند مكانك.`;


    updateSunUserData();

}


/* =========================================
   بيانات المستخدم
========================================= */

function updateSunUserData(){

    const skinNames = {

        "very-light": "فاتحة جدًا",
        "light": "فاتحة",
        "medium": "متوسطة",
        "dark": "سمراء",
        "very-dark": "داكنة"

    };


    const timeNames = {

        morning: "الصبح",
        midday: "الظهر",
        afternoon: "بعد الظهر",
        evening: "العصر"

    };


    if(sunSkinValue){

        sunSkinValue.textContent =
            skinNames[user.skinTone] ||
            "—";

    }


    if(sunTimeValue){

        sunTimeValue.textContent =
            timeNames[user.sunTime] ||
            "—";

    }


    if(sunLocationValue){

        sunLocationValue.textContent =
            "لسه";

    }


    if(uvValue){

        uvValue.textContent =
            "—";

    }

}


/* =========================================
   تحديد الموقع
========================================= */

if(locationButton){

    locationButton.addEventListener(
        "click",
        requestLocation
    );

}


function requestLocation(){

    if(!navigator.geolocation){

        showLocationError(
            "المتصفح ده مش بيدعم تحديد الموقع."
        );

        return;

    }


    locationButton.disabled =
        true;

    locationButton.textContent =
        "بندور عليك 📍";


    sunStatus.textContent =
        "ثواني... بقرأ مكانك";


    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;

            const lon =
                position.coords.longitude;


            loadSunData(
                lat,
                lon
            );

        },

        error => {

            console.error(
                "SunDose location:",
                error
            );


            showLocationError(
                "محتاجين إذن الموقع عشان نقرأ الشمس الحقيقية عندك."
            );

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }

    );

}


/* =========================================
   قراءة الشمس والطقس
========================================= */

async function loadSunData(
    latitude,
    longitude
){

    sunStatus.textContent =
        "بقرأ الشمس والـUV ☀️";


    analysisTitle.textContent =
        "لحظة..." ;


    analysisText.textContent =
        "سنا بتجمع بيانات المكان والشمس.";


    try{

        const url =

            `https://api.open-meteo.com/v1/forecast` +

            `?latitude=${latitude}` +

            `&longitude=${longitude}` +

            `&current=temperature_2m,uv_index,is_day` +

            `&hourly=uv_index,temperature_2m` +

            `&daily=sunrise,sunset,uv_index_max` +

            `&timezone=auto`;


        const response =
            await fetch(url);


        if(!response.ok){

            throw new Error(
                "Weather API error"
            );

        }


        const data =
            await response.json();


        sunData = data;


        const uv =
            Number(
                data.current?.uv_index ?? 0
            );


        const temperature =
            Number(
                data.current?.temperature_2m ?? 0
            );


        const isDay =
            Number(
                data.current?.is_day ?? 0
            );


        updateSunResult(
            latitude,
            longitude,
            uv,
            temperature,
            isDay
        );


    }catch(error){

        console.error(
            "SunDose API:",
            error
        );


        sunStatus.textContent =
            "القراءة وقفت شوية";


        analysisTitle.textContent =
            "نجرب تاني";


        analysisText.textContent =
            "حصلت مشكلة في الاتصال. جرّب بعد لحظات.";


        analysisIcon.textContent =
            "🌥️";


        locationButton.disabled =
            false;

        locationButton.textContent =
            "جرب تاني 🔄";

    }

}


/* =========================================
   نتيجة الشمس
========================================= */

function updateSunResult(
    latitude,
    longitude,
    uv,
    temperature,
    isDay
){

    const roundedUV =
        Math.round(
            uv * 10
        ) / 10;


    if(sunLocationValue){

        sunLocationValue.textContent =
            `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

    }


    if(uvValue){

        uvValue.textContent =
            roundedUV.toString();

    }


    if(!isDay){

        sunStatus.textContent =
            "الشمس نايمة دلوقتي 🌙";


        analysisTitle.textContent =
            "مش وقت شمس";


        analysisText.textContent =
            "مش هخمنلك جرعة. أول ما يبقى عندنا نهار وUV فعلي نكمل.";


        analysisIcon.textContent =
            "🌙";


        changeSanaImage(
            sunSana,
            "assets/sana_calm.png",
            "🌙"
        );

    }

    else if(uv < 3){

        sunStatus.textContent =
            `UV هادي • ${temperature}°`;


        analysisTitle.textContent =
            "الشمس هادية ☀️";


        analysisText.textContent =
            "الـUV منخفض دلوقتي. دي قراءة أولية ولسه هنرب
