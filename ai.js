const API_KEY = AIzaSyAQuKgTitUKtzfuKlaEAXCmm9CADxCAx38;



async function realAI(){



const input =

document.getElementById(
"aiInput"
).value;



document.getElementById(
"aiResponse"
).innerText =
"Analyzing...";



try{



const response = await fetch(

"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

contents:[

{

parts:[

{

text:

"You are a realistic solo leveling human optimization AI. " +

"Generate practical missions, analysis, and progression advice.\n\n" +

"User Stats:\n" +

"Strength: " + strength +

"\nEndurance: " + endurance +

"\nFocus: " + focus +

"\nDiscipline: " + discipline +

"\nKnowledge: " + knowledge +

"\n\nUser Input:\n" +

input

}

]

}

]

})

}

);



const data =
await response.json();



console.log(data);



const text =

data.candidates[0]
.content.parts[0]
.text;



document.getElementById(
"aiResponse"
).innerText =
text;



}

catch(error){

console.log(error);

document.getElementById(
"aiResponse"
).innerText =

"AI connection failed.";

}

}