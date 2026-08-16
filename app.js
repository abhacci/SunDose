/* =========================================
   SunDose ☀️ - النسخة النهائية الكاملة
========================================= */

// =========================================
// USER
// =========================================

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

// =========================================
// STREAK & STATS
// =========================================

let streak = parseInt(localStorage.getItem('sundose_streak')) || 0;
let points = parseInt(localStorage.getItem('sundose_points')) || 0;
let daysCount = parseInt(localStorage.getItem('sundose_days')) || 0;
let checksCount = parseInt(localStorage.getItem('sundose_checks')) || 0;
let uvHistory = JSON.parse(localStorage.getItem('sundose_uv_history')) || [];
let lastCheckDate = localStorage.getItem('sundose_last_date') || '';
let sunFactsLearned = JSON.parse(localStorage.getItem('sundose_facts_learned')) || 0;

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
        if (el.id && el.id.includes('streak')) el.textContent = streak;
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

// =========================================
// ELEMENTS
// =========================================

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

// =========================================
// STATE
// =========================================

let introStep = 0;
let currentStep = 0;
let isTyping = false;
let typingTimer = null;
let waitingForContinue = false;
let sunData = null;

// =========================================
// SUN FACTS
// =========================================

const sunFacts = [
    { icon: '🌅', fact: 'الضوء الصباحي يضبط الساعة البيولوجية', source: 'National Institutes of Health (NIH)' },
    { icon: '🦴', fact: 'جسمك يقدر يصنع فيتامين D لما جلدك يتعرض لـ UVB', source: 'World Health Organization (WHO)' },
    { icon: '☀️', fact: 'UVB هو النوع المرتبط بتحفيز فيتامين D، لكنه أيضًا سبب حروق الشمس', source: 'World Health Organization (WHO)' },
    { icon: '👀', fact: 'الأشعة فوق البنفسجية ممكن تضر العين مع التعرض الزائد', source: 'World Health Organization (WHO)' },
    { icon: '☁️', fact: 'الغيوم مش معناها إن UV اختفى، الأشعة ممكن تخترق السحب', source: 'World Health Organization (WHO)' },
    { icon: '🧴', fact: 'منظمة الصحة العالمية بتوصي بالحماية من الشمس عندما UV = 3 أو أعلى', source: 'World Health Organization (WHO)' }
];

function showDailyFact() {
    const day = sunFactsLearned % sunFacts.length;
    const fact = sunFacts[day];
    document.getElementById('factIcon2').textContent = fact.icon;
    document.getElementById('factText2').textContent = fact.fact;
    document.getElementById('factSource').textContent = fact.source;
}

// =========================================
// SANA EXPRESSIONS
// =========================================

function setSanaMood(elementId, moodClass, reaction = "") {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.className = 'sana-character ' + moodClass;
    if (sanaReaction) {
        if (reaction) {
            sanaReaction.textContent = reaction;
            sanaReaction.classList.remove('hidden');
        } else {
            sanaReaction.classList.add('hidden');
        }
    }
}

// =========================================
// PAGE NAVIGATION
// =========================================

function showPage(page) {
    [home, welcome, habits, sunLearn, sunDose, healthPortal].forEach(s => {
        if (s) s.classList.add('hidden');
    });
    if (page) page.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateStreak();
    if (page === sunDose) {
        showDailyFact();
    }
}

// =========================================
// TYPING
// =========================================

