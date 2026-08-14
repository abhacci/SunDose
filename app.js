/* =========================================
   SunDose ☀️
   التطبيق الرئيسي
========================================= */

const user = {
    name: "",
    gender: "",
    weight: "",
    height: "",
    country: ""
};


/* =========================================
   عناصر الصفحات
========================================= */

const home = document.getElementById("home");
const welcome = document.getElementById("welcome");
const habits = document.getElementById("habits");
const sunDose = document.getElementById("sunDose");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");

const question = document.getElementById("question");
const answerArea = document.getElementById("answerArea");
const progressBar = document.getElementById("progressBar");

const habitMessage = document.getElementById("habitMessage");
const habitList = document.getElementById("habitList");

const sunMessage = document.getElementById("sunMessage");
const backToHabits = document.getElementById("backToHabits");


/* =========================================
   خطوات التعارف
========================================= */

const steps = [

    {
        key: "name",
        question: "قبل ما نبدأ... تحب أناديك بإيه؟ 😊",
        type: "text",
        label: "اسمك",
        placeholder: "اكتب اسمك هنا"
    },

    {
        key: "gender",
        question: "جميل! طيب أكلّمك بصيغة إيه عشان كلامنا يبقى مريح ولطيف ليك؟ 💛",
        type: "gender"
    },

    {
        key: "weight",
        question: "طيب قولي وزنك كام تقريبًا؟ 😄 الرقم ده بس يساعدني أفهم احتياجك أكتر.",
        type: "number",
        label: "الوزن",
        placeholder: "مثال: 80",
        unit: "كجم"
    },

    {
        key: "height",
        question: "وطولك كام؟ 🌱 عشان أقدر أكون صورة أوضح عن جسمك ونشاطك.",
        type: "number",
        label: "الطول",
        placeholder: "مثال: 175",
        unit: "سم"
    },

    {
        key: "country",
        question: "وآخر حاجة في التعارف... إنت من أنهي بلد؟ 🌍",
        type: "text",
        label: "البلد",
        placeholder: "مثال: مصر"
    }

];


let currentStep = 0;


/* =========================================
   دالة إظهار صفحة
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
   بداية التطبيق
========================================= */

startButton.addEventListener("click", function () {

    currentStep = 0;

    showPage(welcome);

    renderStep();

});


/* =========================================
   رسم سؤال التعارف
========================================= */

