// one page nav: http://bit.ly/yARNAq, http://bit.ly/QOgUkq

// gather the main nav buttons (but only the ones that connect to #ids, not the store link) as an array
var sections = $('nav ul li a[href^="#"]');

// the checkSectionSelected function checks each section of the document to see if it's currently scrolled near the top of the browser. if it is, add the .current class to the corresponding button
function checkSectionSelected(scrolledTo) {
	// what part of the page are we using to test each section as we scroll? I'm testing the middle of the page rather than the top
	var threshold = $(window).height()/2;
	// a for loop is a counting script that contains three parts: 1) what number should we start counting with? 2) how high should we count? 3) how do we count? (usually by ones.) length means how many objects are in an array.
	for (var i=0; i<sections.length; i++) {
		// find the section of the page that corresponds to each nav button
		var pageSection = $(sections[i]);
		// find the distance of this section from the top of the browser using our getDistanceTop function
		var topDistance = getDistanceTop(pageSection);
		// is this the section that's closest to threshold? (the middle of the page, as defined earlier)
		if (scrolledTo > topDistance - threshold && scrolledTo < topDistance + threshold) {
			// check ALL buttons and remove the .current class from whichever button it was on
			sections.removeClass('current');
			// add the .current class to just this button
			pageSection.addClass('current');	
		}
	}
}
// getDistance top is called upon by checkSectionSelected to test the distance of each section from the top of the browser
function getDistanceTop(whichSection) {
	// which section is this? find it from the navigations href (such as <a href="#tour">)
	var whichId = whichSection.attr('href');
	// get the distance of this section from the top, and send the value back to the checkSectionSelected function
	return $(whichId).offset().top;
}

function scrollToDiv(newSection) {
	// find the distance of this section from the top of the browser
	var offsetTop = newSection.offset().top;
	// check how wide the page is. are we in desktop or mobile view?
	var pageWidth = $(window).width();
	// if we are in desktop view, animate down to the next section. 800 represents 800 milliseconds
	if (pageWidth >= 760) {
		$('body,html').animate({scrollTop: offsetTop}, 800);	
	} else {
		// if we are in mobile view, animate instantly (zero milliseconds)
		$('body,html').animate({scrollTop: offsetTop}, 0);	
	}
}

// document.ready waits for just the text (HTML and CSS) to load before executing
$(document).ready(function() {
	// make sure each section of my site is at least as tall as the browser
	//var pageHeight = $(window).height();
	//$('#content-sections section').css('min-height', pageHeight + 'px');
	// when the user scrolls, check which button should be highlighted
	$(window).scroll(function() {
		// scrollTop is a measurement of how far the user has scrolled down the page
		checkSectionSelected($(window).scrollTop());	
	});
	$(sections).click(function() {
		// read the href from the nav link (a href="#tour")
		var navLink = $(this).attr('href');
		// then find the corresponding page section to scroll to (section id="#tour")
		var newSection = $(navLink);
		// run scrollToDiv function to animate page to new section
		scrollToDiv(newSection);
		var pageWidth = $(window).width();
		if (pageWidth < 760) {
			// if we're in mobile view, collapse the menu when a nav button is clicked
			$('#main-nav').slideToggle();	
		}
		// return false prevents the HTML link from executing
		return false;
	});
	// activate mobile menu button
	$('#mobile-menu-btn').click(function() {
		// toggle means switch between on and off. if the menu is showing, hide it. if the menu is hiding, show it.
		$('#main-nav').slideToggle();
		return false;
	});
	// if browser is resized out of mobile view (becomes greater than 760px) and the menu is hidden, reveal it
	$(window).resize(function() {
		if ($(window).width() >= 760 && $('#main-nav').is(':hidden')) {
			// remove the inline style added by the JavaScript that's hiding our menu
			$('#main-nav').removeAttr('style');
		}
	});
});






