App.prototype.RankingScreen = function() {
	var self = this;
	var div = $("#RankingScreen");

	var Users = window.User.read();
	Users.then(function(resultUsers) {

		var Teams = window.Team.read();
		Teams.then(function(resultTeams) {

			var Jobs = window.Job.read();
			Jobs.then(function(resultJobs) {

				var Reports = window.Report.read();
				Reports.then(function(resultReports) {

					var RankingJobs = [];
						RankingJobs.points = {};
						RankingJobs.teams = resultTeams;
						RankingJobs.jobs = resultJobs;

					for(var i in resultJobs){
						RankingJobs.points[i] = {};
						RankingJobs.points[i].title = resultJobs[i].title;
						for(var j in resultTeams){
							RankingJobs.points[i][j] = 0;
						}
					}
				
					for(var i in resultReports){
						if(resultReports[i].active==1 && resultUsers[resultReports[i].user].team && resultReports[i].points>0){
							var rankingJob = resultJobs[resultReports[i].job].title;
							var rankingTeam = resultTeams[resultUsers[resultReports[i].user].team].title;
							var rankingPoints = resultReports[i].points;
							RankingJobs.points[resultReports[i].job][resultUsers[resultReports[i].user].team]+=parseInt(resultReports[i].points);
						}
					}

					console.log(RankingJobs);

					$.get("templates/Ranking.html", function(temp) {
						var compiledTemplate = Template7.compile(temp);
						var html = compiledTemplate(RankingJobs);
						div.html(html);
					});
					
				});		

			});	

		});	
	});	


};
