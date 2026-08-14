/* =========================================================
   SunDose ☀️
   النسخة الجديدة - رحلة التعارف مع سنا
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
    skin: "",
    skinLabel: "",
    sunTime: "",
    sunTimeLabel: ""

};


/* =========================================================
   عناصر الصفحات
========================================================= */

const home =
    document.getElementById("home");

const conversation =
    document.getElementById("conversation");

const review =
    document.getElementById("review");

const habits =
    document.getElementById("habits");

const sunDose =
    document.getElementById("sunDose");


const startButton =
    document.getElementById("startButton");

const nextButton =
    document.getElementById("nextButton");

const finishReview =
    document.getElementById("finishReview");

const backToHabits =
    document.getElementById("backToHabits");


const sanaText =
    document.getElementById("sanaText");

const answerArea =
    document.getElementById("answerArea");

const progressBar =
    document.getElementById("progressBar");

const reviewText =
    document.getElementById("reviewText");

const reviewCards =
    document.getElementById("reviewCards");

const habitMessage =
    document.getElementById("habitMessage");

const habitList =
    document.getElementById("habitList");

const sunMessage =
    document.getElementById("sunMessage");

const doseSkin =
    document.getElementById("doseSkin");

const doseTime =
    document.getElementById("doseTime");

const doseCountry =
    document.getElementById("doseCountry");


/* =========================================================
   الحالة
========================================================= */

let currentStep = 0;

let typingTimer = null;


/* =========================================================
   خطوات التعارف
========================================================= */

const steps = [

    {
        key: "intro",
        type: "intro"
    },

    {
        key: "name",
        type: "text",
        label: "اسمك",
        placeholder: "اكتب اسمك هنا"
    },

    {
        key: "gender",
        type: "gender"
    },

    {
        key: "age",
        type: "number",
        label: "عمرك",
        placeholder: "مثال: 22"
    },

    {
        key: "height",
        type: "number",
        label: "طولك",
        placeholder: "مثال: 175",
        unit: "سم"
    },

    {
        key: "weight",
        type: "number",
        label: "وزنك",
        placeholder: "مثال: 80",
        unit: "كجم"
    },

    {
        key: "country",
        type: "text",
        label: "بلدك",
        placeholder: "مثال: مصر"
    },

    {
        key: "skin",
        type: "skin"
    },

    {
        key: "sunTime",
        type: "time"
    }

];


/* =========================================================
   تغيير الصفحة
========================================================= */

