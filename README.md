# ADAPT Academy - E-Learning Platform & Certification

A responsive web application built with vanilla **HTML5, CSS3, and modern JavaScript** for industrial engineering training, scenario-based learning, and certification. Designed for deployment to **Vercel** with zero build configuration.

---

## 🌟 Features Overview

1. **6 Full Pages**:
   - **Home (`index.html`)**: Course overview, curriculum roadmaps, dynamic progress bar, teacher guidance.
   - **Module 1 (`module1.html`)**: Theory Review & Foundations (Videos 1.1, 1.2, 1.3, What you will learn, 4-question practice quiz with instant explanations).
   - **Module 2 (`module2.html`)**: The Outage Decision (Simulated operational status board matching reference UI, SCM team communication, Videos 2.1, 2.2, 2.3, scenario practice quiz).
   - **Module 3 (`module3.html`)**: Digital Handover & Continuous Improvement (Videos 3.1, 3.2, 3.3, digital logging takeaways, 4-question practice quiz).
   - **L&D Module Hubs (`ld-hub.html`)**: Core L&D Frameworks 60-second reference card under Module 3. Covers Kirkpatrick 4-Level Evaluation Model (with expandable details and Shift Transfer Check Likert tool), 70/20/10 Learning Ecosystem visual diagram, LTEM Will Thalheimer Transfer Framework comparison (Level 4 vs. Level 7), and one-click Quick Reflex Check.
   - **Final Assessment (`assessment.html`)**: Strict examination consisting solely of questions and answers: **10 Scenario-Based MCQs (40 pts) + 5 Field Scenario Case Studies (60 pts, 200–1000 words)**. Requires **≥ 80% passing score**. Features a live 60-minute countdown timer (persisting seamlessly across page refresh), question navigation palette, flag-for-review capability, word count validator, Quit Exam safety warning popup, and score breakdown review modal.
   - **Official Certificate (`certificate.html`)**: High-prestige certificate with AES Mong Duong branding and golden seal. Automatically saved to **web storage (`localStorage`)** so learners/teachers can return anytime to view or re-download. Includes:
     - **Save Name**: Input and update recipient name dynamically.
     - **Download as PDF / Print**: Formatted with `@media print` for landscape printing or saving as PDF.
     - **Download as PNG Image**: Direct high-resolution export rendered via HTML5 Canvas.

2. **Teacher Review Mode**:
   - Built directly into the left sidebar. Toggle switch unlocks all modules, final assessment, and the certificate instantly for easy grading without needing to complete every prerequisite video.

3. **Centralized Data Store (`js/data.js`)**:
   - All questions, choices, correct answers, explanations, video titles, durations, and URLs are located in `js/data.js`.
   - To insert your real questions or videos, simply edit `js/data.js`!

---

## 🚀 How to Deploy to Vercel

### Method 1: Using Vercel GitHub Integration (Recommended)
1. Push this project folder to a GitHub repository.
2. Log into [vercel.com](https://vercel.com).
3. Click **"Add New Project"** and import your repository.
4. Framework Preset: **Other** (Root Directory: `./`).
5. Click **Deploy**. Your website will be live at `https://your-project.vercel.app`!

### Method 2: Using Vercel CLI
```bash
# In your terminal inside the project directory:
npm i -g vercel
vercel
```

---

## 📝 How to Insert Your Own Videos & Questions

Open `js/data.js`:

### To update a Video:
```javascript
{
  id: "1.1",
  label: "Lesson 1.1",
  title: "Your Video Title",
  duration: "04:15",
  videoUrl: "https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID",
  overview: "Your overview description...",
  keyPoints: ["Point 1", "Point 2"]
}
```

### To update a Question:
```javascript
{
  id: "m1_q1",
  question: "What is the primary objective of the ADAPT framework?",
  choices: [
    { id: "A", text: "Choice A text..." },
    { id: "B", text: "Choice B text..." },
    { id: "C", text: "Choice C text..." },
    { id: "D", text: "Choice D text..." }
  ],
  correctAnswer: "B", // Letter of the correct choice
  explanation: "Explanation shown after the user checks their answer..."
}
```
