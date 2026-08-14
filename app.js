/* =========================================
   SunDose ☀️
   Sana Conversation Engine
   ========================================= */

const user = {
    name: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    country: "",
    skin: "",
    sunTime: ""
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
   حالة المحادثة
========================================= */

let currentStep = 0;
let waitingForContinue = false;


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
        key: "age",
        question: "طب قولي سنك كام؟ 👀 متقلقش، أنا مش هحكم عليك... بس عايزة أعرفك أكتر.",
        type: "number",
        label: "السن",
        placeholder: "مثال: 22",
        unit: "سنة"
    },

    {
        key: "weight",
        question: "طيب وزنك كام تقريبًا؟ 😄 الرقم لوحده مش هيحكيلي كل حاجة، بس هيساعدني أفهم الصورة لما أربطه بباقي بياناتك.",
        type: "number",
        label: "الوزن",
        placeholder: "مثال: 80",
        unit: "كجم"
    },

    {
        key: "height",
        question: "وطولك كام؟ 🌱 كده الأرقام بدأت تتكلم معايا أكتر.",
        type: "number",
        label: "الطول",
        placeholder: "مثال: 175",
        unit: "سم"
    },

    {
        key: "country",
        question: "وآخر حاجة في التعارف... إنت من أنهي بلد؟ 🌍 البلد هتفرق معايا جدًا لما نتكلم عن الشمس والجو.",
        type: "text",
        label: "البلد",
        placeholder: "مثال: مصر"
    }

];


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
   أسماء لطيفة حسب النوع
========================================= */

function getFriendlyName() {

    if (user.name) {
        return user.name;
    }

    if (user.gender === "female") {
        return "يا جميلة";
    }

    return "يا صاحبي";
}


/* =========================================
   ردود سنا الذكية
========================================= */

