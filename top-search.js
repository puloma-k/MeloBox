
var input = document.getElementById("country-name")
input.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13) {
        document.getElementById("search-country").click();
    }
})


var countryRequest;

function search(){

    var countryName = document.getElementById("country-name").value;

    var query = "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" + countryName + "&api_key=b32fd41cab27d1b5430689c310515722&format=json";
    console.log(query)

    countryRequest = new XMLHttpRequest();

    countryRequest.open("GET", query, true);

    countryRequest.send();

    countryRequest.onload = processCountryRequest;

}

function processCountryRequest(){

    var cleanedResponse = JSON.parse(countryRequest.responseText)

    // if(countryRequest.readState !=4 || countryRequest.status !=200) {
    //     alert('Error');
    //     return;
    // }

    console.log(cleanedResponse);

    var i;
    var topSongs=""

    for (i = 0; i < 15; i++) {
        topSongs += cleanedResponse["tracks"]["track"][i]["name"] + " by " + cleanedResponse["tracks"]["track"][i]["artist"]["name"] + "<br>";
    }

    // var topSongs = cleanedResponse["tracks"]["track"]["name"]

    document.getElementById("text").innerHTML = topSongs;


}
