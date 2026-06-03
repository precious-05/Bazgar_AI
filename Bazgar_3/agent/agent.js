// ============================================
// KISAAN RL AGENT - Multi-Arm Bandit (UCB1)
// Mathematically correct implementation
// ============================================

// --------------------------------------------------------------
// 1. KNOWLEDGE BASE
// --------------------------------------------------------------
const problemSolutions = {
    "yellow_leaves_wheat": {
        arms: [
            { id: 0, text_en: "Nitrogen deficiency. Apply 2kg Urea per acre.", text_ur: "نائیٹروجن کی کمی ہے۔ 2 کلو یوریا فی ایکڑ ڈالیں۔", text_bal: "نائیٹروجنءِ کمی انت۔ 2 کلو یوریا فی ایکڑ بدے۔" },
            { id: 1, text_en: "Water stress. Irrigate immediately.", text_ur: "پانی کی کمی ہے۔ فوری پانی دیں۔", text_bal: "آپءِ کمی انت۔ فوری آپ دے۔" },
            { id: 2, text_en: "Zinc deficiency. Apply zinc sulfate.", text_ur: "زنک کی کمی ہے۔ زنک سلفیٹ ڈالیں۔", text_bal: "زنکءِ کمی انت۔ زنک سلفیٹ بدے۔" }
        ]
    },
    "yellow_leaves_tomato": {
        arms: [
            { id: 0, text_en: "Heat stress. Provide shade and water.", text_ur: "گرمی کا دباؤ۔ سایہ اور پانی دیں۔", text_bal: "گَرمیءِ دباؤ۔ سایہ ءُ آپ دے۔" },
            { id: 1, text_en: "Nitrogen deficiency. Apply balanced fertilizer.", text_ur: "نائیٹروجن کی کمی۔ متوازن کھاد ڈالیں۔", text_bal: "نائیٹروجنءِ کمی۔ متوازن کود بدے۔" },
            { id: 2, text_en: "Early blight. Apply fungicide.", text_ur: "ابتدائی جھلساؤ۔ فنگسائڈ لگائیں۔", text_bal: "اولی بلیگ۔ فنگسائڈ کارمرز کن۔" }
        ]
    },
    "pest_insect_general": {
        arms: [
            { id: 0, text_en: "Spray recommended pesticide on crop.", text_ur: "فصل پر تجویز کردہ کیڑے مار دوا چھڑکیں۔", text_bal: "فصلءِ سرا دارو پاش دے۔" },
            { id: 1, text_en: "Use neem oil spray (organic).", text_ur: "نیم کے تیل کا سپرے کریں (قدرتی)", text_bal: "نیمءِ تیلءِ اسپرے کن (طبعی)" },
            { id: 2, text_en: "Release beneficial insects like ladybugs.", text_ur: "فائدہ مند کیڑے چھوڑیں", text_bal: "فائدگیں حشره چار کن" }
        ]
    },
    "pest_insect_cotton": {
        arms: [
            { id: 0, text_en: "Spray oil and soap solution for whitefly.", text_ur: "سفید مکھی کے لیے تیل اور صابن کا حل", text_bal: "سپیت بگک واسطہ تیل و سابون" },
            { id: 1, text_en: "Use chemical pesticide as last resort.", text_ur: "آخری حربہ کیمیائی دوا", text_bal: "آخری داو کیمیائی دارو" }
        ]
    },
    "water_issue_drought": {
        arms: [
            { id: 0, text_en: "Apply mulch to retain soil moisture.", text_ur: "ملچ ڈالیں نمی برقرار رکھنے", text_bal: "ملچ ایر کن" },
            { id: 1, text_en: "Use drip irrigation to save water.", text_ur: "ٹپکا آبپاشی", text_bal: "چکو آپ کارمرز" },
            { id: 2, text_en: "Water early morning or evening.", text_ur: "صبح یا شام کو پانی", text_bal: "سہب یا بیگاه آپ" }
        ]
    },
    "water_issue_flood": {
        arms: [
            { id: 0, text_en: "Make drainage system in field.", text_ur: "کھیت میں نکاسی کا انتظام", text_bal: "کشتءَ آپءِ در کنگءِ بندوبست" },
            { id: 1, text_en: "Plant on raised beds.", text_ur: "اونچے بستروں پر لگائیں", text_bal: "برز بستری ءَ کشّنت" }
        ]
    },
    "fertilizer_rice": {
        arms: [
            { id: 0, text_en: "Urea 1.5 bags per acre for rice.", text_ur: "چاول یوریا ڈیڑھ بوری فی ایکڑ", text_bal: "برنج یوریا ڈیڑھ بوری" },
            { id: 1, text_en: "Use DAP for root development.", text_ur: "جڑوں کے لیے ڈی اے پی", text_bal: "ریشگانی واسطہ ڈی اے پی" }
        ]
    },
    "sowing_time_wheat": {
        arms: [{ id: 0, text_en: "Sow wheat in October for best yield.", text_ur: "گندم اکتوبر میں بوتے ہیں", text_bal: "گندم اکتوبر کشّنت" }]
    },
    "sowing_time_corn": {
        arms: [{ id: 0, text_en: "Sow corn in March.", text_ur: "مکئی مارچ میں بوتے ہیں", text_bal: "مکی مارچ کشّنت" }]
    },
    "sowing_time_rice": {
        arms: [{ id: 0, text_en: "Plant rice in June.", text_ur: "چاول جون میں لگاتے ہیں", text_bal: "برنج جون کشّنت" }]
    },
    "storage_wheat": {
        arms: [
            { id: 0, text_en: "Keep wheat in dry, clean bags.", text_ur: "خشک بوریوں میں رکھیں", text_bal: "ہشک بوجیاں ایر کن" },
            { id: 1, text_en: "Add neem leaves to protect from insects.", text_ur: "نیم کے پتے ڈالیں", text_bal: "نیم تاک ایر کن" }
        ]
    },
    "fungus_rot_general": {
        arms: [
            { id: 0, text_en: "Reduce watering and apply fungicide.", text_ur: "پانی کم کریں اور فنگسائڈ لگائیں", text_bal: "آپ کم کن ءُ فنگسائڈ کارمرز" },
            { id: 1, text_en: "Remove infected plants immediately.", text_ur: "بیمار پودوں کو فوری ہٹا دیں", text_bal: "نادراہیں درچکاں فوری در کن" },
            { id: 2, text_en: "Improve air circulation between plants.", text_ur: "پودوں کے درمیان ہوا کی گردش بہتر کریں", text_bal: "درچکانی نیامءَ هوا ءِ چرک بتر کن" }
        ]
    }
};

