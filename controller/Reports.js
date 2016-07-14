App.prototype.ReportsScreen = function() {
	var div = $("#ReportsScreen");
	var self = this;

	var Users = window.User.read();
	Users.then(function(resultUser) {
		var Reports = window.Report.read();
		Reports.then(function(result) {
			resultRev = {};
			resultMyself = [];
			resultTeam = [];
			for(var i in result){
				if(result[i].user == window.App.auth.currentUser.uid){
					result[i].id = i;
					result[i].created = moment(result[i].created).format('DD/MM/YY - HH:mm');
					resultMyself.push(result[i]);
				}

				if(resultUser[window.App.auth.currentUser.uid].is_editor==1 && result[i].user != window.App.auth.currentUser.uid && resultUser[window.App.auth.currentUser.uid].team==resultUser[result[i].user].team){
					result[i].id = i;
					result[i].created = moment(result[i].created).format('DD/MM/YY - HH:mm');
					resultTeam.push(result[i]);
				}
			}
			resultMyself.reverse();
			resultTeam.reverse();

			resultRev.resultMyself = resultMyself;
			resultRev.resultTeam = resultTeam;

			$.get("templates/Reports.html", function(temp) {
				var compiledTemplate = Template7.compile(temp);
				var html = compiledTemplate(resultRev);
				div.html(html);
			});
		});		
	});		

};

App.prototype.ReportsDetailScreen = function() {
	var self = this;
	var id = mainView.url.split("id=")[1];

	var div = $("#ReportsDetail");

	var Users = window.User.read();
	Users.then(function(resultUser) {
		var Reports = window.Report.read(id);
		Reports.then(function(result) {
			result.locked = 1;
			result.can_validate = 0;
		
			if(result.active==0){
				result.locked = 0;
			}
			if(resultUser[window.App.auth.currentUser.uid].is_editor==1){
				result.locked = 0;
				result.can_validate = 1;
			}


			$.get("templates/ReportsDetail.html", function(temp) {

				var compiledTemplate = Template7.compile(temp);
				var html = compiledTemplate(result);
				div.html(html);

				var ReportDetailForm = $("#report-detail-form");
				ReportDetailForm.on('submit', self.ReportsDetailAction.bind(self));

				var Jobs = window.Job.read();
				Jobs.then(function(resultChild) {
					var div = $("#input_job");
					$.get("templates/ReportsEditJobSelect.html", function(temp) {
						var compiledTemplate = Template7.compile(temp);
						var html = compiledTemplate(resultChild);
						div.html(html);
						div.val(result.job);
					});
				});		


				var Users = window.User.read();
				Users.then(function(resultChild) {
					var resultMyTeamUsers = [];
					for(var i in resultChild){
						if(resultChild[window.App.auth.currentUser.uid].team==resultChild[i].team){
							resultChild[i].id = i;
							resultMyTeamUsers.push(resultChild[i]);
						}
					}

					var div = $("#input_user");
					$.get("templates/ReportsEditUserSelect.html", function(temp) {
						var compiledTemplate = Template7.compile(temp);
						var html = compiledTemplate(resultMyTeamUsers);
						div.html(html);
						div.val(result.user);
					});
				});		
			});
		});		
	});		


};

App.prototype.ReportsDetailAction = function(e) {
	e.preventDefault();
	var self = this;
	window.Report.id = mainView.url.split("id=")[1];
	window.Report.title = $("#input_job option:selected").text()+" - "+$("#input_user option:selected").text()+" - "+moment(new Date().getTime()).format('DD/MM/YY - HH:mm');
	window.Report.description = $("#input_description").val();
	window.Report.points = $("#input_points").val();
	window.Report.active = $("#input_active").val();
	window.Report.job = $("#input_job").val();
	window.Report.user = $("#input_user").val();
	var Reports = window.Report.update();
	Reports.then(function(result) {
		if(result==true){
			myApp.alert(self.msgSuccessDefault,self.msgDefaultTitle);
		}else{
			myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
		}
	});		
};

App.prototype.ReportsAddScreen = function() {
	var self = this;
	var div = $("#ReportsAddScreen");
	var ReportAddForm = $("#report-add-form");
	ReportAddForm.on('submit', self.ReportsAddAction.bind(self));

	var Jobs = window.Job.read();
	Jobs.then(function(resultChild) {
		var div = $("#input_job");
		$.get("templates/ReportsEditJobSelect.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(resultChild);
			div.html(html);
		});
	});		
};

App.prototype.ReportsAddAction = function(e) {
	e.preventDefault();
	var self = this;
	window.Report.title = $("#input_job option:selected").text()+" - "+window.App.auth.currentUser.email+" - "+moment(new Date().getTime()).format('DD/MM/YY - HH:mm');
	window.Report.description = $("#input_description").val();
	window.Report.points = $("#input_points").val();
	window.Report.job = $("#input_job").val();
	window.Report.active = 0;
	window.Report.user = window.App.auth.currentUser.uid;

	//TAKE PICTURE
	var ReportPicture = window.PluginCamera.takePicture();
	ReportPicture.then(function(resultPic) {
		var pic = resultPic;
		//CREATE ENTRY ON DB
		var Report = window.Report.create();
		Report.then(function(resultCreate) {
			if(resultCreate){
				var file = pic;
				window.Report.id = resultCreate;
				window.Report.file = file;
				//UPLOAD PICTURE
				var Reports = window.Report.uploadFile();
				$.when(Reports).then(function(result) {
					var uploadTask = result;
					uploadTask.on("state_changed",
						function(snapshot) {
							var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							myApp.addNotification({hold:1000,title: 'Upload:',message:progress+'%'});
						}, function(error) {
							console.log(error);
						}, function() {
							var downloadURL = uploadTask.snapshot.downloadURL;
							window.Report.file = downloadURL;
							//UPDATE CREATED ENTRY ON DB
							var Reports = window.Report.updateFile();
							Reports.then(function(result) {
								if(result==true){
									myApp.alert(self.msgSuccessDefault,self.msgDefaultTitle);
								}else{
									myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
								}
							});		

						}
					);
				});


			}else{
				myApp.alert(self.msgErrorDefault,self.msgDefaultTitle);
			}
		});		
	});

};
