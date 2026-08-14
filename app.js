/* =========================================
   SunDose ☀️
   العقل الرئيسي للتطبيق
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
   الصفحات
========================================= */

const pages = {

    home: document.getElementById("home"),
    welcome: document.getElementById("welcome"),
    skin: document.getElementById("skinPage"),
    time: document.getElementById("timePage"),
    result: document.getElementById("resultPage"),
    plan: document.getElementById("planPage")

};


/* =========================================
   العناصر
========================================= */

const startButton =
    document.getElementById("startButton");

const nextButton =
    document.getElementById("nextButton");

const dialogue =
    document.getElementById("dialogue");

const answerArea =
    document.getElementById("answerArea");

const progressBar =
    document.getElementById("progressBar");

const skinIntro =
    document.getElementById("skinIntro");

const skinOptions =
    document.getElementById("skinOptions");

const skinContinue =
    document.getElementById("skinContinue");

const timeIntro =
    document.getElementById("timeIntro");

const timeOptions =
    document.getElementById("timeOptions");

const timeContinue =
    document.getElementById("timeContinue");

const resultDialogue =
    document.getElementById("resultDialogue");

const analysisCards =
    document.getElementById("analysisCards");

const resultNext =
    document.getElementById("resultNext");

const planIntro =
    document.getElementById("planIntro");

const planCards =
    document.getElementById("planCards");


/* =========================================
   سنا
========================================= */

const sanaImages = {

    home:
        document.getElementById("homeSana"),

    chat:
        document.getElementById("chatSana"),

    skin:
        document.getElementById("skinSana"),

    time:
        document.getElementById("timeSana"),

    result:
        document.getElementById("resultSana"),

    plan:
        document.getElementById("planSana")

};


const reactions = {

    home:
        document.getElementById("homeReaction"),

    chat:
        document.getElementById("chatReaction"),

    skin:
        document.getElementById("skinReaction"),

    time:
        document.getElementById("timeReaction"),

    result:
        document.getElementById("resultReaction"),

    plan:
        document.getElementById("planReaction")

};


/* =========================================
   حالة سنا
========================================= */

function sanaMood(place, mood, reaction){

    const image =
        sanaImages[place];

    const bubble =
        reactions[place];

    if(image){

        image.classList.remove(
            "happy",
            "excited",
            "thinking",
            "warm",
            "care"
        );

        image.classList.add(mood);

    }

    if(bubble){

        bubble.textContent = reaction;

    }

}


/* =========================================
   إظهار صفحة
========================================= */

