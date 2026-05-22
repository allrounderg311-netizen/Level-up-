let level = 1;

let xp = 0;

let nextLevelXP = 100;

let streak = 1;

let dailyXP = 0;

let dailyLimit = 90;

let completedMissions = 0;

let currentType = "";



let strength = 20;

let endurance = 20;

let mobility = 20;

let recovery = 20;

let focus = 20;

let knowledge = 20;

let discipline = 20;



const missionPool = [

{
name:"100 Pushups",
type:"STRENGTH"
},

{
name:"5KM Run",
type:"ENDURANCE"
},

{
name:"Stretch Session",
type:"MOBILITY"
},

{
name:"Cold Shower",
type:"DISCIPLINE"
},

{
name:"2 Hour Deep Study",
type:"FOCUS"
},

{
name:"Read 15 Pages",
type:"KNOWLEDGE"
},

{
name:"No Sugar Today",
type:"DISCIPLINE"
},

{
name:"Recovery Walk",
type:"RECOVERY"
}

];



function updateUI(){

document.getElementById("level")
.innerText =
"LEVEL " + level;

document.getElementById("xpText")
.innerText =
"XP " + xp + " / " + nextLevelXP;

document.getElementById("dayBox")
.innerText =
"DAY " + streak;



updateBar("strength",strength);
updateBar("endurance",endurance);
updateBar("mobility",mobility);
updateBar("recovery",recovery);
updateBar("focus",focus);
updateBar("knowledge",knowledge);
updateBar("discipline",discipline);



const readiness = Math.floor(

(
strength +
endurance +
mobility +
recovery +
focus +
knowledge +
discipline

) / 7

);



document.getElementById(
"readinessValue"
).innerText =
readiness + "%";



const circumference = 327;

const offset =

circumference -
(readiness / 100) *
circumference;

document.getElementById(
"progressRing"
).style.strokeDashoffset =
offset;

}



function updateBar(name,value){

document.getElementById(
name + "Bar"
).style.width =
value + "%";

document.getElementById(
name + "Text"
).innerText =
value + "%";

}



function generateMission(){

const randomMission =

missionPool[
Math.floor(
Math.random() *
missionPool.length
)
];



currentType =
randomMission.type;



document.getElementById(
"missionText"
).innerText =
randomMission.name;



document.getElementById(
"missionType"
).innerText =
randomMission.type +
" MISSION";

}



function completeMission(){

if(dailyXP >= dailyLimit){

alert(
"DAILY XP LIMIT REACHED"
);

return;

}



const earnedXP =

10 +
Math.floor(
Math.random() * 15
);



xp += earnedXP;

dailyXP += earnedXP;

completedMissions++;




if(xp >= nextLevelXP){

level++;

xp = 0;

nextLevelXP += 50;

}



if(currentType === "STRENGTH")
strength += 4;

if(currentType === "ENDURANCE")
endurance += 4;

if(currentType === "MOBILITY")
mobility += 4;

if(currentType === "RECOVERY")
recovery += 4;

if(currentType === "FOCUS")
focus += 4;

if(currentType === "KNOWLEDGE")
knowledge += 4;

if(currentType === "DISCIPLINE")
discipline += 4;



capStats();

updateQuests();

generateAnalysis();

saveData();

updateUI();

}



function capStats(){

if(strength > 100)
strength = 100;

if(endurance > 100)
endurance = 100;

if(mobility > 100)
mobility = 100;

if(recovery > 100)
recovery = 100;

if(focus > 100)
focus = 100;

if(knowledge > 100)
knowledge = 100;

if(discipline > 100)
discipline = 100;

}



function updateQuests(){



if(completedMissions >= 1){

document.getElementById(
"dailyQuest1Status"
).innerText =
"COMPLETE";

}



if(dailyXP >= 50){

document.getElementById(
"dailyQuest2Status"
).innerText =
"COMPLETE";

}



const readiness = Math.floor(

(
strength +
endurance +
mobility +
recovery +
focus +
knowledge +
discipline

) / 7

);



if(readiness >= 50){

document.getElementById(
"bossQuestStatus"
).innerText =
"UNLOCKED";

}

}



function generateAnalysis(){

document.getElementById(
"analysis"
).innerText =

"LEVEL: " + level +

"\n\nREADINESS: " +

Math.floor(

(
strength +
endurance +
mobility +
recovery +
focus +
knowledge +
discipline

) / 7

) + "%" +

"\n\nDAILY XP: " +
dailyXP + "/" + dailyLimit;

}



function softReset(){

strength = 20;
endurance = 20;
mobility = 20;
recovery = 20;
focus = 20;
knowledge = 20;
discipline = 20;

updateUI();

}



function fullReset(){

localStorage.clear();

location.reload();

}



function saveData(){

localStorage.setItem(
"level",
level
);

}



function showSection(section){

document.getElementById(
"homePage"
).style.display = "none";

document.getElementById(
"missionsPage"
).style.display = "none";

document.getElementById(
"statsPage"
).style.display = "none";

document.getElementById(
"aiPage"
).style.display = "none";



if(section === "home"){

document.getElementById(
"homePage"
).style.display = "block";

}



if(section === "missions"){

document.getElementById(
"missionsPage"
).style.display = "block";

}



if(section === "stats"){

document.getElementById(
"statsPage"
).style.display = "block";

document.getElementById(
"statsInfo"
).innerText =

"Strength: " + strength +

"\n\nEndurance: " + endurance +

"\n\nFocus: " + focus +

"\n\nDiscipline: " + discipline;

}



if(section === "ai"){

document.getElementById(
"aiPage"
).style.display = "block";

}

}



function fakeAI(){

const input =

document.getElementById(
"aiInput"
).value;



let response = "";



if(input.includes("study")){

response =
"Focus training recommended.";

}

else if(input.includes("workout")){

response =
"Strength protocol suggested.";

}

else{

response =
"Maintain discipline consistency.";

}



document.getElementById(
"aiResponse"
).innerText =
response;

}



updateUI();

generateMission();

generateAnalysis();