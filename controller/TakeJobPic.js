App.prototype.TakeJobPicScreen = function() {
	var self = this;
};

App.prototype.TakeJobPicAction = function() {
	var self = this;

	var JobsActionSheet = window.Job.read();
	JobsActionSheet.then(function(result) {
		console.log(result);
		var buttons = [];
		var counter=0;
		for(var i in result){
			var button = {};
				button.text = result[i].title;
				button.onClick = function(){camera(null,Object.keys(result)[counter])}; 
				buttons.push(button);
			counter++;
		}
		var button = {};
			button.text = "Cancelar";
			button.color = "red"; 
			buttons.push(button);
		console.log(buttons);
		myApp.actions(this,buttons);
	});		
	
};