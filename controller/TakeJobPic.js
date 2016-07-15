App.prototype.TakeJobPicScreen = function() {
	var self = this;
};

App.prototype.TakeJobPicAction = function() {
	var self = this;
	var JobsActionSheet = window.Job.read();
	JobsActionSheet.then(function(result) {
		var buttons = [];
		for(var i in result){
			var button = {};
			button.text = result[i].title;
			button.i = i;
			button.onClick = self.TakeJobPicClosure;
			buttons.push(button);
			console.log(buttons);
		}
		var button = {};
			button.text = "Cancelar";
			button.color = "red"; 
			buttons.push(button);
		myApp.actions(this,buttons);
	});		
	
};

App.prototype.TakeJobPicClosure = function() {
	var self = window.App;
	//window.JobPic.title = result.title+" "+moment(new Date().getTime()).format('DD/MM/YY - HH:mm');
	window.JobPic.title = this.text+" - "+window.App.auth.currentUser.email+" - "+moment(new Date().getTime()).format('DD/MM/YY - HH:mm');
	window.JobPic.user = window.App.auth.currentUser.uid;
	window.JobPic.job = this.i;
	window.JobPic.active = 1;
	console.log(window.JobPic);
	//TAKE PICTURE
	var JobPicture = window.PluginCamera.takePicture();
	JobPicture.then(function(resultPic) {
		var pic = resultPic;
		//CREATE ENTRY ON DB
		var JobPics = window.JobPic.create();
		JobPics.then(function(resultCreate) {
			if(resultCreate){
				console.log(pic);
				var file = pic;
				window.JobPic.id = resultCreate;
				window.JobPic.file = file;
				//UPLOAD PICTURE
				var JobPics = window.JobPic.uploadFile();
				$.when(JobPics).then(function(result) {
					var uploadTask = result;
					uploadTask.on("state_changed",
						function(snapshot) {
							var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							myApp.addNotification({hold:1000,title: 'Upload:',message:progress+'%'});
						}, function(error) {
							console.log(error);
						}, function() {
							var downloadURL = uploadTask.snapshot.downloadURL;
							window.JobPic.file = downloadURL;
							//UPDATE CREATED ENTRY ON DB
							var JobPics = window.JobPic.updateFile();
							JobPics.then(function(result) {
								if(result==true){
									myApp.alert(self.msgSuccessDefault,self.msgDefaultTitle);
								}else{
									myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
								}
							});		

						}
					);
				});


			}else{
				myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
			}
		});		
	});
};