// --------------------------------------------------------------
// 2. RL MEMORY MANAGEMENT
// --------------------------------------------------------------
let memory = {};
let epsilon = 0.20;       // 20% exploration, 80% exploitation
const UCB_C = 1.414;      // sqrt(2) ≈ 1.414

function initMemoryForProblem(problemKey) {
    if (!problemSolutions[problemKey]) return null;
    const numArms = problemSolutions[problemKey].arms.length;
    return {
        arm_rewards: new Array(numArms).fill(0.0),
        arm_attempts: new Array(numArms).fill(0),
        total_attempts: 0,
        arm_total_rewards: new Array(numArms).fill(0.0)
    };
}

function loadMemory() {
    const saved = localStorage.getItem("kisaan_rl_memory");
    if (saved) {
        try {
            memory = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse memory", e);
            memory = {};
        }
    }
    
    // Ensure all known problems have memory
    for (let pKey in problemSolutions) {
        if (!memory[pKey]) {
            memory[pKey] = initMemoryForProblem(pKey);
        } else {
            // Fix arm lengths if they changed
            const neededArms = problemSolutions[pKey].arms.length;
            if (memory[pKey].arm_rewards.length !== neededArms) {
                memory[pKey] = initMemoryForProblem(pKey);
            }
        }
    }
    saveMemoryToLocal();
}

function saveMemoryToLocal() {
    localStorage.setItem("kisaan_rl_memory", JSON.stringify(memory));
}

// --------------------------------------------------------------
// 3. UCB1 ARM SELECTION (Mathematically Correct)
// --------------------------------------------------------------
function selectArmUCB(problemKey) {
    if (!problemSolutions[problemKey]) {
        return { armIdx: 0, method: "fallback" };
    }
    
    let mem = memory[problemKey];
    if (!mem) {
        mem = initMemoryForProblem(problemKey);
        memory[problemKey] = mem;
    }
    
    const numArms = problemSolutions[problemKey].arms.length;
    
    // Epsilon-greedy exploration
    if (Math.random() < epsilon) {
        const randIdx = Math.floor(Math.random() * numArms);
        return { armIdx: randIdx, method: "exploration" };
    }
    
    // Exploitation: UCB1 formula
    let bestIdx = 0;
    let bestUCB = -Infinity;
    const totalT = mem.total_attempts || 1;
    
    for (let i = 0; i < numArms; i++) {
        const attempts = mem.arm_attempts[i];
        let ucbVal;
        
        if (attempts === 0) {
            ucbVal = Infinity;  // Never tried - must explore
        } else {
            const avgReward = mem.arm_rewards[i];
            // UCB1 = average_reward + c * sqrt(2 * ln(total_attempts) / n_i)
            const explorationBonus = UCB_C * Math.sqrt((2 * Math.log(totalT + 1)) / attempts);
            ucbVal = avgReward + explorationBonus;
        }
        
        if (ucbVal > bestUCB) {
            bestUCB = ucbVal;
            bestIdx = i;
        }
    }
    
    return { armIdx: bestIdx, method: "exploitation" };
}

