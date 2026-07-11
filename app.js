document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 0. CENTRAL SECURE API ROUTER (FIXED)
    // ==========================================
    async function callSecureAI(promptText) {
        // Direct link to our Vercel Serverless Function
        const response = await fetch("/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptText })
        });
        
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Network matrix breakdown");
        }

        const data = await response.json();
        return data.result;
    }

    // ==========================================
    // 1. MOBILE MENU NAVIGATION SLIDE TOGGLE
    // ==========================================
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
    }

    // ==========================================
    // 2. MODERN TAB SWITCHING SYSTEM
    // ==========================================
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".content-section");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            navButtons.forEach(b => b.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active-section"));
            btn.classList.add("active");
            const target = btn.getAttribute("data-target");
            const targetSection = document.getElementById(target);
            if (targetSection) targetSection.classList.add("active-section");
            if (window.innerWidth <= 768 && sidebar) sidebar.classList.remove("open");
        });
    });

    // ==========================================
    // 3. REAL-TIME CLOCK ENGINE
    // ==========================================
    setInterval(() => {
        const clockEl = document.getElementById("live-clock");
        if (clockEl) clockEl.innerText = new Date().toLocaleTimeString();
    }, 1000);

    // ==========================================
    // 4. CYBER CRYPT: AI MILITARY STEALTH CIPHER
    // ==========================================
    const cryptoInput = document.getElementById("crypto-input");
    const binaryOutput = document.getElementById("binary-output");
    const hexOutput = document.getElementById("hex-output");

    if (cryptoInput) {
        let aiTimeout;
        cryptoInput.addEventListener("input", (e) => {
            const val = e.target.value;
            if (!val) {
                if (binaryOutput) binaryOutput.innerText = "---";
                if (hexOutput) hexOutput.innerText = "---";
                return;
            }

            let binary = "";
            for (let i = 0; i < val.length; i++) {
                binary += val[i].charCodeAt(0).toString(2).padStart(8, '0') + " ";
            }
            if (binaryOutput) binaryOutput.innerText = binary.trim();

            if (hexOutput) hexOutput.innerText = "🤖 AI Matrix Generating Stealth Code...";
            clearTimeout(aiTimeout);
            aiTimeout = setTimeout(async () => {
                try {
                    const prompt = `Encrypt this text into a top-secret elite tactical comms cipher or undercover agent code: "${val}". Return ONLY the generated code string, no explanation.`;
                    const aiCipher = await callSecureAI(prompt);
                    if (hexOutput) hexOutput.innerText = aiCipher;
                } catch (err) {
                    if (hexOutput) hexOutput.innerText = "Offline Encryption Mode";
                }
            }, 1200);
        });
    }

    // ==========================================
    // 5. TACTICAL FITNESS: AI MERIT PROGRESS TRACKER
    // ==========================================
    const fitForm = document.getElementById("fitness-form");
    const fitLogs = document.getElementById("fitness-logs");
    let logs = JSON.parse(localStorage.getItem("aura_fitness")) || [];

    function updateFitnessUI() {
        if (!fitLogs) return;
        fitLogs.innerHTML = "";
        let totalPushups = 0, totalSitups = 0, totalRun = 0;
        
        logs.forEach(log => {
            totalPushups += parseInt(log.pushups) || 0;
            totalSitups += parseInt(log.situps) || 0;
            totalRun += parseFloat(log.run) || 0;
            fitLogs.insertAdjacentHTML("beforeend", `<tr><td>${log.date}</td><td>${log.pushups}</td><td>${log.situps}</td><td>${log.run} Mins</td></tr>`);
        });

        const progressPercent = Math.min(100, Math.round((totalPushups / 200) * 100)); 
        const coreBar = document.getElementById("core-fit-progress");
        const coreTxt = document.getElementById("core-fit-text");
        if (coreBar) coreBar.style.width = progressPercent + "%";
        
        if (coreTxt) {
            coreTxt.innerText = `Analyzing Matrix Metrics...`;
            setTimeout(async () => {
                try {
                    const prompt = `Give a 1-sentence military coach assessment for a cadet who did Total Pushups: ${totalPushups}/200, Situps: ${totalSitups}, Running: ${totalRun} minutes. Keep it highly motivating and sharp.`;
                    const coachFeedback = await callSecureAI(prompt);
                    coreTxt.innerText = `${progressPercent}% Progress | Coach: ${coachFeedback}`;
                } catch {
                    coreTxt.innerText = `${progressPercent}% Efficiency (Total Pushups: ${totalPushups}/200)`;
                }
            }, 500);
        }
    }

    if (fitForm) {
        fitForm.addEventListener("submit", (e) => {
            e.preventDefault();
            logs.push({
                date: new Date().toLocaleDateString(),
                pushups: document.getElementById("pushups").value,
                situps: document.getElementById("situps").value,
                run: document.getElementById("runtime").value
            });
            localStorage.setItem("aura_fitness", JSON.stringify(logs));
            fitForm.reset();
            updateFitnessUI();
        });
    }
    updateFitnessUI();

    // ==========================================
    // 6. PASSWORD VAULT: AI TACTICAL CRYPTO ENGINE
    // ==========================================
    const genBtn = document.getElementById("gen-pass-btn");
    const genInput = document.getElementById("generated-pass");
    const strengthInput = document.getElementById("strength-input");
    const strengthBar = document.getElementById("strength-bar");
    const strengthFeedback = document.getElementById("strength-feedback");

    if (genBtn && genInput) {
        genBtn.addEventListener("click", async () => {
            genInput.value = "🤖 Generating Elite Crypto Key...";
            try {
                const prompt = "Generate one unique, ultra-secure 16-character complex password containing symbols, letters, numbers. Absolutely no prose, just the key.";
                const aiKey = await callSecureAI(prompt);
                genInput.value = aiKey;
                if(strengthInput) {
                    strengthInput.value = aiKey;
                    evaluatePasswordStrength(aiKey);
                }
            } catch {
                let pass = Math.random().toString(36).slice(-10) + "!@#" + Math.random().toString(36).slice(-4).toUpperCase();
                genInput.value = pass;
                if(strengthInput) strengthInput.value = pass;
                evaluatePasswordStrength(pass);
            }
        });
    }

    if (strengthInput) {
        strengthInput.addEventListener("input", (e) => evaluatePasswordStrength(e.target.value));
    }

    function evaluatePasswordStrength(password) {
        let score = 0;
        if (!password || !strengthBar || !strengthFeedback) return;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) {
            strengthBar.style.width = "33%"; strengthBar.style.backgroundColor = "#ef4444"; 
            strengthFeedback.innerText = "CRITICAL / WEAK"; strengthFeedback.style.color = "#ef4444";
        } else if (score <= 4) {
            strengthBar.style.width = "66%"; strengthBar.style.backgroundColor = "#f59e0b"; 
            strengthFeedback.innerText = "SECURED / MEDIUM"; strengthFeedback.style.color = "#f59e0b";
        } else {
            strengthBar.style.width = "100%"; strengthBar.style.backgroundColor = "#10b981"; 
            strengthFeedback.innerText = "MILITARY GRADE / STRONG"; strengthFeedback.style.color = "#10b981";
        }
    }

    // ==========================================
    // 7. POMODORO TIMER CORE ROUTINE
    // ==========================================
    let timer, isRunning = false, timeLeft = 25 * 60;
    const timeDisplay = document.getElementById("pomodoro-timer");
    const pStartBtn = document.getElementById("pomodoro-start");
    const pResetBtn = document.getElementById("pomodoro-reset");

    if (pStartBtn && pResetBtn && timeDisplay) {
        pStartBtn.addEventListener("click", () => {
            if (isRunning) {
                clearInterval(timer); pStartBtn.innerText = "START"; isRunning = false;
            } else {
                isRunning = true; pStartBtn.innerText = "PAUSE";
                timer = setInterval(() => {
                    timeLeft--;
                    timeDisplay.innerText = `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;
                    if (timeLeft <= 0) {
                        clearInterval(timer); alert("Focus Session Complete!");
                        timeLeft = 25 * 60; timeDisplay.innerText = "25:00"; pStartBtn.innerText = "START"; isRunning = false;
                    }
                }, 1000);
            }
        });
        pResetBtn.addEventListener("click", () => {
            clearInterval(timer); isRunning = false; timeLeft = 25 * 60; timeDisplay.innerText = "25:00"; pStartBtn.innerText = "START";
        });
    }

    // ==========================================
    // 8. STUDY CORE: LIVE GEMINI INTEL TEST ENGINE (FIXED)
    // ==========================================
    let aiQuestions = [];
    let currentQuizIndex = 0;
    let quizScoreCount = 0;

    const qQuestion = document.getElementById("quiz-question");
    const qOptions = document.getElementById("quiz-options");
    const qScoreText = document.getElementById("quiz-score");
    const qNextBtn = document.getElementById("next-quiz-btn");

    async function fetchQuestionsFromGemini() {
        if (!qQuestion || !qOptions) return;
        qQuestion.innerText = "🤖 AI Routing active. Generating intelligence evaluations...";
        qOptions.innerHTML = "<div style='color: #00e5ff; text-align:center; padding:20px; font-weight:bold;'>🔄 SYNCING SERVERLESS MATRIX...</div>";
        if(qNextBtn) qNextBtn.style.display = "none";

        const promptText = `Generate exactly 5 unique multiple choice questions for a military initial academic test. Mix Verbal Intelligence, 10th-grade Biology, and English Present Tenses. Provide raw JSON output matching this structure, with no markdown code blocks: [{"q": "Question?", "o": ["A", "B", "C", "D"], "a": 0}]`;

        try {
            let cleanedJsonText = await callSecureAI(promptText);
            
            // Markdown backticks remove karne ke liye safe cleanup logic
            cleanedJsonText = cleanedJsonText.replace(/```json/gi, "").replace(/```/g, "").trim();
            
            const startIdx = cleanedJsonText.indexOf('[');
            const endIdx = cleanedJsonText.lastIndexOf(']');
            
            if (startIdx === -1 || endIdx === -1) {
                throw new Error("Invalid structure format");
            }
            
            cleanedJsonText = cleanedJsonText.substring(startIdx, endIdx + 1);
            aiQuestions = JSON.parse(cleanedJsonText);
            
            currentQuizIndex = 0;
            loadQuizQuestion();
        } catch (error) {
            console.error("Quiz Sync Crash:", error);
            qQuestion.innerText = "❌ Secure Connection Protocol Reset Required.";
            qOptions.innerHTML = "<button id='retry-ai-btn' style='width:100%; padding:12px; background:#00e5ff; color:#000; border:none; border-radius:6px; font-weight:bold; cursor:pointer;'>Re-Initialize Matrix</button>";
            const retryBtn = document.getElementById("retry-ai-btn");
            if(retryBtn) retryBtn.addEventListener("click", fetchQuestionsFromGemini);
        }
    }

    function loadQuizQuestion() {
        if (aiQuestions.length === 0 || !aiQuestions[currentQuizIndex]) return;
        if(qNextBtn) qNextBtn.style.display = "none";
        qOptions.innerHTML = "";
        
        let currentData = aiQuestions[currentQuizIndex];
        qQuestion.innerText = `Q${currentQuizIndex + 1}: ${currentData.q}`;
        
        currentData.o.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.innerText = option;
            btn.style.width = "100%"; btn.style.padding = "12px"; btn.style.margin = "5px 0";
            btn.style.background = "rgba(255,255,255,0.04)"; btn.style.border = "1px solid rgba(255,255,255,0.1)";
            btn.style.borderRadius = "6px"; btn.style.color = "#fff"; btn.style.cursor = "pointer";
            btn.style.transition = "all 0.2s ease";
            
            btn.addEventListener("click", () => {
                const correctIndex = aiQuestions[currentQuizIndex].a;
                qOptions.querySelectorAll("button").forEach(b => b.disabled = true);
                if (index === correctIndex) {
                    btn.style.background = "#10b981"; btn.style.color = "#000"; quizScoreCount++;
                } else {
                    btn.style.background = "#ef4444";
                    if(qOptions.querySelectorAll("button")[correctIndex]) {
                        qOptions.querySelectorAll("button")[correctIndex].style.background = "#10b981";
                        qOptions.querySelectorAll("button")[correctIndex].style.color = "#000";
                    }
                }
                if(qScoreText) qScoreText.innerText = `Score: ${quizScoreCount}/${aiQuestions.length}`;
                if(qNextBtn) qNextBtn.style.display = "block";
            });
            qOptions.appendChild(btn);
        });
    }

    if (qNextBtn) {
        qNextBtn.addEventListener("click", () => {
            currentQuizIndex++;
            if (currentQuizIndex < aiQuestions.length) loadQuizQuestion();
            else {
                qQuestion.innerText = `✨ Evaluation Complete! Merit Score: ${quizScoreCount}/${aiQuestions.length}`;
                qOptions.innerHTML = ""; qNextBtn.style.display = "none";
                const rBtn = document.createElement("button");
                rBtn.innerText = "⚡ LOAD NEW ENGINES";
                rBtn.style = "width:100%; padding:12px; background:#00e5ff; color:#000; border:none; border-radius:6px; font-weight:bold; cursor:pointer;";
                rBtn.addEventListener("click", () => { quizScoreCount = 0; fetchQuestionsFromGemini(); });
                qOptions.appendChild(rBtn);
            }
        });
    }

    fetchQuestionsFromGemini();
});
                                                                              
