//Report
function Report() {
	this.id;
	this.file;
	this.title;
	this.active;
	this.job;
	this.user;
	this.points;
	this.description;
}

//CADASTRO
Report.prototype.create = function() {
	var id = this.id;
	var title = this.title;
	var description = this.description || "";
	var points = this.points || 0;
	var active = this.active || 0;
	var user = this.user || "";
	var job = this.job || "";
	var inputData = {
		title: title,
		points: points,
		user: user,
		job: job,
		active: active,
		created: new Date().getTime(),
		description: description
	};
	var newKey = firebase.database().ref().child('reports').push().key;
	return firebase.database().ref('reports/'+newKey).set(inputData).then(function(result) {
		return newKey;
	},function(error) {
		return null;
	});	
};

//LEITURA
Report.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('reports/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('reports/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
Report.prototype.update = function() {
	var id = this.id;
	var title = this.title;
	var points = this.points;
	var active = this.active;
	var user = this.user;
	var job = this.job;
	var description = this.description.replace(/&nbsp;/gi,' ');
	var inputData = {
		title: title,
		active: active,
		points: points,
		user: user,
		job: job,
		description: description
	};
	return firebase.database().ref('reports/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//UPLOAD FILE
Report.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('reports/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
Report.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('reports/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
Report.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('reports/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};


//DELETE
Report.prototype.delete = function(id) {
	return firebase.database().ref('reports/'+id).remove();
};

