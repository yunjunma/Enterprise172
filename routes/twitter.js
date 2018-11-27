var express = require("express");
var router = express.Router();
var connection = require("../config/connection");
var Twitter = require("twitter");

// connect to twitter
var client = new Twitter({
  consumer_key: "s3vvKcx6DwySzyFQ27jYdLMEA",
  consumer_secret: "oxo2Y9BMpXSIkPIlQ3s8SpwhrDnIaIWOhQXM0DzwVMV0Zkq5dF",
  access_token_key: "833741570662821891-M07arKYTNSU5pN96MVQmOMLMpITTzx5",
  access_token_secret: "Uim0JDgleEbQA00hphtejl3Zo64X2iz8GHKextAGLyQjd"
});

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

// client.get('trends/place', {id: '23424977'}, function(error, tweets, response) {
//     trendsArr = tweets[0].trends
//     // console.log(trendsArr);
//     trends = trendsArr[0];
//     console.log(trends.name);
//  });

/* GET home page. */
router.get("/", function(req, res, next) {
  let limitedTrends = [];
  // get twitter trneds around the location of San Jose
  client.get("trends/place", { id: "23424977" }, function(
    error,
    trends,
    response
  ) {
    trendsArr = trends[0].trends;
    // console.log(trendsArr);
    // console.log(trendsArr[0]);
    let numOfTrends = 10;
    for (var t = 0; t < numOfTrends; t++) {
      limitedTrends[t] = trendsArr[t];
    }
    res.render("twitter", { trending: limitedTrends });
  });

  // client.get("users/show", { screen_name: "@riCHEardTW" }, function(
  //   error,
  //   profile,
  //   response
  // ) {
  //   // console.log(profile);
  //   res.render("twitter", { twitterUser: profile, trending: limitedTrends });
  // });
});

router.post("/searchResult", function(req, res){
  let username = req.body.username;

  // to prevent users forgot to search username without "@"
  if(!username.includes("@"))
  {
    username = "@" + req.body.username;
  }
  console.log(req.body.username)

    client.get("users/show", { screen_name: username }, function(
    error,
    profile,
    response
  ) {
    // console.log(profile);
    res.render("twitterSearchResult", { twitterUser: profile});
  });

  // res.render("twitterSearchResult"); 
});

module.exports = router;
