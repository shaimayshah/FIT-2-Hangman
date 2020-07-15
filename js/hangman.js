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
    "Active",
    "Spread",
    "Aerosol",
    "Case", 
    "Fatality",
    "Bat", 
    "Lockdown", 
    "Contagious",
    "Immunity", 
    "Immunocompromised", 
    "Recovered", 
    "Outbreak", 
    "Screening", 
    "Zoonosis", 
    "Flatten", 
    "Curve"
];

var words_dict = {"Asymptomatic":"(of a condition or a person) producing or showing no symptoms.", 
            "Symptomatic":"(of a condition or a person) producing or showing symptoms.",
            "Coronavirus":"any of a group of RNA viruses that cause a variety of diseases in humans and other animals.",
            "Mouth":"the opening and cavity in the lower part of the human face, surrounded by the lips, through which food is taken in and vocal sounds are emitted, and the virus can be transmitted.",
            "Touch":"come into or be in contact with.", 
            "Nose":"the part projecting above the mouth on the face of a person or animal, containing the nostrils and used for breathing, smelling and sneezing.", 
            "Pneumonia":"lung inflammation caused by bacterial or viral infection, in which the air sacs fill with pus and may become solid. ", 
            "Epidemic":"a widespread occurrence of an infectious disease in a community at a particular time.",
            "Pandemic":"(of a disease or infection) prevalent over a whole country or the world.",
            "Virus":"an infective agent that typically consists of a nucleic acid molecule in a protein coat, is too small to be seen by light microscopy, and is able to multiply only within the living cells of a host.",
            "Isolation":"the process or fact of isolating or being isolated.",
            "Quarantine":"a state, period, or place of isolation in which people or animals that have arrived from elsewhere or been exposed to infectious or contagious disease are placed.",
            "Sanitizer":"a substance or preparation for killing germs. Advised to be used extensively in this current pandemic.",
            "Testing":"the process of identifying or detecting the presence of a constituent of a substance, or of determining the nature of a substance, commonly by the addition of a reagent.",
            "Mask":"a covering made of fibre or gauze and fitting over the nose and mouth to protect against air pollutants, or made of sterile gauze and worn to prevent infection of the wearer or (in surgery) of the patient.",
            "Ventilator":"an appliance for artificial respiration; a respirator.",
            "Hospital":"an institution providing medical and surgical treatment and nursing care for sick or injured people.",
            "Doctor":"a person who is qualified to treat people who are ill.",
            "Nurse":"a person trained to care for the sick or infirm, especially in a hospital.",
            "Travel":"make a journey, typically of some length.",
            "Handwash":"liquid soap for washing one's hands.",
            "Soap":"a substance used with water for washing and cleaning, made of a compound of natural oils or fats with sodium hydroxide or another strong alkali, and typically having perfume and colouring added.",
            "Active":"Number of current cases of a disease that are currently being treated.",
            "Spread":"extend over a large or increasing area.",
            "Aerosol":"a colloidal suspension of particles dispersed in air or gas.",
            "Recovered":"return to a normal state of health, mind, or strength.",
            "Case":"an instance of a disease, injury, or problem.", 
            "Fatality":"an occurrence of death from disease.",
            "Bat":"Commonly believed to be the source of the Novel Coronavirus.", 
            "Lockdown":"a state of isolation or restricted access instituted as a security measure. Has been implemented in most countries to contain this virus.", 
            "Contagious":"having a disease that can be transmitted by contact with other people.",
            "Immunity":"the ability of an organism to resist a particular infection or toxin by the action of specific antibodies or sensitized white blood cells.", 
            "Immunocompromised":"having an impaired immune system.", 
            "Outbreak":"a sudden occurrence of something unwelcome, such as a disease.", 
            "Screening":"the testing of a person or group of people for the presence of a disease or other condition.", 
            "Zoonosis":"a disease which can be transmitted to humans from animals.", 
            "Flatten":"____ the curve.", 
            "Curve":"Flatten the _____."}
            

// for (var key in words){
//     var value = words[key];
//     alert(key+value);
// }

let answer = '';
let description = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
document.getElementById("maxwrong").innerHTML = maxWrong;

function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)];
    description = words_dict[answer];
    answer = answer.toLowerCase();
}

// function randomWord(){
//     answer = words[Math.floor(Math.random() * words.length)].toLowerCase();
// }

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

function handleKeyDown(event){
    var letter = event.key;
    if(letter === "Enter"){
        reset();
    } else {
        console.log(letter);
        handleGuess(letter);
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
    document.getElementById("description").innerHTML = description;
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

document.addEventListener('keydown', handleKeyDown);
randomWord(words);
generateButtons();
getWord();