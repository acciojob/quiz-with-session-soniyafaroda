// ---------------------- QUIZ QUESTIONS ----------------------
const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    answer: 1
  },
  {
    question: "What do plants absorb for photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    answer: 1
  },
  {
    question: "Which gas do humans need to breathe?",
    options: ["Carbon Dioxide", "Oxygen", "Hydrogen", "Nitrogen"],
    answer: 1
  }
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");

// ---------------------- LOAD SAVED PROGRESS ----------------------
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ---------------------- RENDER QUESTIONS ----------------------
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

    // Restore saved answer and set "checked" attribute for Cypress
    if (savedProgress[qIndex] == optIndex) {
      radio.checked = true;
      radio.setAttribute("checked", "true"); // REQUIRED by Cypress
    }

    // When user selects an option → save to sessionStorage
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

// ---------------------- SUBMIT QUIZ ----------------------
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (savedProgress[i] == q.answer) {
      score++;
    }
  });

  const resultText = `Your score is ${score} out of ${questions.length}.`;
  scoreDiv.textContent = resultText;

  // Store score in localStorage
  localStorage.setItem("score", score);
});

// ---------------------- SHOW SAVED SCORE (IF EXISTS) ----------------------
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
