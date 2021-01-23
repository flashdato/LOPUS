const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = 25;

let questionCounter = 0;
let currentQuestion;
let avaliableQuestions = [];
let avaliableOptions = [];
let correctAnswers =0;
let attempt = 0;
 //timer
 //Define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;
//Define vars to hold "display" value
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;
//Define var to hold setInterval() function
let interval = null;
//Define var to hold stopwatch status
let status = "stopped";
function stopWatch(){
    seconds++;
    //Logic to determine when to increment next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }

    }
    //If seconds/minutes/hours are only one digit, add a leading 0 to the value     LEFT
    if(seconds > 50){
        displaySecondsL = "0" + (59-seconds).toString();
    }
    else{
        displaySecondsL = 59-seconds;
    }

    if(minutes > 50){
        displayMinutesL = "0" + (59-minutes).toString();
    }
    else{
        displayMinutesL = 59 - minutes;
    }
    displayHoursL = 2-hours;

    if(seconds <= 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }
    //If seconds/minutes/hours are only one digit, add a leading 0 to the value
    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours <= 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }
    if(hours==3){
        quizOver();
    }
    //Display updated time values to user
    document.getElementById("display").innerHTML = "დარჩენილია : 0" + displayHoursL + ":" + displayMinutesL + ":" + displaySecondsL;

}
function startStopTimer(){
    if(status === "stopped"){
        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";

    }
    else{

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";

    }

}
function resetTimer(){

    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start";

}


function setAvailableQuestions(){
   const totalQuestion = quiz.length;
   for( let i = 0; i<totalQuestion; i++){
      avaliableQuestions.push(quiz[i])
   }
}
function getNewQuestion(){
  questionNumber.innerHTML = "ამოცანა " + (questionCounter + 1) + " / " + questionLimit;

  const questionIndex = avaliableQuestions[Math.floor(Math.random() * avaliableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;                                         //Q

  const index1 = avaliableQuestions.indexOf(questionIndex);

  avaliableQuestions.splice(index1,1);

  if(currentQuestion.hasOwnProperty("img")){
      const img = document.createElement("img");
      img.src = currentQuestion.img;
      questionText.appendChild(img);

  }

  const  optionLen = currentQuestion.options.length

  for( let i = 0; i<optionLen; i++){
    avaliableOptions.push(i)
   }
   optionContainer.innerHTML = ''
   let animationDelay = 0.15;
   for( let i = 0; i<optionLen; i++){
    const optionIndex = avaliableOptions[Math.floor(Math.random() * avaliableOptions.length)];   
    const index2 = avaliableOptions.indexOf(optionIndex); 
    avaliableOptions.splice(index2,1)
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option)
    option.setAttribute("onclick","getResult(this)");
   } 
  questionCounter ++
}


function getResult(element)
{
   const id = parseInt(element.id);
   if(id === currentQuestion.answer){
       element.classList.add("correct")
       updateAnswerIndicator("correct")
       correctAnswers++;
   }
   else{
       element.classList.add("wrong")
       updateAnswerIndicator("wrong")
   }
   const optionLen = optionContainer.children.length;
   for (let i = 0; i < optionLen; i++) {
      if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
          optionContainer.children[i].classList.add("correct");
      } 
   }
   attempt++;
   unclickableOptions();
}

function  unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
       optionContainer.children[i].classList.add("already-answered")
    
    }

}

function answersIndicator(){
    answersIndicatorContainer.innerHTML= '';
    const totalQuestion = questionLimit;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.append(indicator);
        
    }
}
function updateAnswerIndicator(marktype){
    answersIndicatorContainer.children[questionCounter-1].classList.add(marktype);
}
function next(){
    if(questionCounter === questionLimit){
       quizOver();
    }else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide")
    quizResult();
    resetTimer();
}
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    resultBox.querySelector(".percentage").innerHTML = ((correctAnswers/questionLimit)*100).toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
    resultBox.querySelector(".total-time").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers =0;
    attempt = 0;  
    avaliableQuestions = []; 
    resetTimer(); 
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}
 function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
    startStopTimer();
}
window.onload = function(){
    homeBox.querySelector(".total-questions").innerHTML = questionLimit;
}