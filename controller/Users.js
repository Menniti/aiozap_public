App.prototype.UsersScreen = function() {
	var div = $("#usersScreen");
	var self = this;
	var Users = window.User.read();
	Users.then(function(result) {
		$.get("templates/Users.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};

App.prototype.UsersDetailAction = function() {
	var div = $("#UsersDetail");
	var self = this;
	var id = mainView.url.split("id=")[1];
	var Users = window.User.read(id);
	Users.then(function(result) {
		$.get("templates/UsersDetail.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};


