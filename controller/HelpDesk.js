App.prototype.HelpDeskScreen = function() {
	var self = this;
	var div = $("#HelpDeskScreen");
	var HelpDeskForm = $("#help-desk-form");
	HelpDeskForm.on('submit', self.HelpDeskAction.bind(self));
};

App.prototype.HelpDeskAction = function(e) {
	e.preventDefault();
	var self = this;
	window.Help.title = $("#input_title").val();
	window.Help.description = $("#input_description").val();
	var Help = window.Help.create();
	Help.then(function(result) {
		console.log(result);
		if(result==true){
			mainView.back();
			myApp.alert(self.msgSuccessForm,self.msgDefaultTitle);
		}else{
			myApp.alert(result);
		}
	})
};