function showPage(page){

    Object.values(pages)
        .forEach(section => {

            section.classList.add("hidden");

        });

    page.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   انتظار
========================================= */

function wait(ms){

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


/* =========================================
   كتابة سنا ببطء
========================================= */

async function typeText(
    element,
    text,
    speed = 42
){

    element.textContent = "";

    element.parentElement.classList.remove(
        "appear"
    );

    void element.parentElement.offsetWidth;

    element.parentElement.classList.add(
        "appear"
    );


    for(
        let i = 0;
        i < text.length;
        i++
    ){

        element.textContent += text[i];

        await wait(speed);

    }

}


/* =========================================
   الكلام على أجزاء
   المستخدم هو اللي يتحكم
========================================= */

let dialogueParts = [];
let dialogueIndex = 0;
let dialogueResolver = null;


function prepareDialogue(parts){

    dialogueParts = parts;
    dialogueIndex = 0;

}


async function showNextDialogue(){

    if(
        dialogueIndex >=
        dialogueParts.length
    ){

        return false;

    }


    const text =
        dialogueParts[dialogueIndex];


    await typeText(
        dialogue,
        text,
        48
    );


    dialogueIndex++;


    return true;

}


function waitForUser(){

    return new Promise(
        resolve => {

            dialogueResolver = resolve;

        }
    );

}


nextButton.addEventListener(
    "click",
    async function(){

        /* لو لسه فيه كلام لسنا */

        if(
            dialogueIndex <
            dialogueParts.length
        ){

            await showNextDialogue();

            if(
                dialogueIndex >=
                dialogueParts.length
            ){

                nextButton.textContent =
                    "نبدأ نتعرف على بعض 💛";

            }

            return;

        }


        /* بعد انتهاء كلام سنا */

        if(dialogueResolver){

            const resolve =
                dialogueResolver;

            dialogueResolver = null;

            resolve();

        }

    }
);


/* =========================================
   بداية التعارف
========================================= */

startButton.addEventListener(
    "click",
    async function(){

        showPage(pages.welcome);

        sanaMood(
            "chat",
            "happy",
            "👋"
        );


        prepareDialogue([

            "أهلًا بيك 💛 أنا سنا... ومبسوطه إنك ضغطت الزر ده بدل ما تهرب مني من أولها 😂",

            "بس قبل أي وزن ولا طول ولا أرقام... خليني أعرفك عليّا أنا الأول، عشان إنت مش داخل تسجل في استمارة وخلاص.",

            "اسمي سنا ☀️ والاسم مش صدفة... سنا مرتبط بالضوء والإشراق، وأنا فكرتي أصلًا إني أكون الرفيقة الصغيرة اللي تفكّرك بالحاجات الصحية من غير ما أحسسك إنك في عيادة.",

            "SunDose بدأت من فكرة بسيطة جدًا: شخص كان عنده مشكلة مرتبطة بفيتامين D، وكان محتاج حد يفكره بالعلاج والعادات المرتبطة بصحته.",

            "ومن هنا الفكرة كبرت... ليه ما يكونش فيه مكان يفهم الشخص نفسه الأول، وبعدها يساعده في الشمس والمياه والحركة والعادات اليومية بطريقة بسيطة ولطيفة؟",

            "فأنا موجودة هنا عشان أتعرف عليك الأول... وبعدها كل حاجة هتتظبط على بياناتك إنت، مش نسخة واحدة لكل الناس."

        ]);


        nextButton.classList.remove("hidden");

        nextButton.textContent =
            "كملي يا سنا 💛";


        await showNextDialogue();

        nextButton.textContent =
            "كملي يا سنا 💛";


        await waitForUser();


        startQuestions();

    }
);


/* =========================================
   الأسئلة
========================================= */

const steps = [

    {
        key: "name",
        type: "text",
        question: "طيب نبدأ بحاجة بسيطة... اسمك إيه؟ 😊",
        label: "اسمك",
        placeholder: "اكتب اسمك هنا"
    },

    {
        key: "gender",
        type: "gender",
        question: "تمام... عرفت اسمك 💛 دلوقتي أعرف أخاطبك إزاي عشان كلام سنا يبقى مناسب ليك؟"
    },

    {
        key: "age",
        type: "number",
        question: "طب عندك كام سنة؟ 😄 السن هنا مهم عشان جسمك واحتياجاتك مش ثابتين طول العمر.",
        label: "العمر",
        placeholder: "مثال: 22",
        unit: "سنة"
    },

    {
        key: "weight",
        type: "number",
        question: "طيب وزنك كام تقريبًا؟ متقلقش... سنا مش هتطلعلك الميزان وتقولك يا فضيحتك 😂 الرقم بس هيساعدني أفهم احتياج جسمك.",
        label: "الوزن",
        placeholder: "مثال: 80",
        unit: "كجم"
    },

    {
        key: "height",
        type: "number",
        question: "وطولك كام؟ عايزة الصورة تكمل عندي، مش آخد رقم وأرمي عليه نصيحة جاهزة.",
        label: "الطول",
        placeholder: "مثال: 175",
        unit: "سم"
    },

    {
        key: "country",
        type: "text",
        question: "وإنت من أنهي بلد؟ 🌍 دي مهمة أكتر مما تتخيل... الشمس والجو وطريقة اليوم وحتى العادات بتختلف من مكان لمكان.",
        label: "البلد",
        placeholder: "مثال: مصر"
    }

];


let currentStep = 0;


/* =========================================
   بدء الأسئلة
========================================= */

async function startQuestions(){

    currentStep = 0;

    renderStep();

}


/* =========================================
   رد سنا بعد البيانات
========================================= */

function getGenderWord(){

    return user.gender === "female"
        ? "يا قمر"
        : "يا نجم";

}


function getName(){

    return user.name || getGenderWord();

}


function genderStyle(){

    if(user.gender === "female"){

        return {

            pronoun: "إنتِ",
            verb: "عايزة",
            sweet: "يا قمر",
            laugh: "😂"

        };

    }

    return {

        pronoun: "إنت",
        verb: "عايز",
        sweet: "يا نجم",
        laugh: "😂"

    };

}


/* =========================================
   رد العمر
========================================= */

function ageReaction(){

    const age =
        Number(user.age);

    const name =
        getName();

    if(age < 18){

        return [

            `يا ${name} 💛 كده إنت لسه في سن صغير، وده معناه إن جسمك لسه في مرحلة نمو وتغيّر، فمش هتعامل معاك بنفس طريقة شخص بالغ.`,

            `والحلو في السن ده إن بناء العادات الصحية من بدري مكسب كبير جدًا... بدل ما نستنى الجسم يقولنا "أنا قلتلكم من زمان" 😂`

        ];

    }


    if(age <= 25){

        return [

            `يا ${name} 😄 السن ده ممتاز إنك تبدأ تهتم بعاداتك، لأنك لسه في مرحلة جسمك فيها يقدر يستفيد جدًا من الحركة والنوم والأكل والتعرض المناسب للشمس.`,

            `يعني باختصار... لسه بدري جدًا على حجة "أنا كبرت يا سنا" 😂 وأنا هفضل ماسكالك الحجة دي.`

        ];

    }


    if(age <= 40){

        return [

            `يا ${name} 💛 هنا بقى دخلنا مرحلة الجسم بيحب فيها النظام أكتر من العشوائية... النوم، الحركة، المياه والتعرض للشمس بقوا حاجات تستاهل اهتمام حقيقي.`,

            `ومش معنى إنك كبرت سنة أو اتنين إن الموضوع بقى مخيف... بالعكس، العادات الصح بتفرق جدًا في المرحلة دي.`

        ];

    }


    return [

        `يا ${name} 🌿 سنك معناه إننا لازم نبقى أذكى في اختيار العادات، مش إننا نقلل من نفسنا خالص.`,

        `الجسم بيتغير مع العمر، وده طبيعي، وعشان كده سنا مش هتديك نصيحة محفوظة... هراعي سنك وباقي بياناتك مع بعض.`

    ];

}


/* =========================================
   رد الوزن والطول
========================================= */

function bodyReaction(){

    const age =
        Number(user.age);

    const weight =
        Number(user.weight);

    const height =
        Number(user.height);


    if(
        !weight ||
        !height
    ){

        return [

            `تمام يا ${getName()} 💛 البيانات بدأت تكمل عندي.`

        ];

    }


    const bmi =
        weight /
        Math.pow(height / 100, 2);


    let bodyComment = "";


    if(bmi < 18.5){

        bodyComment =
            "الأرقام دي ممكن تشير إن وزنك أقل من النطاق المعتاد بالنسبة لطولك، بس مؤشر BMI لوحده مش تشخيص.";

    }

    else if(bmi < 25){

        bodyComment =
            "النسبة المحسوبة مبدئيًا تقع في نطاق الوزن المعتاد حسب BMI، وده مؤشر عام مش حكم نهائي على صحة الجسم.";

    }

    else if(bmi < 30){

        bodyComment =
            "النسبة المحسوبة مبدئيًا أعلى من النطاق المعتاد حسب BMI، وده معناه إننا لو بنتكلم عن الوزن هنركز على الصحة والعادات، مش الشكل.";

    }

    else{

        bodyComment =
            "النسبة المحسوبة مبدئيًا مرتفعة حسب BMI، وده مؤشر عام فقط، مش تشخيص ولا حكم على جسمك.";

    }


    return [

        `بص يا ${getName()} 👀 كده بدأت أشوف الصورة أوضح: طولك ${height} سم ووزنك حوالي ${weight} كجم، فمش هينفع أديك نصيحة عامة وأقول خلاص.`,

        bodyComment,

        `والأهم عندي إن الرقم ده مش مقياس لقيمتك ولا شكلك ولا شخصيتك أصلًا 💛 أنا هستخدمه بس عشان أفهم احتياجات جسمك بشكل أحسن.`

    ];

}


/* =========================================
   معلومات حسب البلد
========================================= */

function countryReaction(){

    const country =
        user.country
            .trim()
            .toLowerCase();


    const name =
        getName();


    if(
        country.includes("مصر") ||
        country.includes("egypt")
    ){

        return [

            `آه كده فهمتك يا ${name} 🇪🇬 مصر بقى... شمس موجودة، وحرارة موجودة، وفي الصيف الشمس ممكن تبقى عاملة نفسها في مهمة انتقامية 😂`,

            `عشان كده لما نتكلم عن الشمس مش هقولك "انزل الساعة كذا وخلاص". وقت اليوم، شدة الشمس، الموسم، لون البشرة والمكان نفسه كلهم بيفرقوا.`,

            `وكمان موضوع المياه والحركة هراعي فيه طبيعة اليوم والجو، لأن الشخص اللي عايش في جو حار ونشاطه عالي مش زي شخص يومه كله في مكان بارد أو مكيف.`

        ];

    }


    if(
        country.includes("مغرب") ||
        country.includes("morocco")
    ){

        return [

            `المغرب 🇲🇦 تمام يا ${name}... كده عندي معلومة مهمة، لأن اختلاف المكان والمناخ بيغير طريقة تعاملنا مع الشمس والحرارة.`,

            `فمش هنسخ نفس الكلام اللي أقوله لشخص في مصر وأرميه عليك. SunDose المفروض يفهم الشخص ومكانه قبل ما يقترح عليه حاجة.`

        ];

    }


    if(
        country.includes("سعود") ||
        country.includes("uae") ||
        country.includes("إمارات") ||
        country.includes("قطر") ||
        country.includes("كويت")
    ){

        return [

            `أوه يا ${name} 🌞 كده الحرارة والشمس عندك ممكن يكونوا عامل مهم جدًا، خصوصًا في الأوقات شديدة الحرارة.`,

            `فهنفرق بين "الشمس مفيدة" و"أقف في الحر بالساعات"... الاتنين مش نفس الحاجة خالص 😂 وهنا الأمان أهم من أي رقم.`

        ];

    }


    return [

        `تمام يا ${name} 🌍 كده عرفت المكان اللي هنبني عليه الحسابات.`,

        `البلد مش مجرد خانة بنعلم عليها صح... الموقع والمناخ وشدة الشمس والوقت من اليوم كلهم ممكن يغيروا النصيحة.`,

        `وعشان كده لما نطوّر SunDose أكتر، هنخلي المكان يدخل في الحسابات الفعلية بدل ما نستخدم رقم ثابت لكل العالم.`

    ];

}


/* =========================================
   رسم السؤال
========================================= */

function renderStep(){

    const step =
        steps[currentStep];


    progressBar.style.width =
        (
            ((currentStep + 1) /
            steps.length) * 100
        ) + "%";


    answerArea.innerHTML = "";

    answerArea.classList.add("hidden");

    nextButton.classList.add("hidden");


    let questionText =
        step.question;


    typeText(
        dialogue,
        questionText,
        43
    ).then(() => {

        answerArea.classList.remove(
            "hidden"
        );


        buildAnswer(step);

    });

}


/* =========================================
   بناء الإجابة
========================================= */

function buildAnswer(step){

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
            .querySelectorAll(".gender-btn")
            .forEach(button => {

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

                                btn.classList
                                    .remove(
                                        "active"
                                    );

                            });


                        this.classList.add(
                            "active"
                        );


                        showAnswerButton(
                            "تمام... كملي يا سنا 💛"
                        );

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
                ${step.type === "number"
                    ? 'min="1"'
                    : ''
                }
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
        document.getElementById(
            "answerInput"
        );


    input.focus();


    input.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){

                nextButton.click();

            }

        }
    );


    input.addEventListener(
        "input",
        function(){

            if(
                this.value.trim()
            ){

                showAnswerButton(
                    currentStep === 0
                        ? "أهو كده بدأت أعرفك 😄"
                        : "تمام يا جميل 💛"
                );

            }
            else{

                nextButton.classList.add(
                    "hidden"
                );

            }

        }
    );

}


