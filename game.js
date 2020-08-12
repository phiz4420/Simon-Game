//written by April Tsai, 08/09/2020

var buttonColours = ["red", "blue", "green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

  //detect keypress and reset the level
  var started = false;
  var level = 0;
  $(document).keypress(function(){
 	if (!started){
 		$("#level-title").text("Level " + level);
 		nextSequence();
 		started = true;
 	}
 });

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//create the random pattern
function nextSequence() {
  
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flash animation
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

//play sounds when the button is pressed
function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

//add styles when the button is pressed 
function animatePress(currentColour){
	$("#" + currentColour).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

//check if the answer is correct
function checkAnswer(currentLevel){

	if (gamePattern[currentLevel] ===  userClickedPattern[currentLevel]){
	if (userClickedPattern.length === gamePattern.length){
		setTimeout(function (){
			nextSequence();
		}, 1000);
	}
	}else{
		console.log("wrong");
		playSound("wrong");
		$("body").addClass("game-over");
				setTimeout(function(){
			$("body").removeClass("game-over");
		},200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
	}
};

//restart the game
function startOver(){
	level = 0;
	gamePattern=[];
	started=false;
}