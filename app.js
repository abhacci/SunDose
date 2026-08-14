const user = {
    name: "",
    gender: "",
    weight: "",
    height: "",
    country: ""
};

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
        question: "جميل! أكلّمك بصيغة إيه عشان كلامنا يبقى مريح ليك؟ 💛",
        type: "gender"
    },
    {
        key: "weight",
        question: "طيب قولي وزنك كام تقريبًا؟ 😄",
        type: "number",
        label: "الوزن",
        placeholder: "مثال: 80",
        unit: "كجم"
    },
    {
        key: "height",
        question: "وطولك كام؟ 🌱",
        type: "number",
        label: "الطول",
        placeholder: "مثال: 175",
        unit: "سم"
    },
    {
        key: "country",
        question: "وآخر حاجة... إنت من أنهي بلد؟ 🌍",
        type: "text",
        label: "البلد",
        placeholder: "مثال: مصر"
    }
];

let currentStep = 0;

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


function showScreen(screen) {

    home.classList.add("hidden");
    welcome.classList.add("hidden");
    habits.classList.add("hidden");
    sunDose.classList.add("hidden");

    screen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* البداية */

startButton.addEventListener("click", function () {

    currentStep = 0;

    showScreen(welcome);

    renderStep();
});


/* رسم السؤال */

function renderStep() {

    const step = steps[currentStep];

    question.textContent = step.question;

    const progress =
        ((currentStep + 1) / steps.length) * 100;

    progressBar.style.width = progress + "%";

    answerArea.innerHTML = "";

    if (step.type === "gender") {

        answerArea.innerHTML = `
            <div class="gender-grid">

                <button
                    class="gender-btn"
                    type="button"
                    data-gender="male"
                >
                    👨 ذكر
                </button>

                <button
                    class="gender-btn"
                    type="button"
                    data-gender="female"
                >
                    👩 أنثى
                </button>

            </div>
        `;

        document
            .querySelectorAll(".gender-btn")
            .forEach(button => {

                if (button.dataset.gender === user.gender) {
                    button.classList.add("active");
                }

                button.addEventListener("click", function () {

                    user.gender = this.dataset.gender;

                    document
                        .querySelectorAll(".gender-btn")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );

                    this.classList.add("active");
                });

            });

        return;
    }

    answerArea.innerHTML = `
        <div class="field">

            <label>${step.label}</label>

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
}


/* التالي */

nextButton.addEventListener("click", function () {

    const step = steps[currentStep];

    if (step.type === "gender") {

        if (!user.gender) {

            alert("اختار الأول يا حبيبي 💛");

            return;
        }

    } else {

        const input = document.getElementById("answerInput");

        const value = input.value.trim();

        if (!value) {

            alert("اكتب الإجابة الأول 😊");

            input.focus();

            return;
        }

        user[step.key] = value;
    }

    currentStep++;

    if (currentStep < steps.length) {

        renderStep();

    } else {

        showHabits();
    }
});


/* العادات */

function showHabits() {

    showScreen(habits);

    const name = user.name || "يا صديقي";

    habitMessage.textContent =
        `كده اتعرفنا يا ${name} 💛 دلوقتي اختار الحاجة اللي حابب تبدأ بيها، وأنا أمشي معاك واحدة واحدة.`;

    const habitsData = [

        {
            type: "sun",
            icon: "☀️",
            title: "الشمس",
            text: "نتعلم إزاي نخلي التعرض للشمس عادة مناسبة وآمنة."
        },

        {
            type: "water",
            icon: "💧",
            title: "شرب المياه",
            text: "تنظيم شرب المياه خلال اليوم بطريقة بسيطة."
        },

        {
            type: "activity",
            icon: "🏃",
            title: "الرياضة والحركة",
            text: "حركة ونشاط مناسبين لمستواك وحياتك اليومية."
        },

        {
            type: "treatment",
            icon: "💊",
            title: "العلاج أو المكملات",
            text: "تنظيم معلومات العلاج أو المكمل الموصوف بدون اقتراح عشوائي."
        }
    ];

    habitList.innerHTML = "";

    habitsData.forEach(habit => {

        const element = document.createElement("button");

        element.type = "button";
        element.className = "habit";

        element.innerHTML = `
            <strong>
                ${habit.icon} ${habit.title}
            </strong>

            <p>
                ${habit.text}
            </p>
        `;

        element.addEventListener("click", function () {

            if (habit.type === "sun") {

                openSunDose();

            } else {

                habitMessage.textContent =
                    `اختيار حلو يا ${name} 😊 نقدر نبدأ بـ ${habit.title}، وهنمشي فيها واحدة واحدة.`;

            }

        });

        habitList.appendChild(element);
    });
}


/* ⭐ أهم جزء: الشمس */

function openSunDose() {

    const name = user.name || "يا صديقي";

    sunMessage.textContent =
        `اختيار حلو يا ${name} 😊 نبدأ بالشمس. خلّيني أمشي معاك فيها واحدة واحدة وبشكل يناسبك.`;

    showScreen(sunDose);
}


/* الرجوع */

backToHabits.addEventListener("click", function () {

    showHabits();

});
