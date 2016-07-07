//Admin
function Admin() {
	this.id;
	this.email;
	this.file;
	this.name;
	this.phone;
	this.password;
}

//LOGIN
Admin.prototype.login = function() {
	var deferred = $.Deferred();
	var email = this.email;
	var password = this.password;
	if(!email || !password){
		deferred.reject(false);
	}else{
		firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
			deferred.resolve(true);
		}, function(error) {
			deferred.reject(error);
		});
	}
	return deferred.promise();
};


//LOGOUT
Admin.prototype.logout = function() {
	var deferred = $.Deferred();
	firebase.auth().signOut().then(function() {
		deferred.resolve(true);
	}, function(error) {
		deferred.reject(error);
	});
	return deferred.promise();
};

//CADASTRO
Admin.prototype.create = function() {
	var deferred = $.Deferred();
	var email = this.email;
	var password = this.password;
	firebase.auth().createUserWithEmailAndPassword(email,password).then(function() {
		var inputData = {
			email: email,
			created: new Date().getTime()
		};
		var newKey = firebase.auth().currentUser.uid;
		firebase.database().ref('admins/'+newKey).set(inputData);
		deferred.resolve(true);
	}, function(error) {
		deferred.reject(error);
	});
	return deferred.promise();
};

//LEITURA
Admin.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('admins/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('admins/').once('value', function(data) {
			deferred.resolve(data.val());
		});
	}
	return deferred.promise();
};

//UPDATE
Admin.prototype.update = function() {
	var id = this.id;
	var name = this.name;
	var phone = this.phone;
	var inputData = {
		phone: phone,
		name: name
	};
	return firebase.database().ref('admins/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//UPLOAD FILE
Admin.prototype.uploadFile = function() {
	var id = this.id;
	var file = this.file;
	return uploadTask = firebase.storage().ref('admins/'+id+'/'+Date.now()+"_"+file.name).put(file, {'contentType': file.type});
};

//UPDATE FILE
Admin.prototype.updateFile = function() {
	var id = this.id;
	var file = this.file;
	var inputData = {
		file: file,
	};
	return firebase.database().ref('admins/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE FILE
Admin.prototype.deleteFile = function() {
	var id = this.id;
	var file = "";
	var inputData = {
		file: file,
	};
	return firebase.database().ref('admins/'+id).update(inputData).then(function(result) {
		return true;
	},function(error) {
		return false;
	});	
};

//DELETE
Admin.prototype.delete = function(id) {
	return firebase.database().ref('admins/'+id).remove();
};

