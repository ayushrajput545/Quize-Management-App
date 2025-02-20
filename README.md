# Quiz Management React App

## 🚀 Live Demo
🔗 [Live Link Here](https://quize4u.netlify.app/)  

## 📌 Features

### ✅ Quiz System with Multiple Question Types
- Displays **multiple-choice** and **integer-type** questions.
- Each question appears **one at a time** to provide a structured experience.
- Users can **select answers** and get **instant feedback**.

### ⏳ Timer-Based Quizzes
- Each question has a **30-second countdown timer**.
- If the timer reaches **0**, the question is marked as **skipped**, and the next question appears automatically.

### 🔄 Multiple Quiz Attempts
- Users can **retake the quiz** as many times as they want.
- Each attempt resets the quiz with fresh tracking of correct, incorrect, and skipped questions.

### 📊 Scoreboard & History Tracking
- At the end of the quiz, a **scoreboard** displays:
  - ✅ Correct answers
  - ❌ Incorrect answers
  - ⏭️ Skipped questions
- Quiz history is **stored in IndexedDB**, allowing users to review past attempts.

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/quiz-management-app.git
cd quiz-management-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Development Server
```bash
npm start
```
- The app will run on `http://localhost:3000/` by default.

## 🌍 Deployment on Netlify

1️⃣ **Push Code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2️⃣ **Deploy to Netlify**
- Go to [Netlify](https://www.netlify.com/).
- Click **"New site from Git"**.
- Select **GitHub** and choose your repository.
- Configure build settings:
  - Build Command: `npm run build`
  - Publish Directory: `build/`
- Click **"Deploy Site"**.

 

 
