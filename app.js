/* =========================================
   SunDose ☀️ - النسخة النهائية الكاملة
========================================= */

/* =========================================
   USER
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
   STREAK & STATS
========================================= */

let streak = parseInt(localStorage.getItem('sundose_streak')) || 0;
let points = parseInt(localStorage.getItem('sundose_points')) || 0;
let daysCount = parseInt(localStorage.getItem('sundose_days')) || 0;
let checksCount = parseInt(localStorage.getItem('sundose_checks')) || 0;
let uvHistory = JSON.parse(localStorage.getItem('sundose_uv_history')) || [];
let lastCheckDate = localStorage.getItem('sundose_last_date') || '';

function updateStreak() {
    const today = new Date().toDateString();
    if (lastCheckDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastCheckDate === yesterday.toDateString()) {
            streak += 1;
        } else if (lastCheckDate !== today) {
            streak = 1;
        }
        lastCheckDate = today;
        daysCount += 1;
        localStorage.setItem('sundose_streak', streak.toString());
        localStorage.setItem('sundose_days', daysCount.toString());
        localStorage.setItem('sundose_last_date', lastCheckDate);
    }
    document.querySelectorAll('.streak-badge span').forEach(el => {
        if (el.id && el.id.includes('streak')) {
            el.textContent = streak;
        }
    });
    document.getElementById('portalStreak').textContent = streak;
    document.getElementById('portalPoints').textContent = points;
    document.getElementById('statDays').textContent = daysCount;
}

function addPoints(amount) {
    points += amount;
    localStorage.setItem('sundose_points', points.toString());
    document.getElementById('portalPoints').textContent = points;
}

function addCheck(uv) {
    checksCount += 1;
    uvHistory.push(uv);
    localStorage.setItem('sundose_checks', checksCount.toString());
    localStorage.setItem('sundose_uv_history', JSON.stringify(uvHistory));
    document.getElementById('statChecks').textContent = checksCount;
    if (uvHistory.length > 0) {
        const avg = uvHistory.reduce((a, b) => a + b, 0) / uvHistory.length;
        document.getElementById('statAvgUV').textContent = avg.toFixed(1);
    }
}

/* =========================================
   ELEMENTS
========================================= */

const home = document.getElementById("home");
const welcome = document.getElementById("welcome");
const habits = document.getElementById("habits");
const sunLearn = document.getElementById("sunLearn");
const sunDose = document.getElementById("sunDose");
const healthPortal = document.getElementById("healthPortal");

const startButton = document.getElementById("startButton");
const introNext = document.getElementById("introNext");
const nextButton = document.getElementById("nextButton");

const introText = document.getElementById("introText");
const question = document.getElementById("question");
const answerArea = document.getElementById("answerArea");
const progressBar = document.getElementById("progressBar");
const stepNumber = document.getElementById("stepNumber");
const stepTotal = document.getElementById("stepTotal");

const habitMessage = document.getElementById("habitMessage");
const habitList = document.getElementById("habitList");

const learnSana = document.getElementById("learnSana");
const learnMessage = document.getElementById("learnMessage");
const startSunAnalysis = document.getElementById("startSunAnalysis");
const backFromLearn = document.getElementById("backFromLearn");

const sunMessage = document.getElementById("sunMessage");
const backToHabits = document.getElementById("backToHabits");
const goToHealthPortalBtn = document.getElementById("goToHealthPortal");
const backFromPortal = document.getElementById("backFromPortal");

const sanaImage = document.getElementById("sanaImage");
const questionSana = document.getElementById("questionSana");
const habitSana = document.getElementById("habitSana");
const sunSana = document.getElementById("sunSana");
const portalSana = document.getElementById("portalSana");
const sanaReaction = document.getElementById("sanaReaction");

const locationButton = document.getElementById("locationButton");
const sunStatus = document.getElementById("sunStatus");
const sunSkinValue = document.getElementById("sunSkinValue");
const sunTimeValue = document.getElementById("sunTimeValue");
const sunLocationValue = document.getElementById("sunLocationValue");
const uvValue = document.getElementById("uvValue");
const analysisTitle = document.getElementById("analysisTitle");
const analysisText = document.getElementById("analysisText");
const analysisIcon = document.getElementById("analysisIcon");
const doseMeterFill = document.getElementById("doseMeterFill");
const doseResult = document.getElementById("doseResult");
const doseMinutes = document.getElementById("doseMinutes");
const doseTitle = document.getElementById("doseTitle");
const doseText = document.getElementById("doseText");

const portalGreeting = document.getElementById("portalGreeting");
const portalSubGreeting = document.getElementById("portalSubGreeting");

/* =========================================
   STATE
========================================= */

let introStep = 0;
let currentStep = 0;
let isTyping = false;
let typingTimer = null;
let waitingForContinue = false;
let sunData = null;

/* =========================================
   SANA EYES & ANIMATIONS
========================================= */

function blinkSanaEyes(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const eyes = container.querySelectorAll('.eye');
    eyes.forEach(eye => {
        eye.classList.add('blink');
        setTimeout(() => {
            eye.classList.remove('blink');
        }, 150);
    });
}

function setSanaMood(elementId, moodClass, reaction = "") {
    const img = document.getElementById(elementId);
    if (!img) return;
    img.classList.remove('sana-look-left', 'sana-look-right', 'sana-happy-bounce', 'sana-thinking', 'sana-excited', 'sana-wave');
    if (moodClass) img.classList.add(moodClass);
    if (sanaReaction && reaction) {
        sanaReaction.textContent = reaction;
        sanaReaction.classList.remove('hidden');
    } else if (sanaReaction) {
        sanaReaction.classList.add('hidden');
    }
    const container = img.closest('.sana-container');
    if (container) {
        const eyes = container.querySelectorAll('.eye');
        eyes.forEach(eye => {
            setTimeout(() => {
                eye.classList.add('blink');
                setTimeout(() => {
                    eye.classList.remove('blink');
                }, 150);
            }, 500 + Math.random() * 1500);
        });
    }
}

function changeSanaImage(element, image, reaction = "", moodClass = "") {
    if (!element) return;
    element.classList.remove('sana-changing');
    void element.offsetWidth;
    element.classList.add('sana-changing');
    element.src = image;
    element.classList.remove('sana-look-left', 'sana-look-right', 'sana-happy-bounce', 'sana-thinking', 'sana-excited', 'sana-wave');
    if (moodClass) element.classList.add(moodClass);
    if (sanaReaction) {
        if (reaction) {
            sanaReaction.textContent = reaction;
            sanaReaction.classList.remove('hidden');
        } else {
            sanaReaction.classList.add('hidden');
        }
    }
    const container = element.closest('.sana-container');
    if (container) {
        const eyes = container.querySelectorAll('.eye');
        setTimeout(() => {
            eyes.forEach(eye => {
                eye.classList.add('blink');
                setTimeout(() => {
                    eye.classList.remove('blink');
                }, 150);
            });
        }, 300);
    }
}

