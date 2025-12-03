// -------------------------------
// QUIZ DATA (required by Cypress)
// -------------------------------
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
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

// DOM ELEMENTS
const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// ----------------------------------------------
// Load stored answers from sessionStorage
// ----------------------------------------------
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ----------------------------------------------
// DISPLAY QUIZ
// ----------------------------------------------
function loadQuiz() {
  questionsDiv.innerHTML = ""; // clear before render

  quizData.forEach((q, index) => {
    const questionBox = document.createElement("div");

    // question text
    const qText = document.createElement("p");
    qText.innerText = q.question;
    questionBox.appendChild(qText);

    // options
    q.options.forEach((option, optIndex) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `q${index}`;
      radio.value = optIndex;

      // Restore checked state from sessionStorage
      if (savedProgress[`q${index}`] == optIndex) {
        radio.checked = true;
      }

      // Save progress on change
      radio.addEventListener("change", () => {
        savedProgress[`q${index}`] = optIndex;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      questionBox.appendChild(label);
      questionBox.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(questionBox);
  });
}

// ----------------------------------------------
// CALCULATE SCORE + SAVE TO LOCAL STORAGE
// ----------------------------------------------
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && Number(selected.value) === q.answer) {
      score++;
    }
  });

  const result = `Your score is ${score} out of ${quizData.length}.`;

  scoreDiv.textContent = result;

  // Save score
  localStorage.setItem("score", score);
});

// Render quiz
loadQuiz();

// ----------------------------------------------
// ON PAGE LOAD: display last score if exists
// ----------------------------------------------
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of ${quizData.length}.`;
}
