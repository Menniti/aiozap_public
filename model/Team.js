//TEAM
function Team() {
	this.id;
	this.file;
	this.title;
	this.description;
}

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