function typeSanaText(text, element, speed = 38, callback = null) {
    if (!element) return;
    if (typingTimer) { clearInterval(typingTimer); typingTimer = null; }
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

// =========================================
// INTRO
// =========================================

const introMessages = [
    "يا اهلاً بيك 😏 أنا سنا... 'سنا' يعني الضوء الخفيف اللي بيلمع في النهار. وأنا هنا عشان أكون صديقك الصحي ❤️",
    "قصة SunDose بدأت من شخص كان بينسي فيتامين D... والنهاردة بقى صديق صحي لكل الناس ☀️",
    "أول حاجة... أخاطبك إزاي؟ ولد ولا بنت؟ 😉"
];

function setIntroSana() {
    if (!sanaSvg) return;
    const moods = ['sana-look-left', 'sana-thinking', 'sana-happy-bounce'];
    const reactions = ['✨', '🤔', '😏'];
    const idx = Math.min(introStep, moods.length - 1);
    setSanaMood('sanaSvg', moods[idx], reactions[idx]);
}

function renderIntro() {
    if (!introText || !introNext) return;
    introNext.disabled = true;
    setIntroSana();
    typeSanaText(introMessages[introStep], introText, 34, () => {
        introNext.disabled = false;
        introNext.textContent = introStep === introMessages.length - 1 ? 'نبدأ 😏' : 'كمّل';
    });
}

if (introText && introNext) {
    renderIntro();
    introNext.addEventListener('click', function() {
        if (finishTypingImmediately()) {
            introText.textContent = introMessages[introStep];
            introNext.disabled = false;
            return;
        }
        if (introStep < introMessages.length - 1) {
            introStep++;
            renderIntro();
        } else {
            introNext.classList.add('hidden');
            if (startButton) startButton.classList.remove('hidden');
            addPoints(5);
        }
    });
}

startButton?.addEventListener('click', function() {
    showPage(welcome);
    currentStep = 0;
    renderStep();
});

// =========================================
// STEPS (الأسئلة)
// =========================================

const steps = [
    { key: "gender", question: "أول حاجة... أخاطبك إزاي؟ ولد ولا بنت؟ 😉", type: "gender" },
    { key: "name", question: "طيب دلوقتي الاسم بقى... اسمك إيه؟ 😊", type: "text", label: "اسمك", placeholder: "اكتب اسمك هنا" },
    { key: "age", question: "حلو يا ${name} 😄 سنك كام؟", type: "number", label: "العمر", placeholder: "مثال: 23", unit: "سنة" },
    { key: "weight", question: "ووزنك تقريبًا كام يا ${name}؟", type: "number", label: "الوزن", placeholder: "مثال: 80", unit: "كجم" },
    { key: "height", question: "وطولك كام؟ 😏", type: "number", label: "الطول", placeholder: "مثال: 175", unit: "سم" },
    { key: "country", question: "إنت من أنهي بلد يا ${name}؟ 🌍", type: "text", label: "البلد", placeholder: "مثال: مصر" },
    { key: "skinTone", question: "بشرتك أقرب لأنهي درجة؟ اختار الأقرب ليك ☀️", type: "skin" },
    { key: "sunTime", question: "أنهي فترة تناسب يومك أكتر؟", type: "time" }
];

if (stepTotal) stepTotal.textContent = steps.length;

function personalizeQuestion(text) {
    return text.replace("${name}", user.name || "يا صديقي");
}

function setQuestionSana() {
    if (!questionSanaSvg) return;
    const step = steps[currentStep];
    const map = {
        gender: 'sana-happy-bounce',
        name: 'sana-thinking',
        age: 'sana-happy-bounce',
        weight: 'sana-look-left',
        height: 'sana-look-right',
        country: 'sana-thinking',
        skinTone: 'sana-thinking',
        sunTime: 'sana-look-right'
    };
    setSanaMood('questionSanaSvg', map[step.key] || 'sana-float', '');
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

    // Gender
    if (step.type === "gender") {
        answerArea.innerHTML = `
            <div class="gender-grid">
                <button type="button" class="gender-btn" data-gender="male">👨<br>ولد</button>
                <button type="button" class="gender-btn" data-gender="female">👩<br>بنت</button>
            </div>
        `;
        document.querySelectorAll(".gender-btn").forEach(btn => {
            if (user.gender === btn.dataset.gender) btn.classList.add('active');
            btn.addEventListener("click", function() {
                user.gender = this.dataset.gender;
                document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                setSanaMood('questionSanaSvg', 'sana-happy-bounce', '😏');
                addPoints(2);
            });
        });
        return;
    }

    // Skin
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
        document.querySelectorAll(".skin-btn").forEach(btn => {
            if (user.skinTone === btn.dataset.skin) btn.classList.add('active');
            btn.addEventListener("click", function() {
                user.skinTone = this.dataset.skin;
                document.querySelectorAll(".skin-btn").forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const color = this.querySelector('.skin-color')?.style.background;
                const skinChip = document.querySelector('.skin-chip i');
                if (skinChip && color) skinChip.style.background = color;
                setSanaMood('questionSanaSvg', 'sana-thinking', '☀️');
                addPoints(3);
            });
        });
        return;
    }

    // Time
    if (step.type === "time") {
        answerArea.innerHTML = `
            <div class="time-grid">
                <button type="button" class="time-btn" data-time="morning"><span class="time-symbol">🌅</span><span class="time-name">الصبح</span></button>
                <button type="button" class="time-btn" data-time="midday"><span class="time-symbol">☀️</span><span class="time-name">الظهر</span></button>
                <button type="button" class="time-btn" data-time="afternoon"><span class="time-symbol">🌤️</span><span class="time-name">بعد الظهر</span></button>
                <button type="button" class="time-btn" data-time="evening"><span class="time-symbol">🌇</span><span class="time-name">العصر</span></button>
            </div>
        `;
        document.querySelectorAll(".time-btn").forEach(btn => {
            if (user.sunTime === btn.dataset.time) btn.classList.add('active');
            btn.addEventListener("click", function() {
                user.sunTime = this.dataset.time;
                document.querySelectorAll(".time-btn").forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                setSanaMood('questionSanaSvg', 'sana-look-right', '☀️');
                addPoints(2);
            });
        });
        return;
    }

    // Input
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
        input.addEventListener("keydown", e => { if (e.key === "Enter") nextButton.click(); });
    }
}

