/* =========================================
   SunDose ☀️
   سنا - النسخة الحوارية
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

    skin: "",
    sunTime: ""

};


/* =========================================
   عناصر الصفحات
========================================= */

const pages = {

    home: document.getElementById("home"),
    welcome: document.getElementById("welcome"),
    summary: document.getElementById("summary"),
    habits: document.getElementById("habits"),
    sunDose: document.getElementById("sunDose")

};


const startButton =
    document.getElementById("startButton");

const nextButton =
    document.getElementById("nextButton");

const goToHabits =
    document.getElementById("goToHabits");

const sunNext =
    document.getElementById("sunNext");

const question =
    document.getElementById("question");

const answerArea =
    document.getElementById("answerArea");

const progressBar =
    document.getElementById("progressBar");

const summaryText =
    document.getElementById("summaryText");

const summaryCard =
    document.getElementById("summaryCard");

const habitMessage =
    document.getElementById("habitMessage");

const habitList =
    document.getElementById("habitList");

const sunMessage =
    document.getElementById("sunMessage");

const sunStepArea =
    document.getElementById("sunStepArea");

const chatSana =
    document.getElementById("chatSana");

const summarySana =
    document.getElementById("summarySana");

const habitsSana =
    document.getElementById("habitsSana");

const sunSana =
    document.getElementById("sunSana");


/* =========================================
   خطوات التعارف
========================================= */

const steps = [

    {
        key: "name",
        type: "text",
        question:
            "نبدأ بحاجة بسيطة كده... تحب أناديك بإيه؟ 😊",
        label: "اسمك",
        placeholder: "اكتب اسمك هنا"
    },

    {
        key: "gender",
        type: "gender",
        question:
            "حلو الاسم ده 👀 طيب قولي أكلمك بصيغة ولد ولا بنت؟ عشان سنا تعرف تدلعك صح 😌💛"
    },

    {
        key: "age",
        type: "number",
        question:
            "طب كام سنة بقى؟ ومتقلقش... السن عندي مش رقم، ده بيفرق في طريقة كلامي معاك وفهمي لاحتياجاتك 😉",
        label: "العمر",
        placeholder: "مثال: 22",
        unit: "سنة"
    },

    {
        key: "weight",
        type: "number",
        question:
            "تعالى بقى للوزن... قولي الرقم زي ما هو، من غير كسوف 😄 أنا هنا أفهمك مش أحكم عليك.",
        label: "الوزن",
        placeholder: "مثال: 80",
        unit: "كجم"
    },

    {
        key: "height",
        type: "number",
        question:
            "والطول يا طويل/ة القامة 😌 كام سنتي؟ عايزة أشوف الصورة كاملة مش رقم لوحده.",
        label: "الطول",
        placeholder: "مثال: 175",
        unit: "سم"
    },

    {
        key: "country",
        type: "text",
        question:
            "آخر حاجة في التعارف... إنت عايش في أنهي بلد؟ 🌍 المكان بيفرق معايا فعلًا، خصوصًا لما نتكلم عن الشمس والجو والعادات.",
        label: "البلد",
        placeholder: "مثال: مصر"
    }

];


let currentStep = 0;


/* =========================================
   إظهار صفحة
========================================= */

