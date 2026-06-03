// Configuration
const API_URL = 'http://localhost:8000';
let currentImage = null;
let currentStream = null;
let currentCamera = 'environment';
let currentLanguage = 'balochi';
let apiAvailable = false;

// Chat state
let chatHistory = [];
let currentAssistantResponse = null;

// Translations
const translations = {
    balochi: {
        appName: 'بزگرِ سنگت اے آئی', home: 'بنشاہ', detect: 'سیب ءِ نادراہی پجار',
        translator: 'مترجم', assistant: 'فصل کارزار', chatbot: 'چیٹ بوٹ', datahub: 'ڈیٹا اکٹھ',
        detectionTitle: 'سیب ءِ نادراہی پجار', chooseFile: 'فائل گچین کُت کن', noFileChosen: 'ہچ فائل گچین نہ انت',
        camera: 'کیمرا پچ کُت کن', capture: 'اکس گرگ', retake: 'پد ءَ گرگ', usePhoto: 'اے اکس کارمرز کُت کن',
        switchCamera: 'کیمرا مٹ کُت کن', close: 'بند کُت کن', clear: 'پاک کُت کن',
        predict: 'پجار / تپاس', analyzing: 'تپاس بوگ انت...', result: 'پجار ءِ نتیجہ',
        selectImageFirst: 'اول یک اکسے گچین کُت کن', error: 'یک چیزے غلط بوتگ',
        comingSoon: 'عنقریب', footer: 'بلوچ کشتکارانی واستہ جوڑ کرتگ',
        confidence: 'اعتبار', recommendation: 'توصیہ', apiError: 'API connection failed. Make sure backend is running on port 8000',
        assistantTitle: 'فصل کارزار اے آئی', assistantSub: 'RL-based Multi-Arm Bandit Agent | Learns from your feedback',
        askQuestion: 'اپنا سوال پوچھیں (بلوچی، اردو، انگریزی)', send: 'بھیجو', aiThinking: 'AI سوچ رہا ہے...',
        helpful: 'مددگار', notHelpful: 'غیر مددگار', feedbackGiven: 'شکریہ! آپ کے فیڈبیک سے میں سیکھ رہا ہوں',
        agentReady: 'ایجنٹ تیار', methodExploration: 'طریقہ: دریافت (نیا حل آزمایا جا رہا ہے)', 
        methodExploitation: 'طریقہ: استعمال (بہترین معلوم حل)', confidenceText: 'اعتماد',
        howRLWorks: 'آر ایل ایجنٹ کیسے سیکھ رہا ہے', exploration: 'دریافت', exploitation: 'استعمال',
        ucbFormula: 'UCB1 فارمولا', rewardSystem: 'ریوارڈ سسٹم', learnedSolutions: 'سیکھے گئے حل'
    },
    english: {
        appName: 'Bazgar Sangat AI', home: 'Home', detect: 'Apple Disease Detection',
        translator: 'Translator', assistant: 'Crop Assistant', chatbot: 'Chatbot', datahub: 'Data Hub',
        detectionTitle: 'Apple Disease Detection', chooseFile: 'Choose File', noFileChosen: 'No file chosen',
        camera: 'Open Camera', capture: 'Capture Photo', retake: 'Retake', usePhoto: 'Use This Photo',
        switchCamera: 'Switch Camera', close: 'Close', clear: 'Clear',
        predict: 'Predict / Analyze', analyzing: 'Analyzing...', result: 'Prediction Result',
        selectImageFirst: 'Please select an image first', error: 'Something went wrong',
        comingSoon: 'Coming Soon', footer: 'Developed for Balochi Farmers',
        confidence: 'Confidence', recommendation: 'Recommendation', apiError: 'API connection failed. Make sure backend is running on port 8000',
        assistantTitle: 'Crop Assistant AI', assistantSub: 'RL-based Multi-Arm Bandit Agent | Learns from your feedback',
        askQuestion: 'Ask your question (Balochi, Urdu, English)', send: 'Send', aiThinking: 'AI is thinking...',
        helpful: 'Helpful', notHelpful: 'Not Helpful', feedbackGiven: 'Thanks! Your feedback helps me learn',
        agentReady: 'Agent Ready', methodExploration: 'Method: Exploration (trying new solution)',
        methodExploitation: 'Method: Exploitation (using best known solution)', confidenceText: 'Confidence',
        howRLWorks: 'How RL Agent is Learning', exploration: 'Exploration', exploitation: 'Exploitation',
        ucbFormula: 'UCB1 Formula', rewardSystem: 'Reward System', learnedSolutions: 'Learned Solutions'
    }
};

