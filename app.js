/* =========================================
   SunDose ☀️
   Personal Sun Intelligence
========================================= */


/* =========================================
   USER
========================================= */

const user = {

    name:"",
    gender:"",
    age:"",
    weight:"",
    height:"",
    country:"",
    skinTone:"",
    sunTime:""

};


/* =========================================
   ELEMENTS
========================================= */

const home =
    document.getElementById("home");

const welcome =
    document.getElementById("welcome");

const habits =
    document.getElementById("habits");

const sunLearn =
    document.getElementById("sunLearn");

const sunDose =
    document.getElementById("sunDose");


const startButton =
    document.getElementById("startButton");

const introNext =
    document.getElementById("introNext");

const nextButton =
    document.getElementById("nextButton");


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


const habitMessage =
    document.getElementById("habitMessage");

const habitList =
    document.getElementById("habitList");


const learnSana =
    document.getElementById("learnSana");

const learnMessage =
    document.getElementById("learnMessage");

const startSunAnalysis =
    document.getElementById("startSunAnalysis");

const backFromLearn =
    document.getElementById("backFromLearn");


const sunMessage =
    document.getElementById("sunMessage");

const backToHabits =
    document.getElementById("backToHabits");


const sanaImage =
    document.getElementById("sanaImage");

const questionSana =
    document.getElementById("questionSana");

const habitSana =
    document.getElementById("habitSana");

const sunSana =
    document.getElementById("sunSana");

const sanaReaction =
    document.getElementById("sanaReaction");


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

const doseMeterFill =
    document.getElementById("doseMeterFill");

const doseResult =
    document.getElementById("doseResult");

const doseMinutes =
    document.getElementById("doseMinutes");

const doseTitle =
    document.getElementById("doseTitle");

const doseText =
    document.getElementById("doseText");


/* =========================================
   STATE
========================================= */

let introStep = 0;

let currentStep = 0;

let isTyping = false;

let typingTimer = null;

let waitingForContinue = false;

let sunData = null;


/* =========================================
   IMAGE
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
   PAGE
========================================= */

function showPage(page){

    [
        home,
        welcome,
        habits,
        sunLearn,
        sunDose
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
        top:0,
        behavior:"smooth"
    });

}


/* =========================================
   TYPING
========================================= */

