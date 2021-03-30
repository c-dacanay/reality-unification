let first = document.getElementById("first")
let quiz = document.getElementById("quizContainer")
let assessment = document.getElementById("assess")
let judge = document.getElementById("judgement")
let doubt = document.getElementById("doubt")
let fact = document.getElementById('fact')
let ypage = document.getElementById('yes')
let npage = document.getElementById('no')
let timed = document.getElementById('timed')
let app = document.getElementById('app')
let lastAnswers = document.getElementById('lastanswers')

let q = null;
let factNum = 0;
let lastAns;

//TODO:
//Finish conclusions
//Weighing

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
  // console.log(score)
}

function beginQuiz(){
    ypage.style.display = "none";
    npage.style.display = "none";
    first.style.display = "none"
    //Get cohort info
    groupNum.innerHTML = `Cohort #` + getRandom(1000)
    for (i=1; i<6; i++){
      let x = document.getElementById(`c`+i+`name`)
      x.innerHTML = `#`+getRandom(10000)
      cvotes.push(document.getElementById(`c`+i))
    }

    //KEEP
    timed.style.display = "block"
    cohort.style.display = "flex"
    let slow = new Typewriter('#timer', 45)
    slow.play();
    setTimeout(switchPage, 15000);
    // setTimeout(switchPage, 100)
}

function switchPage(){
  timed.style.display = "none";
  quiz.style.display = "block"
  generateQuestion();
}

let cohort = document.getElementById("cohort")
let groupNum = document.getElementById("group_num")
let cvotes = []

let value;
//Answer a Fact
function answeredQ(element) {
  let answer = element
  console.log(q.doubt);
  if (q.doubt && factNum < questions.length - 1) {
  // if (q.doubt) {
    doubtSelf(answer, lastAns);
    // console.log('in loop')
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
    if (factNum === questions.length - 1){
      let highest = getHighest(score, 1)
      judgementStage(highest)
      console.log(highest)
    } else {
      factNum++
      generateQuestion();
    }
  console.log(score, factNum)
  lastAns = answer;
  // generateQuestion();
}

function judgementStage(h) {
  let quality = Object.keys(h);
  // console.log(quality)
  cohort.style.display = "none"
  quiz.style.display = "none"
  assessment.style.display = "block"
  judge.innerHTML = `<p>Thank you for participating in the Reality Unification Enterprise.</p>` + results[quality]['text'] + `<p>Which statement do you most agree with?</p>`
  for (let i = 1; i < 4; i++) {
    let a = document.createElement('a');
    let linkText = document.createTextNode(results[quality]['q'+i])
    a.appendChild(linkText);
    a.title = results[quality]['q'+i]
    a.href = "#"
    a.onclick = function() {ending(results[quality]);};
    lastAnswers.appendChild(a);
  }
  // console.log('assess', results[quality])
}

function ending(qual) {
  while (lastAnswers.firstChild){
    lastAnswers.removeChild(lastAnswers.firstChild);
  }
  console.log('hi')
  judge.innerHTML  = qual['ending']

  let a = document.createElement('a')
  let linkText = document.createTextNode('Restart');
  a.appendChild(linkText);
  a.title = 'Restart'
  a.href = "#"
  a.onclick = function() {location.reload()};
  lastAnswers.appendChild(a)
}

function getHighest (obj, num = 1){
  let requiredObj = {};
  if(num > Object.keys(obj).length) {
    return false;
  };
  Object.keys(obj).sort((a,b) => obj[b] - obj[a]).forEach((key, ind) =>
{
  if(ind < num){
    requiredObj[key] = obj[key];
  }
});
return requiredObj;
};

}
//Doubt Fact
let showDoubt = false;
function doubtSelf(answer, lastAns) {
  // console.log(q.doubt, showDoubt, 'here')
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
        console.log("Doubt", score)
        // console.log("Show Doubt", showDoubt)
      }
}

function generateQuestion() {
  // quiz.style.display = 'block';
  for (c in cvotes) {
    cvotes[c].style.fill = "none"
  }
  q = questions[factNum];
  fact.innerHTML = q.question
  setTimeout(cohortAnswers, 2000, q);

  // console.log(factNum)
  if (factNum === 0){
    document.getElementById("troublemaker").style.display = "flex";
  }
  if (factNum > 9) {
    document.getElementById("troublemaker").style.display = "none";
    // console.log('here', factNum)
  }
}

