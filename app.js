/* =========================================
   SunDose ☀️
   المرحلة الأولى + محطة الشمس
   Creative Engine
========================================= */


/* =========================================
   بيانات المستخدم
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


const sunMessage =
    document.getElementById("sunMessage");

const backToHabits =
    document.getElementById("backToHabits");


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

const sanaReaction =
    document.getElementById("sanaReaction");


/* =========================================
   محطة الشمس
========================================= */

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

const temperatureValue =
    document.getElementById("temperatureValue");

const uvValue =
    document.getElementById("uvValue");

const uvBig =
    document.getElementById("uvBig");

const analysisTitle =
    document.getElementById("analysisTitle");

const analysisText =
    document.getElementById("analysisText");

const analysisIcon =
    document.getElementById("analysisIcon");


/* =========================================
   نافذة اليوم
========================================= */

const sunWindow =
    document.getElementById("sunWindow");

const sunriseValue =
    document.getElementById("sunriseValue");

const sunsetValue =
    document.getElementById("sunsetValue");

const windowValue =
    document.getElementById("windowValue");

const windowLabel =
    document.getElementById("windowLabel");

const windowTitle =
    document.getElementById("windowTitle");

const windowText =
    document.getElementById("windowText");

const windowIcon =
    document.getElementById("windowIcon");

const dayProgress =
    document.getElementById("dayProgress");

const preferredTimeValue =
    document.getElementById(
        "preferredTimeValue"
    );


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

    if(!element){

        return;

    }


    element.classList.remove(
        "sana-changing"
    );


    void element.offsetWidth;


    element.classList.add(
        "sana-changing"
    );


    element.src =
        image;


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
   عرض الصفحة
========================================= */

