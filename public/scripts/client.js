const renderTweets = function(tweets) {
  tweets.sort((a, b) => {
    return a.created_at < b.created_at;             // sort tweets by comparing its time created - tweet created most recently comes first
  })
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);     // create a new tweet with passed data
    $(".tweet-container").append(newTweet)          // and append it at tweets container
  }
}

const createTweetElement = function(tweet) {        // create a single tweet article from passed data
  let $tweet = `<article class="tweet-article">
    <header class="tweet-header">
      <img src=${tweet.user.avatars}>
      <div class="tweetUserName">${tweet.user.name}</div>
      <div class="tweetAddress">${tweet.user.handle}</div>
    </header>
      <p class="tweet-body">${tweet.content.text}</p>
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
  return $tweet;
}

const loadTweets = function() {           //load tweets with ajax GET request to /tweets
  $(".tweet-container").empty();          // reset tweet container
  $.ajax({
    url: "tweets",
    type: "get"
  }).then(function(response) {
    renderTweets(response);
  })
}

$('.new-tweet-form').on('submit', (event) => {   //post new tweet with ajax POST request
  event.preventDefault();
  if($("#tweet-text")[0].value == null || $("#tweet-text")[0].value == "" ) {     // check if new tweet is empty
    alert('Your tweet cannot be EMPTY!');
    return;
  }
  if($("#tweet-text")[0].value.length > 140) {                      //check if new tweet exceeds 140 characters limit
    alert('Your tweet exceeded the maximum message length.');
    return;
  }
  let str = $("#tweet-text").serialize();
  $.ajax({
    url: "tweets",
    type: "post",
    data: str
  }).done(loadTweets);              //load tweets again when request is finished
});

loadTweets();