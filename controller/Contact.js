App.prototype.ContactScreen = function() {
	var self = this;
	var div = $("#ContactScreen");
	var divAdmin = $("#ContactScreenAdmin");

	var Admins = window.Admin.read();
	Admins.then(function(result) {
		var coords=[];
		for (var i in result){
			if(result[i].email=="gincanasocial@ccpsa.com.br"){
				coords.push(result[i]);
			}
		}
		$.get("templates/Contact.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(coords);
			divAdmin.html(html);
		});
	});		


	var Teams = window.Team.read();
	Teams.then(function(result) {
		console.log(result);

		var Users = window.User.read();
		Users.then(function(resultUser) {
			var coords=[];
			for (var i in result){
				for (var j in resultUser){
					if(resultUser[j].is_editor==1 && resultUser[j].team==i){
						resultUser[j].team_title = result[i].title;
						resultUser[j].team_color = result[i].color;
						coords.push(resultUser[j]);
					}
				}
			}
			console.log(coords);
			$.get("templates/Contact.html", function(temp) {
				var compiledTemplate = Template7.compile(temp);
				var html = compiledTemplate(coords);
				div.html(html);
			});
		});		


	});		


	/*var Users = window.User.read();
	Users.then(function(result) {
		var coords=[];
		for (var i in result){
			if(result[i].is_editor==1){
				coords.push(result[i]);
			}
		}
		$.get("templates/Contact.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(coords);
			div.html(html);
		});
	});*/		

};