/* =========================================
   زر الانتقال يظهر بعد الإجابة
========================================= */

function showAnswerButton(text){

    nextButton.textContent =
        text;

    nextButton.classList.remove(
        "hidden"
    );

}


/* =========================================
   الانتقال بين الأسئلة
========================================= */

nextButton.addEventListener(
    "click",
    async function(){

        const step =
            steps[currentStep];


        if(step.type === "gender"){

            if(!user.gender){

                alert(
                    "اختار الأول يا جميل 💛"
                );

                return;

            }

        }

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

                input.focus();

                return;

            }


            if(
                step.type === "number" &&
                Number(value) <= 0
            ){

                alert(
                    "اكتب رقم صحيح الأول يا نجم 💛"
                );

                input.focus();

                return;

            }


            user[step.key] =
                value;

        }


        /* =================================
           رد سنا حسب الإجابة
        ================================= */

        nextButton.classList.add(
            "hidden"
        );

        answerArea.classList.add(
            "hidden"
        );


        let parts = [];


        if(step.key === "name"){

            const style =
                genderStyle();


            parts = [

                `تشرفت بيك يا ${user.name} 💛 الاسم وصل عندي خلاص، ومش هحتاج أسألك تاني إنت مين.`,

                `وبما إننا لسه في أول التعارف، استنى عليّا لما أعرف بس إنت ${style.sweet} ولا إنتِ ${style.sweet} 😄 وبعدها كلام سنا هيظبط على مقاسك.`

            ];


            /* ملاحظة:
               لا نستخدم صيغة ذكر/أنثى
               بشكل صريح قبل سؤال الجنس.
            */

        }


        else if(step.key === "gender"){

            const style =
                genderStyle();


            parts = [

                `كده فهمتك أكتر يا ${user.name} ${style.sweet} 💛 خلاص من هنا وطالع هكلمك بالطريقة اللي تناسبك.`,

                user.gender === "female"
                    ? `وبصراحة يا ${user.name}، اختيارك خلّى سنا تاخد بالها إنها لازم تكون أرق شوية في كلامها معاكي... بس متفتكريش إني هسيبك من الهزار 😂`
                    : `وبصراحة يا ${user.name}، كده سنا عرفت إنها بتكلم نجم... فمتستغربش لو لقيتني برمي عليك كام كلمة حلوة وسط المعلومات 😂`

            ];

        }


        else if(step.key === "age"){

            parts =
                ageReaction();

        }


        else if(step.key === "weight"){

            parts = bodyReaction();

        }


        else if(step.key === "height"){

            parts = [

                `حلو يا ${getName()}... كده الطول دخل مع الوزن عندي، وده أهم من إني أبص لأي رقم لوحده.`,

                `الطول والوزن مع بعض بيساعدوني أطلع مؤشر عام عن الجسم، لكن مش هتعامل مع المؤشر ده كأنه تشخيص أو حكم على صحتك.`,

                `وأهو كده سنا بدأت تجمع الصورة واحدة واحدة... ولسه ناقصني مكانك عشان أفهم الجو والشمس اللي حواليك 🌍`

            ];

        }


        else if(step.key === "country"){

            parts =
                countryReaction();

        }


        prepareDialogue(parts);


        sanaMood(
            "chat",
            "warm",
            "🥰"
        );


        /* عرض أول جزء */

        await showNextDialogue();


        nextButton.classList.remove(
            "hidden"
        );

        nextButton.textContent =
            dialogueIndex <
            dialogueParts.length
                ? "كملي يا سنا 💛"
                : "نكمل الرحلة ☀️";


        /* هنا المستخدم هو اللي يضغط
           عشان يشوف الجزء التالي */

        dialogueResolver =
            async function(){};


        /* بدل resolver قديم:
           زرار next نفسه يكمل الكلام.
        */


        if(
            dialogueIndex >=
            dialogueParts.length
        ){

            finishStep(step);

        }

    }
);


