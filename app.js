/* =========================================
   SunDose ☀️ - النسخة النهائية الكاملة
   مع Sun Station المتطورة
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
let sunFactsLearned = JSON.parse(localStorage.getItem('sundose_facts_learned')) || 0;
let quizCompleted = false;

// جرعة الشمس اليومية
let todayDoseMinutes = parseInt(localStorage.getItem('sundose_today_dose')) || 0;
let dailyGoal = 20; // هدف يومي افتراضي (يتغير حسب البشرة)

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
        // إعادة ضبط الجرعة اليومية
        todayDoseMinutes = 0;
        localStorage.setItem('sundose_today_dose', '0');
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

function addSunDose(minutes) {
    todayDoseMinutes += minutes;
    localStorage.setItem('sundose_today_dose', todayDoseMinutes.toString());
    updateDoseDisplay();
}

function updateDoseDisplay() {
    const goal = getDailyGoal();
    const percent = Math.min(100, Math.round((todayDoseMinutes / goal) * 100));
    document.getElementById('doseFill').style.width = percent + '%';
    document.getElementById('doseProgressText').textContent = percent + '%';
    document.getElementById('doseMinutesToday').textContent = todayDoseMinutes;
    document.getElementById('doseGoal').textContent = goal;
}

function getDailyGoal() {
    // حسب لون البشرة
    const skinGoal = {
        'very-light': 15,
        'light': 18,
        'medium': 22,
        'dark': 28,
        'very-dark': 35
    };
    return skinGoal[user.skinTone] || 20;
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

// SVG Sana elements
const sanaSvg = document.getElementById("sanaSvg");
const questionSanaSvg = document.getElementById("questionSanaSvg");
const habitSanaSvg = document.getElementById("habitSanaSvg");
const learnSanaSvg = document.getElementById("learnSanaSvg");
const sunSanaSvg = document.getElementById("sunSanaSvg");
const portalSanaSvg = document.getElementById("portalSanaSvg");

/* =========================================
   STATE
========================================= */

let introStep = 0;
let currentStep = 0;
let isTyping = false;
let typingTimer = null;
let waitingForContinue = false;
let sunData = null;

// Quiz state
let quizData = [];
let quizIndex = 0;
let quizCorrect = 0;
let quizAnswered = false;

/* =========================================
   SUN FACTS (6 حقائق علمية + اختبار)
========================================= */

const sunFacts = [
    {
        icon: '🌅',
        fact: 'الضوء الصباحي مش مجرد إضاءة... جسمك بيستخدمه كإشارة لضبط إيقاعه اليومي. التعرض للضوء في الصباح يساعد على تحسين اليقظة نهاراً.',
        source: 'NIGMS'
    },
    {
        icon: '🦴',
        fact: 'جسمك يقدر يصنع فيتامين D لما جلدك يتعرض لـ UVB ☀️ فيتامين D مهم للعظام والعضلات وامتصاص الكالسيوم.',
        source: 'WHO'
    },
    {
        icon: '☀️',
        fact: 'UVB هو النوع المرتبط بتحفيز تصنيع فيتامين D، لكنه أيضًا السبب الرئيسي لحروق الشمس.',
        source: 'WHO'
    },
    {
        icon: '👀',
        fact: 'الأشعة فوق البنفسجية ممكن تضر العين مع التعرض الزائد، عشان كده النظارة الشمسية المناسبة مش مجرد شكل.',
        source: 'WHO'
    },
    {
        icon: '☁️',
        fact: 'الغيوم مش معناها إن UV اختفى ☁️ الأشعة فوق البنفسجية ممكن تظل موجودة حتى مع وجود السحب.',
        source: 'WHO'
    },
    {
        icon: '🧴',
        fact: 'منظمة الصحة العالمية بتوصي باتخاذ إجراءات حماية من الشمس عندما يكون UV Index = 3 أو أعلى.',
        source: 'WHO'
    }
];

