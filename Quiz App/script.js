const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElements = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn')

let nextQuestion, currentIndex;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
    currentIndex++;
    setNextQuestion();
})
function startGame (){
    console.log('Game Started');
    startButton.classList.add('hide');
    nextQuestion = questions.sort();
    currentIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(nextQuestion[currentIndex])
}

function showQuestion(questions){
    questionElement.innerText = questions.question;
    questions.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElements.appendChild(button);
    })
}


function resetState (){
  clearStatus(document.body)
  nextButton.classList.add('hide');
  // While there is a child of answerButtonElement we want to remove the first child of the element 
  while (answerButtonElements.firstChild){
    answerButtonElements.removeChild(answerButtonElements.firstChild)
  }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct) //This will set the body color as per the status of the answer
      //Create an array from children of the answer button elements
      Array.from(answerButtonElements.children).forEach(button =>{
          setStatusClass(button, button.dataset.correct)
      })
      if (nextQuestion.length> currentIndex+1){
        nextButton.classList.remove('hide');
      } else{
        startButton.innerText = "Restart";
        startButton.classList.remove('hide');
      }
}

function setStatusClass(element, correct){
    clearStatus(element)
    if (correct){
      element.classList.add('correct');
    } else{
      element.classList.add('wrong');
    }
}

function clearStatus(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
      question: "Commonly used data types DO NOT include:",
      answer: [
          {text: 'strings', correct: false},
          {text: 'booleans', correct: false}, 
          {text: 'alerts', correct: true},
          {text: 'numbers', correct: false}]
    },
    {
      question: "Arrays in JavaScript can be used to store ______.",
      answer: [
        {text: "numbers and strings", correct: false},
        {text: "other arrays", correct: false},
        {text: "booleans", correct: false},
        {text: "all of the above", correct: true}],
    },
    {
      question:
        "String values must be enclosed within _____ when being assigned to variables.",
      answer: [
          {text: "commas", correct: false}, 
          {text: "curly brackets", correct: false}, 
          {text: "quotes", correct: true}, 
          {text: "parentheses", correct: false}],
    },
    {
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      answer: [
        {text: "JavaScript", correct: false},
        {text: "terminal/bash", correct: false},
        {text: "for loops", correct: false},
        {text: "console.log", correct: true}],
    },
    {
      question:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      answer: [
          {text: "break", correct: true}, 
          {text: "stop", correct: false}, 
          {text: "halt", correct: false}, 
          {text: "exit", correct: false}],
    },
  ];