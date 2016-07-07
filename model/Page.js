//Page
function Page() {
	this.id;
	this.file;
	this.title;
	this.description;
}

//CADASTRO
Page.prototype.create = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description;
	var inputData = {
		title: title,
		created: new Date().getTime(),
		description: description
	};
	return firebase.database().ref('pages/').push(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//LEITURA
Page.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('pages/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('pages/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
Page.prototype.update = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description;
	var inputData = {
		title: title,
		description: description
	};
	return firebase.database().ref('pages/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//UPLOAD FILE
Page.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('pages/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
Page.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('pages/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
Page.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('pages/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//DELETE
Page.prototype.delete = function(id) {
	return firebase.database().ref('pages/'+id).remove();
};