/* =========================================
   PAGE
========================================= */

function showPage(page) {
    [home, welcome, habits, sunLearn, sunDose, healthPortal].forEach(section => {
        if (section) section.classList.add('hidden');
    });
    if (page) page.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateStreak();
}

/* =========================================
   TYPING
========================================= */

function typeSanaText(text, element, speed = 38, callback = null) {
    if (!element) return;
    if (typingTimer) {
        clearInterval(typingTimer);
        typingTimer = null;
    }
    isTyping = true;
    element.textContent = "";
    let index = 0;
    typingTimer = setInterval(() => {
        element.textContent += text.charAt(index);
        index++;
        if (index >= text.length) {
            clearInterval(typingTimer);
            typingTimer = null;
            isTyping = false;
            if (callback) callback();
        }
    }, speed);
}

function finishTypingImmediately() {
    if (!isTyping || !typingTimer) return false;
    clearInterval(typingTimer);
    typingTimer = null;
    isTyping = false;
    return true;
}

/* =========================================
   INTRO (قصة سنا ومعنى اسمها)
========================================= */

const introMessages = [
    "يا اهلاً بيك 😏 أنا سنا... اسمي مش عشوائي، 'سنا' يعني الضوء الخفيف اللي بيلمع في النهار. وأنا هنا عشان أكون صديقك الصحي اللي يفتكرك بالشمس 😌",
    "تعرف إيه هي قصة SunDose؟ كان فيه شخص قريب مني عنده نقص فيتامين D وكان دايماً بينسي ياخد جرعته، فقررت أعمل حاجة بسيطة تذكره... ومن هناك بدأت الرحلة 😂",
    "المشروع كبر مع الوقت وبقى صديق صحي لكل الناس، مش بس تذكير، لأ بقى يفهم بشرتك ووقتك ومكانك ويديك جرعة مناسبة بأمان ☀️",
    "أول حاجة عشان أعرف أتعامل معاك بالمزاج المناسب، أخاطبك إزاي؟ ولد ولا بنت؟ 😉",
    "طيب دلوقتي عرفت مين قدامي، اسمك إيه؟ أقولك إيه... أسمك هيبقى عندي في السجلات الذهبية 😂",
    "خليني أجمع كام معلومة صغيرة عنك، مش عشان أحكم عليك... عشان الشمس نفسها مش واحدة عند كل الناس ☀️",
    "الشمس دي مش مجرد كرة نار في السما، لأ دي مصدر حياة، فيتامين D، طاقة، ومزاج حلو. بس بردو لازم نعرف نتعامل معاها، عشان متحرقش ولا تغيب 😅",
    "جاهز؟ تعالى نبدأ من أول حاجة فعلًا... إنت ولد ولا بنت؟ 😏☀️"
];

function setIntroSana() {
    if (!sanaImage) return;
    const images = [
        { src: "assets/sana_welcome_01.png", reaction: "✨", mood: "sana-look-left" },
        { src: "assets/sana_thinking.png", reaction: "🤔", mood: "sana-thinking" },
        { src: "assets/sana_excited.png", reaction: "🔥", mood: "sana-excited" },
        { src: "assets/sana_flirty.png", reaction: "😏", mood: "sana-happy-bounce" },
        { src: "assets/sana_curious.png", reaction: "👀", mood: "sana-thinking" },
        { src: "assets/sana_thinking.png", reaction: "🤔", mood: "sana-thinking" },
        { src: "assets/sana_sun_01.png", reaction: "☀️", mood: "sana-look-right" },
        { src: "assets/sana_excited.png", reaction: "🔥", mood: "sana-excited" }
    ];
    const idx = Math.min(introStep, images.length - 1);
    const current = images[idx];
    changeSanaImage(sanaImage, current.src, current.reaction, current.mood);
}

function renderIntro() {
    if (!introText || !introNext) return;
    introNext.disabled = true;
    setIntroSana();
    typeSanaText(introMessages[introStep], introText, 34, function() {
        introNext.disabled = false;
        introNext.textContent = introStep === introMessages.length - 1 ? "نبدأ 😏" : "كمّل";
    });
}

if (introText && introNext) {
    renderIntro();
    introNext.addEventListener("click", function() {
        if (finishTypingImmediately()) {
            introText.textContent = introMessages[introStep];
            introNext.disabled = false;
            introNext.textContent = introStep === introMessages.length - 1 ? "نبدأ 😏" : "كمّل";
            return;
        }
        if (introStep < introMessages.length - 1) {
            introStep++;
            renderIntro();
        } else {
            introNext.classList.add('hidden');
            if (startButton) startButton.classList.remove('hidden');
            addPoints(10);
        }
    });
}

/* =========================================
   STEPS (الجنس أولاً)
========================================= */

const steps = [
    {
        key: "gender",
        question: "أول حاجة... أخاطبك إزاي؟ ولد ولا بنت؟ 😉",
        type: "gender"
    },
    {
        key: "name",
        question: "طيب دلوقتي الاسم بقى... اسمك إيه؟ 😊 (هيبقى عندي في السجلات الذهبية)",
        type: "text",
        label: "اسمك",
        placeholder: "اكتب اسمك هنا"
    },
    {
        key: "age",
        question: "حلو يا ${name} 😄 سنك كام؟ (مش هقول لحد 😂)",
        type: "number",
        label: "العمر",
        placeholder: "مثال: 23",
        unit: "سنة"
    },
    {
        key: "weight",
        question: "ووزنك تقريبًا كام يا ${name}؟ الرقم مش حكم عليك، ده مجرد جزء من الصورة.",
        type: "number",
        label: "الوزن",
        placeholder: "مثال: 80",
        unit: "كجم"
    },
    {
        key: "height",
        question: "وطولك كام؟ 😏 عايزة أعرف أتعامل مع صاحب القامة دي إزاي.",
        type: "number",
        label: "الطول",
        placeholder: "مثال: 175",
        unit: "سم"
    },
    {
        key: "country",
        question: "إنت من أنهي بلد يا ${name}؟ 🌍 الشمس عندك مش شرط تكون زي الشمس عند حد تاني.",
        type: "text",
        label: "البلد",
        placeholder: "مثال: مصر"
    },
    {
        key: "skinTone",
        question: "وصلنا لواحدة مهمة ☀️ بشرتك أقرب لأنهي درجة؟ اختار الأقرب ليك (مقياس فيتزباتريك الحقيقي)",
        type: "skin"
    },
    {
        key: "sunTime",
        question: "ولو هنخطط لوقتك مع الشمس... أنهي فترة تناسب يومك أكتر؟",
        type: "time"
    }
];

if (stepTotal) stepTotal.textContent = steps.length;

function personalizeQuestion(text) {
    return text.replace("${name}", user.name || "يا صديقي");
}

