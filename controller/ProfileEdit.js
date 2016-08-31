App.prototype.ProfileEditScreen = function() {
	var div = $("#ProfileEditScreen");
	var self = this;

	var Users = window.User.read(window.App.auth.currentUser.uid);
	Users.done(function(result) {
		$.get("templates/ProfileEdit.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);

			var ProfileEditForm = $("#profile-form");
			ProfileEditForm.unbind('submit').on('submit', self.ProfileEditAction.bind(self));

			$("#BtnProfileEditPic").unbind('click').on('click', self.ProfileEditPicAction.bind(self));


		});
	});		

};

App.prototype.ProfileEditAction = function(e) {
	e.preventDefault();
	var self = this;
	window.User.id = window.App.auth.currentUser.uid;
	window.User.name = $("#input_name").val();
	window.User.phone = $("#input_phone").val();
	window.User.skills = $("#input_skills").val();
	window.User.age = $("#input_age").val();
	window.User.description = $("#input_description").val();
	window.User.carreer = $("#input_carreer").val();
	var ProfileEdit = window.User.update();
	ProfileEdit.then(function(result) {
		if(result!=false){
			myApp.alert(self.msgSuccessDefault,self.msgDefaultTitle);
		}else{
			myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
		}
	});		
};


App.prototype.ProfileEditPicAction = function() {
	var self = this;
	//TAKE PICTURE
	var ProfileEditPicture = window.PluginCamera.takePicture();
	ProfileEditPicture.then(function(resultPic) {
		window.User.id = window.App.auth.currentUser.uid;
		window.User.file = resultPic;
		//UPLOAD PICTURE
		var UserPic = window.User.uploadFile();
		$.when(UserPic).then(function(result) {
			var uploadTask = result;
			uploadTask.on("state_changed",
				function(snapshot) {
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					myApp.addNotification({hold:1000,title: 'Upload:',message:progress+'%'});
				}, function(error) {
					console.log(error);
				}, function() {
					var downloadURL = uploadTask.snapshot.downloadURL;
					window.User.file = downloadURL;
					//UPDATE CREATED ENTRY ON DB
					var UserUpdatePic = window.User.updateFile();
					UserUpdatePic.then(function(result) {
						if(result!=false){
							myApp.alert(self.msgSuccessDefault,self.msgDefaultTitle);
							self.ProfileEditScreen();
						}else{
							myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
						}
					});		

				}
			);
		});

	});
};

