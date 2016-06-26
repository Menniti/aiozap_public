//Page
function Page() {
	this.id;
	this.file;
	this.title;
	this.description;
}

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