function showPage(page){

    [
        home,
        conversation,
        review,
        habits,
        sunDose
    ].forEach(section => {

        section.classList.add("hidden");

    });

    page.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   الكتابة التدريجية
========================================================= */

function typeSana(text, speed = 42){

    return new Promise(resolve => {

        clearInterval(typingTimer);

        sanaText.innerHTML = "";

        sanaText.classList.add("typing-cursor");

        const stage =
            conversation.querySelector(".conversation-layout");

        stage.classList.add("speaking");

        let index = 0;

        typingTimer = setInterval(() => {

            sanaText.textContent =
                text.substring(0, index);

            index++;

            if(index > text.length){

                clearInterval(typingTimer);

                sanaText.classList.remove("typing-cursor");

                stage.classList.remove("speaking");

                resolve();

            }

        }, speed);

    });

}


/* =========================================================
   كتابة في المراجعة
========================================================= */

function typeReview(text, speed = 38){

    return new Promise(resolve => {

        clearInterval(typingTimer);

        reviewText.innerHTML =
            "";

        let index = 0;

        typingTimer = setInterval(() => {

            reviewText.textContent =
                text.substring(0,index);

            index++;

            if(index > text.length){

                clearInterval(typingTimer);

                resolve();

            }

        }, speed);

    });

}


/* =========================================================
   بداية التطبيق
========================================================= */

startButton.addEventListener(
    "click",
    async function(){

        currentStep = 0;

        showPage(conversation);

        await renderStep();

    }
);


/* =========================================================
   رسم المرحلة
========================================================= */

async function renderStep(){

    const step =
        steps[currentStep];


    progressBar.style.width =
        ((currentStep + 1) / steps.length * 100) + "%";


    answerArea.innerHTML = "";

    nextButton.classList.add("hidden");


    /* =====================================
       المقدمة
    ===================================== */

    if(step.type === "intro"){

        await typeSana(
            "بص بقى... أنا سنا ☀️💛. اسمي مش اختيار عشوائي خالص؛ سنا يعني الضوء واللمعة اللي بتطلع من الشمس، وده تقريبًا كل اللي أنا عايزة أساعدك تفهمه من غير تعقيد ولا كلام طبي ناشف.",
            38
        );

        await delay(500);

        await typeSana(
            "فكرة SunDose بدأت أصلًا من حاجة بسيطة جدًا... شخص كان عنده مشكلة مرتبطة بفيتامين D، وكنا بنحاول نعمل له حاجة صغيرة تفتكره بعلاجه وتهتم بعاداته. وبعدها الفكرة كبرت شوية بشوية لحد ما بقيت أنا موجودة هنا 😌☀️.",
            38
        );

        await delay(500);

        await typeSana(
            "بس قبل الشمس والمياه والرياضة والحسابات دي كلها... أنا عايزة أعرف الشخص اللي قدامي الأول. يعني بالراحة كده، نتعرف بجد مش نعمل استمارة حكومية 😂💛.",
            38
        );

        nextButton.textContent =
            "طيب نبدأ منين؟ 😌";

        nextButton.classList.remove("hidden");

        return;

    }


    /* =====================================
       الاسم
    ===================================== */

    if(step.key === "name"){

        await typeSana(
            "طيب نبدأ بحاجة بسيطة... اسمك إيه؟ عايزة أعرف أنادي الشخص اللي هكلمه طول الرحلة دي بإيه 😊",
            43
        );

        createInput(step);

        nextButton.textContent =
            "عرفتك 😌";

        nextButton.classList.remove("hidden");

        return;

    }


    /* =====================================
       النوع
    ===================================== */

    if(step.key === "gender"){

        await typeSana(
            `جميل يا ${user.name} 💛. دلوقتي عرفت اسمك، ومش هقولك "تحب أناديك بإيه؟" لأنك خلاص قلتلي اسمك 😄. محتاجة أعرف بس أخاطبك بصيغة إيه عشان كلامي معاك يبقى طبيعي ومريح.`,
            42
        );

        createGender();

        return;

    }


    /* =====================================
       العمر
    ===================================== */

    if(step.key === "age"){

        await typeSana(
            getAgeQuestion(),
            42
        );

        createInput(step);

        nextButton.textContent =
            "كمّل معايا 😌";

        nextButton.classList.remove("hidden");

        return;

    }


    /* =====================================
       الطول
    ===================================== */

    if(step.key === "height"){

        await typeSana(
            getHeightQuestion(),
            40
        );

        createInput(step);

        nextButton.textContent =
            "وريني كده 😄";

        nextButton.classList.remove("hidden");

        return;

    }


    /* =====================================
       الوزن
    ===================================== */

    if(step.key === "weight"){

        await typeSana(
            getWeightQuestion(),
            40
        );

        createInput(step);

        nextButton.textContent =
            "تمام يا نجم 💛";

        nextButton.classList.remove("hidden");

        return;

    }


    /* =====================================
       البلد
    ===================================== */

    if(step.key === "country"){

        await typeSana(
            getCountryQuestion(),
            40
        );

        createInput(step);

        nextButton.textContent =
            "عرفت بلدك 🌍";

        nextButton.classList.remove("hidden");

        return;

    }


    /* =====================================
       لون البشرة
    ===================================== */

    if(step.key === "skin"){

        await typeSana(
            getSkinIntro(),
            40
        );

        createSkin();

        return;

    }


    /* =====================================
       وقت الشمس
    ===================================== */

    if(step.key === "sunTime"){

        await typeSana(
            getTimeIntro(),
            40
        );

        createTime();

        return;

    }

}


/* =========================================================
   أسئلة ديناميكية
========================================================= */

function getAgeQuestion(){

    if(user.gender === "female"){

        return `بما إننا بقينا أصحاب يا ${user.name} 💛 قولي سنك كام؟ متقلقيش، أنا مش هحكم عليكي... بس ممكن أعمل تعليق صغير على الرقم كده 😌😂`;

    }

    return `طيب يا ${user.name} 😄 قولي سنك كام؟ عايز أعرف أنا بتعامل مع شاب لسه الدنيا قدامه ولا واحد داخل ينافسني على لقب "عم سنا" 😂.`;

}


function getHeightQuestion(){

    if(user.gender === "female"){

        return `وطولك كام يا ${user.name}؟ 🌱 الرقم ده مهم عندي عشان أفهم جسمك بشكل أفضل، ومش هعمل فيها لجنة تحكيم على الطول طبعًا... إلا لو كان الطول حلو زيادة عن اللزوم 😌💛`;

    }

    return `طيب يا ${user.name}، طولك كام؟ 😄 عايز أجمع الصورة كاملة. ولو طالع طويل هضطر أبصلك من تحت لفوق وأنا بكلمك 😂.`;

}


function getWeightQuestion(){

    if(user.gender === "female"){

        return `دلوقتي الوزن يا ${user.name} 💛. قولي الرقم براحتك، مش ميزان محكمة ولا حاجة 😄. الرقم عندي مجرد معلومة تساعدني أفهم احتياجات جسمك، مش عشان أحكم عليكي.`;

    }

    return `والوزن يا ${user.name} 😄؟ قولي الرقم زي ما هو، أنا مش ميزان بيتكسف ولا هقولك "إيه ده يا نجم" 😂. المهم أفهم جسمك عشان أتعامل معاك صح.`;

}


function getCountryQuestion(){

    if(user.gender === "female"){

        return `حلو كده يا ${user.name} 💛. آخر حاجة في الجزء ده: إنتِ من أنهي بلد؟ ودي مش معلومة هحطها في خانة وخلاص؛ الشمس والجو والعادات بتفرق جدًا من مكان لمكان، وأنا عايزة أعرف البيئة اللي عايشة فيها. 🌍`;

    }

    return `حلو يا ${user.name} 😌. قولي بقى إنت من أنهي بلد؟ وركز معايا هنا، البلد عندي مش مجرد اسم يتخزن؛ الجو والشمس ودرجة الحرارة والعادات اليومية كلها ممكن تغيّر طريقة نصيحتي ليك. 🌍☀️`;

}


function getSkinIntro(){

    if(user.gender === "female"){

        return `وصلنا لنقطة مهمة يا ${user.name} 💛. عايزة أعرف لون بشرتك التقريبي، مش عشان أصنف جمالك طبعًا... أنا متأكدة إن الموضوع محسوم من غيري 😌😂. لكن علميًا لون البشرة بيفرق في طريقة استجابة الجلد للشمس وتكوين فيتامين D.`;

    }

    return `وصلنا لحاجة مهمة يا ${user.name} ☀️. عايز أعرف لون بشرتك التقريبي. ودي مش مسابقة وسامة يا نجم 😂؛ لون البشرة فعلًا له علاقة بكمية الميلانين واستجابة الجلد للأشعة وتكوين فيتامين D.`;

}


function getTimeIntro(){

    return `باقي آخر قطعة في اللغز يا ${user.name} ☀️. بتحب أو تقدر تتعرض للشمس في أنهي وقت؟ هستخدم الوقت ده مع البلد ولون بشرتك وباقي بياناتك عشان الخطة بعد كده تبقى مبنية على سياقك، مش رقم مرمي على أي حد.`;

}


/* =========================================================
   إنشاء حقل
========================================================= */

function createInput(step){

    answerArea.innerHTML = `

        <div class="field">

            <label>
                ${step.label}
            </label>

            <input
                id="answerInput"
                type="${step.type}"
                inputmode="${step.type === "number" ? "numeric" : "text"}"
                placeholder="${step.placeholder}"
                value="${user[step.key] || ""}"
                min="${step.key === "age" ? "1" : ""}"
                max="${step.key === "age" ? "120" : ""}"
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


    input.focus();


    input.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){

                nextButton.click();

            }

        }
    );

}


/* =========================================================
   اختيار الجنس
========================================================= */

function createGender(){

    answerArea.innerHTML = `

        <div class="gender-grid">

            <button
                class="gender-btn"
                type="button"
                data-gender="male"
            >
                👨 ولد
            </button>

            <button
                class="gender-btn"
                type="button"
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
                function(){

                    user.gender =
                        this.dataset.gender;


                    document
                        .querySelectorAll(".gender-btn")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );


                    this.classList.add("active");


                    nextButton.textContent =
                        user.gender === "female"
                        ? "كملي معايا يا جميلة 💛"
                        : "كمّل معايا يا نجم 💛";


                    nextButton.classList.remove("hidden");

                }
            );

        });

}


