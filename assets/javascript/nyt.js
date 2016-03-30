$('#submit').on('click', function() {    
	var city = $('#address').val();
	var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations%3A%28%22" + city + "%22%29&begin_date=19000101&sort=oldest&fl=headline%2Csnippet%2Cpub_date%2Ckeywords&api-key=9d4a8986921972b65754ea0809d47c84%3A12%3A74623931";
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
            	var results = response.response.docs;
            	//clear out previous results from table
            	$('#articleTable > tbody').html("");
            	for (var i = 0; i < results.length; i++) {
	            	var headline = results[i].headline.main;
	            	var snippet = results[i].snippet;
	            	var date = results[i].pub_date;
                    var shorterDate = date.substring(0,10);
                    var fancyDate = moment(shorterDate).format("MMMM Do YYYY");

	            	$("#articleTable > tbody").append("<tr><td>" + headline + "</td><td>" + snippet + "</td><td>" + fancyDate + "</td></tr>");
            	}
			})
});