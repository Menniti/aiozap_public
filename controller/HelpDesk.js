App.prototype.HelpDeskScreen = function() {
	var self = this;
	var div = $("#HelpDeskScreen");
	var HelpDeskForm = $("#help-desk-form");
	HelpDeskForm.on('submit', self.HelpDeskAction.bind(self));
	if(window.App.auth){
		$("#input_title").val(window.App.auth.currentUser.email);
	}
};

App.prototype.HelpDeskAction = function(e) {
	e.preventDefault();
	var self = this;
	$("#btn_helpdesk").attr("disabled",true);

	window.Help.title = $("#input_title").val();
	window.Help.description = $("#input_description").val();
	var Help = window.Help.create();
	Help.then(function(result) {
		$("#btn_helpdesk").attr("disabled",false);
		console.log(result);
		if(result){
			mainView.back();
			myApp.alert(self.msgSuccessForm,self.msgDefaultTitle);

			$.ajax({
				type: "GET",
				url: "http://oakianendo.com.br/gincanasocial/help_desk_email.php?sender="+window.Help.title+"&message="+window.Help.description,
				//url: "http://localhost/oakiangincana/help_desk_email.php?sender="+window.Help.title+"&message="+window.Help.description,
			}).done(function(result) {
				console.log(result);
			});

		}else{
			myApp.alert(result);
		}
	})
};