/* =========================================================
   لون البشرة
========================================================= */

function createSkin(){

    const skins = [

        {
            id:"very-light",
            label:"فاتحة جدًا",
            note:"تحمر بسرعة",
            color:"#f8dfcf"
        },

        {
            id:"light",
            label:"فاتحة",
            note:"فاتحة وبتتأثر بالشمس",
            color:"#edc2a5"
        },

        {
            id:"medium",
            label:"متوسطة",
            note:"لون قمحي تقريبًا",
            color:"#c98e68"
        },

        {
            id:"dark",
            label:"داكنة",
            note:"ميلانين أعلى",
            color:"#805039"
        }

    ];


    answerArea.innerHTML = `

        <div class="skin-grid">

            ${
                skins.map(skin => `

                    <button
                        type="button"
                        class="skin-btn"
                        data-skin="${skin.id}"
                        data-label="${skin.label}"
                    >

                        <div
                            class="skin-color"
                            style="background:${skin.color}"
                        ></div>

                        ${skin.label}

                        <small>
                            ${skin.note}
                        </small>

                    </button>

                `).join("")
            }

        </div>

    `;


    document
        .querySelectorAll(".skin-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function(){

                    user.skin =
                        this.dataset.skin;

                    user.skinLabel =
                        this.dataset.label;


                    document
                        .querySelectorAll(".skin-btn")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );


                    this.classList.add("active");


                    nextButton.textContent =
                        "تمام، عرفتها ☀️";

                    nextButton.classList.remove("hidden");

                }
            );

        });

}


