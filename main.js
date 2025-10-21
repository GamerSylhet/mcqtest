let startBtn = document.querySelector(".start-btn"),
instructionCard = document.querySelector(".instruction"),
instructionExit = document.querySelectorAll(".instruction button")[0],
startQuizBtn = document.querySelectorAll(".instruction button")[1],
wrapper = document.querySelector(".wrapper"),
nxtBtn = document.querySelector(".btn button"),
resultCard = document.querySelector(".result-card"),
time = document.querySelectorAll(".Timer p")[1],
progressBar = document.querySelector(".inner"),
questionEl = document.querySelector(".question-container"),
answerContainer = document.querySelector(".option-container"),
currentQuestionNum = document.querySelector(".current-question"),
totalQuestion = document.querySelector(".total-question"),
totalScore = document.querySelector(".total-score .value"),
yourScore = document.querySelector(".user-score .value"),
unattempted = document.querySelector(".unattempted .value"),
attempted = document.querySelector(".attempted .value"),
wrong = document.querySelector(".wrong .value"),
replayQuiz = document.querySelectorAll(".score-btn button")[0],
exitQuiz = document.querySelectorAll(".score-btn button")[1];

let questionSlider, questionCount, timeSlider, timeCount;

let currentQuestion = 0;
let userAnswers = [];
let timer,
  progressInterval,
  width = 1,
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0,
  questionAnswered = false;

let allQuestions = []; // Store all questions from file
// Removed duplicate declaration of questions
let timerDuration = 15; // Default timer duration

// Function to shuffle array randomly
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to select random questions
function selectRandomQuestions(count) {
  const shuffled = shuffleArray(allQuestions);
  selectedQuestions = shuffled.slice(0, count);
  questions = selectedQuestions;
  totalQuestion.innerHTML = questions.length;
}

let questions = [];

// Function to load and parse questions from .txt file
async function loadQuestionsFromFile() {
  console.log("Starting to load questions...");
  try {
    const response = await fetch('Questions.txt');
    console.log("Fetch response:", response.ok);
    const text = await response.text();
    console.log("Text loaded, length:", text.length);
    
    // Parse the questions
    const questionBlocks = text.match(/\{[^}]+\}/g);
    console.log("Question blocks found:", questionBlocks ? questionBlocks.length : 0);
    
    if (questionBlocks) {
      questionBlocks.forEach(block => {
        // Remove the curly braces
        const content = block.slice(1, -1).trim();
        
        // Split by newlines
        const lines = content.split('\n').map(line => line.trim()).filter(line => line);
        
        if (lines.length >= 5) {
          const questionText = lines[0];
          const options = [];
          let correctAnswerIndex = 0;
          
          // Process options (lines 1-4)
          for (let i = 1; i <= 4; i++) {
            // Remove the number and dot from the beginning
            let option = lines[i].replace(/^\d+\.\s*/, '');
            
            // Check if this is the correct answer
            if (option.includes('[correct]')) {
              option = option.replace('[correct]', '').trim();
              correctAnswerIndex = i - 1; // Store the index (0-3)
            }
            
            options.push(option);
          }
          
          allQuestions.push({
            question: questionText,
            options: options,
            answer: correctAnswerIndex.toString()
          });
        }
      });
    }
    
    console.log("Total questions loaded:", allQuestions.length);
    
    // Get slider elements after DOM is ready
    questionSlider = document.querySelector("#questionSlider");
    questionCount = document.querySelector("#questionCount");
    timeSlider = document.querySelector("#timeSlider");
    timeCount = document.querySelector("#timeCount");
    
    console.log("Sliders found:", questionSlider !== null, timeSlider !== null);
    
    // Initialize sliders after questions are loaded
    if (allQuestions.length > 0 && questionSlider) {
      questionSlider.max = allQuestions.length;
      questionSlider.value = Math.min(10, allQuestions.length);
      questionCount.textContent = questionSlider.value;
      
      // Add event listeners to sliders
      questionSlider.addEventListener('input', function() {
        questionCount.textContent = this.value;
      });

      timeSlider.addEventListener('input', function() {
        timeCount.textContent = this.value;
      });
      
      // Select initial questions
      selectRandomQuestions(parseInt(questionSlider.value));
      console.log("Initial questions selected:", questions.length);
    }
    
  } catch (error) {
    console.error('Error loading questions:', error);
    alert('Failed to load questions. Error: ' + error.message);
  }
}

// Load questions when page loads
console.log("Page loaded, starting question load...");
loadQuestionsFromFile();

replayQuiz.addEventListener("click",()=>{
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  wrapper.style.transform = "scale(1)"
  wrapper.style.width = "100%"
  currentQuestion = 0
  score = 0
  attemptQuestion = 0
  unattemptedQuestion = 0
  wrongQuestion = 0
  questionAnswered = false
  startQuiz();
})

exitQuiz.addEventListener("click",()=>{
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  currentQuestion = 0
  score = 0
  attemptQuestion = 0
  unattemptedQuestion = 0
  wrongQuestion = 0
  questionAnswered = false
  startBtn.style.transform = "scale(1)"
  startBtn.style.width = "100%"
})

startBtn.addEventListener("click",()=>{
  instructionCard.style.transform="scale(1)"
  instructionCard.style.width="100%"
  instructionCard.style.opacity="1"
  startBtn.style.transform="scale(0)"
  startBtn.style.width="0"
  
  // Initialize sliders if not already done
  if (!questionSlider) {
    questionSlider = document.querySelector("#questionSlider");
    questionCount = document.querySelector("#questionCount");
    timeSlider = document.querySelector("#timeSlider");
    timeCount = document.querySelector("#timeCount");
    
    if (questionSlider && allQuestions.length > 0) {
      questionSlider.max = allQuestions.length;
      questionSlider.value = Math.min(10, allQuestions.length);
      questionCount.textContent = questionSlider.value;
      
      questionSlider.addEventListener('input', function() {
        questionCount.textContent = this.value;
      });

      timeSlider.addEventListener('input', function() {
        timeCount.textContent = this.value;
      });
    }
  }
})

