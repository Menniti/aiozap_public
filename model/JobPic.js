//JobPic
function JobPic() {
	this.id;
	this.file;
	this.title;
	this.user;
	this.active;
}

//CADASTRO
JobPic.prototype.create = function() {
	var id = this.id;
	var title = this.title;
	var user = this.user || '';
	var active = this.active || 0;
	var inputData = {
		title: title,
		user: user,
		active: 1,
		created: new Date().getTime(),
	};
	var newKey = firebase.database().ref().child('jobpics').push().key;
	return firebase.database().ref('jobpics/'+newKey).set(inputData).then(function(result) {
		return newKey;
	},function(error) {
		return null;
	});	
};

//LEITURA
JobPic.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('jobpics/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('jobpics/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
JobPic.prototype.update = function() {
	var id = this.id;
	var title = this.title;
	var user = this.user;
	var active = this.active;
	var inputData = {
		title: title,
		user: user,
		active: active,
	};
	return firebase.database().ref('jobpics/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//UPLOAD FILE
JobPic.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('jobpics/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
JobPic.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('jobpics/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
JobPic.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('jobpics/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//DELETE
JobPic.prototype.delete = function(id) {
	return firebase.database().ref('jobpics/'+id).remove();
};

