/* =========================================
   SunDose ☀️
   app.js
   النسخة الكاملة
   + حركة سنا
   + رحلة جرعة الشمس
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
   حالة التطبيق
========================================= */

let introStep = 0;

let currentStep = 0;

let isTyping = false;

let typingTimer = null;

let waitingForContinue = false;

let sunFlowRunning = false;


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


    if (sanaReaction) {

        if (reaction) {

            sanaReaction.textContent =
                reaction;

            sanaReaction.classList.remove(
                "hidden"
            );

        } else {

            sanaReaction.classList.add(
                "hidden"
            );

        }

    }

}


/* =========================================
   إظهار صفحة واحدة فقط
========================================= */

function showPage(page){

    [
        home,
        welcome,
        habits,
        sunDose
    ].forEach(section => {

        if (section) {

            section.classList.add(
                "hidden"
            );

        }

    });


    if (page) {

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
   كتابة سنا ببطء
========================================= */

function typeSanaText(
    text,
    element,
    speed = 55,
    callback = null
){

    if (!element) return;


    if (typingTimer) {

        clearInterval(
            typingTimer
        );

        typingTimer = null;

    }


    isTyping = true;

    element.textContent = "";


    let index = 0;


    typingTimer = setInterval(() => {

        element.textContent +=
            text.charAt(index);


        index++;


        if (index >= text.length){

            clearInterval(
                typingTimer
            );

            typingTimer = null;

            isTyping = false;


            if (callback){

                callback();

            }

        }

    }, speed);

}


/* =========================================
   إنهاء الكتابة فورًا
========================================= */

function finishTypingImmediately(){

    if (
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
   مقدمة سنا
========================================= */

const introMessages = [

    "أهلًا 💛 أنا سنا... ويمكن دي أول مرة نتقابل فيها، فمش عايزة أبدأ معاك بأسئلة كأنك داخل تملى استمارة 😄",

    "أنا سنا ☀️ واسمي مرتبط بالشمس والنور، وده جزء كبير من الحكاية اللي خلتني أكون هنا.",

    "الفكرة بدأت من حاجة بسيطة جدًا: شخص كان عنده مشكلة مرتبطة بفيتامين D، وكان محتاج حد يفكره بالعلاج والعادات المهمة.",

    "ومن هنا الفكرة كبرت... وبدل ما يكون مجرد موقع بيفكّر الشخص بحاجة، بقى SunDose عايز يكون رفيق يفهم الشخص نفسه ومكانه وعاداته.",

    "وعشان كده مش هبدأ أقولك اعمل إيه. الأول نتعرف، وبعدها كل معلومة تقولها لي هتفرق في اللي هقولهولك.",

    "خد راحتك 💛 مفيش استعجال. نبدأ باسمك الأول، وبعدها نمشي خطوة خطوة."

];


/* =========================================
   حركة الترحيب
========================================= */

function setIntroSana(){

    if (!sanaImage) return;


    if (introStep === 0){

        changeSanaImage(
            sanaImage,
            "assets/sana_welcome_01.png",
            "✨"
        );

    }

    else if (introStep === 1){

        changeSanaImage(
            sanaImage,
            "assets/sana_welcome_02.png",
            "👋"
        );

    }

    else if (introStep === 2){

        changeSanaImage(
            sanaImage,
            "assets/sana_curious.png",
            "👀"
        );

    }

    else if (introStep === 3){

        changeSanaImage(
            sanaImage,
            "assets/sana_happy.png",
            "💛"
        );

    }

    else if (introStep === 4){

        changeSanaImage(
            sanaImage,
            "assets/sana_calm.png",
            "🌱"
        );

    }

    else {

        changeSanaImage(
            sanaImage,
            "assets/sana_excited.png",
            "☀️"
        );

    }

}


/* =========================================
   عرض المقدمة
========================================= */

function renderIntro(){

    if (
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

        55,

        function(){

            introNext.disabled = false;


            if (
                introStep ===
                introMessages.length - 1
            ){

                introNext.textContent =
                    "نبدأ التعارف ☀️";

            }

            else{

                introNext.textContent =
                    "متابعة";

            }

        }

    );

}


/* =========================================
   تشغيل المقدمة
========================================= */

if (
    introText &&
    introNext
){

    renderIntro();


    introNext.addEventListener(
        "click",
        function(){

            if (
                finishTypingImmediately()
            ){

                introText.textContent =
                    introMessages[introStep];


                introNext.disabled =
                    false;


                if (
                    introStep ===
                    introMessages.length - 1
                ){

                    introNext.textContent =
                        "نبدأ التعارف ☀️";

                }

                else{

                    introNext.textContent =
                        "متابعة";

                }


                return;

            }


            if (
                introStep <
                introMessages.length - 1
            ){

                introStep++;

                renderIntro();

            }

            else{

                introNext.classList.add(
                    "hidden"
                );


                if (startButton){

                    startButton.classList.remove(
                        "hidden"
                    );

                }


                changeSanaImage(

                    sanaImage,

                    "assets/sana_welcome_02.png",

                    "☀️"

                );

            }

        }
    );

}


/* =========================================
   أسئلة التعارف
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
            "حلو جدًا 💛 دلوقتي عايزة أعرف أخاطبك إزاي عشان كلامي معاك يبقى مناسب ليك.",

        type:"gender"
    },


    {
        key:"age",

        question:
            "طيب قولي سنك كام؟ 😄 السن هيساعدني أفهم المرحلة اللي جسمك فيها وأخلي كلامي مناسب ليك.",

        type:"number",

        label:"العمر",

        placeholder:
            "مثال: 23",

        unit:"سنة"
    },


    {
        key:"weight",

        question:
            "تمام يا ${name}... وزنك كام تقريبًا؟ 😄 الرقم مش حكم عليك، أنا هربطه بباقي بياناتك.",

        type:"number",

        label:"الوزن",

        placeholder:
            "مثال: 80",

        unit:"كجم"
    },


    {
        key:"height",

        question:
            "وطولك كام؟ 🌱 كده أقدر أربط الطول بالوزن والعمر بدل ما أبص لكل رقم لوحده.",

        type:"number",

        label:"الطول",

        placeholder:
            "مثال: 175",

        unit:"سم"
    },


    {
        key:"country",

        question:
            "وإنت من أنهي بلد؟ 🌍 المكان عندي مش مجرد اسم؛ الشمس والطقس وطول النهار بيختلفوا من مكان لمكان.",

        type:"text",

        label:"البلد",

        placeholder:
            "مثال: مصر"
    },


    {
        key:"skinTone",

        question:
            "وصلنا لحاجة مهمة جدًا ☀️ لون بشرتك أقرب لأنهي درجة؟ ده هيفرق معايا في فهم استجابة بشرتك للشمس.",

        type:"skin"
    },


    {
        key:"sunTime",

        question:
            "ولو هتتعرض للشمس، بتحب يكون الوقت اللي يناسبك إمتى؟ ☀️",

        type:"time"
    }

];


/* =========================================
   صورة سنا حسب السؤال
========================================= */

function setQuestionSana(){

    if (!questionSana) return;


    const step =
        steps[currentStep];


    if (step.key === "name"){

        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "👀"
        );

    }

    else if (
        step.key === "gender"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_happy.png",
            "💛"
        );

    }

    else if (
        step.key === "age"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "😄"
        );

    }

    else if (
        step.key === "weight"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_calm.png",
            "💛"
        );

    }

    else if (
        step.key === "height"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_thinking.png",
            "🤔"
        );

    }

    else if (
        step.key === "country"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "🌍"
        );

    }

    else if (
        step.key === "skinTone"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_thinking.png",
            "☀️"
        );

    }

    else if (
        step.key === "sunTime"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_sun_01.png",
            "☀️"
        );

    }

}