function setQuestionSana() {
    if (!questionSana) return;
    const step = steps[currentStep];
    const map = {
        gender: { src: "assets/sana_flirty.png", reaction: "😏", mood: "sana-happy-bounce" },
        name: { src: "assets/sana_curious.png", reaction: "👀", mood: "sana-thinking" },
        age: { src: "assets/sana_happy.png", reaction: "😄", mood: "sana-happy-bounce" },
        weight: { src: "assets/sana_calm.png", reaction: "💛", mood: "sana-look-left" },
        height: { src: "assets/sana_flirty.png", reaction: "😏", mood: "sana-look-right" },
        country: { src: "assets/sana_curious.png", reaction: "🌍", mood: "sana-thinking" },
        skinTone: { src: "assets/sana_thinking.png", reaction: "☀️", mood: "sana-thinking" },
        sunTime: { src: "assets/sana_sun_01.png", reaction: "☀️", mood: "sana-look-right" }
    };
    const selected = map[step.key];
    if (selected) {
        changeSanaImage(questionSana, selected.src, selected.reaction, selected.mood);
    }
}

function getGenderStyle() {
    if (user.gender === "female") {
        return { word: "يا جميلة", pronoun: "المؤنث", image: "assets/sana_flirty.png", reaction: "😏", mood: "sana-happy-bounce" };
    }
    return { word: "يا بطل", pronoun: "المذكر", image: "assets/sana_flirty.png", reaction: "😏", mood: "sana-happy-bounce" };
}

function renderStep() {
    const step = steps[currentStep];
    question.textContent = personalizeQuestion(step.question);
    if (progressBar) {
        progressBar.style.width = ((currentStep + 1) / steps.length * 100) + "%";
    }
    if (stepNumber) stepNumber.textContent = currentStep + 1;
    answerArea.innerHTML = "";
    nextButton.textContent = "نكمّل سوا 💛";
    nextButton.disabled = false;
    waitingForContinue = false;
    setQuestionSana();

    if (step.type === "gender") {
        answerArea.innerHTML = `
            <div class="gender-grid">
                <button type="button" class="gender-btn" data-gender="male">👨<br>ولد</button>
                <button type="button" class="gender-btn" data-gender="female">👩<br>بنت</button>
            </div>
        `;
        document.querySelectorAll(".gender-btn").forEach(button => {
            if (user.gender === button.dataset.gender) button.classList.add('active');
            button.addEventListener("click", function() {
                user.gender = this.dataset.gender;
                document.querySelectorAll(".gender-btn").forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const style = getGenderStyle();
                changeSanaImage(questionSana, style.image, style.reaction, style.mood);
                addPoints(2);
            });
        });
        return;
    }

    if (step.type === "skin") {
        answerArea.innerHTML = `
            <div class="skin-grid">
                <button type="button" class="skin-btn" data-skin="very-light">
                    <span class="skin-color" style="background:#f6d1b1"></span>
                    <small>فاتحة جدًا</small>
                </button>
                <button type="button" class="skin-btn" data-skin="light">
                    <span class="skin-color" style="background:#e9b88e"></span>
                    <small>فاتحة</small>
                </button>
                <button type="button" class="skin-btn" data-skin="medium">
                    <span class="skin-color" style="background:#c9895d"></span>
                    <small>متوسطة</small>
                </button>
                <button type="button" class="skin-btn" data-skin="dark">
                    <span class="skin-color" style="background:#925b3e"></span>
                    <small>سمراء</small>
                </button>
                <button type="button" class="skin-btn" data-skin="very-dark">
                    <span class="skin-color" style="background:#573728"></span>
                    <small>داكنة</small>
                </button>
            </div>
        `;
        document.querySelectorAll(".skin-btn").forEach(button => {
            if (user.skinTone === button.dataset.skin) button.classList.add('active');
            button.addEventListener("click", function() {
                user.skinTone = this.dataset.skin;
                document.querySelectorAll(".skin-btn").forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const color = this.querySelector('.skin-color')?.style.background;
                const skinChip = document.querySelector('.skin-chip i');
                if (skinChip && color) skinChip.style.background = color;
                changeSanaImage(questionSana, "assets/sana_thinking.png", "☀️", "sana-thinking");
                addPoints(3);
            });
        });
        return;
    }

    if (step.type === "time") {
        answerArea.innerHTML = `
            <div class="time-grid">
                <button type="button" class="time-btn" data-time="morning"><span class="time-symbol">🌅</span><span class="time-name">الصبح</span></button>
                <button type="button" class="time-btn" data-time="midday"><span class="time-symbol">☀️</span><span class="time-name">الظهر</span></button>
                <button type="button" class="time-btn" data-time="afternoon"><span class="time-symbol">🌤️</span><span class="time-name">بعد الظهر</span></button>
                <button type="button" class="time-btn" data-time="evening"><span class="time-symbol">🌇</span><span class="time-name">العصر</span></button>
            </div>
        `;
        document.querySelectorAll(".time-btn").forEach(button => {
            if (user.sunTime === button.dataset.time) button.classList.add('active');
            button.addEventListener("click", function() {
                user.sunTime = this.dataset.time;
                document.querySelectorAll(".time-btn").forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                changeSanaImage(questionSana, "assets/sana_sun_01.png", "☀️", "sana-look-right");
                addPoints(2);
            });
        });
        return;
    }

    answerArea.innerHTML = `
        <div class="field">
            <label>${step.label}</label>
            <input id="answerInput" type="${step.type}" inputmode="${step.type === "number" ? "numeric" : "text"}" placeholder="${step.placeholder}" value="${user[step.key] || ''}">
            ${step.unit ? `<div class="unit">${step.unit}</div>` : ""}
        </div>
    `;
    const input = document.getElementById("answerInput");
    if (input) {
        setTimeout(() => input.focus(), 50);
        input.addEventListener("keydown", event => {
            if (event.key === "Enter") nextButton.click();
        });
    }
}

/* =========================================
   SAVE & RESPONSE
========================================= */

function saveCurrentAnswer() {
    const step = steps[currentStep];
    if (step.type === "gender") {
        if (!user.gender) { alert("اختار الأول ولد ولا بنت 😏"); return false; }
        return true;
    }
    if (step.type === "skin") {
        if (!user.skinTone) { alert("اختار أقرب درجة لبشرتك الأول ☀️"); return false; }
        return true;
    }
    if (step.type === "time") {
        if (!user.sunTime) { alert("اختار الوقت اللي يناسب يومك الأول ☀️"); return false; }
        return true;
    }
    const input = document.getElementById("answerInput");
    if (!input) return false;
    const value = input.value.trim();
    if (!value) { alert("اكتبلي الإجابة الأول 😊"); input.focus(); return false; }
    user[step.key] = value;
    return true;
}

