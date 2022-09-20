//Import characters from character.js 
import {allCharacter} from "./character.js";

const button = document.querySelector("button");
const numberBox = document.getElementById("numbers");
const symbolBox = document.getElementById("symbols");

const passwordElement = document.querySelectorAll(".password-el");
const copyNotice = document.querySelector(".copy-notice")

const modeSwitch = document.getElementById("mode-switch");
const body = document.querySelector("body");


//FORMATTING MODE SWITCH BETWEEN LIGHT AND DARK
modeSwitch.addEventListener("click", ()=>{
    body.classList.toggle("light-mode");
})


//FORMATTING BUTTON TO GENERATE CHARACTERS AND RANDOM PASSWORD
button.addEventListener("click", ()=> {
    generateCharacter();
    passwordElement.forEach(element => 
        generatePassword(element))
});


let characters = [];
//fORMATTING CHARACTERS
function generateCharacter() {
    const {alphabet, numbers, symbols} = allCharacter;
    
    if (numberBox.checked && symbolBox.checked) {
        characters = [...alphabet,
            ...numbers,
            ...symbols]
    } else if (!numberBox.checked && !symbolBox.checked) {
        characters = [...alphabet]
    } else if (!numberBox.checked) {
        characters = [...alphabet,
            ...symbols]
    } else if (!symbolBox.checked) {
        characters = [...alphabet,
            ...numbers]
    }
}


// Function to generate random password
function generatePassword(password) {
    const length = document.getElementById("input").value;
    let randomPassword = "";

    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random()*characters.length);
        randomPassword += (characters[randomNumber]);
    }

    password.textContent = randomPassword;
}


//FORMATTING COPY TO CLIPBOARD ON CLICK
passwordElement.forEach((password) => {
    password.addEventListener("click", ()=>{
        navigator.clipboard.writeText(password.innerHTML);
        copyNotice.textContent = `"${password.textContent}" copied to clipboard`;
        copyNotice.classList.add("active");
        
        setTimeout(() => {
            copyNotice.textContent = `Click any password to copy to clipboard`;
            copyNotice.classList.remove("active");
        }, 2000);
    })
})


