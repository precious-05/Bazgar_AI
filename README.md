
<div align="center">

# بزگر سنگت اے آئی - Bazgar Sangat AI
> **AI-Powered Apple Disease Detection & Smart Farming Assistant for Balochi Farmers**

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-Lite-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/lite)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)

[![Status](https://img.shields.io/badge/Status-Under%20Development-yellow?style=flat-square)]()
[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Course](https://img.shields.io/badge/Course-Artificial%20Intelligence-FF5722?style=flat-square)]()

</div>

---

بزگر سنگت اے آئی (Bazgar Sangat AI) is a state-of-the-art, full-stack web application developed as a **course project for the Artificial Intelligence course**. It is designed to detect apple diseases using custom Machine Learning models and provide intelligent crop management advice. By combining a high-performance **FastAPI (Python)** backend running a specialized **TensorFlow Lite** model with a dynamic, multilingual **HTML/CSS/JavaScript frontend** featuring a Balochi cultural theme and RTL support, Bazgar Sangat AI empowers farmers in Balochi-speaking regions to scan apple leaves, identify diseases, analyze confidence metrics, get treatments in their native language, and receive AI-generated farming recommendations.

> **Note:** This project is currently **under active development**. New features and improvements are being added regularly.

---

## Table of Contents
- [About the App](#about-the-app)
- [Course Context](#course-context)
- [App Screenshots](#app-screenshots)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [How to Run the Project](#how-to-run-the-project)
- [Project Structure](#project-structure)
- [Privacy Policy](#privacy-policy)
- [Future Enhancements](#future-enhancements)
- [Developed By](#developed-by)

---

## About the App

بزگر سنگت اے آئی addresses the critical problem of crop loss due to undetected apple diseases by providing instant, mobile-friendly, and language-accessible diagnostics.

| Aspect | Description |
|:-------|:------------|
| **What it is** | A comprehensive apple disease detection and smart farming recommendation system powered by a TensorFlow Lite classification model. |
| **Who can use it** | Balochi farmers, agricultural extension workers, orchard owners, and gardening enthusiasts in Pakistan, Iran, Afghanistan, and beyond. |
| **Problem it solves** | Apple diseases like Blotch, Rot, and Scab often go undiagnosed until it's too late, causing significant economic loss. Existing AI tools do not support the Balochi language or consider local farming contexts. |
| **Main features** | Real-time image classification (Apple leaf/fruit), confidence scoring, multilingual results (Balochi, English, Urdu), voice playback of diagnoses in Balochi, an RL-based crop assistant that learns from farmer feedback, and a culturally resonant interface. |

---

## Course Context

This project was developed to fulfill the **requirements of the Artificial Intelligence course** in the **6th Semester of BS Computer Science**.

| Course Component | Implementation in This Project |
|:----------------|:-------------------------------|
| **Machine Learning** | TensorFlow Lite model for image classification (4 apple disease classes) |
| **Reinforcement Learning** | UCB1 Multi-Arm Bandit algorithm for the Crop Assistant agent |
| **Computer Vision** | Image preprocessing (224x224 resize, normalization) for disease detection |
| **NLP Concepts** | Multilingual translation system (Balochi, English, Urdu) |
| **AI Deployment** | FastAPI backend serving the ML model with REST endpoints |
| **Human-AI Interaction** | Feedback mechanism (thumbs up/down) for RL agent to learn from users |

> This project demonstrates the practical application of multiple AI techniques learned throughout the course, including supervised learning (disease classification), reinforcement learning (UCB algorithm), and full-stack deployment.

---

## App Screenshots

### Homepage & Multilingual UI

| Homepage Hero Section | Balochi Language UI | English Language UI |
| :---: | :---: | :---: |
| *[Add Screenshot: homepage.png]* | *[Add Screenshot: balochi_ui.png]* | *[Add Screenshot: english_ui.png]* |

### AI Disease Detection

| Image Upload | Prediction Result (Balochi) | Voice Playback |
| :---: | :---: | :---: |
| *[Add Screenshot: upload.png]* | *[Add Screenshot: result_balochi.png]* | *[Add Screenshot: voice_player.png]* |

### RL Crop Assistant

| Chat Interface | Getting a Recommendation | Providing Feedback |
| :---: | :---: | :---: |
| *[Add Screenshot: assistant_chat.png]* | *[Add Screenshot: recommendation.png]* | *[Add Screenshot: feedback.png]* |

### Cultural & Risk Features

| Balochi Cultural Showcase | How It Works Section | Testimonials |
| :---: | :---: | :---: |
| *[Add Screenshot: cultural.png]* | *[Add Screenshot: howitworks.png]* | *[Add Screenshot: testimonials.png]* |

---

## Key Features

### 1. 🍎 Intelligent Apple Disease Detection
- **Camera Integration:** Capture live images directly within the web app using the device camera or upload from gallery.
- **Instant ML Diagnostics:** Sends image to FastAPI server for classification (Blotch, Normal, Rot, Scab) processed via a specialized **TensorFlow Lite (`apple_disease_model.tflite`)** model.
- **Balochi Voice Alerts:** Plays a voice message in Balochi explaining the disease and recommended treatment upon detection.

### 2. 🤖 Dynamic RL Crop Assistant
- **Reinforcement Learning Agent:** Uses the UCB1 (Upper Confidence Bound) algorithm for optimal solution selection.
- **Learns from Farmer Feedback:** Integrated thumbs-up/down buttons allow the agent to update rewards and improve future recommendations.
- **Persistent Knowledge:** Stores learned parameters in browser LocalStorage for continuous learning across sessions.

### 3. 🗣️ Multilingual & Cultural Interface
- **Full Balochi UI (بزگر سنگت):** Complete right-to-left (RTL) interface with culturally appropriate terminology.
- **English & Urdu Support:** Built-in translation object for fallback languages.
- **Voice Playback:** Audio files (`d0.wav` to `d3.wav`) provide spoken advice in Balochi.

### 4. 📊 Rich Frontend Dashboard
- **Responsive Design:** Optimized for mobile, tablet, and desktop views.
- **Cultural Homepage:** Features a hero slider with Balochi imagery, animated statistics, testimonials, and a newsletter section.
- **Real-time Feedback:** Displays confidence scores, detailed symptoms, and structured treatment plans.

---

## Technologies Used

### Frontend (Web Client)

| Technology | Badge |
|:-----------|:------|
| **Language:** HTML5, CSS3, JavaScript ES6+ | [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/) |
| **Icons & Fonts:** Font Awesome 6, Google Fonts (Inter) | [![Font Awesome](https://img.shields.io/badge/Icons-Font_Awesome-5280DD?style=flat-square&logo=fontawesome&logoColor=white)](https://fontawesome.com/) |
| **Animations:** Lottie Player CDN | [![Lottie](https://img.shields.io/badge/Animations-Lottie-00BFFF?style=flat-square)](https://lottiefiles.com/) |
| **Camera Access:** MediaDevices API | [![WebRTC](https://img.shields.io/badge/Camera-MediaDevices-FF4F8B?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) |
| **Storage:** LocalStorage (RL memory) | [![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-FFA500?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) |

### Backend (FastAPI Services)

| Technology | Badge |
|:-----------|:------|
| **Language:** Python 3.9+ | [![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/) |
| **Framework:** FastAPI | [![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/) |
| **ML Engine:** TensorFlow Lite | [![TensorFlow](https://img.shields.io/badge/TensorFlow-Lite-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/lite) |
| **Image Processing:** Pillow, NumPy | [![Pillow](https://img.shields.io/badge/Image-Pillow-3E7E9E?style=flat-square&logo=python&logoColor=white)](https://python-pillow.org/) |
| **ASGI Server:** Uvicorn | [![Uvicorn](https://img.shields.io/badge/Server-Uvicorn-3E7E9E?style=flat-square)](https://www.uvicorn.org/) |

### AI/ML Components

| Component | Technology |
|:-----------|:------|
| **Model Format:** TensorFlow Lite (.tflite) | [![TensorFlow](https://img.shields.io/badge/Model-TensorFlow_Lite-FF6F00?style=flat-square)](https://www.tensorflow.org/lite) |
| **Input Shape:** [1, 224, 224, 3] (RGB normalized 0-1) | |
| **Output:** 4-class softmax probabilities | |
| **RL Algorithm:** UCB1 Multi-Arm Bandit | [![RL](https://img.shields.io/badge/RL-UCB1_Algorithm-43A047?style=flat-square)](#) |
| **RL Parameters:** ε=0.20, UCB_C=1.414 | |

---

## How to Run the Project

### 1. Setting Up the FastAPI Backend Server

#### Prerequisites
- Python 3.9 or higher installed
- pip package manager

#### Steps

```bash
# Navigate to the main project folder
cd Bazgar_3

# Install dependencies
pip install fastapi uvicorn tensorflow numpy pillow python-multipart

# Or use requirements.txt (if created)
pip install -r requirements.txt

# Launch the backend server
python backend.py
```

The server will start at: `http://localhost:8000`

- Interactive API Documentation: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

> [!NOTE]
> If you want to access the web app from another device (e.g., a phone on the same Wi-Fi), find your computer's local IP address (e.g., 192.168.1.100) and replace `localhost` in the frontend's API configuration (currently hardcoded to `http://localhost:8000` in `app.js`).

### 2. Running the Web Application

1. Open the `index.html` file located in the `Bazgar_3/` directory directly in any modern web browser (Chrome, Firefox, Edge, etc.).
2. Alternatively, use a local development server:
   ```bash
   # Using Python's built-in HTTP server
   cd Bazgar_3
   python -m http.server 5500
   ```
   Then navigate to `http://localhost:5500` in your browser.

### 3. First-Time Setup & Verification

1. Ensure the backend server is running (`http://localhost:8000`).
2. Open the web app.
3. Check the **API Status** indicator at the top of the Detection page.
   - ✅ **Green "Model ready"** means connection is successful.
   - ❌ **Red error message** means the backend is not reachable.
4. You are ready to upload an apple leaf image or use the RL Crop Assistant.

---

## Project Structure

```
Bazgar_AI/
│
├── LICENSE                                 # GPL v3.0 license
├── README.md                               # This file
│
├── Bazgar_3/                               # Main application folder
│   │   app.js                              # Frontend JavaScript (main)
│   │   app2.js                             # Additional frontend scripts
│   │   apple_disease_model.tflite          # Trained TensorFlow Lite model
│   │   backend.py                          # FastAPI server
│   │   index.html                          # Main HTML file
│   │   style.css                           # Styles (Balochi theme + RTL)
│   │
│   │   # Images for hero slider & cultural showcase
│   │   b1.png, b2.png, b3.png, b4.png, b5.png, b6.png, b7.png, b8.png, b9.png, b10.png, b13.png, b14.png, b15.png, b22.png
│   │
│   │   # Voice files for Balochi disease explanations
│   │   d0.wav, d1.wav, d2.wav, d3.wav
│   │
│   │   # Video file
│   │   r1.mp4
│   │
│   ├── .vscode/
│   │   └── settings.json                   # VS Code configuration
│   │
│   ├── agent/                              # RL Crop Assistant module
│   │   ├── agent.js                        # RL agent logic
│   │   └── index_agent.html                # Assistant standalone page
│   │
│   ├── privacy_policy/
│   │   └── bazgar_ai_priacy.html          # Privacy policy page
│   │
│   └── translation_csv/
│       └── eng_urdu_balochi.xlsx          # Translation data (English, Urdu, Balochi)
│
└── PPT/
    └── Bazgar_AI.pptx                      # Course presentation slides
```

---

## Privacy Policy

بزگر سنگت اے آئی values user privacy. The web application accesses device camera only for live image capture. No images or personal data are stored permanently on any server. All RL learning data is stored locally in your browser's LocalStorage and can be cleared at any time via the "Reset Memory" button.

**View Published Privacy Policy:** [bazgar_ai_privacy_policy](https://bazgar-ai-privacy-police.netlify.app/)

**No personal datasets are shared with any third-party servers.**

---

## Future Enhancements

> **Currently Under Development** 🚧

- **Speech-to-Text Input:** Allow farmers to ask questions via voice in Balochi
- **Voice Recognition for Balochi dialects:** Enable voice-based navigation and queries
- **Expanded Disease Dataset:** Add more apple diseases (currently 4 classes, targeting 12+ classes)
- **Multi-Crop Support:** Extend to grapes, pomegranates, and dates
- **Push Notification Alerts:** Notify farmers of seasonal disease risks
- **Mobile App Version:** Convert to React Native or Flutter for better offline support
- **On-Device Offline Inference:** Embed TensorFlow Lite model directly into mobile app
- **Translator Page:** Complete the multilingual translation feature
- **Chatbot Page:** Implement AI-powered farming chatbot
- **Data Hub Page:** Advanced analytics and reporting dashboard

---

## Developed By

| | |
|:---|:---|
| **Developer Name** | Alina Liaquat |
| **Supervisor Name** | Faisal Hafeez |
| **GitHub** | [@precious-05](https://github.com/precious-05) |
| **Email** | [alina.insights@gmail.com](mailto:alina.insights@gmail.com) |
| **Class & Semester** | BS Computer Science - 6th Semester |
| **Department** | Department of Computer Science |
| **Course** | Artificial Intelligence |
| **LinkedIn** | [www.linkedin.com/in/alina-liaquat-779347325](https://www.linkedin.com/in/alina-liaquat-779347325) |

---

<div align="center">

**بزگر سنگت اے آئی - Bazgar Sangat AI**  
*Empowering Balochi farmers through accessible artificial intelligence* 🇵🇰

*This project was submitted in partial fulfillment of the requirements for the Artificial Intelligence course.*  
*🚧 Currently under active development - new features coming soon*

</div>