function getResponse(step) {
    const name = user.name || "يا صديقي";
    const female = user.gender === "female";
    const genderWord = female ? "يا جميلة" : "يا بطل";

    if (step.key === "gender") {
        changeSanaImage(questionSana, "assets/sana_flirty.png", female ? "😏" : "🔥", "sana-happy-bounce");
        return female ? "تمام يا جميلة 😏 من هنا هكلمك بصيغة المؤنث... كده اتفقنا." : "تمام يا بطل 😏 من هنا هكلمك بصيغة المذكر... كده فهمت اللعبة.";
    }
    if (step.key === "name") {
        changeSanaImage(questionSana, "assets/sana_happy.png", "💛", "sana-happy-bounce");
        return female ? `تشرفت بيكي يا ${user.name} 💛 خلاص كده الاسم دخل عند سنا رسمي.` : `تشرفت بيك يا ${user.name} 💛 خلاص كده الاسم دخل عند سنا رسمي.`;
    }
    if (step.key === "age") {
        changeSanaImage(questionSana, "assets/sana_curious.png", "😄", "sana-thinking");
        return `تمام ${genderWord} 😄 ${Number(user.age)} سنة واتسجلوا. لسه الصورة بتتكوّن عندي واحدة واحدة.`;
    }
    if (step.key === "weight") {
        changeSanaImage(questionSana, "assets/sana_calm.png", "💛", "sana-look-left");
        return `وصلت يا ${name} 💛 ${user.weight} كجم. الرقم ده لوحده مش هيحكم على أي حاجة.`;
    }
    if (step.key === "height") {
        changeSanaImage(questionSana, "assets/sana_flirty.png", "😏", "sana-look-right");
        let extra = "";
        if (Number(user.height) >= 185) extra = " وبالمناسبة... الطول ده محتاج شاشة أطول شوية 😂";
        else if (Number(user.height) >= 175) extra = " تمام يا طويل 😏";
        return `تمام يا ${name} 🌱 ${user.height} سم اتسجلت.${extra}`;
    }
    if (step.key === "country") {
        changeSanaImage(questionSana, "assets/sana_curious.png", "🌍", "sana-thinking");
        return `وصلت يا ${name} 🌍 سجلت ${user.country}. والمكان ده هيبقى مهم جدًا لما نبدأ نقرأ الشمس الحقيقية.`;
    }
    if (step.key === "skinTone") {
        changeSanaImage(questionSana, "assets/sana_thinking.png", "☀️", "sana-thinking");
        return `تمام يا ${name} ☀️ درجة بشرتك دخلت الحساب. دلوقتي SunDose بدأ يفهم استجابتك للشمس بشكل أفضل.`;
    }
    if (step.key === "sunTime") {
        changeSanaImage(questionSana, "assets/sana_sun_01.png", "☀️", "sana-look-right");
        return `
            حلو يا ${name} ☀️ 
            كده خلصنا الطبقة الأولى من بياناتك. 
            دلوقتي عندي حاجة أهم...
            نشوف الشمس نفسها بدل ما نتوقعها.
            الشمس دي مش بس نور وحرارة، لأ دي مصدر فيتامين D ومزاج حلو.
            لكن كل واحد ليه جرعته حسب بشرته ووقته ومكانه.
            عشان كده SunDose بيقرأ الشمس الحقيقية عندك، مش بيخمن.
            جهّز نفسك... هنتحرك لمحطة الشمس!
        `;
    }
    return `تمام يا ${name} 💛 سجلت المعلومة.`;
}

/* =========================================
   NEXT BUTTON
========================================= */

nextButton.addEventListener("click", function() {
    if (isTyping) {
        finishTypingImmediately();
        nextButton.disabled = false;
        return;
    }
    if (waitingForContinue) {
        waitingForContinue = false;
        currentStep++;
        if (currentStep < steps.length) {
            renderStep();
        } else {
            showHabits();
        }
        return;
    }
    if (!saveCurrentAnswer()) return;
    const step = steps[currentStep];
    const response = getResponse(step);
    answerArea.innerHTML = "";
    waitingForContinue = true;
    nextButton.disabled = true;
    typeSanaText(response, question, 30, function() {
        nextButton.disabled = false;
    });
});

/* =========================================
   START
========================================= */

if (startButton) {
    startButton.addEventListener("click", function() {
        showPage(welcome);
        currentStep = 0;
        renderStep();
    });
}

/* =========================================
   HABITS
========================================= */

function showHabits() {
    showPage(habits);
    changeSanaImage(habitSana, "assets/sana_happy.png", "💛", "sana-happy-bounce");
    const name = user.name || "صديقي";
    habitMessage.textContent = `كده يا ${name} أنا عرفت الطبقة الأولى منك 💛 دلوقتي عندنا كذا حاجة نقدر نبنيها على بياناتك. بس أنا عندي فضول أعرف الشمس الأول ☀️`;
    const habitData = [
        { id: "sun", icon: "☀️", title: "جرعة الشمس", text: "المكان + UV + البشرة + الوقت." },
        { id: "water", icon: "💧", title: "شرب المياه", text: "هنبنيها من بياناتك ونشاطك." },
        { id: "exercise", icon: "🏃", title: "الحركة", text: "نشاط مناسب ليومك." },
        { id: "supplements", icon: "✦", title: "العلاج والمكملات", text: "تنظيم المعلومات بشكل آمن." }
    ];
    habitList.innerHTML = habitData.map(habit => `
        <div class="habit" data-habit="${habit.id}">
            <div class="icon">${habit.icon}</div>
            <b>${habit.title}</b>
            <p>${habit.text}</p>
        </div>
    `).join("");
    document.querySelectorAll(".habit").forEach(element => {
        element.addEventListener("click", function() {
            const selected = this.dataset.habit;
            document.querySelectorAll(".habit").forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            if (selected === "sun") {
                openSunLearn();
            } else {
                changeSanaImage(habitSana, "assets/sana_thinking.png", "💛", "sana-thinking");
                alert("هنفتح القسم ده بعد ما نخلص محطة الشمس ☀️");
            }
        });
    });
}

/* =========================================
   SUN EDUCATION
========================================= */

function openSunLearn() {
    showPage(sunLearn);
    changeSanaImage(learnSana, "assets/sana_sun_01.png", "☀️", "sana-look-right");
    const name = user.name || "يا صديقي";
    learnMessage.textContent = `
        بص يا ${name} ☀️ 
        أنا هشرحلك حاجة بسيطة عن الـUV.
        الـUV ده اختصار للأشعة فوق البنفسجية، وهي الأشعة اللي بتوصل للجلد من الشمس.
        مش حرارة الجو، لأ دي قوة الإشعاع.
        منظمة الصحة العالمية بتقول إن الرقم ده بيدل على قوة الأشعة، وكل ما زاد، كل ما خطر الحرق أو ضرر العين زاد.
        لما الـUV يكون 3 أو أكتر، بقى محتاج تحمي نفسك بواقي شمس أو تلبس قبعة.
        لكن مينفعش نخاف من الشمس خالص! هي مصدر فيتامين D وتحسين المزاج.
        عشان كده سنا هنا عشان تقولك إمتى تاخد جرعتك بأمان.
    `;
    if (startSunAnalysis) startSunAnalysis.textContent = "يلا نشوف شمسك الحقيقية ☀️";
}

