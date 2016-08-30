App.prototype.JobPicsScreen = function() {
	var div = $("#jobpicsScreen");
	var self = this;
	var JobPics = window.JobPic.read();
	JobPics.done(function(result) {
		var Likes = window.Like.read();
			Likes.done(function(resultLikes) {
				$.get("templates/JobPics.html", function(temp) {
					//var Pics = [];
					for(var i in result){
						result[i].id = i;
						result[i].likes = 0;
						for(var k in resultLikes){
							if(resultLikes[k].jobpic==i){
								result[i].likes++;
							}
						}
						//Pics.push(result[i]);
					}
					//Pics.reverse();

					var compiledTemplate = Template7.compile(temp);
					var html = compiledTemplate(result);
					div.html(html);

					if(self.checkLogin()){
						$(".btn-whoa").unbind('click').on('click', self.JobPicsAction.bind(self));
					}else{
						$(".btn-whoa").unbind('click').on('click', function(){
							mainView.router.loadPage("views/Login.html");
						});
					}

					var ptrContent = $$('.pull-to-refresh-content');
					ptrContent.on('refresh', function (e) {
						setTimeout(function () {
							self.JobPicsScreen();
							myApp.pullToRefreshDone();
						}, 2000);
					});
				});
			});
	});		
};


App.prototype.JobPicsAction = function(e) {
	var self = this;
	var me = window.App.auth.currentUser.uid;
	var pic = e.currentTarget.id;
	var Likes = window.Like.read();
	Likes.then(function(result) {
		var is_liked=0;
		for(var i in result){
			if(result[i].user==me && result[i].jobpic==pic){
				is_liked=1;
			}
		}
		if(is_liked==1){
			var Likes = window.Like.delete(i);
			Likes.then(function(result) {
				if(result!=false){
					self.JobPicsScreen();
				}else{
					self.JobPicsScreen();
				}
			});
		}else{
			window.Like.user = me;
			window.Like.jobpic = pic;
			var Likes = window.Like.create();
			Likes.then(function(result) {
				if(result!=false){
					self.JobPicsScreen();
				}else{
					self.JobPicsScreen();
				}
			});
		}
	});



};