// =========================================
// SAVE & RESPONSE
// =========================================

function saveCurrentAnswer() {
    const step = steps[currentStep];
    if (step.type === "gender") {
        if (!user.gender) { alert("اختار الأول ولد ولا بنت 😏"); return false; }
        return true;
    }
    if (step.type === "skin") {
        if (!user.skinTone) { alert("اختار درجة بشرتك ☀️"); return false; }
        return true;
    }
    if (step.type === "time") {
        if (!user.sunTime) { alert("اختار الوقت اللي يناسبك ☀️"); return false; }
        return true;
    }
    const input = document.getElementById("answerInput");
    if (!input) return false;
    const value = input.value.trim();
    if (!value) { alert("اكتب الإجابة 😊"); input.focus(); return false; }
    user[step.key] = value;
    return true;
}

function getResponse(step) {
    const name = user.name || "صديقي";
    const female = user.gender === "female";
    const gw = female ? "جميلة" : "بطل";

    if (step.key === "gender") {
        setSanaMood('questionSanaSvg', 'sana-happy-bounce', female ? '😏' : '🔥');
        return female ? `تمام يا جميلة 😏 من هنا هكلمك بصيغة المؤنث` : `تمام يا بطل 😏 من هنا هكلمك بصيغة المذكر`;
    }
    if (step.key === "name") {
        setSanaMood('questionSanaSvg', 'sana-happy-bounce', '💛');
        return female ? `تشرفت بيكي يا ${user.name} 💛` : `تشرفت بيك يا ${user.name} 💛`;
    }
    if (step.key === "age") {
        setSanaMood('questionSanaSvg', 'sana-thinking', '😄');
        return `تمام يا ${gw} 😄 ${user.age} سنة اتسجلت`;
    }
    if (step.key === "weight") {
        setSanaMood('questionSanaSvg', 'sana-look-left', '💛');
        return `وصلت يا ${name} 💛 ${user.weight} كجم`;
    }
    if (step.key === "height") {
        setSanaMood('questionSanaSvg', 'sana-look-right', '😏');
        return `تمام يا ${name} 🌱 ${user.height} سم اتسجلت`;
    }
    if (step.key === "country") {
        setSanaMood('questionSanaSvg', 'sana-thinking', '🌍');
        return `وصلت يا ${name} 🌍 سجلت ${user.country}`;
    }
    if (step.key === "skinTone") {
        setSanaMood('questionSanaSvg', 'sana-thinking', '☀️');
        return `تمام يا ${name} ☀️ درجة بشرتك دخلت الحساب`;
    }
    if (step.key === "sunTime") {
        setSanaMood('questionSanaSvg', 'sana-look-right', '☀️');
        return `حلو يا ${name} ☀️ كده خلصنا البيانات. جهّز نفسك لمحطة الشمس!`;
    }
    return `تمام يا ${name} 💛`;
}

nextButton.addEventListener("click", function() {
    if (isTyping) { finishTypingImmediately(); nextButton.disabled = false; return; }
    if (waitingForContinue) {
        waitingForContinue = false;
        currentStep++;
        if (currentStep < steps.length) renderStep();
        else showHabits();
        return;
    }
    if (!saveCurrentAnswer()) return;
    const step = steps[currentStep];
    const response = getResponse(step);
    answerArea.innerHTML = "";
    waitingForContinue = true;
    nextButton.disabled = true;
    typeSanaText(response, question, 30, () => { nextButton.disabled = false; });
});