if (startSunAnalysis) {
    startSunAnalysis.addEventListener("click", function() {
        openSunDose();
    });
}
if (backFromLearn) {
    backFromLearn.addEventListener("click", function() {
        showHabits();
    });
}

/* =========================================
   OPEN SUN DOSE
========================================= */

function openSunDose() {
    showPage(sunDose);
    changeSanaImage(sunSana, "assets/sana_sun_01.png", "☀️", "sana-look-right");
    const name = user.name || "صديقي";
    sunMessage.textContent = `أهو كده يا ${name} ☀️ دلوقتي بقى دوري الحقيقي. هآخد بياناتك، وأشوف الشمس عند مكانك، وبعدها أركّب الصورة كلها مع بعض.`;
    updateSunUserData();
}

/* =========================================
   USER DATA
========================================= */

function updateSunUserData() {
    const skinNames = {
        "very-light": "فاتحة جدًا",
        "light": "فاتحة",
        "medium": "متوسطة",
        "dark": "سمراء",
        "very-dark": "داكنة"
    };
    const timeNames = {
        morning: "الصبح",
        midday: "الظهر",
        afternoon: "بعد الظهر",
        evening: "العصر"
    };
    if (sunSkinValue) sunSkinValue.textContent = skinNames[user.skinTone] || "—";
    if (sunTimeValue) sunTimeValue.textContent = timeNames[user.sunTime] || "—";
    if (sunLocationValue) sunLocationValue.textContent = "غير محدد";
    if (uvValue) uvValue.textContent = "—";
    const skinColors = {
        "very-light": "#f6d1b1",
        "light": "#e9b88e",
        "medium": "#c9895d",
        "dark": "#925b3e",
        "very-dark": "#573728"
    };
    const skinChip = document.querySelector('.skin-chip i');
    if (skinChip && skinColors[user.skinTone]) {
        skinChip.style.background = skinColors[user.skinTone];
    }
}

/* =========================================
   LOCATION
========================================= */

if (locationButton) {
    locationButton.addEventListener("click", requestLocation);
}

function requestLocation() {
    if (!navigator.geolocation) {
        showLocationError("المتصفح ده مش بيدعم تحديد الموقع.");
        return;
    }
    locationButton.disabled = true;
    locationButton.textContent = "📍 سنا بتحدد مكانك...";
    sunStatus.textContent = "بنحدد موقعك الحقيقي...";
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            loadSunData(lat, lon);
        },
        error => {
            console.error("SunDose location:", error);
            showLocationError("محتاجين إذن الموقع عشان سنا تقرأ الشمس الحقيقية عندك.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
}

/* =========================================
   WEATHER + UV
========================================= */

async function loadSunData(latitude, longitude) {
    sunStatus.textContent = "سنا بتقرأ الشمس والطقس...";
    analysisTitle.textContent = "بنحلل البيانات";
    analysisText.textContent = "الموقع وصل. دلوقتي بنجمع UV والحرارة والنهار والشروق والغروب.";
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,uv_index,is_day,cloud_cover&hourly=uv_index,temperature_2m,cloud_cover&daily=sunrise,sunset,uv_index_max&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather API error");
        const data = await response.json();
        sunData = data;
        const uv = Number(data.current?.uv_index ?? 0);
        const temperature = Number(data.current?.temperature_2m ?? 0);
        const isDay = Number(data.current?.is_day ?? 0);
        const cloudCover = Number(data.current?.cloud_cover ?? 0);
        const uvMax = Number(data.daily?.uv_index_max?.[0] ?? uv);
        updateSunResult(latitude, longitude, uv, temperature, isDay, cloudCover, uvMax);
    } catch (error) {
        console.error("SunDose API:", error);
        sunStatus.textContent = "تعذر قراءة بيانات الشمس";
        analysisTitle.textContent = "مفيش قراءة حالية";
        analysisText.textContent = "حصلت مشكلة في الاتصال ببيانات الطقس. جرّب تاني بعد لحظات.";
        analysisIcon.textContent = "🌥️";
        locationButton.disabled = false;
        locationButton.textContent = "🔄 المحاولة مرة تانية";
    }
}

/* =========================================
   SUN RESULT (مع كل الإضافات)
========================================= */

function updateSunResult(latitude, longitude, uv, temperature, isDay, cloudCover, uvMax) {
    const roundedUV = Math.round(uv * 10) / 10;
    if (sunLocationValue) sunLocationValue.textContent = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    if (uvValue) uvValue.textContent = roundedUV.toString();

    if (!isDay) {
        sunStatus.textContent = "الشمس دلوقتي تحت الأفق 🌙";
        analysisTitle.textContent = "مفيش شمس دلوقتي";
        analysisText.textContent = "وده بالظبط اللي كنا عايزين نعرفه. SunDose مش هيخمن جرعة بالليل؛ هنستنى نافذة شمس فعلية.";
        analysisIcon.textContent = "🌙";
        doseResult.classList.add('hidden');
        doseMeterFill.style.width = "0%";
        const name = user.name || "صديقي";
        sunMessage.textContent = `لقيتها يا ${name} 🌙 الشمس مش موجودة دلوقتي، وده أحسن من أي تخمين. SunDose شاف الحقيقة وقالك الحقيقة.`;
        changeSanaImage(sunSana, "assets/sana_calm.png", "🌙", "sana-look-left");
        if (goToHealthPortalBtn) goToHealthPortalBtn.classList.add('hidden');
        // إخفاء الإضافات
        document.getElementById('prosCons')?.classList.add('hidden');
        document.getElementById('advancedTips')?.classList.add('hidden');
        document.getElementById('extraActions')?.classList.add('hidden');
        return;
    }

    // تصنيف حسب WHO
    if (uv < 3) {
        sunStatus.textContent = `UV هادي • ${temperature}°`;
        analysisTitle.textContent = "الشمس هادية ☀️";
        analysisText.textContent = `الـUV دلوقتي ${roundedUV}. الرقم منخفض نسبيًا، وسنا هتستخدم باقي بياناتك بدل ما تعتمد على UV لوحده.`;
        analysisIcon.textContent = "🌤️";
    } else if (uv < 6) {
        sunStatus.textContent = `UV متوسط • ${temperature}°`;
        analysisTitle.textContent = "الشمس نشطة ☀️";
        analysisText.textContent = `الـUV دلوقتي ${roundedUV}. هنا بقى بيانات البشرة والوقت والمكان تبدأ تفرق في القراءة.`;
        analysisIcon.textContent = "☀️";
    } else if (uv < 8) {
        sunStatus.textContent = `UV مرتفع • ${temperature}°`;
        analysisTitle.textContent = "الشمس قوية ⚠️";
        analysisText.textContent = `الـUV ${roundedUV}، وده مستوى محتاج تعامل أكثر حذرًا مع التعرض المباشر.`;
        analysisIcon.textContent = "⚠️";
    } else {
        sunStatus.textContent = `UV شديد • ${temperature}°`;
        analysisTitle.textContent = "الشمس شديدة جدًا ⚠️";
        analysisText.textContent = `الـUV ${roundedUV}. SunDose هنا مش هيشجع على التعرض غير المحمي لمجرد الوصول لرقم معين.`;
        analysisIcon.textContent = "🚫";
    }

    calculateSunPlan(uv, cloudCover, uvMax);

    const name = user.name || "صديقي";
    if (uv >= 8) {
        sunMessage.textContent = `يا ${name} ⚠️ الـUV ${roundedUV}، وده شديد جداً. سنا بتنصحك متقعدش في الشمس دلوقتي خالص، الحماية أولاً.`;
        changeSanaImage(sunSana, "assets/sana_calm.png", "⚠️", "sana-thinking");
    } else if (uv >= 6) {
        sunMessage.textContent = `يا ${name} ☀️ الـUV ${roundedUV}، الشمس نشطة وقوية. لو هتتعرض، خليها دقايق معدودة وابقى محمي.`;
        changeSanaImage(sunSana, "assets/sana_excited.png", "☀️", "sana-happy-bounce");
    } else if (uv >= 3) {
        sunMessage.textContent = `يا ${name} ☀️ الـUV ${roundedUV}، الشمس معتدلة. ده وقت مناسب للتعرض لكن بلاش تهمل الحماية لو هتقعد فترة طويلة.`;
        changeSanaImage(sunSana, "assets/sana_happy.png", "☀️", "sana-look-right");
    } else {
        sunMessage.textContent = `يا ${name} ☀️ الـUV ${roundedUV}، الشمس هادية. ممكن تاخد جرعتك بأمان، لكن بردو خلي بالك من وقت التعرض حسب بشرتك.`;
        changeSanaImage(sunSana, "assets/sana_sun_01.png", "🌤️", "sana-look-left");
    }

    // إظهار الإضافات
    showExtraFeatures(uv);

    addCheck(uv);
    if (goToHealthPortalBtn) goToHealthPortalBtn.classList.remove('hidden');
    locationButton.classList.add('hidden');
    addPoints(10);
}

