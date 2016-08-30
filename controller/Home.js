App.prototype.HomeScreen = function() {
	var self = this;
	self.JobPicsScreen();
	self.TakeJobPicScreen();

	myApp.onPageAfterAnimation('index', function (page) {
		self.JobPicsScreen();
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
		$("#BtnFloating").unbind('click').on('click', self.TakeJobPicAction.bind(self));
		self.HomeProfile();
	}else{
		$("#SidebarLoggedIn").hide();
		$("#SidebarLoggedOut").show();
		$("#BtnFloating").unbind('click').on('click', function(){
			mainView.router.loadPage("views/Login.html");
		});
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

			$("#SidebarBtnLogout").unbind('click').on('click', self.SignOutAction.bind(self));
			$("#SidebarBtnTakeJobPic").unbind('click').on('click', self.TakeJobPicAction.bind(self));
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


