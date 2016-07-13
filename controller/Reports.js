App.prototype.ReportsScreen = function() {
	var div = $("#ReportsScreen");
	var self = this;
	var Reports = window.Report.read();
	Reports.then(function(result) {

		resultRev = [];
		for(var i in result){
			if(result[i].user == App.auth.currentUser.uid){
				result[i].id = i;
				result[i].created = moment(result[i].created).format('DD/MM/YY - HH:mm');
				resultRev.push(result[i]);
			}else if(result[i].user == 11){
				//Caso colaborador, mostra seus relatorios e de sua equipe
			}
		}
		resultRev.reverse();
		$.get("templates/Reports.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(resultRev);
			div.html(html);
		});
	});		
};

App.prototype.ReportsDetailAction = function() {
	var self = this;
	var id = mainView.url.split("id=")[1];

	var div = $("#ReportsDetail");
	var Reports = window.Report.read(id);
	Reports.then(function(result) {
		console.log(result);
		$.get("templates/ReportsDetail.html", function(temp) {
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result);
			div.html(html);
		});
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
	window.Report.user = App.auth.currentUser.uid;

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
