App.prototype.JobPicsScreen = function() {
	var div = $("#jobpicsScreen");
	var self = this;
	var JobPics = window.JobPic.read();
	JobPics.done(function(result) {
		$.get("templates/JobPics.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};
