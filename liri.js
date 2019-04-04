require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var command = process.argv[2];
var parameter = process.argv.slice(3).join(" ");

function userPrompt(command, parameter) {
  var currentDate = new Date();
  fs.appendFile("log.txt", ("\r\n-----------------------------------------"), function (err) {
  });
  fs.appendFile("log.txt", ("\r\n" + currentDate), function (err) {
  });
  switch (command) {
    case "concert-this":
      displayConcert(parameter);
      break;
    case "spotify-this-song":
      if (parameter === "") {
        displaySong("The Sign by Ace of Base");
      }
      else displaySong(parameter);
      break;
    case "movie-this":
      if (parameter) {
        displayMovie(parameter);
      }
      else displayMovie("Mr. Nobody");
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("Please try again. Liri didn't get that.");
      fs.appendFile("log.txt", ("\r\nPlease try again. Liri didn't get that."), function (err) {
      });
  }
}

userPrompt(command, parameter);

function displayConcert(parameter) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
  if (parameter === "") {
    console.log("Try entering a band/artist again");
    fs.appendFile("log.txt", ("\r\nTry entering a band/artist again"), function (err) {
    });
  } else {
    axios.get(queryUrl).then(
      function (response) {
        if (response.data.length === 0) {
          console.log("There is no concert information for " + parameter + ". Please try again.");
          fs.appendFile("log.txt", ("\r\nThere is no concert information for " + parameter + ". Please try again."), function (err) {
          });
        } else {
          for (i = 0; i < response.data.length; i++) {
            console.log("\r\nConcerts for " + parameter);
            fs.appendFile("log.txt", ("\r\nConcerts for " + parameter), function (err) {

            });
            console.log("Name of the venue: " + response.data[i].venue.name);
            fs.appendFile("log.txt", ("\r\nName of the venue: " + response.data[i].venue.name), function (err) {

            });
            console.log("Venue location: " + response.data[i].venue.city + ", " +
              response.data[i].venue.region + " " + response.data[i].venue.country);
            fs.appendFile("log.txt", ("\r\nVenue location: " + response.data[i].venue.city + ", " +
              response.data[i].venue.region + " " + response.data[i].venue.country), function (err) {

              });
            console.log("Date of the Event: " + (moment(response.data[i].datetime).format('MM/DD/YYYY')));
            fs.appendFile("log.txt", ("\r\nDate of the Event: " + (moment(response.data[i].datetime).format('MM/DD/YYYY'))), function (err) {

            });

          }
        }
      }
    )
      .catch(function (err) {
        console.log(err);
        console.log("\r\n Something went wrong. Check your spelling and try entering a band/artist again");
        fs.appendFile("log.txt", ("\r\n Something went wrong. Check your spelling and try entering a band/artist again"), function (err) {
        });
      });
  };
};

function displaySong(parameter) {
  if (parameter === "") {
    parameter = "The Sign by Ace of Base";
  }
  spotify
    .search({
      type: "track",
      query: parameter
    })
    .then(function (response) {

      for (j = 0; j <= 10; j++) {
        fs.appendFile("log.txt", ("\r\nThe song's name: " + response.tracks.items[j].name), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nA preview link of the song from Spotify: "
          + response.tracks.items[j].external_urls.spotify), function (err) {
          });
        fs.appendFile("log.txt", ("\r\nArtist(s): " + response.tracks.items[j].album.artists[0].name), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nThe album that the song is from: " + response.tracks.items[j].album.name), function (err) {
        });
        console.log("\r\nThe song's name: " + response.tracks.items[j].name);
        console.log("A preview link of the song from Spotify: "
          + response.tracks.items[j].external_urls.spotify);
        console.log("Artist(s): " + response.tracks.items[j].album.artists[0].name);
        console.log("The album that the song is from: " + response.tracks.items[j].album.name);
      }
    })

    .catch(function (err) {
      console.log("\r\n Something went wrong. " + parameter + ", didn't come up in the search. Check your spelling and try entering another song.");
      fs.appendFile("log.txt", ("\r\n Something went wrong. " + parameter + ", didn't come up in the search. Check your spelling and try entering another song."), function (err) {
      });
      // console.log(err);
    });
};

function displayMovie(parameter) {
  var queryURl = "http://www.omdbapi.com/?t=" + parameter + "&y=&plot=full&apikey=trilogy&tomatoes=true";
  if (parameter === "") {
    // parameter = "Mr. Nobody";
    console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
    fs.appendFile("log.txt", ("\r\nIf you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>"), function (err) {
    });
    console.log("It's on Netflix!");
  } else {
    axios.get(queryURl).then(
      function (response) {
        fs.appendFile("log.txt", ("\r\nTitle of the movie: " + response.data.Title), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nThe year the movie came out: " + response.data.Year), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nIMDB Rating of the movie: " + response.data.imdbRating), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nRotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nCountry where the movie was produced: " + response.data.Country), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nLanguage of the movie: " + response.data.Language), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nPlot of the movie: " + response.data.Plot), function (err) {
        });
        fs.appendFile("log.txt", ("\r\nActors in the movie: " + response.data.Actors), function (err) {
        });
        console.log("Title of the movie: " + response.data.Title);
        console.log("The year the movie came out: " + response.data.Year);
        console.log("IMDB Rating of the movie: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
        console.log("Country where the movie was produced: " + response.data.Country);
        console.log("Language of the movie: " + response.data.Language);
        console.log("Plot of the movie: " + response.data.Plot);
        console.log("Actors in the movie: " + response.data.Actors);
      }
    )
      .catch(function (err) {
        console.log(err);
        console.log("\r\n Something went wrong. Check your spelling and try entering another movie");
        fs.appendFile("log.txt", ("\r\n Something went wrong. Check your spelling and try entering another movie"), function (err) {
        });
      });
  };
};

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var defaultFile = data.split(",");
    userPrompt(defaultFile[0], defaultFile[1]);
  });
}













