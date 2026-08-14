/* =========================================
   SunDose ☀️
   Sana Conversation Engine
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
    country: ""

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

const nextButton =
    document.getElementById("nextButton");

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
   الحالة
========================================= */

let currentStep = 0;

let waitingForContinue = false;


/* =========================================
   خطوات التعارف
========================================= */

const steps = [

    {
        key: "name",

        question:
            "قبل ما نبدأ... تحب أناديك بإيه؟ 😊",

        type: "text",

        label: "اسمك",

        placeholder:
            "اكتب اسمك هنا"

    },


    {
        key: "gender",

        question:
            "جميل! طيب أكلّمك بصيغة إيه عشان كلامنا يبقى مريح ولطيف ليك؟ 💛",

        type: "gender"

    },


    {
        key: "age",

        question:
            "طب قولي سنك كام؟ 👀 متقلقش، أنا مش هحكم عليك... أنا بس عايزة أعرفك أكتر.",

        type: "number",

        label: "السن",

        placeholder:
            "مثال: 22",

        unit: "سنة"

    },


    {
        key: "weight",

        question:
            "طيب وزنك كام تقريبًا؟ 😄 الرقم لوحده مش هيحكيلي كل حاجة، بس لما أربطه بباقي بياناتك هيفيدني.",

        type: "number",

        label: "الوزن",

        placeholder:
            "مثال: 80",

        unit: "كجم"

    },


    {
        key: "height",

        question:
            "وطولك كام؟ 🌱 كده الأرقام بدأت تتكلم معايا أكتر.",

        type: "number",

        label: "الطول",

        placeholder:
            "مثال: 175",

        unit: "سم"

    },


    {
        key: "country",

        question:
            "وآخر حاجة في التعارف... إنت من أنهي بلد؟ 🌍 البلد هتفرق معايا خصوصًا لما نتكلم عن الشمس والجو.",

        type: "text",

        label: "البلد",

        placeholder:
            "مثال: مصر"

    }

];


/* =========================================
   إظهار صفحة
========================================= */

