document.addEventListener("DOMContentLoaded", () => {

    const introScreen = document.getElementById("introScreen");
    const chatScreen = document.getElementById("chatScreen");

    const meetButton = document.getElementById("meetSanaButton");

    const messages = document.getElementById("chatMessages");
    const typing = document.getElementById("typingIndicator");

    const inputArea = document.getElementById("inputArea");
    const input = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");


    let currentStep = 0;

    const userData = {
        name: "",
        gender: "",
        weight: "",
        height: "",
        country: "",
        habits: []
    };


    /*
     * سنا تتكلم ببطء بسيط
     * عشان المستخدم يحس إنها بترد عليه
     */

    function sanaSpeak(text, callback) {

        typing.classList.remove("hidden");

        setTimeout(() => {

            typing.classList.add("hidden");

            const message = document.createElement("div");

            message.className = "message sana-message";

            message.innerHTML = `
                <div class="bubble sana-bubble">
                    ${text}
                </div>
            `;

            messages.appendChild(message);

            messages.scrollTop = messages.scrollHeight;

            if (callback) {
                callback();
            }

        }, 900);

    }


    function userSpeak(text) {

        const message = document.createElement("div");

        message.className = "message user-message";

        message.innerHTML = `
            <div class="bubble user-bubble">
                ${text}
            </div>
        `;

        messages.appendChild(message);

        messages.scrollTop = messages.scrollHeight;
    }


    function showInput(placeholder = "اكتب ردك هنا...") {

        inputArea.classList.remove("hidden");

        input.placeholder = placeholder;

        setTimeout(() => {
            input.focus();
        }, 100);

    }


    function askNextQuestion() {

        if (currentStep === 0) {

            sanaSpeak(
                "طيب نبدأ بحاجة بسيطة ❤️<br>تحب أناديك بإيه؟",
                () => {
                    showInput("اسمك إيه؟");
                }
            );

            currentStep++;

            return;
        }


        if (currentStep === 1) {

            sanaSpeak(
                `تشرفت بيك يا ${userData.name} ☀️<br>
                 حلو... كده أول حاجة عرفتها عنك.<br>
                 طيب أخاطبك بصيغة إيه؟`,
                () => {
                    showGenderButtons();
                }
            );

            currentStep++;

            return;
        }


        if (currentStep === 2) {

            sanaSpeak(
                "تمام ❤️<br>خلينا ناخد فكرة بسيطة عن جسمك...<br>وزنك كام تقريبًا؟ ومش لازم الرقم يكون دقيق.",
                () => {
                    showInput("مثلاً: 80 كجم");
                }
            );

            currentStep++;

            return;
        }


        if (currentStep === 3) {

            sanaSpeak(
                "وصلت يا بطل ❤️<br>وطولك كام تقريبًا؟",
                () => {
                    showInput("مثلاً: 175 سم");
                }
            );

            currentStep++;

            return;
        }


        if (currentStep === 4) {

            sanaSpeak(
                "آخر سؤال فضولي مني 😄🌍<br>إنت موجود في أنهي بلد؟<br>البلد بس كفاية دلوقتي.",
                () => {
                    showInput("مثلاً: مصر");
                }
            );

            currentStep++;

            return;
        }


        if (currentStep === 5) {

            sanaSpeak(
                `خلاص يا ${userData.name} ❤️<br>
                 كده عرفت عنك شوية، وده كفاية كبداية.<br><br>
                 دلوقتي عندي سؤال أهم...<br>
                 إيه أكتر حاجة حابب نهتم بيها الأول؟`,
                () => {
                    showHabitChoices();
                }
            );

            currentStep++;

            return;
        }

    }


    function showGenderButtons() {

        inputArea.classList.add("hidden");

        const choices = document.createElement("div");

        choices.className = "input-area";

        choices.innerHTML = `
            <button class="gender-choice" data-gender="male">
                👨 ذكر
            </button>

            <button class="gender-choice" data-gender="female">
                👩 أنثى
            </button>
        `;

        messages.appendChild(choices);

        choices.querySelectorAll(".gender-choice").forEach(button => {

            button.addEventListener("click", () => {

                userData.gender = button.dataset.gender;

                userSpeak(button.textContent.trim());

                choices.remove();

                askNextQuestion();

            });

        });

    }


    function showHabitChoices() {

        inputArea.classList.add("hidden");

        const choices = document.createElement("div");

        choices.className = "habit-choices";

        choices.innerHTML = `
            <button data-habit="sun">
                ☀️ الشمس
            </button>

            <button data-habit="water">
                💧 المياه
            </button>

            <button data-habit="sport">
                🏃 الحركة
            </button>

            <button data-habit="sleep">
                😴 النوم
            </button>

            <button data-habit="medicine">
                💊 العلاج والمتابعة
            </button>
        `;

        messages.appendChild(choices);

        choices.querySelectorAll("button").forEach(button => {

            button.addEventListener("click", () => {

                const habit = button.dataset.habit;

                userData.habits.push(habit);

                userSpeak(button.textContent.trim());

                choices.remove();

                sanaSpeak(
                    getHabitResponse(habit)
                );

            });

        });

    }


    function getHabitResponse(habit) {

        const responses = {

            sun:
                "اختيار جميل ☀️<br>الشمس والضوء الطبيعي ممكن يكونوا جزء لطيف من بداية يومك. خلينا نتعلم سوا إزاي نخلي التعرض للشمس مناسب وآمن.",

            water:
                "اختيار حلو 💧<br>المياه أساسية لجسمك، وأنا أقدر أساعدك تخلي شربها عادة بسيطة بدل ما تفتكرها آخر اليوم.",

            sport:
                "حلو جدًا 🏃<br>ومش لازم نبدأ بحاجة صعبة. حتى زيادة الحركة اليومية ممكن تكون بداية ممتازة.",

            sleep:
                "اختيار مهم 😴<br>النوم مش وقت ضايع يا صاحبي، جسمك ومخك محتاجين الراحة عشان تبدأ يومك كويس.",

            medicine:
                "تمام ❤️<br>لو عندك دواء أو مكمل موصوف ليك، أقدر أساعدك تفتكر مواعيده وتتابع التزامك. لكن مش هغير علاج أو جرعة من نفسي."
        };

        return responses[habit];

    }


    function handleInput() {

        const value = input.value.trim();

        if (!value) return;

        userSpeak(value);

        input.value = "";

        inputArea.classList.add("hidden");


        if (currentStep === 1) {

            userData.name = value;

        }

        else if (currentStep === 3) {

            userData.weight = value;

        }

        else if (currentStep === 4) {

            userData.height = value;

        }

        else if (currentStep === 5) {

            userData.country = value;

        }


        askNextQuestion();

    }


    meetButton.addEventListener("click", () => {

        introScreen.classList.add("hidden");

        chatScreen.classList.remove("hidden");

        sanaSpeak(
            "أهلاً بيك ❤️<br>أنا سنا.<br>مش هطلب منك حاجات كتير مرة واحدة... خلينا نتعرف على بعض واحدة واحدة ☀️",
            () => {
                askNextQuestion();
            }
        );

    });


    sendButton.addEventListener("click", handleInput);


    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            handleInput();
        }

    });

});
        </section>

        <!-- جرعة اليوم -->
        <section class="daily-dose">

            <div class="section-title">
                <div>
                    <span>جرعة اليوم</span>
                    <h2>تقدمك اليومي</h2>
                </div>

                <span class="progress-number">0%</span>
            </div>

            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>

            <p class="progress-text">
                لسه البداية... وأنا معاكي ☀️
            </p>

        </section>

        <!-- زر الجرعة -->
        <button class="dose-button">
            ☀️ أنجزت جرعتي اليوم
        </button>

        <!-- الإحصائيات -->
        <section class="stats">

            <div class="stat">
                <span>🔥</span>
                <strong>0</strong>
                <small>يوم متتالي</small>
            </div>

            <div class="stat">
                <span>🏆</span>
                <strong>0</strong>
                <small>يوم إنجاز</small>
            </div>

            <div class="stat">
                <span>⭐</span>
                <strong>0</strong>
                <small>نقطة</small>
            </div>

        </section>

        <!-- التنقل -->
        <nav class="bottom-nav">

            <button class="active">
                ☀️
                <span>الرئيسية</span>
            </button>

            <button>
                📅
                <span>السجل</span>
            </button>

            <button>
                🎁
                <span>نعم</span>
            </button>

            <button>
                ⚙️
                <span>الإعدادات</span>
            </button>

        </nav>

    </main>

</body>
</html>