// =========================================
// HABITS
// =========================================

function showHabits() {
    showPage(habits);
    setSanaMood('habitSanaSvg', 'sana-happy-bounce', '💛');
    const name = user.name || "صديقي";
    habitMessage.textContent = `كده يا ${name} أنا عرفت الطبقة الأولى منك 💛 دلوقتي عندي فضول أعرف الشمس الأول ☀️`;
    const habitData = [
        { id: "sun", icon: "☀️", title: "جرعة الشمس", text: "المكان + UV + البشرة + الوقت" },
        { id: "water", icon: "💧", title: "شرب المياه", text: "هنبنيها من بياناتك" },
        { id: "exercise", icon: "🏃", title: "الحركة", text: "نشاط مناسب ليومك" },
        { id: "supplements", icon: "✦", title: "العلاج والمكملات", text: "تنظيم المعلومات" }
    ];
    habitList.innerHTML = habitData.map(h => `
        <div class="habit" data-habit="${h.id}">
            <div class="icon">${h.icon}</div>
            <b>${h.title}</b>
            <p>${h.text}</p>
        </div>
    `).join("");
    document.querySelectorAll(".habit").forEach(el => {
        el.addEventListener("click", function() {
            document.querySelectorAll(".habit").forEach(h => h.classList.remove('active'));
            this.classList.add('active');
            if (this.dataset.habit === "sun") openSunLearn();
            else alert("هنفتح القسم ده بعد محطة الشمس ☀️");
        });
    });
}

// =========================================
// SUN LEARN
// =========================================

function openSunLearn() {
    showPage(sunLearn);
    setSanaMood('learnSanaSvg', 'sana-look-right', '☀️');
    const name = user.name || "صديقي";
    learnMessage.textContent = `بص يا ${name} ☀️ الـUV هو قوة الأشعة فوق البنفسجية. كل ما الرقم يعلى، الخطر يزيد. منظمة الصحة العالمية بتوصي بالحماية لما UV = 3 أو أكتر.`;
    if (startSunAnalysis) startSunAnalysis.textContent = "يلا نشوف شمسك الحقيقية ☀️";
}

startSunAnalysis?.addEventListener("click", () => openSunDose());
backFromLearn?.addEventListener("click", () => showHabits());

// =========================================
// OPEN SUN DOSE
// =========================================

function openSunDose() {
    showPage(sunDose);
    setSanaMood('sunSanaSvg', 'sana-look-right', '☀️');
    const name = user.name || "صديقي";
    sunMessage.textContent = `أهو كده يا ${name} ☀️ دلوقتي بقى دوري الحقيقي. هشوف الشمس عند مكانك وأركّب الصورة كلها.`;
    updateSunUserData();
    showDailyFact();
}

// =========================================
// USER DATA
// =========================================

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
}

// =========================================
// LOCATION & UV
// =========================================

locationButton?.addEventListener("click", requestLocation);

function requestLocation() {
    if (!navigator.geolocation) {
        alert("المتصفح مش بيدعم تحديد الموقع");
        return;
    }
    locationButton.disabled = true;
    locationButton.textContent = "📍 سنا بتحدد مكانك...";
    navigator.geolocation.getCurrentPosition(
        pos => loadSunData(pos.coords.latitude, pos.coords.longitude),
        err => {
            alert("محتاج إذن الموقع عشان سنا تقرأ الشمس عندك");
            locationButton.disabled = false;
            locationButton.textContent = "📍 تحديد موقعي وابدأ التحليل";
        }
    );
}

async function loadSunData(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,uv_index,is_day,cloud_cover&daily=sunrise,sunset,uv_index_max&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        const uv = data.current?.uv_index || 0;
        const temp = data.current?.temperature_2m || 0;
        const isDay = data.current?.is_day || 0;
        const clouds = data.current?.cloud_cover || 0;
        let sunrise = '--:--', sunset = '--:--';
        if (data.daily?.sunrise?.[0]) {
            const d = new Date(data.daily.sunrise[0]);
            sunrise = d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        }
        if (data.daily?.sunset?.[0]) {
            const d = new Date(data.daily.sunset[0]);
            sunset = d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        }
        updateUI(uv, temp, isDay, clouds, sunrise, sunset, lat, lon);
        locationButton.classList.add('hidden');
        document.getElementById('extraActions').classList.remove('hidden');
    } catch (e) {
        alert("حصلت مشكلة في قراءة بيانات الطقس");
        locationButton.disabled = false;
        locationButton.textContent = "📍 تحديد موقعي وابدأ التحليل";
    }
}

