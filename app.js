const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyperlinking Text Marking Language",
    ],
    answer: 0,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Control Style Sheets",
      "Computer Style Sheets",
    ],
    answer: 1,
  },
  {
    question: "when doing an array, what method adds an element to the end?",
    options: ["unshift()", "pop()", "shift()", "push()"],
    answer: 3,
  },
  {
    question: "why do we use javascript?",
    options: [
      "to keep everything clean",
      "creating images",
      "enhance interactivity on web pages",
      "helping with every answer",
    ],
    answer: 2,
  },
];

// Map pages to correct answer indices
const correctAnswers = {
  "page1.html": 0, // HyperText Markup Language
  "page2.html": 1, // Cascading Style Sheets
  "page3.html": 3, // push()
  "page4.html": 2, // enhance interactivity on web pages
};

// Add interactivity to quiz options
document.addEventListener("DOMContentLoaded", function () {
  const optionButtons = document.querySelectorAll(".option");
  const currentPage = window.location.pathname.split("/").pop();
  const correctAnswer = correctAnswers[currentPage];
  let hasAnswered = false;

  // Check if user already answered this question
  const savedAnswer = sessionStorage.getItem(currentPage);
  if (savedAnswer !== null) {
    hasAnswered = true;
  }

  optionButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      // Prevent changing answer if already answered
      if (hasAnswered) {
        return;
      }

      // Mark as answered
      hasAnswered = true;

      // Disable all buttons
      optionButtons.forEach((btn) => {
        btn.style.pointerEvents = "none";
        btn.classList.remove("selected", "correct", "wrong");
      });

      // Check if answer is correct
      if (index === correctAnswer) {
        this.classList.add("correct");
        // Track correct answer
        const isCorrectKey = currentPage + "_correct";
        sessionStorage.setItem(isCorrectKey, "true");
      } else {
        this.classList.add("wrong");
        // Also highlight the correct answer
        if (optionButtons[correctAnswer]) {
          optionButtons[correctAnswer].classList.add("correct");
        }
        // Track incorrect answer
        const isCorrectKey = currentPage + "_correct";
        sessionStorage.setItem(isCorrectKey, "false");
      }

      // Store the selected answer in sessionStorage
      sessionStorage.setItem(currentPage, index);
    });
  });

  // Restore previously selected answer if it exists
  if (savedAnswer !== null && optionButtons[savedAnswer]) {
    const savedIndex = parseInt(savedAnswer);

    // Disable all buttons since answer was already given
    optionButtons.forEach((btn) => {
      btn.style.pointerEvents = "none";
    });

    if (savedIndex === correctAnswer) {
      optionButtons[savedIndex].classList.add("correct");
    } else {
      optionButtons[savedIndex].classList.add("wrong");
      if (optionButtons[correctAnswer]) {
        optionButtons[correctAnswer].classList.add("correct");
      }
    }
  }

  // Display score on page5.html
  if (currentPage === "page5.html") {
    calculateAndDisplayScore();
  }

  // Handle restart button
  const restartButton = document.getElementById("restart-quiz");
  if (restartButton) {
    restartButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Clear all quiz data from sessionStorage
      sessionStorage.clear();
      // Navigate to index.html
      window.location.href = "index.html";
    });
  }
});

function calculateAndDisplayScore() {
  const pages = ["page1.html", "page2.html", "page3.html", "page4.html"];
  let correctCount = 0;
  let totalQuestions = pages.length;

  pages.forEach((page) => {
    const isCorrectKey = page + "_correct";
    const isCorrect = sessionStorage.getItem(isCorrectKey);
    if (isCorrect === "true") {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Find the score display element
  const scoreDisplay = document.querySelector(".quiz-start:nth-of-type(2)");
  if (scoreDisplay) {
    scoreDisplay.innerHTML = `Your Score: ${correctCount} out of ${totalQuestions} (${percentage}%)`;
    scoreDisplay.style.fontSize = "2em";
    scoreDisplay.style.fontWeight = "bold";

    if (percentage >= 75) {
      scoreDisplay.style.color = "#4caf50";
    } else if (percentage >= 50) {
      scoreDisplay.style.color = "#ff9800";
    } else {
      scoreDisplay.style.color = "#f44336";
    }
  }
}
