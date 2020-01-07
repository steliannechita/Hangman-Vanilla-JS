const words = [
  "mathematics",
  "statistics",
  "biology",
  "chemistry",
  "anatomy",
  "algebra",
  "philosophy",
  "astronomy"
];

let solution = ""; //variable which will hold the random word selected from words
const maxWrong = 6; //maximum number of attempts the user has
let mistakes = 0; //number of current mistakes the user has done
let attempts = []; //array of letters the user has tried as attempts in his guessing
let guessStatus = null; // the status of the guess which will show the user live, what letters he has guessed out of the letters of the solution, the rest of characters will be marked with undescore _
let pictureIndex = 1; //index of the current image

const randomWord = () => {
  let randomNum = Math.floor(Math.random() * words.length); //generating a random integer between 0 and words.length-1
  solution = words[randomNum]; // setting solution to the value of words array coresponding to randomNum index
};

const generateButtons = () => {
  let alphabet = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(letter => {
      console.log(letter);
      return `<button 
                class='btn  btn-outline-primary m-2' 
                id=${letter} 
                onclick='handleGuess(${letter})'>
                ${letter}
              </button>`;
    })
    .join(""); //constructing the keyboard by using a map function to generate a string composed of HTML buttons, which will be parsed by the innerHTML method
  console.log(alphabet);
  document.getElementById("keyboard").innerHTML = alphabet; //setting the content of the div to the parsed string
};
const handleGuess = chosenLetter => {
  console.log(chosenLetter);
  attempts.indexOf(chosenLetter.id) === -1 && attempts.push(chosenLetter.id); //if the letter chosen by the user hasn't been chosen before, it gets added to the attempts array
  console.log(attempts);
  document.getElementById(chosenLetter.id).setAttribute("disabled", true); //the current letter button becomes disabled, so user will now what letters he has previously used
  if (solution.indexOf(chosenLetter.id) >= 0) {
    //if the current letter is contained by the solution string
    guessedWord(); //run the guessWord function
    checkGameWon(); //and check if the user has won
  } else if (solution.indexOf(chosenLetter.id) === -1) {
    //if the current letter is not contained by the solution string
    updateMistakes(); //run updateMistakes function
    document
      .getElementById("image")
      .setAttribute("src", `./images/${pictureIndex}.png`); //change the picture src to the following one
    checkGameLost(); //run checkGameLost function
  }
};
const guessedWord = () => {
  // this function is splitting the solution within an array of letters , is maping through every letter of the solution and checks if the letter is contained by the attempts array, returning either the letter or _, afterwards joins in a string
  //this function runs only when the user makes a correct guess
  guessStatus = solution
    .split("")
    .map(letter => (attempts.indexOf(letter) >= 0 ? letter : "  _  "))
    .join("");
  document.getElementById("guess-state").innerHTML = guessStatus; //sets the innerHTML of the guess-state to the guessStatus variable
};
const updateMistakes = () => {
  //this function runs every time user makes a wrong guess
  mistakes += 1; //increments value of mistakes by 1
  document.getElementById("mistakes").innerHTML = mistakes; //sets value of the html elem to the variable mistakes
  pictureIndex += 1; //increases the index of the picture displayed by 1, so with every mistake, next picture in the hangman game will be displayed
};
const checkGameWon = () => {
  //runs every time user makes a right guess
  if (guessStatus === solution) {
    //checks if the 2 variables are equal
    document.getElementById(
      "keyboard"
    ).innerHTML = `<h2 style='color:red'>You won!</h2>`; //displays the user with the winning message
    document.getElementById(
      "display-message"
    ).innerHTML = `<h5 style='color:red'>Congratulations!</h5>`; //displays the solution to the user
  }
};

const checkGameLost = () => {
  //runs every time user makes a wrong guess
  if (mistakes === maxWrong) {
    //checks if the current number of mistakes is equal to the maxWrong variable, which holds the max of mistakes aloud
    document.getElementById(
      "keyboard"
    ).innerHTML = `<h2 style='color:red'>You lost!</h2>`; //displays the user with the losing message
    document.getElementById(
      "display-message"
    ).innerHTML = `The word was <span style='color:red'>${solution.toUpperCase()}</span>`; //displays the solution to the user
  }
};

const restart = () => {
  //this function allow the user to start a new game
  document.getElementById("display-message").innerHTML =
    "Try to guess the word by choosing letters!"; //set initial text for 'display-message' heading element
  mistakes = 0; //set mistakes back to 0
  document.getElementById("mistakes").innerHTML = mistakes; //then displaying mistakes to the screen
  attempts = []; //attemps array get's back to an empty array
  guessStatus = null;
  pictureIndex = 1; //setting the index of the image back to the first image
  document
    .getElementById("image")
    .setAttribute("src", `./images/${pictureIndex}.png`); //we set back the first step image on the screen
  start(); //run function start
};

document.getElementById("maxWrong").innerHTML = maxWrong; //set the innerHTML of the maximum mistakes allowed

const start = () => {
  //runs at the very begining of the game and is invoked every time user hits restart button
  randomWord();
  generateButtons();
  guessedWord();
};

start(); //invoking start, will prompt user with a game-ready screen as soon as he runs the app