function renderStep() {

    const step = steps[currentStep];

    question.textContent = step.question;

    const progress =
        ((currentStep + 1) / steps.length) * 100;

    progressBar.style.width = progress + "%";

    answerArea.innerHTML = "";


    /* اختيار النوع */

    if (step.type === "gender") {

        answerArea.innerHTML = `

            <div class="gender-grid">

                <button
                    type="button"
                    class="gender-btn"
                    data-gender="male"
                >
                    👨 ذكر
                </button>

                <button
                    type="button"
                    class="gender-btn"
                    data-gender="female"
                >
                    👩 أنثى
                </button>

            </div>

        `;


        document
            .querySelectorAll(".gender-btn")
            .forEach(button => {

                if (
                    user.gender ===
                    button.dataset.gender
                ) {
                    button.classList.add("active");
                }


                button.addEventListener("click", function () {

                    user.gender =
                        this.dataset.gender;


                    document
                        .querySelectorAll(".gender-btn")
                        .forEach(btn => {

                            btn.classList.remove("active");

                        });


                    this.classList.add("active");

                });

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
                ?
                `<div class="unit">${step.unit}</div>`
                :
                ""
            }

        </div>

    `;


    const input =
        document.getElementById("answerInput");


    if (input) {

        input.focus();


        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                nextButton.click();

            }

        });

    }

}


/* =========================================
   زر التالي
========================================= */

nextButton.addEventListener("click", function () {

    const step = steps[currentStep];


    /* سؤال النوع */

    if (step.type === "gender") {

        if (!user.gender) {

            alert(
                "اختار الأول الصيغة اللي تحب سنا تكلمك بيها 💛"
            );

            return;
        }

    }


    /* الأسئلة النصية والرقمية */

    else {

        const input =
            document.getElementById("answerInput");


        if (!input) {
            return;
        }


        const value =
            input.value.trim();


        if (!value) {

            alert(
                "اكتبلي الإجابة الأول عشان نكمل 😊"
            );

            input.focus();

            return;
        }


        user[step.key] = value;

    }


    currentStep++;


    if (currentStep < steps.length) {

        renderStep();

    }

    else {

        showHabits();

    }

});


/* =========================================
   صفحة العادات
========================================= */

function showHabits() {

    showPage(habits);


    const name =
        user.name || "يا صديقي";


    habitMessage.textContent =
        `كده اتعرفنا يا ${name} 💛 دلوقتي نقدر نبدأ الجزء المهم. اختار الحاجة اللي حابب تبدأ بيها وأنا أمشي معاك فيها واحدة واحدة.`;


    const habitData = [

        {
            id: "sun",
            icon: "☀️",
            title: "جرعة الشمس",
            text: "نبدأ بخطوات بسيطة لفهم جرعة الشمس المناسبة ليك."
        },

        {
            id: "water",
            icon: "💧",
            title: "شرب المياه",
            text: "ننظم شرب المياه خلال اليوم بطريقة بسيطة."
        },

        {
            id: "exercise",
            icon: "🏃",
            title: "الرياضة والحركة",
            text: "نختار حركة مناسبة لمستواك ونبني عليها تدريجيًا."
        },

        {
            id: "supplements",
            icon: "💊",
            title: "العلاج أو المكملات",
            text: "نرتب معلومات العلاج أو المكملات بدون اقتراح أدوية من نفسنا."
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


    /* =====================================
       أهم جزء:
       الضغط على العادة
    ===================================== */

    document
        .querySelectorAll(".habit")
        .forEach(habitElement => {

            habitElement.addEventListener(
                "click",
                function () {

                    const selectedHabit =
                        this.dataset.habit;


                    /* تحديد الاختيار */

                    document
                        .querySelectorAll(".habit")
                        .forEach(item => {

                            item.classList.remove("active");

                        });


                    this.classList.add("active");


                    /* الشمس */

                    if (selectedHabit === "sun") {

                        openSunDose();

                    }


                    /* المياه */

                    else if (selectedHabit === "water") {

                        alert(
                            "💧 قسم شرب المياه لسه هنبدأ نبنيه معاك خطوة بخطوة."
                        );

                    }


                    /* الرياضة */

                    else if (selectedHabit === "exercise") {

                        alert(
                            "🏃 قسم الرياضة والحركة لسه هنبدأ نبنيه معاك خطوة بخطوة."
                        );

                    }


                    /* المكملات */

                    else if (
                        selectedHabit === "supplements"
                    ) {

                        alert(
                            "💊 قسم العلاج والمكملات لسه هنبدأ نبنيه بشكل آمن ومنظم."
                        );

                    }

                }
            );

        });

}


/* =========================================
   فتح جرعة الشمس
========================================= */

function openSunDose() {

    showPage(sunDose);


    const name =
        user.name || "يا صديقي";


    sunMessage.textContent =
        `تمام يا ${name} ☀️ اختيار ممتاز. هنا هنبدأ نبني جرعة الشمس الخاصة بيك خطوة بخطوة، وهنراعي بياناتك والوقت والمكان بدل ما نديك رقم عشوائي.`;

}


/* =========================================
   الرجوع للعادات
========================================= */

backToHabits.addEventListener(
    "click",
    function () {

        showPage(habits);

    }
);


/* =========================================
   حماية لو عنصر ناقص
========================================= */

if (!startButton) {

    console.error(
        "SunDose: startButton غير موجود في index.html"
    );

}

if (!nextButton) {

    console.error(
        "SunDose: nextButton غير موجود في index.html"
    );

}

if (!habitList) {

    console.error(
        "SunDose: habitList غير موجود في index.html"
    );

}
