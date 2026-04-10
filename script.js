// add javascript here
let answer = 0;
let guessCount = 0;
const scores = [];
let range = 0;


let nameprompt = prompt("Enter your name:");
let stringname = String(nameprompt.toLowerCase());
let actualname = stringname[0].toUpperCase() + stringname.slice(1);
let extra = "nothing";

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", end);
document.getElementById("guess").addEventListener("keypress", function(e){
    if (e.key === "Enter") makeGuess();
});

function time(){
    const d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let day = d.getDate();
    let suffix = "th";
    if (day < 11 || day > 13){
        if (day % 10 === 1) suffix = "st";
        else if (day % 10 === 2) suffix = "nd";
        else if (day % 10 === 3) suffix = "rd";
    }

    let iNeedtoreturn = months[d.getMonth()] + " " + day + suffix + ", " +  d.getFullYear() + " - " + d.toLocaleTimeString();

    document.getElementById("date").textContent = iNeedtoreturn;

    return iNeedtoreturn;
}
setInterval(time, 1000);
time();

function play(){
    let levels = document.getElementsByName("level");
    for(let i = 0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    document.getElementById("msg").textContent = actualname + ", guess a number from 1-" + range;

    answer = Math.floor(Math.random()*range) + 1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
    
}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess) || guess < 1 || guess > range){
        msg.textContent = "Please enter a valid number";
        return; 
    }

    guessCount++;
     if (Math.abs(guess - answer) <= 2){
    extra = "Hot! The answer is at most 2 away, " + actualname + "!"
    }   
    else if (Math.abs(guess - answer) <= 5) {
    extra = "Warm! The answer is at most 5 away, " + actualname + "!"
    }
    else{
    extra = "Cold! The answer is more than 5 away, " + actualname + "!";
    }
    if(guess===answer){
        msg.textContent = "Correct! It took " + actualname + " " + guessCount + " tries!";
        updateScore(guessCount);
    resetGame();
    }
    else if (guess < answer){
        msg.textContent = "Too low, " + actualname + "! Try again. " + extra;
    }
    else{
        msg.textContent = "Too high, " + actualname + "! Try again. " + extra;
    }
}   

function end(){
    updateScore(range);
    msg.textContent = actualname + "gave up! The answer was " + answer + ". Score set to " + range;
    resetGame();
}

function updateScore(score){
    scores.push(score);
    wins.textContent = actualname + "'s total wins: " + scores.length;
    let sum = 0;
    for (let i = 0; i < scores.length; i++){
        sum += scores[i];

    }
    avgScore.textContent = actualname + "'s average score: " + (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b});

    let lb = document.getElementsByName("leaderboard");
    for (let i = 0; i < lb.length; i++){
        if(i < scores[i] !== undefined){
            lb[i].textContent = scores [i];
        }
         else{   
            lb[i].textContent = "--"
        }
    }
}

function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false
    h.disabled = false;

}

