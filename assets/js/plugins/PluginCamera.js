function PluginCamera() {
	this.cache = "";
}
PluginCamera.prototype.takePicture = function(type) {
	var self = this;
	var deferred = $.Deferred();
	if(type=="album"){
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
	}else{
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.CAMERA});
	}
	function success(image) {
		//console.log(image);
		//self.cache = JSON.stringify(image);
		//deferred.resolve(JSON.stringify(image));
		//deferred.resolve(fileObject);

		var getFileBlob = function(url, cb) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.responseType = "blob";
			xhr.addEventListener('load', function() {
				cb(xhr.response);
			});
			xhr.send();
		};

		var blobToFile = function(blob, name) {
			blob.lastModifiedDate = new Date();
			blob.name = name;
			return blob;
		};

		var getFileObject = function(filePathOrUrl, cb) {
			getFileBlob(filePathOrUrl, function(blob) {
				cb(blobToFile(blob, 'test.jpg'));
			});
		};

		getFileObject(image, function(fileObject) {
			deferred.resolve(fileObject);
		});

	}
	function error(message) {
		console.log('Failed because: ' + message);
		deferred.reject(false);
	}
	return deferred.promise();
};




