//User
function User() {
	this.id;
	this.email;
	this.file;
	this.team;
	this.is_editor;
	this.name;
	this.phone;
	this.password;
}

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
