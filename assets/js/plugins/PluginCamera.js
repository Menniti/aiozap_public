function PluginCamera() {
	this.cache = "";
}
PluginCamera.prototype.takePicture = function(type,id) {
	var self = this;
	console.log(id);
	if(type=="album"){
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
	}else{
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.CAMERA});
	}
	function success(image) {
		console.log(image);
		self.cache = image;
		return(JSON.stringify(image));
	}
	function error(message) {
		console.log('Failed because: ' + message);
	}
};
