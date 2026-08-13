document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("startButton");
    const sanaText = document.getElementById("sanaText");

    if (!startButton) return;

    startButton.addEventListener("click", () => {

        sanaText.innerHTML = `
            برافو عليك ❤️
            <br>
            خلينا نبدأ أول خطوة سوا.
        `;

        startButton.textContent = "تم 🌞";

        startButton.style.background = "#63b86b";

        startButton.disabled = true;

    });

});
                <h1>
                    أنا سنا
                    <span>🌻</span>
                </h1>

                <p>
                    رفيقتك الصغيرة اللي هتساعدك تبني
                    عادات صحية يومًا بعد يوم.
                </p>
            </div>

            <!-- صورة سنا -->
            <div class="sana-image">
                <img src="../assets/sana.png" alt="سنا">
            </div>

            <!-- رسالة سنا -->
            <div class="sana-message">
                <div class="message-icon">☀️</div>

                <div>
                    <strong>سنا بتقول:</strong>

                    <p>
                        "مستعدة نبدأ يوم جديد مع بعض؟ 🌻"
                    </p>
                </div>
            </div>

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