// --------------------------------------------------------------
// 4. REWARD UPDATE (Incremental Average - Mathematically Correct)
// --------------------------------------------------------------
function updateReward(problemKey, armIdx, rewardValue) {
    if (!memory[problemKey]) {
        memory[problemKey] = initMemoryForProblem(problemKey);
    }
    
    const mem = memory[problemKey];
    if (armIdx >= mem.arm_attempts.length) return;
    
    const currentAttempts = mem.arm_attempts[armIdx];
    const currentAvg = mem.arm_rewards[armIdx];
    
    // Correct incremental average formula:
    // Q_new = Q_old + (reward - Q_old) / (n + 1)
    let newAvg;
    if (currentAttempts === 0) {
        newAvg = rewardValue;
    } else {
        newAvg = currentAvg + (rewardValue - currentAvg) / (currentAttempts + 1);
    }
    
    // Update tracking arrays
    if (!mem.arm_total_rewards) {
        mem.arm_total_rewards = new Array(mem.arm_attempts.length).fill(0);
    }
    
    mem.arm_total_rewards[armIdx] += rewardValue;
    mem.arm_rewards[armIdx] = newAvg;
    mem.arm_attempts[armIdx] += 1;
    mem.total_attempts += 1;
    
    // Gradually decay exploration after enough learning
    if (mem.total_attempts > 100 && epsilon > 0.05) {
        epsilon = Math.max(0.05, epsilon * 0.999);
        const epsilonEl = document.getElementById("epsilonValue");
        if (epsilonEl) epsilonEl.innerText = epsilon.toFixed(3);
    }
    
    saveMemoryToLocal();
    renderStats();  // Update UI
    
    // Log for debugging
    console.log(`[RL Update] ${problemKey} | Arm ${armIdx} | Reward: ${rewardValue} | New Avg: ${newAvg.toFixed(3)} | Attempts: ${currentAttempts + 1}`);
}

// --------------------------------------------------------------
// 5. LANGUAGE & INTENT DETECTION
// --------------------------------------------------------------
function detectLanguage(text) {
    if (/[\u0600-\u06FF]/.test(text)) {
        // Check for Balochi specific words
        if (/(کشت|گندم|فصل|کود|تاک|مٹ|دارو|بدے|کن|آپ|بزگر|درچک)/.test(text)) {
            return "bal";
        }
        return "ur";
    }
    return "en";
}

function detectProblemAndCrop(text) {
    const lower = text.toLowerCase();
    
    // Crop detection
    let crop = null;
    const cropMap = {
        wheat: ["wheat", "gandum", "گندم", "kanak"],
        corn: ["corn", "maize", "makai", "مکی", "مکئی"],
        rice: ["rice", "chawal", "برنج", "چاول", "dhan"],
        cotton: ["cotton", "kapas", "کپاس", "پنبہ"],
        tomato: ["tomato", "tamatar", "ٹماٹر", "بانسک"],
        potato: ["potato", "alu", "آلو", "کچالو"]
    };
    
    for (let [c, keywords] of Object.entries(cropMap)) {
        if (keywords.some(kw => lower.includes(kw))) {
            crop = c;
            break;
        }
    }
    
    // Problem detection
    let problem = "general";
    const problemMap = {
        yellow_leaves: ["yellow", "peeli", "زرد", "پیلی", "تاک زرد", "pili", "patiyaan"],
        pest_insect: ["pest", "insect", "keera", "locust", "کیڑا", "حشره", "worm", "kida"],
        water_issue: ["water", "paani", "drought", "flood", "پانی", "آپ", "سیلاب", "dry"],
        fertilizer: ["fertilizer", "khaad", "urea", "کھاد", "یوریا", "dap", "npk"],
        sowing_time: ["sow", "plant", "kab", "کشت", "بونا", "کدی", "time", "month"],
        storage: ["store", "storage", "ذخیرہ", "محفوظ", "bag", "bori"],
        fungus_rot: ["rot", "fungus", "gul", "sad", "گل", "سڑ", "mold"]
    };
    
    for (let [p, keywords] of Object.entries(problemMap)) {
        if (keywords.some(kw => lower.includes(kw))) {
            problem = p;
            break;
        }
    }
    
    return { problem, crop };
}

