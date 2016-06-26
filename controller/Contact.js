App.prototype.ContactScreen = function() {
	var div = $("#ContactScreen");
	var self = this;
	var Users = window.User.read();
	Users.then(function(result) {
		$.get("templates/Contact.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};
