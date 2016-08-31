App.prototype.ProfileScreen = function() {
	var div = $("#ProfileScreen");
	var self = this;
	var id = mainView.url.split("id=")[1];
	var Users = window.User.read(id);
	Users.done(function(result) {
		console.log(result);
		$.get("templates/Profile.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		

};
