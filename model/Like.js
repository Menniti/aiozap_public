//Like
function Like() {
	this.id;
	this.jobpic;
	this.user;
}

//CADASTRO
Like.prototype.create = function() {
	var id = this.id;
	var user = this.user || "";
	var jobpic = this.jobpic || "";
	var inputData = {
		jobpic: jobpic,
		user: user,
		created: new Date().getTime(),
	};
	var newKey = firebase.database().ref().child('likes').push().key;
	return firebase.database().ref('likes/'+newKey).set(inputData).then(function(result) {
		return newKey;
	},function(error) {
		return null;
	});	
};

//LEITURA
Like.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('likes/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('likes/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
Like.prototype.update = function() {
	var id = this.id;
	var jobpic = this.jobpic;
	var user = this.user;
	var inputData = {
		jobpic: jobpic,
		user: user
	};
	return firebase.database().ref('likes/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE
Like.prototype.delete = function(id) {
	return firebase.database().ref('likes/'+id).remove();
};

