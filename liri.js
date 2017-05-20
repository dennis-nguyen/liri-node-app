var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");
var command = process.argv[2];
var commandInput = process.argv[3];
var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

function choice(command, commandInput) {
    switch (command) {
        case "spotify-this-song":
            spotifyThisSong(commandInput);
            break;
        case "movie-this":
            movieThis(commandInput);
            break;
        case "my-tweets":
            myTweets();
            break;
        case "do-what-it-says":
            doWhatItSays();
    }
}
choice(command, commandInput);

function spotifyThisSong(songTitle) {
    var songArray = [];
    spotify.search({
        type: 'track',
        query: songTitle
    }, (err, data) => {
        if (err) {
            return songArray.push("Spotify Error: " + err);
        }
        for (i = 0; i < data.tracks.items.length; i++) {
            songArray.push("Artist:" + data.tracks.items[i].artists[0].name); //ARIST NAME
            songArray.push("Track: " + data.tracks.items[i].name); //TRACK NAME
            songArray.push("Preview URL: " + data.tracks.items[i].preview_url); //PREVIEW URL
            songArray.push("Album Name: " + data.tracks.items[i].album.name); //ALBUM NAME
            songArray.push("------------------------------------------------");
        }
        log(songArray);
    });
}
//OMDB WENT PRIVATE - SWITCH TO IMDB MODULE?
function movieThis(movieTitle) {
    var movieArray = [];
    var title = movieTitle.split(" ").join("+");
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json", (error, response, body) => {
        if (!error && response.statusCode === 200) {
            movieArray.push("------------------------------------------------");
            movieArray.push("Movie Title: " + JSON.parse(body).Title); //TITLE 
            movieArray.push("Year Released: " + JSON.parse(body).Year); //YEAR MOVIE CAME OUT
            movieArray.push("IMDB Rating: " + JSON.parse(body).imdbRating); //IMDB RATING OF THE MOVIE
            movieArray.push("Country: " + JSON.parse(body).Country); //COUNTRY WHERE MOVIE WAS PRODUCED
            movieArray.push("Language: " + JSON.parse(body).Language); //LANGUAGE OF THE MOVIE
            movieArray.push("Plot: " + JSON.parse(body).Plot); //PLOT OF THE MOVIE
            movieArray.push("Actors: " + JSON.parse(body).Actors); //ACTORS IN THE MOVIE
            movieArray.push("------------------------------------------------");
        } else {
            movieArray.push("Error: " + error);
        }
        log(movieArray);
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", (err, data) => {
        var randomInput = data.split(",");
        choice(randomInput[0], randomInput[1]);
    });
}

function myTweets() {
    var tweetsArray = [];
    var params = {
        screen_name: 'Macaroons11',
        count: 20
    };
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        for (i = 0; i < tweets.length; i++) {
            if (error) {
                return tweetsArray.push("Error: " + error);
            }
            tweetsArray.push("Tweet: " + tweets[i].text); //Tweet
            tweetsArray.push("Created At: " + tweets[i].created_at); //Created At
            tweetsArray.push("------------------------------------------------");
        }
        log(tweetsArray);
    });
}

function log(logInput) {
    for (i = 0; i < logInput.length; i++) {
        console.log(logInput[i]);
        fs.appendFile('log.txt', logInput[i] + "\n", function (err) {
            if (err) throw err;
        });
    }
}