// =========================================
// UPDATE UI
// =========================================

function updateUI(uv, temp, isDay, clouds, sunrise, sunset, lat, lon) {
    // حالة الشمس
    const badge = document.getElementById('sunStatusBadge');
    const icon = document.getElementById('statusIconBig');
    const label = document.getElementById('statusDesc');
    const sub = document.getElementById('statusSub');
    const uvDisplay = document.getElementById('uvDisplay');
    const uvLevel = document.getElementById('uvLevel');
    const stationStatus = document.getElementById('stationStatusText');

    let level, ico, lbl, s, bdg, sanaMood, sanaReaction, stationTxt;

    if (!isDay) {
        ico = '🌙'; lbl = 'الشمس تحت الأفق 🌙'; s = 'الليل حالياً، انتظر الشروق'; bdg = 'ليل';
        sanaMood = 'sana-sleeping'; sanaReaction = '🌙'; stationTxt = '🌙 الشمس تحت الأفق';
        level = '—';
    } else if (uv < 3) {
        ico = '🌤️'; lbl = 'الشمس هادية ☀️'; s = 'ظروف مناسبة للاستفادة من ضوء الشمس الطبيعي.'; bdg = 'هادية';
        sanaMood = 'sana-look-left'; sanaReaction = '🌤️'; stationTxt = '☀️ الشمس فوق الأفق - هادية';
        level = 'منخفض';
    } else if (uv < 6) {
        ico = '☀️'; lbl = 'شمس نشطة ☀️'; s = 'ظروف مناسبة للتعرض القصير'; bdg = 'نشطة';
        sanaMood = 'sana-happy-bounce'; sanaReaction = '☀️'; stationTxt = '☀️ الشمس فوق الأفق - نشطة';
        level = 'متوسط';
    } else if (uv < 8) {
        ico = '☀️'; lbl = 'شمس قوية ⚠️'; s = 'خلي تعرضك قصير جداً'; bdg = 'قوية';
        sanaMood = 'sana-thinking'; sanaReaction = '⚠️'; stationTxt = '⚠️ الشمس فوق الأفق - قوية';
        level = 'مرتفع';
    } else {
        ico = '☀️'; lbl = 'شمس شديدة 🚫'; s = 'تجنب التعرض المباشر'; bdg = 'شديدة';
        sanaMood = 'sana-thinking'; sanaReaction = '🚫'; stationTxt = '🚫 الشمس فوق الأفق - شديدة';
        level = 'شديد';
    }

    badge.textContent = bdg;
    icon.textContent = ico;
    label.textContent = lbl;
    sub.textContent = s;
    uvDisplay.textContent = uv.toFixed(1);
    uvLevel.textContent = level;
    stationStatus.textContent = stationTxt;

    // Metrics
    document.getElementById('metricTemp2').textContent = Math.round(temp) + '°C';
    document.getElementById('metricCloud2').textContent = Math.round(clouds) + '%';
    document.getElementById('metricSunrise2').textContent = sunrise;
    document.getElementById('metricSunset2').textContent = sunset;

    // Location
    document.getElementById('locationCoords').textContent = lat.toFixed(2) + ', ' + lon.toFixed(2);

    // Update time
    const now = new Date();
    document.getElementById('updateTimeText').textContent = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) + ' • مباشر';

    // Window
    updateWindow(sunrise, sunset, uv);

    // Sana
    setSanaMood('sunSanaSvg', sanaMood, sanaReaction);

    // Message
    const name = user.name || 'صديقي';
    let msg = '';
    if (!isDay) msg = `لقيتها يا ${name} 🌙 الشمس مش موجودة دلوقتي`;
    else if (uv < 3) msg = `حلو! خلينا نشوف الشمس الحقيقية عندك دلوقتي... أنا شايفة إن الشمس هادية ومناسبة تأخذ منها فائدة بأمان. استمتع بالضوء الطبيعي يا ${name}! 😊`;
    else if (uv < 6) msg = `يا ${name} ☀️ الشمس نشطة، خلي تعرضك قصير وابقى محمي`;
    else if (uv < 8) msg = `يا ${name} ⚠️ الشمس قوية، خلي بالك وخلي تعرضك دقايق معدودة`;
    else msg = `يا ${name} 🚫 الشمس شديدة جداً، بلاش تتعرض دلوقتي`;
    document.getElementById('sunMessage').textContent = msg;

    // Actions
    updateActions(uv, isDay);

    // Fact
    showDailyFact();
    sunFactsLearned += 1;
    localStorage.setItem('sundose_facts_learned', sunFactsLearned.toString());

    addCheck(uv);
}

