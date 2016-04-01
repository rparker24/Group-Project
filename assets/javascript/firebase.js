var database = new Firebase("https://recent-places.firebaseio.com/");

var dbLimit = database.endAt().limit(10);
dbLimit.on('child_added', function(childSnapshot, prevChildKey){

	var placeSearched = childSnapshot.val().placeName;
	var timeSearched = childSnapshot.val().time;

	$('#recentPlaces > tbody').append("<tr><td>" + placeSearched + "</td><td>" + timeSearched + "</td></tr>");

}, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
});

$('#submit').on('click', function() {
	var place = $('#address').val().trim();
	var timeSearched = moment(new Date()).format("MMMM Do YYYY hh:mm A");

	var newSearch = {
		placeName: place,
		time: timeSearched
	};

	database.push(newSearch);

	$('#recentPlaces > tbody > tr:first-child').remove();

	return false;
});