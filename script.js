

$(document).ready(function() {
    // API URLs and keys
    var usgsAPI1 = 'https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=03294000&parameterCd=00060,00065&siteType=ST&siteStatus=all&modifiedSince=PT1H';
    var usgsSite1 = '03294000';

    var usgsAPI2 = 'https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=03294445&parameterCd=00010,00065&siteType=ST&siteStatus=all';
    var usgsSite2 = '03294445';
  
    // Replace 'cityname', 'YOUR_API_KEY', and 'SITE_NUMBER' with your own values
  
    // Fetch water level data from USGS API
    $.getJSON(usgsAPI1.replace('03294000', usgsSite1), function(data) {
      var waterLevelSellersburg = data.value.timeSeries[0].values[0].value[0].value;
      var waterTempSellersburg = data.value.timeSeries[1].values[0].value[0].value;
      var lastRecordedTime = data.value.timeSeries[0].values[0].value[0].dateTime;
  
      $('#water-discharge').text(waterLevelSellersburg + ' ft3/s');
      $('#water-level').text(waterTempSellersburg + ' ft');
      $('#last-recorded-time').text(lastRecordedTime);
    });

    $.getJSON(usgsAPI2.replace('03294445', usgsSite2), function(data) {
      var waterTempBSW = data.value.timeSeries[0].values[0].value[0].value;
      var waterLevelBSW = data.value.timeSeries[1].values[0].value[0].value;
      
  
      $('#water-TempBSW').text((waterTempBSW * 9/5 + 32).toFixed(1) + ' °F');
      $('#water-levelBSW').text(waterLevelBSW + ' ft');
    });

  // API key for OpenWeatherMap
var apiKey = '7e1c15feb581b6cedf241a2c0855edb7';

// City name and country code for the location you want to get the weather for
var city = 'Sellersburg';
var country = 'US';

// API URL for OpenWeatherMap
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=' + apiKey;

// Make the API call to OpenWeatherMap
$.getJSON(apiUrl, function(data) {
  // Parse the weather data from the API response
  var weather = data.weather[0].description;
  var temp = Math.round((data.main.temp - 273.15) * 9/5 + 32);
  
  // Display the weather data on the page
  $('#weather').text(weather);
  $('#temp').text(temp + ' °F');
});
  });