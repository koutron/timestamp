var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/*", function (request, response) {
  var input = request.path.slice(1).toString();
  var dateObj = dateFormatter(input);
  var naturalDate = convertToNaturalDate(dateObj);
  response.end(JSON.stringify(naturalDate));
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function dateFormatter(input){
  var date;
  if(isUnixTime(input)){
    date = new Date(input * 1000);
  }
  else{
  input = input.replace(/%20/g, ' ');
  date = new Date(input);
  }
  var dateObj = {
    orgDate : date,
    year : date.getFullYear(),
    month : date.getMonth(),
    day : date.getDate(),
    unixTime : date.getTime() 
  };
  return dateObj;
}

function isUnixTime(input){
  var allNumbers = new RegExp(/^\d+$/);
  if(allNumbers.test(input)){
    return true;
  }
  else{
    return false;
  }
}

function convertToNaturalDate(dateObj){
  var naturalMonth;
  switch (dateObj.month) {
    case 0:
        naturalMonth = "January";
        break;
    case 1:
        naturalMonth = "February";
        break;
    case 2:
        naturalMonth = "March";
        break;
    case 3:
        naturalMonth = "April";
        break;
    case 4:
        naturalMonth = "May";
        break;
    case 5:
        naturalMonth = "June";
        break;
    case 6:
        naturalMonth = "July";
        break;
    case 7:
        naturalMonth = "August";
        break;
    case 8:
        naturalMonth = "September";
        break;
    case 9:
        naturalMonth = "October";
        break;
    case 10:
        naturalMonth = "November";
        break;
    case 11:
        naturalMonth = "December";
        break;
}
  var naturalDate = naturalMonth + " " + dateObj.day + ", " + dateObj.year;
  if(naturalMonth == null || dateObj.day == null || dateObj.year == null){
    naturalDate = null;
  }
  var naturalDateObj = {
    "Natural Date" : naturalDate,
    "UNIX Time" : dateObj.unixTime
  };
  return naturalDateObj;
}