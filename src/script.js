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
let choices = document.getElementsByClassName('fakebutton')
let lastAnswers = document.getElementById('lastanswers')
let cohort = document.getElementById("cohort")
let groupNum = document.getElementById("group_num")
let cvotes = []
let q = null;
let factNum = 0;
let lastAns;
let ansLock = false;
//TODO:
//Weighing

let score = {
  Compliant: 0,
  Resistant: 0,
  Troll: 0,
  Fool: 0
}

//BUTTONS
const choicevar = ['t', 'f', 'it', 'idk']
for (let c = 0; c < choices.length; c++){
  // console.log(c)
  choices[c].addEventListener('click', () => {answeredQ(choicevar[c])});
}

//INTROS
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

//THIS? THIS IS TRULY TERRIBLE BUT IT CAN'T BE HELPED?
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
}

let d = 1000
function beginQuiz(){
    switchPage("timed")
    //COHORT INFO
    groupNum.innerHTML = `Cohort #` + getRandom(1000)
    for (i=1; i<6; i++){
      let x = document.getElementById(`c`+i+`name`)
      x.innerHTML = `#`+getRandom(10000)
      cvotes.push(document.getElementById(`c`+i))
    }
    cohort.style.display = "flex"

    let slow = new Typewriter('#timer', 45)
    slow.play();

    setTimeout(switchPage, d, "quiz");
    setTimeout(generateQuestion, d);
}

function cohortAnswers(q){
  //Jesus
  const shuffled = cvotes.sort(() => 0.5 - Math.random());
  console.log(shuffled)
  let qu = q;
  let iterator = function (i, q) {
    let selected = shuffled.slice(0, 1)
    if (i < shuffled.length ) {
      console.log(qu.vtimes)
      setTimeout(()=> {iterator(i);}, getRandom(qu.vtimes));
            if (qu.votes[i] === 1) {
              shuffled[i].style.fill = "#009C2C"
            } else if (qu.votes[i] === 2) {
              shuffled[i].style.fill = "#F03329"
            } else if (qu.votes[i] === 3) {
              shuffled[i].style.fill = "#FF8C00"
            } else if (qu.votes[i] === 4) {
              shuffled[i].style.fill = "#9E9E9E"
          } i++
    } else {
      ansLock = false;
    }
  };

  iterator(0)
}

//REGARDING DOUBT
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
        //If user changes their answer they're compliant regardless
        factNum++
        generateQuestion();
        delete q.doubt;
        doubt.innerHTML = "";
        addScore('Compliant', 5)
      }
    }
}

function generateQuestion() {
  //CLEAR COHORT VOTES WHEN GENERATED
  ansLock = true;
  for (c in cvotes) { cvotes[c].style.fill = "none"}
  q = questions[factNum];
  fact.innerHTML = q.question
  //MAKE THIS BETTER
  // setTimeout(cohortAnswers, 2000, q);
  cohortAnswers(q);
  
  //REMOVE COHORT MEMBER
  if (questions[factNum]["evt"] === true){
    document.getElementById("troublemaker").style.display = "none";
  }
}

function switchPage(a, b){
  first.style.display = "none";
  ypage.style.display = "none"; 
  npage.style.display = "none"; 
  timed.style.display = "none";
  quiz.style.display = "none";
  assessment.style.display = "none";
  let p1 = eval(a);
  p1.style.display = "block";
  if (b) {   let p2 = eval(b); b.style.display = "block"}
}

function answeredQ(element) {
  console.log(ansLock)
  let answer = element
  //IF THERE IS A DOUBT
  if (q.doubt && factNum < questions.length - 1) {
    doubtSelf(answer, lastAns);
  } else {
    addScore(personalityType(answer), 1);
  console.log(score, factNum)
  lastAns = answer;

  //IF WE ARE AT THE END
  if (factNum === questions.length - 1){
    let highest = getHighest(score, 1)
    judgementStage(highest)
  } else {
    factNum++
    if (!ansLock){
    generateQuestion();
  }
  }
}

//ENDINGS
function ending(qual) {
  while (lastAnswers.firstChild){
    lastAnswers.removeChild(lastAnswers.firstChild);
  }
  judge.innerHTML  = qual['ending']

  let a = document.createElement('a')
  let linkText = document.createTextNode('Restart');
  a.appendChild(linkText);
  a.title = 'Restart'
  a.href = "#"
  a.onclick = function() {location.reload()};
  lastAnswers.appendChild(a)
}

function judgementStage(h) {
  let quality = Object.keys(h);
  // console.log(quality)
  cohort.style.display = "none";
  switchPage("assessment")
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
}
}

//YES REGRET LINK
let regretLink = document.getElementById("regrets")
function regret() {
  regretLink.innerHTML = `<p>
  In our attempt to keep reality unified, it is important that you answer our questions while being as true to yourself as possible. If you clicked “yes” out of fear and were more intrigued by the “no” option,  please let us know.</p> <p>Thank you for letting us know that you were more aligned with the “no” option, yet clicked “yes”. We will take this into account when we process your survey results.</p>`
  addScore('Compliant', 5)
}


//DETERMINE ME DADDY
function personalityType(answer){
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
  console.log('personality', personality)
  return personality
}

//ADD MULTIPLE SCORE
function addScore(ans, num){
  for (i = 0; i < num; i++){
    score[ans]++
  }
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

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
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

//THIS SHIT
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
