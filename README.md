
---

# 🍎 Bazgar Sangat AI - بزگار سنگت اے آئی

<div align="center">

**AI-Powered Apple Disease Detection & Smart Farming Assistant for Balochi Farmers**

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-Lite-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/lite)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)

[![Status](https://img.shields.io/badge/Status-Under%20Development-yellow?style=flat-square)]()
[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

</div>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Future Work](#-future-work)
- [License](#-license)

---

## Problem Statement

### Balochi: A Low-Resource Language Challenge

Balochi is a **low-resource language** spoken by millions across Pakistan, Iran and Afghanistan. Key challenges include:

| Challenge | Description |
|-----------|-------------|
| **Digital Underrepresentation** | Minimal NLP datasets or AI tools support Balochi |
| **Dialectal Diversity** | Multiple dialects (Western, Eastern, Southern, Rakhshani) with variations |
| **Literacy Barriers** | Lower literacy rates in rural areas, especially with English/Urdu |
| **Agricultural Knowledge Gap** | No AI-Powered plant disease diagnosis tools available in Balochi |
| **Economic Constraints** | Small-scale farmers cannot afford agricultural consultants |

### Why This Project?

> No existing AI agricultural tool supports Balochi language. Farmers in Balochistan lack access to modern disease detection technology in their native language.

---

## Solution Overview

**Bazgar Sangat AI** (بزگار سنگت اے آئی) - "Farmer Companion AI" in Balochi - provides:

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                    BAZGAR SANGAT AI                          │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌───────────────┐  ┌─────────────────┐ │
│  │    Disease    │  │      RL       │  │    Balochi      │ │
│  │   Detection   │  │  Assistant    │  │     Voice       │ │
│  │  (4 Classes)  │  │  (UCB MAB)    │  │   Playback      │ │
│  └───────────────┘  └───────────────┘  └─────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │     Full Balochi UI + RTL Support + English/Urdu     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

### 1. 🍎 Apple Disease Detection
- **4 Disease Classes**: Blotch Apple, Normal Apple, Rot Apple, Scab Apple
- **TensorFlow Lite** model for fast inference
- **Real-time prediction** via FastAPI backend
- **Symptoms & Treatment** in Balochi/English/Urdu

### 2. 🤖 RL Crop Assistant
- **Reinforcement Learning** using UCB1 (Upper Confidence Bound) algorithm
- **Multi-Arm Bandit** for optimal solution selection
- **Learns from farmer feedback** (👍 Helpful / 👎 Not Helpful)
- **Persistent memory** using browser LocalStorage
- ε-greedy exploration (ε=0.20) | UCB constant c=1.414

### 3. 🗣️ Multilingual Support
- **Full Balochi UI** with RTL (Right-to-Left) text rendering
- **English** fallback
- **Urdu** support for RL assistant responses
- **Voice playback** of diagnoses in Balochi (audio files)

### 4. 📱 Web Interface
- **Responsive design** (mobile/tablet/desktop)
- **Camera integration** for live photo capture
- **File upload** support
- **Batch prediction** endpoint available

### 5. 🎨 Cultural Homepage
- Hero slider with Balochi cultural imagery
- Statistics counter animation
- Testimonial carousel
- Newsletter signup (frontend only)

---

## 🛠️ Technology Stack

### Backend (from your main.py)
```yaml
Framework: FastAPI
Server: Uvicorn
ML Runtime: TensorFlow Lite Interpreter
Image Processing: PIL/Pillow
Port: 8000
```

### Frontend (from your app.js & index.html)
```yaml
HTML5 / CSS3 / JavaScript ES6+
Icons: Font Awesome 6
Fonts: Google Fonts (Inter)
Animations: Lottie Player (CDN)
Camera: MediaDevices API
Storage: LocalStorage (RL memory)
```

### AI/ML Components (confirmed from your code)
```yaml
Model Format: TensorFlow Lite (.tflite)
Input Shape: [1, 224, 224, 3] (RGB normalized 0-1)
Output: 4-class softmax probabilities
RL Algorithm: UCB1 Multi-Arm Bandit
RL Parameters: epsilon=0.20, UCB_C=1.414
```

---

## 📦 Installation

### Prerequisites
- Python 3.9+
- pip package manager

### Step 1: Clone Repository
```bash
git clone https://github.com/precious-05/Bazgar_AI.git
cd Bazgar_AI
```

### Step 2: Install Backend Dependencies
```bash
pip install fastapi uvicorn tensorflow pillow python-multipart numpy
```

Or use requirements.txt:
```bash
pip install -r requirements.txt
```

### Step 3: Place Model File
Put your `apple_disease_model.tflite` in the `backend/` folder.

### Step 4: Run Backend Server
```bash
cd backend
python main.py
# OR
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:
```
Loading model...
Model loaded successfully!
Input shape: [1 224 224 3]
Uvicorn running on http://0.0.0.0:8000
```

### Step 5: Open Frontend
Open `index.html` in a web browser, or use Live Server.

### Step 6: Verify API Connection
Visit `http://localhost:8000/health` - should show model ready status.

---

## 📖 Usage

### Disease Detection
1. Click **"Detection"** in navigation
2. Upload apple image (camera or file)
3. Click **"Predict"** button
4. View results: Disease name, confidence %, symptoms, treatment
5. Listen to Balochi voice recommendation (if available)

### RL Crop Assistant
1. Click **"Crop Assistant"** in navigation
2. Type farming problem in chat (Balochi/Urdu/English)
3. Agent provides solution based on UCB algorithm
4. Rate the solution (👍 Helpful / 👎 Not Helpful)
5. Agent learns and improves over time

### Language Switching
Click the **language toggle button** in navbar to switch between:
- **بلوچی** (Balochi - RTL)
- **English** (LTR)

---

## 📁 Project Structure

```
Bazgar_AI/
│
├── backend/
│   ├── main.py                    # FastAPI server
│   ├── apple_disease_model.tflite # Trained model (required)
│   └── requirements.txt           # Python dependencies
│
├── frontend/
│   ├── index.html                 # Main HTML file
│   ├── app.js                     # Frontend JavaScript
│   ├── style.css                  # Styles (Balochi theme + RTL)
│   │
│   ├── audio/                     # Voice files (d0.wav, d1.wav, d2.wav, d3.wav)
│   │
│   └── images/                    # UI images (b1.png, b3.png, b5.png, etc.)
│
├── README.md
└── LICENSE                        # GPL v3.0
```

---

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API root, returns status message |
| `/health` | GET | Health check, returns model loaded status |
| `/predict` | POST | Single image prediction |
| `/predict-batch` | POST | Multiple images prediction |

### Predict Request Example
```bash
curl -X POST http://localhost:8000/predict \
  -F "file=@apple_image.jpg"
```

### Predict Response Example
```json
{
  "success": true,
  "prediction": {
    "class_index": 2,
    "class_name": "Rot Apple",
    "confidence": 87.45,
    "all_probabilities": {
      "Blotch Apple": 5.23,
      "Normal Apple": 2.11,
      "Rot Apple": 87.45,
      "Scab Apple": 5.21
    }
  }
}
```

---

## 🗣️ Balochi Language Implementation

From your code, Balochi is implemented as:

### Translation Object (app.js)
- Complete UI translations for **Balochi** and **English**
- Partial Urdu support for RL assistant
- RTL CSS class (`body.rtl`) for proper text direction

### Disease Data (app.js)
- Symptoms and treatment in **Balochi** and **English**
- 4 disease classes fully translated

### Voice Feature
- Audio files: `d0.wav`, `d1.wav`, `d2.wav`, `d3.wav`
- Plays automatically after prediction when language is Balochi

---

## 🚀 Future Work

Based on your code comments and structure:

| Feature | Status |
|---------|--------|
| Translator Page | Coming Soon (placeholder) |
| Chatbot Page | Coming Soon (placeholder) |
| Data Hub Page | Coming Soon (placeholder) |
| Speech-to-Text Input | Not yet implemented |
| More Disease Classes | Can be extended |
| Offline PWA Mode | Not yet implemented |

### Currently Working On
- Voice recognition for Balochi dialects
- Expanding disease dataset
- Mobile app version

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Contribution Areas
- Add more Balochi dialect translations
- Submit apple disease images
- Improve RL assistant knowledge base
- Bug fixes and UI enhancements

---

## 📄 License

```
Bazgar Sangat AI - Apple Disease Detection for Balochi Farmers
Copyright (C) 2025 precious-05

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

**License**: GNU General Public License v3.0  
**Repository**: https://github.com/precious-05/Bazgar_AI

---

## 📞 Contact

**Developer**: precious-05  
**GitHub**: https://github.com/precious-05

---

<div align="center">

**Made for Balochi Farmers** 🇵🇰

*"Technology should speak your language"*

</div>

---

