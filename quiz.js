// select all elements
const startDiv = document.getElementById("start");
const quizDiv = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
var questionStatus = document.getElementById("questionStatus");
var nextQuestion = document.getElementById("nextButton");


quizDiv.style.display = "none";


// create our questions

let questions = [
    {
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110420.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "A",
        num:"1"
    },{
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110402.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "B",
        num:"2"
    },{
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110304.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "C",
        num:"3"
    },
    {
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110420.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "A",
        num:"4"
    },{
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110402.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "B",
        num:"5"
    },{
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110304.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "C",
        num:"6"
    },
    {
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110420.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "A",
        num:"7"
    },{
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110402.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "B",
        num:"8"
    },{
        question : "Wat moet je doen?",
        imgSrc : "https://web.theoriekennis.app/images/gevaarherkenning/110304.jpg",
        choiceA : "Remmen",
        choiceB : "Gas loslaten",
        choiceC : "Niets",
        correct : "C",
        num:"9"
    }
];



















// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 8; // 10s
const gaugeWidth =100; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;




// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}




function start() {
    startDiv.style.display = "none"; // Hide the start div
    quizDiv.style.display = "block"; // Show the quiz div


renderProgress();
    ShowQuestions(); // Update question number indicator

    // Set initial values for counter and time gauge
    counter.textContent = questionTime;
    timeGauge.style.width = "100%";

    // Start the timer
    startTimer();

 renderQuestion();

















    startQuiz();
}

// Add event listener to the "START" button
const startButton = document.querySelector(".start");
startButton.addEventListener("click", start);




// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
        
    }
}






// counter render
function renderCounter() {
    if (count <= questionTime) {
        counter.textContent = questionTime - count;
        timeGauge.style.width = (count / questionTime) * 100 + "%";
        count++;
    } else {
        count = 0;

        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
            renderProgress();
            ShowQuestions();
            startTimer(); // Start the timer for the next question
        } else {
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }

    // Regardless of the answer, move to the next question
    moveToNextQuestion();
}



function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


function scoreRender(){
    scoreDiv.style.display = "block";
    

    const scorePerCent = Math.round(100 * score/questions.length);
    
 
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}











function ShowQuestions() {
    questionStatus.textContent = `${runningQuestion + 1} / ${questions.length}`;
}






function startTimer() {
    let timeRemaining = questionTime;
    const timerElement = document.getElementById("counter");

    timerElement.textContent = questionTime; // Set counter to the initial time
    timeGauge.style.width = "100%"; // Reset the time gauge width

    TIMER = setInterval(() => {
        timerElement.textContent = timeRemaining;
        timeGauge.style.width = (timeRemaining / questionTime) * 100 + "%"; // Update the time gauge width
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(TIMER);
            moveToNextQuestionOnClick(); // Move to the next question
        }
    }, 1000);
}




// Function to handle "Next" button click
function moveToNextQuestion() {
    clearInterval(TIMER);

    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
        renderProgress();
        ShowQuestions();
        startTimer(); // Start the timer for the next question
    } else {
        clearInterval(TIMER);
        scoreRender();
    }
}

// ... (previous code)

// Add event listener to the Next button
const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", moveToNextQuestionOnClick);

// Function to handle "Next" button click
function moveToNextQuestionOnClick() {
    moveToNextQuestion();
}

// Start the quiz when the page loads
startQuiz();

