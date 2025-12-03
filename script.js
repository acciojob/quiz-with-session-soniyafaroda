// Quiz questions required by Cypress
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2
  }
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreBox = document.getElementById("score");

// Load saved progress from sessionStorage
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Build the quiz UI
function loadQuiz() {
  questionsContainer.innerHTML = "";

  quizData.forEach((q, index) => {
    const div = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = q.question;
    div.appendChild(qText);

    q.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + index;
      input.value = optIndex;

      // Restore session storage progress
      if (savedProgress[index] == optIndex) {
        input.checked = true;
        input.setAttribute("checked", "true"); // 🔥 REQUIRED for Cypress
      }

      // Save progress on change
      input.addEventListener("change", () => {
        savedProgress[index] = optIndex;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(div);
  });
}

loadQuiz();

// Handle submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (savedProgress[index] == q.answer) {
      score++;
    }
  });

  scoreBox.textContent = `Your score is ${score} out of 5.`;

  // Save final score in local storage
  localStorage.setItem("score", score);
});
