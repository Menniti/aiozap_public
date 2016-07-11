function PluginFile() {
	this.cache = "";
}
PluginFile.prototype.resolveFile = function(imgUri) {
	var self = this;
	var deferred = $.Deferred();
	window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
		//console.log("got file: " + fileEntry.fullPath);
		deferred.resolve(fileEntry.fullPath);
	}, function () {
		var newFile = createNewFileEntry(imgUri);
		deferred.resolve(newFile);
	});
	return deferred.promise();
};