function typeSanaText(
    text,
    element,
    speed = 38,
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
   INTRO
========================================= */

const introMessages = [

    "أهلًا 😏 أنا سنا... بس متقلقش، مش هخليك داخل تملى استمارة مملة.",

    "قبل ما أعرف اسمك أصلًا... خليني أعرف أخاطبك إزاي 😌 ولد ولا بنت؟",

    "وبعدين اسمك طبعًا... عشان مينفعش أفضل أقولك يا صديقي وأنا لسه معرفتش إنت مين 😂",

    "بعدها هجمع كام معلومة صغيرة عنك، مش عشان أحكم عليك... عشان الشمس نفسها مش واحدة عند كل الناس ☀️",

    "وفي الآخر هنروح لمحطة الشمس، وهناك سنا هتسيب التخمين وتبدأ تقرأ الشمس الحقيقية عند مكانك.",

    "جاهز؟ تعالى نبدأ من أول حاجة فعلًا... إنت ولد ولا بنت؟ 😏☀️"
];


function setIntroSana(){

    if(!sanaImage) return;


    const images = [

        [
            "assets/sana_welcome_01.png",
            "✨"
        ],

        [
            "assets/sana_flirty.png",
            "😏"
        ],

        [
            "assets/sana_curious.png",
            "👀"
        ],

        [
            "assets/sana_thinking.png",
            "🤔"
        ],

        [
            "assets/sana_sun_01.png",
            "☀️"
        ],

        [
            "assets/sana_excited.png",
            "🔥"
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

                    ? "نبدأ 😏"
                    : "كمّل";

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

                        ? "نبدأ 😏"
                        : "كمّل";

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
   STEPS
========================================= */

const steps = [

    {
        key:"gender",

        question:
            "أول حاجة... أخاطبك إزاي؟ 😏",

        type:"gender"
    },


    {
        key:"name",

        question:
            "طيب دلوقتي الاسم بقى... اسمك إيه؟ 😊",

        type:"text",

        label:"اسمك",

        placeholder:"اكتب اسمك هنا"
    },


    {
        key:"age",

        question:
            "حلو يا ${name} 😄 سنك كام؟",

        type:"number",

        label:"العمر",

        placeholder:"مثال: 23",

        unit:"سنة"
    },


    {
        key:"weight",

        question:
            "ووزنك تقريبًا كام يا ${name}؟ الرقم مش حكم عليك، ده مجرد جزء من الصورة.",

        type:"number",

        label:"الوزن",

        placeholder:"مثال: 80",

        unit:"كجم"
    },


    {
        key:"height",

        question:
            "وطولك كام؟ 😏 عايزة أعرف أتعامل مع صاحب القامة دي إزاي.",

        type:"number",

        label:"الطول",

        placeholder:"مثال: 175",

        unit:"سم"
    },


    {
        key:"country",

        question:
            "إنت من أنهي بلد يا ${name}؟ 🌍 الشمس عندك مش شرط تكون زي الشمس عند حد تاني.",

        type:"text",

        label:"البلد",

        placeholder:"مثال: مصر"
    },


    {
        key:"skinTone",

        question:
            "وصلنا لواحدة مهمة ☀️ بشرتك أقرب لأنهي درجة؟ اختار الأقرب ليك.",

        type:"skin"
    },


    {
        key:"sunTime",

        question:
            "ولو هنخطط لوقتك مع الشمس... أنهي فترة تناسب يومك أكتر؟",

        type:"time"
    }

];


if(stepTotal){

    stepTotal.textContent =
        steps.length;

}


/* =========================================
   QUESTION PERSONALIZATION
========================================= */

function personalizeQuestion(text){

    return text
        .replace(
            "${name}",
            user.name ||
            "يا صديقي"
        );

}


/* =========================================
   QUESTION SANA
========================================= */

function setQuestionSana(){

    if(!questionSana) return;


    const step =
        steps[currentStep];


    const map = {

        gender:[
            "assets/sana_flirty.png",
            "😏"
        ],

        name:[
            "assets/sana_curious.png",
            "👀"
        ],

        age:[
            "assets/sana_happy.png",
            "😄"
        ],

        weight:[
            "assets/sana_calm.png",
            "💛"
        ],

        height:[
            "assets/sana_flirty.png",
            "😏"
        ],

        country:[
            "assets/sana_curious.png",
            "🌍"
        ],

        skinTone:[
            "assets/sana_thinking.png",
            "☀️"
        ],

        sunTime:[
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
   GENDER PERSONALITY
========================================= */

function getGenderStyle(){

    if(user.gender === "female"){

        return {
            word:"يا جميلة",
            pronoun:"المؤنث",
            image:"assets/sana_flirty.png",
            reaction:"😏"
        };

    }


    return {
        word:"يا بطل",
        pronoun:"المذكر",
        image:"assets/sana_flirty.png",
        reaction:"😏"
    };

}


/* =========================================
   RENDER STEP
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
        "نكمّل سوا 💛";

    nextButton.disabled = false;

    waitingForContinue = false;

    setQuestionSana();


    /* =====================================
       GENDER
    ====================================== */

    if(step.type === "gender"){

        answerArea.innerHTML = `

            <div class="gender-grid">

                <button
                    type="button"
                    class="gender-btn"
                    data-gender="male"
                >
                    👨
                    <br>
                    ولد
                </button>

                <button
                    type="button"
                    class="gender-btn"
                    data-gender="female"
                >
                    👩
                    <br>
                    بنت
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


                        const style =
                            getGenderStyle();


                        changeSanaImage(
                            questionSana,
                            style.image,
                            style.reaction
                        );

                    }
                );

            });

        return;

    }


    /* =====================================
       SKIN
    ====================================== */

    if(step.type === "skin"){

        answerArea.innerHTML = `

            <div class="skin-grid">

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="very-light"
                >
                    <span
                        class="skin-color"
                        style="background:#f6d1b1"
                    ></span>

                    <small>
                        فاتحة جدًا
                    </small>
                </button>


                <button
                    type="button"
                    class="skin-btn"
                    data-skin="light"
                >
                    <span
                        class="skin-color"
                        style="background:#e9b88e"
                    ></span>

                    <small>
                        فاتحة
                    </small>
                </button>


                <button
                    type="button"
                    class="skin-btn"
                    data-skin="medium"
                >
                    <span
                        class="skin-color"
                        style="background:#c9895d"
                    ></span>

                    <small>
                        متوسطة
                    </small>
                </button>


                <button
                    type="button"
                    class="skin-btn"
                    data-skin="dark"
                >
                    <span
                        class="skin-color"
                        style="background:#925b3e"
                    ></span>

                    <small>
                        سمراء
                    </small>
                </button>


                <button
                    type="button"
                    class="skin-btn"
                    data-skin="very-dark"
                >
                    <span
                        class="skin-color"
                        style="background:#573728"
                    ></span>

                    <small>
                        داكنة
                    </small>
                </button>

            </div>

        `;


        document
            .querySelectorAll(".skin-btn")
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
                                ".skin-btn"
                            )
                            .forEach(btn =>
                                btn.classList.remove(
                                    "active"
                                )
                            );


                        this.classList.add(
                            "active"
                        );


                        const color =
                            this
                                .querySelector(
                                    ".skin-color"
                                )
                                ?.style
                                .background;


                        const skinChip =
                            document.querySelector(
                                ".skin-chip i"
                            );


                        if(
                            skinChip &&
                            color
                        ){

                            skinChip.style.background =
                                color;

                        }


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
       TIME
    ====================================== */

    if(step.type === "time"){

        answerArea.innerHTML = `

            <div class="time-grid">

                <button
                    type="button"
                    class="time-btn"
                    data-time="morning"
                >
                    <span class="time-symbol">
                        🌅
                    </span>

                    <span class="time-name">
                        الصبح
                    </span>
                </button>


                <button
                    type="button"
                    class="time-btn"
                    data-time="midday"
                >
                    <span class="time-symbol">
                        ☀️
                    </span>

                    <span class="time-name">
                        الظهر
                    </span>
                </button>


                <button
                    type="button"
                    class="time-btn"
                    data-time="afternoon"
                >
                    <span class="time-symbol">
                        🌤️
                    </span>

                    <span class="time-name">
                        بعد الظهر
                    </span>
                </button>


                <button
                    type="button"
                    class="time-btn"
                    data-time="evening"
                >
                    <span class="time-symbol">
                        🌇
                    </span>

                    <span class="time-name">
                        العصر
                    </span>
                </button>

            </div>

        `;


        document
            .querySelectorAll(".time-btn")
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
                                ".time-btn"
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
       NORMAL INPUT
    ====================================== */

    answerArea.innerHTML = `

        <div class="field">

            <label>
                ${step.label}
            </label>

            <input
                id="answerInput"
                type="${step.type}"
                inputmode="${
                    step.type === "number"
                        ? "numeric"
                        : "text"
                }"
                placeholder="${step.placeholder}"
                value="${user[step.key]}"
            >

            ${
                step.unit
                    ? `<div class="unit">${step.unit}</div>`
                    : ""
            }

        </div>

    `;


    const input =
        document.getElementById(
            "answerInput"
        );


    if(input){

        setTimeout(
            () => input.focus(),
            50
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
   SAVE
========================================= */

function saveCurrentAnswer(){

    const step =
        steps[currentStep];


    if(step.type === "gender"){

        if(!user.gender){

            alert(
                "اختار الأول ولد ولا بنت 😏"
            );

            return false;

        }

        return true;

    }


    if(step.type === "skin"){

        if(!user.skinTone){

            alert(
                "اختار أقرب درجة لبشرتك الأول ☀️"
            );

            return false;

        }

        return true;

    }


    if(step.type === "time"){

        if(!user.sunTime){

            alert(
                "اختار الوقت اللي يناسب يومك الأول ☀️"
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
            "اكتبلي الإجابة الأول 😊"
        );

        input.focus();

        return false;

    }


    user[step.key] =
        value;


    return true;

}


/* =========================================
   RESPONSE
========================================= */

function getResponse(step){

    const name =
        user.name ||
        "يا صديقي";


    const female =
        user.gender === "female";


    const genderWord =
        female
            ? "يا جميلة"
            : "يا بطل";


    if(step.key === "gender"){

        changeSanaImage(
            questionSana,
            "assets/sana_flirty.png",
            female ? "😏" : "🔥"
        );


        return female

            ? `تمام يا جميلة 😏 من هنا هكلمك بصيغة المؤنث... كده اتفقنا.`

            : `تمام يا بطل 😏 من هنا هكلمك بصيغة المذكر... كده فهمت اللعبة.`;

    }


    if(step.key === "name"){

        changeSanaImage(
            questionSana,
            "assets/sana_happy.png",
            "💛"
        );


        return female

            ? `تشرفت بيكي يا ${user.name} 💛 خلاص كده الاسم دخل عند سنا رسمي.`

            : `تشرفت بيك يا ${user.name} 💛 خلاص كده الاسم دخل عند سنا رسمي.`;

    }


    if(step.key === "age"){

        const age =
            Number(user.age);


        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "😄"
        );


        return `
            تمام ${genderWord} 😄
            ${age} سنة واتسجلوا.
            لسه الصورة بتتكوّن عندي واحدة واحدة.
        `;

    }


    if(step.key === "weight"){

        changeSanaImage(
            questionSana,
            "assets/sana_calm.png",
            "💛"
        );


        return `
            وصلت يا ${name} 💛
            ${user.weight} كجم.
            الرقم ده لوحده مش هيحكم على أي حاجة.
        `;

    }


    if(step.key === "height"){

        changeSanaImage(
            questionSana,
            "assets/sana_flirty.png",
            "😏"
        );


        const height =
            Number(user.height);


        let extra = "";


        if(height >= 185){

            extra =
                " وبالمناسبة... الطول ده محتاج شاشة أطول شوية 😂";

        }

        else if(height >= 175){

            extra =
                " تمام يا طويل 😏";

        }


        return `
            تمام يا ${name} 🌱
            ${user.height} سم اتسجلت.
            ${extra}
        `;

    }


    if(step.key === "country"){

        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "🌍"
        );


        return `
            وصلت يا ${name} 🌍
            سجلت ${user.country}.
            والمكان ده هيبقى مهم جدًا لما نبدأ نقرأ الشمس الحقيقية.
        `;

    }


    if(step.key === "skinTone"){

        changeSanaImage(
            questionSana,
            "assets/sana_thinking.png",
            "☀️"
        );


        return `
            تمام يا ${name} ☀️
            درجة بشرتك دخلت الحساب.
            دلوقتي SunDose بدأ يفهم استجابتك للشمس بشكل أفضل.
        `;

    }


    if(step.key === "sunTime"){

        changeSanaImage(
            questionSana,
            "assets/sana_sun_01.png",
            "☀️"
        );


        return `
            حلو يا ${name} ☀️
            كده خلصنا الطبقة الأولى من بياناتك.
            دلوقتي عندي حاجة أهم...
            نشوف الشمس نفسها بدل ما نتوقعها.
        `;

    }


    return `
        تمام يا ${name} 💛
        سجلت المعلومة.
    `;

}


/* =========================================
   NEXT BUTTON
========================================= */

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

                showHabits();

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

            30,

            function(){

                nextButton.disabled =
                    false;

            }

        );

    }
);


/* =========================================
   START
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
   HABITS
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
        "صديقي";


    habitMessage.textContent =

        `كده يا ${name} أنا عرفت الطبقة الأولى منك 💛 دلوقتي عندنا كذا حاجة نقدر نبنيها على بياناتك. بس أنا عندي فضول أعرف الشمس الأول ☀️`;


    const habitData = [

        {
            id:"sun",
            icon:"☀️",
            title:"جرعة الشمس",
            text:"المكان + UV + البشرة + الوقت."
        },

        {
            id:"water",
            icon:"💧",
            title:"شرب المياه",
            text:"هنبنيها من بياناتك ونشاطك."
        },

        {
            id:"exercise",
            icon:"🏃",
            title:"الحركة",
            text:"نشاط مناسب ليومك."
        },

        {
            id:"supplements",
            icon:"✦",
            title:"العلاج والمكملات",
            text:"تنظيم المعلومات بشكل آمن."
        }

    ];


    habitList.innerHTML =

        habitData.map(
            habit => `

                <div
                    class="habit"
                    data-habit="${habit.id}"
                >

                    <div class="icon">
                        ${habit.icon}
                    </div>

                    <b>
                        ${habit.title}
                    </b>

                    <p>
                        ${habit.text}
                    </p>

                </div>

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


                    document
                        .querySelectorAll(".habit")
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );


                    this.classList.add(
                        "active"
                    );


                    if(selected === "sun"){

                        openSunLearn();

                    }

                    else{

                        changeSanaImage(
                            habitSana,
                            "assets/sana_thinking.png",
                            "💛"
                        );


                        alert(
                            "هنفتح القسم ده بعد ما نخلص محطة الشمس ☀️"
                        );

                    }

                }
            );

        });

}


/* =========================================
   SUN EDUCATION
========================================= */

function openSunLearn(){

    showPage(sunLearn);


    changeSanaImage(
        learnSana,
        "assets/sana_sun_01.png",
        "☀️"
    );


    const name =
        user.name ||
        "يا صديقي";


    learnMessage.textContent =
        `بص يا ${name} ☀️ قبل ما أحسب أي حاجة، لازم تعرف إحنا بنقيس الشمس ليه. الـUV ببساطة هو مقياس لقوة الأشعة فوق البنفسجية اللي واصلة للأرض. كل ما الرقم يعلى، التأثير على الجلد والعين ممكن يحصل في وقت أقل.`;


    if(startSunAnalysis){

        startSunAnalysis.textContent =
            "يلا نشوف شمسك الحقيقية ☀️";

    }

}


/* =========================================
   START SUN ANALYSIS
========================================= */

if(startSunAnalysis){

    startSunAnalysis.addEventListener(
        "click",
        function(){

            openSunDose();

        }
    );

}


if(backFromLearn){

    backFromLearn.addEventListener(
        "click",
        function(){

            showHabits();

        }
    );

}


/* =========================================
   OPEN SUN
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
        "صديقي";


    sunMessage.textContent =

        `أهو كده يا ${name} ☀️ دلوقتي بقى دوري الحقيقي. هآخد بياناتك، وأشوف الشمس عند مكانك، وبعدها أركّب الصورة كلها مع بعض.`;


    updateSunUserData();

}


/* =========================================
   USER DATA
========================================= */

function updateSunUserData(){

    const skinNames = {

        "very-light":"فاتحة جدًا",
        "light":"فاتحة",
        "medium":"متوسطة",
        "dark":"سمراء",
        "very-dark":"داكنة"

    };


    const timeNames = {

        morning:"الصبح",
        midday:"الظهر",
        afternoon:"بعد الظهر",
        evening:"العصر"

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
            "غير محدد";

    }


    if(uvValue){

        uvValue.textContent =
            "—";

    }


    const skinColors = {

        "very-light":"#f6d1b1",
        "light":"#e9b88e",
        "medium":"#c9895d",
        "dark":"#925b3e",
        "very-dark":"#573728"

    };


    const skinChip =
        document.querySelector(
            ".skin-chip i"
        );


    if(
        skinChip &&
        skinColors[user.skinTone]
    ){

        skinChip.style.background =
            skinColors[user.skinTone];

    }

}


/* =========================================
   LOCATION
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
        "📍 سنا بتحدد مكانك...";


    sunStatus.textContent =
        "بنحدد موقعك الحقيقي...";


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
                "محتاجين إذن الموقع عشان سنا تقرأ الشمس الحقيقية عندك."
            );

        },

        {
            enableHighAccuracy:true,
            timeout:10000,
            maximumAge:300000
        }

    );

}


/* =========================================
   WEATHER + UV
========================================= */

async function loadSunData(
    latitude,
    longitude
){

    sunStatus.textContent =
        "سنا بتقرأ الشمس والطقس...";


    analysisTitle.textContent =
        "بنحلل البيانات";


    analysisText.textContent =
        "الموقع وصل. دلوقتي بنجمع UV والحرارة والنهار والشروق والغروب.";


    try{

        const url =

            `https://api.open-meteo.com/v1/forecast` +

            `?latitude=${latitude}` +

            `&longitude=${longitude}` +

            `&current=temperature_2m,uv_index,is_day,cloud_cover` +

            `&hourly=uv_index,temperature_2m,cloud_cover` +

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


        const cloudCover =
            Number(
                data.current?.cloud_cover ?? 0
            );


        const uvMax =
            Number(
                data.daily?.uv_index_max?.[0] ?? uv
            );


        updateSunResult(
            latitude,
            longitude,
            uv,
            temperature,
            isDay,
            cloudCover,
            uvMax
        );


    }catch(error){

        console.error(
            "SunDose API:",
            error
        );


        sunStatus.textContent =
            "تعذر قراءة بيانات الشمس";


        analysisTitle.textContent =
            "مفيش قراءة حالية";


        analysisText.textContent =
            "حصلت مشكلة في الاتصال ببيانات الطقس. جرّب تاني بعد لحظات.";


        analysisIcon.textContent =
            "🌥️";


        locationButton.disabled =
            false;

        locationButton.textContent =
            "🔄 المحاولة مرة تانية";

    }

}


/* =========================================
   SUN RESULT
========================================= */

function updateSunResult(
    latitude,
    longitude,
    uv,
    temperature,
    isDay,
    cloudCover,
    uvMax
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
            "الشمس دلوقتي تحت الأفق 🌙";

        analysisTitle.textContent =
            "مفيش شمس دلوقتي";

        analysisText.textContent =
            "وده بالظبط اللي كنا عايزين نعرفه. SunDose مش هيخمن جرعة بالليل؛ هنستنى نافذة شمس فعلية.";

        analysisIcon.textContent =
            "🌙";


        doseResult.classList.add(
            "hidden"
        );

        doseMeterFill.style.width =
            "0%";

    }

    else{

        if(uv < 3){

            sunStatus.textContent =
                `UV هادي • ${temperature}°`;

            analysisTitle.textContent =
                "الشمس هادية ☀️";

            analysisText.textContent =
                `الـUV دلوقتي ${roundedUV}. الرقم منخفض نسبيًا، وسنا هتستخدم باقي بياناتك بدل ما تعتمد على UV لوحده.`;

            analysisIcon.textContent =
                "🌤️";

        }

        else if(uv < 6){

            sunStatus.textContent =
                `UV متوسط • ${temperature}°`;

            analysisTitle.textContent =
                "الشمس نشطة ☀️";

            analysisText.textContent =
                `الـUV دلوقتي ${roundedUV}. هنا بقى بيانات البشرة والوقت والمكان تبدأ تفرق في القراءة.`;

            analysisIcon.textContent =
                "☀️";

        }

        else if(uv < 8){

            sunStatus.textContent =
                `UV مرتفع • ${temperature}°`;

            analysisTitle.textContent =
                "الشمس قوية ⚠️";

            analysisText.textContent =
                `الـUV ${roundedUV}، وده مستوى محتاج تعامل أكثر حذرًا مع التعرض المباشر.`;

            analysisIcon.textContent =
                "⚠️";

        }

        else{

            sunStatus.textContent =
                `UV شديد • ${temperature}°`;

            analysisTitle.textContent =
                "الشمس شديدة جدًا ⚠️";

            analysisText.textContent =
                `الـUV ${roundedUV}. SunDose هنا مش هيشجع على التعرض غير المحمي لمجرد الوصول لرقم معين.`;

            analysisIcon.textContent =
                "🚫";

        }


        calculateSunPlan(
            uv,
            cloudCover,
            uvMax
        );

    }


    locationButton.classList.add(
        "hidden"
    );


    /* =====================================
       SANA REACTION
    ====================================== */

    if(uv >= 8){

        changeSanaImage(
            sunSana,
            "assets/sana_calm.png",
            "⚠️"
        );

    }

    else if(uv >= 3){

        changeSanaImage(
            sunSana,
            "assets/sana_excited.png",
            "☀️"
        );

    }

    else{

        changeSanaImage(
            sunSana,
            "assets/sana_calm.png",
            "🌤️"
        );

    }


    const name =
        user.name ||
        "صديقي";


    if(!isDay){

        sunMessage.textContent =
            `لقيتها يا ${name} 🌙 الشمس مش موجودة دلوقتي، وده أحسن من أي تخمين. SunDose شاف الحقيقة وقالك الحقيقة.`;

    }

    else{

        sunMessage.textContent =
            `وصلنا يا ${name} ☀️ دي الشمس الحقيقية عند مكانك. دلوقتي بقى نقدر نركّب بياناتك مع بيانات الجو بدل رقم عام للكل.`;

    }

}


