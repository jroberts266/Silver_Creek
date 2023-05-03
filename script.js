$(document).ready(function() {
    // API URLs and keys
    var usgsAPI1 = 'https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=03294000&period=PT2H&parameterCd=00060,00065&siteType=ST&siteStatus=all&modifiedSince=PT4H';
    var usgsSite1 = '03294000';

    var usgsAPI2 = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03294445&period=PT4H&parameterCd=00060,00065,00010&siteStatus=all';
    var usgsSite2 = '03294445';
  

  
    // Fetch water level data from USGS API
    $.getJSON(usgsAPI1.replace('03294000', usgsSite1), function(data) {
      var waterDischargeSellersburg = data.value.timeSeries[0].values[0].value[0].value;
      var pastWaterLevel = data.value.timeSeries[1].values[0].value[1].value;
      var waterLevelSellersburg = data.value.timeSeries[1].values[0].value[0].value;
      var lastRecordedTime = data.value.timeSeries[0].values[0].value[0].dateTime;
      
      // Calculate rate of change in water level
      var pastLevelSellersburg = data.value.timeSeries[0].values[0].value[3].dateTime;
      var currentLevelSellersburg = data.value.timeSeries[0].values[0].value[4].dateTime;
      var timeElapsed = (new Date(currentLevelSellersburg) - new Date(pastLevelSellersburg)) / 3600000;
      var waterLevelRateOfChange = (waterLevelSellersburg - pastWaterLevel) / timeElapsed;
      
    // Assigning values to HTML id's
      $('#water-discharge').text(waterDischargeSellersburg + ' ft3/s');
      $('#water-level').text(waterLevelSellersburg + ' ft');
      $('#last-recorded-time').text(lastRecordedTime); 
      $('#change-rate').text(waterLevelRateOfChange.toFixed(2) + ' ft/hr');
      //$('#change-rate').text(pastWaterLevel);
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
  var HI = Math.round((data.main.feels_like - 273.15) * 9/5 + 32);
  
  // Display the weather data on the page
  $('#weather').text(weather);
  $('#temp').text(temp + ' °F');
  $('#feels_like').text(HI + ' °F')
});
  });