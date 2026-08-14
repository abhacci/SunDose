/* =========================================
   SunDose ☀️
   شخصية سنا والتعارف
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
   مقدمة سنا

   مهمة:
   سنا لا تفترض ولد أو بنت.
   لا تستخدم صيغة مذكرة أو مؤنثة.
========================================= */

const introMessages = [

    "أهلًا 💛 أنا سنا... ويمكن دي أول مرة نتقابل فيها، فمش عايزة أبدأ معاك بأسئلة وكأنك داخل تملى استمارة 😄",

    "أنا سنا، واسمي مرتبط بالشمس والنور... وده بالظبط سبب وجودي هنا ☀️",

    "SunDose بدأ بفكرة بسيطة جدًا: نساعد شخص يفتكر حاجات صحية مهمة في يومه، خصوصًا موضوع الشمس وفيتامين D.",

    "بس مع الوقت الفكرة كبرت... وقلت: طب ليه ما يكونش فيه حد يمشي مع الشخص نفسه؟ يفهمه، ويسمع بياناته، ويربطها بالجو والمكان والعادات اليومية؟",

    "وعشان كده أنا هنا 💛 مش عشان أقولك اعمل إيه وخلاص... عايزة الأول أعرفك، وأفهم جسمك وروتينك ومكانك، وبعدها نبدأ نبني حاجات تناسبك فعلًا.",

    "فخلينا ناخدها واحدة واحدة... من غير استعجال، ومن غير كلام محفوظ. إنت هتقولّي عن نفسك، وأنا هرد عليك بناءً على اللي تقوله."
];


let introStep = 0;


/* =========================================
   إظهار الصفحة
========================================= */

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


/* =========================================
   كتابة نص سنا ببطء
========================================= */

function typeSanaText(text, element, speed = 38) {

    element.textContent = "";

    let index = 0;

    const timer = setInterval(() => {

        element.textContent += text[index];

        index++;

        if (index >= text.length) {
            clearInterval(timer);
        }

    }, speed);
}


/* =========================================
   بداية مقدمة سنا
========================================= */

function renderIntro() {

    typeSanaText(
        introMessages[introStep],
        introText,
        38
    );

    if (
        introStep ===
        introMessages.length - 1
    ) {

        introNext.textContent =
            "نتعرّف على بعض ☀️";

    }

    else {

        introNext.textContent =
            "كمّل معايا 💛";

    }

}


/* =========================================
   تشغيل المقدمة أول ما الصفحة تفتح
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderIntro();

    }
);


/* =========================================
   زر مقدمة سنا
========================================= */

introNext.addEventListener(
    "click",
    function () {

        if (
            introStep <
            introMessages.length - 1
        ) {

            introStep++;

            renderIntro();

            return;
        }


        startButton.classList.remove("hidden");

        introNext.classList.add("hidden");

    }
);


/* =========================================
   بدء التعارف الحقيقي
========================================= */

startButton.addEventListener(
    "click",
    function () {

        showPage(welcome);

        currentStep = 0;

        renderStep();

    }
);


/* =========================================
   خطوات التعارف
========================================= */

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
            "جميل جدًا 💛 طب تحب أكلمك بصيغة إيه؟",

        type: "gender"
    },


    {
        key: "age",

        question:
            "طيب قولي سنك كام؟ 😄 السن بيفرق معايا في طريقة فهم احتياج جسمك.",

        type: "number",

        label: "العمر",

        placeholder:
            "مثال: 23",

        unit: "سنة"
    },


    {
        key: "weight",

        question:
            "تمام يا جميل... وزنك كام تقريبًا؟ 😄",

        type: "number",

        label: "الوزن",

        placeholder:
            "مثال: 80",

        unit: "كجم"
    },


    {
        key: "height",

        question:
            "وطولك كام؟ 🌱 عايزة أربط الطول بالوزن والعمر عشان الصورة تبقى أوضح.",

        type: "number",

        label: "الطول",

        placeholder:
            "مثال: 175",

        unit: "سم"
    },


    {
        key: "country",

        question:
            "وإنت من أنهي بلد؟ 🌍 المكان مهم عندي لأن الشمس والطقس وساعات النهار مش زي بعض في كل مكان.",

        type: "text",

        label: "البلد",

        placeholder:
            "مثال: مصر"
    }

];


let currentStep = 0;


/* =========================================
   رسم السؤال
========================================= */

