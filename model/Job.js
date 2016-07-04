//Job
function Job() {
	this.id;
	this.file;
	this.title;
	this.start_date;
	this.end_date;
	this.description;
}

//CADASTRO
Job.prototype.create = function() {
	var id = this.id;
	var title = this.title;
	var start_date = this.start_date;
	var end_date = this.end_date;
	var description = this.description;
	var inputData = {
		title: title,
		created: new Date().getTime(),
		description: description,
		start_date: start_date,
		end_date: end_date
	};
	return firebase.database().ref('jobs/').push(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//LEITURA
Job.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('jobs/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('jobs/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
Job.prototype.update = function() {
	var id = this.id;
	var title = this.title;
	var start_date = this.start_date;
	var end_date = this.end_date;
	var description = this.description;
	var inputData = {
		title: title,
		description: description,
		start_date: start_date,
		end_date: end_date
	};
	return firebase.database().ref('jobs/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//UPLOAD FILE
Job.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('jobs/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
Job.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('jobs/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
Job.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('jobs/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//DELETE
Job.prototype.delete = function(id) {
	return firebase.database().ref('jobs/'+id).remove();
};

