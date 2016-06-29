App.prototype.ContactScreen = function() {
	var self = this;
	var div = $("#ContactScreen");
	var divAdmin = $("#ContactScreenAdmin");

	var Users = window.User.read();
	Users.then(function(result) {
		$.get("templates/Contact.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		

	var Admins = window.Admin.read();
	Admins.then(function(result) {
		$.get("templates/Contact.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			divAdmin.html(html);
		});
	});		

};