/* =========================================
   PERSONAL SUN PLAN
========================================= */

function calculateSunPlan(
    uv,
    cloudCover,
    uvMax
){

    /*
        مهم:
        الرقم الناتج هنا "تخطيط تعرّض"
        وليس جرعة طبية.

        لا يتم استخدامه لتشخيص نقص فيتامين D
        ولا كوصفة طبية.
    */


    const skinFactor = {

        "very-light":0.55,
        "light":0.70,
        "medium":0.90,
        "dark":1.15,
        "very-dark":1.35

    };


    const selectedSkin =
        skinFactor[user.skinTone] ||
        0.90;


    /*
        كلما زاد UV:
        يقل الوقت التخطيطي.

        هذه ليست معادلة طبية للحروق،
        وإنما مؤشر داخلي لتخطيط SunDose.
    */

    let baseMinutes;


    if(uv <= 0){

        baseMinutes = 0;

    }

    else if(uv < 1){

        baseMinutes = 30;

    }

    else if(uv < 3){

        baseMinutes = 25;

    }

    else if(uv < 5){

        baseMinutes = 18;

    }

    else if(uv < 7){

        baseMinutes = 12;

    }

    else if(uv < 9){

        baseMinutes = 7;

    }

    else{

        baseMinutes = 0;

    }


    /*
        البشرة الداكنة تسمح
        بمؤشر تخطيط أطول،
        لكن لا يعني ذلك أن الضرر مستحيل.
    */

    let calculated =
        baseMinutes *
        selectedSkin;


    /*
        الغيوم لا تعني اختفاء UV.
        لذلك نعمل تعديل بسيط فقط
        ولا نسمح للسحاب بتصفير الشمس.
    */

    const cloudFactor =
        1 -
        (
            Math.min(
                cloudCover,
                80
            ) / 100 * .15
        );


    calculated *=
        cloudFactor;


    /*
        وقت المستخدم
    */

    if(user.sunTime === "midday"){

        calculated *= .80;

    }

    else if(
        user.sunTime === "morning" ||
        user.sunTime === "evening"
    ){

        calculated *= 1.10;

    }


    calculated =
        Math.round(
            calculated
        );


    /*
        UV مرتفع جدًا:
        لا نعرض وقت تعرض مباشر.
    */

    if(uv >= 8){

        calculated = 0;

    }


    /*
        عرض العداد
    */

    const meterPercent =
        Math.min(
            100,
            Math.max(
                0,
                (uv / 11) * 100
            )
        );


    if(doseMeterFill){

        doseMeterFill.style.width =
            `${meterPercent}%`;

    }


    if(
        !doseResult ||
        !doseMinutes ||
        !doseTitle ||
        !doseText
    ){

        return;

    }


    if(uv >= 8){

        doseResult.classList.remove(
            "hidden"
        );


        doseMinutes.textContent =
            "—";


        doseTitle.textContent =
            "سنا مش هتديك وقت تعرض مباشر";


        doseText.textContent =
            "الـUV شديد جدًا. الأولوية هنا للحماية والظل، مش مطاردة رقم بالدقائق.";

        return;

    }


    if(calculated <= 0){

        doseResult.classList.add(
            "hidden"
        );

        return;

    }


    doseResult.classList.remove(
        "hidden"
    );


    doseMinutes.textContent =
        calculated;


    if(uv < 3){

        doseTitle.textContent =
            "نافذة هادئة نسبيًا ☀️";

        doseText.textContent =
            "دي قراءة تخطيطية مبنية على بياناتك الحالية. لو هدفك فيتامين D أو عندك حالة خاصة، ده محتاج تقييم طبي منفصل.";

    }

    else if(uv < 6){

        doseTitle.textContent =
            "نافذة قصيرة ومركزة ☀️";

        doseText.textContent =
            "الشمس نشطة، فـSunDose بيقلل الوقت التخطيطي بدل ما يدي نفس الرقم لكل الناس.";

    }

    else{

        doseTitle.textContent =
            "نافذة شديدة الحذر ⚠️";

        doseText.textContent =
            "الـUV مرتفع. الرقم هنا للتخطيط فقط، والحماية أهم من محاولة إكمال وقت معين.";

    }

}


/* =========================================
   LOCATION ERROR
========================================= */

function showLocationError(
    message
){

    sunStatus.textContent =
        "الموقع محتاج إذن";


    analysisTitle.textContent =
        "محتاج موقعك 📍";


    analysisText.textContent =
        message;


    analysisIcon.textContent =
        "📍";


    locationButton.disabled =
        false;

    locationButton.textContent =
        "📍 تحديد موقعي وابدأ التحليل";

}


/* =========================================
   BACK
========================================= */

if(backToHabits){

    backToHabits.addEventListener(
        "click",
        function(){

            showHabits();

        }
    );

}


/* =========================================
   SAFETY / DEBUG
========================================= */

if(!startButton){

    console.error(
        "SunDose: startButton غير موجود"
    );

}

if(!nextButton){

    console.error(
        "SunDose: nextButton غير موجود"
    );

}

if(!habitList){

    console.error(
        "SunDose: habitList غير موجود"
    );

           }
