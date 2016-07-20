//User
function User() {
	this.id;
	this.email;
	this.file;
	this.team;
	this.is_editor;
	this.name;
	this.phone;
	this.type;
	this.password;
}

//LOGIN
User.prototype.login = function() {
	var deferred = $.Deferred();
	var email = this.email;
	var password = this.password;
	if(!email || !password){
		deferred.resolve(false);
	}else{
		firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
			deferred.resolve(true);
		}, function(error) {
			deferred.resolve(error);
		});
	}
	return deferred.promise();
};


//LOGOUT
User.prototype.logout = function() {
	var deferred = $.Deferred();
	firebase.auth().signOut().then(function() {
		deferred.resolve(true);
	}, function(error) {
		deferred.resolve(error);
	});
	return deferred.promise();
};

//CADASTRO
User.prototype.create = function() {
	var deferred = $.Deferred();
	var email = this.email;
	var password = this.password;
	var type = this.type || "";
	var team = this.team || "";
	firebase.auth().createUserWithEmailAndPassword(email,password).then(function() {
		var inputData = {
			email: email,
			type: type,
			team: team,
			created: new Date().getTime(),
			is_editor: 0,
			team: 0
		};
		var newKey = firebase.auth().currentUser.uid;
		firebase.database().ref('users/'+newKey).set(inputData);
		deferred.resolve(true);
	}, function(error) {
		deferred.resolve(error);
	});
	return deferred.promise();
};

//LEITURA
User.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('users/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('users/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
User.prototype.update = function() {
	var id = this.id;
	var name = this.name;
	var is_editor = this.is_editor;
	var phone = this.phone;
	var team = this.team;
	var type = this.type;
	var inputData = {
		phone: phone,
		name: name,
		is_editor: is_editor,
		team: team,
		type: type
	};
	return firebase.database().ref('users/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//PASSWORD RESET
User.prototype.passwordReset = function() {
	var email = this.email;
	return firebase.auth().sendPasswordResetEmail(email).then(function() {
		return true;
	}, function(error) {
		return false;
	});
};


//UPLOAD FILE
User.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('users/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
User.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('users/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
User.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('users/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE
User.prototype.delete = function(id) {
	return firebase.database().ref('users/'+id).remove();
};

