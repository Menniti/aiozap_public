App.prototype.ContactScreen = function() {
	var self = this;
	var div = $("#ContactScreen");
	var divAdmin = $("#ContactScreenAdmin");

	var Users = window.User.read();
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
	});		

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

};
