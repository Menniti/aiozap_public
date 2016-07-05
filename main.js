/*
 * Copyright 2016 Felippe Gallo All Rights Reserved.
 */
'use strict';

var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true
});

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
		},2500);
	}
}

function onDeviceReady(){
	window.PluginCamera = new PluginCamera();
	console.log("ok");
	//console.log(device);
	console.log(navigator.camera);
}

