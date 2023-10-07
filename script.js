/*
Name: Isaac Vaughn
Class: Web Dev II
Date: 10/9/23
*/

const light = document.getElementById('circle');  // variable with the start/stop "light"

// variables with the two racers
const redCar = document.getElementById('redCar');
const blueCar = document.getElementById('blueCar');

const finishLine = document.getElementById('finish');  // variable with the finish line
const winImg = document.getElementById('winnerImg');  // variable used to hold the image of the winner

// variables for the starting positions of the racers
const redStart = redCar.offsetLeft;
const blueStart = blueCar.offsetLeft;

const finishLinePos = finishLine.offsetLeft;  // gets the position of the finish line relative to it's distance from the left of the window

// variables for the positions of the two racers
let redPos = 0;
let bluePos = 0;

// click event listener for the start/stop "light"
light.addEventListener("click", function(){
    light.style.backgroundColor = 'green';  // change color of the "light"

    // a timer that is calling an anonymous function every .5 seconds
    // it contains an anonymous function to allow for multiple functions/functions needing arguments
    let raceTimer = setInterval(function(){
        moveCar(redCar, blueCar);  // sends the two racers to the moveCar function
        findWinner(redCar, blueCar, raceTimer);  // sends the racers + the timer to the findWinner function to search for a winner after every movement
    }, 500);
});

// click event for the image of the winner
winImg.addEventListener('click', function(){
    const winnerDiv = document.getElementById('winner');  // var with the div that holds all details pertaining to the winner

    // resets all values corresponding to the racers' position
    redCar.style.left = redStart + 'px';
    blueCar.style.left = redStart + 'px';
    redPos = 0;
    bluePos = 0;

    winnerDiv.style.display = "none";  //  stops displaying the winner details div
    light.style.display = "block";  // displays the stop/start "light"
    light.style.backgroundColor = "red";  // resets the light's color back to red
});

// a function used to move the racers
function moveCar(topCar, bottomCar){
    // adds a random number between 50-100 to the position of the racers
    redPos += Math.ceil((Math.random() * 51) + 50);
    bluePos += Math.ceil((Math.random() * 56) + 50);  // for some reason red was winning too often so blue's speed increase evened the odds a little

    // applies the new racer position to the left style of the racers, moving them towards the right of the window
    topCar.style.left = redPos + 'px';
    bottomCar.style.left = bluePos + 'px';
}

// a function that finds the winner of the race and edits the document accordingly
function findWinner(topCar, bottomCar, timer){
    const winTxt = document.getElementById('winnerTxt');  // variable with the h3 tag used to display the winner's name
    const winnerDiv = document.getElementById('winner');  // variable with the winner detail's div

    if (topCar.offsetLeft >= finishLinePos){  // If topCar passes the finish line....
        clearInterval(timer);  // stops the timer
        winnerDiv.style.display = "block";  // displays the div that holds the details of the winner
        light.style.display = "none";  // stops displaying the start/stop light
        winTxt.textContent = "Red Wins!";  // displays win message in the h3 tag grabbed earlier
        winImg.src = "car1.png";  // changes the src of the winImg to the filename of the winner
    }

    else if (bottomCar.offsetLeft >= finishLinePos){  // functions exactly the same as above if, but corresponds to the bottomCar variable
        clearInterval(timer);
        winnerDiv.style.display = "block";
        light.style.display = "none";
        winTxt.textContent = "Blue Wins!"
        winImg.src = "car2.png"
    }
}