



$(document).ready(function() {


    topics = ["Mercedes-Benz", "BMW", "Audi", "Land Rover", "Tesla", "Porsche", "Ferrari",
        "Lamborghini", "McLaren", "Bentley", "Rolls-Royce", "Alfa Romeo", "Maserati", "Aston Martin",
        "Acura", "Bugatti", "Lexus", "Maybach", "Fiat", "Mini Cooper"];
    var main = $("body");
    var btns = main.find("#gifButtons");

    printButtons ();


    $(".addCar").on("click", function() {
        event.preventDefault();
        var carBrand = $("#getBrand").val().trim();
        topics.push(carBrand);
        $("#getBrand").val("");
        console.log(topics);
        $("#gifButtons").empty();
        printButtons ();

    });

    function getGiphy () {

        $("#giffies").empty();
        var car = $(this).attr("data-car");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            car + "&api_key=uQS99PlR3IDmhwKaKzfdtaArT9vTgJx7&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(response);
                console.log(car);

                var results = response.data;

                for (var r = 0; r < results.length; r++) {
                    var carDiv = $("<div>");
                    var rating = $("<p>").text("Rating: " + results[r].rating);
                    var carImage = $("<img>");


                    carImage.attr("src", results[r].images.fixed_height_still.url);
                    carImage.addClass("gif");
                    carImage.attr("data-state", "still");
                    carImage.attr("data-still", results[r].images.fixed_height_still.url);
                    carImage.attr("data-animate", results[r].images.fixed_height.url);

                    carDiv.attr("id", "carGif");
                    carDiv.append(rating);
                    carDiv.append(carImage);

                    $("#giffies").prepend(carDiv);
                }
            });
    }

    function animateCar () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    function printButtons () {
        for (var t = 0;t < topics.length; t++) {
            var carButton = $("<button>");
            carButton.addClass("car-button");
            carButton.attr("data-car", topics[t]);
            carButton.text(topics[t]);
            btns.append(carButton);
        }
    }

    $(document).on("click", ".car-button", getGiphy);
    $(document).on("click", ".gif", animateCar);

});

