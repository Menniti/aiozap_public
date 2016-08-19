App.prototype.TeamsScreen = function() {
	var div = $("#teamsScreen");
	var self = this;
	var Teams = window.Team.read();
	Teams.done(function(result) {
		$.get("templates/Teams.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		
};

App.prototype.TeamsDetailScreen = function() {
	var self = this;
	var id = mainView.url.split("id=")[1];

	var div = $("#TeamsDetail");
	var Teams = window.Team.read(id);
	Teams.done(function(result) {
		$.get("templates/TeamsDetail.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
	});		

	var divEditors = $("#TeamsDetailEditors");
	var Users = window.User.read();
	Users.done(function(result) {
		var editors=[];
		for (var i in result){
			if(result[i].is_editor==1 && result[i].team==id){
				editors.push(result[i]);
			}
		}
		$.get("templates/TeamsDetailEditors.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(editors);
			divEditors.html(html);
		});


		var divPhotos = $("#TeamsDetailPhotos");
		var JobPics = window.JobPic.read();
		JobPics.done(function(resultPic) {
			var published=[];
			var photos=[];		
			for (var i in resultPic){
				if(resultPic[i].active==1 && result[resultPic[i].user].team==id){
					published.push(resultPic[i]);
					photos.push(resultPic[i].file);
				}
			}
			$.get("templates/TeamsDetailPhotos.html", function(temp) {
				var compiledTemplate = Template7.compile(temp);
				var html = compiledTemplate(published);
				divPhotos.html(html);

				var photoBrowser = myApp.photoBrowser({
					photos : photos
				});
				$('.photo').on('click', function (el) {
					photoBrowser.open($('.photo').index(this));
				});

			});


		});

	});		




};