const quizQuestions = [
    {
        question: 'لما UV يبقى 3 أو أكتر، إيه اللي المفروض نعمله؟',
        options: ['نقعد في الشمس عادي', 'نستخدم واقي شمس ونتحفظ', 'نلبس ملابس ثقيلة'],
        correct: 1,
        explanation: 'منظمة الصحة العالمية بتوصي بالحماية من الشمس لما UV = 3 أو أعلى.'
    },
    {
        question: 'أيهما يسبب حروق الشمس؟',
        options: ['UVA', 'UVB', 'كلاهما'],
        correct: 1,
        explanation: 'UVB هو النوع الرئيسي المسبب لحروق الشمس.'
    },
    {
        question: 'الغيوم تمنع الأشعة فوق البنفسجية تماماً؟',
        options: ['نعم، تمنعها كلها', 'لا، ممكن تخترق السحب', 'فقط في الشتاء'],
        correct: 1,
        explanation: 'الأشعة فوق البنفسجية ممكن تظل موجودة حتى مع وجود السحب.'
    }
];

function getTodayFact() {
    const day = sunFactsLearned % sunFacts.length;
    return sunFacts[day];
}

function showDailyFact() {
    const fact = getTodayFact();
    document.getElementById('factIcon').textContent = fact.icon;
    document.getElementById('factText').textContent = fact.fact;
    document.getElementById('factDay').textContent = 'اليوم ' + (sunFactsLearned + 1);
}

/* =========================================
   SANA EXPRESSIONS & ANIMATIONS (SVG)
========================================= */

function setSanaExpression(elementId, expression) {
    const container = document.getElementById(elementId);
    if (!container) return;
    const classes = ['sana-happy', 'sana-surprised', 'sana-thinking', 'sana-flirty', 'sana-calm', 'sana-excited', 'sana-wave', 'sana-sleeping'];
    classes.forEach(c => container.classList.remove(c));
    if (expression) container.classList.add('sana-' + expression);
}

function setSanaMood(elementId, moodClass, reaction = "") {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.classList.remove('sana-float', 'sana-look-left', 'sana-look-right', 'sana-happy-bounce', 'sana-thinking', 'sana-excited', 'sana-wave', 'sana-sleeping');
    if (moodClass) container.classList.add(moodClass);
    if (sanaReaction && reaction) {
        sanaReaction.textContent = reaction;
        sanaReaction.classList.remove('hidden');
    } else if (sanaReaction) {
        sanaReaction.classList.add('hidden');
    }
    let expr = 'happy';
    if (moodClass === 'sana-thinking') expr = 'thinking';
    else if (moodClass === 'sana-excited') expr = 'excited';
    else if (moodClass === 'sana-look-left' || moodClass === 'sana-look-right') expr = 'flirty';
    else if (moodClass === 'sana-wave') expr = 'wave';
    else if (moodClass === 'sana-sleeping') expr = 'sleeping';
    else expr = 'happy';
    setSanaExpression(elementId, expr);
}

