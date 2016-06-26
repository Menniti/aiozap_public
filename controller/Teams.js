App.prototype.TeamsScreen = function() {
	var div = $("#teamsScreen");
	var self = this;
	var Teams = window.Team.read();
	Teams.then(function(result) {
		$.get("templates/Teams.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};

App.prototype.TeamsDetailAction = function() {
	var div = $("#TeamsDetail");
	var self = this;
	var id = mainView.url.split("id=")[1];
	var Teams = window.Team.read(id);
	Teams.then(function(result) {
		$.get("templates/TeamsDetail.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};


