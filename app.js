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
   إظهار صفحة
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


    if (step.type === "gender") {

        if (!user.gender) {

            alert(
                "اختار الأول الصيغة اللي تحب سنا تكلمك بيها 💛"
            );

            return;
        }

    }

    else {

        const input =
            document.getElementById("answerInput");


        if (!input) return;


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


    document
        .querySelectorAll(".habit")
        .forEach(habitElement => {

            habitElement.addEventListener(
                "click",
                function () {

                    const selectedHabit =
                        this.dataset.habit;


                    document
                        .querySelectorAll(".habit")
                        .forEach(item => {
                            item.classList.remove("active");
                        });


                    this.classList.add("active");


                    if (selectedHabit === "sun") {

                        openSunDose();

                    }

                    else if (selectedHabit === "water") {

                        alert(
                            "💧 قسم شرب المياه هنبدأ نبنيه بعد ما نخلص جرعة الشمس."
                        );

                    }

                    else if (selectedHabit === "exercise") {

                        alert(
                            "🏃 قسم الرياضة هنبدأ نبنيه بعد جرعة الشمس."
                        );

                    }

                    else if (selectedHabit === "supplements") {

                        alert(
                            "💊 قسم العلاج والمكملات هنبدأ نبنيه بعد جرعة الشمس."
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


    /*
       هنا بنبني شاشة جرعة الشمس
       بالكامل من JavaScript
    */

    sunMessage.textContent =
        `تمام يا ${name} ☀️ قبل ما نحدد أي جرعة، محتاج أعرف حاجة بسيطة عن بشرتك. ده يساعدنا نعمل النظام بشكل أدق بدل رقم عشوائي.`;


    const doseCard =
        sunDose.querySelector(".dose-card");


    if (!doseCard) return;


    doseCard.innerHTML = `

        <div
            style="
                text-align:center;
                padding:8px 2px 5px;
            "
        >

            <div
                style="
                    font-size:58px;
                    margin-bottom:8px;
                "
            >
                ☀️
            </div>


            <h2
                style="
                    margin:0 0 12px;
                    color:#e6a119;
                    font-size:25px;
                "
            >
                نبدأ جرعة الشمس
            </h2>


            <p
                style="
                    margin:0 0 20px;
                    color:#756b5e;
                    line-height:1.9;
                    font-size:16px;
                "
            >
                أول خطوة إننا نحدد لون بشرتك تقريبًا.
                اختار الأقرب ليك 👇
            </p>


            <div
                id="skinChoices"
                style="
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:10px;
                "
            >

                <button
                    type="button"
                    data-skin="very-light"
                    style="
                        border:1.5px solid #eadfc9;
                        background:#fff;
                        border-radius:16px;
                        padding:15px 8px;
                        font-size:15px;
                        cursor:pointer;
                    "
                >
                    🤍<br>
                    فاتحة جدًا
                </button>


                <button
                    type="button"
                    data-skin="light"
                    style="
                        border:1.5px solid #eadfc9;
                        background:#fff;
                        border-radius:16px;
                        padding:15px 8px;
                        font-size:15px;
                        cursor:pointer;
                    "
                >
                    🧡<br>
                    فاتحة
                </button>


                <button
                    type="button"
                    data-skin="medium"
                    style="
                        border:1.5px solid #eadfc9;
                        background:#fff;
                        border-radius:16px;
                        padding:15px 8px;
                        font-size:15px;
                        cursor:pointer;
                    "
                >
                    🤎<br>
                    متوسطة
                </button>


                <button
                    type="button"
                    data-skin="dark"
                    style="
                        border:1.5px solid #eadfc9;
                        background:#fff;
                        border-radius:16px;
                        padding:15px 8px;
                        font-size:15px;
                        cursor:pointer;
                    "
                >
                    🟤<br>
                    داكنة
                </button>

            </div>


            <button
                id="skinNext"
                type="button"
                disabled
                style="
                    width:100%;
                    margin-top:16px;
                    border:0;
                    border-radius:16px;
                    padding:15px;
                    background:#ddd;
                    color:#fff;
                    font-size:17px;
                    font-weight:800;
                    cursor:not-allowed;
                "
            >
                نكمل ☀️
            </button>

        </div>

    `;


    const skinButtons =
        document.querySelectorAll("[data-skin]");

    const skinNext =
        document.getElementById("skinNext");


    let selectedSkin = "";


    skinButtons.forEach(button => {

        button.addEventListener("click", function () {

            selectedSkin =
                this.dataset.skin;


            skinButtons.forEach(btn => {

                btn.style.borderColor =
                    "#eadfc9";

                btn.style.background =
                    "#fff";

            });


            this.style.borderColor =
                "#ffb323";

            this.style.background =
                "#fff8df";


            skinNext.disabled = false;

            skinNext.style.background =
                "linear-gradient(135deg,#ffc331,#f5a415)";

            skinNext.style.cursor =
                "pointer";

        });

    });


    skinNext.addEventListener("click", function () {

        if (!selectedSkin) return;


        openSunTimeStep(selectedSkin);

    });

}


/* =========================================
   اختيار وقت التعرض
========================================= */

function openSunTimeStep(skin) {

    const name =
        user.name || "يا صديقي";


    sunMessage.textContent =
        `ممتاز يا ${name} 💛 عرفنا لون بشرتك. الخطوة الجاية مهمة: إمتى عادةً تقدر تتعرض للشمس؟`;


    const doseCard =
        sunDose.querySelector(".dose-card");


    doseCard.innerHTML = `

        <div
            style="
                text-align:center;
                padding:8px 2px 5px;
            "
        >

            <div
                style="
                    font-size:55px;
                    margin-bottom:8px;
                "
            >
                🕐
            </div>


            <h2
                style="
                    margin:0 0 12px;
                    color:#e6a119;
                    font-size:24px;
                "
            >
                اختار الوقت الأقرب ليك
            </h2>


            <p
                style="
                    margin:0 0 18px;
                    color:#756b5e;
                    line-height:1.9;
                    font-size:15px;
                "
            >
                مش هنحدد مدة التعرض دلوقتي.
                الأول محتاجين نعرف الوقت، وبعدها نقدر
                نراعي شدة الشمس بشكل أفضل.
            </p>


            <div
                id="timeChoices"
                style="
                    display:grid;
                    gap:10px;
                "
            >

                <button
                    type="button"
                    data-time="morning"
                    style="
                        border:1.5px solid #eadfc9;
                        background:#fff;
                        border-radius:16px;
                        padding:16px;
                        font-size:16px;
                        font-weight:700;
                        cursor:pointer;
                    "
                >
                    🌅 الصبح
                </button>


                <button
                    type="button"
                    data-time="midday"
                    style="
                        border:1.5px solid #eadfc9;
                        background:#fff;
                        border-radius:16px;
                        padding:16px;
                        font-size:16px;
                        font-weight:700;
                        cursor:pointer;
                    "
                >
                    ☀️ منتصف اليوم
                </button>


                <button
                    type="button"
                    data-time="afternoon"
                    style="
                        border:1.5px solid #eadfc9;
                        background:#fff;
                        border-radius:16px;
                        padding:16px;
                        font-size:16px;
                        font-weight:700;
                        cursor:pointer;
                    "
                >
                    🌤️ بعد الظهر
                </button>

            </div>


            <button
                id="timeNext"
                type="button"
                disabled
                style="
                    width:100%;
                    margin-top:16px;
                    border:0;
                    border-radius:16px;
                    padding:15px;
                    background:#ddd;
                    color:#fff;
                    font-size:17px;
                    font-weight:800;
                    cursor:not-allowed;
                "
            >
                نكمل ☀️
            </button>

        </div>

    `;


    const timeButtons =
        document.querySelectorAll("[data-time]");

    const timeNext =
        document.getElementById("timeNext");


    let selectedTime = "";


    timeButtons.forEach(button => {

        button.addEventListener("click", function () {

            selectedTime =
                this.dataset.time;


            timeButtons.forEach(btn => {

                btn.style.borderColor =
                    "#eadfc9";

                btn.style.background =
                    "#fff";

            });


            this.style.borderColor =
                "#ffb323";

            this.style.background =
                "#fff8df";


            timeNext.disabled = false;

            timeNext.style.background =
                "linear-gradient(135deg,#ffc331,#f5a415)";

            timeNext.style.cursor =
                "pointer";

        });

    });


    timeNext.addEventListener("click", function () {

        if (!selectedTime) return;


        showSunSummary(
            skin,
            selectedTime
        );

    });

}


/* =========================================
   ملخص جرعة الشمس
========================================= */

function showSunSummary(skin, time) {

    const name =
        user.name || "يا صديقي";


    let skinText = "";

    if (skin === "very-light") {
        skinText = "فاتحة جدًا";
    }

    else if (skin === "light") {
        skinText = "فاتحة";
    }

    else if (skin === "medium") {
        skinText = "متوسطة";
    }

    else {
        skinText = "داكنة";
    }


    let timeText = "";

    if (time === "morning") {
        timeText = "الصبح";
    }

    else if (time === "midday") {
        timeText = "منتصف اليوم";
    }

    else {
        timeText = "بعد الظهر";
    }


    const doseCard =
        sunDose.querySelector(".dose-card");


    sunMessage.textContent =
        `تمام يا ${name} ☀️ كده عندي أول معلومات تساعدني أبني جرعتك بشكل أفضل.`;


    doseCard.innerHTML = `

        <div
            style="
                text-align:center;
                padding:8px 2px;
            "
        >

            <div
                style="
                    font-size:58px;
                    margin-bottom:8px;
                "
            >
                🌞
            </div>


            <h2
                style="
                    margin:0 0 15px;
                    color:#e6a119;
                    font-size:24px;
                "
            >
                بيانات جرعتك
            </h2>


            <div
                style="
                    background:#fffaf0;
                    border:1px solid #eadfc9;
                    border-radius:17px;
                    padding:15px;
                    text-align:right;
                    line-height:2;
                    font-size:16px;
                "
            >

                <div>
                    👤 الاسم:
                    <strong>${name}</strong>
                </div>

                <div>
                    🎨 لون البشرة:
                    <strong>${skinText}</strong>
                </div>

                <div>
                    🕐 الوقت المفضل:
                    <strong>${timeText}</strong>
                </div>

                <div>
                    📍 البلد:
                    <strong>${user.country || "غير محددة"}</strong>
                </div>

            </div>


            <div
                style="
                    margin-top:16px;
                    background:#fff4cf;
                    border-radius:17px;
                    padding:15px;
                    color:#725b24;
                    line-height:1.8;
                    font-size:14px;
                "
            >
                💛 لسه مش هنقولك رقم دقائق ثابت.
                SunDose هيراعي شدة الشمس وبياناتك
                قبل ما يقترح أي مدة تعرض.
            </div>


            <button
                id="sunDone"
                type="button"
                style="
                    width:100%;
                    margin-top:16px;
                    border:0;
                    border-radius:16px;
                    padding:15px;
                    background:linear-gradient(135deg,#ffc331,#f5a415);
                    color:#fff;
                    font-size:17px;
                    font-weight:800;
                    cursor:pointer;
                "
            >
                حفظ جرعتي ☀️
            </button>

        </div>

    `;


    document
        .getElementById("sunDone")
        .addEventListener("click", function () {

            this.textContent =
                "✅ تم حفظ الخطوة";

            this.disabled = true;

            this.style.opacity = "0.7";

        });

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
   حماية من العناصر الناقصة
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
