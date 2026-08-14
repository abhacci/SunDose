/* =========================================================
   SunDose ☀️
   التطبيق الرئيسي
   نسخة منظمة بدون تداخل بين أزرار التعارف
========================================================= */


/* =========================================================
   بيانات المستخدم
========================================================= */

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


/* =========================================================
   عناصر الصفحات
========================================================= */

const home = document.getElementById("home");
const welcome = document.getElementById("welcome");
const habits = document.getElementById("habits");
const sunDose = document.getElementById("sunDose");

const startButton = document.getElementById("startButton");
const introNext = document.getElementById("introNext");
const nextButton = document.getElementById("nextButton");

const introText = document.getElementById("introText");
const question = document.getElementById("question");
const answerArea = document.getElementById("answerArea");
const progressBar = document.getElementById("progressBar");

const habitMessage = document.getElementById("habitMessage");
const habitList = document.getElementById("habitList");

const sunMessage = document.getElementById("sunMessage");
const backToHabits = document.getElementById("backToHabits");


/* =========================================================
   حالة التطبيق
========================================================= */

let introStep = 0;
let currentStep = 0;

/*
   الوضع الحالي لزر التعارف:

   question
   = المستخدم يجاوب

   response
   = سنا خلصت ردها والمستخدم يضغط للانتقال
*/

let conversationMode = "question";


/*
   لمنع تشغيل أكثر من مؤقت كتابة في نفس الوقت
*/

let typingTimer = null;


/* =========================================================
   مقدمة سنا
   محايدة تمامًا قبل معرفة الجنس
========================================================= */

const introMessages = [

    "أهلًا 💛 أنا سنا... ويمكن دي أول مرة نتقابل فيها، فمش عايزة أبدأ معاك بأسئلة وكأنك داخل تملى استمارة 😄",

    "أنا سنا، واسمي مرتبط بالشمس والنور... وده بالظبط سبب وجودي هنا ☀️",

    "SunDose بدأ من فكرة بسيطة جدًا: نفتكر حاجات صحية مهمة في يومنا، خصوصًا موضوع الشمس وفيتامين D.",

    "لكن الفكرة كبرت شوية... وقلت: ليه ما يكونش فيه حد يمشي مع الشخص نفسه؟ يسمعه، يفهم بياناته، ويربطها بالمكان والجو والعادات اليومية؟",

    "وعشان كده أنا هنا 💛 مش عشان أقولك اعمل إيه وخلاص... عايزة الأول أعرفك وأفهمك، وبعدها نبدأ نبني حاجات تناسبك فعلًا.",

    "فخلينا ناخدها واحدة واحدة... من غير استعجال، ومن غير كلام محفوظ. إنت تقولّي عن نفسك، وأنا أرد عليك بناءً على اللي عرفته عنك."
];


/* =========================================================
   إظهار صفحة
========================================================= */

