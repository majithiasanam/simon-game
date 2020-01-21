var buttonColours = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var gameSequence = [];
var started = false;
var level = 0;

/**
 * Plays the sound associated with a button
 * @param {String} color 
 */
function playSound(color) {
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();
}

/**
 * Shows a flash animation to the user
 * @param {String} color 
 */
function animatePress(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100)
}

function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 400);
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    startOver();
}

function startOver() {
    started = false;
    level = 0;
    gameSequence = [];
    userClickedPattern = [];
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gameSequence.push(randomChosenColour);
    $("#"+randomChosenColour).animate({opacity: "0"}, 100).animate({opacity: "1"}, 100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

function checkAnswer(currentClickNumber){
    if (userClickedPattern[currentClickNumber] === gameSequence[currentClickNumber]) {
        if (userClickedPattern.length === gameSequence.length) {
            console.log("Success");
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Error\n"+userClickedPattern+"\n"+gameSequence);
        gameOver();
        return;
    }
}

$(".button").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function(){
    if (!started) {
        setTimeout(function(){
            nextSequence();
        }, 500);
        started = true;
    }
});