function showPage(page){

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
   اسم لطيف
========================================= */

function getName(){

    if(user.name){

        return user.name;

    }

    if(user.gender === "female"){

        return "يا جميلة";

    }

    return "يا صاحبي";

}


/* =========================================
   رد سنا
========================================= */

function getResponse(step, value){

    const name =
        user.name || "يا صاحبي";


    /* الاسم */

    if(step.key === "name"){

        if(user.gender === "female"){

            return `
                حلو أوي يا ${value} 💛
                الاسم عاجبني من أولها 😄
                خلاص كده ثبتّه عندي، ومن هنا ورايح
                هكلمك باسمك بدل ما أفضل أقول يا جميلة وخلاص.
            `;

        }


        return `
            حلو أوي يا ${value} 😄
            كده بقى عرفت أناديك بإيه بدل ما أفضل أقول يا صاحبي.
            الاسم اتسجل عندي يا نجم 💛
        `;

    }


    /* النوع */

    if(step.key === "gender"){

        if(value === "female"){

            return `
                تمام يا ${name} 💛
                كده عرفت أكلمك بالطريقة اللي تريحك.
                وخلاص من هنا الكلام بينا هيبقى على راحتنا،
                من غير رسمية ولا كلام كتب 😄
            `;

        }


        return `
            تمام يا ${name} يا نجم 😄
            كده عرفت أكلمك بصيغة مناسبة ليك.
            خلاص من هنا بقى الكلام بينا على راحتنا،
            ومش هنعملها مقابلة شغل 😂💛
        `;

    }


    /* العمر */

    if(step.key === "age"){

        const age =
            Number(value);


        if(age < 18){

            return `
                يا ${name} 😄
                ${age} سنة؟
                تمام، كده عرفت إنك لسه صغير،
                وده مهم جدًا عندي لأن طريقة النصائح
                والاحتياطات هتختلف عن شخص بالغ.
                سلامتك أهم من أي رقم أو عادة 💛
            `;

        }


        if(age <= 25){

            return `
                يا ${name} 😄
                ${age} سنة؟
                يا سلام، لسه قدامك وقت حلو جدًا
                تبني فيه عادات تفضل معاك سنين.
                في المرحلة دي مش محتاج تعمل حاجات
                قاسية ولا تعقد الدنيا...
                محتاج أساس كويس تقدر تكمل عليه.
            `;

        }


        if(age <= 39){

            return `
                تمام يا ${name} 👀
                ${age} سنة.
                كده بدأت أفهم المرحلة اللي إنت فيها أكتر.
                هنا الاستمرارية أهم من الحماس اللي يومين
                وبعدها نختفي 😂
                فهنخلي اللي نعمله واقعي وينفع يدخل وسط حياتك.
            `;

        }


        if(age <= 59){

            return `
                تمام يا ${name} 💛
                ${age} سنة.
                في المرحلة دي أنا ههتم أكتر بالاستمرارية،
                والحركة، والنوم، والتغذية،
                بدل فكرة إنك تعمل كل حاجة مرة واحدة.
                جسمك محتاج اهتمام ثابت مش حماس مؤقت.
            `;

        }


        return `
            ما شاء الله يا ${name} ❤️
            ${age} سنة.
            السن عندي مش مجرد رقم،
            كل مرحلة ليها احتياجاتها وطريقتها.
            وهنركز على الحاجات اللي تفيدك فعلًا
            وتكون مناسبة وآمنة ليك.
        `;

    }


    /* الوزن */

    if(step.key === "weight"){

        const weight =
            Number(value);


        return `
            تمام يا ${name} 👀
            سجلت وزنك ${weight} كجم.
            بس خد بالك من حاجة مهمة:
            أنا مش هبص للرقم وأقولك حلو أو وحش.
            الوزن لوحده مش بيحكي القصة كلها.
            لازم أربطه بطولك وسنك ونشاطك وباقي الصورة.
            يعني الميزان عندي معلومة...
            مش حكم عليك 😄💛
        `;

    }


    /* الطول */

    if(step.key === "height"){

        const height =
            Number(value);

        const weight =
            Number(user.weight);


        let comment = "";


        if(height >= 180){

            comment =
                `و${height} سم كمان؟ يا نجم إنت طويل كده 😄`;

        }

        else if(height >= 170){

            comment =
                `و${height} سم، تمام يا ${name}، كده عندي رقم مهم جدًا أربطه بوزنك.`;

        }

        else{

            comment =
                `${height} سم، تمام يا ${name} 💛 وكل طول له جسمه واحتياجاته، مفيش رقم يخلي حد أحسن من حد.`;

        }


        let bmiText = "";


        if(weight > 0 && height > 0){

            bmiText = `
                دلوقتي أقدر أطلع مؤشر كتلة الجسم
                بشكل مبدئي، لكن مش هعتبره تشخيص
                ولا حكم نهائي عليك؛
                لأنه مش بيقيس تركيب الجسم
                ومش بيفرق بين الدهون والعضلات.
            `;

        }


        return `
            ${comment}

            كده الصورة بدأت تبقى أوضح عندي،
            خصوصًا لما أربط الطول بالوزن والسن
            بدل ما أبص لكل رقم لوحده.

            ${bmiText}
        `;

    }


    /* البلد */

    if(step.key === "country"){

        const country =
            String(value)
                .trim()
                .toLowerCase();


        if(
            country.includes("مصر") ||
            country.includes("egypt")
        ){

            return `
                مصر 🇪🇬؟
                طب كده دخلنا في حتة مهمة جدًا يا ${name} ☀️

                عندنا الشمس قوية في أوقات كتير من السنة،
                لكن ده مش معناه إن كل وقت مناسب للتعرض.

                شدة الأشعة فوق البنفسجية بتتغير حسب
                الوقت والتاريخ والمكان والظروف الجوية.

                عشان كده لما نوصل لجرعة الشمس،
                مش هديك رقم محفوظ وخلاص.
                هراعي مكانك ووقت التعرض وشدة الشمس
                ودرجة بشرتك.

                كده بقى أنا مش عرفت بلدك بس...
                أنا بدأت أفهم البيئة اللي حواليك كمان 💛
            `;

        }


        if(
            country.includes("المغرب") ||
            country.includes("morocco")
        ){

            return `
                المغرب 🇲🇦؟
                جميل يا ${name} 😄

                كده معلومات الشمس عندك هتتحسب
                باعتبار موقعك وظروف بلدك،
                ومش هتعامل المغرب كأنها مصر
                أو أي بلد تانية.

                الموقع الجغرافي،
                والوقت من السنة،
                ووقت اليوم،
                كلهم بيفرقوا في شدة الأشعة.

                ولما نوصل للجرعة،
                هنخلي الكلام مبني على الظروف الفعلية
                مش كلام محفوظ ☀️
            `;

        }


        return `
            تمام يا ${name} 🌍
            سجلت ${value}.

            ودي مش خانة بكتبها وخلاص؛
            البلد والموقع الجغرافي ممكن يفرقوا
            جدًا في موضوع الشمس والطقس
            وشدة الأشعة خلال اليوم.

            عشان كده لما نبدأ الجرعة
            هراعي المكان اللي إنت فيه
            بدل ما أدي نصيحة واحدة لكل الناس.

            كده بدأت أعرفك
            وأفهم البيئة اللي حواليك في نفس الوقت 💛
        `;

    }


    return `
        تمام يا ${name} 💛
        سجلت المعلومة دي.
        كده بنقرب أكتر للصورة الكاملة.
    `;

}


/* =========================================
   سنا تتكلم
========================================= */

function sanaSpeak(text, callback){

    waitingForContinue = true;

    nextButton.disabled = true;


    question.innerHTML = `

        <span class="typing-dots">
            •••
        </span>

    `;


    setTimeout(function(){

        question.textContent = "";


        let index = 0;

        const cleanText =
            text
                .replace(/\s+/g," ")
                .trim();


        const speed = 18;


        const timer =
            setInterval(function(){

                question.textContent +=
                    cleanText[index];


                index++;


                if(index >= cleanText.length){

                    clearInterval(timer);


                    nextButton.disabled =
                        false;


                    if(callback){

                        callback();

                    }

                }

            },speed);


    },600);

}


/* =========================================
   بداية التطبيق
========================================= */

startButton.addEventListener(
    "click",
    function(){

        currentStep = 0;

        waitingForContinue = false;

        showPage(welcome);

        renderStep();

    }
);


/* =========================================
   رسم السؤال
========================================= */

function renderStep(){

    const step =
        steps[currentStep];


    waitingForContinue = false;


    question.textContent =
        step.question;


    const progress =
        ((currentStep + 1) /
        steps.length) * 100;


    progressBar.style.width =
        progress + "%";


    answerArea.innerHTML =
        "";


    nextButton.disabled =
        false;


    nextButton.textContent =
        "تمام، قولي 💛";


    /* النوع */

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
            .querySelectorAll(
                ".gender-btn"
            )
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
                            .forEach(btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            });


                        this.classList.add(
                            "active"
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


    if(input){

        input.focus();


        input.addEventListener(
            "keydown",
            function(event){

                if(
                    event.key ===
                    "Enter"
                ){

                    nextButton.click();

                }

            }
        );

    }

}


/* =========================================
   زر التالي
========================================= */

nextButton.addEventListener(
    "click",
    function(){

        /* سنا خلصت كلامها */

        if(waitingForContinue){

            currentStep++;


            if(
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


        const step =
            steps[currentStep];


        /* النوع */

        if(
            step.type ===
            "gender"
        ){

            if(!user.gender){

                question.textContent =
                    "استنى يا جميل 😄 اختار الأول الصيغة اللي تحبني أكلمك بيها.";

                return;

            }

        }


        /* باقي البيانات */

        else{

            const input =
                document.getElementById(
                    "answerInput"
                );


            if(!input){

                return;

            }


            const value =
                input.value.trim();


            if(!value){

                question.textContent =
                    "بصلي كده 😄 اكتبلي الإجابة الأول عشان أعرفك أكتر.";

                input.focus();

                return;

            }


            if(
                step.type ===
                "number" &&
                Number(value) <= 0
            ){

                question.textContent =
                    "استنى بس 😄 اكتبلي رقم منطقي عشان أعرف أتعامل معاه صح.";

                input.focus();

                return;

            }


            user[step.key] =
                value;

        }


        const value =
            step.type === "gender"
            ? user.gender
            : user[step.key];


        const response =
            getResponse(
                step,
                value
            );


        nextButton.textContent =
            "استنى عليا... 💛";


        sanaSpeak(
            response,
            function(){

                if(
                    currentStep ===
                    steps.length - 1
                ){

                    nextButton.textContent =
                        "ورّيني بقى هنعمل إيه ☀️";

                }
                else{

                    nextButton.textContent =
                        "كده تمام، كمّل معايا 💛";

                }

            }
        );

    }
);


/* =========================================
   صفحة العادات
========================================= */

function showHabits(){

    showPage(habits);


    const name =
        user.name ||
        "يا صديقي";


    habitMessage.textContent =

        `استنى كده يا ${name} 😄 أنا دلوقتي بدأت ألمّ الصورة بتاعتك واحدة واحدة. مش هتعامل مع البيانات اللي قلتها كأنها شوية أرقام في استمارة؛ هنربطها ببعض ونشوف إيه اللي يناسبك فعلًا. اختار أول حاجة نفسك تبدأ بيها وأنا أمشي معاك فيها واحدة واحدة. 💛`;


    const habitData = [

        {
            id:"sun",

            icon:"☀️",

            title:"جرعة الشمس",

            text:
                "نفهم الشمس ودرجة بشرتك ووقت التعرض ونبني الجرعة خطوة خطوة."

        },


        {
            id:"water",

            icon:"💧",

            title:"شرب المياه",

            text:
                "ننظم شرب المياه خلال اليوم بطريقة بسيطة تناسب حياتك."

        },


        {
            id:"exercise",

            icon:"🏃",

            title:"الرياضة والحركة",

            text:
                "نختار حركة مناسبة لمستواك ونبني عليها تدريجيًا."

        },


        {
            id:"supplements",

            icon:"💊",

            title:"العلاج أو المكملات",

            text:
                "ننظم المعلومات الموجودة عندك بشكل آمن ومن غير تخمين."

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


                    if(
                        selected ===
                        "sun"
                    ){

                        openSunDose();

                    }


                    else if(
                        selected ===
                        "water"
                    ){

                        alert(
                            "💧 قسم المياه لسه بنبنيه معاك واحدة واحدة."
                        );

                    }


                    else if(
                        selected ===
                        "exercise"
                    ){

                        alert(
                            "🏃 قسم الرياضة هنبدأ نبنيه خطوة خطوة."
                        );

                    }


                    else if(
                        selected ===
                        "supplements"
                    ){

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

function openSunDose(){

    showPage(sunDose);


    const name =
        user.name ||
        "يا صديقي";


    sunMessage.textContent =

        `تمام يا ${name} ☀️ اختيار حلو. بما إني عرفت سنك وطولك ووزنك وبلدك، هنبدأ دلوقتي نضيف المعلومات الخاصة بالشمس، زي درجة بشرتك ووقت التعرض، وبعدها نبني الجرعة بدل ما نرمي رقم عشوائي.`;

}


/* =========================================
   الرجوع
========================================= */

if(backToHabits){

    backToHabits.addEventListener(
        "click",
        function(){

            showPage(habits);

        }
    );

}


/* =========================================
   حماية
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
