
// Get the input field
var input = document.getElementById("touring_artist");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("tour_button").click();
  }
});



var eventRequest;

function eventSearch(){

    var artistName = document.getElementById("touring_artist").value;

    var query = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=f302d49f21bfde4a063dd375eb66bd34";
    // console.log(query)

    eventRequest = new XMLHttpRequest();

    eventRequest.open("GET", query, true);

    eventRequest.send();

    eventRequest.onload = processEventRequest;

}

function processEventRequest(){

    var cleanedResponse = JSON.parse(eventRequest.responseText)


    // console.log(cleanedResponse);

    var i;
    var artist_events = "";
    var date_time = "";
    var date = "";

    for (i = 0; i < cleanedResponse.length; i++) {
        date_time = cleanedResponse[i]["datetime"]
        date = date_time.slice(0, 10)
        artist_events += date + " in " + cleanedResponse[i]["venue"]["city"] + ", " + cleanedResponse[i]["venue"]["country"] + "<br>";
    }

    if (artist_events === ""){
    artist_events = "Sorry, no events found."
}
document.getElementById("event-list").innerHTML = artist_events;
}
