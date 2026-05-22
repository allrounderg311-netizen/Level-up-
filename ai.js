const API_KEY = "AIzaSyDNcE-Vh-Q12iPkkcB2D2MRXj2ey3Dztho";

async function realAI() {

const input =
document.getElementById("aiInput").value;

const output =
document.getElementById("aiResponse");

output.innerText = "Analyzing...";

try {

const response = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,

{

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({

contents: [

{

parts: [

{

text:
`You are an advanced self improvement AI.

User message:
${input}`

}

]

}

]

})

}

);



const data = await response.json();

console.log(data);



if (
data.candidates &&
data.candidates.length > 0
) {

output.innerText =

data.candidates[0]
.content.parts[0]
.text;

}

else {

output.innerText =
"API Error.";

console.log(data);

}

}

catch(error) {

console.log(error);

output.innerText =
"Connection failed.";

}

}