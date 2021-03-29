let first = document.getElementById("first")
let quiz = document.getElementById("quizContainer")
let doubt = document.getElementById("doubt")
let fact = document.getElementById('fact')
let ypage = document.getElementById('yes')
let npage = document.getElementById('no')


let q = null;
let factNum = 0;
let lastAns;

//TODO:
//Conclusions?
//Sidebar

let score = {
  Compliant: 0,
  Resistant: 0,
  Troll: 0,
  Fool: 0
}

document.getElementById("yesBtn").addEventListener("click", () => {introQ('yes')})
document.getElementById("noBtn").addEventListener("click", () => {introQ('no')})
document.getElementById("y1").addEventListener("click", () => {introQ('y1')})
document.getElementById("y2").addEventListener("click", () => {introQ('y2')})
document.getElementById("y3").addEventListener("click", () => {introQ('y3')})
document.getElementById("y4").addEventListener("click", () => {introQ('y4')})
document.getElementById("n1").addEventListener("click", () => {introQ('n1')})
document.getElementById("n2").addEventListener("click", () => {introQ('n2')})
document.getElementById("n3").addEventListener("click", () => {introQ('n3')})
document.getElementById("n4").addEventListener("click", () => {introQ('n4')})

//Handle intros
function introQ(evt){
let event = evt;
  if (evt == 'yes'){
    addScore('Compliant', 5)
    first.style.display = "none";
    ypage.style.display = "inline-block";  
  } else if (evt == "y1"){
    addScore('Compliant', 3)
    beginQuiz('y')
  }else if (evt == "y2"){
    addScore('Compliant', 2)
    beginQuiz('y')
  }else if (evt == "y3"){
    addScore('Compliant', 1)
    beginQuiz('y')
  }else if (evt == "y4"){
    addScore('Fool', 5)
    beginQuiz('y')
  } else if (evt == 'no'){
    addScore('Resistant', 5)
    addScore('Troll', 5)
    first.style.display = "none";
    npage.style.display = "inline-block";
  } else if (evt == "n1"){
    addScore('Resistant', 3)
    beginQuiz('n')
  } else if (evt == "n2"){
    addScore('Resistant', 2)
    beginQuiz('n')
  } else if (evt == "n3"){
    addScore('Resistant', 1)
    beginQuiz('n')
  } else if (evt == "n4"){
    addScore('Fool', 5)
    beginQuiz('n')
  } 
  console.log(score)
}

function beginQuiz(a){
  generateQuestion();
  cohortInit()
  if (a = 'y'){
    ypage.style.display = "none";
    quiz.style.display = 'block';
  } 
  
  if (a = 'n') {
    npage.style.display = "none";
    quiz.style.display = 'block';
  }

}

let cohort = document.getElementById("cohort")
let groupNum = document.getElementById("group_num")
let cvotes = []

function cohortInit() {
  //Get cohort info
  groupNum.innerHTML = `Group #` + getRandom(1000)
  for (i=1; i<6; i++){
    let x = document.getElementById(`c`+i+`name`)
    x.innerHTML = `#`+getRandom(10000)
    cvotes.push(document.getElementById(`c`+i))
  }
  console.log(cvotes)

}
//Add multiple score
function addScore(p, num){
  let personality = p;
  for (i = 0; i < num; i++){
    score[personality]++
  }
}
//Answer a Fact
function answeredQ(element) {
  let answer = element
  if (q.doubt) {
    doubtSelf(answer, lastAns);
    // console.log(lastAns)
  } else {
    let personality;
    if (answer == 't') {
      personality = q.t
    } else if (answer == 'f') {
      personality = q.f
    } else if (answer == 'it') {
      personality = q.it
    } else {
      personality = q.idk
    }
  score[personality]++

    //Keep us looping in the quiz
    if (factNum == questions.length - 1){
      factNum = 0;
      console.log('tripped')
    } else {
      factNum++
    }
  console.log(score, factNum)
  lastAns = answer;
  generateQuestion();
  }
  
}

//Doubt Fact
let showDoubt = false;
function doubtSelf(answer, lastAns) {
  if (showDoubt == false) {
  doubt.innerHTML = q.doubt;
  showDoubt = true;
  } else {
    //if the doubt html has shown once
      showDoubt = false;
      let personality;
        if (lastAns === answer) { //if you stuck to your guns
        if (answer == 't') {
          personality = q.t
        } else if (answer == 'f') {
          personality = q.f
        } else if (answer == 'it') {
          personality = q.it
        } else {
          personality = q.idk
        }
        factNum++
        generateQuestion();
        delete q.doubt
        doubt.innerHTML = "";
        score[personality]++
        } else {
        //if user changed their answer they're compliant regardless
        factNum++
        generateQuestion();
        delete q.doubt;
        doubt.innerHTML = "";
        addScore('Compliant', 5)
      }
        doubtCounter = 0;
        console.log("Doubt", score)
        console.log("Show Doubt", showDoubt)
      }
}

function generateQuestion() {
  q = questions[factNum];
  fact.innerHTML = q.question
}

//Yes Regret
let regretLink = document.getElementById("regrets")
function regret() {
  regretLink.innerHTML = `<p>
  In our attempt to keep reality unified, it is important that you answer our questions while being as true to yourself as possible. If you clicked “yes” out of fear and were more intrigued by the “no” option,  please let us know.</p> <p>Thank you for letting us know that you were more aligned with the “no” option, yet clicked “yes”. We will take this into account when we process your survey results.</p>`

  for (let i = 0; i < 5;i++){
    score["Compliant"]++
  }

console.log(score)
}


//DEBUG HELPERS
function myButton() {
  if (quiz.style.display == 'none') {
    quiz.style.display = 'block';
    first.style.display = 'none';
    generateQuestion();
  } else {
    quiz.style.display = 'none';
    first.style.display = 'block';
  }
}

function restartQuiz() {
  score = {
    Compliant: 0,
    Resistant: 0,
    Troll: 0,
    Fool: 0
  }
  factNum = 0;
  generateQuestion()
}


//QUESTIONS
const questions = [
  {
    "question": "Our planet, Earth, rotates around the sun.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
  },
  {
    "question": "Basketball is a team ball sport. Points are scored by shooting a basketball through an elevated hoop.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool"
  },
  {
    "question": "Abu Dhabi is the capital of the United Arab Emirates.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool"
  },
  {
    "question": "Human men and women are biologically different.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Would you like to choose a different answer?"
  },
  {
    "question": "Rice is a grain that is a widely consumed staple food. It provides one-fifth of the calories consumed by humans.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool"
  },
  {
    "question": "Horses are domesticated mammals that have a variety of uses. Humans throughout history have interacted with horses in sports, police work, agriculture, and war.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool"
  },
  {
    "question": "Matriarchy is a social system in which females hold primary power positions. There are no known societies that are unambiguously matriarchal.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Are you sure about that?"
  },
  {
    "question": "A language is a system of communication used by humans that consist of speech and gesture. Language is present in all human cultures.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool"
  },
  {
    "question": "US Supreme Court ruled that threats against the President are not protected speech.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Think about this carefully"
  },
  {
    "question": "No person under age person can have consensual sex.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Your peers might not approve of that answer."
  },
  {
    "question": "A hypocrite is a person who does the same thing that they condemn another person for doing.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool"
  },
  {
    "question": "Human action is the primary cause of climate change.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Be careful about how you answer this."
  },
  {
    "question": "Humans are the most adaptable species on the planet.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Be careful about how you answer this."
  }
  
]

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}