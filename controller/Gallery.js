App.prototype.GalleryScreen = function() {
	var div = $("#GalleryScreen");
	var self = this;
	var JobPics = window.JobPic.read();
	JobPics.then(function(result) {
		var published=[];
		var photos=[];		
		for (var i in result){
			if(result[i].active==1){
				published.push(result[i]);
				photos.push(result[i].file);
			}
		}
		$.get("templates/Gallery.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(published);
			div.html(html);

			var photoBrowser = myApp.photoBrowser({
				photos : photos
			});
			$('.photo').on('click', function () {
				photoBrowser.open();
			});

		});
	});
};