function showPage(page) {

    Object.values(pages).forEach(section => {

        section.classList.add("hidden");

    });

    page.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   الكتابة البطيئة
========================================= */

let typingTimer = null;

function typeText(element, text, speed = 45) {

    return new Promise(resolve => {

        clearInterval(typingTimer);

        element.textContent = "";
        element.classList.add("typing-cursor");

        let index = 0;

        typingTimer = setInterval(() => {

            element.textContent =
                text.slice(0, index + 1);

            index++;

            if (index >= text.length) {

                clearInterval(typingTimer);

                element.classList.remove("typing-cursor");

                resolve();

            }

        }, speed);

    });

}


/* =========================================
   حركة سنا أثناء الكلام
========================================= */

function talkingSana(element) {

    if (!element) return;

    element.classList.remove(
        "thinking",
        "happy",
        "excited"
    );

    element.classList.add("sana-chat");

}


function thinkingSana(element) {

    if (!element) return;

    element.classList.remove(
        "happy",
        "excited"
    );

    element.classList.add("thinking");

}


function happySana(element) {

    if (!element) return;

    element.classList.remove(
        "thinking",
        "excited"
    );

    element.classList.add("happy");

}


function excitedSana(element) {

    if (!element) return;

    element.classList.remove(
        "thinking",
        "happy"
    );

    element.classList.add("excited");

}


/* =========================================
   بدء التعارف
========================================= */

startButton.addEventListener("click", async function () {

    currentStep = 0;

    showPage(pages.welcome);

    renderStep();

});


/* =========================================
   عرض السؤال
========================================= */

async function renderStep() {

    const step = steps[currentStep];

    const progress =
        ((currentStep + 1) / steps.length) * 100;

    progressBar.style.width =
        progress + "%";

    answerArea.innerHTML = "";

    nextButton.disabled = true;

    talkingSana(chatSana);

    await typeText(
        question,
        step.question,
        48
    );

    renderAnswer(step);

    nextButton.disabled = false;

}


/* =========================================
   رسم الإجابة
========================================= */

function renderAnswer(step) {

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
                            .forEach(btn =>
                                btn.classList.remove("active")
                            );

                        this.classList.add("active");

                        excitedSana(chatSana);

                    }
                );

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
                min="${step.type === "number" ? "1" : ""}"
            >

            ${
                step.unit
                    ? `<div class="unit">${step.unit}</div>`
                    : ""
            }

        </div>

    `;


    const input =
        document.getElementById("answerInput");


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


/* =========================================
   رد سنا بعد كل إجابة
========================================= */

function getResponse(step) {

    const name =
        user.name || "يا جميل";


    /* الاسم */

    if (step.key === "name") {

        if (user.gender === "female") {

            return `
                اسمك ${user.name}؟ يا سلام 😌💛
                خلاص كده الاسم دخل عندي رسمي.
                من هنا ورايح هكلمك باسمك عشان أحس إننا بنتكلم بجد، مش بعمل فورم تسجيل وخلاص.
            `;

        }

        return `
            ${user.name}؟ حلو الاسم يا ${user.name} 😌💛
            خلاص كده حفظته، ومش هفضل أقولك يا نجم ويا صاحبي كل شوية.
            من هنا ورايح إنت ${user.name} وخلاص.
        `;

    }


    /* النوع */

    if (step.key === "gender") {

        if (user.gender === "female") {

            return `
                تمام يا ${name} 💛
                كده عرفت أكلمك بالطريقة اللي تليق بيكي.
                وبصراحة اختيارك خلّى سنا تاخد بالها أكتر من طريقة الكلام معاكي 😌
            `;

        }

        return `
            تمام يا ${name} 💛
            كده عرفت إن قدامي راجل.
            خلاص هات بقى اللي عندك، وسنا هتفضل مركزة معاك في كل تفصيلة 😌
        `;

    }


    /* العمر */

    if (step.key === "age") {

        const age = Number(user.age);

        if (age < 18) {

            return `
                ${name}، ${age} سنة؟ 😄
                لسه بدري عليك يا بطل، وده معناه إن تركيزي معاك هيبقى على العادات الصحية الآمنة والنمو والنشاط،
                ومش هتعامل معاك كأنك شخص كبير وخلاص.
            `;

        }

        if (age <= 24) {

            return `
                ${name}، ${age} سنة... شباب لسه في عزّه 😌
                السن ده مهم جدًا لأن جسمك غالبًا لسه قدامه مساحة كبيرة تتحسن فيها اللياقة والعادات والنوم والحركة.
                فمش هدفي أخليك تعمل حاجة قاسية؛ هدفي نخلي جسمك ياخد حقه من غير تعقيد.
            `;

        }

        if (age <= 39) {

            return `
                ${name}، ${age} سنة.
                كده دخلنا مرحلة الجسم فيها بيحب النظام أكتر من العشوائية 😄
                نومك، حركتك، أكلك وتعرضك للشمس كلهم بيفرقوا، وأنا هربطهم ببعض بدل ما أديك نصايح منفصلة.
            `;

        }

        return `
            ${name}، ${age} سنة؟
            جميل... هنا الخبرة بقى 😌
            وكل ما السن يزيد، التفاصيل الصغيرة في النوم والحركة والتغذية والتعرض للشمس بتبقى أهم،
            فهخلي كلامي معاك محسوب ومناسب لمرحلتك.
        `;

    }


    /* الوزن */

    if (step.key === "weight") {

        const weight = Number(user.weight);

        if (weight < 50) {

            return `
                تمام يا ${name}، سجلت ${weight} كجم.
                الرقم لوحده عمره ما يكفي نحكم على الجسم، وخصوصًا من غير الطول والعمر.
                استنى عليا لما أجمع الصورة كاملة وبعدها أقولك اللي يهمك فعلًا 😉
            `;

        }

        if (weight < 90) {

            return `
                تمام يا ${name}، ${weight} كجم اتسجلوا.
                بس مش هطلعلك حكم سريع من رقم واحد، لأن الوزن من غير الطول والعمر ميدينيش الصورة الحقيقية.
                فاضل عندي كام تفصيلة وأربطهم ببعض.
            `;

        }

        return `
            ${name}، ${weight} كجم.
            وصلتني المعلومة، ومش هعمل فيها دكتور وأحكم عليك من الوزن لوحده 😄
            الطول والسن هيخلوني أفهم الصورة أحسن بكتير، وساعتها أقولك الكلام المفيد فعلًا.
        `;

    }


    /* الطول */

    if (step.key === "height") {

        const height = Number(user.height);
        const weight = Number(user.weight);
        const age = Number(user.age);

        let bmi = null;

        if (height > 0 && weight > 0) {

            bmi =
                weight /
                Math.pow(height / 100, 2);

        }


        if (bmi) {

            let assessment = "";

            if (bmi < 18.5) {
                assessment =
                    "الرقم المبدئي عندي منخفض نسبيًا";
            }
            else if (bmi < 25) {
                assessment =
                    "الرقم المبدئي داخل النطاق المعتاد";
            }
            else if (bmi < 30) {
                assessment =
                    "الرقم المبدئي أعلى من النطاق المعتاد";
            }
            else {
                assessment =
                    "الرقم المبدئي مرتفع ويستحق اهتمام";
            }


            return `
                حلو يا ${name}، كده الصورة بدأت تبان 👀
                طولك ${height} سم ووزنك ${weight} كجم، وعند سن ${age} سنة.
                بالحساب المبدئي مؤشر كتلة الجسم حوالي ${bmi.toFixed(1)}،
                وده معناه إن ${assessment}.
                بس خليك فاكر: BMI مؤشر مبدئي مش تشخيص، وأنا مش هختزلك في رقم واحد 💛
            `;

        }


        return `
            تمام يا ${name}، طولك ${height} سم اتسجل.
            كده بقيت أعرف عن جسمك تفاصيل أكتر، وآخر قطعة في الصورة هتبقى البلد.
        `;

    }


    /* البلد */

    if (step.key === "country") {

        const country =
            user.country.trim().toLowerCase();

        if (
            country.includes("مصر") ||
            country.includes("egypt")
        ) {

            return `
                مصر؟ 🇪🇬
                كده الموضوع بقى له طعم تاني 😄
                الشمس عندنا قوية أغلب السنة، والحرارة والرطوبة ووقت الخروج كلهم ممكن يغيروا تجربة التعرض للشمس.
                عشان كده مش هقولك رقم محفوظ من على النت؛ هراعي المكان والوقت ونوع بشرتك لما نوصل لجرعة الشمس.
                وكده أنا بدأت أفهم ${name} مش مجرد أجمع بياناته 💛
            `;

        }


        if (
            country.includes("المغرب") ||
            country.includes("morocco")
        ) {

            return `
                المغرب 🇲🇦؟
                جميل يا ${name} 😌
                الموقع والمناخ واختلاف الفصول هناك مهمين جدًا لما نتكلم عن الشمس،
                وعشان كده البلد عندي مش خانة بنحط فيها كلمتين وخلاص.
                هستخدمها كجزء من الصورة لما نحسب جرعتك.
            `;

        }


        if (
            country.includes("السعود") ||
            country.includes("saudi")
        ) {

            return `
                السعودية 🇸🇦
                وصلت يا ${name} 💛
                الحرارة وقوة الشمس ووقت اليوم عوامل مهمة جدًا هناك،
                فاختيار وقت التعرض هيبقى له وزن كبير عندنا.
                وأنا هربط ده ببياناتك بدل ما أديك توصية عامة لكل الناس.
            `;

        }


        return `
            ${country} 🌍
            وصلت يا ${name}.
            حلو إنك قلتلي المكان، لأن البلد والمناخ والموقع الجغرافي ممكن يغيروا طريقة تعاملنا مع الشمس.
            مش هفترض إن كل البلاد زي بعض؛ هنخلي المكان جزء أساسي من الحساب.
        `;

    }


    return `
        تمام يا ${name} 💛
        سنا سجلت المعلومة وبتربطها بباقي الصورة.
    `;

}


/* =========================================
   التالي
========================================= */

nextButton.addEventListener(
    "click",
    async function () {

        const step =
            steps[currentStep];


        /* النوع */

        if (step.type === "gender") {

            if (!user.gender) {

                await typeText(
                    question,
                    "استنى بس 😄 اختارلي الأول ولد ولا بنت عشان أعرف أكلمك بالطريقة الصح 💛",
                    45
                );

                return;

            }

        }


        /* باقي الأسئلة */

        else {

            const input =
                document.getElementById("answerInput");


            if (!input) return;


            const value =
                input.value.trim();


            if (!value) {

                await typeText(
                    question,
                    "اكتبلي الإجابة الأول يا جميل، وأنا مستنياك 😊",
                    45
                );

                input.focus();

                return;

            }


            if (
                step.type === "number" &&
                Number(value) <= 0
            ) {

                await typeText(
                    question,
                    "مممم الرقم ده مش منطقي 😄 جرب تكتبهولي بشكل صحيح.",
                    45
                );

                input.focus();

                return;

            }


            user[step.key] = value;

        }


        /* عرض رد سنا */

        nextButton.disabled = true;

        thinkingSana(chatSana);

        const response =
            getResponse(step);

        await typeText(
            question,
            response,
            38
        );


        happySana(chatSana);


        /* زر جديد */

        await new Promise(resolve =>
            setTimeout(resolve, 650)
        );


        currentStep++;


        if (currentStep < steps.length) {

            renderStep();

        }

        else {

            showSummary();

        }

    }
);


/* =========================================
   مراجعة كل البيانات
========================================= */

async function showSummary() {

    showPage(pages.summary);

    thinkingSana(summarySana);

    const name =
        user.name;

    const age =
        Number(user.age);

    const weight =
        Number(user.weight);

    const height =
        Number(user.height);


    let bmi =
        weight /
        Math.pow(height / 100, 2);


    let bodyComment = "";


    if (bmi < 18.5) {

        bodyComment =
            "مؤشر الوزن بالنسبة للطول منخفض نسبيًا";

    }
    else if (bmi < 25) {

        bodyComment =
            "مؤشر الوزن بالنسبة للطول داخل النطاق المعتاد";

    }
    else if (bmi < 30) {

        bodyComment =
            "مؤشر الوزن بالنسبة للطول أعلى من النطاق المعتاد";

    }
    else {

        bodyComment =
            "مؤشر الوزن بالنسبة للطول مرتفع ويستحق اهتمام";

    }


    const intro =
        user.gender === "female"

            ? `
                خلاص يا ${name} 💛
                دلوقتي أقدر أقول إني بدأت أعرفك بجد.
                عندي سنك، وطولك، ووزنك، وبلدك، وعرفت كمان الطريقة اللي تحبي سنا تكلمك بيها.
                `

            : `
                خلاص يا ${name} 💛
                كده الصورة بدأت تكتمل عندي.
                عرفت سنك، وطولك، ووزنك، وبلدك، وعرفت كمان الطريقة اللي تحب سنا تكلمك بيها.
                `;


    await typeText(
        summaryText,
        intro,
        34
    );


    summaryCard.innerHTML = `

        <div class="summary-row">
            <span class="summary-label">الاسم</span>
            <span class="summary-value">${user.name}</span>
        </div>

        <div class="summary-row">
            <span class="summary-label">العمر</span>
            <span class="summary-value">${user.age} سنة</span>
        </div>

        <div class="summary-row">
            <span class="summary-label">الطول</span>
            <span class="summary-value">${user.height} سم</span>
        </div>

        <div class="summary-row">
            <span class="summary-label">الوزن</span>
            <span class="summary-value">${user.weight} كجم</span>
        </div>

        <div class="summary-row">
            <span class="summary-label">البلد</span>
            <span class="summary-value">${user.country}</span>
        </div>

        <div class="summary-row">
            <span class="summary-label">BMI مبدئي</span>
            <span class="summary-value">${bmi.toFixed(1)}</span>
        </div>

    `;


    const finalComment = `
        وبالمناسبة، ${bodyComment}.
        ده مؤشر مبدئي مش تشخيص طبي، وأنا مش هختزلك في رقم.
        اللي جاي أهم: هنستخدم البيانات دي عشان نخلي SunDose يتعامل معاك بشكل شخصي فعلًا.
    `;


    await new Promise(resolve =>
        setTimeout(resolve, 400)
    );


    await typeText(
        summaryText,
        intro + "\n\n" + finalComment,
        32
    );


    happySana(summarySana);

}


/* =========================================
   الذهاب للعادات
========================================= */

goToHabits.addEventListener(
    "click",
    function () {

        showHabits();

    }
);


/* =========================================
   صفحة العادات
========================================= */

function showHabits() {

    showPage(pages.habits);

    talkingSana(habitsSana);

    const name =
        user.name;


    habitMessage.textContent = "";


    typeText(
        habitMessage,
        `تمام يا ${name} 💛 كده بقى عندنا صورة حقيقية عنك. دلوقتي اختار أول حاجة نفسك نشتغل عليها، وسنا مش هترمي عليك معلومات وخلاص؛ هنمشي فيها واحدة واحدة.`,
        35
    );


    const habits = [

        {
            id: "sun",
            icon: "☀️",
            title: "جرعة الشمس",
            description:
                "نحدد وقت وطريقة تعرض مناسبة ليك."
        },

        {
            id: "water",
            icon: "💧",
            title: "شرب المياه",
            description:
                "نظبط الترطيب حسب يومك ونشاطك."
        },

        {
            id: "exercise",
            icon: "🏃",
            title: "الحركة",
            description:
                "نختار نشاط مناسب ونبنيه تدريجيًا."
        },

        {
            id: "supplements",
            icon: "💊",
            title: "المكملات",
            description:
                "نفهم إمتى تكون مفيدة وإمتى لأ."
        }

    ];


    habitList.innerHTML =
        habits.map(habit => `

            <div
                class="habit"
                data-habit="${habit.id}"
            >

                <div class="habit-icon">
                    ${habit.icon}
                </div>

                <span class="habit-title">
                    ${habit.title}
                </span>

                <p class="habit-description">
                    ${habit.description}
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
                        .forEach(item =>
                            item.classList.remove("active")
                        );


                    this.classList.add("active");


                    if (selected === "sun") {

                        openSunDose();

                    }

                    else if (selected === "water") {

                        typeText(
                            habitMessage,
                            `المياه اختيار حلو يا ${name} 💧 بس نخليها بعد جرعة الشمس، عشان نبني التطبيق جزء جزء بدل ما نرمي عليك كل حاجة مرة واحدة.`,
                            35
                        );

                    }

                    else if (selected === "exercise") {

                        typeText(
                            habitMessage,
                            `الحركة مهمة جدًا يا ${name} 🏃 وهنخليها مبنية على مستواك الحقيقي، مش نصيحة عامة من نوع "اتحرك وخلاص" 😄`,
                            35
                        );

                    }

                    else {

                        typeText(
                            habitMessage,
                            `المكملات مش لعبة يا ${name} 💊، وعلشان كده القسم ده هنخليه مبني على الاحتياج والمعلومات الموثوقة، مش مجرد أسماء منتجات.`,
                            35
                        );

                    }

                }
            );

        });

}


