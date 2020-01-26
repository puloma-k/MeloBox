
var input = document.getElementById("artist-name")
input.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13) {
        document.getElementById("search-artist").click();
    }
})

var artistRequest;

function similar(){

    var artistName = document.getElementById("artist-name").value;

    var query2 = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistName + "&api_key=b32fd41cab27d1b5430689c310515722&format=json"

    console.log(query2)

    artistRequest = new XMLHttpRequest();

    artistRequest.open("GET", query2, true);

    artistRequest.send();

    artistRequest.onload = processArtistRequest;

}

function processArtistRequest(){

    var cleanedResponse = JSON.parse(artistRequest.responseText)

    console.log(cleanedResponse);

    var i;
    var simArtists="";
    var page_link;



    for (i = 0; i < 15; i++) {
        artist_page = cleanedResponse["similarartists"]["artist"][i]["name"];
        lastfm_link = artist_page.link("http://www.last.fm/music/" + cleanedResponse["similarartists"]["artist"][i]["name"])
        simArtists += lastfm_link + "<br>";
    }

    // var topSongs = cleanedResponse["tracks"]["track"]["name"]

    document.getElementById("text2").innerHTML = simArtists;
}
