App.prototype.HomeScreen = function() {
	var self = this;
	self.FeedsScreen();
	self.PagesScreen();
	self.TeamsScreen();

	myApp.onPageAfterAnimation('index', function (page) {
		self.FeedsScreen();
		self.PagesScreen();
		self.TeamsScreen();
	});

	myApp.onPageAfterAnimation('PagesDetail', function (page) {
		self.PagesDetailAction();
	});

	myApp.onPageAfterAnimation('TeamsDetail', function (page) {
		self.TeamsDetailAction();
	});
};