/* =========================================
   جرعة الشمس
========================================= */

let sunStep = 0;


/* =========================================
   فتح جرعة الشمس
========================================= */

function openSunDose() {

    showPage(pages.sunDose);

    sunStep = 0;

    talkingSana(sunSana);

    renderSunStep();

}


/* =========================================
   مراحل جرعة الشمس
========================================= */

async function renderSunStep() {

    sunNext.disabled = true;

    thinkingSana(sunSana);


    if (sunStep === 0) {

        await typeText(
            sunMessage,
            `تمام يا ${user.name} ☀️ دخلنا بقى في الجزء اللي كنت مستنيه. قبل ما أقولك أي وقت أو مدة، لازم أعرف لون بشرتك الأول، لأن البشرة مش كلها بتتعامل مع الشمس بنفس الطريقة.`,
            35
        );


        sunStepArea.innerHTML = `

            <div class="sun-choice-title">
                أقرب درجة لبشرتك إيه؟
            </div>

            <div class="skin-grid">

                <button class="skin-btn" data-skin="very-light">
                    <div
                        class="skin-color"
                        style="background:#f6d2b5"
                    ></div>
                    <span class="skin-name">فاتحة جدًا</span>
                </button>

                <button class="skin-btn" data-skin="light">
                    <div
                        class="skin-color"
                        style="background:#e9b990"
                    ></div>
                    <span class="skin-name">فاتحة</span>
                </button>

                <button class="skin-btn" data-skin="medium">
                    <div
                        class="skin-color"
                        style="background:#c98d62"
                    ></div>
                    <span class="skin-name">متوسطة</span>
                </button>

                <button class="skin-btn" data-skin="tan">
                    <div
                        class="skin-color"
                        style="background:#9a633f"
                    ></div>
                    <span class="skin-name">سمراء فاتحة</span>
                </button>

                <button class="skin-btn" data-skin="brown">
                    <div
                        class="skin-color"
                        style="background:#70442d"
                    ></div>
                    <span class="skin-name">بنية</span>
                </button>

                <button class="skin-btn" data-skin="dark">
                    <div
                        class="skin-color"
                        style="background:#43281f"
                    ></div>
                    <span class="skin-name">داكنة</span>
                </button>

            </div>

        `;


        bindSkinButtons();

    }


    else if (sunStep === 1) {

        await typeText(
            sunMessage,
            `حلو يا ${user.name} 💛 دلوقتي قولي بتحب تتعرض للشمس إمتى غالبًا؟ مش لازم يكون الوقت المثالي؛ قولي الوقت اللي فعلًا تقدر تلتزم بيه.`,
            35
        );


        sunStepArea.innerHTML = `

            <div class="sun-choice-title">
                وقت التعرض المفضل
            </div>

            <div class="time-grid">

                <button class="time-btn" data-time="morning">
                    🌅 الصبح
                </button>

                <button class="time-btn" data-time="midday">
                    ☀️ منتصف اليوم
                </button>

                <button class="time-btn" data-time="afternoon">
                    🌤️ بعد الظهر
                </button>

                <button class="time-btn" data-time="flexible">
                    🕐 مش فارقة
                </button>

            </div>

        `;


        bindTimeButtons();

    }


    else {

        await showSunResult();

        return;

    }


    sunNext.disabled = false;

}


