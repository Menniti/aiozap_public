App.prototype.RankingScreen = function() {
	var self = this;
	var div = $("#RankingScreen");

	var Users = window.User.read();
	Users.done(function(resultUsers) {

		var Teams = window.Team.read();
		Teams.done(function(resultTeams) {

			var Jobs = window.Job.read();
			Jobs.done(function(resultJobs) {

				var Reports = window.Report.read();
				Reports.done(function(resultReports) {

					var RankingTeams = [];
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
						if(resultReports[i].hasOwnProperty("user")){
							if(resultUsers.hasOwnProperty(resultReports[i].user)){
								if(resultUsers[resultReports[i].user].hasOwnProperty("team")){
									if(resultReports[i].active==1 && resultUsers[resultReports[i].user].team && resultReports[i].points>0){
										var rankingJob = resultJobs[resultReports[i].job].title;
										var rankingTeam = resultTeams[resultUsers[resultReports[i].user].team].title;
										var rankingPoints = resultReports[i].points;
										RankingJobs.points[resultReports[i].job][resultUsers[resultReports[i].user].team]+=parseInt(resultReports[i].points);
										if(!RankingTeams[resultTeams[resultUsers[resultReports[i].user].team].title]){
											RankingTeams[resultTeams[resultUsers[resultReports[i].user].team].title]=0;
										}
										RankingTeams[resultTeams[resultUsers[resultReports[i].user].team].title]+=parseInt(resultReports[i].points);
									}
								}
							}
						}
					}

					RankingJobs.ranking = [];
					for(var i in RankingTeams){
						var obj = {};
						obj.title = i;
						obj.value = RankingTeams[i];
						RankingJobs.ranking.push(obj);
					}
					console.log(RankingJobs);
					RankingJobs.ranking = RankingJobs.ranking.sort(compare).reverse();

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


function compare(a,b) {
	if (a.value < b.value)
		return -1;
	if (a.value > b.value)
		return 1;
	return 0;
}
