
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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

renderTweets(data);