/* =========================================
   تعديل سلوك زر التالي أثناء رد سنا
========================================= */

nextButton.addEventListener(
    "click",
    async function handleDialogueFlow(){

        if(
            dialogueIndex === 0 &&
            dialogueParts.length === 0
        ){

            return;

        }

    }
);


/* =========================================
   إنهاء مرحلة البيانات
========================================= */

async function finishStep(step){

    nextButton.classList.add(
        "hidden"
    );


    await wait(500);


    if(step.key === "country"){

        await prepareSkinPage();

        return;

    }


    currentStep++;


    if(
        currentStep <
        steps.length
    ){

        renderStep();

    }

}


/* =========================================
   إعادة ربط زر التالي بشكل صحيح
========================================= */

/*
    نستخدم نسخة مستقلة من منطق الزر
    حتى يكون التحكم واضح.
*/


nextButton.onclick = async function(){

    /* =================================
       لو فيه أجزاء كلام متبقية
    ================================= */

    if(
        dialogueIndex <
        dialogueParts.length
    ){

        await showNextDialogue();


        if(
            dialogueIndex >=
            dialogueParts.length
        ){

            nextButton.textContent =
                "نكمل الرحلة ☀️";

        }


        return;

    }


    /* =================================
       لو إحنا في جزء intro
    ================================= */

    const step =
        steps[currentStep];


    if(step){

        const isInputStep =
            step.key !== "gender";


        if(
            isInputStep &&
            !answerArea.classList.contains(
                "hidden"
            )
        ){

            return;

        }

    }


    if(
        currentStep <
        steps.length - 1
    ){

        currentStep++;

        renderStep();

        return;

    }


    prepareSkinPage();

};


