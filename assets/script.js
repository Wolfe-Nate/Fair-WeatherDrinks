var requestUrl = "https://www.metaweather.com/api/location/search/?query=london"
$.ajax({
    url: requestUrl,
    method: 'GET',
}).then(function (response) {
    console.log(response);
});
