// SELECTORS
var buttonSectionEl = document.querySelector("#buttonSection");
var questionSectionEl = document.querySelector("#questionSection");
var answerResultSectionEl = document.querySelector("#answerResultSection");
var highscoresSectionEl = document.querySelector("#highscoresSection");
var headerEl = document.querySelector("header")
var timeLeft = document.querySelector("#timeLeft");
var highscoresForm = document.querySelector("#newscore");
var highscoreList = document.querySelector("#highscoreList");
var highscoreSpan = document.querySelector("#highscore");
var userScoreSpan = document.querySelector("#userScore");
var nameInput = document.querySelector("#nameInput");
var highscoreSubmitButton = document.querySelector("#highscoreSubmit");
var message = document.querySelector("#message");
var intro = document.querySelector("#intro");
var instructions = document.querySelector("#instructions");

//DECLARE & INITIALIZE VARIABLES & ARRAYS
var questionNumber=0;
var seconds=60;
var score=0;
var highscores = [];

//CREATE START BUTTON
var startButton = document.createElement("button");
startButton.textContent = "Start Quiz";
buttonSectionEl.appendChild(startButton);

//WRITE TIME LEFT TO DOM
timeLeft.textContent = seconds;

//QUESTION & ANSWER ARRAY
var questions = [

    {
    "qtext" : "Which of these words begins with the letter 'P'?",
    answerArray :
    ["A. Person", "B. Elephant", "C. Orange", "D. Dementia"],
    "correctAnswer" : "A. Person"
    }, 

    {
    "qtext" : "Which of these words has 5 letters?",
    answerArray :
    ["A. 44","B. Woman", "C. Coronavirus", "D. $"],
    "correctAnswer" : "B. Woman"
    },

    {
    "qtext" : "Which of these words contains the letters 'M', 'A', and 'N'?",
    answerArray : 
    ["A. USA", "B. Fauci", "C. Man", "D. Portland"],
    "correctAnswer" : "C. Man"
    },

    {
    "qtext" : "Which of these is a device used to take a picture?",
    answerArray : 
    ["A. Spinach", "B. Ant", "C. Cloud", "D. Camera"],
    "correctAnswer" : "D. Camera"
    },

    {
    "qtext" : "Which of these is a device used to watch shows or movies?",
    answerArray : 
    ["A. Blender", "B. Hammer", "C. Toilet", "D. TV"],
    "correctAnswer" : "D. TV"
    }
]

// DEFINE FUNCTIONS

function startTimer() {
    questionNumber = 0;
    nextQuestion();
    timer = setInterval(function(){
        seconds --;
        timeLeft.textContent = seconds;
        if (seconds<=0) {
            clearInterval(timer);
            timeLeft.textContent = "";
            gameOver();
        }
    }, 1000)
}

function gameOver() {
    alert("Ohh dear, you ran out of time! To try the test again, refresh the page.")
}

function nextQuestion() {
    highscoreSpan.classList.add("invisible");
    intro.innerHTML = questions[questionNumber]["qtext"];
    instructions.innerHTML = "";
    answerResultSectionEl.textContent = "";
    startButton.classList.add("hidden");
    for (var i=0; i<questions[questionNumber].answerArray.length; i++){
        answerButton = document.createElement("button");
        answerButton.classList.add("answerButton");
        answerButton.setAttribute("value", questions[questionNumber].answerArray[i]);
        answerButton.textContent = questions[questionNumber].answerArray[i];
        answerButton.onclick = checkAnswer;
        buttonSectionEl.appendChild(answerButton);
    }
}

function checkAnswer() {
        if (this.value === questions[questionNumber].correctAnswer && questionNumber<(questions.length-1)) {
            answerResultSectionEl.textContent = "Correct";
            questionNumber++;
            buttonSectionEl.innerHTML = "";
            nextQuestion();
        } else if (this.value === questions[questionNumber].correctAnswer && questionNumber === (questions.length-1)) {
            score = seconds;
            clearInterval(timer);
            goToAddHighscores();
        } else {
            answerResultSectionEl.textContent = "Wrong answer - Try again!";
            seconds -= 10;
        }
    }

function goToAddHighscores() {
    hideQuestionElements();
    highscoresSectionEl.classList.remove("hidden");
    userScoreSpan.textContent = score;
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }
}

function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function renderHighscores() {
    highscoreList.innerHTML = "";
    for (var i=0; i<highscores.length; i++) {
        var highscore = highscores[i];
        var li = document.createElement("li");
        li.textContent = highscore;
        highscoreList.appendChild(li);
    }
    highscoresForm.classList.add("hidden");
    message.classList.add("hidden");
}

function createRefreshButton() {
    var refreshButton = document.createElement("button");
    refreshButton.textContent = "Try Again";
    highscoresSectionEl.appendChild(refreshButton);
    refreshButton.addEventListener("click", function(event) {
        event.preventDefault();
        location.reload();
    })
}

function createClearButton() {
    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear Scores";
    highscoresSectionEl.appendChild(clearButton);
    clearButton.addEventListener("click", function(event) {
        event.preventDefault();
        highscores = [];
        storeHighscores();
        renderHighscores();
    })
}

function viewHighscores() {
    hideQuestionElements();
    highscoresSectionEl.classList.remove("hidden");
    highscoreList.classList.remove("hidden");
    highscoresForm.classList.add("hidden");
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }
    renderHighscores();
    buttonSectionEl.classList.remove("hidden")
    startButton.classList.add("hidden");
    createRefreshButton();
}

function hideQuestionElements() {
    questionSectionEl.classList.add("hidden");
    buttonSectionEl.classList.add("hidden");
    answerResultSectionEl.classList.add("hidden");
    headerEl.classList.add("hidden");
}

//ADD EVENT LISTENERS
startButton.addEventListener("click", startTimer);

highscoresForm.addEventListener("submit", function(event){
    event.preventDefault();
    var userNameText = nameInput.value.trim();
    var d = new Date();
    highscores.push(userNameText + ": " + score + " | " + d);
    nameInput.value = "";
    storeHighscores();
    renderHighscores();
    createRefreshButton();
    createClearButton();
});

highscoreSpan.addEventListener("click", viewHighscores);
