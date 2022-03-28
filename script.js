// Assignment code here
function lowercasePrompt() {
  var currentOptionSelection = window.prompt("would you like to have lowercase characters in your password? y for yes, n for no");
  let choice;
  if(currentOptionSelection  === "y") {
    choice = true;
  }
  else if(currentOptionSelection  === "n"){
    choice = false;
  }
  else {
    window.alert("invalid answer, please try again"); //loop
    return lowercasePrompt();
  }
  return choice;
}

//asks user if wants to add uppercase characters to password
function uppercasePrompt() {
  var currentOptionSelection = window.prompt("would you like to have uppercase characters in your password? y for yes, n for no");
  let choice;
  if(currentOptionSelection  === "y") {
    choice = true;
  }
  else if(currentOptionSelection  === "n"){
    choice = false;
  }
  else {
    window.alert("invalid answer, please try again"); //loop
    return uppercasePrompt();
  }
  return choice;
}

//asks user if wants to add numerical characters to password
function numbersPrompt() {
  var currentOptionSelection = window.prompt("would you like to have numerical characters in your password? y for yes, n for no");
  let choice;
  if(currentOptionSelection  === "y") {
    choice = true;
  }
  else if(currentOptionSelection  === "n"){
    choice = false;
  }
  else {
    window.alert("invalid answer, please try again"); //loop
    return numbersPrompt();
  }
  return choice;
}

   
//asks user if wants to add special characters to password
function specialcharPrompt() {
  var currentOptionSelection = window.prompt("would you like to have special characters (!,@,#, etc.) in your password? y for yes, n for no");
  let choice;
  if(currentOptionSelection  === "y") {
    choice = true;
  }
  else if(currentOptionSelection  === "n"){
    choice = false;
  }
  else {
    window.alert("invalid answer, please try again"); //loop
    return specialcharPrompt();
  }
  return choice;
}

//returns false if passed in array contains all false values, true otherwise
//helper function to populateArray()
function validatePopulateArray(array) { //checks to see if 
  for(let i = 0; i < array.length; i++){
    if(array[i] === true){
      return true;
    }
  }
  return false;

}
//maybe if null (cancel) return all false, put in prompt functions?
function populateArray() {
  let choiceArray = [
    lowercasePrompt(),
    uppercasePrompt(),
    numbersPrompt(),
    specialcharPrompt()
  ]
  if(validatePopulateArray(choiceArray) === true) {
    return choiceArray;
  }
  window.alert("Please choose at least one, can't have the password be empty!");
  return populateArray(); //basically keeps recursing if the user doesn't exit with choiceArray by having at least one true value in choiceArray
}


function generateRandomInt(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

//asks user to input length of password, then checks with NaN to see if it is a number - parsing it into an integer if it does
//currently still accepts decimals
function inputLength(){
  let passedLength = window.prompt("How long do you want your password to be? Min:8 Max:128");
  if(isNaN(passedLength) === false) {
    let inputSize = parseInt(passedLength);
    if(inputSize >= 8 && inputSize <= 128){
      return inputSize;
    }
    else {
      window.alert("Invalid size! Please enter a number between 8 and 128");
    }
  }
  else {
    window.alert("invalid input detected, please enter a number");
  }
  return inputLength();  //console.log(Number.isInteger(passedLength));
}


function generatePassword() {
  //create strings of possible password characters to provide a pool for random to draw from
  var passwordLength = inputLength();
  
  var lowercaseString = "abcdefghijklmnopqrstuvwxyz";
  var uppercaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numericalString = "1234567890";
  var specialString = ["\u0020", "\u0021", "\u0022", "\u0023", "\u0024", "\u0025", "\u0026", "\u0027", "\u0028", "\u0029", "\u002A", "\u002B", "\u002C", "\u002D", "\u002E", "\u002F", 
                       "\u003A", "\u003B", "\u003C", "\u003D", "\u003E", "\u003F",
                       "\u0040", "\u005B", "\u005C","\u005D","\u005E","\u005F", 
                       "\u0060", "\u007B", "\u007C","\u007D","\u007E",]; //filled according to owasp, also not actually a string but it should work the same
                       //!"#$%^'()*+,-./:;<=>?@[\]^_'{|}~

 
 var quickArray = populateArray();
 console.log(quickArray);
 // now add all the relevant strings into one large string
 var symbolPool = ""; //string containing all of the relevant characters for random to choose from
 if(quickArray[0]) {
   symbolPool = symbolPool + lowercaseString;
   console.log("added lowercase");
 }
 if(quickArray[1]) {
  symbolPool = symbolPool + uppercaseString;
  console.log("added uppercase");
}
if(quickArray[2]) {
  symbolPool = symbolPool + numericalString;
  console.log("added numerical");
}
if(quickArray[3]) {
  symbolPool = symbolPool + specialString;
  console.log("added special");
}

 var symbolLength = symbolPool.length;
 var passwordString = ""; //holds password for return
 
 for(let i = 0; i < passwordLength; i++) {
   passwordString = passwordString + symbolPool[generateRandomInt(symbolLength)];
 }

 console.log("here is the password: \n" + passwordString);
 
 return passwordString;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