function getProblemKey(problem, crop) {
    if (crop) {
        const specific = `${problem}_${crop}`;
        if (problemSolutions[specific]) return specific;
    }
    const generic = `${problem}_general`;
    if (problemSolutions[generic]) return generic;
    // Fallback
    return "pest_insect_general";
}

function getSolutionText(problemKey, armIdx, lang) {
    if (!problemSolutions[problemKey]) return "I don't have a solution for this yet. Please ask another question.";
    const arm = problemSolutions[problemKey].arms[armIdx];
    if (!arm) return "Solution not found. Please try again.";
    
    if (lang === "ur") return arm.text_ur || arm.text_en;
    if (lang === "bal") return arm.text_bal || arm.text_en;
    return arm.text_en;
}

function getConfidence(problemKey, armIdx) {
    const mem = memory[problemKey];
    if (!mem) return 0.3;
    const attempts = mem.arm_attempts[armIdx] || 0;
    
    if (attempts === 0) return 0.3;
    if (attempts < 5) return 0.5 + (attempts * 0.04);
    return Math.min(0.95, 0.7 + (attempts / 100));
}

// --------------------------------------------------------------
// 6. UI RENDERING & MESSAGE HANDLING
// --------------------------------------------------------------
let messages = [];
let feedbackGivenMap = new Map();
let messageCounter = 0;