// =========================================
// WINDOW
// =========================================

function updateWindow(sunrise, sunset, uv) {
    const startEl = document.getElementById('windowStart');
    const endEl = document.getElementById('windowEnd');
    const descEl = document.getElementById('windowDesc');

    if (!sunrise || sunrise === '--:--' || !sunset || sunset === '--:--') {
        startEl.textContent = '--:--'; endEl.textContent = '--:--';
        descEl.textContent = 'جاري تحديد النافذة...';
        return;
    }

    const [sh, sm] = sunrise.split(':').map(Number);
    const [ss, es] = sunset.split(':').map(Number);
    const startMin = sh * 60 + sm + 60;
    const endMin = ss * 60 + es - 60;
    const shH = Math.floor(startMin / 60) % 24, shM = startMin % 60;
    const ehH = Math.floor(endMin / 60) % 24, ehM = endMin % 60;

    startEl.textContent = String(shH).padStart(2, '0') + ':' + String(shM).padStart(2, '0');
    endEl.textContent = String(ehH).padStart(2, '0') + ':' + String(ehM).padStart(2, '0');

    if (uv < 6) descEl.textContent = 'ظروف مناسبة للحصول على ضوء طبيعي آمن وفعال. قد تتغير حسب حالة الشمس طول اليوم.';
    else descEl.textContent = '⚠️ UV مرتفع حالياً، انتظر وقت أقل UV للحصول على نافذة أفضل.';
}

// =========================================
// ACTIONS
// =========================================

function updateActions(uv, isDay) {
    const list = document.getElementById('actionsList');
    if (!isDay) {
        list.innerHTML = `
            <div class="action-item"><span>🌙</span> استرخِ وانتظر الشروق</div>
            <div class="action-item"><span>📖</span> اقرأ عن فوائد الشمس</div>
            <div class="action-item"><span>💤</span> جهّز نفسك لليوم الجديد</div>
            <div class="action-item"><span>☀️</span> بكره نافذة جديدة</div>
        `;
        return;
    }
    let actions = [];
    if (uv < 3) actions = ['☀️ الخروج للحصول على ضوء الشمس', '🕶️ ارتدي نظارة شمسية', '💧 اشرب ماء', '🧢 قبعة أو غطاء خفيف'];
    else if (uv < 6) actions = ['☀️ خروج قصير (10-15 دقيقة)', '🕶️ نظارة شمسية مهمة', '💧 اشرب ماء', '🧴 واقي شمس SPF 30+'];
    else if (uv < 8) actions = ['⚠️ خروج فقط للضرورة', '🕶️ نظارة شمسية ضرورية', '🧴 واقي شمس SPF 50+', '🧢 قبعة وتغطية كاملة'];
    else actions = ['🚫 تجنب الخروج الآن', '🕶️ نظارة شمسية ضرورية جداً', '🧴 واقي شمس SPF 50+', '🧢 قبعة وتغطية كاملة'];
    list.innerHTML = actions.map(a => `<div class="action-item"><span>${a.split(' ')[0]}</span> ${a.substring(a.indexOf(' ') + 1)}</div>`).join('');
}

// =========================================
// BACK & NAVIGATION
// =========================================

backToHabits?.addEventListener("click", () => showHabits());
backFromPortal?.addEventListener("click", () => showPage(sunDose));

document.getElementById('viewHistoryBtn')?.addEventListener("click", () => alert('📊 سجل التعرض قيد التطوير'));
document.getElementById('viewForecastBtn')?.addEventListener("click", () => alert('📅 توقعات UV قيد التطوير'));
document.getElementById('shareReportBtn')?.addEventListener("click", () => alert('📤 التقرير جاهز للمشاركة!'));
document.getElementById('dailyQuizBtn')?.addEventListener("click", () => alert('🧠 اختبار اليوم قيد التطوير'));

// =========================================
// INIT
// =========================================

updateStreak();
console.log('☀️ SunDose loaded successfully!');