/* =========================================
   EXTRA FEATURES (جديد)
========================================= */

function showExtraFeatures(uv) {
    // إيجابيات وسلبيات
    const prosCons = document.getElementById('prosCons');
    if (prosCons) {
        prosCons.classList.remove('hidden');
        const { pros, cons } = getProsAndCons(uv);
        document.getElementById('prosList').innerHTML = pros.map(p => `<li>${p}</li>`).join('');
        document.getElementById('consList').innerHTML = cons.map(c => `<li>${c}</li>`).join('');
    }

    // نصائح متقدمة
    const tipsDiv = document.getElementById('advancedTips');
    if (tipsDiv) {
        tipsDiv.classList.remove('hidden');
        const tips = getAdvancedTips(uv, user.skinTone);
        document.getElementById('tipsList').innerHTML = tips.map(t => `<p>${t}</p>`).join('');
    }

    // أزرار إضافية
    const extraActions = document.getElementById('extraActions');
    if (extraActions) {
        extraActions.classList.remove('hidden');
    }

    // حفظ السجل
    let status = 'safe';
    if (uv >= 8) status = 'danger';
    else if (uv >= 3) status = 'warning';
    const minutes = parseInt(doseMinutes?.textContent) || 0;
    saveExposureRecord(uv, minutes, status);
}

function getProsAndCons(uv) {
    const pros = [];
    const cons = [];

    pros.push('☀️ تحفيز إنتاج فيتامين D الضروري للعظام والمناعة');
    pros.push('😊 تحسين المزاج وزيادة هرمون السيروتونين');
    pros.push('💤 تنظيم دورة النوم والاستيقاظ');
    pros.push('❤️ تحسين صحة القلب والدورة الدموية');

    if (uv < 3) {
        pros.push('✅ التعرض آمن وطويل نسبياً');
    } else if (uv < 6) {
        pros.push('⏳ التعرض القصير مفيد، بلاش تطويل');
    } else {
        pros.push('⚠️ حتى مع الفوائد، الحماية أولاً');
    }

    if (uv < 3) {
        cons.push('لا توجد تحذيرات كبيرة، لكن لسه محتاج ترطب');
    } else if (uv < 6) {
        cons.push('⚠️ خطر حروق الشمس بعد 20 دقيقة للبشرة الفاتحة');
        cons.push('🧴 احتاج واقي شمس SPF 30+');
        cons.push('👕 لبس قبعة ونظارة شمسية');
    } else if (uv < 8) {
        cons.push('🚫 خطر حروق سريع خلال 10-15 دقيقة');
        cons.push('🧴 واقي شمس SPF 50 ضروري');
        cons.push('⏰ تجنب التعرض بين 10ص و 4م');
        cons.push('👕 ملابس تغطي الذراعين والساقين');
    } else {
        cons.push('🚫 خطر شديد، تجنب التعرض المباشر تماماً');
        cons.push('🧴 واقي شمس SPF 50+ كل ساعتين');
        cons.push('⏰ التعرض فقط قبل 10ص أو بعد 4م');
        cons.push('👕 ملابس كاملة التغطية وقبعة ونظارة');
    }

    return { pros, cons };
}

function getAdvancedTips(uv, skinTone) {
    const tips = [];
    const skinNames = {
        'very-light': 'فاتحة جداً',
        'light': 'فاتحة',
        'medium': 'متوسطة',
        'dark': 'سمراء',
        'very-dark': 'داكنة'
    };
    const skin = skinNames[skinTone] || 'غير معروفة';

    tips.push(`🔹 بشرتك ${skin}، وده بيأثر على مدة التعرض الآمنة.`);
    
    if (uv < 3) {
        tips.push(`🔹 التعرض ${uv < 1 ? '30' : '25'} دقيقة آمن لبشرتك`);
    } else if (uv < 6) {
        tips.push(`🔹 التعرض ${uv < 5 ? '18' : '12'} دقيقة مناسب لبشرتك`);
    } else if (uv < 8) {
        tips.push(`🔹 التعرض ${uv < 7 ? '7' : '5'} دقايق كحد أقصى لبشرتك`);
    } else {
        tips.push('🔹 التعرض المباشر غير آمن لبشرتك حالياً');
    }

    tips.push('🕐 أوقات الذروة: 10 صباحاً - 4 عصراً (تجنبها قدر الإمكان)');
    tips.push('🧴 واقي الشمس ضروري عند UV 3 أو أكثر');
    tips.push('👕 الملابس الفاتحة والفضفاضة تحمي أفضل');
    tips.push('💧 اشرب ماء كافي قبل وبعد التعرض للشمس');
    tips.push('🕶️ نظارة شمسية تحمي عينيك من الأشعة الضارة');

    return tips;
}

/* =========================================
   HISTORY (سجل التعرض)
========================================= */

let exposureHistory = JSON.parse(localStorage.getItem('sundose_history')) || [];

