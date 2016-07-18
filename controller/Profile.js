App.prototype.ProfileScreen = function() {
	var div = $("#ProfileScreen");
	var self = this;

	var Users = window.User.read(window.App.auth.currentUser.uid);
	Users.then(function(result) {
		console.log(result);
		$.get("templates/Profile.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);

			var ProfileForm = $("#profile-form");
			ProfileForm.on('submit', self.ProfileAction.bind(self));


			var Teams = window.Team.read();
			Teams.then(function(resultChild) {
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
		if(result==true){
			myApp.alert(self.msgSuccessDefault,self.msgDefaultTitle);
		}else{
			myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
		}
	});		
};