function showPage(page){

    [
        home,
        welcome,
        habits,
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
   الكتابة
========================================= */

function typeSanaText(
    text,
    element,
    speed = 38,
    callback = null
){

    if(!element){

        return;

    }


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
        setInterval(
            () => {

                element.textContent +=
                    text.charAt(index);

                index++;


                if(
                    index >=
                    text.length
                ){

                    clearInterval(
                        typingTimer
                    );

                    typingTimer = null;

                    isTyping = false;


                    if(callback){

                        callback();

                    }

                }

            },
            speed
        );

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
   المقدمة
========================================= */

const introMessages = [

    "أهلًا 💛 أنا سنا... ومش عايزة أبدأ معاك بأسئلة كأنك داخل تملى استمارة 😄",

    "أنا سنا ☀️ ووجودي هنا عشان أساعدك تفهم علاقتك بالشمس والعادات اللي ممكن تفرق في يومك.",

    "الفكرة بسيطة... بدل ما SunDose يقول كلام عام لكل الناس، أنا الأول أتعرف عليك.",

    "بعدها المكان والوقت والبشرة والجو يبدأوا يدخلوا في الصورة، وكل قراءة تبقى أقرب ليومك الحقيقي.",

    "ومش هسيبك قدام أرقام معقدة. أنا هفهمها وأقولك معناها بالمصري وباختصار.",

    "خد راحتك 💛 نبدأ التعارف، وبعدها نشوف الشمس بنفسنا."
];


function setIntroSana(){

    if(!sanaImage){

        return;

    }


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
            "assets/sana_calm.png",
            "🌱"
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


    introNext.disabled =
        true;


    setIntroSana();


    typeSanaText(

        introMessages[
            introStep
        ],

        introText,

        32,

        function(){

            introNext.disabled =
                false;


            introNext.textContent =

                introStep ===
                introMessages.length - 1

                    ? "نبدأ التعارف ☀️"
                    : "كمّل معايا";

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
                    introMessages[
                        introStep
                    ];

                introNext.disabled =
                    false;

                introNext.textContent =

                    introStep ===
                    introMessages.length - 1

                        ? "نبدأ التعارف ☀️"
                        : "كمّل معايا";

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
========================================= */

const steps = [

    {
        key:"name",

        question:
            "أول حاجة بقى... اسمك إيه؟ 😊",

        type:"text",

        label:"اسمك",

        placeholder:
            "اكتب اسمك هنا"

    },


    {
        key:"gender",

        question:
            "حلو جدًا 💛 أخاطبك إزاي عشان كلام سنا يبقى طبيعي ومناسب ليك؟",

        type:"gender"

    },


    {
        key:"age",

        question:
            "طيب سنك كام؟ 😄 السن هيساعدني أفهم المرحلة العمرية المناسبة.",

        type:"number",

        label:"العمر",

        placeholder:
            "مثال: 23",

        unit:"سنة"

    },


    {
        key:"weight",

        question:
            "وزنك كام تقريبًا؟ الرقم مش حكم عليك، هربطه بباقي بياناتك.",

        type:"number",

        label:"الوزن",

        placeholder:
            "مثال: 80",

        unit:"كجم"

    },


    {
        key:"height",

        question:
            "وطولك كام؟ 🌱 كده أقدر أربط الطول بالوزن والعمر.",

        type:"number",

        label:"الطول",

        placeholder:
            "مثال: 175",

        unit:"سم"

    },


    {
        key:"country",

        question:
            "إنت من أنهي بلد؟ 🌍 المكان بيفرق في الشمس والطقس وطول النهار.",

        type:"text",

        label:"البلد",

        placeholder:
            "مثال: مصر"

    },


    {
        key:"skinTone",

        question:
            "وصلنا لحاجة مهمة ☀️ لون بشرتك أقرب لأنهي درجة؟",

        type:"skin"

    },


    {
        key:"sunTime",

        question:
            "ولو هتتعرض للشمس، أنهي وقت يناسب يومك أكتر؟ ☀️",

        type:"time"

    }

];


if(stepTotal){

    stepTotal.textContent =
        steps.length;

}


/* =========================================
   سنا حسب السؤال
========================================= */

function setQuestionSana(){

    if(!questionSana){

        return;

    }


    const step =
        steps[currentStep];


    const map = {

        name:[
            "assets/sana_curious.png",
            "👀"
        ],

        gender:[
            "assets/sana_happy.png",
            "💛"
        ],

        age:[
            "assets/sana_curious.png",
            "😄"
        ],

        weight:[
            "assets/sana_calm.png",
            "💛"
        ],

        height:[
            "assets/sana_thinking.png",
            "🤔"
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
   عرض السؤال
========================================= */

function renderStep(){

    const step =
        steps[currentStep];


    question.textContent =
        step.question;


    if(progressBar){

        progressBar.style.width =
            (
                (
                    currentStep + 1
                ) /
                steps.length *
                100
            ) + "%";

    }


    if(stepNumber){

        stepNumber.textContent =
            currentStep + 1;

    }


    answerArea.innerHTML =
        "";


    nextButton.textContent =
        "نكمّل سوا";


    nextButton.disabled =
        false;


    waitingForContinue =
        false;


    setQuestionSana();


    /* =====================================
       الجنس
    ====================================== */

    if(
        step.type ===
        "gender"
    ){

        answerArea.innerHTML = `

            <div class="gender-grid">

                <button
                    type="button"
                    class="gender-btn"
                    data-gender="male"
                >
                    👨 ولد
                </button>

                <button
                    type="button"
                    class="gender-btn"
                    data-gender="female"
                >
                    👩 بنت
                </button>

            </div>

        `;


        document
            .querySelectorAll(
                ".gender-btn"
            )
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


                        changeSanaImage(

                            questionSana,

                            user.gender ===
                            "female"

                                ? "assets/sana_flirty.png"

                                : "assets/sana_happy.png",

                            "💛"

                        );

                    }
                );

            });


        return;

    }


    /* =====================================
       البشرة
    ====================================== */

    if(
        step.type ===
        "skin"
    ){

        answerArea.innerHTML = `

            <div class="skin-grid">

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="very-light"
                >
                    فاتحة جدًا
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="light"
                >
                    فاتحة
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="medium"
                >
                    متوسطة
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="dark"
                >
                    سمراء
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="very-dark"
                >
                    داكنة
                </button>

            </div>

        `;


        document
            .querySelectorAll(
                ".skin-btn"
            )
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
    ====================================== */

    if(
        step.type ===
        "time"
    ){

        answerArea.innerHTML = `

            <div class="time-grid">

                <button
                    type="button"
                    class="time-btn"
                    data-time="morning"
                >
                    🌅<br>
                    الصبح
                </button>

                <button
                    type="button"
                    class="time-btn"
                    data-time="midday"
                >
                    ☀️<br>
                    الظهر
                </button>

                <button
                    type="button"
                    class="time-btn"
                    data-time="afternoon"
                >
                    🌤️<br>
                    بعد الظهر
                </button>

                <button
                    type="button"
                    class="time-btn"
                    data-time="evening"
                >
                    🌇<br>
                    العصر
                </button>

            </div>

        `;


        document
            .querySelectorAll(
                ".time-btn"
            )
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
       الحقول العادية
    ====================================== */

    answerArea.innerHTML = `

        <div class="field">

            <label>
                ${step.label}
            </label>

            <input
                id="answerInput"
                type="${step.type}"
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
                    event.key ===
                    "Enter"
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


    if(
        step.type ===
        "gender"
    ){

        if(!user.gender){

            alert(
                "اختار الأول الطريقة اللي تحب سنا تكلمك بيها 💛"
            );

            return false;

        }

        return true;

    }


    if(
        step.type ===
        "skin"
    ){

        if(!user.skinTone){

            alert(
                "اختار درجة بشرتك الأول ☀️"
            );

            return false;

        }

        return true;

    }


    if(
        step.type ===
        "time"
    ){

        if(!user.sunTime){

            alert(
                "اختار الوقت اللي يناسبك الأول ☀️"
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
   رد سنا
========================================= */

function getResponse(step){

    const name =
        user.name ||
        "يا صديقي";


    const female =
        user.gender ===
        "female";


    if(
        step.key ===
        "name"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_happy.png",
            "💛"
        );


        return `
            تشرفت بيك يا ${user.name} 💛
            كده أول خيط بينا اتعمل.
        `;

    }


    if(
        step.key ===
        "gender"
    ){

        return female

            ? `تمام يا ${name} 💛 من هنا هكلمك بصيغة المؤنث.`

            : `تمام يا ${name} 😄 من هنا هكلمك بصيغة المذكر.`;

    }


    if(
        step.key ===
        "age"
    ){

        const age =
            Number(user.age);


        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "😄"
        );


        return `
            تمام يا ${name} 😄
            سنك ${age} سنة واتسجل عندي.
        `;

    }


    if(
        step.key ===
        "weight"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_calm.png",
            "💛"
        );


        return `
            وصلني وزنك ${user.weight} كجم يا ${name} 💛
            ولسه مش هحكم على الرقم لوحده.
        `;

    }


    if(
        step.key ===
        "height"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_thinking.png",
            "🤔"
        );


        return `
            تمام يا ${name} 🌱
            ${user.height} سم مع باقي بياناتك بقوا جزء من الصورة.
        `;

    }


    if(
        step.key ===
        "country"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "🌍"
        );


        return `
            وصلت يا ${name} 🌍
            سجلت ${user.country}.
            المكان مهم جدًا عشان الشمس مش واحدة في كل حتة.
        `;

    }


    if(
        step.key ===
        "skinTone"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_thinking.png",
            "☀️"
        );


        return `
            تمام يا ${name} ☀️
            درجة بشرتك دخلت الصورة.
        `;

    }


    if(
        step.key ===
        "sunTime"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_sun_01.png",
            "☀️"
        );


        return `
            حلو يا ${name} ☀️
            كده خلصنا أول طبقة.
            دلوقتي بقى نسيب الأسئلة ونشوف الشمس الحقيقية.
        `;

    }


    return `
        تمام يا ${name} 💛
        سجلت المعلومة.
    `;

}


/* =========================================
   زر المتابعة
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

                    showHabits();

                }

                return;

            }


            if(
                !saveCurrentAnswer()
            ){

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

            showPage(
                welcome
            );

            currentStep =
                0;

            renderStep();

        }
    );

}


/* =========================================
   العادات
========================================= */

function showHabits(){

    showPage(
        habits
    );


    changeSanaImage(
        habitSana,
        "assets/sana_happy.png",
        "💛"
    );


    const name =
        user.name ||
        "صديقي";


    habitMessage.textContent =

        `كده يا ${name} عرفت عنك أول طبقة 💛 دلوقتي نبدأ نحول الكلام لحاجات حقيقية تخص يومك.`;


    const habitData = [

        {
            id:"sun",

            icon:"☀️",

            title:"جرعة الشمس",

            text:
                "مكانك + UV + الوقت + البشرة"

        },


        {
            id:"water",

            icon:"💧",

            title:"المياه",

            text:
                "نفهم احتياج يومك"

        },


        {
            id:"exercise",

            icon:"🏃",

            title:"الحركة",

            text:
                "نشاط يناسب يومك"

        },


        {
            id:"supplements",

            icon:"✦",

            title:"العلاج",

            text:
                "تنظيم المعلومات"

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
        .querySelectorAll(
            ".habit"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                function(){

                    const selected =
                        this.dataset.habit;


                    document
                        .querySelectorAll(
                            ".habit"
                        )
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );


                    this.classList.add(
                        "active"
                    );


                    if(
                        selected ===
                        "sun"
                    ){

                        openSunDose();

                    }

                    else{

                        changeSanaImage(
                            habitSana,
                            "assets/sana_thinking.png",
                            "💛"
                        );


                        alert(
                            "القسم ده جاي بعد محطة الشمس ☀️"
                        );

                    }

                }
            );

        });

}


/* =========================================
   محطة الشمس
========================================= */

function openSunDose(){

    showPage(
        sunDose
    );


    changeSanaImage(
        sunSana,
        "assets/sana_sun_01.png",
        "☀️"
    );


    const name =
        user.name ||
        "صديقي";


    sunMessage.textContent =

        `أهو وصلنا يا ${name} ☀️ هنا بقى مش هنخمن. سنا هتشوف الشمس الحقيقية عند مكانك وتفهمك معناها ببساطة.`;


    updateSunUserData();


    if(sunWindow){

        sunWindow.classList.add(
            "hidden"
        );

    }


    if(locationButton){

        locationButton.classList.remove(
            "hidden"
        );

        locationButton.disabled =
            false;

        locationButton.innerHTML = `

            <span class="location-icon">
                ⌖
            </span>

            <span>
                خلّي سنا تشوف شمسك
            </span>

        `;

    }

}


/* =========================================
   بيانات المستخدم
========================================= */

function updateSunUserData(){

    const skinNames = {

        "very-light":
            "فاتحة جدًا",

        "light":
            "فاتحة",

        "medium":
            "متوسطة",

        "dark":
            "سمراء",

        "very-dark":
            "داكنة"

    };


    const timeNames = {

        morning:
            "الصبح",

        midday:
            "الظهر",

        afternoon:
            "بعد الظهر",

        evening:
            "العصر"

    };


    if(sunSkinValue){

        sunSkinValue.textContent =
            skinNames[
                user.skinTone
            ] || "—";

    }


    if(sunTimeValue){

        sunTimeValue.textContent =
            timeNames[
                user.sunTime
            ] || "—";

    }


    if(sunLocationValue){

        sunLocationValue.textContent =
            "غير محدد";

    }


    if(temperatureValue){

        temperatureValue.textContent =
            "—";

    }


    if(uvValue){

        uvValue.textContent =
            "—";

    }


    if(uvBig){

        uvBig.textContent =
            "—";

    }

}


/* =========================================
   الموقع
========================================= */

if(locationButton){

    locationButton.addEventListener(
        "click",
        requestLocation
    );

}


function requestLocation(){

    if(
        !navigator.geolocation
    ){

        showLocationError(
            "المتصفح ده مش بيدعم تحديد الموقع."
        );

        return;

    }


    locationButton.disabled =
        true;


    locationButton.innerHTML = `

        <span class="location-icon">
            ⌖
        </span>

        <span>
            سنا بتدور عليك...
        </span>

    `;


    sunStatus.textContent =
        "بنحدد مكانك الحقيقي...";


    navigator.geolocation.getCurrentPosition(

        position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            loadSunData(
                latitude,
                longitude
            );

        },


        error => {

            console.error(
                "SunDose location:",
                error
            );


            showLocationError(
                "محتاجين إذن الموقع عشان سنا تقرأ الشمس عند مكانك."
            );

        },


        {

            enableHighAccuracy:
                true,

            timeout:
                10000,

            maximumAge:
                300000

        }

    );

}


/* =========================================
   قراءة الشمس
========================================= */

async function loadSunData(
    latitude,
    longitude
){

    sunStatus.textContent =
        "بنقرأ الشمس والـUV...";


    analysisTitle.textContent =
        "سنا بتفك شفرة الشمس";

    analysisText.textContent =
        "ثواني... بجمع المكان والـUV والحرارة والشروق والغروب.";


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
            await fetch(
                url
            );


        if(
            !response.ok
        ){

            throw new Error(
                "Weather API error"
            );

        }


        const data =
            await response.json();


        sunData =
            data;


        const uv =
            Number(
                data.current?.uv_index ??
                0
            );


        const temperature =
            Number(
                data.current?.temperature_2m ??
                0
            );


        const isDay =
            Number(
                data.current?.is_day ??
                0
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
            "الشمس مستخبية عن سنا 😅";


        analysisTitle.textContent =
            "القراءة وقفت شوية";

        analysisText.textContent =
            "حصلت مشكلة في الاتصال ببيانات الطقس. جرّب تاني بعد لحظات.";

        analysisIcon.textContent =
            "☁";


        locationButton.disabled =
            false;


        locationButton.innerHTML = `

            <span class="location-icon">
                ↻
            </span>

            <span>
                نجرب تاني
            </span>

        `;

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


    if(temperatureValue){

        temperatureValue.textContent =
            `${temperature}°`;

    }


    if(uvValue){

        uvValue.textContent =
            roundedUV.toString();

    }


    if(uvBig){

        uvBig.textContent =
            roundedUV.toString();

    }


    /* =====================================
       شرح UV بالمصري
    ====================================== */

    if(!isDay){

        sunStatus.textContent =
            "الشمس مش ظاهرة دلوقتي 🌙";


        analysisTitle.textContent =
            "النهار خلص";

        analysisText.textContent =
            "الـUV دلوقتي شبه معدوم لأن الشمس تحت الأفق. سنا هتستنى وقت النهار بدل ما تخمن.";

        analysisIcon.textContent =
            "☾";


        changeSanaImage(
            sunSana,
            "assets/sana_calm.png",
            "🌙"
        );

    }


    else if(
        uv < 3
    ){

        sunStatus.textContent =
            `UV ${roundedUV} • هادي`;


        analysisTitle.textContent =
            "الشمس هادية 🌤️";


        analysisText.textContent =
            `الـUV ${roundedUV}. ببساطة ده معناه إن الأشعة فوق البنفسجية دلوقتي مش قوية أوي.`;

        analysisIcon.textContent =
            "☼";


        changeSanaImage(
            sunSana,
            "assets/sana_calm.png",
            "🌤️"
        );

    }


    else if(
        uv < 6
    ){

        sunStatus.textContent =
            `UV ${roundedUV} • نشطة`;


        analysisTitle.textContent =
            "الشمس بدأت تقوى ☀️";


        analysisText.textContent =
            `الـUV ${roundedUV}. يعني الأشعة بقت أقوى، وهنا الوقت والبشرة بقوا مهمين أكتر.`;

        analysisIcon.textContent =
            "☀";


        changeSanaImage(
            sunSana,
            "assets/sana_excited.png",
            "☀️"
        );

    }


    else if(
        uv < 8
    ){

        sunStatus.textContent =
            `UV ${roundedUV} • قوي`;


        analysisTitle.textContent =
            "الشمس قوية ⚠️";


        analysisText.textContent =
            `الـUV ${roundedUV}. يعني الأشعة فوق البنفسجية قوية دلوقتي، فالحماية بقت أهم.`;

        analysisIcon.textContent =
            "⚠";


        changeSanaImage(
            sunSana,
            "assets/sana_calm.png",
            "⚠️"
        );

    }


    else{

        sunStatus.textContent =
            `UV ${roundedUV} • شديد`;


        analysisTitle.textContent =
            "الشمس شديدة جدًا 🚫";


        analysisText.textContent =
            `الـUV ${roundedUV}. الرقم عالي جدًا، وسنا مش هتشجع تعرض غير محمي في الحالة دي.`;

        analysisIcon.textContent =
            "×";


        changeSanaImage(
            sunSana,
            "assets/sana_calm.png",
            "⚠️"
        );

    }


    /* =====================================
       إخفاء زر الموقع
    ====================================== */

    locationButton.classList.add(
        "hidden"
    );


    /* =====================================
       نافذة اليوم
    ====================================== */

    renderSunWindow(
        sunData
    );


    const name =
        user.name ||
        "صديقي";


    if(!isDay){

        sunMessage.textContent =
            `تمام يا ${name} 🌙 سنا شافت إن الشمس مش موجودة دلوقتي. مش هخمنلك وقت من عندي، خلينا نبص على يومك نفسه.`;

    }else{

        sunMessage.textContent =
            `لقيتها يا ${name} ☀️ دي الشمس الحقيقية عند مكانك. دلوقتي نقدر نفهم اليوم بدل ما نقول كلام عام.`;

    }

}


/* =========================================
   وقت الشمس
========================================= */

function formatSunTime(
    value
){

    if(!value){

        return "—";

    }


    const date =
        new Date(
            value
        );


    return date.toLocaleTimeString(
        "ar-EG",
        {

            hour:
                "numeric",

            minute:
                "2-digit"

        }
    );

}


/* =========================================
   الوقت المختار
========================================= */

function getPreferredTimeName(){

    const names = {

        morning:
            "الصبح 🌅",

        midday:
            "الظهر ☀️",

        afternoon:
            "بعد الظهر 🌤️",

        evening:
            "العصر 🌇"

    };


    return (
        names[user.sunTime] ||
        "غير محدد"
    );

}


/* =========================================
   اختيار أفضل قراءة داخل الفترة
========================================= */

function getWindowForPreference(
    hourly,
    sunrise,
    sunset
){

    if(
        !hourly ||
        !hourly.time ||
        !hourly.uv_index
    ){

        return null;

    }


    const start =
        new Date(
            sunrise
        );


    const end =
        new Date(
            sunset
        );


    const candidates = [];


    for(
        let i = 0;
        i < hourly.time.length;
        i++
    ){

        const time =
            new Date(
                hourly.time[i]
            );


        const uv =
            Number(
                hourly.uv_index[i] ??
                0
            );


        if(
            time < start ||
            time > end
        ){

            continue;

        }


        const hour =
            time.getHours();


        let matches =
            false;


        if(
            user.sunTime ===
            "morning"
        ){

            matches =
                hour >= 6 &&
                hour < 11;

        }


        else if(
            user.sunTime ===
            "midday"
        ){

            matches =
                hour >= 11 &&
                hour < 14;

        }


        else if(
            user.sunTime ===
            "afternoon"
        ){

            matches =
                hour >= 14 &&
                hour < 17;

        }


        else if(
            user.sunTime ===
            "evening"
        ){

            matches =
                hour >= 17 &&
                hour <= 20;

        }


        if(matches){

            candidates.push({

                time,
                uv

            });

        }

    }


    if(
        !candidates.length
    ){

        return null;

    }


    candidates.sort(
        (a,b) =>
            a.uv -
            b.uv
    );


    return candidates[0];

}


/* =========================================
   رسم نافذة اليوم
========================================= */

function renderSunWindow(
    data
){

    if(
        !sunWindow ||
        !data ||
        !data.daily
    ){

        return;

    }


    const sunrise =
        data.daily.sunrise?.[0];


    const sunset =
        data.daily.sunset?.[0];


    if(
        !sunrise ||
        !sunset
    ){

        return;

    }


    const hourly = {

        time:
            data.hourly?.time ||
            [],

        uv_index:
            data.hourly?.uv_index ||
            []

    };


    const selected =
        getWindowForPreference(
            hourly,
            sunrise,
            sunset
        );


    sunriseValue.textContent =
        formatSunTime(
            sunrise
        );


    sunsetValue.textContent =
        formatSunTime(
            sunset
        );


    preferredTimeValue.textContent =
        getPreferredTimeName();


    sunWindow.classList.remove(
        "hidden"
    );


    if(!selected){

        windowValue.textContent =
            "—";

        windowTitle.textContent =
            "مفيش قراءة كفاية";

        windowText.textContent =
            "سنا محتاجة بيانات أكتر داخل الوقت اللي اخترته عشان تعمل قراءة أحسن.";

        windowIcon.textContent =
            "☁";

        return;

    }


    const selectedUV =
        Math.round(
            selected.uv * 10
        ) / 10;


    windowValue.textContent =
        formatSunTime(
            selected.time
        );


    if(
        selectedUV < 3
    ){

        windowLabel.textContent =
            "أهدى قراءة";

        windowTitle.textContent =
            "النافذة أهدى نسبيًا 🌤️";

        windowText.textContent =
            `داخل وقتك، أقل UV متاح حوالي ${selectedUV}. دي قراءة للشمس، مش جرعة تعرض.`;

        windowIcon.textContent =
            "☼";

    }


    else if(
        selectedUV < 6
    ){

        windowLabel.textContent =
            "UV متوسط";

        windowTitle.textContent =
            "الشمس نشطة ☀️";

        windowText.textContent =
            `داخل وقتك، أقل UV حوالي ${selectedUV}. سنا بدأت تربط الوقت بالمكان والبشرة.`;

        windowIcon.textContent =
            "☀";

    }


    else if(
        selectedUV < 8
    ){

        windowLabel.textContent =
            "UV قوي";

        windowTitle.textContent =
            "الشمس قوية ⚠️";

        windowText.textContent =
            `حتى داخل وقتك، الـUV حوالي ${selectedUV}. هنا الحماية أهم وتقليل التعرض غير المحمي أفضل.`;

        windowIcon.textContent =
            "⚠";

    }


    else{

        windowLabel.textContent =
            "UV شديد";

        windowTitle.textContent =
            "الشمس شديدة جدًا 🚫";

        windowText.textContent =
            `الـUV حوالي ${selectedUV} داخل الفترة المختارة. سنا مش هتشجع تعرض غير محمي في الوضع ده.`;

        windowIcon.textContent =
            "×";

    }


    /* =====================================
       مكان النافذة على خط اليوم
    ====================================== */

    const total =
        sunset.getTime() -
        sunrise.getTime();


    const elapsed =
        selected.time.getTime() -
        sunrise.getTime();


    let percent =
        (
            elapsed /
            total
        ) * 100;


    percent =
        Math.max(
            0,
            Math.min(
                100,
                percent
            )
        );


    dayProgress.style.width =
        percent + "%";

}


/* =========================================
   خطأ الموقع
========================================= */

function showLocationError(
    message
){

    sunStatus.textContent =
        "الموقع محتاج إذن";


    analysisTitle.textContent =
        "محتاجين مكانك 📍";


    analysisText.textContent =
        message;


    analysisIcon.textContent =
        "⌖";


    locationButton.disabled =
        false;


    locationButton.innerHTML = `

        <span class="location-icon">
            ↻
        </span>

        <span>
            نجرب تاني
        </span>

    `;

}


/* =========================================
   الرجوع
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
   فحص العناصر
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