function saveExposureRecord(uv, minutes, status, date = new Date()) {
    const record = {
        date: date.toISOString(),
        uv: uv,
        minutes: minutes,
        status: status,
        temperature: sunData?.current?.temperature_2m || '—'
    };
    exposureHistory.push(record);
    if (exposureHistory.length > 30) {
        exposureHistory = exposureHistory.slice(-30);
    }
    localStorage.setItem('sundose_history', JSON.stringify(exposureHistory));
}

function renderHistory() {
    const list = document.getElementById('historyList');
    if (!list) return;
    
    if (exposureHistory.length === 0) {
        list.innerHTML = `<div class="history-item" style="justify-content:center;color:#9a8d7d;">مفيش سجلات للتعرض للشمس حتى الآن ☀️</div>`;
        return;
    }

    const recent = [...exposureHistory].reverse().slice(0, 10);
    
    list.innerHTML = recent.map(record => {
        const date = new Date(record.date);
        const dateStr = date.toLocaleDateString('ar-EG');
        const timeStr = date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        const statusClass = record.status === 'safe' ? 'safe' : record.status === 'warning' ? 'warning' : 'danger';
        const statusText = record.status === 'safe' ? 'آمن ✅' : record.status === 'warning' ? 'تنبيه ⚠️' : 'خطر 🚫';
        
        return `
            <div class="history-item">
                <div>
                    <div class="date">${dateStr}</div>
                    <div class="time">${timeStr}</div>
                </div>
                <div>
                    <div class="uv">UV ${record.uv}</div>
                    ${record.minutes ? `<div class="time">${record.minutes} دقيقة</div>` : ''}
                </div>
                <span class="status ${statusClass}">${statusText}</span>
            </div>
        `;
    }).join('');

    const stats = document.getElementById('historyStats');
    if (stats) {
        const total = exposureHistory.length;
        const avgUV = (exposureHistory.reduce((sum, r) => sum + r.uv, 0) / total).toFixed(1);
        const safeDays = exposureHistory.filter(r => r.status === 'safe').length;
        const warningDays = exposureHistory.filter(r => r.status === 'warning').length;
        const dangerDays = exposureHistory.filter(r => r.status === 'danger').length;
        
        stats.innerHTML = `
            <div class="stat-box"><span class="number">${total}</span><span class="label">إجمالي الأيام</span></div>
            <div class="stat-box"><span class="number">${avgUV}</span><span class="label">متوسط UV</span></div>
            <div class="stat-box"><span class="number">${safeDays}</span><span class="label">أيام آمنة</span></div>
            <div class="stat-box"><span class="number">${warningDays}</span><span class="label">أيام تنبيه</span></div>
            <div class="stat-box"><span class="number">${dangerDays}</span><span class="label">أيام خطر</span></div>
            <div class="stat-box"><span class="number">${Math.round(safeDays / total * 100)}%</span><span class="label">نسبة الأمان</span></div>
        `;
    }
}

/* =========================================
   FORECAST (توقعات UV)
========================================= */

async function loadForecast(latitude, longitude) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=uv_index_max&timezone=auto&forecast_days=7`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Forecast API error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Forecast error:', error);
        return null;
    }
}

function renderForecast(forecastData) {
    const list = document.getElementById('forecastList');
    const advice = document.getElementById('forecastAdvice');
    if (!list) return;

    if (!forecastData || !forecastData.daily) {
        list.innerHTML = `<div style="text-align:center;color:#9a8d7d;">مفيش بيانات توقعات متاحة حالياً</div>`;
        return;
    }

    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const today = new Date();
    
    const items = forecastData.daily.time.map((date, index) => {
        const uvMax = forecastData.daily.uv_index_max[index];
        const d = new Date(date);
        const dayName = index === 0 ? 'اليوم' : days[d.getDay()];
        const status = uvMax < 3 ? 'safe' : uvMax < 6 ? 'warning' : 'danger';
        const statusText = uvMax < 3 ? 'آمن ✅' : uvMax < 6 ? 'تنبيه ⚠️' : 'خطر 🚫';
        
        return `
            <div class="forecast-item">
                <div class="day">${dayName}</div>
                <div class="uv-forecast">${uvMax}</div>
                <span class="status ${status}">${statusText}</span>
            </div>
        `;
    }).join('');

    list.innerHTML = items;

    const avgUV = forecastData.daily.uv_index_max.reduce((a, b) => a + b, 0) / forecastData.daily.uv_index_max.length;
    let adviceText = '';
    if (avgUV < 3) {
        adviceText = '🌤️ الأيام القادمة هادية، ده وقت مناسب للتعرض للشمس بأمان. استمتع بالشمس وخلّي بالك من وقت التعرض حسب بشرتك.';
    } else if (avgUV < 6) {
        adviceText = '☀️ الأيام القادمة فيها UV متوسط، خلي تعرضك قصير ومحمي. متنساش واقي الشمس والقبعة.';
    } else {
        adviceText = '⚠️ الأيام القادمة فيها UV مرتفع، خلي بالك جداً. حاول تتجنب التعرض المباشر في أوقات الذروة (10ص-4م) واستخدم واقي شمس باستمرار.';
    }
    advice.innerHTML = `<p>💡 ${adviceText}</p>`;
}

/* =========================================
   SHARE REPORT
========================================= */

function generateReport(uv, minutes, status, skinTone) {
    const skinNames = {
        'very-light': 'فاتحة جداً',
        'light': 'فاتحة',
        'medium': 'متوسطة',
        'dark': 'سمراء',
        'very-dark': 'داكنة'
    };
    const skin = skinNames[skinTone] || 'غير معروفة';
    const date = new Date().toLocaleDateString('ar-EG');
    const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const statusText = status === 'safe' ? 'آمن ✅' : status === 'warning' ? 'تنبيه ⚠️' : 'خطر 🚫';
    
    return `
☀️ تقرير SunDose - ${date}

📊 بيانات اليوم:
• UV Index: ${uv}
• الوقت: ${time}
• بشرتك: ${skin}
• الجرعة الموصى بها: ${minutes || 'غير متاحة'} دقيقة
• الحالة: ${statusText}

💡 نصائح:
${status === 'safe' ? '• التعرض آمن، استمتع بالشمس بحذر' : status === 'warning' ? '• خلي تعرضك قصير واستخدم واقي شمس' : '• تجنب التعرض المباشر، الحماية أولاً'}

