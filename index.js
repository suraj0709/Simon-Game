var buttonColor = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedArray = [];
var started = false;
var level = 0;


$(document).keypress(function(){
  if (!started) {
    $("h1").text("Level "+ level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  $this = $(this);
  $(this).addClass("flash");
  setTimeout(function() {
    $this.removeClass("flash");
  }, 100);
  var userChossenColor = $(this).attr("id");
  var audio= new Audio("sounds/"+ $(this).attr("id")+ ".mp3");
  audio.play();
  userClickedArray.push(userChossenColor);
  compare(userClickedArray.length-1);
});



function nextSequence(){
  userClickedArray= [];
  level++;
  $("h1").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomColorChosen = buttonColor[randomNumber];
  gamePattern.push(randomColorChosen);
  $("."+randomColorChosen).fadeOut(100).fadeIn(100);
  var audio= new Audio("sounds/"+ $("."+randomColorChosen).attr("id")+ ".mp3");
  audio.play();
};

function compare(currentLevel) {
  if (gamePattern[currentLevel] === userClickedArray[currentLevel]) {
    if (gamePattern.length === userClickedArray.length) {
      // console.log(true);
      // console.log(gamePattern);
      // console.log(userClickedArray);
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    gameover();
    // console.log(false);
    // console.log(gamePattern);
    // console.log(userClickedArray);
  }
}

function gameover() {
  $("h1").text("Game Over Press Any Key to Start");
  var audio= new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("gameover");
  setTimeout(function() {
    $("body").removeClass("gameover");
  },200);

  started = false;
  level = 0;
  gamePattern = [];
}
