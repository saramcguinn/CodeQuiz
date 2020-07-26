// Create divs for: header, questions, answer-choices, answer-result, timer, highscore
// Array of questions and answers, answers with booleans
// Timer starts at 75 seconds
// Starting page shows instructions and has button to start
// Answer choices are buttons
// Correct answer button clicked causes "correct" to appear underneath question and next question to appear
// Incorrect answer button clicked causes "wrong" to appear underneath question & subtract time
// If timer runs out, quiz ends and score is zero
// If all questions are answered correctly, quiz ends and time left is stored
// User is directed to high scores page

// High scores page has ordered list
// Form entry field for initials
// Submit button
// When submit button is clicked, high score and initials are stored in long-term storage
// Added to list of high scores
// Displayed in descending order

// SELECTORS
var buttonSectionEl = document.querySelector("#buttonSection");
var questionSectionEl = document.querySelector("#questionSection");
var answerResultSectionEl = document.querySelector("#answerResultSection");
var timeLeft = document.querySelector("#timeLeft");
var answerButton = document.querySelector(".answerButton");

//DECLARE & INITIALIZE VARIABLES
var seconds = 75;
var timer;

// //CREATE ANSWER BUTTON
// var answerButton = document.createElement("button");
// answerButton.classList.add("hide");
// buttonSectionEl.appendChild(answerButton);

//CREATE START BUTTON
var startButton = document.createElement("button");
startButton.textContent = "Start Quiz";
buttonSectionEl.appendChild(startButton);

//WRITE TIME LEFT TO DOM
timeLeft.textContent = seconds;

//QUESTION & ANSWER ARRAY
var questions = [

    {
    "qtext" : "Question1?",
    answerArray :
    [
    {"text" : "A. 1choice",
    "isCorrect" : true},
    {"text" : "B. 1choice",
    "isCorrect" : false},
    {"text" : "C. 1choice",
    "isCorrect" : false},
    {"text" : "D. 1choice",
    "isCorrect" : false},
    ]
    }, 

    {
    "qtext" : "Question2?",
    answerArray :
    [
    {"text" : "A. 2choice",
    "isCorrect" : false},
    {"text" : "B. 2choice",
    "isCorrect" : true},
    {"text" : "C. 2choice",
    "isCorrect" : false},
    {"text" : "D. 2choice",
    "isCorrect" : false},
    ]
    },

    {
    "qtext" : "Question3?",
    answerArray : 
    [
    {"text" : "A. 3choice",
    "isCorrect" : false},
    {"text": "B. 3choice",
    "isCorrect": false},
    {"text": "C. 3choice",
    "isCorrect": true},
    {"text": "D. 3choice",
    "isCorrect" : false},
    ]
    }
]

// DEFINE FUNCTIONS
function startTimer() {
    nextQuestion();
    timer = setInterval(function(){
        seconds --;
        timeLeft.textContent = seconds;
        if (seconds===0) {
            clearInterval(timer);
            console.log("Game over!");
        }
    }, 1000)
}

questionNumber = 0

function nextQuestion() {
    // for(var i=0; i<questions.length; i++) {
    questionSectionEl.textContent = questions[questionNumber]["qtext"];
    startButton.classList.add("hide");
    for (var i=0; i<questions[questionNumber].answerArray.length; i++){
        answerButton = document.createElement("button");
        answerButton.classList.add("answerButton");
        answerButton.textContent = questions[questionNumber].answerArray[i]["text"];
        buttonSectionEl.appendChild(answerButton);
    }
    questionNumber++;
}

function checkAnswer() {
    // if (questions[questionNumber].answerArray["isCorrect"] === false) {
    console.log("Clicked");
    // answerResultSectionEl.textContent = "Wrong";
    // } else {
    //     answerResultSectionEl.textContent = "Correct";
    // }
}


//ADD EVENT LISTENERS
startButton.addEventListener("click", startTimer);
answerButton.addEventListener("click", checkAnswer);