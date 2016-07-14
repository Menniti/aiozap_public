App.prototype.PagesScreen = function() {
	var div = $("#pagesScreen");
	var self = this;
	var Pages = window.Page.read();
	Pages.then(function(result) {
		$.get("templates/Pages.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};

App.prototype.PagesDetailScreen = function() {
	var div = $("#PagesDetail");
	var self = this;
	var id = mainView.url.split("id=")[1];
	var Pages = window.Page.read(id);
	Pages.then(function(result) {
		$.get("templates/PagesDetail.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};