// Disease Data
const diseases = {
    balochi: {
        0: { name: 'داغداریں سیب', symptoms: ['پُتک ءُ سوب ءِ سرا سیاہیں داغ', 'سوب ءِ معیار کم بوگ', 'پیش از وہد پُتکانی کپگ'], 
            treatment: ['مس والا فنگس کشیں دوا کارمرز بہ کن', 'نادراہیں سوب ءُ پُتکاں چہ دار ءَ دوری بہ کن ءُ تباہ بہ کن', 'دارانی میان ءَ ہوا ءِ گوں آمد ءُ شُد ءَ بہتر بہ کن'] },
        1: { name: 'عامیں سیب', symptoms: ['ہچ وڑیں نادراہی نیست', 'سوب ساڑی ءُ وش انت'], 
            treatment: ['باغ ءِ باقاعدگیں نگہداری ءَ برجاہ دار', 'نادراہی ءِ بنگیجیں نشانیاں گوں توار بہ کن', 'درستیں آبپاشی ءُ کھاد دئیگ ءَ برجاہ دار'] },
        2: { name: 'گندوکیں سیب', symptoms: ['سوب ءِ نرم بوگ', 'سوب ءِ رنگ ءِ سُہر یا بورا بوگ', 'سوب ءِ گندگ ءُ بو آئی'], 
            treatment: ['نادراہیں سوباں زوت چہ دار ءَ دوری بہ کن', 'آپ ءِ نکاسی بہتر بہ کن', 'دارانی میان ءَ ہوا ءِ گوں آمد ءُ شُد ءَ گیش بہ کن'] },
        3: { name: 'کِپوکیں سیب', symptoms: ['پُتک ءُ سوب ءِ سرا زیتونی تا سیاہیں داغ', 'داغ زبر بوت کن انت', 'سوب ءِ معیار کم بوگ'], 
            treatment: ['بہار ءِ بنگیج ءَ فنگس کشیں دوا کارمرز بہ کن', 'دارانی چیر ءَ کپتگیں پُتکاں ٹوگ بہ کن', 'نادراہی ءَ نہ گرۆکیں سوب ءِ نژاد کارمرز بہ کن'] }
    },
    english: {
        0: { name: 'Blotch Apple', symptoms: ['Dark spots on leaves and fruit', 'Reduced fruit quality', 'Premature leaf drop'], 
            treatment: ['Apply copper-based fungicide', 'Remove infected fruits/leaves', 'Improve air circulation'] },
        1: { name: 'Normal Apple', symptoms: ['No visible disease symptoms', 'Healthy fruit appearance'], 
            treatment: ['Regular orchard maintenance', 'Monitor for early disease signs', 'Proper irrigation'] },
        2: { name: 'Rot Apple', symptoms: ['Softening of fruit', 'Brown discolored fruit', 'Foul smell'], 
            treatment: ['Remove infected fruits immediately', 'Improve water drainage', 'Increase air circulation'] },
        3: { name: 'Scab Apple', symptoms: ['Olive-green to black spots', 'Raised lesions', 'Reduced fruit quality'], 
            treatment: ['Apply fungicide at bud break', 'Remove fallen leaves', 'Use resistant varieties'] }
    }
};

// Check API connection
async function checkAPI() {
    const statusDiv = document.getElementById('apiStatus');
    if (!statusDiv) return;
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        if (data.status === 'ready' && data.model_loaded) {
            apiAvailable = true;
            statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> ' + (currentLanguage === 'balochi' ? 'ماڈل تیار انت - اپ لوڈ کُت کن' : 'Model ready - Upload an image');
            statusDiv.className = 'api-status status-success';
            return true;
        } else {
            throw new Error('Model not loaded');
        }
    } catch (error) {
        apiAvailable = false;
        statusDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + translations[currentLanguage].apiError;
        statusDiv.className = 'api-status status-error';
        return false;
    }
}

