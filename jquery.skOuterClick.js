/*

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
		
	Licensed under the MIT license.

*/

(function($){

	$.fn.skOuterClick = function(method) {
		var methods = {
			init : function (handler) {
				var inners = new Array();
				if (arguments.length > 1) for (i = 1; i < arguments.length; i++) {
					inners.push(arguments[i]);
				}
				return this.each(function() {
					var self = $(this);
					var _this = this;
					var isInner = false;
					// Bind click event to suppress
					function onInnerClick(e){
						isInner = true;
					};
					self.click(onInnerClick);
					for (var i = 0; i < inners.length; i++) {
						inners[i].click(onInnerClick);
					}
					// Bind click elsewhere
					$(document).click(function(e){
						if (!isInner) handler.call(_this, e);
						else isInner = false;
					});
				});
			}
		};
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'function') {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method "' + method + '" does not exist in skOuterClick plugin!');
		}
	};
})(jQuery);
