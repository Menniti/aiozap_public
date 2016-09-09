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
	document.addEventListener("backbutton", function(){
		myApp.closeModal();
		mainView.router.back();
	}, false);

}

//DEVICE READY
function onDeviceReady(){
	window.App = new App();
	window.User = new User();
	window.Admin = new Admin();
	window.JobPic = new JobPic();
	window.Like = new Like();
	window.PluginCamera = new PluginCamera();
}