/* =========================================
   صفحة لون البشرة
========================================= */

async function prepareSkinPage(){

    showPage(
        pages.skin
    );


    sanaMood(
        "skin",
        "thinking",
        "☀️"
    );


    await typeText(
        skinIntro,
        `دلوقتي بقى ندخل في الجزء اللي الشمس نفسها هتفرق فيه معانا 😄 لون البشرة بيساعدنا نفهم استجابة الجلد للشمس، لكن مش معناه إننا هنسيب الأمان على جنب.`,
        43
    );


    await wait(400);


    await typeText(
        skinIntro,
        `اختار الأقرب ليك من غير توتر... مش امتحان ألوان 😂 وأنا هستخدم اختيارك كجزء من الصورة كلها، مش لوحده.`,
        43
    );


    skinOptions.classList.remove(
        "hidden"
    );

}


/* =========================================
   اختيار البشرة
========================================= */

document
    .querySelectorAll(".skin-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            function(){

                user.skin =
                    this.dataset.skin;


                document
                    .querySelectorAll(
                        ".skin-option"
                    )
                    .forEach(item => {

                        item.classList
                            .remove(
                                "active"
                            );

                    });


                this.classList.add(
                    "active"
                );


                sanaMood(
                    "skin",
                    "excited",
                    "😍"
                );


                skinContinue.classList
                    .remove(
                        "hidden"
                    );

            }
        );

    });


