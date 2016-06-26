/**
 * Copyright 2016 Felippe Gallo All Rights Reserved.
 */

var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true
});

'use strict';
window.onload = function() {
	window.App = new App();
	window.Feed = new Feed();
	window.Page = new Page();
	window.Team = new Team();
	window.User = new User();
}

