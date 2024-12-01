// index.js
// where your node app starts

function isInvalidDate(dateStr) {
  const date = new Date(dateStr);
  return isNaN(date);
}

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Listen on port set in environment constiable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/api/:timestamp", (req, res) => {
  const timestamp = req.params.timestamp;

  if (!timestamp)
    res.json({
      utc: new Date().toUTCString(),
      unix: new Date().getTime(),
    });

  let response;

  if (Number(timestamp)) {
    console.log(response);

    res.json({
      utc: new Date(Number(timestamp)).toUTCString(),
      unix: Number(timestamp),
    });
  } else {
    if (isInvalidDate(timestamp)) res.json({ error: "Invalid Date" });

    console.log(response);

    res.json({
      utc: new Date(timestamp).toUTCString(),
      unix: new Date(timestamp).getTime(),
    });
  }
});