function getResponse(step, value) {

    const name = user.name || "يا صاحبي";

    /* الاسم */

    if (step.key === "name") {

        return user.gender === "female"

            ? `حلو أوي يا ${value} 💛 من أولها كده الاسم عاجبني... خلاص ثبتّه عندي، ومن هنا ورايح الكلام بينا هيبقى على اسمك.`

            : `حلو أوي يا ${value} 😄 كده بقى عرفت أناديك بإيه بدل ما أفضل أقول يا صاحبي وخلاص. الاسم اتسجل عندي يا نجم 💛`;
    }


    /* النوع */

    if (step.key === "gender") {

        if (value === "female") {

            return `تمام يا ${name} 💛 كده عرفت أكلمك بالطريقة اللي تريحك. وبالمناسبة... اختيارك لطيف، حاسة إننا هنفهم بعض بسرعة 😄`;

        }

        return `تمام يا ${name} يا نجم 😄 كده عرفت أكلمك بصيغة مناسبة ليك. خلاص، من هنا الكلام هيبقى على مزاجك ومن غير رسمية زيادة 💛`;
    }


    /* العمر */

    if (step.key === "age") {

        const age = Number(value);

        if (age < 18) {

            return `يا ${name} 😄 تمام، ${age} سنة. بما إنك لسه صغير، هراعي ده جدًا في طريقة الكلام والنصائح، ومش هعاملك كأنك شخص بالغ. المهم عندي سلامتك قبل أي حاجة 💛`;

        }

        if (age >= 18 && age <= 25) {

            return `يا ${name} 😄 ${age} سنة؟ لسه في سن حلو جدًا تبني فيه عادات تفضل معاك سنين. جسمك وحياتك لسه قدامهم كتير، فبدل ما نعمل حاجات قاسية، أنا عايزاك تبني أساس تقدر تكمل عليه.`;

        }

        if (age >= 26 && age <= 39) {

            return `تمام يا ${name} 👀 ${age} سنة. كده بدأت أفهم المرحلة اللي إنت فيها أكتر. هنا الاستمرارية بتفرق جدًا، ومش محتاج تعمل حاجات خارقة؛ محتاج عادات واقعية تقدر تدخلها وسط شغلك وحياتك.`;

        }

        if (age >= 40 && age <= 59) {

            return `تمام يا ${name} 💛 ${age} سنة. السن ده بيخليني أهتم أكتر بالاستمرارية، النوم، الحركة، والتغذية بدل فكرة "أعمل جامد كام يوم". جسمك يستاهل اهتمام ثابت مش حماس مؤقت.`;

        }

        return `ما شاء الله يا ${name} ❤️ ${age} سنة. السن عمره ما كان مجرد رقم عندي؛ كل مرحلة ليها احتياجاتها وطريقتها. هنركز على الحاجات المفيدة والآمنة اللي تناسبك فعلًا.`;
    }


    /* الوزن */

    if (step.key === "weight") {

        const weight = Number(value);

        return `تمام يا ${name} 👀 سجلت وزنك ${weight} كجم. بس خد بالك من حاجة مهمة: أنا مش هبص للرقم وأقولك حلو أو وحش. الوزن لوحده مش بيحكي القصة كلها؛ لازم أربطه بطولك وسنك ونشاطك وباقي الصورة. يعني الميزان عندي معلومة... مش حكم عليك 😄💛`;
    }


    /* الطول */

    if (step.key === "height") {

        const height = Number(value);
        const weight = Number(user.weight);
        const age = Number(user.age);

        let extra = "";

        if (height >= 180) {

            extra = ` و${height} سم؟ يا نجم إنت طويل كده 😄`;

        } else if (height >= 170) {

            extra = ` و${height} سم، تمام، كده عندي رقم مهم جدًا عشان أربطه بوزنك.`;

        } else {

            extra = ` و${height} سم، تمام يا ${name} 💛 وكل طول له جسمه واحتياجاته، مفيش رقم يخلي الشخص أحسن من غيره.`;

        }

        let bmiText = "";

        if (weight > 0 && height > 0) {

            const bmi =
                weight / Math.pow(height / 100, 2);

            bmiText =
                ` دلوقتي أقدر أطلع مؤشر كتلة الجسم بشكل مبدئي، لكن مش هعتبره تشخيص ولا حكم نهائي؛ لأنه مش بيقيس تركيب الجسم ولا بيفرق بين الدهون والعضلات.`;

        }

        return `تمام يا ${name} 😄${extra}${bmiText} كده بدأت الصورة عندي تبقى أوضح، خصوصًا لما أربط الطول بالوزن والسن بدل ما أبص لكل رقم لوحده.`;
    }


    /* البلد */

    if (step.key === "country") {

        const country = value.trim().toLowerCase();

        if (
            country.includes("مصر") ||
            country.includes("egypt")
        ) {

            return `مصر 🇪🇬؟ طب كده دخلنا في حتة مهمة جدًا يا ${name} ☀️. عندنا الشمس قوية في أوقات كتير من السنة، لكن ده مش معناه إن كل وقت مناسب للتعرض. شدة الأشعة فوق البنفسجية بتتغير حسب الوقت والتاريخ والمكان والظروف الجوية. عشان كده لما أوصلك لجرعة الشمس، مش هديك رقم محفوظ وخلاص؛ هراعي مكانك ووقت التعرض وشدة الشمس ودرجة بشرتك. كده بقى أنا مش بس عرفت بلدك... أنا بدأت أفهم البيئة اللي حواليك. 💛`;

        }

        if (
            country.includes("المغرب") ||
            country.includes("morocco")
        ) {

            return `المغرب 🇲🇦؟ جميل يا ${name} 😄 كده معلومات الشمس عندك هتتحسب باعتبار موقعك وظروف بلدك، ومش هتعامل المغرب كأنها مصر أو أي بلد تانية. الموقع الجغرافي، الوقت من السنة، ووقت اليوم كلهم بيفرقوا في شدة الأشعة. ولما نوصل للجرعة، هنخلي الكلام مبني على الظروف الفعلية مش كلام محفوظ. ☀️`;

        }

        return `تمام يا ${name} 🌍 سجلت ${value}. ودي مش خانة بكتبها وخلاص؛ البلد والموقع الجغرافي ممكن يفرقوا جدًا في موضوع الشمس والطقس وشدة الأشعة خلال اليوم. عشان كده لما نبدأ الجرعة هراعي المكان اللي إنت فيه بدل ما أديك نصيحة واحدة لكل الناس. كده بدأت أعرفك والبيئة اللي حواليك في نفس الوقت 💛`;
    }

    return `تمام يا ${name} 💛 سجلت المعلومة دي. كده بنقرب أكتر للصورة الكاملة.`;
}


/* =========================================
   كتابة سنا تدريجيًا
========================================= */

function sanaSpeak(text, callback) {

    question.classList.add("sana-speaking");

    question.innerHTML =
        `<span class="typing-dots">•••</span>`;

    nextButton.disabled = true;

    setTimeout(() => {

        question.innerHTML = "";

        let index = 0;

        const speed = 16;

        const timer = setInterval(() => {

            question.textContent += text[index];

            index++;

            if (index >= text.length) {

                clearInterval(timer);

                question.classList.remove("sana-speaking");

                nextButton.disabled = false;

                if (callback) {
                    callback();
                }

            }

        }, speed);

    }, 550);
}


/* =========================================
   بداية التطبيق
========================================= */

startButton.addEventListener("click", function () {

    currentStep = 0;

    waitingForContinue = false;

    showPage(welcome);

    renderStep();

});


/* =========================================
   رسم السؤال
========================================= */

function renderStep() {

    const step = steps[currentStep];

    waitingForContinue = false;

    question.textContent = step.question;

    const progress =
        ((currentStep + 1) / steps.length) * 100;

    progressBar.style.width =
        progress + "%";

    answerArea.innerHTML = "";

    nextButton.disabled = false;

    nextButton.textContent =
        "تمام، قولي 💛";


    /* اختيار النوع */

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

                if (
                    user.gender ===
                    button.dataset.gender
                ) {

                    button.classList.add("active");

                }


                button.addEventListener(
                    "click",
                    function () {

                        user.gender =
                            this.dataset.gender;


                        document
                            .querySelectorAll(".gender-btn")
                            .forEach(btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            });


                        this.classList.add("active");

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
                min="${step.type === "number" ? "1" : ""}"
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


        input.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    nextButton.click();

                }

            }
        );

    }

}