skinContinue.addEventListener(
    "click",
    async function(){

        skinContinue.classList.add(
            "hidden"
        );


        await prepareTimePage();

    }
);


/* =========================================
   صفحة الوقت
========================================= */

async function prepareTimePage(){

    showPage(
        pages.time
    );


    sanaMood(
        "time",
        "warm",
        "🌤️"
    );


    await typeText(
        timeIntro,
        `حلو يا ${getName()}... كده عرفت لون بشرتك، وفاضل أعرف إنت غالبًا بتحب تتعرض للشمس إمتى.`,
        44
    );


    await wait(350);


    await typeText(
        timeIntro,
        `الوقت مهم لأن شدة الأشعة بتتغير خلال اليوم، وكمان الحرارة نفسها مش حاجة نحب نتجاهلها. اختار أقرب وقت ليومك.`,
        44
    );


    timeOptions.classList.remove(
        "hidden"
    );

}


/* =========================================
   اختيار الوقت
========================================= */

document
    .querySelectorAll("#timeOptions button")
    .forEach(button => {

        button.addEventListener(
            "click",
            function(){

                user.sunTime =
                    this.dataset.time;


                document
                    .querySelectorAll(
                        "#timeOptions button"
                    )
                    .forEach(item => {

                        item.classList
                            .remove(
                                "active"
                            );

                    });


                this.classList.add(
                    "active"
                );


                timeContinue.classList
                    .remove(
                        "hidden"
                    );


                sanaMood(
                    "time",
                    "happy",
                    "☀️"
                );

            }
        );

    });