/* =========================================
   اسم المستخدم داخل السؤال
========================================= */

function personalizeQuestion(text){

    return text.replace(
        "${name}",
        user.name ||
        "يا صديقي"
    );

}


/* =========================================
   ردود سنا
========================================= */

function getResponse(step){

    const name =
        user.name ||
        "يا صديقي";


    const female =
        user.gender === "female";


    if (
        step.key === "name"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_happy.png",
            "💛"
        );


        return `تشرفت بيك يا ${user.name} 💛 اسمك حلو فعلًا. دلوقتي بقى عرفت أول حاجة عن الشخص اللي هكمل معاه الرحلة دي.`;

    }


    if (
        step.key === "gender"
    ){

        changeSanaImage(
            questionSana,

            female
                ? "assets/sana_flirty.png"
                : "assets/sana_happy.png",

            "💛"
        );


        if (female){

            return `تمام يا ${name} 💛 كده عرفت إنّي أكلمك بصيغة المؤنث من هنا ورايح، وده هيخلّي كلام سنا معاكي طبيعي ومريح.`;

        }


        return `تمام يا ${name} 😄 كده عرفت إنّي أكلمك بصيغة المذكر من هنا ورايح، ونكمّل براحتنا.`;

    }


    if (
        step.key === "age"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "😄"
        );


        const age =
            Number(user.age);


        if (age < 18){

            return `يا ${name} 💛 سن ${age} سنة ولسه جسمك في مرحلة نمو، فهكون حريصة جدًا إن أي نصيحة أقولها تكون مناسبة لمرحلتك.`;

        }


        if (age <= 25){

            return female

                ? `يا ${name} 😄 ${age} سنة؟ لسه في سن جميل جدًا، ودي فرصة ممتازة تبني عادات صحية تفضل معاكي سنين.`

                : `يا ${name} 😄 ${age} سنة؟ لسه في بداية الشباب، ودي فرصة ممتازة تبني عادات صحية تفضل معاك سنين.`;

        }


        if (age <= 40){

            return `ما شاء الله يا ${name} 💛 ${age} سنة. سن ممتاز نخلي فيه الجسم والطاقة والعادات اليومية ماشيين في صالحك بدل ما نستنى المشاكل تظهر.`;

        }


        return `يا ${name} 💛 ${age} سنة معناها إننا هنركز أكتر على العادات اللي تحافظ على صحتك ونشاطك على المدى الطويل.`;

    }


    if (
        step.key === "weight"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_calm.png",
            "💛"
        );


        return `وصلني وزنك ${user.weight} كجم يا ${name} 💛 ومش هطلع حكم من الرقم ده لوحده. لسه عندي الطول والعمر، وبعدهم أقدر أكون صورة أصدق عن جسمك بدل الأحكام السريعة.`;

    }


    if (
        step.key === "height"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_thinking.png",
            "🤔"
        );


        const weight =
            Number(user.weight);


        const height =
            Number(user.height);


        const bmi =
            height > 0
                ? weight /
                  ((height / 100) ** 2)
                : 0;


        if (bmi > 0){

            if (bmi < 18.5){

                return `تمام يا ${name} 🌱 طولك ${user.height} سم مع وزنك ${user.weight} كجم، وده مبدئيًا يخليني أحتاج أبص للصورة كاملة قبل أي حكم. المؤشر الحسابي هنا منخفض، لكن مش هعتبره تشخيص ولا هختصر جسمك في رقم.`;

            }


            if (bmi < 25){

                return `حلو يا ${name} 🌱 طولك ${user.height} سم مع وزنك ${user.weight} كجم. كده عندي بيانات أهم بكتير من الوزن لوحده، ونقدر نكمل الصورة بهدوء.`;

            }


            if (bmi < 30){

                return `تمام يا ${name} 💛 دلوقتي الصورة أوضح: ${user.height} سم طول و${user.weight} كجم وزن. المؤشر الحسابي يوحي إن الوزن أعلى من النطاق المعتاد، لكن ده مش تشخيص ولا حكم على شكل جسمك، ولسه محتاجين نفهم نشاطك وعاداتك.`;

            }


            return `بص يا ${name} 💛 دلوقتي عندي الطول ${user.height} سم والوزن ${user.weight} كجم. المؤشر الحسابي مرتفع، وده معناه إننا نحتاج نتعامل مع الموضوع بهدوء وذكاء ونركز على صحتك وعاداتك، مش على الرقم كأنه حكم عليك.`;

        }


        return `تمام يا ${name} 🌱 سجلت طولك ${user.height} سم، وكده بدأت الصورة عندي تكتمل.`;

    }


    if (
        step.key === "country"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_curious.png",
            "🌍"
        );


        const country =
            user.country
                .trim()
                .toLowerCase();


        if (
            country.includes("مصر") ||
            country.includes("egypt")
        ){

            return `مصر بقى 🇪🇬💛 تمام يا ${name}. كده أقدر أخلي معلومات الشمس والجو وطول النهار مرتبطة بمكانك بدل ما أديك كلام عام.`;

        }


        return `وصلت يا ${name} 🌍 ${user.country}. المكان اتسجل عندي، وده مهم لأن ظروف الشمس والطقس وطول النهار بتختلف من مكان لمكان.`;

    }


    if (
        step.key === "skinTone"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_thinking.png",
            "☀️"
        );


        return `تمام يا ${name} ☀️ سجلت درجة بشرتك. المعلومة دي مهمة لأن لون البشرة من العوامل اللي تدخل في استجابة الجلد للشمس.`;

    }


    if (
        step.key === "sunTime"
    ){

        changeSanaImage(
            questionSana,
            "assets/sana_excited.png",
            "☀️"
        );


        return `حلو يا ${name} ☀️ كده بقي عندي وقت التعرض اللي يناسب يومك. دلوقتي نقدر ندخل للمرحلة اللي كنت مستنيها... جرعة الشمس.`;

    }


    return `تمام يا ${name} 💛 سجلت المعلومة دي.`;

}