/* =========================================================
   أوقات الشمس
========================================================= */

function createTime(){

    const times = [

        {
            id:"morning",
            label:"الصبح",
            note:"بعد الشروق بفترة",
            icon:"🌤️"
        },

        {
            id:"midday",
            label:"الظهر",
            note:"منتصف اليوم",
            icon:"☀️"
        },

        {
            id:"afternoon",
            label:"العصر",
            note:"قبل الغروب بفترة",
            icon:"🌇"
        },

        {
            id:"flexible",
            label:"مش فارقة",
            note:"أنا مرن في الوقت",
            icon:"🕐"
        }

    ];


    answerArea.innerHTML = `

        <div class="time-grid">

            ${
                times.map(time => `

                    <button
                        type="button"
                        class="time-btn"
                        data-time="${time.id}"
                        data-label="${time.label}"
                    >

                        <span>
                            ${time.icon}
                        </span>

                        ${time.label}

                        <small>
                            ${time.note}
                        </small>

                    </button>

                `).join("")
            }

        </div>

    `;


    document
        .querySelectorAll(".time-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function(){

                    user.sunTime =
                        this.dataset.time;

                    user.sunTimeLabel =
                        this.dataset.label;


                    document
                        .querySelectorAll(".time-btn")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );


                    this.classList.add("active");


                    nextButton.textContent =
                        "خلاص، سنا جمعت الصورة ☀️";

                    nextButton.classList.remove("hidden");

                }
            );

        });

}


