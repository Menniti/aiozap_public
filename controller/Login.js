App.prototype.LoginScreen = function() {
	var self = this;
	var LoginForm = $("#login-form");
	var RegisterForm = $("#register-form");
	var PasswordResetForm = $("#password-reset-form");
	LoginForm.unbind('submit').on('submit', self.LoginAction.bind(self));
	RegisterForm.unbind('submit').on('submit', self.RegisterAction.bind(self));
	PasswordResetForm.unbind('submit').on('submit', self.PasswordResetAction.bind(self));
};

App.prototype.LoginAction = function(e) {
	var self = this;
	e.preventDefault();
	$("#btn_login").attr("disabled",true);
	if($("#input_email").val().length>0 && $("#input_password").val().length>0){
		window.User.email = $("#input_email").val();
		window.User.password = $("#input_password").val();
		var Users = window.User.login();
		Users.then(function(result) {
			$("#btn_login").attr("disabled",false);
			console.log(result);
			if(result==true){
				mainView.back();
			}else{
				myApp.alert(self.msgErrors[result.code],self.msgDefaultTitle);
			}
		})
	}else{
		$("#btn_login").attr("disabled",false);
		myApp.alert(self.msgErrorFieldsDefault,self.msgDefaultTitle);
	}
};

App.prototype.RegisterAction = function(e) {
	var self = this;
	e.preventDefault();
	$("#btn_register").attr("disabled",true);
	if($("#input_register_email").val().length>0 && $("#input_register_password").val().length>0){
		window.User.email = $("#input_register_email").val();
		window.User.password = $("#input_register_password").val();
		var Users = window.User.create();
		Users.then(function(result) {
			$("#btn_register").attr("disabled",false);
			console.log(result);
			if(result==true){
				mainView.back();
			}else{
				myApp.alert(self.msgErrors[result.code],self.msgDefaultTitle);
			}
		})
	}else{
		$("#btn_register").attr("disabled",false);
		myApp.alert(self.msgErrorFieldsDefault,self.msgDefaultTitle);
	}
};

App.prototype.PasswordResetAction = function(e) {
	var self = this;
	e.preventDefault();
	$("#btn_password_reset").attr("disabled",true);
	if($("#input_recover_email").val().length>0){
		$("#btn_password_reset").attr("disabled",true);
		window.User.email = $("#input_recover_email").val();
		var Users = window.User.passwordReset();
		Users.then(function(result) {
			$("#btn_password_reset").attr("disabled",false);
			console.log(result);
			if(result==true){
				mainView.back();
				myApp.alert(self.msgPasswordReset,self.msgDefaultTitle);
			}else{
				myApp.alert(self.msgErrorUnrecognizedEmailDefault,self.msgDefaultTitle);
			}
		})
	}else{
		$("#btn_password_reset").attr("disabled",false);
		myApp.alert(self.msgErrorFieldsDefault,self.msgDefaultTitle);
	}
};

