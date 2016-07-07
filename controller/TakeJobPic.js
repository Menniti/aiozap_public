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
					JobPicture.then(function(resultPic) {
						//console.log(resultPic);

						window.JobPic.title = result[i].title+" "+moment(new Date().getTime()).format('DD/MM/YY - HH:mm');
						window.JobPic.user = window.App.auth.currentUser.uid;
						window.JobPic.job = result[i].id;
						window.JobPic.active = 1;

						var JobPics = window.JobPic.create();
						JobPics.then(function(resultCreate) {
							if(result==true){
								myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
							}else{
								myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
							}
						});		




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

