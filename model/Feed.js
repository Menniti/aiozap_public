//Feed
function Feed() {
	this.id;
	this.file;
	this.title;
	this.description;
}

//CADASTRO
Feed.prototype.create = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description.replace(/&nbsp;/gi,' ');
	var inputData = {
		title: title,
		created: new Date().getTime(),
		description: description
	};
	var newKey = firebase.database().ref().child('feeds').push().key;
	return firebase.database().ref('feeds/'+newKey).set(inputData).then(function(result) {
		return newKey;
	},function(error) {
		return null;
	});	
};

//LEITURA
Feed.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('feeds/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('feeds/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
Feed.prototype.update = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description.replace(/&nbsp;/gi,' ');
	var inputData = {
		title: title,
		description: description
	};
	return firebase.database().ref('feeds/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//UPLOAD FILE
Feed.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('feeds/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
Feed.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('feeds/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
Feed.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('feeds/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//DELETE
Feed.prototype.delete = function(id) {
	return firebase.database().ref('feeds/'+id).remove();
};

