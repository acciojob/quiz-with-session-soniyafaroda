// ----------- QUIZ QUESTIONS -----------
const questions = [
  {
    question: "1. What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: 1
  },
  {
    question: "2. Which one is a programming language?",
    options: ["HTML", "CSS", "JavaScript", "PNG"],
    answer: 2
  },
  {
    question: "3. What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "4. Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: 2
  },
  {
    question: "5. What is H2O?",
    options: ["Oxygen", "Hydrogen", "Water", "Acid"],
    answer: 2
  }
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");

// ----------- LOAD SAVED PROGRESS FROM SESSION STORAGE -----------
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ----------- DISPLAY QUESTIONS -----------
questions.forEach((q, qIndex) => {
  const questionBlock = document.createElement("div");

  const qTitle = document.createElement("p");
  qTitle.textContent = q.question;
  questionBlock.appendChild(qTitle);

  q.options.forEach((opt, optIndex) => {
    const label = document.createElement("label");
    label.style.display = "block";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question_${qIndex}`;
    radio.value = optIndex;

    // Restore saved answer
    if (savedProgress[qIndex] == optIndex) {
      radio.checked = true;
    }

    // Save progress when selected
    radio.addEventListener("change", () => {
      savedProgress[qIndex] = optIndex;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    label.appendChild(radio);
    label.append(" " + opt);
    questionBlock.appendChild(label);
  });

  questionsDiv.appendChild(questionBlock);
});

// ----------- ON SUBMIT: CALCULATE & STORE SCORE -----------
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (savedProgress[i] == q.answer) {
      score++;
    }
  });

  const resultText = `Your score is ${score} out of 5.`;
  scoreDiv.textContent = resultText;

  // Save final score to local storage
  localStorage.setItem("score", score);
});

// ----------- SHOW SAVED SCORE IF EXISTS -----------
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}
