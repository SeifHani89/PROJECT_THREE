let gameName = "Guess the Word"
document.title = gameName;
document.querySelector('h1').innerText = gameName;

// GAME Settings
let numberOfGuesses = 5;
let numberOfLetters = 6;
let currentTry = 1;

// Generate Random Word
let wordToGeuss = ""
const words = ['parent', 'school', 
    'lesson',   'pencil',   'eraser',   'laptop', 
    'tablet',   'stream',   'valley',   'Couple',
    'delete',   'random',   'button',   'Around',	
    'bottom',   'active',   'casual',   'couple', 
    'course',   'choose',   'Abroad',	'Casual',	
    'Accept',	'Caught',	'Arrive',	'Course',
    'Access',	'Centre',	'Artist',	'Covers',
    'Across',	'Centum',	'Aspect',	'Create',
    'Acting',	'Chance',	'Assess',	'Credit',
    'Action',	'Change',	'Assist',	'Crisis',
    'Active',	'Charge',	'Assume',	'Custom',
    'Actual',	'Choice',	'Attack',	'Damage',
    'Advice',	'Choose',	'Attend',	'Danger',
    'Advise',	'Chosen',	'August',	'Dealer',
    'Affect',	'Church',	'Author',	'Debate',
    'Afford',	'Circle',	'Avenue',	'Decade',
    'Afraid',	'Client',	'Backed',	'Decide',
    'Agency',	'Closed',	'Barely',	'Defeat',
    'Agenda',	'Closer',	'Battle',	'Defend',
    'Almost',	'Coffee',	'Beauty',	'Define',
    'Always',	'Column',	'Became',	'Degree',
    'Amount',	'Combat',	'Become',	'Demand'
]
wordToGeuss = words[Math.floor(Math.random() * words.length)].toUpperCase();
let message = document.querySelector(".message")

function generateRandomWord() {
    let inputsContainer = document.querySelector(".inputs")
    
    // Create Try Divs
    for(let i = 1; i <= numberOfGuesses; i++) {
        const tryDiv = document.createElement('div');
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<h2>Try ${i}</h2>`;
        if (i != 1) tryDiv.classList.add('disabled');

        // Create inputs
        for(let j = 1; j <= numberOfLetters; j++) {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.id = `try-${i}-letter-${j}`;
            input.setAttribute('maxlength', '1');
            tryDiv.appendChild(input);
            input.onfocus = function() {
            }
        }
        inputsContainer.appendChild(tryDiv);
    }
    // Focus on first input
    inputsContainer.children[0].children[1].focus();

    // disable all inputs except the first one
    let disabledInputs = document.querySelectorAll('.disabled input');
    disabledInputs.forEach(input => {
        input.disabled = true;
    })

    // transform input value to uppercase and focus on next input
    let inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            let nextInput = inputs[index + 1];
            if (this.value) nextInput.focus();
        });
        input.addEventListener('keydown', function(event) {
            // console.log(event.key);
            let currentIndex = Array.from(inputs).indexOf(this)
            if (event.key === "ArrowRight" || event.key === "Enter") {
                let nextInput = inputs[index + 1];
                if (currentIndex < inputs.length) {
                    nextInput.focus();
                }
            }
            if (event.key === "ArrowLeft") {
                let preInput = inputs[index - 1];
                if (currentIndex >= 0) {
                    preInput.focus();
                }
            }
            if (this.value === "" && event.key === "Backspace") {
                let preInput = inputs[index - 1];
                if (currentIndex >= 0) {
                    preInput.focus();
                }
                preInput.value === "";
            }
            if (currentIndex = inputs.length && event.key === "Enter") {
                handleGeusses()
            }
        });
    });
}

let check = document.querySelector('.check');
check.addEventListener('click', handleGeusses);

console.log(wordToGeuss)


function handleGeusses() {
    let successGeuss = true;

    // Logic for checking the geusses
    for (let i = 1; i <= numberOfLetters; i++) {
        let inputField = document.querySelector(`#try-${currentTry}-letter-${i}`);
        let letter = inputField.value;
        // Testing the correct letter and in place
        if (letter == wordToGeuss[i - 1]) {
            inputField.classList.add('full-correct')
        }else if(wordToGeuss.includes(letter) && letter !== "") {
            // Testing the correct letter but not in place
            inputField.classList.add('correct');
            successGeuss = false;
        }else {
            // Testing the wrong letter
            inputField.classList.add('wrong');
            successGeuss = false;
        }
    }
    // check if user win or lose
    if (successGeuss) {
        message.innerHTML = `Congratulations! You Won, The Word Is <span>${wordToGeuss}</span><button onclick="window.location.reload()">Play Again</button>`

        // disable all inputs and check button
        const myTry = document.querySelectorAll(".inputs > div");
        myTry.forEach((inputs) =>
            inputs.classList.add("disable")
        )

        check.disabled = true
    } else {
        message.innerHTML = `Your Geuss Is Wrong`
        
        document.querySelector(`.try-${currentTry}`).classList.add("disabled");
        document.querySelectorAll(`.try-${currentTry} > input`).forEach((input) =>
            input.disabled = true
        )
        currentTry++
        let el = document.querySelector(`.try-${currentTry}`);
        if(el) {
        document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
        document.querySelectorAll(`.try-${currentTry} > input`).forEach((input) =>
            input.disabled = false
    )
        document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
        el.children[1].focus();
    }else {
        check.disabled = true;
        message.innerHTML = `Sorry! You Lose, The Word Is <span>${wordToGeuss}</span><button onclick="window.location.reload()">Play Again</button>`
    }
}
}

let hint = document.querySelector(".hint")
let numOfHints = 2
document.querySelector(".hint span").innerHTML = numOfHints;

hint.addEventListener("click", helpMe)
function helpMe() {
    if (numOfHints > 0) {
        numOfHints--
        document.querySelector(".hint span").innerHTML = numOfHints;
    }
    if (numOfHints === 0){
        hint.disabled = true;
    }
    let enabledInputs = document.querySelectorAll("input:not([disabled])");
    let enabledEmptyInputs = Array.from(enabledInputs).filter((input) => input.value === "");

    if(enabledEmptyInputs.length > 0) {
        let randomIndex = Math.floor(Math.random() * enabledEmptyInputs.length);
        let randomInput = enabledEmptyInputs[randomIndex];
        let indexToFill = Array.from(enabledEmptyInputs).indexOf(randomInput);
        if (indexToFill !== -1) {
            randomInput.value = wordToGeuss[indexToFill].toUpperCase()
        }
    }
}

window.onload = function() {
    generateRandomWord();
}