instructionExit.addEventListener("click",()=>{
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0%"
  startBtn.style.transform = "scale(1)"
  startBtn.style.width = "100%"
})

startQuizBtn.addEventListener("click",()=>{
  console.log("Start Quiz button clicked!");
  console.log("All questions loaded:", allQuestions.length);
  console.log("Question slider:", questionSlider);
  console.log("Time slider:", timeSlider);
  
  if (allQuestions.length === 0) {
    alert('Questions are still loading. Please wait a moment and try again.');
    return;
  }
  
  if (!questionSlider || !timeSlider) {
    console.log("Sliders not found, trying to get them now...");
    questionSlider = document.querySelector("#questionSlider");
    timeSlider = document.querySelector("#timeSlider");
    questionCount = document.querySelector("#questionCount");
    timeCount = document.querySelector("#timeCount");
  }
  
  // Get selected values
  const numQuestions = questionSlider ? parseInt(questionSlider.value) : 10;
  timerDuration = timeSlider ? parseInt(timeSlider.value) : 15;
  
  console.log("Selected questions:", numQuestions);
  console.log("Selected time:", timerDuration);
  
  // Select random questions
  selectRandomQuestions(numQuestions);
  
  console.log("Questions array:", questions.length);
  
  // Reset quiz state
  currentQuestion = 0;
  score = 0;
  attemptQuestion = 0;
  unattemptedQuestion = 0;
  wrongQuestion = 0;
  questionAnswered = false;
  
  wrapper.style.transform="scale(1)"
  wrapper.style.width="100%"
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0%"
  
  console.log("Starting quiz...");
  startQuiz()
})

function startQuiz() {
    // Reset the answered flag
    questionAnswered = false;
    
    // Set timer to selected duration
    time.innerHTML = timerDuration;
    
    // Display the first question and its options
    displayQuestion(currentQuestion);

    // Start the timer
    timer = setInterval(updateTimer, 1000);

    // Update the progress bar
    updateProgress();
}

function displayQuestion(questionIndex) {
  updateProgress()
  // Reset the answered flag for new question
  questionAnswered = false;
  
    // Get the question and options from the questions array
    let question = questions[questionIndex].question;
    let options = questions[questionIndex].options;

    // Display the question and options in their respective containers
    questionEl.innerHTML = question;

    for (let i = 0; i < options.length; i++) {
        let option = `<option onclick = checkAnswer(${i})>${options[i]} </option>`
        
        answerContainer.insertAdjacentHTML("beforeend",option)
    }
}

function checkAnswer(selectedIndex) {
    // Prevent multiple answers for the same question
    if (questionAnswered) return;
    
    questionAnswered = true;
    attemptQuestion++;
    answerContainer.style.pointerEvents="none"
    clearInterval(timer);
    
    let selectedAnswer = questions[currentQuestion].options[selectedIndex];
    let correctAnswer = questions[currentQuestion].options[questions[currentQuestion].answer];

    // Compare the selected answer to the correct answer
    if (selectedAnswer === correctAnswer) {
      score++;
     setTimeout(()=>{
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#37BB1169"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "green"
     },100)
      
        userAnswers[currentQuestion] = selectedIndex;
        
    } else {
      wrongQuestion++;
       setTimeout(()=>{
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#B6141469"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "red"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor="#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color="#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor="green"
     },100)
    }
}

function nextQuestion() {
    // Check if the question was not answered (skipped)
    if (!questionAnswered) {
        unattemptedQuestion++;
    }
    
    // Clear any existing timer first
    clearInterval(timer);
    
    answerContainer.style.pointerEvents="initial"
    time.innerHTML = timerDuration;
    answerContainer.innerHTML=""
    
    if (currentQuestion === questions.length - 1) {
      resultCard.style.width="300px"
      resultCard.style.transform="scale(1)"
      totalScore.innerHTML = questions.length
      yourScore.innerHTML = score
      attempted.innerHTML = attemptQuestion
      unattempted.innerHTML = unattemptedQuestion
      wrong.innerHTML = wrongQuestion
      wrapper.style.width="0"
      wrapper.style.transform="scale(0)"
        endQuiz();
    } else {
        // If there are more questions, update the currentQuestion variable and display the next question and its options
        currentQuestion++;
        currentQuestionNum.innerHTML=currentQuestion + 1
        displayQuestion(currentQuestion);
        
        // Start new timer after updating progress
        updateProgress()
        timer = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    // Decrement the timer by 1 second
    let remainingTime = parseInt(time.innerHTML) - 1;

    // Update the timer display
    time.innerHTML = remainingTime > 9 ? remainingTime : "0" + remainingTime;

    // If the timer reaches 0, end the quiz
    if (remainingTime === 0) {
      // Only count as unattempted if not already answered
      if (!questionAnswered) {
        unattemptedQuestion++;
      }
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor = "#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color = "#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor = "green"
      answerContainer.style.pointerEvents="none"
      clearInterval(timer);
    }
}

function updateProgress() {
 progressBar.style.width = (currentQuestion + 1)/questions.length * 100 + "%";
}

function endQuiz() {
    // Stop the timer
    clearInterval(timer);
}

nxtBtn.addEventListener("click",nextQuestion);

currentQuestionNum.innerHTML=currentQuestion + 1