function showPage(page) {

    home.classList.add("hidden");
    welcome.classList.add("hidden");
    habits.classList.add("hidden");
    sunDose.classList.add("hidden");

    page.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   كتابة سنا ببطء
========================================================= */

function typeSanaText(text, element, speed = 38, callback = null) {

    if (typingTimer) {
        clearInterval(typingTimer);
        typingTimer = null;
    }

    element.textContent = "";

    let index = 0;

    typingTimer = setInterval(function () {

        element.textContent += text.charAt(index);

        index++;

        if (index >= text.length) {

            clearInterval(typingTimer);
            typingTimer = null;

            if (callback) {
                callback();
            }
        }

    }, speed);
}


/* =========================================================
   التأكد أن النص خلص كتابته
========================================================= */

function finishTyping(text, element) {

    if (typingTimer) {
        clearInterval(typingTimer);
        typingTimer = null;
    }

    element.textContent = text;
}


/* =========================================================
   مقدمة سنا
========================================================= */

function renderIntro() {

    const text =
        introMessages[introStep];

    typeSanaText(
        text,
        introText,
        38
    );

    if (
        introStep ===
        introMessages.length - 1
    ) {

        introNext.textContent =
            "نتعرّف على بعض ☀️";

    } else {

        introNext.textContent =
            "كمّل معايا 💛";

    }
}


/* =========================================================
   تشغيل المقدمة
========================================================= */

renderIntro();


/* =========================================================
   زر مقدمة سنا
========================================================= */

introNext.addEventListener(
    "click",
    function () {

        /*
           لو سنا لسه بتكتب
           أول ضغطة تكمّل الكتابة فقط
        */

        if (typingTimer) {

            finishTyping(
                introMessages[introStep],
                introText
            );

            return;
        }


        /*
           لو لسه فيه أجزاء
        */

        if (
            introStep <
            introMessages.length - 1
        ) {

            introStep++;

            renderIntro();

            return;
        }


        /*
           المقدمة خلصت
        */

        introNext.classList.add("hidden");

        startButton.classList.remove("hidden");

    }
);


/* =========================================================
   بدء التعارف
========================================================= */

startButton.addEventListener(
    "click",
    function () {

        currentStep = 0;

        conversationMode = "question";

        showPage(welcome);

        renderStep();

    }
);


/* =========================================================
   خطوات التعارف
========================================================= */

const steps = [

    {
        key: "name",

        question:
            "دلوقتي بقى أول حاجة عايزة أعرفها... اسمك إيه؟ 😊",

        type: "text",

        label: "اسمك",

        placeholder:
            "اكتب اسمك هنا"
    },


    {
        key: "gender",

        question:
            "جميل جدًا 💛 دلوقتي قولي أكلمك بصيغة ولد ولا بنت؟",

        type: "gender"
    },


    {
        key: "age",

        question:
            "طيب قولي سنك كام؟ 😄 السن بيفرق معايا في فهم احتياج جسمك وطريقة كلامي معاك.",

        type: "number",

        label: "العمر",

        placeholder:
            "مثال: 23",

        unit: "سنة"
    },


    {
        key: "weight",

        question:
            "تمام... وزنك كام تقريبًا؟ 😄 الرقم لوحده مش هيحكمني عليك، أنا هربطه بباقي بياناتك.",

        type: "number",

        label: "الوزن",

        placeholder:
            "مثال: 80",

        unit: "كجم"
    },


    {
        key: "height",

        question:
            "وطولك كام؟ 🌱 كده أقدر أشوف علاقتك بين الطول والوزن والعمر بشكل أوضح.",

        type: "number",

        label: "الطول",

        placeholder:
            "مثال: 175",

        unit: "سم"
    },


    {
        key: "country",

        question:
            "وإنت من أنهي بلد؟ 🌍 المكان مهم جدًا لأن الشمس والطقس وساعات النهار بتختلف من مكان للتاني.",

        type: "text",

        label: "البلد",

        placeholder:
            "مثال: مصر"
    },


    {
        key: "skinTone",

        question:
            "وصلنا لحاجة مهمة ☀️ لون بشرتك أقرب لأنهي درجة؟ اختار الأقرب ليك، ومفيش اختيار صح أو غلط.",

        type: "skin"
    },


    {
        key: "sunTime",

        question:
            "وعادةً لو هتتعرض للشمس، الوقت اللي تفضله أو تقدر تتعرض فيه بيكون إمتى؟ 🌤️",

        type: "time"
    }

];


const totalSteps = steps.length;


/* =========================================================
   رسم السؤال الحالي
========================================================= */

function renderStep() {

    const step =
        steps[currentStep];


    conversationMode = "question";


    answerArea.innerHTML = "";


    /*
       تحديث شريط التقدم
    */

    const progress =
        ((currentStep + 1) /
        totalSteps) * 100;

    progressBar.style.width =
        progress + "%";


    /*
       السؤال
    */

    question.textContent =
        step.question;


    /*
       زر الانتقال
    */

    nextButton.textContent =
        "نكمل سوا 💛";


    /* =====================================================
       اختيار الجنس
    ===================================================== */

    if (
        step.type === "gender"
    ) {

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
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        user.gender =
                            this.dataset.gender;


                        document
                            .querySelectorAll(
                                ".gender-btn"
                            )
                            .forEach(
                                function (btn) {

                                    btn.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        this.classList.add(
                            "active"
                        );

                    }
                );

            });


        return;
    }


    /* =====================================================
       لون البشرة
    ===================================================== */

    if (
        step.type === "skin"
    ) {

        answerArea.innerHTML = `

            <div class="skin-grid">

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="light"
                >
                    <span class="skin-color light"></span>
                    فاتحة
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="medium"
                >
                    <span class="skin-color medium"></span>
                    قمحية
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="tan"
                >
                    <span class="skin-color tan"></span>
                    سمراء فاتحة
                </button>

                <button
                    type="button"
                    class="skin-btn"
                    data-skin="dark"
                >
                    <span class="skin-color dark"></span>
                    سمراء
                </button>

            </div>

        `;


        document
            .querySelectorAll(".skin-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        user.skinTone =
                            this.dataset.skin;


                        document
                            .querySelectorAll(
                                ".skin-btn"
                            )
                            .forEach(
                                function (btn) {

                                    btn.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        this.classList.add(
                            "active"
                        );

                    }
                );

            });


        return;
    }


    /* =====================================================
       وقت الشمس
    ===================================================== */

    if (
        step.type === "time"
    ) {

        answerArea.innerHTML = `

            <div class="field">

                <label>
                    الوقت المفضل للتعرض
                </label>

                <select id="answerInput">

                    <option value="">
                        اختار الوقت
                    </option>

                    <option value="morning">
                        🌅 الصبح
                    </option>

                    <option value="midday">
                        ☀️ الظهر
                    </option>

                    <option value="afternoon">
                        🌤️ بعد الظهر
                    </option>

                    <option value="variable">
                        🔄 حسب اليوم
                    </option>

                </select>

            </div>

        `;


        return;
    }


    /* =====================================================
       الأسئلة العادية
    ===================================================== */

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
                ?
                `<div class="unit">
                    ${step.unit}
                </div>`
                :
                ""
            }

        </div>

    `;


    const input =
        document.getElementById(
            "answerInput"
        );


    if (input) {

        input.focus();

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    nextButton.click();

                }

            }
        );

    }

}


/* =========================================================
   كلام سنا حسب الجنس
========================================================= */

function maleTone(text) {

    return `يا ${user.name} ${text}`;

}


function femaleTone(text) {

    return `يا ${user.name} ${text}`;

}


function neutralTone(text) {

    return `${user.name ? "يا " + user.name + " " : ""}${text}`;

}


/* =========================================================
   رد سنا بعد كل إجابة
========================================================= */

function getResponse(step) {

    const value =
        user[step.key];


    /* =====================================================
       الاسم
    ===================================================== */

    if (
        step.key === "name"
    ) {

        return `تشرفت بيك يا ${value} 💛 اسم جميل بصراحة... كده بقى عندي أول معلومة حقيقية عن الشخص اللي هكمل معاه.`;

    }


    /* =====================================================
       الجنس
    ===================================================== */

    if (
        step.key === "gender"
    ) {

        if (
            user.gender === "male"
        ) {

            return `تمام يا ${user.name} 😄 كده عرفت أخاطبك بالطريقة المناسبة ليك، ونكمل تعارفنا براحتنا.`;

        }


        return `تمام يا ${user.name} 💛 كده عرفت الطريقة اللي أتكلم بيها معاكي، ونكمل تعارفنا واحدة واحدة.`;

    }


    /* =====================================================
       العمر
    ===================================================== */

    if (
        step.key === "age"
    ) {

        const age =
            Number(user.age);


        if (
            age < 18
        ) {

            if (
                user.gender === "female"
            ) {

                return `يا ${user.name} 💛 سن صغير ولسه جسمك في مرحلة نمو، فهكون معاكي ألطف وأدق في أي حاجة تخص الصحة والعادات.`;

            }

            return `يا ${user.name} 💛 سن صغير ولسه جسمك في مرحلة نمو، فهكون معاك أدق في أي حاجة تخص الصحة والعادات.`;

        }


        if (
            age <= 25
        ) {

            if (
                user.gender === "female"
            ) {

                return `يا ${user.name} 😄 ${age} سنة؟ لسه في بداية الشباب، ودي مرحلة حلوة جدًا تبني فيها عادات تخلي جسمك شايلك معاكي سنين.`;

            }

            return `يا ${user.name} 😄 ${age} سنة؟ لسه في بداية الشباب، ودي مرحلة حلوة جدًا تبني فيها عادات تخلي جسمك واقف في ضهرك سنين.`;

        }


        if (
            age <= 40
        ) {

            if (
                user.gender === "female"
            ) {

                return `ما شاء الله يا ${user.name} 💛 ${age} سنة، سن جميل نهتم فيه بالطاقة والنشاط والعادات اليومية قبل ما الإهمال يتراكم.`;

            }

            return `ما شاء الله يا ${user.name} 💛 ${age} سنة، سن جميل نهتم فيه بالطاقة والنشاط والعادات اليومية قبل ما الإهمال يتراكم.`;

        }


        return `يا ${user.name} 💛 ${age} سنة معناها إننا هنركز أكتر على العادات اللي تساعد الجسم يحافظ على صحته ونشاطه بشكل مستمر.`;

    }


    /* =====================================================
       الوزن
    ===================================================== */

    if (
        step.key === "weight"
    ) {

        return `تمام يا ${user.name} 💛 سجلت وزنك ${user.weight} كجم. بس متقلقش، أنا مش هحكم على الرقم لوحده؛ الوزن لازم يتقري مع الطول والعمر وباقي الصورة.`;

    }


    /* =====================================================
       الطول
    ===================================================== */

    if (
        step.key === "height"
    ) {

        return `حلو يا ${user.name} 🌱 طولك ${user.height} سم. كده بدأت الصورة عندي تتجمع، لأن الوزن لوحده عمره ما كان كفاية عشان نفهم احتياج الجسم.`;

    }


    /* =====================================================
       البلد
    ===================================================== */

    if (
        step.key === "country"
    ) {

        return `وصلنا للمكان كمان يا ${user.name} 🌍 ${user.country} مش مجرد اسم بلد بالنسبة لي. الشمس والحرارة والرطوبة وساعات النهار والعادات اليومية كلها ممكن تفرق، وهنراعي ده وإحنا بنكمل.`;

    }


    /* =====================================================
       لون البشرة
    ===================================================== */

    if (
        step.key === "skinTone"
    ) {

        const skinNames = {

            light: "فاتحة",
            medium: "قمحية",
            tan: "سمراء فاتحة",
            dark: "سمراء"

        };


        const skin =
            skinNames[user.skinTone] ||
            "الدرجة اللي اخترتها";


        return `تمام يا ${user.name} ☀️ لون بشرتك ${skin}. دي معلومة مهمة لأن استجابة الجلد للشمس مش واحدة عند كل الناس، فمش هتعامل معاك برقم محفوظ وخلاص.`;

    }


    /* =====================================================
       وقت الشمس
    ===================================================== */

    if (
        step.key === "sunTime"
    ) {

        const times = {

            morning: "الصبح 🌅",

            midday: "وقت الظهر ☀️",

            afternoon: "بعد الظهر 🌤️",

            variable: "حسب اليوم 🔄"

        };


        const selectedTime =
            times[user.sunTime] ||
            "الوقت اللي اخترته";


        return `تمام يا ${user.name} ☀️ فهمت إن الوقت الأقرب ليك هو ${selectedTime}. كده عندي بقى المكان، والسن، والطول، والوزن، ولون البشرة، ووقت التعرض... نقدر نبدأ نكوّن الصورة الحقيقية بدل ما أخمن.`;

    }


    return `تمام يا ${user.name} 💛 سجلت المعلومة دي عندي.`;

}


/* =========================================================
   مراجعة البيانات بالكامل
========================================================= */

function createSummary() {

    const genderText =
        user.gender === "male"
        ? "ولد"
        : "بنت";


    const skinNames = {

        light: "فاتحة",
        medium: "قمحية",
        tan: "سمراء فاتحة",
        dark: "سمراء"

    };


    const timeNames = {

        morning: "الصبح 🌅",
        midday: "الظهر ☀️",
        afternoon: "بعد الظهر 🌤️",
        variable: "حسب اليوم 🔄"

    };


    return `
        تمام يا ${user.name} 💛
        
        خليني أشوف الصورة اللي جمعتها عنك لحد دلوقتي:
        
        ${genderText}، عمرك ${user.age} سنة،
        طولك ${user.height} سم ووزنك ${user.weight} كجم،
        ومن ${user.country}،
        ولون بشرتك ${skinNames[user.skinTone]}،
        والوقت الأقرب ليك للتعرض للشمس ${timeNames[user.sunTime]}.
        
        كده أنا مش مجرد عرفت شوية أرقام...
        أنا بدأت أفهم السياق اللي الأرقام دي موجودة فيه.
        
        وده اللي هنستخدمه بعد كده عشان نحدد احتياجاتك من الشمس والمياه والحركة بشكل أذكى وأقرب ليومك الحقيقي ☀️💛
    `;
}


/* =========================================================
   التعامل مع زر التعارف
========================================================= */

nextButton.addEventListener(
    "click",
    function () {

        /*
           لو سنا لسه بتكتب:
           نكمل الكتابة فقط
        */

        if (typingTimer) {

            const step =
                steps[currentStep];

            finishTyping(
                getDisplayedQuestionText(step),
                question
            );

            return;

        }


        /*
           لو إحنا في مرحلة رد سنا:
           ننتقل للسؤال التالي
        */

        if (
            conversationMode ===
            "response"
        ) {

            currentStep++;

            if (
                currentStep >=
                steps.length
            ) {

                showFinalSummary();

                return;

            }


            renderStep();

            return;

        }


        /*
           إحنا في مرحلة السؤال:
           ناخد إجابة المستخدم
        */

        processCurrentAnswer();

    }
);


/* =========================================================
   الحصول على النص الحالي للسؤال أو الرد
========================================================= */

function getDisplayedQuestionText(step) {

    if (
        conversationMode ===
        "question"
    ) {

        return step.question;

    }

    return getResponse(step);
}


/* =========================================================
   معالجة إجابة المستخدم
========================================================= */

function processCurrentAnswer() {

    const step =
        steps[currentStep];


    /* =====================================================
       الجنس
    ===================================================== */

    if (
        step.type === "gender"
    ) {

        if (
            !user.gender
        ) {

            alert(
                "اختار الأول الصيغة اللي تحب سنا تكلمك بيها 💛"
            );

            return;

        }

    }


    /* =====================================================
       لون البشرة
    ===================================================== */

    else if (
        step.type === "skin"
    ) {

        if (
            !user.skinTone
        ) {

            alert(
                "اختار درجة البشرة الأقرب ليك الأول ☀️"
            );

            return;

        }

    }


    /* =====================================================
       الوقت
    ===================================================== */

    else if (
        step.type === "time"
    ) {

        const input =
            document.getElementById(
                "answerInput"
            );


        if (
            !input ||
            !input.value
        ) {

            alert(
                "اختار الوقت الأول 🌤️"
            );

            return;

        }


        user.sunTime =
            input.value;

    }


    /* =====================================================
       النص والأرقام
    ===================================================== */

    else {

        const input =
            document.getElementById(
                "answerInput"
            );


        if (!input) {
            return;
        }


        const value =
            input.value.trim();


        if (!value) {

            alert(
                "اكتبلي الإجابة الأول 😊"
            );

            input.focus();

            return;

        }


        user[step.key] =
            value;

    }


    /*
       بعد حفظ الإجابة:
       نخلي سنا ترد مرة واحدة
    */

    conversationMode =
        "response";


    answerArea.innerHTML = "";


    const response =
        getResponse(step);


    nextButton.textContent =
        "كمّل معايا 💛";


    typeSanaText(
        response,
        question,
        38
    );

}


/* =========================================================
   آخر مرحلة بعد وقت الشمس
========================================================= */

function showFinalSummary() {

    showPage(welcome);


    answerArea.innerHTML = "";


    progressBar.style.width =
        "100%";


    conversationMode =
        "summary";


    nextButton.textContent =
        "ندخل على اختياراتك ☀️";


    const summary =
        createSummary();


    typeSanaText(
        summary,
        question,
        36
    );


    /*
       نستخدم حدث مستقل للانتقال من الملخص
       بدون تغيير onclick
    */

    nextButton.onclick = null;

}


/* =========================================================
   معالجة زر الملخص
========================================================= */

nextButton.addEventListener(
    "click",
    function summaryHandler() {

        if (
            conversationMode !==
            "summary"
        ) {

            return;

        }


        conversationMode =
            "done";


        showHabits();

    }
);


/* =========================================================
   صفحة العادات
========================================================= */

function showHabits() {

    showPage(habits);


    const name =
        user.name ||
        "يا صديقي";


    habitMessage.textContent =
        `كده أنا بدأت أعرفك بجد يا ${name} 💛. عندي سنك ووزنك وطولك ومكانك ولون بشرتك ووقت تعرضك للشمس. دلوقتي نقدر نبدأ نبني احتياجاتك بند بند بدل ما أرمي عليك أرقام محفوظة.`;


    const habitData = [

        {
            id: "sun",

            icon: "☀️",

            title: "جرعة الشمس",

            text:
                "نبدأ من بياناتك ونبني جرعة الشمس خطوة بخطوة."
        },


        {
            id: "water",

            icon: "💧",

            title: "شرب المياه",

            text:
                "نقدّر احتياجك ونبني طريقة سهلة للالتزام."
        },


        {
            id: "exercise",

            icon: "🏃",

            title: "الرياضة والحركة",

            text:
                "نختار مستوى حركة مناسب لجسمك وروتينك."
        },


        {
            id: "supplements",

            icon: "💊",

            title: "العلاج والمكملات",

            text:
                "ننظم المعلومات بأمان ومن غير وصف أدوية من نفسنا."
        }

    ];


    habitList.innerHTML =
        habitData
            .map(function (habit) {

                return `

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

                `;

            })
            .join("");


    document
        .querySelectorAll(".habit")
        .forEach(function (element) {

            element.addEventListener(
                "click",
                function () {

                    const selected =
                        this.dataset.habit;


                    document
                        .querySelectorAll(".habit")
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    this.classList.add(
                        "active"
                    );


                    if (
                        selected ===
                        "sun"
                    ) {

                        openSunDose();

                        return;

                    }


                    if (
                        selected ===
                        "water"
                    ) {

                        alert(
                            "💧 قسم المياه هنبدأ نبنيه بناءً على بياناتك."
                        );

                        return;

                    }


                    if (
                        selected ===
                        "exercise"
                    ) {

                        alert(
                            "🏃 قسم الحركة والرياضة هنحسبه بناءً على جسمك ونشاطك."
                        );

                        return;

                    }


                    alert(
                        "💊 قسم العلاج والمكملات هنخليه منظم وآمن."
                    );

                }
            );

        });

}


/* =========================================================
   فتح جرعة الشمس
========================================================= */

function openSunDose() {

    showPage(sunDose);


    const name =
        user.name ||
        "يا صديقي";


    sunMessage.textContent =
        `تمام يا ${name} ☀️ دلوقتي وصلنا للجزء اللي بدأنا عشانه. عندي بياناتك الأساسية، ولون بشرتك، ومكانك، والوقت اللي اخترته. من هنا هنبدأ نحسب جرعة الشمس بطريقة مبنية على بياناتك بدل رقم محفوظ للجميع.`;

}


/* =========================================================
   الرجوع للعادات
========================================================= */

backToHabits.addEventListener(
    "click",
    function () {

        showPage(habits);

    }
);
