// Correct answers
const answers = {
  q1: "4",
  q2: "Paris",
  q3: "Blue",
  q4: "Apple",
  q5: "Python"
};

// Load progress from sessionStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const saved = sessionStorage.getItem("progress");

  if (saved) {
    const progress = JSON.parse(saved);

    // Restore checked answers
    for (let q in progress) {
      const val = progress[q];
      const input = document.querySelector(`input[name="${q}"][value="${val}"]`);
      if (input) {
        input.checked = true;
      }
    }
  }

  // Load score from localStorage if available
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    document.getElementById("score").innerText = `Your score is ${savedScore} out of 5.`;
  }
});


// Listen for radio button selection (SAVE PROGRESS)
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener("change", () => {
    let progress = sessionStorage.getItem("progress");
    progress = progress ? JSON.parse(progress) : {};

    progress[radio.name] = radio.value;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });
});


// Handle SUBMIT BUTTON
document.getElementById("submit").addEventListener("click", () => {
  const progress = sessionStorage.getItem("progress");
  let score = 0;

  if (progress) {
    const selected = JSON.parse(progress);

    // Calculate score
    for (let q in answers) {
      if (selected[q] === answers[q]) {
        score++;
      }
    }
  }

  // Display the score
  document.getElementById("score").innerText = `Your score is ${score} out of 5.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});
