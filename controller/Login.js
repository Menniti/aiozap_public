App.prototype.LoginScreen = function() {
	var self = this;
	var LoginForm = $("#login-form");
	LoginForm.on('submit', self.LoginAction.bind(self));
};

App.prototype.LoginAction = function(e) {
	e.preventDefault();
	window.User.email = $("#input_email").val();
	window.User.password = $("#input_password").val();
	var Users = window.User.login();
	Users.then(function(result) {
		console.log(result);
		if(result==true){
			mainView.back();
		}else{
			myApp.alert(error.message);
		}
	})
};