/* =========================================================
   زر التالي
========================================================= */

nextButton.addEventListener(
    "click",
    async function(){

        const step =
            steps[currentStep];


        /* المقدمة */

        if(step.type === "intro"){

            currentStep++;

            await renderStep();

            return;

        }


        /* الجنس */

        if(step.type === "gender"){

            if(!user.gender){

                alert(
                    "اختار الأول يا جميل 💛"
                );

                return;

            }

        }


        /* البشرة */

        else if(step.type === "skin"){

            if(!user.skin){

                alert(
                    "اختار لون البشرة التقريبي الأول ☀️"
                );

                return;

            }

        }


        /* الوقت */

        else if(step.type === "time"){

            if(!user.sunTime){

                alert(
                    "اختار الوقت اللي يناسبك الأول 🌤️"
                );

                return;

            }

        }


        /* باقي الحقول */

        else if(step.type === "text" || step.type === "number"){

            const input =
                document.getElementById("answerInput");


            if(!input){

                return;

            }


            const value =
                input.value.trim();


            if(!value){

                alert(
                    "اكتبلي الإجابة الأول عشان أعرف أكمل معاك 😊"
                );

                input.focus();

                return;

            }


            if(step.key === "age"){

                const age =
                    Number(value);


                if(age < 1 || age > 120){

                    alert(
                        "اكتب سن صحيح من فضلك 😊"
                    );

                    input.focus();

                    return;

                }

            }


            user[step.key] =
                value;

        }


        currentStep++;


        if(currentStep < steps.length){

            await renderStep();

        }

        else{

            await showReview();

        }

    }
);


/* =========================================================
   مراجعة البيانات
========================================================= */

async function showReview(){

    showPage(review);


    reviewCards.innerHTML = "";


    const genderText =
        user.gender === "female"
        ? "بنت"
        : "ولد";


    const cards = [

        ["الاسم",user.name],

        ["العمر",user.age + " سنة"],

        ["النوع",genderText],

        ["الطول",user.height + " سم"],

        ["الوزن",user.weight + " كجم"],

        ["البلد",user.country],

        ["البشرة",user.skinLabel],

        ["وقت الشمس",user.sunTimeLabel]

    ];


    reviewCards.innerHTML =
        cards.map(card => `

            <div class="review-card">

                <span>
                    ${card[0]}
                </span>

                <strong>
                    ${card[1]}
                </strong>

            </div>

        `).join("");


    const reviewMessage =
        buildReviewMessage();


    await typeReview(
        reviewMessage,
        36
    );


    finishReview.classList.remove(
        "hidden"
    );

}


