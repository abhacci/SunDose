/* =========================================
   SunDose ☀️
   المرحلة الأولى + محطة الشمس
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
   عناصر محطة الشمس
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

const uvValue =
    document.getElementById("uvValue");

const analysisTitle =
    document.getElementById("analysisTitle");

const analysisText =
    document.getElementById("analysisText");

const analysisIcon =
    document.getElementById("analysisIcon");


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

    if (!element) return;


    element.classList.remove(
        "sana-changing"
    );


    void element.offsetWidth;


    element.classList.add(
        "sana-changing"
    );


    element.src = image;


    if (sanaReaction){

        if (reaction){

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
    speed = 42,
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
   المقدمة
========================================= */

const introMessages = [

    "أهلًا 💛 أنا سنا... ومش عايزة أبدأ معاك بأسئلة كأنك داخل تملى استمارة 😄",

    "أنا سنا ☀️ ووجودي هنا له علاقة بالشمس والنور والعادات اللي ممكن تفرق في يومك.",

    "الفكرة بدأت من حاجة بسيطة... شخص كان محتاج حد يساعده يفتكر العلاج والعادات المهمة.",

    "ومن هنا SunDose كبر. مش مجرد تذكير، لكن رفيق يحاول يفهم الشخص ومكانه وعاداته.",

    "عشان كده مش هقولك تعمل إيه من أول ثانية. الأول نتعرف، وبعدها كل معلومة منك هتفرق.",

    "خد راحتك 💛 نبدأ باسمك، وبعدها نمشي خطوة خطوة."
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


    introNext.disabled = true;

    setIntroSana();


    typeSanaText(

        introMessages[introStep],

        introText,

        42,

        function(){

            introNext.disabled = false;

            introNext.textContent =
                introStep ===
                introMessages.length - 1

                    ? "نبدأ التعارف ☀️"
                    : "متابعة";

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

                        ? "نبدأ التعارف ☀️"
                        : "متابعة";

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
        placeholder:"اكتب اسمك هنا"
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
        placeholder:"مثال: 23",
        unit:"سنة"
    },


    {
        key:"weight",
        question:
            "وزنك كام تقريبًا؟ الرقم مش حكم عليك، هربطه بباقي بياناتك.",
        type:"number",
        label:"الوزن",
        placeholder:"مثال: 80",
        unit:"كجم"
    },


    {
        key:"height",
        question:
            "وطولك كام؟ 🌱 كده أقدر أربط الطول بالوزن والعمر.",
        type:"number",
        label:"الطول",
        placeholder:"مثال: 175",
        unit:"سم"
    },


    {
        key:"country",
        question:
            "إنت من أنهي بلد؟ 🌍 المكان بيفرق في الشمس والطقس وطول النهار.",
        type:"text",
        label:"البلد",
        placeholder:"مثال: مصر"
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
   صور سنا حسب السؤال
========================================= */

function setQuestionSana(){

    if(!questionSana) return;


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
   تخصيص السؤال
========================================= */

function personalizeQuestion(text){

    return text.replace(
        "${name}",
        user.name ||
        "يا صديقي"
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
        "نكمّل سوا 💛";

    nextButton.disabled = false;

    waitingForContinue = false;

    setQuestionSana();


    /* الجنس */

    if(step.type === "gender"){

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


                        changeSanaImage(

                            questionSana,

                            user.gender === "female"
                                ? "assets/sana_flirty.png"
                                : "assets/sana_happy.png",

                            "💛"

                        );

                    }
                );

            });

        return;

    }


    /* البشرة */

    if(step.type === "skin"){

        answerArea.innerHTML = `

            <div class="skin-grid">

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="very-light"
                >
                    🤍<br>
                    فاتحة جدًا
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="light"
                >
                    🩷<br>
                    فاتحة
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="medium"
                >
                    🤎<br>
                    متوسطة
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="dark"
                >
                    🤎<br>
                    سمراء
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="very-dark"
                >
                    🖤<br>
                    داكنة
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


    /* الوقت */

    if(step.type === "time"){

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


    /* باقي الأسئلة */

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
                "اختار الأول الطريقة اللي تحب سنا تكلمك بيها 💛"
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
   الردود
========================================= */

function getResponse(step){

    const name =
        user.name ||
        "يا صديقي";


    const female =
        user.gender === "female";


    if(step.key === "name"){

        changeSanaImage(
            questionSana,
            "assets/sana_happy.png",
            "💛"
        );

        return `
            تشرفت بيك يا ${user.name} 💛
            كده بدأت أعرف أول حاجة عنك.
        `;

    }


    if(step.key === "gender"){

        return female

            ? `تمام يا ${name} 💛 من هنا هكلمك بصيغة المؤنث.`

            : `تمام يا ${name} 😄 من هنا هكلمك بصيغة المذكر.`;

    }


    if(step.key === "age"){

        const age =
            Number(user.age);


        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "😄"
        );


        if(age < 18){

            return `
                تمام يا ${name} 💛
                سجلت سنك، وهنراعي إنك لسه في مرحلة نمو.
            `;

        }


        return `
            تمام يا ${name} 😄
            سنك ${age} سنة واتسجل عندي.
        `;

    }


    if(step.key === "weight"){

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


    if(step.key === "height"){

        changeSanaImage(
            questionSana,
            "assets/sana_thinking.png",
            "🤔"
        );


        return `
            تمام يا ${name} 🌱
            ${user.height} سم مع الوزن والعمر بقوا جزء من الصورة.
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
            والمكان هيساعدنا بعد كده نقرأ الشمس الحقيقية.
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
            درجة بشرتك بقت جزء من الحساب.
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
            كده خلصنا أول طبقة من بياناتك.
            دلوقتي نخرج من الأسئلة ونبدأ نتعامل مع الشمس نفسها.
        `;

    }


    return `
        تمام يا ${name} 💛
        سجلت المعلومة.
    `;

}


/* =========================================
   زر متابعة
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

            40,

            function(){

                nextButton.disabled =
                    false;

            }

        );

    }
);


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
        "صديقي";


    habitMessage.textContent =

        `كده يا ${name} أنا عرفت عنك طبقة مهمة من المعلومات 💛 دلوقتي نبدأ نحولها لحاجات حقيقية تخص يومك.`;


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
            icon:"💊",
            title:"العلاج والمكملات",
            text:"تنظيم آمن للمعلومات."
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
        "صديقي";


    sunMessage.textContent =

        `أهو كده يا ${name} ☀️ وصلنا لأول محطة فعلية في SunDose. أنا عرفت بياناتك، لكن مش هخمن الشمس. دلوقتي محتاجة أشوف الشمس الحقيقية عند مكانك.`;


    updateSunUserData();

}


/* =========================================
   عرض بيانات المستخدم
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
        "📍 جاري تحديد مكانك...";


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
                "محتاجين إذن الموقع عشان نقرأ الشمس الحقيقية عندك."
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
   قراءة الشمس والطقس
========================================= */

async function loadSunData(
    latitude,
    longitude
){

    sunStatus.textContent =
        "بنقرأ حالة الشمس والـ UV...";


    analysisTitle.textContent =
        "بنحلل الشمس";


    analysisText.textContent =
        "سنا بتجمع بيانات المكان والـ UV عشان تبني أول قراءة فعلية.";


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
            "الشمس دلوقتي تحت الأفق 🌙";

        analysisTitle.textContent =
            "النهار خلص";

        analysisText.textContent =
            "مفيش داعي نخمن. هنستنى نافذة شمس مناسبة ونبني القراءة عليها.";

        analysisIcon.textContent =
            "🌙";

    }

    else if(uv < 3){

        sunStatus.textContent =
            `UV منخفض • ${temperature}°`;

        analysisTitle.textContent =
            "الشمس هادية ☀️";

        analysisText.textContent =
            "الـ UV الحالي منخفض. دي قراءة أولية فقط؛ المرحلة التالية هتربط الوقت والبشرة والطقس مع بعض.";

        analysisIcon.textContent =
            "🌤️";

    }

    else if(uv < 6){

        sunStatus.textContent =
            `UV متوسط • ${temperature}°`;

        analysisTitle.textContent =
            "الشمس نشطة ☀️";

        analysisText.textContent =
            "الـ UV داخل نطاق متوسط. هنا يبدأ SunDose يفرق بين الأشخاص بدل ما يستخدم رقم واحد للجميع.";

        analysisIcon.textContent =
            "☀️";

    }

    else if(uv < 8){

        sunStatus.textContent =
            `UV مرتفع • ${temperature}°`;

        analysisTitle.textContent =
            "الشمس قوية ⚠️";

        analysisText.textContent =
            "الـ UV مرتفع، فالأولوية للحماية وتقليل التعرض غير المحمي. مش هنحوّل الرقم لوقت تعرض عشوائي.";

        analysisIcon.textContent =
            "⚠️";

    }

    else{

        sunStatus.textContent =
            `UV شديد • ${temperature}°`;

        analysisTitle.textContent =
            "الشمس شديدة جدًا ⚠️";

        analysisText.textContent =
            "الـ UV شديد جدًا. SunDose مش هيشجع على التعرض غير المحمي في الظروف دي.";

        analysisIcon.textContent =
            "🚫";

    }


    locationButton.classList.add(
        "hidden"
    );


    /* سنا تتفاعل */

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
            `تمام يا ${name} 🌙 الشمس دلوقتي مش في نافذتها، وده أحسن من إني أخمنلك رقم. أول ما يكون عندنا نافذة مناسبة، نكمل التحليل.`;

    }

    else{

        sunMessage.textContent =
            `لقيتها يا ${name} ☀️ دي الشمس الحقيقية عند مكانك دلوقتي. كده SunDose بدأ يشتغل ببيانات حقيقية بدل الكلام العام.`;

    }

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
   تشغيل الصفحة
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
