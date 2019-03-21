/**
 GAME FUNCTION:
 01- Player must guess a number between a min and max
 02- Player gets a certain amount of guesses
 03- Notify player of guess remaining
 04- Notify the player of the correct answe if loose
 05- Let player choose to play again
 */

//  Game values

let min = 1,
    max = 10,
    winningNum = getRandom(min,max);
    guessLeft = 3;

//  Ui Elements

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;



// Play again

game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-agian'){
        console.log('reloading');
        // Refresh the page
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click',function(){
    
    // let guess = parseInt(guessInput.vlaue);
    let guess = parseInt(guessInput.value);
    // validate
    if(isNaN(guess) || guess < min || guess > max){
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
          } 
    
    // Check if won
    if(guess === winningNum){

        gameOver(true,`${winningNum} is Correct. YOU WIN`);
    }else {
        // Decreament guessLeft
        guessLeft -= 1;

        if(guessLeft === 0){
     
            gameOver(false,`Game over, you lost. The correct number was ${winningNum}`)

        }else {
            // game continue - answer wrong

            // clear input
            guessInput.value = '';

            // Tell user it's the wrong number

            setMessage(`${guess} is not correct, ${guessLeft} guess left.`,'red')

        
        }
    }

});


// Get winning number

function getRandom(min,max){
    //console.log(Math.floor((Math.random()*(max-min+1)+min)));
    //  random between[min,max]
    return Math.floor((Math.random()*(max-min+1)+min))
}


// Set message
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
}

//  Game over
function gameOver(won, msg){
    let color;
    won === true ? color='green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;

    // Set message.
    setMessage(msg,color);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-agian';

}