function buildReviewMessage(){

    const age =
        Number(user.age);

    const weight =
        Number(user.weight);

    const height =
        Number(user.height);


    let agePart = "";


    if(age < 18){

        agePart =
            `وعندك ${age} سنة، يعني لسه في مرحلة جسمك فيها بيكبر وبيتغير، فمش هتعامل معاك بنفس طريقة شخص بالغ.`;

    }

    else if(age < 25){

        agePart =
            `وعندك ${age} سنة، يعني لسه في سن النشاط والحركة وبناء عادات هتفرق معاك جدًا على المدى الطويل.`;

    }

    else if(age < 40){

        agePart =
            `وعندك ${age} سنة، ودي مرحلة مهم فيها إن العادات اليومية تبقى متوازنة بدل ما نستنى الجسم يطلب اهتمامه بالعافية.`;

    }

    else{

        agePart =
            `وعندك ${age} سنة، وده يخليني أهتم أكتر بالاستمرارية وجودة العادات بدل فكرة إننا نعمل حاجة جامدة يومين ونختفي بعدها.`;

    }


    let bodyPart = "";


    if(height > 0 && weight > 0){

        const bmi =
            weight / Math.pow(height / 100,2);


        if(bmi < 18.5){

            bodyPart =
                `وطولك ${height} سم ووزنك ${weight} كجم، وده يخليني أخلي موضوع التغذية والطاقة جزء من الصورة، مش أركز على الشمس لوحدها.`;

        }

        else if(bmi < 25){

            bodyPart =
                `وطولك ${height} سم ووزنك ${weight} كجم، والأرقام دي هتساعدني أتعامل مع نشاطك واحتياجاتك اليومية بشكل أدق.`;

        }

        else if(bmi < 30){

            bodyPart =
                `وطولك ${height} سم ووزنك ${weight} كجم، وده معناه إن الحركة اليومية والنشاط هيبقوا جزء مهم من الخطة مع الشمس والمياه.`;

        }

        else{

            bodyPart =
                `وطولك ${height} سم ووزنك ${weight} كجم، وعلشان كده مش هبص للشمس كموضوع منفصل؛ النشاط والمياه والنوم والعادات اليومية كلهم داخلين في الصورة.`;

        }

    }


    const countryPart =
        `وأنت من ${user.country}، ودي معلومة مهمة فعلًا؛ لأن الجو وكمية الشمس ودرجة الحرارة ونمط الحياة مش واحدين في كل مكان.`;


    const skinPart =
        `ولون بشرتك ${user.skinLabel}، وده مهم لأن كمية الميلانين بتأثر في استجابة الجلد للأشعة وتكوين فيتامين D.`;


    const timePart =
        `وكمان أنت اخترت ${user.sunTimeLabel} كوقت مناسب ليك، فهخلي ده نقطة بداية بدل ما أفرض عليك وقت مش مناسب لحياتك.`;


    let personality = "";


    if(user.gender === "female"){

        personality =
            `وبالمناسبة يا ${user.name}... أنا خدت بالي من كل ده، مش هسيبك ترميلي شوية أرقام وأعمل نفسي آلة حاسبة 😂💛. إنتِ بقيتي بالنسبة لي صورة كاملة محتاجة خطة على مقاسها.`;

    }

    else{

        personality =
            `وبالمناسبة يا ${user.name}... أنا خدت بالي من كل ده يا نجم، مش هسيبك ترميلي شوية أرقام وأقولك تمام وخلاص 😂💛. كده أنا بدأت أفهمك فعلًا وأقدر أبني معاك حاجة على مقاسك.`;

    }


    return `
        ${agePart}
        ${bodyPart}
        ${countryPart}
        ${skinPart}
        ${timePart}
        ${personality}
    `;

}


/* =========================================================
   بعد المراجعة
========================================================= */

finishReview.addEventListener(
    "click",
    async function(){

        showPage(habits);


        const name =
            user.name;


        let opening;


        if(user.gender === "female"){

            opening =
                `خلاص يا ${name} 💛 كده أنا فعلًا عرفت عنك حاجات أكتر من مجرد اسم ورقم. دلوقتي نبدأ بقى الجزء اللي يهمك: جسمك وعاداتك اليومية، وكل حاجة هنمشي فيها واحدة واحدة ومن غير ضغط.`;

        }

        else{

            opening =
                `خلاص يا ${name} 💛 كده أنا فعلًا فهمت الصورة يا نجم. دلوقتي نبدأ الجزء اللي يهمك: جسمك وعاداتك اليومية، وكل حاجة هنمشي فيها واحدة واحدة ومن غير ما أحول حياتك لمعسكر 😂.`;

        }


        habitMessage.textContent =
            opening;


        createHabits();

    }
);


/* =========================================================
   العادات
========================================================= */

