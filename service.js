var express = require("express");

var app = express();

// Returns the month name based on the month's number
function monthName(number){
  var months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"]
  return months[number];
}

app.get("/*", function(req, res){
  var urlTime = decodeURI(req.url).slice(1);
  var timestamp = { unix: null, natural: null};

  // Unix Time
  var unix = parseInt(urlTime);
  if (!isNaN(unix) && (unix.toString().length == urlTime.length)) {
    timestamp.unix = unix;
    var time = new Date(0);
    time.setUTCSeconds(unix);
    var date = monthName(time.getMonth()) + " " + time.getDate() + ", " + time.getFullYear();
    timestamp.natural = date;
  } else {
    // Natural Time
    unix = Date.parse(urlTime);
    var time = new Date(urlTime);
    if (!isNaN(unix)) {
      var date = monthName(time.getMonth()) + " " + time.getDate() + ", " + time.getFullYear();
      timestamp.unix = unix;
      timestamp.natural = date;
    }
  }
  res.end(JSON.stringify(timestamp));
});

app.get("/", function(req, res) {
  var string = "How to use:\n \
            enter unix time or natural time (January 1, 1999) as url directory\n \
            e.g: localhost:3000/January 1,1999\n \
            Output: { 'unix': 1450137600, 'natural': 'December 15, 2015' }"
  res.send(string);
})

app.listen(3000);
