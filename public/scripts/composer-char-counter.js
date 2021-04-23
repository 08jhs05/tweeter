$(document).ready(function() {
  setCounterAndChangeColor("#tweet-text");

  $("#tweet-text").on("input", function() {
    setCounterAndChangeColor(this);
  });

});

const setCounterAndChangeColor = function(tweetTextDom) {
  $("output.counter")["0"].value = 140 - $(tweetTextDom)["0"].value.length;     // set value of text counter - shows remaining allowed characters count
  if( $("output.counter")["0"].value < 0 ) {
    $("output.counter").css("color", "red"); 
  } else $("output.counter").css("color", "black");
}