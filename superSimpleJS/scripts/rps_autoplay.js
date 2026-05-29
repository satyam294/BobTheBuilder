//fetch the score object from the localStorage
const score = JSON.parse(localStorage.getItem('score')) ||
            {
                win: 0,
                loss: 0,
                tie: 0
            };  //default operator

let autoPlaying = false;
let intervalID;

function autoPlay(){
    if(!autoPlaying){
        autoPlaying = true;
        intervalID = setInterval(function(){
            move = randomMove();
            playGame(move);
        }, 1000);
    }
    else{
        clearInterval(intervalID);
        autoPlaying = false;
    }
    
}

function randomMove(){
    const random = Math.random();
    let move = '';

    if(random < 1/3){
        move = 'rock';
    }
    else if(random < 2/3){
        move = 'paper';
    }
    else{
        move = 'scissors';
    }

    return move;
}

function playGame(move){

    const cmove = document.querySelector("#moves");
    const res = document.querySelector("#results");
    const scorecard = document.querySelector('#scorecard');

    const computerChoice = randomMove();

    cmove.innerHTML = `You : <img class="move-icon" src="rps-images/${move}-emoji.png"> | <img class="move-icon" src="rps-images/${computerChoice}-emoji.png"> : Computer`;

    if(move === computerChoice){
        score.tie++;
        res.innerHTML = 'Round Tied';
    }
    else if(
        (move === 'rock' && computerChoice === 'scissors') ||
        (move === 'paper' && computerChoice === 'rock') ||
        (move === 'scissors' && computerChoice === 'paper')
    ){
        score.win++;
        res.innerHTML = 'You Won';
    }
    else{
        score.loss++;
        res.innerHTML = 'You Lost';
    }
    //save the scores to avoid losing info on refresh
    localStorage.setItem('score', JSON.stringify(score));

    scorecard.innerHTML = `Win: ${score.win} Loss: ${score.loss} Tie: ${score.tie}`;
}

function updateScoreOnReset(){
    score.win = 0;
    score.loss = 0;
    score.tie = 0; 
    localStorage.removeItem('score');  //remove the stored score

    //show the updated scorecard
    const scorecard = document.querySelector('#scorecard');
    const results = document.querySelector('#results');
    const move = document.querySelector("#moves");

    scorecard.innerHTML = `Win: ${score.win} Loss: ${score.loss} Tie: ${score.tie}`;
    results.innerHTML = "Results"
    move.innerHTML = "Moves made"
}