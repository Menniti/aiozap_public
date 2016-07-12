App.prototype.LoginScreen = function() {
	var self = this;
	var LoginForm = $("#login-form");
	var RegisterForm = $("#register-form");
	LoginForm.on('submit', self.LoginAction.bind(self));
	RegisterForm.on('submit', self.RegisterAction.bind(self));
};

App.prototype.LoginAction = function(e) {
	var self = this;
	e.preventDefault();
	window.User.email = $("#input_email").val();
	window.User.password = $("#input_password").val();
	var Users = window.User.login();
	Users.then(function(result) {
		console.log(result);
		if(result==true){
			mainView.back();
		}else{
			myApp.alert(self.msgErrors[result.code],self.msgDefaultTitle);
		}
	})
};

App.prototype.RegisterAction = function(e) {
	var self = this;
	e.preventDefault();
	window.User.email = $("#input_register_email").val();
	window.User.password = $("#input_register_password").val();
	var Users = window.User.create();
	Users.then(function(result) {
		console.log(result);
		if(result==true){
			mainView.back();
		}else{
			myApp.alert(self.msgErrors[result.code],self.msgDefaultTitle);
		}
	})
};
