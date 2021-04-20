$(document).ready(function() {
  console.log('dom loaded')
});

$("#tweet-text").on("keypress", function() {
  console.log($(this)["0"].value)
  $("output.counter")["0"].value = $(this)["0"].value.length;
})
