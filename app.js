/* =========================================================
   SunDose — app.js
   متوافق مع index.html المرسل
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       عناصر الصفحات
    ========================= */

    const screens = {
        home: document.getElementById("home"),
        welcome: document.getElementById("welcome"),
        habits: document.getElementById("habits"),
        sunDose: document.getElementById("sunDose")
    };

    function showScreen(name) {
        Object.values(screens).forEach(screen => {
            if (screen) screen.classList.add("hidden");
        });

        if (screens[name]) {
            screens[name].classList.remove("hidden");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }


    /* =========================
       الصفحة الرئيسية
    ========================= */

    const introText = document.getElementById("introText");
    const introNext = document.getElementById("introNext");
    const startButton = document.getElementById("startButton");
    const sanaImage = document.getElementById("sanaImage");

    const introMessages = [
        "أنا سنا ☀️، وهكون صاحبتك في رحلة مختلفة مع الشمس.",
        "مش هدفي أقولك ابعد عن الشمس وخلاص...",
        "أنا عايزة أفهمك الشمس إمتى تكون لطيفة، وإمتى الـUV يكون أقوى، وإيه اللي يناسبك.",
        "جاهز نعرف شمسك؟ ☀️"
    ];

    let introIndex = 0;

    function typeText(element, text, speed = 25) {
        if (!element) return;

        element.textContent = "";
        let i = 0;

        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);
    }

    typeText(introText, introMessages[0]);

    introNext?.addEventListener("click", () => {

        introIndex++;

        if (introIndex < introMessages.length) {

            typeText(
                introText,
                introMessages[introIndex]
            );

            if (sanaImage) {
                sanaImage.style.transform =
                    "translateY(-5px) scale(1.02)";

                setTimeout(() => {
                    sanaImage.style.transform = "";
                }, 350);
            }

        } else {

            introNext.classList.add("hidden");
            startButton.classList.remove("hidden");

            typeText(
                introText,
                "يلا بينا نبدأ ونخلي سنا تعرفك أكتر ☀️"
            );
        }
    });


    startButton?.addEventListener("click", () => {
        showScreen("welcome");
        loadQuestion();
    });


    /* =========================
       أسئلة التعارف
    ========================= */

    const questions = [
        {
            text: "أول حاجة... عادةً بتقضي وقتك في الشمس إمتى؟",
            type: "choice",
            options: [
                "الصبح 🌅",
                "الظهر ☀️",
                "العصر 🌇",
                "على حسب اليوم"
            ]
        },
        {
            text: "لما بتكون في الشمس، بتفضل قد إيه تقريبًا؟",
            type: "choice",
            options: [
                "أقل من 15 دقيقة",
                "15–30 دقيقة",
                "30–60 دقيقة",
                "أكتر من ساعة"
            ]
        },
        {
            text: "بشرتك أقرب لأنهي وصف؟",
            type: "choice",
            options: [
                "فاتحة",
                "قمحية",
                "متوسطة",
                "داكنة"
            ]
        },
        {
            text: "بتستخدم واقي شمس عادةً؟",
            type: "choice",
            options: [
                "دائمًا",
                "أحيانًا",
                "نادراً",
                "مش بستخدمه"
            ]
        },
        {
            text: "بتحب الشمس ولا بتحاول تتجنبها؟",
            type: "choice",
            options: [
                "بحبها ☀️",
                "عادي",
                "بحاول أتجنبها",
                "حسب الحر"
            ]
        },
        {
            text: "أكتر حاجة بتضايقك في الشمس إيه؟",
            type: "choice",
            options: [
                "الحرارة 🔥",
                "العرق",
                "الضوء القوي",
                "الخوف من الـUV"
            ]
        },
        {
            text: "إيه أكتر وقت تقدر تتحرك فيه خلال يومك؟",
            type: "choice",
            options: [
                "الصبح",
                "الظهر",
                "العصر",
                "الوقت بيختلف"
            ]
        },
        {
            text: "آخر سؤال... تحب سنا تساعدك تعمل إيه؟",
            type: "choice",
            options: [
                "أفهم الشمس",
                "أعرف قوة الـUV",
                "أختار وقت مناسب للخروج",
                "كل ده ☀️"
            ]
        }
    ];

    let currentQuestion = 0;
    const answers = {};

    const questionElement = document.getElementById("question");
    const answerArea = document.getElementById("answerArea");
    const nextButton = document.getElementById("nextButton");
    const stepNumber = document.getElementById("stepNumber");
    const stepTotal = document.getElementById("stepTotal");
    const progressBar = document.getElementById("progressBar");

    if (stepTotal) {
        stepTotal.textContent = questions.length;
    }

    function loadQuestion() {

        const q = questions[currentQuestion];

        if (!q) return;

        if (stepNumber) {
            stepNumber.textContent = currentQuestion + 1;
        }

        if (progressBar) {
            const progress =
                ((currentQuestion + 1) / questions.length) * 100;

            progressBar.style.width = `${progress}%`;
        }

        typeText(questionElement, q.text);

        answerArea.innerHTML = "";

        q.options.forEach((option, index) => {

            const button = document.createElement("button");

            button.className = "answer-option";
            button.type = "button";
            button.textContent = option;

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".answer-option")
                    .forEach(btn => {
                        btn.classList.remove("selected");
                    });

                button.classList.add("selected");

                answers[currentQuestion] = option;

                nextButton.disabled = false;
            });

            answerArea.appendChild(button);
        });

        nextButton.disabled =
            answers[currentQuestion] === undefined;
    }


    nextButton?.addEventListener("click", () => {

        if (answers[currentQuestion] === undefined) {
            return;
        }

        currentQuestion++;

        if (currentQuestion >= questions.length) {

            showScreen("habits");

            buildHabits();

            return;
        }

        loadQuestion();
    });


    /* =========================
       العادات
    ========================= */

    const habitMessage =
        document.getElementById("habitMessage");

    const habitList =
        document.getElementById("habitList");

    function buildHabits() {

        typeText(
            habitMessage,
            "تمام! دلوقتي سنا بدأت تفهم يومك ☀️ خلينا نختار إيه اللي تحب تتابعه."
        );

        const habits = [
            {
                icon: "☀️",
                title: "قوة الشمس",
                text: "اعرف مستوى الـUV الحالي."
            },
            {
                icon: "⏰",
                title: "وقت مناسب",
                text: "خلي سنا تساعدك تختار توقيتك."
            },
            {
                icon: "🧴",
                title: "الحماية",
                text: "نصائح حماية حسب قوة الأشعة."
            },
            {
                icon: "📊",
                title: "سجل يومك",
                text: "تابع عاداتك مع الشمس."
            }
        ];

        habitList.innerHTML = "";

        habits.forEach(habit => {

            const item = document.createElement("button");

            item.className = "habit-item";

            item.innerHTML = `
                <span class="habit-icon">${habit.icon}</span>

                <span class="habit-info">
                    <b>${habit.title}</b>
                    <small>${habit.text}</small>
                </span>

                <span class="habit-arrow">←</span>
            `;

            item.addEventListener("click", () => {
                showScreen("sunDose");
                startSunStation();
            });

            habitList.appendChild(item);
        });
    }


    /* =========================
       محطة الشمس
    ========================= */

    const sunMessage =
        document.getElementById("sunMessage");

    let userLocation = null;
    let weatherData = null;
    let sunData = null;
    let lastSunUpdate = null;

    function startSunStation() {

        typeText(
            sunMessage,
            "وصلنا لمحطة الشمس ☀️ خليني أشوف الشمس عند مكانك وأقولك إيه اللي مهم دلوقتي."
        );

        updateClock();

        if (window.sunClockTimer) {
            clearInterval(window.sunClockTimer);
        }

        window.sunClockTimer =
            setInterval(updateClock, 1000);

        updatePersonalInfo();

        createInitialTimeline();
    }


    /* =========================
       الساعة
    ========================= */

    function updateClock() {

        const clock =
            document.getElementById("liveClock");

        if (!clock) return;

        const now = new Date();

        clock.textContent =
            now.toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit"
            });
    }


    /* =========================
       الموقع
    ========================= */

    const locationButton =
        document.getElementById("locationButton");

    locationButton?.addEventListener("click", () => {

        if (!navigator.geolocation) {

            showLocationError(
                "المتصفح عندك مش بيدعم تحديد الموقع."
            );

            return;
        }

        locationButton.disabled = true;

        locationButton.querySelector(
            "span:last-child"
        ).textContent = "سنا بتحدد مكانك...";

        navigator.geolocation.getCurrentPosition(

            position => {

                userLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };

                updatePersonalInfo();

                fetchSunData();

            },

            error => {

                locationButton.disabled = false;

                locationButton.querySelector(
                    "span:last-child"
                ).textContent =
                    "خلّي سنا تشوف شمسك";

                showLocationError(
                    "مش قادر أوصل لموقعك. اتأكد إن إذن الموقع مفعّل."
                );
            },

            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 300000
            }
        );
    });


    function showLocationError(message) {

        const liveText =
            document.getElementById("liveSunText");

        if (liveText) {
            liveText.textContent = message;
        }
    }


    /* =========================
       بيانات الموقع
    ========================= */

    function updatePersonalInfo() {

        const skin =
            document.getElementById("sunSkinValue");

        const time =
            document.getElementById("sunTimeValue");

        const location =
            document.getElementById("sunLocationValue");

        const update =
            document.getElementById("lastUpdateValue");

        const skinAnswer = answers[2];

        if (skin) {
            skin.textContent =
                skinAnswer
                    ? skinAnswer.replace("بشرة", "")
                    : "لم تحدد";
        }

        if (time) {

            time.textContent =
                new Date().toLocaleTimeString(
                    "ar-EG",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );
        }

        if (location) {

            location.textContent =
                userLocation
                    ? `${userLocation.lat.toFixed(2)}, ${userLocation.lon.toFixed(2)}`
                    : "غير محدد";
        }

        if (update) {

            update.textContent =
                lastSunUpdate
                    ? lastSunUpdate.toLocaleTimeString(
                        "ar-EG",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    )
                    : "—";
        }
    }


    /* =========================
       جلب بيانات الشمس
       
       Open-Meteo
       بدون API Key
    ========================= */

    async function fetchSunData() {

        if (!userLocation) return;

        const {
            lat,
            lon
        } = userLocation;

        const liveTitle =
            document.getElementById("liveSunTitle");

        const liveText =
            document.getElementById("liveSunText");

        const liveIcon =
            document.getElementById("liveSunIcon");

        if (liveTitle) {
            liveTitle.textContent =
                "سنا بتقرأ الشمس...";
        }

        if (liveText) {
            liveText.textContent =
                "ثواني ونجيب قوة الـUV والطقس ومواعيد الشمس.";
        }

        if (liveIcon) {
            liveIcon.textContent = "🔎";
        }

        try {

            const url =
                "https://api.open-meteo.com/v1/forecast" +
                `?latitude=${lat}` +
                `&longitude=${lon}` +
                "&current=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m,uv_index" +
                "&daily=sunrise,sunset,uv_index_max" +
                "&timezone=auto";

            const response =
                await fetch(url);

            if (!response.ok) {
                throw new Error("Weather API error");
            }

            weatherData =
                await response.json();

            processSunData();

        } catch (error) {

            console.error(error);

            if (liveTitle) {
                liveTitle.textContent =
                    "مش عارفين نقرأ الشمس دلوقتي";
            }

            if (liveText) {
                liveText.textContent =
                    "اتأكد إن الإنترنت شغال وحاول تاني.";
            }

            if (liveIcon) {
                liveIcon.textContent = "⚠️";
            }
        }
    }


    /* =========================
       تحليل الشمس
    ========================= */

    function processSunData() {

        if (!weatherData) return;

        lastSunUpdate = new Date();

        const current =
            weatherData.current;

        const daily =
            weatherData.daily;

        const uv =
            Number(current.uv_index ?? 0);

        const temperature =
            Number(current.temperature_2m ?? 0);

        const clouds =
            Number(current.cloud_cover ?? 0);

        const wind =
            Number(current.wind_speed_10m ?? 0);

        const sunrise =
            daily.sunrise?.[0];

        const sunset =
            daily.sunset?.[0];

        sunData = {
            uv,
            temperature,
            clouds,
            wind,
            sunrise,
            sunset
        };

        updateLiveSun(uv);

        updateWeatherCards();

        updateUVMeter(uv);

        updateAnalysis(uv);

        updateNowActions(uv);

        updateDayWindow(uv);

        updateFact(uv);

        updateTimeline(uv);

        updatePersonalInfo();
    }


    /* =========================
       حالة UV
    ========================= */

    function getUVStatus(uv) {

        if (uv < 3) {

            return {
                label: "منخفض",
                title: "الشمس هادية ☀️",
                icon: "🌤️",
                advice:
                    "مستوى الأشعة فوق البنفسجية منخفض نسبيًا."
            };

        }

        if (uv < 6) {

            return {
                label: "متوسط",
                title: "خلي بالك من الشمس",
                icon: "☀️",
                advice:
                    "الأشعة فوق البنفسجية بدأت تكون أقوى، والحماية تصبح أكثر أهمية."
            };

        }

        if (uv < 8) {

            return {
                label: "مرتفع",
                title: "الشمس قوية",
                icon: "🔥",
                advice:
                    "التعرض الطويل للشمس يحتاج احتياطات إضافية."
            };

        }

        if (uv < 11) {

            return {
                label: "شديد",
                title: "الشمس شديدة جدًا",
                icon: "⚠️",
                advice:
                    "الأشعة فوق البنفسجية قوية جدًا، ويفضل تقليل التعرض المباشر."
            };

        }

        return {
            label: "شديد جدًا",
            title: "UV شديد جدًا",
            icon: "🚨",
            advice:
                "الأشعة فوق البنفسجية في مستوى شديد جدًا."
        };
    }


    /* =========================
       Live Sun
    ========================= */

    function updateLiveSun(uv) {

        const status =
            getUVStatus(uv);

        const title =
            document.getElementById("liveSunTitle");

        const text =
            document.getElementById("liveSunText");

        const icon =
            document.getElementById("liveSunIcon");

        const sunStatus =
            document.getElementById("sunStatus");

        if (title) {
            title.textContent =
                status.title;
        }

        if (text) {

            text.textContent =
                `مؤشر UV الآن ${uv.toFixed(1)} — ${status.advice}`;
        }

        if (icon) {
            icon.textContent =
                status.icon;
        }

        if (sunStatus) {
            sunStatus.textContent =
                `${status.label} • UV ${uv.toFixed(1)}`;
        }
    }


    /* =========================
       UV Meter
    ========================= */

    function updateUVMeter(uv) {

        const big =
            document.getElementById("uvBig");

        const number =
            document.getElementById("uvMeterNumber");

        const badge =
            document.getElementById("uvBadge");

        const marker =
            document.getElementById("uvMarker");

        const status =
            getUVStatus(uv);

        if (big) {
            big.textContent =
                uv.toFixed(1);
        }

        if (number) {
            number.textContent =
                uv.toFixed(1);
        }

        if (badge) {
            badge.textContent =
                status.label;
        }

        if (marker) {

            const percentage =
                Math.min((uv / 11) * 100, 100);

            marker.style.left =
                `${percentage}%`;
        }
    }


    /* =========================
       Weather Cards
    ========================= */

    function updateWeatherCards() {

        if (!sunData) return;

        const temp =
            document.getElementById(
                "temperatureValue"
            );

        const cloud =
            document.getElementById(
                "cloudValue"
            );

        const wind =
            document.getElementById(
                "windValue"
            );

        const sunriseSmall =
            document.getElementById(
                "sunriseSmall"
            );

        const sunsetSmall =
            document.getElementById(
                "sunsetSmall"
            );

        if (temp) {
            temp.textContent =
                `${Math.round(sunData.temperature)}°`;
        }

        if (cloud) {
            cloud.textContent =
                `${Math.round(sunData.clouds)}%`;
        }

        if (wind) {
            wind.textContent =
                `${Math.round(sunData.wind)} كم/س`;
        }

        if (sunriseSmall) {
            sunriseSmall.textContent =
                formatTime(sunData.sunrise);
        }

        if (sunsetSmall) {
            sunsetSmall.textContent =
                formatTime(sunData.sunset);
        }
    }


    function formatTime(value) {

        if (!value) return "—";

        const date =
            new Date(value);

        return date.toLocaleTimeString(
            "ar-EG",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    }


    /* =========================
       تحليل سنا
    ========================= */

    function updateAnalysis(uv) {

        const status =
            getUVStatus(uv);

        const title =
            document.getElementById(
                "analysisTitle"
            );

        const text =
            document.getElementById(
                "analysisText"
            );

        const icon =
            document.getElementById(
                "analysisIcon"
            );

        if (title) {
            title.textContent =
                status.title;
        }

        if (icon) {
            icon.textContent =
                status.icon;
        }

        if (text) {

            if (uv < 3) {

                text.textContent =
                    "دلوقتي مستوى الـUV منخفض نسبيًا. لو هدفك الخروج، الشمس أهدى من فترات الـUV المرتفع.";

            } else if (uv < 6) {

                text.textContent =
                    "الـUV بدأ يبقى ملحوظ. لو هتقعد فترة طويلة، خليك واعي للحماية والظل.";

            } else if (uv < 8) {

                text.textContent =
                    "الشمس قوية دلوقتي. التعرض المباشر لفترة طويلة مش أفضل اختيار، خصوصًا بدون حماية.";

            } else {

                text.textContent =
                    "الـUV مرتفع جدًا. الأفضل تقليل التعرض المباشر واستخدام وسائل الحماية المناسبة.";
            }
        }
    }


    /* =========================
       ماذا أفعل الآن؟
    ========================= */

    function updateNowActions(uv) {

        const container =
            document.getElementById(
                "nowActions"
            );

        if (!container) return;

        let actions = [];

        if (uv < 3) {

            actions = [
                ["☀️", "الشمس هادية", "مستوى UV منخفض نسبيًا."],
                ["🚶", "وقت مناسب للنشاط", "لو عندك مشوار أو نشاط خارجي، الظروف ألطف نسبيًا."],
                ["🧴", "الحماية تفضل مهمة", "خصوصًا مع التعرض لفترة طويلة."]
            ];

        } else if (uv < 6) {

            actions = [
                ["☀️", "ممكن تخرج", "لكن خليك واعي بمدة التعرض."],
                ["🧢", "فكر في الحماية", "الظل والملابس المناسبة يساعدوا."],
                ["🧴", "واقي الشمس", "مفيد خصوصًا لو هتتعرض لفترة."]
            ];

        } else {

            actions = [
                ["🌳", "دور على الظل", "قلل التعرض المباشر للشمس."],
                ["🧢", "احمِ جلدك", "استخدم ملابس وغطاء مناسبين."],
                ["🧴", "واقي الشمس", "مهم عند التعرض للأشعة."],
                ["⏰", "اختار توقيت أهدى", "سنا تقدر تساعدك تتابع تغير الـUV خلال اليوم."]
            ];
        }

        container.innerHTML = "";

        actions.forEach(action => {

            const item =
                document.createElement("div");

            item.className =
                "action-item";

            item.innerHTML = `
                <span>${action[0]}</span>

                <div>
                    <b>${action[1]}</b>
                    <small>${action[2]}</small>
                </div>
            `;

            container.appendChild(item);
        });
    }


    /* =========================
       نافذة اليوم
    ========================= */

    function updateDayWindow(uv) {

        if (!sunData) return;

        const windowCard =
            document.getElementById(
                "sunWindow"
            );

        const sunriseValue =
            document.getElementById(
                "sunriseValue"
            );

        const sunsetValue =
            document.getElementById(
                "sunsetValue"
            );

        const windowValue =
            document.getElementById(
                "windowValue"
            );

        const windowLabel =
            document.getElementById(
                "windowLabel"
            );

        const windowTitle =
            document.getElementById(
                "windowTitle"
            );

        const windowText =
            document.getElementById(
                "windowText"
            );

        const windowIcon =
            document.getElementById(
                "windowIcon"
            );

        const preferredTime =
            document.getElementById(
                "preferredTimeValue"
            );

        const progress =
            document.getElementById(
                "dayProgress"
            );

        if (windowCard) {
            windowCard.classList.remove("hidden");
        }

        if (sunriseValue) {
            sunriseValue.textContent =
                formatTime(sunData.sunrise);
        }

        if (sunsetValue) {
            sunsetValue.textContent =
                formatTime(sunData.sunset);
        }

        const now = new Date();

        if (windowValue) {
            windowValue.textContent =
                now.toLocaleTimeString(
                    "ar-EG",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );
        }

        if (windowLabel) {
            windowLabel.textContent =
                "دلوقتي";
        }

        if (preferredTime) {

            const selected =
                answers[0] || "حسب اليوم";

            preferredTime.textContent =
                selected;
        }

        if (windowTitle) {

            windowTitle.textContent =
                uv < 3
                    ? "الـUV هادي نسبيًا"
                    : uv < 6
                        ? "الـUV متوسط"
                        : "الـUV قوي دلوقتي";
        }

        if (windowText) {

            windowText.textContent =
                "مستوى الـUV بيتغير خلال اليوم، وسنا هتستخدم القراءة الحالية عشان تساعدك تفهم توقيتك.";
        }

        if (windowIcon) {
            windowIcon.textContent =
                uv < 3
                    ? "🌤️"
                    : uv < 6
                        ? "☀️"
                        : "🔥";
        }

        if (
            progress &&
            sunData.sunrise &&
            sunData.sunset
        ) {

            const sunrise =
                new Date(
                    sunData.sunrise
                ).getTime();

            const sunset =
                new Date(
                    sunData.sunset
                ).getTime();

            const current =
                Date.now();

            const percent =
                ((current - sunrise) /
                    (sunset - sunrise)) * 100;

            progress.style.width =
                `${Math.max(
                    0,
                    Math.min(100, percent)
                )}%`;
        }
    }


    /* =========================
       معلومة اليوم
    ========================= */

    function updateFact(uv) {

        const title =
            document.getElementById(
                "factTitle"
            );

        const text =
            document.getElementById(
                "factText"
            );

        const source =
            document.getElementById(
                "factSource"
            );

        const facts = [

            {
                title:
                    "الـUV مش هو الحرارة ☀️",

                text:
                    "ممكن اليوم يكون مش حر جدًا ومع ذلك يكون مؤشر الأشعة فوق البنفسجية مرتفع. الحرارة والـUV حاجتين مختلفتين.",

                source:
                    "SunDose Science"
            },

            {
                title:
                    "الغيوم مش معناها إن الـUV اختفى ☁️",

                text:
                    "وجود السحب لا يعني بالضرورة اختفاء الأشعة فوق البنفسجية، لذلك مؤشر UV يفضل مهم حتى في الأيام الغائمة.",

                source:
                    "SunDose Science"
            },

            {
                title:
                    "الشمس بتتغير خلال اليوم ⏰",

                text:
                    "قوة الأشعة فوق البنفسجية تختلف حسب الوقت والمكان وارتفاع الشمس في السماء.",

                source:
                    "SunDose Science"
            }
        ];

        const fact =
            facts[
                Math.floor(
                    Math.random() * facts.length
                )
            ];

        if (title) {
            title.textContent =
                fact.title;
        }

        if (text) {
            text.textContent =
                fact.text;
        }

        if (source) {
            source.textContent =
                fact.source;
        }
    }


    /* =========================
       Timeline
    ========================= */

    function createInitialTimeline() {

        const timeline =
            document.getElementById(
                "sunTimeline"
            );

        if (!timeline) return;

        timeline.innerHTML = `
            <div class="timeline-empty">
                سنا مستنية تعرف مكانك عشان تبني سجل الشمس ☀️
            </div>
        `;
    }


    function updateTimeline(uv) {

        const timeline =
            document.getElementById(
                "sunTimeline"
            );

        if (!timeline || !sunData) return;

        const status =
            getUVStatus(uv);

        timeline.innerHTML = `

            <div class="timeline-item">

                <span>🌅</span>

                <div>
                    <b>${formatTime(sunData.sunrise)}</b>
                    <small>الشروق</small>
                </div>

            </div>

            <div class="timeline-item active">

                <span>${status.icon}</span>

                <div>
                    <b>الآن • UV ${uv.toFixed(1)}</b>
                    <small>${status.label}</small>
                </div>

            </div>

            <div class="timeline-item">

                <span>🌇</span>

                <div>
                    <b>${formatTime(sunData.sunset)}</b>
                    <small>الغروب</small>
                </div>

            </div>
        `;
    }


    /* =========================
       الرجوع للعادات
    ========================= */

    const backToHabits =
        document.getElementById(
            "backToHabits"
        );

    backToHabits?.addEventListener(
        "click",
        () => {

            showScreen("habits");

            typeText(
                habitMessage,
                "رجعتلك تاني 💛 لو عايز نرجع نشوف الشمس، اختار محطة الشمس."
            );
        }
    );


    /* =========================
       حماية بسيطة من أخطاء الصور
    ========================= */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {
                    img.style.opacity = "0";
                }
            );
        });


    /* =========================
       بداية التطبيق
    ========================= */

    showScreen("home");

});
