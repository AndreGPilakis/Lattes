                $(document).ready(function() {
                    var defaults = ["canberra", "sydney", "melbourne", "brisbane", "perth", "adelaide", "hobart", "darwin", ];
                    var forecastCards = $("#forecast-deck").find(".forecast-Card");
                    //update defaults
                    for (var x in defaults) {
                        updateDay(defaults[x]);
                    }

                    var date = new Date();
                    var today = date.getDay();
                    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    //formats days to an array begining tomorrow
                    var formattedDays = days.slice(today + 1, 7).concat(days.slice(0, today));
                    //set day spans to next 6 days
                    for (x = 0; x <= 6; x++) {
                        $(forecastCards[x]).find(".forecast-Day").text(formattedDays[x]);
                    }
                    updateForecast("melbourne");

                    $("#searchButton").click(function() {
                        var cityToSearch = $("#search").val().replace(/[^a-z]/gi,'');
                        updateForecast(cityToSearch, true)
                    });

                });

                //for updating main info
                function updateDay(location, custom) {
                    var cityData;
                    var request = new XMLHttpRequest();
                    //need to change spaces to %
                    //Getting general data
                    request.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + ',au&appid=f9de4f8751530b8c459bea50843de990', true);
                    request.onload = function() {
                        // Begin accessing JSON data here
                        cityData = JSON.parse(this.response);
                        //targets respective div by default, if user is searching we change 'location' to custom AFTER aquiring API information
                        //to target the correct div.
                        if (custom == true) {
                            console.log("custom");
                            location = "custom";
                        }
                        $("#" + location + "Card").find(".temperature").text((cityData.list[0].main.temp - 273.15).toFixed(2) + String.fromCharCode(176) + "C");
                        $("#" + location + "Card").find(".weatherIcon").attr('src', 'https://openweathermap.org/img/w/' + (cityData.list[0].weather[0].icon).slice(0, 2) + 'd.png');
                        $('#' + location + "Card").find(".wind").text((cityData.list[0].wind.deg).toFixed(0) + " deg, " + cityData.list[0].wind.speed + "m/s");
                        $('#' + location + "Card").find(".clouds").text(cityData.list[0].weather[0].main);
                        $('#' + location + "Card").find(".pressure").text(cityData.list[0].main.pressure + "hpa");
                        $('#' + location + "Card").find(".humidity").text(cityData.list[0].main.humidity + "%");
                        $('#' + location + "Card").find(".coords").text("[" + (cityData.city.coord.lat).toFixed(1) + "],[" + cityData.city.coord.lon.toFixed(1) + "]");

                    }
                    request.send();
                }

                //for updating 7 day forecast
                function updateForecast(location) {
                    //updates the custom box (Detailed)
                    updateDay(location, true);
                    $("#customCard").find('h1').text(location);
                    var request = new XMLHttpRequest();
                    var cityData;
                    var forecastCards = $("#forecast-deck").find(".forecast-Card");
                    request.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + ',au&appid=f9de4f8751530b8c459bea50843de990', true);
                    request.onload = function() {
                        // Begin accessing JSON data here
                        cityData = JSON.parse(this.response);
                        console.log(cityData);
                        for (var i = 0; i <= 5; i++) {
                            //updates temp to relative day. Using i+1 as array of forecast cards is one behind array of returned temps.
                            //Temperature is given in kelvin on API, hence -273.15
                            $(forecastCards[i]).find(".forecast-temperature").text(((cityData.list[i + 1].main.temp) - 273.15).toFixed(2) + '°');
                        }
                    }
                    request.send();
                }
                