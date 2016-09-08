App.prototype.ProfileScreen = function() {
	var div = $("#ProfileScreen");
	var self = this;
	var id = mainView.url.split("id=")[1];
	var Users = window.User.read(id);
	Users.done(function(result) {
		$.get("templates/Profile.html", function(temp) {

			result.likes = 0;
			result.pics = 0;

			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);

			$(".see-more-toggle").unbind('click').on('click', function(){
				$(".see-more").toggle();
			});

			div = $("#ProfilePicsScreen");
			var JobPics = window.JobPic.read();
			JobPics.done(function(result) {
				var userPics = [];
				for(var i in result){
					if(result[i].user==id){
						result[i].id = i;
						userPics.push(result[i]);
					}
				}
				//userPics.reverse();
				$.get("templates/ProfilePics.html", function(temp) {
					var compiledTemplate = Template7.compile(temp);
					var html = compiledTemplate(userPics);
					div.html(html);
					$("#profilePicsNumber").html(userPics.length);
				});

				var Likes = window.Like.read();
				Likes.done(function(result) {
					var userLikes = 0;
					for(var i in result){
						var test = userPics.map(function(e) { return e.id; }).indexOf(result[i].jobpic);
						if(test>-1){
							userLikes++;
						}
					}
					$("#profileLikesNumber").html(userLikes);
				});		

			});		


		});
	});		

};
