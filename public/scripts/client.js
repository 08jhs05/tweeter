const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);     // create a new tweet with passed data
    $(".tweet-container").append(newTweet)          // and append it at tweets container
  }
}

const createTweetElement = function(tweet) {
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
  $.ajax({
    url: "tweets",
    type: "get"
  }).then(function(response) {
    renderTweets(response);
  })
}

$('.new-tweet-form').on('submit', (event) => {   //post new tweet with ajax POST request
  event.preventDefault();
  let str = $("#tweet-text").serialize();
  $.ajax({
    url: "tweets",
    type: "post",
    data: str
  });
});

loadTweets();