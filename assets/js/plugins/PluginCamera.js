function PluginCamera() {
	this.cache = "";
}
PluginCamera.prototype.takePicture = function(type) {
	var self = this;
	var deferred = $.Deferred();
	if(type=="album"){
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
		//navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.DATA_URL,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
	}else{
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.CAMERA});
		//navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.DATA_URL,sourceType: Camera.PictureSourceType.CAMERA});
	}
	function success(image) {
		//console.log(image);
		//self.cache = JSON.stringify(image);
		deferred.resolve(JSON.stringify(image));
		//deferred.resolve(image);
	}
	function error(message) {
		console.log('Failed because: ' + message);
		deferred.reject(false);
	}
	return deferred.promise();
};
