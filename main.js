/*
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
	window.Admin = new Admin();
	window.Help = new Help();
	window.Job = new Job();
	window.JobPic = new JobPic();

	document.addEventListener("deviceready", onDeviceReady, false);
	if(!window.cordova){
		setTimeout(function(){
			onDeviceReady();
		},1000);
	}
	function onDeviceReady(){
		setTimeout(function(){
			console.log("ok");
			window.PluginCamera = new PluginCamera();
			console.log(navigator.camera);
		},5000);
	}
}