/* =========================================
   اختيار البشرة
========================================= */

function bindSkinButtons() {

    document
        .querySelectorAll(".skin-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                async function () {

                    user.skin =
                        this.dataset.skin;


                    document
                        .querySelectorAll(".skin-btn")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );


                    this.classList.add("active");

                    excitedSana(sunSana);


                    await typeText(
                        sunMessage,
                        getSkinComment(),
                        34
                    );

                }
            );

        });

}


function getSkinComment() {

    const comments = {

        "very-light":
            `آه، بشرتك فاتحة جدًا يا ${user.name} 😌 يبقى لازم ناخد موضوع مدة التعرض بجدية، لأن الاحمرار والحرق ممكن يحصلوا أسرع.`,

        "light":
            `تمام يا ${user.name} 💛 بشرتك فاتحة، وده معناه إننا هنوازن بين الاستفادة من الشمس وبين إننا مانسيبش الجلد يتعرض زيادة عن اللزوم.`,

        "medium":
            `بشرة متوسطة؟ تمام يا ${user.name} 😌 كده عندنا توازن مختلف شوية، وبرضه الوقت والمكان وقوة الشمس هيفرقوا.`,

        "tan":
            `سمراء فاتحة؟ جميل يا ${user.name} 💛 لون البشرة عامل مهم، بس مش العامل الوحيد؛ المكان والوقت وقوة الشمس لسه لهم كلمة.`,

        "brown":
            `بشرة بنية يا ${user.name} ☀️ وصلت. لون البشرة بيأثر في استجابة الجلد للأشعة، وعلشان كده مش هنستخدم نفس التوصية للجميع.`,

        "dark":
            `تمام يا ${user.name} 💛 بشرتك داكنة، وده من العوامل اللي لازم تدخل في تقدير التعرض للشمس، لكن برضه مش هنسلّم كل الحساب للون البشرة وحده.`

    };


    return comments[user.skin];

}


