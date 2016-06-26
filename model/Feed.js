//Feed
function Feed() {
	this.id;
	this.file;
	this.title;
	this.description;
}

//LEITURA
Feed.prototype.read = function(id) {
	var deferred = $.Deferred();
	if(id!=undefined){
		firebase.database().ref('feeds/'+id).once('value', function(data) {
			deferred.resolve(data.val());
		});
	}else{
		firebase.database().ref('feeds/').once('value', function(data) {
			arr = [];
			data.forEach(function(childSnapshot) {
				var el = childSnapshot.val();
				el.date = moment(el.created).format('DD/MM/YYYY - H:mm');
				arr.push(el);
			});
			arr.reverse();
			deferred.resolve(arr);
		});
	}
	return deferred.promise();
};
