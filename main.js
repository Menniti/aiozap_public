/**
 * Copyright 2016 Felippe Gallo All Rights Reserved.
 */

//ONDEVICEREADY
/*document.addEventListener("deviceready", onDeviceReady, false);
function onLoad(){
	if(!window.cordova){
		setTimeout(function(){
			onDeviceReady();
		},1000);
	}
}
function onDeviceReady(){
	function camera(type){
		if(type=="album"){
			navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
		}else{
			navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.CAMERA});
		}
		function success(image) {
			console.log(image);
			return(JSON.stringify(image));
		}
		function error(message) {
			console.log('Failed because: ' + message);
		}
	}
	console.log("ok");
}*/


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
}
