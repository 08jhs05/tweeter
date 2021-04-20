$(document).ready(function() {
  console.log('dom loaded');
  
  setCounterAndChangeColor("#tweet-text");

  $("#tweet-text").on("input", function() {
    setCounterAndChangeColor(this);
  });

});

const setCounterAndChangeColor = function(tweetTextDom) {
  $("output.counter")["0"].value = 140 - $(tweetTextDom)["0"].value.length;     // set value of text counter - shows remaining allowed characters count
  if( $("output.counter")["0"].value < 0 ) {                                 // checks if the counter goes below 0
    $("output.counter").css("color", "red");                                 // if it does, change color to red, black otherwise
  } else $("output.counter").css("color", "black");
}