// Predict using API
async function predictWithAPI(imageElement) {
    try {
        const blob = await fetch(imageElement.src).then(res => res.blob());
        const formData = new FormData();
        formData.append('file', blob, 'image.jpg');
        
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            return {
                class: data.prediction.class_index,
                confidence: data.prediction.confidence
            };
        } else {
            throw new Error('Prediction failed');
        }
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

// Display results
function displayResult(prediction) {
    const resultContent = document.getElementById('resultContent');
    const resultSection = document.getElementById('resultSection');
    const infoPlaceholder = document.getElementById('infoPlaceholder');
    
    if (!prediction || !apiAvailable) {
        if (resultContent) resultContent.innerHTML = `<p style="color:red">${translations[currentLanguage].error}</p>`;
        if (resultSection) resultSection.style.display = 'block';
        return;
    }
    
    const disease = diseases[currentLanguage][prediction.class];
    
    let html = `
        <div class="disease-name"><i class="fas fa-apple-alt"></i> ${disease.name}</div>
        <div class="confidence-box">
            <strong><i class="fas fa-chart-line"></i> ${translations[currentLanguage].confidence}:</strong> ${prediction.confidence}%<br>
        </div>
        <div class="symptoms-box">
            <h3><i class="fas fa-notes-medical"></i> ${currentLanguage === 'balochi' ? 'علامات' : 'Symptoms'}</h3>
            <ul>${disease.symptoms.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div class="treatment-box">
            <h3><i class="fas fa-leaf"></i> ${currentLanguage === 'balochi' ? 'علاج' : 'Treatment'}</h3>
            <ol>${disease.treatment.map(t => `<li>${t}</li>`).join('')}</ol>
        </div>
    `;
    
    if (resultContent) resultContent.innerHTML = html;
    if (resultSection) resultSection.style.display = 'block';
    if (infoPlaceholder) infoPlaceholder.style.display = 'none';
}

// ============================================
// CROP ASSISTANT FUNCTIONS (RL AGENT)
// ============================================

// Send message to RL agent
async function sendToAssistant(message) {
    try {
        const response = await fetch(`${API_URL}/assistant/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        if (data.success) {
            return data.response;
        } else {
            throw new Error(data.error || 'Failed to get response');
        }
    } catch (error) {
        console.error('Assistant API Error:', error);
        return {
            answer: translations[currentLanguage].apiError,
            problem_key: null,
            arm_idx: null,
            method: 'error',
            confidence: 0
        };
    }
}

// Send feedback to RL agent
async function sendFeedback(problemKey, armIdx, reward) {
    try {
        const response = await fetch(`${API_URL}/assistant/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                problem_key: problemKey,
                arm_idx: armIdx,
                reward: reward
            })
        });
        
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Feedback API Error:', error);
        return false;
    }
}

