App.prototype.FeedsScreen = function() {
	var div = $("#feedsScreen");
	var self = this;
	var Feeds = window.Feed.read();
	Feeds.then(function(result) {
		for(var i in result){
			result[i].created = moment(result[i].created).format('DD/MM/YY - HH:mm');
		}
		$.get("templates/Feeds.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};
