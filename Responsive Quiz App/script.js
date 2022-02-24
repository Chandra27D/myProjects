const startScreen = document.querySelector('#start-screen');
const scoreCard = document.querySelector('#score-card');
const doneScreen = document.querySelector('#done-screen')
const questionContainer = document.querySelector('#question-container');
const default_time = 50;
let timer = default_time;
let currentIndex = 0;
let score = null;
let highScore = null;
let timerElement = document.querySelector('#timer');
let questionElement = document.querySelector('#question');
let optionElement = document.querySelector('#option-container');
const nextButton = document.querySelector('#next-btn');
const submitButton = document.querySelector('#submit-btn')
const goBack = document.querySelector('#go-back')

goBack.onclick = () =>{
  resetQuiz();
  startScreen.classList.remove('hide');
  scoreCard.classList.add('hide');
  questionContainer.classList.add('hide');
  doneScreen.classList.add('hide');
}

nextButton.onclick = () =>{
  nextQuestion();
}

submitButton.onclick = () =>{
  saveToLocal();
  document.querySelector('#score').innerHTML = score;
  document.querySelector('#high-score').innerHTML = highScore;
  showScoreCard();
}

function showQuiz(){
  startScreen.classList.add('hide');
  scoreCard.classList.add('hide');
  questionContainer.classList.remove('hide');
}

function startQuiz (){
  timer = default_time;
  resetQuiz();
  generateQuiz();
  timerElement.innerHTML = 50;
  timerLoop();
  showQuiz();
}

function generateQuiz(){
  questionElement.innerHTML = questions[currentIndex].questionText;
  for (let i=0; i<4; i++){
    let optionButton = document.createElement('button');
    optionButton.innerHTML = questions[currentIndex].options[i];
    optionButton.classList.add('option-btn');
    optionElement.appendChild(optionButton);
    optionButton.onclick = () =>{
      if (optionButton.innerHTML === questions[currentIndex].answer){
        document.querySelector('#answer').innerHTML = 'Correct';
        score += 5;
        nextQuestion();
      } else {
        document.querySelector('#answer').innerHTML = 'Incorrect';
        timer -=10;
        score += 0;
        nextQuestion();
      }
      
    }    
  }
}

function nextQuestion(){
  if (currentIndex>=4){
    showDoneScreen();
  } else{
    while(optionElement.firstChild){
      optionElement.removeChild(optionElement.firstChild)
    }
    currentIndex++;
    generateQuiz();
  }
}

function showDoneScreen(){
  startScreen.classList.add('hide');
  scoreCard.classList.add('hide');
  questionContainer.classList.add('hide');
  doneScreen.classList.remove('hide');
  clearInterval(timerInterval);
  timerElement.innerHTML = 0;
}

let timerInterval = null;
function timerLoop (){
  timerInterval = setInterval(() =>{
    timer--;
    timerElement.innerHTML = timer;
    if (timer <= 0){
      timerElement.innerHTML = 0;
      clearInterval(timerInterval)
      showDoneScreen();
    }
  }, 1000)
}

function showScoreCard (){
  startScreen.classList.add('hide');
  scoreCard.classList.remove('hide');
  questionContainer.classList.add('hide');
  doneScreen.classList.add('hide');
}

function resetQuiz(){
  currentIndex = 0;
  score = null;
  timer = default_time;
  document.querySelector('#timer').innerHTML = default_time;
  while(optionElement.firstChild){
    optionElement.removeChild(optionElement.firstChild)
  }
  document.querySelector('#answer').innerHTML = '';
}

function saveToLocal(){
  let HighScore = localStorage.getItem('High Score');
  HighScore = new Number(HighScore);
  highScore = HighScore;
  if (score >= highScore){
    highScore = score;
    let high_score = JSON.stringify(highScore);
    localStorage.setItem('High Score', high_score);
  } else {
    highScore = highScore;
    let high_score = JSON.stringify(highScore);
    localStorage.setItem('High Score', high_score);
  }
}

const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];