function createHabits(){

    const habits = [

        {
            id:"sun",
            icon:"☀️",
            title:"جرعة الشمس",
            text:"نبني خطة تعرض مناسبة لبياناتك ومكانك."
        },

        {
            id:"water",
            icon:"💧",
            title:"المياه",
            text:"نحسب احتياجك التقريبي وننظمه خلال اليوم."
        },

        {
            id:"exercise",
            icon:"🏃",
            title:"الحركة",
            text:"نشوف مستوى نشاط يناسب جسمك وحياتك."
        },

        {
            id:"supplements",
            icon:"💊",
            title:"العلاج والمكملات",
            text:"نرتب المعلومات بدون اقتراح علاج من نفسنا."
        }

    ];


    habitList.innerHTML =
        habits.map(habit => `

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
                function(){

                    const selected =
                        this.dataset.habit;


                    document
                        .querySelectorAll(".habit")
                        .forEach(item =>
                            item.classList.remove("active")
                        );


                    this.classList.add("active");


                    if(selected === "sun"){

                        openSunDose();

                    }

                    else if(selected === "water"){

                        alert(
                            "💧 قسم المياه جاهز للخطوة الجاية. هنستخدم الوزن والنشاط والجو بدل رقم ثابت لكل الناس."
                        );

                    }

                    else if(selected === "exercise"){

                        alert(
                            "🏃 قسم الحركة هنربطه بالعمر والوزن ومستوى النشاط في المرحلة الجاية."
                        );

                    }

                    else if(selected === "supplements"){

                        alert(
                            "💊 القسم ده هيكون للمعلومات والتنظيم فقط، وأي علاج أو مكمل لازم يبقى مبني على احتياج حقيقي أو توجيه طبي."
                        );

                    }

                }
            );

        });

}


/* =========================================================
   جرعة الشمس
========================================================= */

async function openSunDose(){

    showPage(sunDose);


    doseSkin.textContent =
        user.skinLabel || "—";


    doseTime.textContent =
        user.sunTimeLabel || "—";


    doseCountry.textContent =
        user.country || "—";


    const name =
        user.name;


    let message;


    if(user.gender === "female"){

        message =
            `وصلنا يا ${name} ☀️💛. هنا بقى هنبدأ نحول كل اللي عرفته عنك لخطة شمس شخصية. عندي سنك، طولك، وزنك، بلدك، لون بشرتك والوقت اللي يناسبك. مش هديكي رقم عشوائي؛ هنطوّر الجزء ده خطوة بخطوة عشان سنا تبقى فعلًا فاهمة جسمك والبيئة اللي حواليكي.`;

    }

    else{

        message =
            `وصلنا يا ${name} ☀️💛. هنا بقى هنبدأ نحول كل اللي عرفته عنك لخطة شمس شخصية. عندي سنك، طولك، وزنك، بلدك، لون بشرتك والوقت اللي يناسبك. مش هديك رقم عشوائي يا نجم؛ هنطوّر الجزء ده خطوة بخطوة عشان سنا تبقى فعلًا فاهمة جسمك والبيئة اللي حواليك.`;

    }


    await typeSunMessage(
        message,
        38
    );

}


/* =========================================================
   كتابة رسالة الشمس
========================================================= */

function typeSunMessage(text,speed){

    return new Promise(resolve => {

        let index = 0;

        sunMessage.textContent = "";

        const timer =
            setInterval(() => {

                sunMessage.textContent =
                    text.substring(0,index);

                index++;

                if(index > text.length){

                    clearInterval(timer);

                    resolve();

                }

            },speed);

    });

}


/* =========================================================
   الرجوع للعادات
========================================================= */

backToHabits.addEventListener(
    "click",
    function(){

        showPage(habits);

    }
);


/* =========================================================
   تأخير
========================================================= */

function delay(ms){

    return new Promise(
        resolve => setTimeout(resolve,ms)
    );

}


/* =========================================================
   تشغيل أولي
========================================================= */

console.log(
    "SunDose ☀️ loaded successfully"
);