/* =========================================
   اختيار الوقت
========================================= */

function bindTimeButtons() {

    document
        .querySelectorAll(".time-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    user.sunTime =
                        this.dataset.time;


                    document
                        .querySelectorAll(".time-btn")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );


                    this.classList.add("active");

                    excitedSana(sunSana);

                }
            );

        });

}


/* =========================================
   زر جرعة الشمس
========================================= */

sunNext.addEventListener(
    "click",
    async function () {

        if (sunStep === 0 && !user.skin) {

            await typeText(
                sunMessage,
                `اختارلي درجة بشرتك الأول يا ${user.name} 😄 عشان سنا متطلعش لك بتوصية من عندها.`,
                40
            );

            return;

        }


        if (sunStep === 1 && !user.sunTime) {

            await typeText(
                sunMessage,
                `اختار الوقت اللي يناسبك الأول يا ${user.name} ☀️ وأنا أكمل معاك.`,
                40
            );

            return;

        }


        sunStep++;

        renderSunStep();

    }
);


/* =========================================
   نتيجة جرعة الشمس
========================================= */

async function showSunResult() {

    thinkingSana(sunSana);

    sunStepArea.innerHTML = "";

    const country =
        user.country.toLowerCase();


    let locationText =
        "بلدك";

    if (
        country.includes("مصر") ||
        country.includes("egypt")
    ) {

        locationText =
            "مصر";

    }
    else if (
        country.includes("المغرب") ||
        country.includes("morocco")
    ) {

        locationText =
            "المغرب";

    }
    else if (
        country.includes("السعود") ||
        country.includes("saudi")
    ) {

        locationText =
            "السعودية";

    }


    await typeText(
        sunMessage,
        `كده يا ${user.name} عندي أهم البيانات: عمرك ${user.age} سنة، طولك ${user.height} سم، وزنك ${user.weight} كجم، بشرتك ${getSkinArabic()}، وبتفضل ${getTimeArabic()}، وعايش في ${locationText}. دلوقتي أقدر أقولك حاجة أهم: مفيش رقم سحري ثابت لكل الناس، لأن مؤشر الأشعة والطقس ومساحة الجلد المكشوفة ودرجة البشرة والوقت كلها بتفرق.`,
        30
    );


    sunStepArea.innerHTML = `

        <div class="result-card">

            <div class="result-number">
                ☀️
            </div>

            <strong>
                ملف جرعة الشمس اتجهز
            </strong>

            <div class="result-note">
                الخطوة دي جهزت بياناتك الأساسية.
                في النسخة التالية هنربطها ببيانات الطقس
                ومؤشر الأشعة فوق البنفسجية والموقع الفعلي،
                وبعدها نطلع توصية أكثر تخصيصًا بدل رقم عشوائي.
            </div>

        </div>

    `;


    sunNext.textContent =
        "رجوع للعادات 💛";

    sunNext.onclick = function () {

        sunNext.onclick = null;

        sunNext.textContent =
            "نكمل ☀️";

        showHabits();

    };


    happySana(sunSana);

}


/* =========================================
   تحويل البشرة للعربي
========================================= */

function getSkinArabic() {

    const map = {

        "very-light": "فاتحة جدًا",
        "light": "فاتحة",
        "medium": "متوسطة",
        "tan": "سمراء فاتحة",
        "brown": "بنية",
        "dark": "داكنة"

    };

    return map[user.skin] || "غير محددة";

}


/* =========================================
   تحويل الوقت للعربي
========================================= */

function getTimeArabic() {

    const map = {

        morning: "الصبح",
        midday: "منتصف اليوم",
        afternoon: "بعد الظهر",
        flexible: "وقت مرن"

    };

    return map[user.sunTime] || "وقت غير محدد";

    }
