// what info are you obtaining from the last.fm api?
var method = 'artist.getevents';
// who is your band?
var artist = 'Wyland';
// your unique API key
var api_key = 'eff0d72d41e48eca1eef0a18e14eae7f';
// concatenate variables into one URL
var last_fm_url = 'http://ws.audioscrobbler.com/2.0/?method='+method+'&artist='+artist+'&api_key='+api_key+'&format=json';

// getJSON: http://api.jquery.com/jQuery.getJSON
// JSON intro: http://bit.ly/MGy1mk
// JSON viewer: http://jsontree.com

// eventData will eventually store my HTML content
var eventData = '';
// if more than 7 artists are playing a festival, truncate list at 7
var maxArtists = 7;

function listEvents(element) {
	$.getJSON(last_fm_url, function(jsondata) {
		// console.log(jsondata);
		if (jsondata.events.total == 0) {
			eventData = '<div class="container_12 clearfix"><div class="grid_12">Artist is not on tour at this time.</div></div>';	
		} else {
			$.each(jsondata.events.event, function(i, tourEvent) {
				var eventStartDate = new Date(tourEvent.startDate);
				// http://api.jqueryui.com/datepicker/#utility-formatDate
				var eventMonth = $.datepicker.formatDate('M', eventStartDate);
				var eventDate = $.datepicker.formatDate('dd', eventStartDate);
				var eventDay = $.datepicker.formatDate('D', eventStartDate);
				if (tourEvent.website) {
					// if the event has its own website, use that
					var eventURL = tourEvent.website;	
				} else {
					// otherwise, use the last fm url
					var eventURL = tourEvent.url;	
				}
				var eventTitle = tourEvent.title;
				var eventArtist = tourEvent.artists.artist;
				if (eventArtist instanceof Array && eventArtist.length > maxArtists) {
					// if our list of artists is too long, shorten it.
					eventArtist = eventArtist.slice(0, maxArtists);
					eventArtist += ',etc.';	
				}
				if (tourEvent.venue.website) {
					var eventVenueURL = tourEvent.venue.website;
				} else {
					var eventVenueURL = tourEvent.venue.url;	
				}
				var eventVenue = tourEvent.venue.name;
				var eventLocation = tourEvent.venue.location.city +','+ tourEvent.venue.location.country;
				// add our content to the eventData variable
				eventData += '<div class="container_12 clearfix tourEntry">';
				eventData += '<div class="grid_1 tourDate"><span class="eventMonth">'+eventMonth+'</span><span class="eventDate">'+eventDate+'</span><span class="eventDay">'+eventDay+'</span></div>';
				eventData += '<div class="tourInfo">';
				eventData += '<div class="grid_9"><span class="eventTitle"><a href="'+eventURL+'" target="_blank">'+eventTitle+'</a></span><span class="eventArtist">'+eventArtist+'</span></div>';
				eventData += '<div class="grid_2"><span class="eventVenue"><a href="'+eventVenueURL+'" target="_blank">'+eventVenue+'</a></span><span class="eventLocation">'+eventLocation+'</span></div>';
				eventData += '</div>';
				eventData += '</div>';
			});
		}
		$(element).append(eventData);
	});
};

// run listEvents function
listEvents('#tour-wrapper');