---
تم إنشاء التقرير بواسطة SunDose ☀️
صديقك الصحي للشمس
    `;
}

/* =========================================
   ربط الأزرار الجديدة
========================================= */

// زر عرض السجل
document.getElementById('viewHistoryBtn')?.addEventListener('click', function() {
    renderHistory();
    showPage(document.getElementById('historyLog'));
});

// زر عرض التوقعات
document.getElementById('viewForecastBtn')?.addEventListener('click', function() {
    if (sunData) {
        const lat = parseFloat(sunLocationValue?.textContent?.split(',')[0]) || 0;
        const lon = parseFloat(sunLocationValue?.textContent?.split(',')[1]) || 0;
        loadForecast(lat, lon).then(data => {
            renderForecast(data);
            showPage(document.getElementById('forecastView'));
        });
    } else {
        alert('محتاج تحدد موقعك الأول عشان نشوف التوقعات ☀️');
    }
});

// زر مشاركة التقرير
document.getElementById('shareReportBtn')?.addEventListener('click', function() {
    const uv = parseFloat(uvValue?.textContent) || 0;
    const minutes = doseMinutes?.textContent || '—';
    let status = 'safe';
    if (uv >= 8) status = 'danger';
    else if (uv >= 3) status = 'warning';
    const report = generateReport(uv, minutes, status, user.skinTone);
    
    if (navigator.share) {
        navigator.share({
            title: 'تقرير SunDose اليومي ☀️',
            text: report,
        }).catch(() => {});
    } else {
        navigator.clipboard?.writeText(report).then(() => {
            alert('✅ تم نسخ التقرير للحافظة، شاركه مع مين تحب!');
        }).catch(() => {
            alert('📝 التقرير:\n\n' + report);
        });
    }
});

// الرجوع من السجل
document.getElementById('backFromHistory')?.addEventListener('click', function() {
    showPage(document.getElementById('sunDose'));
});

// الرجوع من التوقعات
document.getElementById('backFromForecast')?.addEventListener('click', function() {
    showPage(document.getElementById('sunDose'));
});

/* =========================================
   SUN PLAN
========================================= */

function calculateSunPlan(uv, cloudCover, uvMax) {
    const skinFactor = {
        "very-light": 0.55,
        "light": 0.70,
        "medium": 0.90,
        "dark": 1.15,
        "very-dark": 1.35
    };
    const selectedSkin = skinFactor[user.skinTone] || 0.90;

    let baseMinutes;
    if (uv <= 0) baseMinutes = 0;
    else if (uv < 1) baseMinutes = 30;
    else if (uv < 3) baseMinutes = 25;
    else if (uv < 5) baseMinutes = 18;
    else if (uv < 7) baseMinutes = 12;
    else if (uv < 9) baseMinutes = 7;
    else baseMinutes = 0;

    let calculated = baseMinutes * selectedSkin;
    const cloudFactor = 1 - (Math.min(cloudCover, 80) / 100 * 0.15);
    calculated *= cloudFactor;
    if (user.sunTime === "midday") calculated *= 0.80;
    else if (user.sunTime === "morning" || user.sunTime === "evening") calculated *= 1.10;
    calculated = Math.round(calculated);

    if (uv >= 8) calculated = 0;

    const meterPercent = Math.min(100, Math.max(0, (uv / 11) * 100));
    if (doseMeterFill) doseMeterFill.style.width = `${meterPercent}%`;

    if (!doseResult || !doseMinutes || !doseTitle || !doseText) return;

    if (uv >= 8) {
        doseResult.classList.remove('hidden');
        doseMinutes.textContent = "—";
        doseTitle.textContent = "سنا مش هتديك وقت تعرض مباشر";
        doseText.textContent = "الـUV شديد جدًا. الأولوية هنا للحماية والظل، مش مطاردة رقم بالدقائق.";
        return;
    }
    if (calculated <= 0) {
        doseResult.classList.add('hidden');
        return;
    }

    doseResult.classList.remove('hidden');
    doseMinutes.textContent = calculated;

    if (uv < 3) {
        doseTitle.textContent = "نافذة هادئة نسبيًا ☀️";
        doseText.textContent = "دي قراءة تخطيطية مبنية على بياناتك الحالية. لو هدفك فيتامين D أو عندك حالة خاصة، ده محتاج تقييم طبي منفصل.";
    } else if (uv < 6) {
        doseTitle.textContent = "نافذة قصيرة ومركزة ☀️";
        doseText.textContent = "الشمس نشطة، فـSunDose بيقلل الوقت التخطيطي بدل ما يدي نفس الرقم لكل الناس.";
    } else {
        doseTitle.textContent = "نافذة شديدة الحذر ⚠️";
        doseText.textContent = "الـUV مرتفع. الرقم هنا للتخطيط فقط، والحماية أهم من محاولة إكمال وقت معين.";
    }
}

/* =========================================
   LOCATION ERROR
========================================= */

function showLocationError(message) {
    sunStatus.textContent = "الموقع محتاج إذن";
    analysisTitle.textContent = "محتاج موقعك 📍";
    analysisText.textContent = message;
    analysisIcon.textContent = "📍";
    locationButton.disabled = false;
    locationButton.textContent = "📍 تحديد موقعي وابدأ التحليل";
}

/* =========================================
   BACK & PORTAL
========================================= */

if (backToHabits) {
    backToHabits.addEventListener("click", function() {
        showHabits();
    });
}

if (goToHealthPortalBtn) {
    goToHealthPortalBtn.addEventListener("click", function() {
        showPage(healthPortal);
        portalGreeting.textContent = `أهلاً بك في بوابتك الصحية 💛`;
        portalSubGreeting.textContent = `هنا هتلاقي كل حاجة محتاجها عشان تفضل في أمان مع الشمس`;
        updateStreak();
        const now = new Date();
        const hour = now.getHours();
        let best = "";
        if (hour < 10) best = "قبل 10 صباحاً";
        else if (hour < 16) best = "بعد 4 عصراً";
        else best = "غداً قبل 10 صباحاً";
        document.getElementById('statBestTime').textContent = best;
        changeSanaImage(portalSana, "assets/sana_happy.png", "💛", "sana-happy-bounce");
    });
}

if (backFromPortal) {
    backFromPortal.addEventListener("click", function() {
        showPage(sunDose);
    });
}

/* =========================================
   REMINDER
========================================= */

document.getElementById('setReminder')?.addEventListener('click', function() {
    const time = document.getElementById('reminderTime').value;
    if (!time) return alert('حدد وقت التذكير');
    localStorage.setItem('sundose_reminder', time);
    document.getElementById('reminderStatus').textContent = `التذكير مفعّل عند الساعة ${time} ⏰`;
    document.getElementById('reminderStatus').classList.add('active');
    alert(`سنا هتذكرك كل يوم الساعة ${time} تاخد جرعتك من الشمس ☀️`);
});

const savedReminder = localStorage.getItem('sundose_reminder');
if (savedReminder) {
    document.getElementById('reminderTime').value = savedReminder;
    document.getElementById('reminderStatus').textContent = `التذكير مفعّل عند الساعة ${savedReminder} ⏰`;
    document.getElementById('reminderStatus').classList.add('active');
}

/* =========================================
   SAFETY / DEBUG
========================================= */

if (!startButton) console.error("SunDose: startButton غير موجود");
if (!nextButton) console.error("SunDose: nextButton غير موجود");
if (!habitList) console.error("SunDose: habitList غير موجود");
