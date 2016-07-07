App.prototype.JobsScreen = function() {
	var div = $("#jobsScreen");
	var self = this;
	var Jobs = window.Job.read();
	Jobs.then(function(result) {
		$.get("templates/Jobs.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};

App.prototype.JobsDetailAction = function() {
	var self = this;
	var id = mainView.url.split("id=")[1];

	var div = $("#JobsDetail");
	var Jobs = window.Job.read(id);
	Jobs.then(function(result) {
		result.start_date = moment(result.start_date).format('DD/MM/YY');
		result.end_date = moment(result.end_date).format('DD/MM/YY');
		$.get("templates/JobsDetail.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		

	var divPhotos = $("#JobsDetailPhotos");
	var JobPics = window.JobPic.read();
	JobPics.then(function(result) {
		var published=[];
		var photos=[];		
		for (var i in result){
			if(result[i].active==1 && result[i].job==id){
				published.push(result[i]);
				photos.push(result[i].file);
			}
		}
		$.get("templates/JobsDetailPhotos.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(published);
			divPhotos.html(html);

			var photoBrowser = myApp.photoBrowser({
				photos : photos
			});
			$('.photo').on('click', function () {
				photoBrowser.open();
			});

		});


	});

};


