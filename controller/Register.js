App.prototype.RegisterScreen = function() {
	var self = this;
	var RegisterForm = $("#register-form");
	RegisterForm.on('submit', self.RegisterAction.bind(self));
};

App.prototype.RegisterAction = function(e) {
	e.preventDefault();
	window.User.email = $("#input_email").val();
	window.User.password = $("#input_password").val();
	var Users = window.User.create();
	Users.then(function(result) {
		console.log(result);
		if(result==true){
			mainView.back();
		}else{
			myApp.alert(error.message);
		}
	})
};