// Add message to chat UI
function addMessageToChat(role, content, metadata = null, messageId = null) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Remove welcome message if exists
    const welcomeMsg = chatMessages.querySelector('.welcome-message');
    if (welcomeMsg && chatMessages.children.length === 1) {
        welcomeMsg.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-bubble ${role === 'user' ? 'user-bubble' : 'assistant-bubble'}`;
    
    if (role === 'assistant' && metadata) {
        const methodText = metadata.method === 'exploration' ? 
            translations[currentLanguage].methodExploration : 
            translations[currentLanguage].methodExploitation;
        
        messageDiv.innerHTML = `
            <div class="bubble-header">
                <span><i class="fas fa-robot"></i> AI Assistant</span>
                <small>${methodText} | ${translations[currentLanguage].confidenceText}: ${Math.round(metadata.confidence * 100)}%</small>
            </div>
            <div class="bubble-content">
                <p>${content}</p>
            </div>
            <div class="feedback-buttons" data-problem="${metadata.problem_key}" data-arm="${metadata.arm_idx}" data-feedback-given="false">
                <button class="feedback-btn helpful" onclick="handleFeedback('${metadata.problem_key}', ${metadata.arm_idx}, 1.0, this)">
                    <i class="fas fa-thumbs-up"></i> ${translations[currentLanguage].helpful}
                </button>
                <button class="feedback-btn not-helpful" onclick="handleFeedback('${metadata.problem_key}', ${metadata.arm_idx}, 0.0, this)">
                    <i class="fas fa-thumbs-down"></i> ${translations[currentLanguage].notHelpful}
                </button>
            </div>
        `;
        
        // Update stats bar
        updateRLStatsBar(metadata.method, metadata.confidence);
    } else if (role === 'user') {
        messageDiv.innerHTML = `
            <div class="bubble-header">
                <span><i class="fas fa-user"></i> ${currentLanguage === 'balochi' ? 'کسان' : 'Farmer'}</span>
            </div>
            <div class="bubble-content">
                <p>${escapeHtml(content)}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="bubble-header">
                <span><i class="fas fa-robot"></i> AI Assistant</span>
            </div>
            <div class="bubble-content">
                <p>${content}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle feedback from user
window.handleFeedback = async function(problemKey, armIdx, reward, buttonElement) {
    const feedbackDiv = buttonElement.closest('.feedback-buttons');
    if (feedbackDiv.getAttribute('data-feedback-given') === 'true') {
        // Show already given message
        const toastMsg = document.createElement('div');
        toastMsg.className = 'feedback-toast';
        toastMsg.textContent = translations[currentLanguage].feedbackGiven;
        toastMsg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#28a745;color:white;padding:10px20px;border-radius:40px;z-index:1000;animation:fadeOut 2s forwards';
        document.body.appendChild(toastMsg);
        setTimeout(() => toastMsg.remove(), 2000);
        return;
    }
    
    const success = await sendFeedback(problemKey, armIdx, reward);
    
    if (success) {
        feedbackDiv.setAttribute('data-feedback-given', 'true');
        
        // Disable buttons
        const buttons = feedbackDiv.querySelectorAll('.feedback-btn');
        buttons.forEach(btn => {
            btn.classList.add('disabled');
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
        
        // Show success message
        const toastMsg = document.createElement('div');
        toastMsg.className = 'feedback-toast';
        toastMsg.textContent = translations[currentLanguage].feedbackGiven;
        toastMsg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#28a745;color:white;padding:10px 20px;border-radius:40px;z-index:1000;animation:fadeOut 2s forwards';
        document.body.appendChild(toastMsg);
        setTimeout(() => toastMsg.remove(), 2000);
        
        // Refresh stats
        if (problemKey) {
            loadProblemStats(problemKey);
        }
    }
};

// Update RL stats bar
function updateRLStatsBar(method, confidence) {
    const methodDisplay = document.getElementById('rlMethodDisplay');
    const confidenceDisplay = document.getElementById('rlConfidenceDisplay');
    const agentStatus = document.getElementById('rlAgentStatus');
    
    if (methodDisplay) {
        const methodText = method === 'exploration' ? 
            translations[currentLanguage].methodExploration : 
            translations[currentLanguage].methodExploitation;
        methodDisplay.innerHTML = `<i class="fas fa-${method === 'exploration' ? 'random' : 'chart-line'}"></i> ${methodText}`;
    }
    
    if (confidenceDisplay) {
        confidenceDisplay.innerHTML = `<i class="fas fa-percent"></i> ${translations[currentLanguage].confidenceText}: ${Math.round(confidence * 100)}%`;
    }
    
    if (agentStatus) {
        agentStatus.innerHTML = `<i class="fas fa-check-circle"></i> ${translations[currentLanguage].agentReady}`;
    }
}

// Load problem statistics
async function loadProblemStats(problemKey) {
    try {
        const response = await fetch(`${API_URL}/assistant/stats/${problemKey}`);
        const data = await response.json();
        
        if (data.success && data.stats) {
            updateProblemsList(problemKey, data.stats);
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

// Update problems list in learning panel
function updateProblemsList(problemKey, stats) {
    const problemsList = document.getElementById('problemsList');
    if (!problemsList) return;
    
    // Check if this problem already exists in the list
    let existingCard = problemsList.querySelector(`[data-problem="${problemKey}"]`);
    
    if (!existingCard) {
        existingCard = document.createElement('div');
        existingCard.className = 'problem-stat-card';
        existingCard.setAttribute('data-problem', problemKey);
        problemsList.appendChild(existingCard);
    }
    
    const armDetails = stats.arms.map((arm, idx) => 
        `Arm ${idx}: ${arm.attempts} tries, ${Math.round(arm.avg_reward * 100)}% success`
    ).join('<br>');
    
    existingCard.innerHTML = `
        <div class="problem-name">${problemKey.replace(/_/g, ' ').toUpperCase()}</div>
        <div class="problem-detail">Total attempts: ${stats.total_attempts}</div>
        <div class="problem-detail">${armDetails}</div>
    `;
}

// Toggle learning panel
window.toggleLearningPanel = function() {
    const content = document.getElementById('learningContent');
    const icon = document.getElementById('toggleIcon');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
};

// Send chat message
async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
    }
    
    // Get AI response
    const response = await sendToAssistant(message);
    
    // Hide typing indicator
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
    
    // Add assistant message
    addMessageToChat('assistant', response.answer, {
        problem_key: response.problem_key,
        arm_idx: response.arm_idx,
        method: response.method,
        confidence: response.confidence
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// DISEASE DETECTION FUNCTIONS
// ============================================

// Handle prediction
async function handlePrediction() {
    if (!currentImage || !currentImage.src) {
        alert(translations[currentLanguage].selectImageFirst);
        return;
    }
    
    if (!apiAvailable) {
        alert(translations[currentLanguage].apiError);
        return;
    }
    
    const loadingState = document.getElementById('loadingState');
    const resultSection = document.getElementById('resultSection');
    const infoPlaceholder = document.getElementById('infoPlaceholder');
    
    if (loadingState) loadingState.style.display = 'block';
    if (resultSection) resultSection.style.display = 'none';
    if (infoPlaceholder) infoPlaceholder.style.display = 'none';
    
    const prediction = await predictWithAPI(currentImage);
    
    if (loadingState) loadingState.style.display = 'none';
    
    if (prediction) {
        displayResult(prediction);
    } else {
        const resultContent = document.getElementById('resultContent');
        if (resultContent) resultContent.innerHTML = `<p style="color:red">${translations[currentLanguage].error}</p>`;
        if (resultSection) resultSection.style.display = 'block';
    }
}

// File upload
function setupFileUpload() {
    const fileUploadBtn = document.getElementById('fileUploadBtn');
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const previewArea = document.getElementById('previewArea');
    const previewImg = document.getElementById('previewImg');
    
    if (fileUploadBtn) {
        fileUploadBtn.onclick = () => fileInput.click();
    }
    if (fileInput) {
        fileInput.onchange = (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (previewImg) previewImg.src = event.target.result;
                    if (previewArea) previewArea.style.display = 'block';
                    currentImage = previewImg;
                    if (fileName) {
                        fileName.innerHTML = `<i class="far fa-file-image"></i> <span>${e.target.files[0].name}</span>`;
                    }
                    const resultSection = document.getElementById('resultSection');
                    const infoPlaceholder = document.getElementById('infoPlaceholder');
                    if (resultSection) resultSection.style.display = 'none';
                    if (infoPlaceholder) infoPlaceholder.style.display = 'none';
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        };
    }
}

// Camera functions
async function startCamera() {
    const video = document.getElementById('video');
    const cameraModal = document.getElementById('cameraModal');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const usePhotoBtn = document.getElementById('usePhotoBtn');
    
    try {
        if (currentStream) currentStream.getTracks().forEach(track => track.stop());
        const constraints = { video: { facingMode: { exact: currentCamera } } };
        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (video) video.srcObject = currentStream;
        if (cameraModal) cameraModal.style.display = 'flex';
        if (captureBtn) captureBtn.style.display = 'inline-flex';
        if (retakeBtn) retakeBtn.style.display = 'none';
        if (usePhotoBtn) usePhotoBtn.style.display = 'none';
    } catch (error) {
        try {
            const constraints = { video: true };
            currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            if (video) video.srcObject = currentStream;
            if (cameraModal) cameraModal.style.display = 'flex';
        } catch (err) {
            alert('Camera access denied');
        }
    }
}

function capturePhoto() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const usePhotoBtn = document.getElementById('usePhotoBtn');
    
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const capturedImage = canvas.toDataURL('image/jpeg');
    if (video) video.style.display = 'none';
    const imgElement = document.createElement('img');
    imgElement.src = capturedImage;
    imgElement.style.maxWidth = '100%';
    imgElement.style.borderRadius = '15px';
    if (video && video.parentNode) video.parentNode.insertBefore(imgElement, video.nextSibling);
    if (captureBtn) captureBtn.style.display = 'none';
    if (retakeBtn) retakeBtn.style.display = 'inline-flex';
    if (usePhotoBtn) usePhotoBtn.style.display = 'inline-flex';
}

function retakePhoto() {
    const video = document.getElementById('video');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const usePhotoBtn = document.getElementById('usePhotoBtn');
    
    if (!video) return;
    const imgElement = video.nextSibling;
    if (imgElement && imgElement.tagName === 'IMG') imgElement.remove();
    video.style.display = 'block';
    if (captureBtn) captureBtn.style.display = 'inline-flex';
    if (retakeBtn) retakeBtn.style.display = 'none';
    if (usePhotoBtn) usePhotoBtn.style.display = 'none';
}

function usePhoto() {
    const video = document.getElementById('video');
    const previewImg = document.getElementById('previewImg');
    const previewArea = document.getElementById('previewArea');
    const resultSection = document.getElementById('resultSection');
    const infoPlaceholder = document.getElementById('infoPlaceholder');
    
    if (!video) return;
    const imgElement = video.nextSibling;
    if (imgElement && imgElement.tagName === 'IMG') {
        if (previewImg) previewImg.src = imgElement.src;
        if (previewArea) previewArea.style.display = 'block';
        currentImage = previewImg;
        if (resultSection) resultSection.style.display = 'none';
        if (infoPlaceholder) infoPlaceholder.style.display = 'none';
    }
    closeCamera();
}

function switchCamera() {
    currentCamera = currentCamera === 'environment' ? 'user' : 'environment';
    startCamera();
}

function closeCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
    const cameraModal = document.getElementById('cameraModal');
    const video = document.getElementById('video');
    if (cameraModal) cameraModal.style.display = 'none';
    if (video) {
        video.style.display = 'block';
        const imgElement = video.nextSibling;
        if (imgElement && imgElement.tagName === 'IMG') imgElement.remove();
    }
}

function clearAll() {
    currentImage = null;
    const previewImg = document.getElementById('previewImg');
    const previewArea = document.getElementById('previewArea');
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const resultSection = document.getElementById('resultSection');
    const infoPlaceholder = document.getElementById('infoPlaceholder');
    
    if (previewImg) previewImg.src = '';
    if (previewArea) previewArea.style.display = 'none';
    if (fileInput) fileInput.value = '';
    if (fileName) {
        fileName.innerHTML = `<i class="far fa-file-image"></i> <span>${translations[currentLanguage].noFileChosen}</span>`;
    }
    if (resultSection) resultSection.style.display = 'none';
    if (infoPlaceholder) infoPlaceholder.style.display = 'flex';
}

// Navigation
function setupNavigation() {
    const pages = ['detectionPage', 'translatorPage', 'assistantPage', 'chatbotPage', 'datahubPage'];
    const showPage = (pageId) => {
        pages.forEach(p => {
            const page = document.getElementById(p);
            if (page) page.classList.remove('active-page');
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.add('active-page');
        
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    };
    
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
            link.classList.add('active');
            
            if (pageId !== 'detectionPage' && pageId !== 'assistantPage') {
                alert(translations[currentLanguage].comingSoon);
            }
        };
    });
    
    showPage('detectionPage');
    const detectLink = document.querySelector('.nav-link[data-page="detectionPage"]');
    if (detectLink) detectLink.classList.add('active');
}

// Update UI language
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Update nav texts
    const navDetect = document.getElementById('navDetect');
    const navTranslator = document.getElementById('navTranslator');
    const navAssistant = document.getElementById('navAssistant');
    const navChatbot = document.getElementById('navChatbot');
    const navDatahub = document.getElementById('navDatahub');
    const langBtnText = document.getElementById('langBtnText');
    
    if (navDetect) navDetect.innerText = t.detect;
    if (navTranslator) navTranslator.innerText = t.translator;
    if (navAssistant) navAssistant.innerText = t.assistant;
    if (navChatbot) navChatbot.innerText = t.chatbot;
    if (navDatahub) navDatahub.innerText = t.datahub;
    if (langBtnText) langBtnText.innerText = currentLanguage === 'balochi' ? 'English' : 'بلوچی';
    
    // Detection page elements
    const detectionTitle = document.getElementById('detectionTitle');
    const chooseFileText = document.getElementById('chooseFileText');
    const noFileText = document.getElementById('noFileText');
    const cameraText = document.getElementById('cameraText');
    const clearText = document.getElementById('clearText');
    const predictText = document.getElementById('predictText');
    const loadingText = document.getElementById('loadingText');
    const resultTitle = document.getElementById('resultTitle');
    const footerText = document.getElementById('footerText');
    const placeholderText = document.getElementById('placeholderText');
    
    if (detectionTitle) detectionTitle.innerText = t.detectionTitle;
    if (chooseFileText) chooseFileText.innerText = t.chooseFile;
    if (noFileText) noFileText.innerText = t.noFileChosen;
    if (cameraText) cameraText.innerText = t.camera;
    if (clearText) clearText.innerText = t.clear;
    if (predictText) predictText.innerText = t.predict;
    if (loadingText) loadingText.innerText = t.analyzing;
    if (resultTitle) resultTitle.innerText = t.result;
    if (footerText) footerText.innerText = t.footer;
    if (placeholderText) placeholderText.innerText = currentLanguage === 'balochi' ? 'تصویر اپ لوڈ کُت کن تے نادراہی ءِ پجار بہ کن' : 'Upload image to detect disease';
    
    // Assistant page elements
    const assistantTitle = document.getElementById('assistantTitle');
    const assistantSub = document.getElementById('assistantSub');
    const welcomeText = document.getElementById('welcomeText');
    const welcomeSubText = document.getElementById('welcomeSubText');
    const typingText = document.getElementById('typingText');
    const learningPanelTitle = document.getElementById('learningPanelTitle');
    
    if (assistantTitle) assistantTitle.innerText = t.assistantTitle;
    if (assistantSub) assistantSub.innerText = t.assistantSub;
    if (welcomeText) welcomeText.innerText = currentLanguage === 'balochi' ? 'کسان دوست اے آئی مددگار' : 'Farmer Friendly AI Assistant';
    if (welcomeSubText) welcomeSubText.innerText = t.assistantSub;
    if (typingText) typingText.innerText = t.aiThinking;
    if (learningPanelTitle) learningPanelTitle.innerHTML = `🧠 ${t.howRLWorks}`;
    
    // Camera modal texts
    const captureText = document.getElementById('captureText');
    const retakeText = document.getElementById('retakeText');
    const usePhotoText = document.getElementById('usePhotoText');
    const switchCameraText = document.getElementById('switchCameraText');
    const closeText = document.getElementById('closeText');
    
    if (captureText) captureText.innerText = t.capture;
    if (retakeText) retakeText.innerText = t.retake;
    if (usePhotoText) usePhotoText.innerText = t.usePhoto;
    if (switchCameraText) switchCameraText.innerText = t.switchCamera;
    if (closeText) closeText.innerText = t.close;
    
    // RTL/LTR
    if (currentLanguage === 'balochi') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    
    // API status message
    if (apiAvailable) {
        const statusDiv = document.getElementById('apiStatus');
        if (statusDiv) {
            statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> ' + (currentLanguage === 'balochi' ? 'ماڈل تیار انت - اپ لوڈ کُت کن' : 'Model ready - Upload an image');
            statusDiv.className = 'api-status status-success';
        }
    }
}

// Initialize
async function init() {
    // Get elements
    const fileInput = document.getElementById('fileInput');
    const fileUploadBtn = document.getElementById('fileUploadBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const usePhotoBtn = document.getElementById('usePhotoBtn');
    const switchCameraBtn = document.getElementById('switchCameraBtn');
    const closeCameraBtn = document.getElementById('closeCameraBtn');
    const clearBtn = document.getElementById('clearBtn');
    const predictBtn = document.getElementById('predictBtn');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    
    // Setup events
    setupFileUpload();
    setupNavigation();
    
    if (cameraBtn) cameraBtn.onclick = startCamera;
    if (captureBtn) captureBtn.onclick = capturePhoto;
    if (retakeBtn) retakeBtn.onclick = retakePhoto;
    if (usePhotoBtn) usePhotoBtn.onclick = usePhoto;
    if (switchCameraBtn) switchCameraBtn.onclick = switchCamera;
    if (closeCameraBtn) closeCameraBtn.onclick = closeCamera;
    if (clearBtn) clearBtn.onclick = clearAll;
    if (predictBtn) predictBtn.onclick = handlePrediction;
    if (sendChatBtn) sendChatBtn.onclick = sendChatMessage;
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.onclick = () => {
            currentLanguage = currentLanguage === 'balochi' ? 'english' : 'balochi';
            updateLanguage();
            clearAll();
        };
    }
    
    updateLanguage();
    await checkAPI();
}

// Make sure DOM is loaded
document.addEventListener('DOMContentLoaded', init);