timeContinue.addEventListener(
    "click",
    async function(){

        timeContinue.classList.add(
            "hidden"
        );


        await buildResult();

    }
);


/* =========================================
   حساب BMI
========================================= */

function calculateBMI(){

    const weight =
        Number(user.weight);

    const height =
        Number(user.height) / 100;


    if(
        !weight ||
        !height
    ){

        return 0;

    }


    return weight /
        (height * height);

}


/* =========================================
   احتياج المياه
========================================= */

function calculateWater(){

    const weight =
        Number(user.weight);


    if(!weight){

        return 2000;

    }


    let water =
        weight * 30;


    /* الجو الحار */

    const country =
        user.country
            .toLowerCase();


    if(
        country.includes("مصر") ||
        country.includes("سعود") ||
        country.includes("إمارات") ||
        country.includes("قطر") ||
        country.includes("كويت")
    ){

        water += 300;

    }


    return Math.round(
        water / 50
    ) * 50;

}


/* =========================================
   الحركة
========================================= */

function calculateExercise(){

    const age =
        Number(user.age);


    if(age < 18){

        return "ابدأ بحركة مناسبة لسنك وتحت إشراف مناسب، مع زيادة النشاط تدريجيًا.";

    }


    if(age < 65){

        return "هدف مبدئي ممتاز: حوالي 150 دقيقة نشاط بدني متوسط أسبوعيًا، مع زيادة تدريجية حسب قدرتك.";

    }


    return "الحركة المنتظمة مهمة جدًا، لكن الأفضل اختيار مستوى مناسب لقدرتك وحالتك الصحية.";

}


/* =========================================
   الشمس
========================================= */

function calculateSun(){

    const skin =
        Number(user.skin);


    const time =
        user.sunTime;


    let range = "";


    if(time === "morning"){

        if(skin <= 2){

            range =
                "ابدأ بتعرض قصير جدًا وراقب الجلد؛ البشرة الفاتحة قد تتأثر أسرع.";

        }

        else if(skin === 3){

            range =
                "ابدأ بمدة قصيرة إلى متوسطة مع مراقبة الجلد والحرارة.";

        }

        else{

            range =
                "قد تتحمل البشرة التعرض لفترة أطول نسبيًا، لكن الحماية من الأشعة الزائدة تظل مهمة.";

        }

    }


    else if(time === "midday"){

        range =
            "وقت الظهر غالبًا تكون الأشعة أقوى، لذلك لا أنصح بتحويله تلقائيًا إلى جرعة ثابتة بالدقائق.";

    }


    else if(time === "afternoon"){

        range =
            "بعد الظهر قد تكون شدة الأشعة أقل من منتصف اليوم، لكن المدة الفعلية تعتمد على مؤشر UV والمكان.";

    }


    else{

        range =
            "بما إن وقتك متغير، الأفضل تحديد التعرض يوميًا حسب UV والجو والمكان بدل رقم ثابت.";

    }


    return range;

}


/* =========================================
   وصف البشرة
========================================= */

function skinText(){

    const skin =
        Number(user.skin);


    const texts = {

        1:
            "بشرة فاتحة جدًا وقد تكون أكثر عرضة للاحمرار بسرعة.",

        2:
            "بشرة فاتحة ويمكن أن تحمر مع التعرض الطويل.",

        3:
            "بشرة متوسطة وغالبًا لديها قدرة أكبر على التسمير.",

        4:
            "بشرة داكنة وتميل لتحمل التعرض أكثر، مع استمرار أهمية الحماية.",

        5:
            "بشرة داكنة جدًا وقد تحتوي على حماية طبيعية أعلى من الأشعة، لكن الوقاية تظل مهمة."

    };


    return texts[skin] ||
        "تم اختيار درجة البشرة.";

}


/* =========================================
   بناء التحليل
========================================= */

