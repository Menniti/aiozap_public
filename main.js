/*
 * Copyright 2016 Felippe Gallo All Rights Reserved.
 */
'use strict';

var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true
});

//ONLOAD
window.onload = function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	if(!window.cordova){
		setTimeout(function(){
			onDeviceReady();
		},2500);
	}
}

//DEVICE READY
function onDeviceReady(){
	window.App = new App();
	window.Feed = new Feed();
	window.Page = new Page();
	window.Team = new Team();
	window.User = new User();
	window.Admin = new Admin();
	window.Help = new Help();
	window.Job = new Job();
	window.JobPic = new JobPic();
	window.Report = new Report();
	window.PluginCamera = new PluginCamera();
}

