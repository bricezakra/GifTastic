$(document).ready(function() {

    //Array of players
    var players = ["Lebron James", "Michael Jordan", "Kobe Bryant", "Stephen Curry", "Kevin durant", "Allen Iverson", "Kawhi Leonard", "Larry Bird", "Vince Carter", "Magic Johnson"];


    //Function that will display the gifs from a specific Basketball Player
    function displayPlayer() {

        $("#players-view").empty(); //Empty the div containing the gifs before charging new ones

        var player = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=OiUNPJQFujSPd8lDgsIQJHSMtC19w5La=" + player + "&limit=10";

        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data; //The result of the Get queryURL is put in an array

            for (var i = 0; i < results.length; i++) { //Go through the whole array

                var playerDiv = $("<div class='player'>"); //new div to display the rating and the gif
                //Store the rating from the result into a variable
                var pRating = $("<p>").text("Rating: " + results[i].rating);
                //new image for the gif
                var image = $("<img class='gif'>");
                //image attributes 
                image.attr("src", results[i].images.original_still.url); //original url of the gif
                image.attr("data-still", results[i].images.original_still.url); //url for the non amimated gif
                image.attr("data-animate", results[i].images.original.url); //url for the animated gif
                image.attr("data-state", "still"); //the default state of the gif will be still

                //append the rating and the gif to the new div
                playerDiv.append(pRating);
                playerDiv.append(image);

                //and add the new div to the global one that contains all the gifs
                $("#players-view").prepend(playerDiv);
            }

            //when the user click on a gif
            $(".gif").on("click", function() {

                var state = $(this).attr("data-state"); //capture the state of the gif

                //if the gif is still, it become animated
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate")); //choose the corresponding url 
                    $(this).attr("data-state", "animate"); //change the state to animate
                } else { //if it's animated, it become still
                    $(this).attr("src", $(this).attr("data-still")); //choose the corresponding url 
                    $(this).attr("data-state", "still"); //change the state to still
                }
            });


        });
    };


    //function to display the buttons
    function renderButtons() {
        //clear the button view before adding
        $("#buttons-view").empty();

        //go through the initial players array and display buttons for each element in the array
        for (var i = 0; i < players.length; i++) {

            var a = $("<button type='button'></button>"); //create a button
            a.addClass("btn btn-info playerBtn"); //with a bootstrap btn-info class
            a.attr("data-name", players[i]); //and a data-name attribute which will be one of the element of our array
            a.text(players[i]); //and the text will be the i element of our array
            //append the buttons to the div 
            $("#buttons-view").append(a);
        };
    }

    //function to add a new player from the inputBox
    //when the visitor click on the submit button
    $("#add-player").on("click", function(event) {
        event.preventDefault(); //to prevent the page to refresh
        var userInput = $("#player-input").val().trim(); //the new value entered by the user
        players.push(userInput); //the value is added to the array players
        renderButtons(); //we call the function to display the buttons
        $("#player-input").val(""); //clear the input box
    });

    //function on click when the user click on a player button
    $(document).on("click", ".playerBtn", displayPlayer);

    renderButtons();

});