async function buildResult(){

    showPage(
        pages.result
    );


    sanaMood(
        "result",
        "excited",
        "🥰"
    );


    await typeText(
        resultDialogue,
        `خلاص يا ${getName()}... دلوقتي عندي صورة أحسن بكتير عنك 💛 مش مجرد اسم ووزن، لأ... عندي سنك وطولك ووزنك ومكانك ولون بشرتك ووقت الشمس اللي يناسب يومك.`,
        44
    );


    await wait(400);


    await typeText(
        resultDialogue,
        `تعالى أوريك أنا استوعبت إيه، وإزاي هنحوّل البيانات دي لحاجات عملية بدل ما تفضل أرقام متخزنة وخلاص.`,
        44
    );


    const bmi =
        calculateBMI();


    const water =
        calculateWater();


    const sun =
        calculateSun();


    const exercise =
        calculateExercise();


    analysisCards.innerHTML = `

        <div class="analysis-card">

            <div class="card-icon">
                🧍
            </div>

            <h3>
                جسمك
            </h3>

            <p>
                العمر: ${user.age} سنة
                <br>
                الطول: ${user.height} سم
                <br>
                الوزن: ${user.weight} كجم
            </p>

            <div class="value">
                BMI مبدئي: ${bmi.toFixed(1)}
            </div>

        </div>


        <div class="analysis-card">

            <div class="card-icon">
                💧
            </div>

            <h3>
                المياه
            </h3>

            <p>
                تقدير مبدئي مبني على الوزن،
                مع مراعاة أن الحرارة والنشاط
                ممكن يغيروا الاحتياج.
            </p>

            <div class="value">
                حوالي ${water} مل يوميًا
            </div>

        </div>


        <div class="analysis-card">

            <div class="card-icon">
                ☀️
            </div>

            <h3>
                الشمس
            </h3>

            <p>
                ${skinText()}
            </p>

            <div class="value">
                ${sun}
            </div>

        </div>


        <div class="analysis-card">

            <div class="card-icon">
                🏃
            </div>

            <h3>
                الحركة
            </h3>

            <p>
                ${exercise}
            </p>

        </div>

    `;


    analysisCards.classList.remove(
        "hidden"
    );


    resultNext.classList.remove(
        "hidden"
    );

}


/* =========================================
   الخطة النهائية
========================================= */

resultNext.addEventListener(
    "click",
    async function(){

        showPage(
            pages.plan
        );


        sanaMood(
            "plan",
            "excited",
            "🌟"
        );


        await typeText(
            planIntro,
            `بص يا ${getName()}... أنا مش عايزة أديك جدول يخوفك ولا 30 مهمة تعملهم من بكرة 😂 خلينا نبدأ بثلاث حاجات أساسية: شمس محسوبة، مياه مناسبة، وحركة تقدر تستمر عليها.`,
            44
        );


        await wait(400);


        await typeText(
            planIntro,
            `والأهم إن دي مش نهاية التعارف. كل ما SunDose يعرف عن يومك أكتر، نقدر نخلي التوصيات أدق بدل ما نعتمد على التخمين.`,
            44
        );


        const water =
            calculateWater();


        const sun =
            calculateSun();


        const exercise =
            calculateExercise();


        planCards.innerHTML = `

            <div class="analysis-card">

                <div class="card-icon">
                    ☀️
                </div>

                <h3>
                    جرعة الشمس
                </h3>

                <p>
                    ${sun}
                </p>

            </div>


            <div class="analysis-card">

                <div class="card-icon">
                    💧
                </div>

                <h3>
                    المياه
                </h3>

                <p>
                    خلي هدفك المبدئي حوالي
                    ${water} مل يوميًا،
                    وزوّد احتياجك مع الحر أو
                    النشاط حسب ظروفك.
                </p>

            </div>


            <div class="analysis-card">

                <div class="card-icon">
                    🏃
                </div>

                <h3>
                    الحركة
                </h3>

                <p>
                    ${exercise}
                </p>

            </div>


            <div class="analysis-card">

                <div class="card-icon">
                    🌍
                </div>

                <h3>
                    المكان
                </h3>

                <p>
                    أنت في ${user.country}،
                    وده هيكون جزء من حسابات
                    SunDose المستقبلية بدل استخدام
                    نفس النصيحة لكل شخص في العالم.
                </p>

            </div>

        `;

    }
);