function renderStep() {

    const step =
        steps[currentStep];


    question.textContent =
        step.question;


    const progress =
        ((currentStep + 1) /
        steps.length) * 100;


    progressBar.style.width =
        progress + "%";


    answerArea.innerHTML = "";


    /* =====================================
       الجنس
    ===================================== */

    if (step.type === "gender") {

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

                button.addEventListener(
                    "click",
                    function () {

                        user.gender =
                            this.dataset.gender;


                        document
                            .querySelectorAll(
                                ".gender-btn"
                            )
                            .forEach(btn => {

                                btn.classList
                                    .remove(
                                        "active"
                                    );

                            });


                        this.classList
                            .add("active");

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


/* =========================================
   رد سنا بعد إجابة المستخدم
========================================= */

function getResponse(step) {

    const value =
        user[step.key];


    if (step.key === "name") {

        return `تشرفت بيك يا ${value} 💛 حلو الاسم ده... كده بقى أعرف أناديك باسمك وأنا بكلمك.`;


    }


    if (step.key === "gender") {

        if (
            user.gender === "male"
        ) {

            return `تمام يا ${user.name} 😄 كده فهمت إنّي أكلمك بصيغة مناسبة ليك، ونكمّل براحتنا.`;


        }

        return `تمام يا ${user.name} 💛 كده عرفت الصيغة اللي تريحك، ونكمّل تعارفنا واحدة واحدة.`;

    }


    if (step.key === "age") {

        const age =
            Number(user.age);


        if (age < 18) {

            return `يا ${user.name} 💛 سن صغير ولسه جسمك في مرحلة نمو، وده بيخليني أكون أدق في أي حاجة تخص العادات والصحة.`;


        }

        if (age <= 25) {

            return `يا ${user.name} 😄 ${age} سنة؟ لسه في بداية الشباب، ودي مرحلة حلوة جدًا نبني فيها عادات تفضل معاك سنين.`;


        }

        if (age <= 40) {

            return `ما شاء الله يا ${user.name} 😄 ${age} سنة، سن ممتاز نهتم فيه بالجسم والطاقة والعادات اليومية قبل ما الإهمال يتراكم.`;


        }

        return `يا ${user.name} 💛 ${age} سنة معناها إننا هنركز أكتر على العادات اللي تحافظ على الصحة والنشاط بشكل مستمر.`;

    }


    if (step.key === "weight") {

        return `تمام يا ${user.name} 💛 سجلت وزنك ${user.weight} كجم. مش هحكم على الرقم لوحده؛ هربطه بطولك وسنك وباقي بياناتك عشان أفهم الصورة كاملة.`;

    }


    if (step.key === "height") {

        return `حلو يا ${user.name} 🌱 طولك ${user.height} سم، كده بدأت الصورة عندي تبقى أوضح. الوزن لوحده عمره ما كان كفاية للحكم على احتياج الجسم.`;

    }


    if (step.key === "country") {

        return `وصلنا للمكان كمان يا ${user.name} 🌍 ${user.country} مش مجرد اسم بلد عندي؛ المكان هيساعدني أربط كلامنا بالشمس والطقس وساعات النهار والعادات المناسبة ليك.`;

    }


    return `تمام يا ${user.name} 💛 سجلت المعلومة دي عندي.`;

}


/* =========================================
   زر التالي
========================================= */

nextButton.addEventListener(
    "click",
    function () {

        const step =
            steps[currentStep];


        /* الجنس */

        if (
            step.type === "gender"
        ) {

            if (!user.gender) {

                alert(
                    "اختار الصيغة اللي تحب سنا تكلمك بيها 💛"
                );

                return;

            }

        }


        /* باقي الأسئلة */

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


        /* =================================
           عرض رد سنا قبل السؤال التالي
        ================================= */

        const response =
            getResponse(step);


        typeSanaText(
            response,
            question,
            35
        );


        answerArea.innerHTML = "";


        nextButton.textContent =
            "كمّل معايا 💛";


        /*
           نخلي الضغط القادم ينتقل للسؤال
        */

        nextButton.onclick =
            function continueNext() {

                nextButton.onclick =
                    null;

                currentStep++;


                if (
                    currentStep <
                    steps.length
                ) {

                    nextButton.textContent =
                        "نكمّل سوا 💛";

                    renderStep();

                }

                else {

                    showHabits();

                }

            };

    }
);


/* =========================================
   صفحة العادات
========================================= */

function showHabits() {

    showPage(habits);


    const name =
        user.name ||
        "يا صديقي";


    habitMessage.textContent =
        `كده أنا بدأت أعرفك بجد يا ${name} 💛. عندي سنك ووزنك وطولك ومكانك، ومع الوقت هضيف لون بشرتك ووقت التعرض للشمس وباقي التفاصيل. دلوقتي نقدر نبدأ نبني احتياجاتك بند بند بدل ما أرمي عليك أرقام محفوظة.`;


    const habitData = [

        {
            id: "sun",
            icon: "☀️",
            title: "جرعة الشمس",
            text:
                "نحسبها بناءً على بياناتك ومكانك ووقت التعرض."
        },

        {
            id: "water",
            icon: "💧",
            title: "شرب المياه",
            text:
                "نقدّر احتياجك اليومي ونبني طريقة سهلة للالتزام."
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
                "نرتب المعلومات بأمان ومن غير وصف أدوية من نفسنا."
        }

    ];


    habitList.innerHTML =
        habitData.map(habit => `

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

        `).join("");


    document
        .querySelectorAll(".habit")
        .forEach(element => {

            element.addEventListener(
                "click",
                function () {

                    const selected =
                        this.dataset.habit;


                    document
                        .querySelectorAll(".habit")
                        .forEach(item => {

                            item.classList
                                .remove("active");

                        });


                    this.classList
                        .add("active");


                    if (
                        selected === "sun"
                    ) {

                        openSunDose();

                    }


                    else if (
                        selected === "water"
                    ) {

                        alert(
                            "💧 قسم المياه هنبدأ نبنيه بناءً على بياناتك."
                        );

                    }


                    else if (
                        selected === "exercise"
                    ) {

                        alert(
                            "🏃 قسم الحركة والرياضة هنحسبه بناءً على جسمك ونشاطك."
                        );

                    }


                    else {

                        alert(
                            "💊 قسم العلاج والمكملات هنخليه منظم وآمن."
                        );

                    }

                }
            );

        });

}


/* =========================================
   جرعة الشمس
========================================= */

function openSunDose() {

    showPage(sunDose);


    const name =
        user.name ||
        "يا صديقي";


    sunMessage.textContent =
        `تمام يا ${name} ☀️ هنا بقى هنبدأ الجزء المهم. مش هديك رقم محفوظ وخلاص؛ هنضيف لون بشرتك، وقت التعرض، البلد، والبيانات اللي عرفتها عنك، وبعدها نبني الجرعة خطوة خطوة.`;

}


/* =========================================
   الرجوع
========================================= */

backToHabits.addEventListener(
    "click",
    function () {

        showPage(habits);

    }
);
