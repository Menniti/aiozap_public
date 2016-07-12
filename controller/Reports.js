App.prototype.ReportsScreen = function() {
	var div = $("#ReportsScreen");
	var self = this;
	var Reports = window.Report.read();
	Reports.then(function(result) {

		resultRev = [];
		for(var i in result){
			//if(result[i].user == App.auth.currentUser.uid){
				result[i].id = i;
				result[i].created = moment(result[i].created).format('DD/MM/YY - HH:mm');
				resultRev.push(result[i]);
			//}else if(result[i].user == 11){
			//}
		}
		resultRev.reverse();
		$.get("templates/Reports.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(resultRev);
			div.html(html);
		});
	});		
};

App.prototype.ReportsDetailAction = function() {
	var self = this;
	var id = mainView.url.split("id=")[1];

	var div = $("#ReportsDetail");
	var Reports = window.Report.read(id);
	Reports.then(function(result) {
		console.log(result);
		$.get("templates/ReportsDetail.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		

};


