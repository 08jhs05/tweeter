const renderTweets = function(tweets) {
  tweets.sort((a, b) => {
    return a.created_at < b.created_at;             // sort tweets by comparing its time created - tweet created most recently comes first
  })
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $(".tweet-container").append(newTweet) 
  }
}

const createTweetElement = function(tweet) {
  let $tweet = `<article class="tweet-article">
    <header class="tweet-header">
      <img src=${tweet.user.avatars}>
      <div class="tweetUserName">${tweet.user.name}</div>
      <div class="tweetAddress">${tweet.user.handle}</div>
    </header>
      <p class="tweet-body">${escape(tweet.content.text)}</p>
      <hr>
    <footer class="tweet-footer">
      <div id="tweet-time">${timeago.format(tweet.created_at)}</div>
      <div class="tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
    </article>`
  return $tweet;                          // use escape function to escape unsafe characters from content text passed
}

const loadTweets = function() {
  $(".tweet-container").empty();          // reset tweet container
  $.ajax({
    url: "tweets",
    type: "get"
  }).then(function(response) {
    renderTweets(response);
  })
}

$('.fa-angle-double-down').on('click', function() {         // add click listener to compose button on nav
  $(".new-tweet-form").slideDown(200, function() {          // when it's clicked, the form is shown and button is hidden
    $(".new-tweet-form").show();
  });
  $("#tweet-text").focus();
  $('.fa-angle-double-down').hide();
})

$('.new-tweet-form').on('submit', (event) => {   // post new tweet with ajax POST request
  event.preventDefault();
  if($("#tweet-text")[0].value == null || $("#tweet-text")[0].value == "" ) {     // check if new tweet is empty
    $(".error-emptytweet").slideDown(200, function() {
      $(".error-emptytweet").show();
    });
    return;
  }

  if($("#tweet-text")[0].value.length > 140) {                      //check if new tweet exceeds 140 characters limit
    $(".error-exceedslimit").slideDown(200, function() {
      $(".error-exceedslimit").show();
    });
    return;
  }

  let str = $("#tweet-text").serialize();     // serialize tweet text
  $("#tweet-text")[0].value = "";             // empty textarea after it's serialized and ready to post

  if($(".error-exceedslimit").is(":visible")) {
    $(".error-exceedslimit").slideUp(200, function() {      // hide error messages
      $(".error-exceedslimit").hide();
    });
  }

  if($(".error-emptytweet").is(":visible")) {
    $(".error-emptytweet").slideUp(200, function() {
      $(".error-emptytweet").hide();
    });
  }
  
  $.ajax({
    url: "tweets",
    type: "post",
    data: str
  }).done(loadTweets);              //load tweets again when request is finished
});

loadTweets();

const escape = function (str) {                 // this function escapes unsafe characters from passed string and return as div
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
