jquery.skOuterClick
===================

About: [【jQuery】要素の”外側”のクリックイベントを捕捉「skOuterClick」](http://sukobuto.com/archives/261)

skOuterClick - A simple event-binder-plugin to handle click events of outside elements.
Copyright (c) 2014 SUKOBUTO All rights reserved.

$(_innerElement_).skOuterClick( event-handler, additional-inner-elements(jQueryObject)... )

=== example 'alert' ===

$('#targetBox').skOuterClick(function() {
	alert(' Outer area clicked! ');
});

=== example 'dialog' ===

var showDialog = $('#showDialog');

showDialog.click(function(e) {
	e.stopPropagation();
	$('#dialog').show();
});

$('#dialog').skOuterClick(function() {
	$(this).hide();
}, showDialog);		// second argument is the additional "inner" element.

=== example 'focus/blur for div' ===

$('div.focusable').click(function() {
	$(this).addClass('hasFocus');
}).skOuterClick(function() {
	$(this).removeClass('hasFocus');
});

========================

Changelog:
	
	Version 1.4 - Tue May 13 2014
		- Fixed "inner" iterate bug.

	Version 1.3 - Mon March 26 2012
		- Fixed 'this' variable of event handler function.
		  The HTMLBodyElement had been supplied,
		  changed to the element of called jQuery Object.

	Version 1.2 - Tue March 20 2012
		- Enable the additional "inner" elements.

	Version 1.1 - Sat March 10 2012
		- Fixed missing parameters when using another modules.
		  ex) Google Maps API v3

	Version 1.0 - Mon February 27 2012
		- Initial release
