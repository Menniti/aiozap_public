App.prototype.HomeScreen = function() {
	var self = this;
	self.FeedsScreen();
	self.PagesScreen();
	self.TeamsScreen();

	myApp.onPageAfterAnimation('index', function (page) {
		self.FeedsScreen();
		self.TeamsScreen();
		self.PagesScreen();
	});

	myApp.onPageAfterAnimation('PagesDetail', function (page) {
		self.PagesDetailAction();
	});

	myApp.onPageAfterAnimation('TeamsDetail', function (page) {
		self.TeamsDetailAction();
	});

	myApp.onPageAfterAnimation('Contact', function (page) {
		self.ContactScreen();
	});

	myApp.onPageAfterAnimation('Login', function (page) {
		self.LoginScreen();
	});

	if(self.checkLogin()){
		$("#SidebarLoggedIn").show();
		$("#SidebarLoggedOut").hide();
	}else{
		$("#SidebarLoggedIn").hide();
		$("#SidebarLoggedOut").show();
	}

};