function changeSanaImage(element, image, reaction = "", moodClass = "") {
    if (!element) return;
    setSanaMood(element.id, moodClass, reaction);
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
    if (page === sunDose) {
        showDailyFact();
        updateDoseDisplay();
    }
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
   INTRO
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
    if (!sanaSvg) return;
    const moods = [
        { mood: 'sana-look-left', reaction: '✨', expr: 'flirty' },
        { mood: 'sana-thinking', reaction: '🤔', expr: 'thinking' },
        { mood: 'sana-excited', reaction: '🔥', expr: 'excited' },
        { mood: 'sana-happy-bounce', reaction: '😏', expr: 'happy' },
        { mood: 'sana-thinking', reaction: '👀', expr: 'thinking' },
        { mood: 'sana-thinking', reaction: '🤔', expr: 'thinking' },
        { mood: 'sana-look-right', reaction: '☀️', expr: 'flirty' },
        { mood: 'sana-excited', reaction: '🔥', expr: 'excited' }
    ];
    const idx = Math.min(introStep, moods.length - 1);
    const current = moods[idx];
    setSanaMood('sanaSvg', current.mood, current.reaction);
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
   STEPS
========================================= */

const steps = [
    { key: "gender", question: "أول حاجة... أخاطبك إزاي؟ ولد ولا بنت؟ 😉", type: "gender" },
    { key: "name", question: "طيب دلوقتي الاسم بقى... اسمك إيه؟ 😊 (هيبقى عندي في السجلات الذهبية)", type: "text", label: "اسمك", placeholder: "اكتب اسمك هنا" },
    { key: "age", question: "حلو يا ${name} 😄 سنك كام؟ (مش هقول لحد 😂)", type: "number", label: "العمر", placeholder: "مثال: 23", unit: "سنة" },
    { key: "weight", question: "ووزنك تقريبًا كام يا ${name}؟ الرقم مش حكم عليك، ده مجرد جزء من الصورة.", type: "number", label: "الوزن", placeholder: "مثال: 80", unit: "كجم" },
    { key: "height", question: "وطولك كام؟ 😏 عايزة أعرف أتعامل مع صاحب القامة دي إزاي.", type: "number", label: "الطول", placeholder: "مثال: 175", unit: "سم" },
    { key: "country", question: "إنت من أنهي بلد يا ${name}؟ 🌍 الشمس عندك مش شرط تكون زي الشمس عند حد تاني.", type: "text", label: "البلد", placeholder: "مثال: مصر" },
    { key: "skinTone", question: "وصلنا لواحدة مهمة ☀️ بشرتك أقرب لأنهي درجة؟ اختار الأقرب ليك (مقياس فيتزباتريك الحقيقي)", type: "skin" },
    { key: "sunTime", question: "ولو هنخطط لوقتك مع الشمس... أنهي فترة تناسب يومك أكتر؟", type: "time" }
];

if (stepTotal) stepTotal.textContent = steps.length;

function personalizeQuestion(text) {
    return text.replace("${name}", user.name || "يا صديقي");
}

function setQuestionSana() {
    if (!questionSanaSvg) return;
    const step = steps[currentStep];
    const map = {
        gender: { mood: 'sana-happy-bounce', reaction: '😏', expr: 'happy' },
        name: { mood: 'sana-thinking', reaction: '👀', expr: 'thinking' },
        age: { mood: 'sana-happy-bounce', reaction: '😄', expr: 'happy' },
        weight: { mood: 'sana-look-left', reaction: '💛', expr: 'flirty' },
        height: { mood: 'sana-look-right', reaction: '😏', expr: 'flirty' },
        country: { mood: 'sana-thinking', reaction: '🌍', expr: 'thinking' },
        skinTone: { mood: 'sana-thinking', reaction: '☀️', expr: 'thinking' },
        sunTime: { mood: 'sana-look-right', reaction: '☀️', expr: 'flirty' }
    };
    const selected = map[step.key];
    if (selected) {
        setSanaMood('questionSanaSvg', selected.mood, selected.reaction);
        setSanaExpression('questionSanaSvg', selected.expr);
    }
}

function getGenderStyle() {
    if (user.gender === "female") {
        return { word: "يا جميلة", pronoun: "المؤنث", mood: 'sana-happy-bounce', reaction: '😏', expr: 'happy' };
    }
    return { word: "يا بطل", pronoun: "المذكر", mood: 'sana-happy-bounce', reaction: '😏', expr: 'happy' };
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
                setSanaMood('questionSanaSvg', style.mood, style.reaction);
                setSanaExpression('questionSanaSvg', style.expr);
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
                setSanaMood('questionSanaSvg', 'sana-thinking', '☀️');
                setSanaExpression('questionSanaSvg', 'thinking');
                dailyGoal = getDailyGoal();
                updateDoseDisplay();
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
                setSanaMood('questionSanaSvg', 'sana-look-right', '☀️');
                setSanaExpression('questionSanaSvg', 'flirty');
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
        setSanaMood('questionSanaSvg', 'sana-happy-bounce', female ? '😏' : '🔥');
        setSanaExpression('questionSanaSvg', 'happy');
        return female ? "تمام يا جميلة 😏 من هنا هكلمك بصيغة المؤنث... كده اتفقنا." : "تمام يا بطل 😏 من هنا هكلمك بصيغة المذكر... كده فهمت اللعبة.";
    }
    if (step.key === "name") {
        setSanaMood('questionSanaSvg', 'sana-happy-bounce', '💛');
        setSanaExpression('questionSanaSvg', 'happy');
        return female ? `تشرفت بيكي يا ${user.name} 💛 خلاص كده الاسم دخل عند سنا رسمي.` : `تشرفت بيك يا ${user.name} 💛 خلاص كده الاسم دخل عند سنا رسمي.`;
    }
    if (step.key === "age") {
        setSanaMood('questionSanaSvg', 'sana-thinking', '😄');
        setSanaExpression('questionSanaSvg', 'thinking');
        return `تمام ${genderWord} 😄 ${Number(user.age)} سنة واتسجلوا. لسه الصورة بتتكوّن عندي واحدة واحدة.`;
    }
    if (step.key === "weight") {
        setSanaMood('questionSanaSvg', 'sana-look-left', '💛');
        setSanaExpression('questionSanaSvg', 'flirty');
        return `وصلت يا ${name} 💛 ${user.weight} كجم. الرقم ده لوحده مش هيحكم على أي حاجة.`;
    }
    if (step.key === "height") {
        setSanaMood('questionSanaSvg', 'sana-look-right', '😏');
        setSanaExpression('questionSanaSvg', 'flirty');
        let extra = "";
        if (Number(user.height) >= 185) extra = " وبالمناسبة... الطول ده محتاج شاشة أطول شوية 😂";
        else if (Number(user.height) >= 175) extra = " تمام يا طويل 😏";
        return `تمام يا ${name} 🌱 ${user.height} سم اتسجلت.${extra}`;
    }
    if (step.key === "country") {
        setSanaMood('questionSanaSvg', 'sana-thinking', '🌍');
        setSanaExpression('questionSanaSvg', 'thinking');
        return `وصلت يا ${name} 🌍 سجلت ${user.country}. والمكان ده هيبقى مهم جدًا لما نبدأ نقرأ الشمس الحقيقية.`;
    }
    if (step.key === "skinTone") {
        setSanaMood('questionSanaSvg', 'sana-thinking', '☀️');
        setSanaExpression('questionSanaSvg', 'thinking');
        return `تمام يا ${name} ☀️ درجة بشرتك دخلت الحساب. دلوقتي SunDose بدأ يفهم استجابتك للشمس بشكل أفضل.`;
    }
    if (step.key === "sunTime") {
        setSanaMood('questionSanaSvg', 'sana-look-right', '☀️');
        setSanaExpression('questionSanaSvg', 'flirty');
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
    setSanaMood('habitSanaSvg', 'sana-happy-bounce', '💛');
    setSanaExpression('habitSanaSvg', 'happy');
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
                setSanaMood('habitSanaSvg', 'sana-thinking', '💛');
                setSanaExpression('habitSanaSvg', 'thinking');
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
    setSanaMood('learnSanaSvg', 'sana-look-right', '☀️');
    setSanaExpression('learnSanaSvg', 'flirty');
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
   OPEN SUN DOSE (المحطة)
========================================= */

function openSunDose() {
    showPage(sunDose);
    setSanaMood('sunSanaSvg', 'sana-look-right', '☀️');
    setSanaExpression('sunSanaSvg', 'flirty');
    const name = user.name || "صديقي";
    sunMessage.textContent = `أهو كده يا ${name} ☀️ دلوقتي بقى دوري الحقيقي. هآخد بياناتك، وأشوف الشمس عند مكانك، وبعدها أركّب الصورة كلها مع بعض.`;
    updateSunUserData();
    showDailyFact();
    updateDoseDisplay();
    updateTimeline();
    loadSavedData();
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
    document.getElementById('metricSkin').textContent = skinNames[user.skinTone] || "—";
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
    dailyGoal = getDailyGoal();
    updateDoseDisplay();
}

/* =========================================
   SUN STATUS & METRICS
========================================= */

function updateSunStatusLive(uv, isDay, sunrise, sunset) {
    const iconEl = document.getElementById('statusIcon');
    const textEl = document.getElementById('statusText');
    const timeEl = document.getElementById('statusTime');
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    // تحويل أوقات الشروق والغروب
    let sunriseMin = 0, sunsetMin = 0;
    if (sunrise) {
        const [h, m] = sunrise.split(':').map(Number);
        sunriseMin = h * 60 + m;
    }
    if (sunset) {
        const [h, m] = sunset.split(':').map(Number);
        sunsetMin = h * 60 + m;
    }

    // تحديد الحالة
    let icon = '☀️';
    let text = 'الشمس مشرقة';
    let sanaMood = 'sana-happy-bounce';
    let sanaReaction = '☀️';
    let sanaExpr = 'happy';

    if (!isDay) {
        icon = '🌙';
        text = 'الشمس تحت الأفق 🌙';
        sanaMood = 'sana-sleeping';
        sanaReaction = '🌙';
        sanaExpr = 'sleeping';
    } else if (currentTime < sunriseMin - 30) {
        icon = '🌅';
        text = 'الشروق قريب 🌅';
        sanaMood = 'sana-thinking';
        sanaReaction = '🌅';
        sanaExpr = 'thinking';
    } else if (currentTime >= sunriseMin - 30 && currentTime < sunriseMin + 30) {
        icon = '🌅';
        text = 'الشمس بتشرق ☀️';
        sanaMood = 'sana-excited';
        sanaReaction = '🌅';
        sanaExpr = 'excited';
    } else if (currentTime > sunsetMin - 30 && currentTime < sunsetMin) {
        icon = '🌇';
        text = 'الغروب قريب 🌇';
        sanaMood = 'sana-thinking';
        sanaReaction = '🌇';
        sanaExpr = 'thinking';
    } else if (currentTime >= sunsetMin) {
        icon = '🌙';
        text = 'الشمس تحت الأفق 🌙';
        sanaMood = 'sana-sleeping';
        sanaReaction = '🌙';
        sanaExpr = 'sleeping';
    } else if (uv < 3) {
        icon = '🌤️';
        text = 'شمس خفيفة ☀️';
        sanaMood = 'sana-look-left';
        sanaReaction = '🌤️';
        sanaExpr = 'calm';
    } else if (uv < 6) {
        icon = '☀️';
        text = 'شمس نشطة ☀️';
        sanaMood = 'sana-happy-bounce';
        sanaReaction = '☀️';
        sanaExpr = 'happy';
    } else if (uv < 8) {
        icon = '☀️';
        text = 'شمس قوية ⚠️';
        sanaMood = 'sana-thinking';
        sanaReaction = '⚠️';
        sanaExpr = 'thinking';
    } else {
        icon = '☀️';
        text = 'شمس شديدة 🚫';
        sanaMood = 'sana-thinking';
        sanaReaction = '🚫';
        sanaExpr = 'thinking';
    }

    iconEl.textContent = icon;
    textEl.textContent = text;
    timeEl.textContent = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    
    // تحديث سنا حسب الحالة
    setSanaMood('sunSanaSvg', sanaMood, sanaReaction);
    setSanaExpression('sunSanaSvg', sanaExpr);
}

function updateMetrics(uv, temp, sunrise, sunset, cloudCover) {
    document.getElementById('metricUV').textContent = uv;
    document.getElementById('metricTemp').textContent = temp + '°';
    document.getElementById('metricSunrise').textContent = sunrise || '--:--';
    document.getElementById('metricSunset').textContent = sunset || '--:--';
    document.getElementById('metricCloud').textContent = cloudCover + '%';
}

function updateTimeline() {
    // استخدام البيانات المحفوظة أو وقت تقديري
    const sunrise = document.getElementById('metricSunrise').textContent || '06:00';
    const sunset = document.getElementById('metricSunset').textContent || '18:00';
    
    // حساب النافذة (تقريباً)
    const [sh, sm] = sunrise.split(':').map(Number);
    const [ss, es] = sunset.split(':').map(Number);
    const startMin = sh * 60 + sm + 60;
    const endMin = ss * 60 + es - 60;
    const startH = Math.floor(startMin / 60);
    const startM = startMin % 60;
    const endH = Math.floor(endMin / 60);
    const endM = endMin % 60;
    
    document.getElementById('timelineSunrise').textContent = sunrise;
    document.getElementById('timelineSunset').textContent = sunset;
    document.getElementById('timelineWindowStart').textContent = 
        String(startH).padStart(2, '0') + ':' + String(startM).padStart(2, '0');
    document.getElementById('timelineWindowEnd').textContent = 
        String(endH).padStart(2, '0') + ':' + String(endM).padStart(2, '0');
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
        
        // استخراج أوقات الشروق والغروب
        let sunrise = '--:--', sunset = '--:--';
        if (data.daily?.sunrise?.[0]) {
            const d = new Date(data.daily.sunrise[0]);
            sunrise = d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        }
        if (data.daily?.sunset?.[0]) {
            const d = new Date(data.daily.sunset[0]);
            sunset = d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        }
        
        updateSunResult(latitude, longitude, uv, temperature, isDay, cloudCover, uvMax, sunrise, sunset);
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
   SUN RESULT (مع كل الإضافات الجديدة)
========================================= */

function updateSunResult(latitude, longitude, uv, temperature, isDay, cloudCover, uvMax, sunrise, sunset) {
    const roundedUV = Math.round(uv * 10) / 10;
    if (sunLocationValue) sunLocationValue.textContent = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    if (uvValue) uvValue.textContent = roundedUV.toString();

    // تحديث المؤشرات
    updateMetrics(roundedUV, temperature, sunrise, sunset, cloudCover);
    updateSunStatusLive(roundedUV, isDay, sunrise, sunset);
    updateTimeline();

    // تحديث النافذة المثالية
    updateBestWindow(roundedUV, sunrise, sunset);

    // تحديث رسالة سنا و"ماذا تفعل الآن؟"
    const name = user.name || "صديقي";
    let actionText = '';
    let sanaMsg = '';

    if (!isDay) {
        actionText = '🌙 الشمس مش موجودة دلوقتي. ده وقت مناسب للراحة أو القراءة. نستنى شروق النهار الجديد ☀️';
        sanaMsg = `لقيتها يا ${name} 🌙 الشمس مش موجودة دلوقتي، وده أحسن من أي تخمين. SunDose شاف الحقيقة وقالك الحقيقة.`;
        setSanaMood('sunSanaSvg', 'sana-sleeping', '🌙');
        setSanaExpression('sunSanaSvg', 'sleeping');
    } else if (roundedUV < 3) {
        actionText = '🌤️ UV منخفض، ده وقت ممتاز للتعرض للشمس بأمان. ممكن تخرج وتاخد جرعتك من الضوء الطبيعي ☀️';
        sanaMsg = `يا ${name} ☀️ الـUV ${roundedUV}، الشمس هادية. ممكن تاخد جرعتك بأمان، لكن بردو خلي بالك من وقت التعرض حسب بشرتك.`;
        setSanaMood('sunSanaSvg', 'sana-look-left', '🌤️');
        setSanaExpression('sunSanaSvg', 'calm');
    } else if (roundedUV < 6) {
        actionText = '☀️ UV متوسط، التعرض القصير مفيد. لو هتخرج، استخدم واقي شمس واقعد في الظل بعد ١٠ دقايق.';
        sanaMsg = `يا ${name} ☀️ الـUV ${roundedUV}، الشمس معتدلة. ده وقت مناسب للتعرض لكن بلاش تهمل الحماية لو هتقعد فترة طويلة.`;
        setSanaMood('sunSanaSvg', 'sana-happy-bounce', '☀️');
        setSanaExpression('sunSanaSvg', 'happy');
    } else if (roundedUV < 8) {
        actionText = '⚠️ UV مرتفع، خلي تعرضك قصير جداً (5-10 دقايق). استخدم واقي شمس SPF 50+ ولبس قبعة ونظارة.';
        sanaMsg = `يا ${name} ☀️ الـUV ${roundedUV}، الشمس نشطة وقوية. لو هتتعرض، خليها دقايق معدودة وابقى محمي.`;
        setSanaMood('sunSanaSvg', 'sana-thinking', '⚠️');
        setSanaExpression('sunSanaSvg', 'thinking');
    } else {
        actionText = '🚫 UV شديد جداً، تجنب التعرض المباشر تماماً. لو مضطر تخرج، استخدم واقي شمس SPF 50+ كل ساعتين ولبس كامل التغطية.';
        sanaMsg = `يا ${name} ⚠️ الـUV ${roundedUV}، وده شديد جداً. سنا بتنصحك متقعدش في الشمس دلوقتي خالص، الحماية أولاً.`;
        setSanaMood('sunSanaSvg', 'sana-thinking', '🚫');
        setSanaExpression('sunSanaSvg', 'thinking');
    }

    document.getElementById('actionText').textContent = actionText;
    sunMessage.textContent = sanaMsg;

    // حساب الجرعة
    calculateSunPlan(uv, cloudCover, uvMax);

    // إظهار الإضافات
    showExtraFeatures(uv);

    addCheck(uv);
    if (goToHealthPortalBtn) goToHealthPortalBtn.classList.remove('hidden');
    locationButton.classList.add('hidden');
    addPoints(10);
    updateDoseDisplay();

    // زيادة عدد الحقائق المتعلمة (مرة واحدة في اليوم)
    sunFactsLearned += 1;
    localStorage.setItem('sundose_facts_learned', sunFactsLearned.toString());
}

/* =========================================
   BEST WINDOW
========================================= */

function updateBestWindow(uv, sunrise, sunset) {
    const windowEl = document.getElementById('bestWindow');
    const windowTime = document.getElementById('windowTime');
    const windowStatus = document.getElementById('windowStatusText');
    const windowTimer = document.getElementById('windowTimer');
    const countdown = document.getElementById('windowCountdown');

    if (!sunrise || !sunset || sunrise === '--:--' || sunset === '--:--') {
        windowTime.textContent = '--:-- — --:--';
        windowStatus.textContent = 'جاري تحديد النافذة...';
        windowTimer.style.display = 'none';
        return;
    }

    // حساب النافذة (بعد الشروق بساعة وقبل الغروب بساعة)
    const [sh, sm] = sunrise.split(':').map(Number);
    const [ss, es] = sunset.split(':').map(Number);
    const startMin = sh * 60 + sm + 60;
    const endMin = ss * 60 + es - 60;
    
    const startH = Math.floor(startMin / 60) % 24;
    const startM = startMin % 60;
    const endH = Math.floor(endMin / 60) % 24;
    const endM = endMin % 60;
    
    const startStr = String(startH).padStart(2, '0') + ':' + String(startM).padStart(2, '0');
    const endStr = String(endH).padStart(2, '0') + ':' + String(endM).padStart(2, '0');
    windowTime.textContent = `${startStr} — ${endStr}`;

    // هل الوقت الحالي داخل النافذة؟
    const now = new Date();
    const currentMin = now.getHours() * 60 + now.getMinutes();
    const isInWindow = currentMin >= startMin && currentMin <= endMin && uv < 6;

    if (isInWindow && uv < 6) {
        windowStatus.textContent = '🔥 أنت داخل الوقت المثالي الآن!';
        windowTimer.style.display = 'flex';
        // عد تنازلي (بالدقائق المتبقية للنافذة)
        const remaining = Math.max(0, Math.floor((endMin - currentMin) / 60));
        countdown.textContent = remaining + ' دقيقة متبقية';
        windowEl.style.borderColor = '#4caf50';
        windowEl.style.background = 'linear-gradient(135deg, #e8f5e9, #c8e6c9)';
    } else if (currentMin < startMin) {
        const wait = Math.floor((startMin - currentMin) / 60);
        windowStatus.textContent = `⏳ هتفتح النافذة بعد ${wait} دقيقة`;
        windowTimer.style.display = 'none';
        windowEl.style.borderColor = '#ffb300';
        windowEl.style.background = 'linear-gradient(135deg, #fff8e1, #ffecb3)';
    } else if (currentMin > endMin) {
        windowStatus.textContent = '🌙 النافذة انتهت اليوم. بكره هتفتح تاني ☀️';
        windowTimer.style.display = 'none';
        windowEl.style.borderColor = '#9e9e9e';
        windowEl.style.background = 'linear-gradient(135deg, #f5f5f5, #e0e0e0)';
    } else if (uv >= 6) {
        windowStatus.textContent = '⚠️ UV مرتفع حالياً، انتظر وقت أقل UV';
        windowTimer.style.display = 'none';
        windowEl.style.borderColor = '#f44336';
        windowEl.style.background = 'linear-gradient(135deg, #ffebee, #ffcdd2)';
    }
}

/* =========================================
   EXTRA FEATURES
========================================= */

function showExtraFeatures(uv) {
    const prosCons = document.getElementById('prosCons');
    if (prosCons) {
        prosCons.classList.remove('hidden');
        const { pros, cons } = getProsAndCons(uv);
        document.getElementById('prosList').innerHTML = pros.map(p => `<li>${p}</li>`).join('');
        document.getElementById('consList').innerHTML = cons.map(c => `<li>${c}</li>`).join('');
    }

    const tipsDiv = document.getElementById('advancedTips');
    if (tipsDiv) {
        tipsDiv.classList.remove('hidden');
        const tips = getAdvancedTips(uv, user.skinTone);
        document.getElementById('tipsList').innerHTML = tips.map(t => `<p>${t}</p>`).join('');
    }

    const extraActions = document.getElementById('extraActions');
    if (extraActions) {
        extraActions.classList.remove('hidden');
    }

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
    const skin = skinNames[skinTone] || 'غير معروفة
