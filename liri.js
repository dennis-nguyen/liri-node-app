var keys = require("./keys.js");
console.log(keys.twitterKeys.consumer_key);

var twitter = require("./twitter.js");
var spotify = require("./spotify.js");
var omdb = require("./omdb.js");
var request = require("request");

var command = process.argv[2];
var commandInput = process.argv[3];


//////Twitter

// $.ajax({
//     url: "https://api.twitter.com/1.1/followers/ids.json?callback=?",
//     type: "GET",
//     data: {
//         cursor: "-1",
//         screen_name: "twitterapi"
//     },
//     cache: false,
//     dataType: 'json',

//     success: function (data) {
//         alert('hello!');
//         console.log(data);
//     },
//     error: function (html) {
//         alert(html);
//     },
//     beforeSend: setHeader
// });

// function spotifyThisSong(titleInput) {
//     var title = titleInput.split(" ").join("%20");
//     $.ajax({
//         url: "https://api.spotify.com/v1/search?q=" + title + "&type=track&market=US",
//         method: "GET"
//     }).done(function (response) {
//         console.log(response);
//     });
// }


if (command == "spotify-this-song") {
    spotifyThisSong(commandInput);
}
if (command == "movie-this") {
    movieThis(commandInput);
}

//OMDB WENT PRIVATE - SWITCH TO IMDB MODULE?
function movieThis(movieTitle){
    var title = movieTitle.split(" ").join("+");
     request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json", function (error, response, body) {
        console.log("------------------------------------------------");
        console.log("Movie Title: " + JSON.parse(body).Title); //TITLE 
        console.log("Year Released: " + JSON.parse(body).Year);  //YEAR MOVIE CAME OUT
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);  //IMDB RATING OF THE MOVIE
        console.log("Country: " + JSON.parse(body).Country);  //COUNTRY WHERE MOVIE WAS PRODUCED
        console.log("Language: " + JSON.parse(body).Language);  //LANGUAGE OF THE MOVIE
        console.log("Plot: " + JSON.parse(body).Plot);  //PLOT OF THE MOVIE
        console.log("Actors: "+ JSON.parse(body).Actors);  //ACTORS IN THE MOVIE
        // console.log("https://www.rottentomatoes.com/m/"+ JSON.parse(body).Title.split(" ").join("_") +"/"); //RT URL??!?!?!?!
        console.log("------------------------------------------------");
     });
}

//SPOTIFY
function spotifyThisSong(songTitle) {
    var title = songTitle.split(" ").join("+");
    request("https://api.spotify.com/v1/search?q=" + title + "&type=track&market=US", function (error, response, body) {
        for (i = 0; i < JSON.parse(body).tracks.items.length; i++) {
            console.log("Artist:" + JSON.parse(body).tracks.items[i].artists[0].name); //ARIST NAME
            console.log(JSON.parse(body).tracks.items[i].name); //TRACK NAME
            console.log(JSON.parse(body).tracks.items[i].preview_url); //TRACK NAME
            console.log(JSON.parse(body).tracks.items[i].album.name); //ALBUM NAME
            console.log("------------------------------------------------");
        }
    });
}
