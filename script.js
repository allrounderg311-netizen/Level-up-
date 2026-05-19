const clickSound =
new Audio("click.mp3");

clickSound.volume = 1;

function playSound(){

clickSound.pause();

clickSound.currentTime = 0;

clickSound.play();

navigator.vibrate(35);

}

let saveData =
JSON.parse(
localStorage.getItem(
"statusSystem"
)
);

if(!saveData){

saveData = {

xp:0,
level:1,
proof:0,
proofStage:0,

stats:{

strength:0,
endurance:0,
discipline:0,
communication:0,
confidence:0,
focus:0

},

tasks:[]

};

}

let xp = saveData.xp || 0;

let level =
saveData.level || 1;

let proof =
saveData.proof || 0;

let proofStage =
saveData.proofStage || 0;

let stats =
saveData.stats;

let tasks =
saveData.tasks || [];

const ranks = [

"Novice",
"Awakened",
"Hunter",
"Elite",
"Veteran",
"Commander",
"Master",
"Grandmaster",
"Mythic",
"Transcendent"

];

const proofs = [

{
title:
"Phase 1 — Listening Presence",

desc:
"Maintain calm eye contact while listening to others.",

need:10
},

{
title:
"Phase 2 — Controlled Speech",

desc:
"Speak slower and clearer in conversations.",

need:15
},

{
title:
"Phase 3 — Comfortable Silence",

desc:
"Stay calm during awkward silence.",

need:20
},

{
title:
"Phase 4 — Public Presence",

desc:
"Walk slower with strong posture outside.",

need:25
},

{
title:
"Phase 5 — Pressure Control",

desc:
"Remain composed during stress.",

need:30
}

];

function getRank(level){

if(level >= 45)
return ranks[9];

if(level >= 40)
return ranks[8];

if(level >= 35)
return ranks[7];

if(level >= 30)
return ranks[6];

if(level >= 25)
return ranks[5];

if(level >= 20)
return ranks[4];

if(level >= 15)
return ranks[3];

if(level >= 10)
return ranks[2];

if(level >= 5)
return ranks[1];

return ranks[0];

}

function saveSystem(){

localStorage.setItem(

"statusSystem",

JSON.stringify({

xp,
level,
proof,
proofStage,
stats,
tasks

})

);

}

function updateUI(){

document.getElementById(
"level").innerText =
level;

document.getElementById(
"rankTitle").innerText =
getRank(level);

document.getElementById(
"xpText").innerText =
xp + " / 1000";

document.getElementById(
"xpFill").style.width =
(xp / 1000) * 100 + "%";

Object.keys(stats).forEach(
stat=>{

let total =
stats[stat] || 0;

let tier =
Math.floor(total / 500)+1;

let progress =
total % 500;

document.getElementById(
stat + "Level"
).innerText =
"Tier " + tier;

document.getElementById(
stat + "Fill"
).style.width =
(progress / 500)*100 + "%";

});

let current =
proofs[proofStage];

document.getElementById(
"proofTitle"
).innerText =
current.title;

document.getElementById(
"proofDesc"
).innerText =
current.desc;

document.getElementById(
"proofText"
).innerText =
proof + " / " +
current.need +
" Proofs";

document.getElementById(
"proofFill"
).style.width =
(proof/current.need)
*100 + "%";

renderTasks();

saveSystem();

}

function gainXP(amount,stat){

playSound();

amount =
Number(amount);

if(isNaN(amount))
return;

xp += amount;

if(stats[stat] !== undefined){

stats[stat] +=
Math.floor(amount*1.1);

}

while(xp >= 1000){

if(level < 100){

level++;

xp -= 1000;

navigator.vibrate(180);

}else{

xp = 1000;

break;

}

}

updateUI();

}

function practicalOnly(stat,amount){

playSound();

amount =
Number(amount);

if(isNaN(amount))
return;

stats[stat] += amount;

updateUI();

}

function createTask(){

playSound();

let name =
document.getElementById(
"taskName"
).value.trim();

let reward =
Number(
document.getElementById(
"taskXP"
).value
);

let stat =
document.getElementById(
"taskStat"
).value;

if(name === "")
return;

if(isNaN(reward))
reward = 0;

tasks.push({

name,
reward,
stat

});

document.getElementById(
"taskName"
).value = "";

document.getElementById(
"taskXP"
).value = "";

updateUI();

}

function renderTasks(){

let container =
document.getElementById(
"taskContainer"
);

container.innerHTML = "";

tasks.forEach((task,index)=>{

let btn =
document.createElement(
"button"
);

btn.innerText =
task.name +
" +" +
task.reward +
" XP";

btn.onclick = function(){

gainXP(
task.reward,
task.stat
);

};

btn.oncontextmenu =
function(e){

e.preventDefault();

tasks.splice(index,1);

updateUI();

};

container.appendChild(btn);

});

}

function completeProof(){

playSound();

let current =
proofs[proofStage];

proof++;

if(proof >= current.need){

proof = 0;

if(proofStage <
proofs.length-1){

proofStage++;

alert(
"NEW PHASE UNLOCKED"
);

navigator.vibrate(250);

}

}

updateUI();

}

function resetSystem(){

playSound();

let yes =
confirm(
"RESET ALL PROGRESS?"
);

if(yes){

localStorage.removeItem(
"statusSystem"
);

location.reload();

}

}

updateUI();