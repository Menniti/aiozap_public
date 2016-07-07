App.prototype.TakeJobPicScreen = function() {
	var self = this;
};

App.prototype.TakeJobPicAction = function() {
	var self = this;
	var JobsActionSheet = window.Job.read();
	JobsActionSheet.then(function(result) {
		var buttons = [];
		var counter=0;
		for(var i in result){
			var button = {};
				button.text = result[i].title;
				button.onClick = function(){
					var JobId = Object.keys(result)[counter];
					var JobPicture = window.PluginCamera.takePicture();
					JobPicture.then(function(result) {
						console.log(result);
					});
				};
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

