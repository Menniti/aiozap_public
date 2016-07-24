App.prototype.HomeScreen = function() {
	var self = this;
	self.FeedsScreen();
	self.PagesScreen();
	self.TeamsScreen();
	self.JobsScreen();
	self.TakeJobPicScreen();

	myApp.onPageAfterAnimation('index', function (page) {
		self.FeedsScreen();
		self.TeamsScreen();
		self.PagesScreen();
		self.JobsScreen();
		self.TakeJobPicScreen();

		if(self.checkLogin()){
			$("#SidebarLoggedIn").show();
			$("#SidebarLoggedOut").hide();
			self.HomeProfile();
		}else{
			$("#SidebarLoggedIn").hide();
			$("#SidebarLoggedOut").show();
		}
	});

	myApp.onPageAfterAnimation('JobsDetail', function (page) {
		self.JobsDetailScreen();
	});

	myApp.onPageAfterAnimation('PagesDetail', function (page) {
		self.PagesDetailScreen();
	});

	myApp.onPageAfterAnimation('TeamsDetail', function (page) {
		self.TeamsDetailScreen();
	});

	myApp.onPageAfterAnimation('Contact', function (page) {
		self.ContactScreen();
	});

	myApp.onPageAfterAnimation('Reports', function (page) {
		self.ReportsScreen();
	});
	myApp.onPageAfterAnimation('ReportsDetail', function (page) {
		self.ReportsDetailScreen();
	});

	myApp.onPageAfterAnimation('Ranking', function (page) {
		self.RankingScreen();
	});

	myApp.onPageAfterAnimation('Login', function (page) {
		self.LoginScreen();
	});

	myApp.onPageAfterAnimation('HelpDesk', function (page) {
		self.HelpDeskScreen();
	});

	myApp.onPageAfterAnimation('ReportsAdd', function (page) {
		self.ReportsAddScreen();
	});

	myApp.onPageAfterAnimation('Gallery', function (page) {
		self.GalleryScreen();
	});

	myApp.onPageAfterAnimation('Profile', function (page) {
		self.ProfileScreen();
	});

	if(self.checkLogin()){
		$("#SidebarLoggedIn").show();
		$("#SidebarLoggedOut").hide();
		self.HomeProfile();
	}else{
		$("#SidebarLoggedIn").hide();
		$("#SidebarLoggedOut").show();
	}

};

App.prototype.HomeProfile = function(e) {
	var div = $("#HomeProfile");
	var self = this;
	var Users = window.User.read(App.auth.currentUser.uid);
	Users.done(function(result) {
		$.get("templates/HomeProfile.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);

			$("#SidebarBtnLogout").on('click', self.SignOutAction.bind(self));
			$("#SidebarBtnTakeJobPic").on('click', self.TakeJobPicAction.bind(self));

		});
	});		
};

App.prototype.SignOutAction = function(e) {
	var self = this;
	e.preventDefault();
	var Users = window.User.logout();
	Users.done(function(result) {
		self.HomeScreen();
	});		
};


