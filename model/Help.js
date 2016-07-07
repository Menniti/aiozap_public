//Help
function Help() {
	this.id;
	this.file;
	this.title;
	this.description;
}

//CADASTRO
Help.prototype.create = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description;
	var inputData = {
		title: title,
		created: new Date().getTime(),
		description: description
	};
	var newKey = firebase.database().ref().child('helps').push().key;
	return firebase.database().ref('helps/'+newKey).set(inputData).then(function(result) {
		return newKey;
	},function(error) {
		return null;
	});	
};

//LEITURA
Help.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('helps/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('helps/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
Help.prototype.update = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description;
	var inputData = {
		title: title,
		description: description
	};
	return firebase.database().ref('helps/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//UPLOAD FILE
Help.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('helps/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
Help.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('helps/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
Help.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('helps/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//DELETE
Help.prototype.delete = function(id) {
	return firebase.database().ref('helps/'+id).remove();
};

