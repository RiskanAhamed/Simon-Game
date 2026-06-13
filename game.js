
const buttonColours=["red","blue","green","yellow"];
let gamePattern=[], userClickedPattern=[], started=false, level=0;
let highScore=localStorage.getItem("simonHighScore")||0;
$("#high-score").text(highScore);

$("#startBtn").click(function(){
 if(started) return;
 started=true; level=0; gamePattern=[];
 nextSequence();
});

$(".btn").click(function(){
 if(!started) return;
 const color=$(this).attr("id");
 userClickedPattern.push(color);
 playSound(color); animatePress(color);
 checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(i){
 if(gamePattern[i]===userClickedPattern[i]){
   if(userClickedPattern.length===gamePattern.length){
      setTimeout(nextSequence,800);
   }
 }else{
   playSound("wrong");
   $("body").addClass("game-over");
   $("#level-title").text("Game Over");
   started=false;
   setTimeout(()=>$("body").removeClass("game-over"),300);
 }
}

function nextSequence(){
 userClickedPattern=[];
 level++;
 $("#level").text(level);
 $("#level-title").text("Level "+level);
 if(level>highScore){
   highScore=level;
   localStorage.setItem("simonHighScore",highScore);
   $("#high-score").text(highScore);
 }
 const randomChosenColour=buttonColours[Math.floor(Math.random()*4)];
 gamePattern.push(randomChosenColour);
 $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
}

function animatePress(c){
 $("#"+c).addClass("pressed");
 setTimeout(()=>$("#"+c).removeClass("pressed"),150);
}

function playSound(name){
 new Audio("sounds/"+name+".mp3").play();
}