function addMessageToUI(role, contentObj, msgId) {
    const container = document.getElementById("messagesContainer");
    if (!container) return;
    
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${role === 'user' ? 'user-message' : 'assistant-message'}`;
    msgDiv.setAttribute("data-msg-id", msgId);
    
    if (role === 'assistant') {
        // Answer bubble
        const bubbleDiv = document.createElement("div");
        bubbleDiv.className = "bubble assistant-bubble";
        bubbleDiv.innerText = contentObj.answer;
        msgDiv.appendChild(bubbleDiv);
        
        // Reasoning section
        const reasoningDiv = document.createElement("div");
        reasoningDiv.className = "reasoning";
        reasoningDiv.innerHTML = `
            🧠 <strong>RL reasoning</strong><br>
            • Method: ${contentObj.method}<br>
            • Confidence: ${(contentObj.confidence * 100).toFixed(0)}%<br>
            • Problem: ${contentObj.problemKey}<br>
            • Arm selected: ${contentObj.armIdx}
        `;
        msgDiv.appendChild(reasoningDiv);
        
        // Feedback buttons
        const feedbackRow = document.createElement("div");
        feedbackRow.className = "feedback-row";
        
        if (!feedbackGivenMap.get(msgId)) {
            const upBtn = document.createElement("button");
            upBtn.innerText = "👍 Helpful (+1)";
            upBtn.className = "feedback-btn";
            upBtn.onclick = () => {
                updateReward(contentObj.problemKey, contentObj.armIdx, 1.0);
                feedbackGivenMap.set(msgId, true);
                upBtn.disabled = true;
                downBtn.disabled = true;
                const statusSpan = document.createElement("span");
                statusSpan.innerText = "✓ Thank you! Agent learned.";
                statusSpan.className = "feedback-given";
                feedbackRow.appendChild(statusSpan);
                renderStats();
            };
            
            const downBtn = document.createElement("button");
            downBtn.innerText = "👎 Not Helpful (0)";
            downBtn.className = "feedback-btn";
            downBtn.onclick = () => {
                updateReward(contentObj.problemKey, contentObj.armIdx, 0.0);
                feedbackGivenMap.set(msgId, true);
                upBtn.disabled = true;
                downBtn.disabled = true;
                const statusSpan = document.createElement("span");
                statusSpan.innerText = "✓ Feedback recorded";
                statusSpan.className = "feedback-given";
                feedbackRow.appendChild(statusSpan);
                renderStats();
            };
            
            feedbackRow.appendChild(upBtn);
            feedbackRow.appendChild(downBtn);
        } else {
            const givenSpan = document.createElement("span");
            givenSpan.innerText = "✅ Feedback already given";
            givenSpan.className = "feedback-given";
            feedbackRow.appendChild(givenSpan);
        }
        
        msgDiv.appendChild(feedbackRow);
    } else {
        // User message
        const bubble = document.createElement("div");
        bubble.className = "bubble user-bubble";
        bubble.innerText = contentObj;
        msgDiv.appendChild(bubble);
    }
    
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function renderStats() {
    const statsDiv = document.getElementById("problemStatsList");
    if (!statsDiv) return;
    
    statsDiv.innerHTML = "";
    let hasData = false;
    
    for (let pKey in problemSolutions) {
        const mem = memory[pKey];
        if (!mem || mem.total_attempts === 0) continue;
        
        hasData = true;
        const block = document.createElement("div");
        block.className = "stat-block";
        
        // Problem header
        const problemName = pKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        block.innerHTML = `<strong>${problemName}</strong><br>📊 Total attempts: ${mem.total_attempts}`;
        
        const armsDiv = document.createElement("div");
        armsDiv.className = "arm-stats";
        
        for (let i = 0; i < mem.arm_attempts.length; i++) {
            const att = mem.arm_attempts[i];
            const avg = mem.arm_rewards[i].toFixed(3);
            const fillPercent = Math.min(100, parseFloat(avg) * 100);
            
            armsDiv.innerHTML += `
                <div style="margin-top: 8px;">
                    <div>🔹 Arm ${i}: ${att} tries | Score: ${avg}</div>
                    <div class="progress-bar-bg">
                        <div class="progress-fill" style="width: ${fillPercent}%;"></div>
                    </div>
                </div>
            `;
        }
        
        block.appendChild(armsDiv);
        statsDiv.appendChild(block);
    }
    
    if (!hasData) {
        statsDiv.innerHTML = '<p style="font-size:0.7rem; color:#6f6f6f; text-align:center;">🤖 Send messages, then see learning stats here...</p>';
    }
    
    // Update epsilon display
    const epsilonEl = document.getElementById("epsilonValue");
    if (epsilonEl) epsilonEl.innerText = epsilon.toFixed(3);
}

async function processUserInput(rawText) {
    if (!rawText || !rawText.trim()) return;
    
    const userMsg = rawText.trim();
    addMessageToUI("user", userMsg, Date.now() + "_user");
    
    // Detect language, problem, crop
    const lang = detectLanguage(userMsg);
    const { problem, crop } = detectProblemAndCrop(userMsg);
    let problemKey = getProblemKey(problem, crop);
    
    // Ensure problem exists in memory
    if (!problemSolutions[problemKey]) {
        problemKey = "pest_insect_general";
    }
    
    // Select arm using RL (UCB1)
    const { armIdx, method } = selectArmUCB(problemKey);
    const answerText = getSolutionText(problemKey, armIdx, lang);
    const confidence = getConfidence(problemKey, armIdx);
    
    const msgId = Date.now() + "_assistant";
    const assistantPayload = {
        answer: answerText,
        problemKey: problemKey,
        armIdx: armIdx,
        method: method,
        confidence: confidence
    };
    
    addMessageToUI("assistant", assistantPayload, msgId);
    feedbackGivenMap.set(msgId, false);
    renderStats();
}

// --------------------------------------------------------------
// 7. INITIALIZATION & EVENT HANDLERS
// --------------------------------------------------------------
function resetMemory() {
    if (confirm("Are you sure? This will erase ALL learning data.")) {
        memory = {};
        for (let pKey in problemSolutions) {
            memory[pKey] = initMemoryForProblem(pKey);
        }
        epsilon = 0.20;
        saveMemoryToLocal();
        
        // Clear UI messages
        const container = document.getElementById("messagesContainer");
        if (container) {
            container.innerHTML = `
                <div class="message assistant-message">
                    <div class="bubble assistant-bubble">
                        🔄 Memory has been reset! I'm learning from scratch again.<br><br>
                        Ask me your farming questions and give feedback to teach me.
                    </div>
                </div>
            `;
        }
        
        feedbackGivenMap.clear();
        renderStats();
        
        const epsilonEl = document.getElementById("epsilonValue");
        if (epsilonEl) epsilonEl.innerText = epsilon.toFixed(3);
        
        alert("Agent memory reset successfully!");
    }
}

function manualSave() {
    saveMemoryToLocal();
    alert("Memory saved to localStorage!");
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    loadMemory();
    renderStats();
    
    // Bind event handlers
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const resetBtn = document.getElementById("resetMemoryBtn");
    const saveBtn = document.getElementById("saveMemoryBtn");
    
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            const val = userInput ? userInput.value : "";
            processUserInput(val);
            if (userInput) userInput.value = "";
        });
    }
    
    if (userInput) {
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const val = userInput.value;
                processUserInput(val);
                userInput.value = "";
            }
        });
    }
    
    if (resetBtn) resetBtn.addEventListener("click", resetMemory);
    if (saveBtn) saveBtn.addEventListener("click", manualSave);
});