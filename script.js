/*********************************************************************************************************************************
SELECTORS 
*********************************************************************************************************************************/
var buttonSectionEl = document.querySelector("#buttonSection");
var questionSectionEl = document.querySelector("#questionSection");
var answerResultSectionEl = document.querySelector("#answerResultSection");
var highscoresSectionEl = document.querySelector("#highscoresSection");
var headerEl = document.querySelector("header");
var timerSpan = document.querySelector("#timer");
var timeLeft = document.querySelector("#timeLeft");
var highscoresForm = document.querySelector("#newscore");
var highscoreList = document.querySelector("#highscoreList");
var highscoreSpan = document.querySelector("#highscoreSpan");
var userScoreSpan = document.querySelector("#userScore");
var nameInput = document.querySelector("#nameInput");
var highscoreSubmitButton = document.querySelector("#highscoreSubmit");
var message = document.querySelector("#message");
var intro = document.querySelector("#intro");
var instructions = document.querySelector("#instructions");


/*********************************************************************************************************************************
DECLARE & INITIALIZE VARIABLES & ARRAYS
*********************************************************************************************************************************/
var questionNumber=0;
var seconds=60;
var score=0;
var highscores = [];


/*********************************************************************************************************************************
CREATE START BUTTON
*********************************************************************************************************************************/
var startButton = document.createElement("button");
startButton.textContent = "Start Test";
buttonSectionEl.appendChild(startButton);


/*********************************************************************************************************************************
WRITE TIME LEFT TO DOM
*********************************************************************************************************************************/
timeLeft.textContent = seconds;


/*********************************************************************************************************************************
QUESTION & ANSWER ARRAY
*********************************************************************************************************************************/
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


/*********************************************************************************************************************************
DEFINE FUNCTIONS
*********************************************************************************************************************************/

function startTimer() {
//starts timer, writes time left to DOM, doesn't fall below 0
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
//alerts user if they run out of time & then reloads page so they can try again
    alert("Uh-oh, you ran out of time! Why don't you give it another shot?")
    location.reload();
}

function nextQuestion() {
//when user starts test or moves on to next question, displays question & renders buttons for answer choices
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
/*checks whether button corresponds to correct answer. 
if yes AND there are more questions, moves on to next question.
if yes AND that was the last question, stores score and takes user to highscores page.
if no, displays message to user and takes off time. */
    answerResultSectionEl.textContent = "";
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
        setTimeout(function(){
            answerResultSectionEl.textContent = "";
        }, 500);
        seconds -= 10;
    }
}

function goToAddHighscores() {
//displays highscores page, user's score, & form for user to add their name
    hideQuestionElements();
    headerEl.classList.remove("hidden");
    highscoresSectionEl.classList.remove("hidden");
    userScoreSpan.textContent = score;
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }
}

function storeHighscores() {
//stores highscores array to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function renderHighscores() {
//sorts objects in highscores array in descending score order, creates a list item for each high score object & renders the list to the DOM
    highscoreList.innerHTML = "";
    highscores = highscores.sort(compare)
    console.log(highscores);
    for (var i=0; i<highscores.length; i++) {
        // var highscore = highscores[i];
        var li = document.createElement("li");
        li.textContent = highscores[i].score + " | " + highscores[i].userName + " | " + highscores[i].date;
        highscoreList.appendChild(li);}
    highscoresForm.classList.add("hidden");
    message.classList.add("hidden");
}

function compare(a,b) {
//compares the scores in each object in highscores array in order to allow objects to be sorted in descending score order
//function code copied from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    const scoreA = a.score;
    const scoreB = b.score;

    let comparison = 0;
    if (scoreA > scoreB) {
        comparison = 1;
    } else if (scoreA < scoreB) {
        comparison = -1;
    }
    return comparison * -1;
}

function createRefreshButton() {
//creates button to take user back to start page to retake the test
    var refreshButton = document.createElement("button");
    refreshButton.textContent = "Try Again";
    highscoresSectionEl.appendChild(refreshButton);
    refreshButton.addEventListener("click", function(event) {
        event.preventDefault();
        location.reload();
    })
}

function createBackButton() {
//creates button to take user back to homepage after viewing highscores
//same function as refreshButton with different text content
    var backButton = document.createElement("button");
    backButton.textContent = "Back";
    highscoresSectionEl.appendChild(backButton);
    backButton.addEventListener("click", function(event) {
        event.preventDefault();
        location.reload();
    })
}

function createClearButton() {
//creates button to clear high scores by setting highscores array to empty
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
//makes highscores list visible but without a form to add a name
    hideQuestionElements();
    highscoreSpan.classList.add("invisible");
    timerSpan.classList.add("hidden");
    headerEl.classList.remove("hidden");
    highscoresSectionEl.classList.remove("hidden");
    highscoreList.classList.remove("hidden");
    highscoresForm.classList.add("hidden");
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores !== null) {
        highscores = storedHighscores;}
    renderHighscores();
    buttonSectionEl.classList.remove("hidden")
    startButton.classList.add("hidden");
    createBackButton();
}

function hideQuestionElements() {
//hides elements related to questions/answers in order to later display the highscores elements
    questionSectionEl.classList.add("hidden");
    buttonSectionEl.classList.add("hidden");
    answerResultSectionEl.classList.add("hidden");
    headerEl.classList.add("hidden");
}

/*********************************************************************************************************************************
ADD EVENT LISTENERS
*********************************************************************************************************************************/
startButton.addEventListener("click", startTimer);

highscoresForm.addEventListener("submit", function(event){
    event.preventDefault();
    var userNameText = nameInput.value.trim();
    var d = new Date().toLocaleString();
    highscores.push({"userName" : userNameText, "score" : score, "date" : d});
    nameInput.value = "";
    storeHighscores();
    renderHighscores();
    createRefreshButton();
    createClearButton();
});

highscoreSpan.addEventListener("click", viewHighscores);