/* =========================================
   زر التالي
========================================= */

nextButton.addEventListener("click", function () {

    /* لو سنا ردت بالفعل */
    if (waitingForContinue) {

        currentStep++;

        if (currentStep < steps.length) {

            renderStep();

        } else {

            showHabits();

        }

        return;
    }


    const step = steps[currentStep];


    /* النوع */

    if (step.type === "gender") {

        if (!user.gender) {

            question.textContent =
                "استنى يا جميل 😄 اختار الأول الصيغة اللي تحبني أكلمك بيها.";

            return;

        }

        answerArea.innerHTML = "";

    }


    /* باقي الأسئلة */

    else {

        const input =
            document.getElementById("answerInput");


        if (!input) {
            return;
        }


        const value =
            input.value.trim();


        if (!value) {

            question.textContent =
                "بصلي كده 😄 اكتبلي الإجابة الأول عشان أعرفك أكتر.";

            input.focus();

            return;

        }


        if (
            step.type === "number" &&
            Number(value) <= 0
        ) {

            question.textContent =
                "استنى بس 😄 اكتبلي رقم منطقي عشان أعرف أتعامل معاه صح.";

            input.focus();

            return;

        }


        user[step.key] = value;

        answerArea.innerHTML = "";

    }


    /* =====================================
       سنا ترد على الإجابة
    ===================================== */

    const value =
        step.type === "gender"
            ? user.gender
            : user[step.key];


    const response =
        getResponse(step, value);


    waitingForContinue = true;


    nextButton.textContent =
        "كده تمام، كمّلي معايا 💛";


    sanaSpeak(
        response,
        function () {

            if (currentStep === steps.length - 1) {

                nextButton.textContent =
                    "ورّيني بقى هنعمل إيه ☀️";

            }

        }
    );

});


/* =========================================
   صفحة العادات
========================================= */

function showHabits() {

    showPage(habits);


    const name =
        user.name || "يا صديقي";


    habitMessage.textContent =
        `استنى كده يا ${name} 😄 أنا عايزة أقولك حاجة قبل ما نبدأ. أنا دلوقتي عرفت عنك شوية حاجات مهمة، ومش هستخدمهم لمجرد إنهم أرقام محفوظة. هنربطهم ببعض ونشوف إيه اللي يناسبك فعلًا. اختار أول حاجة نفسك تبدأ بيها وأنا هشرحلك ليه ممكن تكون مناسبة ليك. 💛`;


    const habitData = [

        {
            id: "sun",
            icon: "☀️",
            title: "جرعة الشمس",
            text:
                "نفهم الشمس ودرجة بشرتك ووقت التعرض ونبني الجرعة خطوة خطوة."
        },

        {
            id: "water",
            icon: "💧",
            title: "شرب المياه",
            text:
                "ننظم شرب المياه بطريقة تناسب يومك بدل ما نخلي الموضوع عشوائي."
        },

        {
            id: "exercise",
            icon: "🏃",
            title: "الرياضة والحركة",
            text:
                "نختار حركة تناسب مستواك ونبني عليها من غير تهور."
        },

        {
            id: "supplements",
            icon: "💊",
            title: "العلاج أو المكملات",
            text:
                "ننظم المعلومات الموجودة عندك من غير ما نخترع علاج من نفسنا."
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

                            item.classList.remove(
                                "active"
                            );

                        });


                    this.classList.add("active");


                    if (selectedHabit === "sun") {

                        openSunDose();

                    }


                    else if (
                        selectedHabit === "water"
                    ) {

                        alert(
                            "💧 قسم المياه هنبدأ نبنيه بعد ما نثبت تجربة سنا الأساسية."
                        );

                    }


                    else if (
                        selectedHabit === "exercise"
                    ) {

                        alert(
                            "🏃 قسم الحركة هنبدأ نبنيه خطوة خطوة."
                        );

                    }


                    else if (
                        selectedHabit === "supplements"
                    ) {

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
        user.name || "يا صديقي";


    sunMessage.textContent =
        `تمام يا ${name} ☀️ اختيار حلو. بما إني عرفت سنك وطولك ووزنك وبلدك، هنبدأ دلوقتي نضيف درجة بشرتك ووقت التعرض وباقي العوامل المهمة، وبعدها نبني جرعة الشمس بدل ما نرمي رقم عشوائي.`;


}


/* =========================================
   الرجوع للعادات
========================================= */

if (backToHabits) {

    backToHabits.addEventListener(
        "click",
        function () {

            showPage(habits);

        }
    );

}


/* =========================================
   حماية
========================================= */

if (!startButton) {
    console.error(
        "SunDose: startButton غير موجود"
    );
}

if (!nextButton) {
    console.error(
        "SunDose: nextButton غير موجود"
    );
}

if (!habitList) {
    console.error(
        "SunDose: habitList غير موجود"
    );
}