function cohortAnswers(q){
  for (c in cvotes) {
    // console.log(c, cvotes[c])
    // console.log(q.votes[c])
    // console.log('sleep')
    if (q.votes[c] === 1) {
      cvotes[c].style.fill = "#009C2C"
    } else if (q.votes[c] === 2) {
      cvotes[c].style.fill = "#F03329"
    } else if (q.votes[c] === 3) {
      cvotes[c].style.fill = "#FF8C00"
    } else if (q.votes[c] === 4) 
      cvotes[c].style.fill = "#9E9E9E"
  }
}


//Yes Regret
let regretLink = document.getElementById("regrets")
function regret() {
  regretLink.innerHTML = `<p>
  In our attempt to keep reality unified, it is important that you answer our questions while being as true to yourself as possible. If you clicked “yes” out of fear and were more intrigued by the “no” option,  please let us know.</p> <p>Thank you for letting us know that you were more aligned with the “no” option, yet clicked “yes”. We will take this into account when we process your survey results.</p>`
  for (let i = 0; i < 5;i++){
    score["Compliant"]++
  }
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

function testEndings(){
  score = {
    Resistant: getRandom(25),
    Resistant: getRandom(25),
    Troll: getRandom(25),
    Fool: getRandom(25)
  }
  first.style.display = 'none';
  quiz.style.display = 'block';
  factNum = 12;
  generateQuestion();
  console.log(score, factNum)
}

const results = {
  Compliant: {
      text: `<p>Congratulations on your exceptionally high perception score! This score reveals a deep personal need for <b>social validation</b> and a sense of <b>righteousness</b>. Thank you for answering our questions honestly and in accordance with your purest beliefs.</p>`, 
      q1:`I am a paragon of justice.`,
      q2:`I believe everyone should accept my reality as truth.`,
      q3:`I have always been on the right side of history.`,
      ending: `<p>The Center for Reality Unification has accepted your responses to our initiative. You have been determined to be a perceptive, educated individual and you have reflected the ideals that we wish to instil in others. </p><p>
      Though not all people will accept or be welcome in this unification project, know that you should have the utmost confidence in your truths. If your thoughts aligned with our model of reality, they cannot be questioned.</p><p>      
      Thank you for affirming our reality.</p>`
  },
  Resistant: {
  text: `<p>This perception score is <b>incredibly low</b>. This is concerning to us. Your response to our facts betray </b>hostility</b>, or even </b>antipathy</b>, toward your fellow man and society at large.</p>`,
  q1: `I have no respect for the lives of others`,
  q2:`I reject the premise of a unified reality`,
  q3:`I am filled with hatred`,
  ending: `<p>The Center for Reality Unification has rejected your responses to our initiative. You have been determined to be a poor judge of both yourself and the outside world. People such as you are unable to accurately perceive reality.</p><p>
  Consider re-educating yourself so that you may one day integrate yourself with broader society, if someone such as you would ever wish to do so.</p>`
  },
  Troll: {
    text: `<p>This perception score is <b>incredibly low</b>. This is concerning to us. Your response to our facts betray </b>hostility</b>, or even </b>antipathy</b>, toward your fellow man and society at large.</p>`,
    q1: `I am curious if I've offended you`,
    q2: `I am merely offering another perspective`,
    q3:`I maintain an edgy lifestyle`,
    ending: `<p>The Center for Reality Unification has rejected your responses to our initiative. You have been determined to be a poor judge of both yourself and the outside world. People such as you are unable to accurately perceive reality.</p><p>
    Consider re-educating yourself so that you may one day integrate yourself with broader society, if someone such as you would ever wish to do so.</p>`
  },
  Fool: {
    text: `<p>This perception score is <b>incredibly low</b>. This is concerning to us. Your response to our facts betray </b>hostility</b>, or even </b>antipathy</b>, toward your fellow man and society at large.</p>`, 
    q1: `I am curious if I've offended you`, 
    q2: `I am merely offering another perspective`,
    q3: `I maintain an edgy lifestyle`,
    ending: `<p>The Center for Reality Unification has rejected your responses to our initiative. You have been determined to be a poor judge of both yourself and the outside world. People such as you are unable to accurately perceive reality.</p><p>
    Consider re-educating yourself so that you may one day integrate yourself with broader society, if someone such as you would ever wish to do so.</p>`
  }
}
//QUESTIONS
const questions = [
  {
    "question": "Our planet, Earth, rotates around the sun.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 1, 2, 1]
  },
  {
    "question": "Basketball is a team ball sport. Points are scored by shooting a basketball through an elevated hoop.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 4, 2, 1]
  },
  {
    "question": "Abu Dhabi is the capital of the United Arab Emirates.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[4, 1, 1, 1, 4]
  },
  {
    "question": "Human men and women are biologically different.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Would you like to choose a different answer?",
    "votes":[2, 3, 1, 3, 1]
  },
  {
    "question": "Rice is a grain that is a widely consumed staple food. It provides one-fifth of the calories consumed by humans.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[3, 1, 1, 4, 4]
  },
  {
    "question": "Horses are domesticated mammals that have a variety of uses. Humans throughout history have interacted with horses in sports, police work, agriculture, and war.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 1, 2, 1]
  },
  {
    "question": "Matriarchy is a social system in which females hold primary power positions. There are no known societies that are unambiguously matriarchal.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Are you sure about that?",
    "votes":[4, 2, 1, 1, 3]
  },
  {
    "question": "A language is a system of communication used by humans that consist of speech and gesture. Language is present in all human cultures.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 1, 3, 1]
  },
  {
    "question": "US Supreme Court ruled that threats against the President are not protected speech.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    // "doubt": "Think about this carefully",
    "votes":[2, 3, 1, 1, 4]
  },
  {
    "question": "No under age person can have consensual sex.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Your peers might not approve of that answer.",
    "votes":[1, 1, 1, 2, 1]
  },
  {
    "question": "A hypocrite is a person who does the same thing that they condemn another person for doing.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 1, 2, 1]
  },
  {
    "question": "Human action is the primary cause of climate change.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Be careful about how you answer this.",
    "votes":[2, 2, 3, 2, 1]
  },
  {
    "question": "Humans are the most adaptable species on the planet.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Be careful about how you answer this.",
    "votes":[2, 2, 1, 2, 4]
  }
  
];

//Add multiple score
function addScore(p, num){
  let personality = p;
  for (i = 0; i < num; i++){
    score[personality]++
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function Typewriter (sSelector, nRate) {
  function clean () {
    clearInterval(nIntervId);
    bTyping = false;
    bStart = true;
    oCurrent = null;
    aSheets.length = nIdx = 0;
  }

  function scroll (oSheet, nPos, bEraseAndStop) {
    if (!oSheet.hasOwnProperty('parts') || aMap.length < nPos) { return true; }

    var oRel, bExit = false;

    if (aMap.length === nPos) { aMap.push(0); }

    while (aMap[nPos] < oSheet.parts.length) {
      oRel = oSheet.parts[aMap[nPos]];

      scroll(oRel, nPos + 1, bEraseAndStop) ? aMap[nPos]++ : bExit = true;

      if (bEraseAndStop && (oRel.ref.nodeType - 1 | 1) === 3 && oRel.ref.nodeValue) {
        bExit = true;
        oCurrent = oRel.ref;
        sPart = oCurrent.nodeValue;
        oCurrent.nodeValue = '';
      }

      oSheet.ref.appendChild(oRel.ref);
      if (bExit) { return false; }
    }

    aMap.length--;
    return true;
  }

  function typewrite () {
    if (sPart.length === 0 && scroll(aSheets[nIdx], 0, true) && nIdx++ === aSheets.length - 1) { clean(); return; }

    oCurrent.nodeValue += sPart.charAt(0);
    sPart = sPart.slice(1);
  }

  function Sheet (oNode) {
    this.ref = oNode;
    if (!oNode.hasChildNodes()) { return; }
    this.parts = Array.prototype.slice.call(oNode.childNodes);

    for (var nChild = 0; nChild < this.parts.length; nChild++) {
      oNode.removeChild(this.parts[nChild]);
      this.parts[nChild] = new Sheet(this.parts[nChild]);
    }
  }

  var
    nIntervId, oCurrent = null, bTyping = false, bStart = true,
    nIdx = 0, sPart = "", aSheets = [], aMap = [];

  this.rate = nRate || 100;

  this.play = function () {
    if (bTyping) { return; }
    if (bStart) {
      var aItems = document.querySelectorAll(sSelector);

      if (aItems.length === 0) { return; }
      for (var nItem = 0; nItem < aItems.length; nItem++) {
        aSheets.push(new Sheet(aItems[nItem]));
        /* Uncomment the following line if you have previously hidden your elements via CSS: */
        // aItems[nItem].style.visibility = "visible";
      }

      bStart = false;
    }

    nIntervId = setInterval(typewrite, this.rate);
    bTyping = true;
  };

  this.pause = function () {
    clearInterval(nIntervId);
    bTyping = false;
  };

  this.terminate = function () {
    oCurrent.nodeValue += sPart;
    sPart = "";
    for (nIdx; nIdx < aSheets.length; scroll(aSheets[nIdx++], 0, false));
    clean();
  };
}
