App.prototype.LoginScreen = function() {
	var self = this;
	var LoginForm = $("#login-form");
	var RegisterForm = $("#register-form");
	var PasswordResetForm = $("#password-reset-form");
	LoginForm.on('submit', self.LoginAction.bind(self));
	RegisterForm.on('submit', self.RegisterAction.bind(self));
	PasswordResetForm.on('submit', self.PasswordResetAction.bind(self));
};

App.prototype.LoginAction = function(e) {
	var self = this;
	$("#btn_login").attr("disabled",true);
	e.preventDefault();
	window.User.email = $("#input_email").val();
	window.User.password = $("#input_password").val();
	var Users = window.User.login();
	Users.done(function(result) {
		$("#btn_login").attr("disabled",false);
		console.log(result);
		if(result!=false){
			mainView.back();
		}else{
			myApp.alert(self.msgErrors[result.code],self.msgDefaultTitle);
		}
	})
};

App.prototype.RegisterAction = function(e) {
	var self = this;
	$("#btn_register").attr("disabled",true);
	e.preventDefault();
	window.User.email = $("#input_register_email").val();
	window.User.password = $("#input_register_password").val();
	var Users = window.User.create();
	Users.done(function(result) {
		$("#btn_register").attr("disabled",false);
		console.log(result);
		if(result!=false){
			mainView.back();
		}else{
			myApp.alert(self.msgErrors[result.code],self.msgDefaultTitle);
		}
	})
};

App.prototype.PasswordResetAction = function(e) {
	var self = this;
	$("#btn_password_reset").attr("disabled",true);
	e.preventDefault();
	window.User.email = $("#input_email").val();
	var Users = window.User.passwordReset();
	Users.then(function(result) {
		$("#btn_password_reset").attr("disabled",false);
		console.log(result);
		if(result!=false){
			mainView.back();
			myApp.alert(self.msgPasswordReset,self.msgDefaultTitle);
		}else{
			myApp.alert(self.msgErrors[result.code],self.msgDefaultTitle);
		}
	})
};

