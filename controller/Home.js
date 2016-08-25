App.prototype.HomeScreen = function() {
	var self = this;
	self.FeedsScreen();
	self.TeamsScreen();
	self.JobsScreen();
	self.TakeJobPicScreen();

	myApp.onPageAfterAnimation('index', function (page) {
		self.FeedsScreen();
		self.TeamsScreen();
		self.JobsScreen();
		self.TakeJobPicScreen();

		myApp.openPanel('right');

		if(self.checkLogin()){
			$("#SidebarLoggedIn").show();
			$("#SidebarLoggedOut").hide();
			self.HomeProfile();
		}else{
			$("#SidebarLoggedIn").hide();
			$("#SidebarLoggedOut").show();
		}
	});

	myApp.onPageAfterAnimation('TeamsDetail', function (page) {
		self.TeamsDetailScreen();
	});
	myApp.onPageAfterAnimation('Reports', function (page) {
		self.ReportsScreen();
	});
	myApp.onPageAfterAnimation('ReportsDetail', function (page) {
		self.ReportsDetailScreen();
	});
	myApp.onPageAfterAnimation('Login', function (page) {
		self.LoginScreen();
	});
	myApp.onPageAfterAnimation('ReportsAdd', function (page) {
		self.ReportsAddScreen();
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
	Users.then(function(result) {
		$.get("templates/HomeProfile.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);

			$("#SidebarBtnLogout").on('click', self.SignOutAction.bind(self));
			$("#SidebarBtnTakeJobPic").on('click', self.TakeJobPicAction.bind(self));
			if(result==null){
				$("#btn-teampick").hide();
			}
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


