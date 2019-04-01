require("dotenv").config();
 
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify); 
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
 

 
var command = process.argv[2];
var parameter = process.argv.slice(3).join(" ");

  switch (command) {
      case "concert-this":
          if (parameter) {
              displayConcert(parameter);
          }
          else displayConcert("Trapt");   
          break;
      case "spotify-this-song":
          if (parameter) {
              displaySong(parameter);
          }
          else displaySong("The Sign by Ace of Base");
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
          console.log("Please try again. Liri, didn't get that.");
  }
  function displayConcert(parameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
    if (parameter === "") {
        console.log("Try entering a band/artist again");
    } else {
        axios.get(queryUrl).then(
            function (response) {
                for (i = 0; i < response.data.length; i++) {
                    console.log("Here is a list of concerts for " + parameter);
                    console.log("Name of the venue: " + response.data[i].venue.name);
                    console.log("Venue location: " +  response.data[i].venue.city + ", " +
                    response.data[i].venue.region + " " + response.data[i].venue.country);
                    console.log("Date of the Event: " + moment(response.data[i].venue.datetime).format("MM-DD-YYYY"));
                    console.log("                              ");
                }
            }
        );
    };
};


function displaySong(parameter) {
  if (parameter === "") {
      parameter = "The Sign by Ace of Base";
  }
  spotify
      .search({
          type: "track",
          query: userInputText
      })
      .then(function (response) {
          for (i = 0; i <= 7; i++) {
              console.log("Here is a list of songs for " + parameter);
              console.log("The song's name: " + response.tracks.items[i].name);
              console.log("A preview link of the song from Spotify: " 
              + response.tracks.items[i].external_urls.spotify);
              console.log("Artist(s): " + response.tracks.items[i].album.artists[0].name);
              console.log("The album that the song is from: " + response.tracks.items[i].album.name);
          }
      })
      .catch(function (err) {
          console.log(err);
      });
};

function displayMovie() {
  var queryUrl = "http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy";
  if (parameter === "") {
      parameter = "Mr. Nobody";
      console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
      console.log("It's on Netflix!");
  } else {
      axios.get(queryUrl).then(
          function (response) {
              console.log("Here is a list of movies for " + parameter + "---------");
              console.log("Title of the movie: " + response.data.Title);
              console.log("The year the movie came out: " + response.data.Year);
              console.log("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
              console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
              console.log("Country where the movie was produced: " + response.data.Country);
              console.log("Language of the movie: " + response.data.Language);
              console.log("Plot of the movie: " + response.data.Plot);
              console.log("Actors in the movie: " + response.data.Actors);
          }
      );
  };
};

function doWhatItSays() {
  
  fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) {
          return console.log(err);
      }
      
    displaySong(data);
  });
}






    
 

 



