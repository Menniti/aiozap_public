App.prototype.ProfileScreen = function() {
	var div = $("#ProfileScreen");
	var self = this;

	var Users = window.User.read(window.App.auth.currentUser.uid);
	Users.done(function(result) {
		$.get("templates/Profile.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);

			var ProfileForm = $("#profile-form");
			ProfileForm.unbind('submit').on('submit', self.ProfileAction.bind(self));

			$("#BtnProfilePic").unbind('click').on('click', self.ProfilePicAction.bind(self));

			var Teams = window.Team.read();
			Teams.done(function(resultChild) {
				var div = $("#input_team");
				$.get("templates/ProfileTeamSelect.html", function(temp) {
					var compiledTemplate = Template7.compile(temp);
					var html = compiledTemplate(resultChild);
					div.html(html);
					div.val(result.team);
				});
			});		


		});
	});		

};

App.prototype.ProfileAction = function(e) {
	e.preventDefault();
	var self = this;
	window.User.id = window.App.auth.currentUser.uid;
	window.User.name = $("#input_name").val();
	window.User.phone = $("#input_phone").val();
	window.User.is_editor = $("#input_is_editor").val();
	window.User.team = $("#input_team").val();
	window.User.type = $("#input_type").val();
	var Profile = window.User.update();
	Profile.then(function(result) {
		if(result!=false){
			myApp.alert(self.msgSuccessDefault,self.msgDefaultTitle);
		}else{
			myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
		}
	});		
};


App.prototype.ProfilePicAction = function() {
	var self = this;
	//TAKE PICTURE
	var ProfilePicture = window.PluginCamera.takePicture();
	ProfilePicture.then(function(resultPic) {
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
							self.ProfileScreen();
						}else{
							myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
						}
					});		

				}
			);
		});

	});
};

