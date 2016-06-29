//TEAM
function Team() {
	this.id;
	this.file;
	this.title;
	this.description;
}

//CADASTRO
Team.prototype.create = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description;
	var inputData = {
		title: title,
		created: new Date().getTime(),
		description: description
	};
	return firebase.database().ref('teams/').push(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//LEITURA
Team.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('teams/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('teams/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
Team.prototype.update = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description;
	var inputData = {
		title: title,
		description: description
	};
	return firebase.database().ref('teams/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//UPLOAD FILE
Team.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('teams/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
Team.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('teams/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
Team.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('teams/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//DELETE
Team.prototype.delete = function(id) {
	return firebase.database().ref('teams/'+id).remove();
};

