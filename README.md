# NIVASA AI — Predictive Living OS

> **iQOO Hackathon 2026 — Smart Living Track**  
> *"Your home should understand you, not just obey you."*  
> **Tagline:** Predict. Simulate. Automate.

---

## 📌 Problem Statement

Traditional smart home platforms are **reactive remotes**. They require manual button presses or simple static commands:
- *"Turn on light."*
- *"Turn off AC."*

This places the burden of home management entirely on the user. Current applications fail to reason over ambient context, energy efficiency, physical security, or the long-term impact of appliance operation.

---

## 💡 The NIVASA Solution

**NIVASA AI** transforms smart homes into **predictive environments**. Instead of blindly executing commands:
1. **Context Understanding:** NIVASA continuously interprets user goals and environmental states.
2. **Living Twin Engine:** Builds a lightweight digital twin of the user's home (rooms, devices, occupancy, historical events).
3. **Multi-Device Plan Generation:** Converts natural-language intent (e.g. *"I am leaving for two hours"*) into a multi-device action plan.
4. **Impact Preview (Core Differentiator):** Simulates energy savings ($\text{kWh}$), cost impact ($\text{₹}$), comfort score, and safety metrics *before* execution.
5. **Spatial Camera & Voice AI:** Uses phone camera vision to scan room appliances and Web Speech API for voice intent translation.

---

## ⚡ Key Product Features

### 1. Home Dashboard & Living Score
- **Living Score Widget (87/100):** Dynamic real-time calculation combining Comfort, Safety, Energy Efficiency, and Convenience.
- **Home Status Card:** Live monitoring of room occupancy, active wattage loads ($1200\text{W}$ AC, $60\text{W}$ fans), and door lock status.
- **AI Proactive Insight:** Instant alerts (e.g., *"Living room has been empty for 72 minutes while fan and light remain active"*).

### 2. Living Twin Engine
- **Interactive Floorplan:** 2D spatial representation of Bedroom, Living Room, Kitchen, Bathroom, and Entrance.
- **Device Node Graph:** Visual device chips with dynamic state updates (`ON`, `OFF`, `IDLE`, `WARNING`, `ACTIVE`).
- **Event Timeline Log:** Historical event auditing (e.g., occupancy changes, AC activations, fast charger draws).

### 3. AI Command Center & Natural Intent Parsing
- **Natural Language Input:** Processes queries like *"Prepare the room for studying"*, *"I am going to sleep"*, *"What is wasting electricity right now?"*.
- **Voice Microphone Integration:** Real-time Web Speech API transcription with glowing visualizer waveform.

### 4. Impact Preview — Core Differentiator
- **Before / After State Comparison:** Visual transition flow from `CURRENT STATE` $\rightarrow$ `AI PLAN` $\rightarrow$ `PREDICTED STATE`.
- **Quantified Impact Metrics:**
  - Energy Delta (e.g. $-0.82\text{ kWh}$)
  - Cost Savings (e.g. $-₹7.10$)
  - Comfort & Safety Delta
- **User Approval Guard:** Action execution requires 1-tap confirmation with celebration feedback.

### 5. Digital Twin What-If Simulator
- **Scenario Testing:** Ask *"What if I keep the AC on for 5 hours?"* or *"What if I switch AC from 22°C to 25°C?"*.
- **Multi-Option Comparison:** Option A (Full Cool) vs Option B (Eco Mode - Recommended) vs Option C (Natural Fan).
- **Energy & Cost Bar Graphs:** Transparent breakdown showing trade-offs between cost savings and thermal comfort.

### 6. "Scan My Room" Camera Scanner
- **Spatial Object Detection Overlay:** Utilizes camera feed/vision analysis to identify Fans, Lights, ACs, Monitors, Chargers.
- **Automatic Wattage Estimation:** Maps detected objects directly to Living Twin smart devices.

### 7. Zero-Trust Local Privacy Matrix
- **On-Device Local AI:** Runs local intent parsing with Gemma 2B / deterministic rule fallbacks.
- **Privacy Pledge:** Camera frames analyzed in RAM; voice commands and home context stay 100% local.

---

## 🛠 Tech Stack & Architecture

### Web & Interactive Demo Engine
- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS + Custom Material 3 Dark Glassmorphism
- **Icons & Visuals:** Lucide Icons + Canvas Confetti
- **State Management:** React Context API + RxJS-inspired Pub/Sub IoT DeviceManager
- **Local AI:** `AIEngine` hybrid intent parser & deterministic fallback rules

### Native Android Architecture (`/android`)
- **Language:** Kotlin
- **UI Framework:** Jetpack Compose + Material 3
- **Architecture:** Clean Architecture + ViewModel + StateFlow
- **On-Device AI Target:** Google LiteRT-LM / Gemma 2B local runtime

---

## 🎬 Hackathon Pitch Demo Script (3-Minute Evaluation)

Click the **"Pitch Demo"** button in the top bar to trigger automated scenario presets:

1. **Active Home Status:** View Himanshu's home running (Living Score 87/100, Living room empty 72 mins).
2. **Trigger Intent:** Say or select *"I am leaving for two hours"*.
3. **AI Reasoning:** AI generates a 5-device plan (Living Fan/Light OFF, AC to Eco 26°C, Lock engaged).
4. **Impact Preview:** Evaluator sees estimated energy saving ($-0.82\text{ kWh}$) and cost saving ($-₹7.10$).
5. **Apply Plan:** Tap `[APPLY PLAN]`. Living Twin updates live.
6. **Room Scanner:** Tap **Scanner** to run spatial camera device recognition.
7. **What-If Simulation:** Open **What-If** to compare AC 22°C vs Eco 25°C graphs.

---

## 🚀 How to Run Locally

```bash
# 1. Clone the repository
cd "Smart Living"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser at http://localhost:5173
```

---

*NIVASA AI — Built for iQOO Hackathon 2026 Smart Living Track.*
