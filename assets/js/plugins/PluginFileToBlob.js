function PluginFileToBlob() {
	this.cache = "";
}
PluginFileToBlob.prototype.getFileToBlob = function(url, cb) {
	var self = this;
	var deferred = $.Deferred();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
        cb(xhr.response);
		deferred.resolve(image);
    });
    xhr.send();


	return deferred.promise();
};










var getFileBlob = function (url, cb) {
};

var blobToFile = function (blob, name) {
    blob.lastModifiedDate = new Date();
    blob.name = name;
    return blob;
};

var getFileObject = function(filePathOrUrl, cb) {
       getFileBlob(filePathOrUrl, function (blob) {
          cb(blobToFile(blob, 'test.jpg'));
       });
};

getFileObject('img/test.jpg', function (fileObject) {
     console.log(fileObject);
}); 
