function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function (answer) {
  if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function () {
  return this.currentQuestionIndex >= this.questions.length;
};
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};
var QuizUI = {
  displayNext: function () {
    if (quiz.hasEnded()) {
      this.displayScore();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
    }
  },
  displayQuestion: function () {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  },
  displayChoices: function () {
    var choices = quiz.getCurrentQuestion().choices;

    for (var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },
  displayScore: function () {
    var gameOverHTML = "<h1>Game Over</h1>";
    gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
    this.populateIdWithHTML("quiz", gameOverHTML);
  },

  populateIdWithHTML: function (id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },
  guessHandler: function (id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
      quiz.guess(guess);
      QuizUI.displayNext();
    };
  },

  displayProgress: function () {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML(
      "progress",
      "Question " + currentQuestionNumber + " of " + quiz.questions.length
    );
  },
};
//Create Questions
var questions = [
  new Question(
    "Who is the cofounder of Base Ecosystem?",
    ["George Washington", "Thomas Jefferson", "JessePollak", "I don't know"],
    "JessePollak"
  ),
  new Question(
    "Base Ecosystem is under which layer?",
    ["3rd", "4th", "2nd", "I don't know"],
    "2nd"
  ),
  new Question(
    "Base has low gas fee?",
    ["No", "Yes", "Hell Yeah", "No"],
    "Hell Yeah"
  ),
  new Question(
    "Can anyone build on base?",
    ["Yes", "Hell No", "Maybe", "I don't know"],
    "Yes"
  ),
  new Question(
    "Base has a native token",
    ["Yes", "Hell No", "Maybe", "I don't know"],
    "Hell No"
  ),
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
  this.startTime = 0;
  this.endTime = 0;
  this.timeTaken = 0; // Store the time taken for each question
}

Quiz.prototype.startTimer = function () {
  this.startTime = new Date().getTime(); // Start the timer when a question is displayed
};

Quiz.prototype.stopTimer = function () {
  this.endTime = new Date().getTime(); // Stop the timer when an answer is selected
  this.timeTaken = this.endTime - this.startTime; // Calculate time taken in milliseconds
};

var QuizUI = {
  displayNext: function () {
    if (quiz.hasEnded()) {
      this.displayScore();
      this.displayPerformanceRating();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
    }
  },

  displayQuestion: function () {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    quiz.startTimer(); // Start the timer when the question is displayed
  },

  displayChoices: function () {
    var choices = quiz.getCurrentQuestion().choices;

    for (var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },

  displayScore: function () {
    var gameOverHTML = "<h1>Game Over</h1>";
    gameOverHTML += "<h2>Your score is: " + quiz.score + "</h2>";
    this.populateIdWithHTML("quiz", gameOverHTML);
  },

  displayPerformanceRating: function () {
    var averageTime = quiz.timeTaken / quiz.questions.length;
    var performanceRating = "";

    if (averageTime < 5000) {
      performanceRating = "Excellent! You're very fast!";
    } else if (averageTime < 10000) {
      performanceRating = "Good job, but you can improve speed.";
    } else {
      performanceRating = "You might want to speed up a bit.";
    }

    var performanceHTML = "<h3>Performance Rating:</h3>";
    performanceHTML +=
      "<p>Average time per question: " +
      (averageTime / 1000).toFixed(2) +
      " seconds</p>";
    performanceHTML += "<p>" + performanceRating + "</p>";
    this.populateIdWithHTML("quiz", performanceHTML);
  },

  populateIdWithHTML: function (id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },

  guessHandler: function (id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
      quiz.stopTimer(); // Stop the timer when an answer is selected
      quiz.guess(guess);
      QuizUI.displayNext();
    };
  },

  displayProgress: function () {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    var totalQuestions = quiz.questions.length;
    this.populateIdWithHTML(
      "progress",
      "Question " + currentQuestionNumber + " of " + totalQuestions
    );
  },
};