/* =========================================
   عرض سؤال جديد
========================================= */

function renderStep(){

    const step =
        steps[currentStep];


    question.textContent =
        personalizeQuestion(
            step.question
        );


    const progress =
        ((currentStep + 1) /
        steps.length) * 100;


    progressBar.style.width =
        progress + "%";


    answerArea.innerHTML = "";


    nextButton.textContent =
        "متابعة";


    nextButton.disabled =
        false;


    waitingForContinue =
        false;


    setQuestionSana();


    /* =====================================
       الجنس
    ===================================== */

    if (
        step.type === "gender"
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

                if (
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
                            .forEach(btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            });


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


    /* =====================================
       لون البشرة
    ===================================== */

    if (
        step.type === "skin"
    ){

        answerArea.innerHTML = `

            <div class="skin-grid">

                <button
                    type="button"
                    class="skin-btn skin-1"
                    data-skin="very-light"
                >
                    <span class="skin-swatch"></span>
                    <b>فاتحة جدًا</b>
                </button>

                <button
                    type="button"
                    class="skin-btn skin-2"
                    data-skin="light"
                >
                    <span class="skin-swatch"></span>
                    <b>فاتحة</b>
                </button>

                <button
                    type="button"
                    class="skin-btn skin-3"
                    data-skin="medium"
                >
                    <span class="skin-swatch"></span>
                    <b>متوسطة</b>
                </button>

                <button
                    type="button"
                    class="skin-btn skin-4"
                    data-skin="dark"
                >
                    <span class="skin-swatch"></span>
                    <b>سمراء</b>
                </button>

                <button
                    type="button"
                    class="skin-btn skin-5"
                    data-skin="very-dark"
                >
                    <span class="skin-swatch"></span>
                    <b>داكنة</b>
                </button>

            </div>

        `;


        document
            .querySelectorAll(
                ".skin-btn"
            )
            .forEach(button => {

                if (
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
                            .forEach(btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            });


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
       وقت التعرض
    ===================================== */

    if (
        step.type === "time"
    ){

        answerArea.innerHTML = `

            <div class="time-grid">

                <button
                    type="button"
                    class="time-btn"
                    data-time="morning"
                >
                    🌅
                    <strong>الصبح</strong>
                    <small>بداية اليوم</small>
                </button>

                <button
                    type="button"
                    class="time-btn"
                    data-time="midday"
                >
                    ☀️
                    <strong>الظهر</strong>
                    <small>الشمس أقوى</small>
                </button>

                <button
                    type="button"
                    class="time-btn"
                    data-time="afternoon"
                >
                    🌤️
                    <strong>بعد الظهر</strong>
                    <small>بعد منتصف اليوم</small>
                </button>

                <button
                    type="button"
                    class="time-btn"
                    data-time="evening"
                >
                    🌇
                    <strong>العصر</strong>
                    <small>قبل الغروب</small>
                </button>

            </div>

        `;


        document
            .querySelectorAll(
                ".time-btn"
            )
            .forEach(button => {

                if (
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
                            .forEach(btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            });


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


    if (input){

        setTimeout(
            () => input.focus(),
            50
        );


        input.addEventListener(
            "keydown",
            function(event){

                if (
                    event.key === "Enter"
                ){

                    nextButton.click();

                }

            }
        );

    }

}


/* =========================================
   التحقق من الإجابة
========================================= */

function saveCurrentAnswer(){

    const step =
        steps[currentStep];


    if (
        step.type === "gender"
    ){

        if (!user.gender){

            alert(
                "اختار الأول الطريقة اللي تحب سنا تكلمك بيها 💛"
            );

            return false;

        }

        return true;

    }


    if (
        step.type === "skin"
    ){

        if (!user.skinTone){

            alert(
                "اختار درجة بشرتك الأول ☀️"
            );

            return false;

        }

        return true;

    }


    if (
        step.type === "time"
    ){

        if (!user.sunTime){

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


    if (!input){

        return false;

    }


    const value =
        input.value.trim();


    if (!value){

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
   زر متابعة
========================================= */

nextButton.addEventListener(
    "click",
    function(){

        if (isTyping){

            finishTypingImmediately();

            nextButton.disabled =
                false;

            return;

        }


        if (waitingForContinue){

            waitingForContinue =
                false;


            currentStep++;


            if (
                currentStep <
                steps.length
            ){

                renderStep();

            }

            else{

                showHabits();

            }


            return;

        }


        if (!saveCurrentAnswer()){

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


        nextButton.textContent =
            "متابعة";


        typeSanaText(

            response,

            question,

            55,

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

if (startButton){

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

        `كده يا ${name} أنا بقيت أعرف عنك حاجات مهمة فعلًا 💛 عندي سنك وبيانات جسمك ومكانك ودرجة بشرتك ووقت الشمس. دلوقتي نبدأ نحول المعلومات دي لاحتياجات حقيقية، بند بند، بدل أرقام محفوظة للجميع.`;


    const habitData = [

        {
            id:"sun",
            icon:"☀️",
            title:"جرعة الشمس",
            text:"نربط بياناتك بالشمس والطقس ودرجة البشرة."
        },

        {
            id:"water",
            icon:"💧",
            title:"شرب المياه",
            text:"نقدّر احتياجك اليومي ونبني طريقة سهلة للالتزام."
        },

        {
            id:"exercise",
            icon:"🏃",
            title:"الرياضة والحركة",
            text:"نحدد مستوى مناسب حسب جسمك ونشاطك."
        },

        {
            id:"supplements",
            icon:"💊",
            title:"العلاج والمكملات",
            text:"نرتب المعلومات بأمان ومن غير وصف أدوية."
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
                        .querySelectorAll(
                            ".habit"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    this.classList.add(
                        "active"
                    );


                    if (
                        selected === "sun"
                    ){

                        openSunDose();

                    }

                    else if (
                        selected === "water"
                    ){

                        changeSanaImage(
                            habitSana,
                            "assets/sana_calm.png",
                            "💧"
                        );


                        alert(
                            "💧 قسم المياه هنبدأ نبنيه بناءً على بياناتك."
                        );

                    }

                    else if (
                        selected === "exercise"
                    ){

                        changeSanaImage(
                            habitSana,
                            "assets/sana_sport.png",
                            "🏃"
                        );


                        alert(
                            "🏃 قسم الحركة والرياضة هنبدأ نحسبه بناءً على بياناتك."
                        );

                    }

                    else{

                        changeSanaImage(
                            habitSana,
                            "assets/sana_thinking.png",
                            "💊"
                        );


                        alert(
                            "💊 قسم العلاج والمكملات هنخليه منظم وآمن."
                        );

                    }

                }
            );

        });

}


/* =========================================
   بناء بيانات الجرعة
========================================= */

function getSkinLabel(){

    const labels = {

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


    return labels[user.skinTone] ||
        "غير محددة";

}


function getTimeLabel(){

    const labels = {

        morning:
            "الصبح",

        midday:
            "الظهر",

        afternoon:
            "بعد الظهر",

        evening:
            "العصر"

    };


    return labels[user.sunTime] ||
        "غير محدد";

}


/* =========================================
   شاشة التحليل
========================================= */

function buildSunAnalysis(){

    return `

        <div
            id="sunAnalysis"
            class="sun-analysis"
        >

            <div class="analysis-header">

                <span class="analysis-orbit"></span>

                <span class="analysis-small-sun">
                    ☀️
                </span>

                <h3>
                    سنا بتقرأ بياناتك...
                </h3>

                <p id="analysisStatus">
                    لحظة واحدة، خليني أربط المعلومات ببعض.
                </p>

            </div>


            <div class="data-scan">

                <div
                    class="scan-line"
                    id="scanLine"
                ></div>


                <div class="scan-row">

                    <span>
                        👤 بياناتك
                    </span>

                    <strong id="scanUser">
                        جاري القراءة...
                    </strong>

                </div>


                <div class="scan-row">

                    <span>
                        🌍 موقعك
                    </span>

                    <strong id="scanCountry">
                        جاري القراءة...
                    </strong>

                </div>


                <div class="scan-row">

                    <span>
                        🎨 بشرتك
                    </span>

                    <strong id="scanSkin">
                        جاري القراءة...
                    </strong>

                </div>


                <div class="scan-row">

                    <span>
                        🌅 وقتك
                    </span>

                    <strong id="scanTime">
                        جاري القراءة...
                    </strong>

                </div>

            </div>


            <div
                id="analysisComplete"
                class="analysis-complete hidden"
            >

                <div class="complete-check">
                    ✓
                </div>

                <div>

                    <b>
                        الصورة اكتملت
                    </b>

                    <span>
                        البيانات الأساسية جاهزة للمرحلة التالية
                    </span>

                </div>

            </div>

        </div>

    `;

}


/* =========================================
   نتيجة الجرعة
========================================= */

function buildSunResult(){

    const skin =
        getSkinLabel();

    const time =
        getTimeLabel();


    return `

        <div
            id="sunResult"
            class="sun-result"
        >

            <div class="result-sun">

                <div class="result-rays"></div>

                <div class="result-core">
                    ☀️
                </div>

            </div>


            <div class="result-title">

                <span>
                    سنا خلصت القراءة
                </span>

                <h2>
                    الشمس مش رقم واحد للجميع
                </h2>

            </div>


            <div class="result-summary">

                <div class="result-item">

                    <span>
                        البشرة
                    </span>

                    <b>
                        ${skin}
                    </b>

                </div>


                <div class="result-item">

                    <span>
                        الوقت
                    </span>

                    <b>
                        ${time}
                    </b>

                </div>


                <div class="result-item">

                    <span>
                        المكان
                    </span>

                    <b>
                        ${user.country || "غير محدد"}
                    </b>

                </div>

            </div>


            <div class="result-message">

                <span class="result-sana-mark">
                    ☀️
                </span>

                <p>
                    دلوقتي عندي الأساس اللي محتاجاه.
                    لكن قبل ما أقولك رقم تعرض، لازم أعرف
                    <strong>مؤشر الأشعة فوق البنفسجية UV</strong>
                    والظروف الفعلية للشمس.
                </p>

                <small>
                    وده اللي هنوصله في الخطوة التالية بدل ما نخمن رقم من غير بيانات حقيقية.
                </small>

            </div>


            <button
                id="sunNextStage"
                class="primary-btn"
            >
                ندخل على الحساب الحقيقي ☀️
            </button>

        </div>

    `;

}


/* =========================================
   تشغيل رحلة الشمس
========================================= */

function startSunJourney(){

    if (sunFlowRunning) return;

    sunFlowRunning = true;


    const container =
        document.getElementById(
            "sunJourney"
        );


    if (!container){

        sunFlowRunning = false;

        return;

    }


    container.innerHTML =
        buildSunAnalysis();


    const status =
        document.getElementById(
            "analysisStatus"
        );

    const scanUser =
        document.getElementById(
            "scanUser"
        );

    const scanCountry =
        document.getElementById(
            "scanCountry"
        );

    const scanSkin =
        document.getElementById(
            "scanSkin"
        );

    const scanTime =
        document.getElementById(
            "scanTime"
        );


    /* البداية */

    changeSanaImage(

        sunSana,

        "assets/sana_thinking.png",

        "🤔"

    );


    typeSanaText(

        `استنى يا ${user.name || "صديقي"}... متستعجلش النتيجة. أنا عايزة أبص على كل حاجة مع بعض الأول.`,

        sunMessage,

        48

    );


    /* خطوة 1 */

    setTimeout(() => {

        if (status){

            status.textContent =
                "بقرأ بياناتك الأساسية...";

        }


        if (scanUser){

            scanUser.textContent =
                `${user.age || "--"} سنة · ${user.height || "--"} سم · ${user.weight || "--"} كجم`;

        }

    }, 900);


    /* خطوة 2 */

    setTimeout(() => {

        if (status){

            status.textContent =
                "بشوف موقعك ووقت التعرض...";

        }


        if (scanCountry){

            scanCountry.textContent =
                user.country || "غير محدد";

        }


        if (scanTime){

            scanTime.textContent =
                getTimeLabel();

        }

    }, 1800);


    /* خطوة 3 */

    setTimeout(() => {

        if (status){

            status.textContent =
                "درجة البشرة دخلت في التحليل...";

        }


        if (scanSkin){

            scanSkin.textContent =
                getSkinLabel();

        }


        changeSanaImage(

            sunSana,

            "assets/sana_curious.png",

            "👀"

        );

    }, 2700);


    /* خطوة 4 */

    setTimeout(() => {

        if (status){

            status.textContent =
                "بجمع الصورة كلها...";

        }


        changeSanaImage(

            sunSana,

            "assets/sana_sun_01.png",

            "☀️"

        );

    }, 3600);


    /* اكتمال التحليل */

    setTimeout(() => {

        const complete =
            document.getElementById(
                "analysisComplete"
            );


        if (complete){

            complete.classList.remove(
                "hidden"
            );

        }


        if (status){

            status.textContent =
                "تمام... الصورة الأساسية اكتملت.";

        }

    }, 4500);


    /* النتيجة */

    setTimeout(() => {

        container.innerHTML =
            buildSunResult();


        changeSanaImage(

            sunSana,

            "assets/sana_happy.png",

            "✨"

        );


        typeSanaText(

            `شوفت؟ 💛 أنا مش عايزة أديك رقم محفوظ وخلاص. دلوقتي بقينا عارفين البيانات اللي هنحتاجها عشان الحساب الحقيقي يبقى مبني على ظروفك أنت.`,

            sunMessage,

            45

        );


        const nextStage =
            document.getElementById(
                "sunNextStage"
            );


        if (nextStage){

            nextStage.addEventListener(
                "click",
                function(){

                    showSunFinalMessage();

                }
            );

        }


        sunFlowRunning = false;

    }, 5600);

}


/* =========================================
   الرسالة الأخيرة للمرحلة الأولى
========================================= */

function showSunFinalMessage(){

    const container =
        document.getElementById(
            "sunJourney"
        );


    if (!container) return;


    changeSanaImage(

        sunSana,

        "assets/sana_excited.png",

        "☀️"

    );


    container.innerHTML = `

        <div class="final-sun-screen">

            <div class="final-sun-animation">

                <div class="sun-glow"></div>

                <div class="big-final-sun">
                    ☀️
                </div>

            </div>


            <div class="final-sun-text">

                <span>
                    المرحلة الأولى اكتملت
                </span>

                <h2>
                    دلوقتي نقدر نبدأ بجد.
                </h2>

                <p>
                    أنا عرفت مين أنت،
                    وعرفت مكانك،
                    ودرجة بشرتك،
                    والوقت اللي يناسبك.
                </p>

                <p>
                    الخطوة الجاية مش هتبقى مجرد شكل حلو...
                    هنبدأ ندخل البيانات الحقيقية للشمس
                    والـ UV والطقس عشان الحساب يبقى أذكى.
                </p>

            </div>


            <div class="final-badge">
                <span>☀️</span>
                SunDose
                <small>
                    أول رحلة اكتملت
                </small>
            </div>

        </div>

    `;


    typeSanaText(

        `وأهو كده يا ${user.name || "صديقي"}... وصلنا لأول محطة فعلية في SunDose ☀️💛. ومن هنا بقى تبدأ الحكاية الحقيقية.`,

        sunMessage,

        45

    );

}


/* =========================================
   جرعة الشمس
========================================= */

function openSunDose(){

    showPage(sunDose);


    sunFlowRunning = false;


    changeSanaImage(

        sunSana,

        "assets/sana_sun_01.png",

        "☀️"

    );


    const name =
        user.name ||
        "صديقي";


    sunMessage.textContent =

        `تمام يا ${name} ☀️ وصلنا للمرحلة اللي هنبدأ فيها نحول كل اللي عرفته عنك لقراءة مخصصة. مش مجرد رقم ثابت لكل الناس.`;


    const journey =
        document.getElementById(
            "sunJourney"
        );


    if (journey){

        journey.innerHTML = `

            <div class="sun-hero-animation">

                <div class="sun-sky">

                    <div class="sky-cloud cloud-one"></div>

                    <div class="sky-cloud cloud-two"></div>

                    <div class="sunrise-sun">
                        ☀️
                    </div>

                    <div class="sun-horizon"></div>

                </div>


                <div class="journey-intro">

                    <span>
                        SunDose
                    </span>

                    <h2>
                        خليني أقرأ يومك ☀️
                    </h2>

                    <p>
                        مش هقولك رقم من غير ما أفهم الصورة كاملة.
                    </p>

                </div>


                <button
                    id="startSunAnalysis"
                    class="primary-btn sun-start-btn"
                >
                    ابدأ التحليل ✨
                </button>

            </div>

        `;


        const startAnalysis =
            document.getElementById(
                "startSunAnalysis"
            );


        if (startAnalysis){

            startAnalysis.addEventListener(
                "click",
                function(){

                    startSunJourney();

                }
            );

        }

    }

}


/* =========================================
   الرجوع للعادات
========================================= */

if (backToHabits){

    backToHabits.addEventListener(
        "click",
        function(){

            showHabits();

        }
    );

}


/* =========================================
   حماية من العناصر الناقصة
========================================= */

if (!startButton){

    console.error(
        "SunDose: startButton غير موجود في index.html"
    );

}

if (!nextButton){

    console.error(
        "SunDose: nextButton غير موجود في index.html"
    );

}

if (!habitList){

    console.error(
        "SunDose: habitList غير موجود في index.html"
    );

}
