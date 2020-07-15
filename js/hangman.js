var words = [
    "Asymptomatic", 
    "Symptomatic",
    "Coronavirus",
    "Mouth",
    "Touch", 
    "Nose", 
    "Pneumonia", 
    "Epidemic",
    "Pandemic",
    "Virus",
    "Isolation",
    "Quarantine",
    "Sanitizer",
    "Testing",
    "Mask",
    "Ventilator",
    "Hospital",
    "Doctor",
    "Nurse",
    "Travel",
    "Handwash",
    "Soap",
    "Death",
    "Active",
    "Spread",
    "Aerosol",
    "Deceased",
    "Total",
    "Case", 
    "Fatality",
    "Bat", 
    "Lockdown", 
    "Contagious",
    "Immunity", 
    "Immunocompromised", 
    "Outbreak", 
    "Screening", 
    "Zoonotic", 
    "Flatten", 
    "Curve"
];

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
document.getElementById("maxwrong").innerHTML = maxWrong;

function randomWord(words){
    answer = words[Math.floor(Math.random() * words.length)].toLowerCase();
}

function generateButtons(){
    var but = "";
    var alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')
    for(var i = 0; i < alphabets.length; i++){
        but += `<button
                     class="btn btn-lg btn-primary m-2 mybutton"
                     id='` + alphabets[i] + `'
                     onClick="handleGuess('` + alphabets[i] + `')"
                   >
                     ` + alphabets[i] + `
                   </button>`;
    }

    document.getElementById('keyboard').innerHTML = but;
}

function handleGuess(letter) {
    if(guessed.indexOf(letter) === -1){
        guessed.push(letter);
    }
    document.getElementById(letter).setAttribute('disabled', true);
    if (answer.indexOf(letter) >= 0) {
        getWord();
        gameWon();
    }
    else if (answer.indexOf(letter) === -1) {
        mistakes++;
        updateMistakes();
        gameLost();
        updatePicture();
    }
}

function updatePicture() {
    document.getElementById('hangmanPic').src = './images/'+mistakes+'.jpg';
}

function gameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = answer;
        document.getElementById('keyboard').innerHTML = 'You have lost. Please research more about this virus.';
    }
}

function gameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'You have won.';
    }
}

function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes;
}

function getWord() {
    wordStatus = answer.split('').map(letter => 
        (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

        document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = "./images/0.jpg"

    randomWord(words);
    getWord();
    updateMistakes();
    generateButtons();
}

randomWord(words);
generateButtons();
getWord();