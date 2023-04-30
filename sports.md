
<table style="width:100%" id="table">
  <tr>
    <th>Check for your Favorite NFL Team! Your favorite team's statistics will show the number of games they have played, their overall regular season record, and different statistics about the number of points they have scored and allowed. The last column shows if your team made the playoffs! You may also use the match predictor that uses an algorithm to predict which team will win using the team statistics!</th>
  </tr>
</table>
<h2>NFL Team Showdown</h2>
<button onclick="manageTeams()" type="button">Manage Teams</button> 
<div class="card-body">
    <p style="color:red" id="result"></p>
    <p class="card-text">
        <script>
            const team1Vals = {};
            const team2Vals = {};
            const resultContainer = document.getElementById("result");
            // prepare URL's to allow easy switch from deployment and localhost
            const url = "https://fnvs.duckdns.org/api/nflteam"
            //const url = "http://127.0.0.1:8679/api/nflteam";
            const create_fetch = url + '/create';
            const read_fetch = url + '/';
            function manageTeams(){
                window.location.assign("sportscrud");
            }
            function load() {
                // prepare fetch options
                const read_options = {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                },
                };     // fetch the data from API
                fetch(read_fetch, read_options)
                // response is a RESTful "promise" on any successful fetch
                .then(response => {
                    // check for response errors
                    if (response.status !== 200) {
                        const errorMsg = 'Database read error: ' + response.status;
                        console.log(errorMsg);
                        resultContainer.innerHTML = errorMsg;
						document.getElementById("teams").style.visibility = "hidden"
                        return;
                    }
                    // valid response will have json data
                    response.json().then(teams => {
                        console.log(teams);
                        let team1Select = "<select name='team1_name' id='team1_name' onchange='showTeam1Stats()' onfocus='showTeam1Stats()'><option value=''>Select Team</option>";
                        let team2Select = "<select name='team2_name' id='team2_name' onchange='showTeam2Stats()' onfocus='showTeam2Stats()'><option value=''>Select Challenger</option>";
                        
						for (let team in teams) {
                            team1Select+= "<option value='"+teams[team].team+"'>"+teams[team].team+"</option>";
                            team2Select+= "<option value='"+teams[team].team+"'>"+teams[team].team+"</option>";
                        }
                      
                        team1Select+= "</select>";
                        team2Select+= "</select>";
                        document.getElementById("team1").innerHTML = team1Select;
                        document.getElementById("team2").innerHTML = team2Select;
                        //document.getElementById("demo").innerHTML = text;
                    })
                }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
					console.error(err);
					resultContainer.innerHTML = err;
					document.getElementById("teams").style.visibility = "hidden";
                });
            }
            function showStats(teamName, statId) {
                // prepare fetch options
                const read_options = {
                    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'omit', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                    },
                };     // fetch the data from API
                let read_fetch_team = read_fetch + '?name='+teamName;
                fetch(read_fetch_team, read_options)
                // response is a RESTful "promise" on any successful fetch
                    .then(response => {
                        // check for response errors
                        if (response.status !== 200) {
                            const errorMsg = 'Database read error: ' + response.status;
                            console.log(errorMsg);
                            resultContainer.innerHTML = errorMsg;
                            return;
                        }
                        // valid response will have json data
                        response.json().then(team => {
                            console.log(team);
                                let text = "<table border='1' style='border-collapse: separate;'><tr><th>Team</th><td>" + team.team + "</td></tr><tr><th>Division</th><td>" + team.division + "</td></tr><tr><th>Games Played</th><td>" + team.gamesplayed + "</td></tr><tr><th>Games Won</th><td>" + team.gameswon + "</td></tr><tr><th>Games Lost</th><td>" + team.gameslost + "</td></tr><tr><th>Games Drawn</th><td>" + team.gamesdrawn + "</td></tr><tr><th>Games Played At Home</th><td>" + team.gamesplayedathome + "</td></tr><tr><th>Games Played Away</th><td>" + team.gamesplayedaway + "</td></tr><tr><th>Games Won At Home</th><td>" + team.gameswonathome + "</td></tr><tr><th>Games Won Away</th><td>" + team.gameswonaway + "</td></tr><tr><th>Games Lost At Home</th><td>" + team.gameslostathome + "</td></tr><tr><th>Games Lost Away</th><td>" + team.gameslostaway + "</td></tr><tr><th>Points For</th><td>" + team.pointsfor + "</td></tr><tr><th>Points Against</th><td>" + team.pointsagainst + "</td></tr><tr><th>Playoffs</th><td>" + team.playoffs + "</td></tr></table>";
                            document.getElementById(statId).innerHTML = text;
                            if (statId == "team1_stats"){
                                team1Vals["team"] = team.team;
                                team1Vals["gameswon"] = team.gameswon;
                                team1Vals["pointsfor"] = team.pointsfor;
                                team1Vals["pointsagainst"] = team.pointsagainst;
                                team1Vals["playoffs"] = team.playoffs;                
                            } else if (statId == "team2_stats"){
                                team2Vals["team"] = team.team;
                                team2Vals["gameswon"] = team.gameswon;
                                team2Vals["pointsfor"] = team.pointsfor;
                                team2Vals["pointsagainst"] = team.pointsagainst;
                                team2Vals["playoffs"] = team.playoffs;
                            }
                            compareTeams();
                        })
                    }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
                    console.error(err);
                    resultContainer.innerHTML = err
                    resultContainer.appendChild(tr);
                });
            }
            function compareTeams(){
                let challenger_points = 0;
                if (!team2Vals.team || !team1Vals.team){
                    document.getElementById("result").innerHTML="";
                    return;
                }
                if (team2Vals.gameswon > team1Vals.gameswon)
                    challenger_points++;
                else if (team2Vals.gameswon < team1Vals.gameswon)
                    challenger_points--;
                if (team2Vals.pointsfor > team1Vals.pointsfor)
                    challenger_points++;
                else if (team2Vals.pointsfor < team1Vals.pointsfor)
                    challenger_points--;
                if (team2Vals.pointsagainst < team1Vals.pointsagainst)
                    challenger_points++;
                else if (team2Vals.pointsagainst > team1Vals.pointsagainst)
                    challenger_points--;
                if (team2Vals.playoffs == "Yes")
                    challenger_points++;
                if (team1Vals.playoffs == "Yes")
                    challenger_points--;
                if (challenger_points > 0)
                    document.getElementById("result").innerHTML = team2Vals.team + " has better chances of winning over "+team1Vals.team;
                else if (challenger_points < 0)
                    document.getElementById("result").innerHTML = team1Vals.team + " has better chances of winning over "+team2Vals.team;
                else if (challenger_points == 0)
                    document.getElementById("result").innerHTML = team2Vals.team + " has same chances of winning as "+team1Vals.team;
            }
            function showTeam1Stats(){
                console.debug("inside showTeam2Stats()");
                var e = document.getElementById("team1_name");
                var value = e.value;
                var text = e.options[e.selectedIndex].text;
                if (text != "Select Team"){
                    console.log("Team1:"+text);
                    showStats(text, "team1_stats");
                } else {
                    document.getElementById("team1_stats").innerHTML = "";
                    team1Vals["team"] = "";
                    document.getElementById("result").innerHTML="";
                }
            }
            function showTeam2Stats(){
                console.debug("inside showTeam2Stats()");
                var e = document.getElementById("team2_name");
                var value = e.value;
                var text = e.options[e.selectedIndex].text;
                if (text != "Select Challenger"){
                    console.log("Team2:"+text);
                    showStats(text, "team2_stats");
                } else {
                    document.getElementById("team2_stats").innerHTML = "";
                    team2Vals["team"] = "";
                    document.getElementById("result").innerHTML="";
                }
            }
            load();
        </script>
        <table id="teams" width="100%">
            <tr><td>Team</td><td>Challenger</td></tr>
            <tr><td id="team1"></td><td id="team2"></td></tr>
            <tr><td id="team1_stats"></td><td id="team2_stats"></td></tr>
        </table>
        <!--<p id="team_created_message"></p>
        <table width="100%">
            <tr><td>Team</td><td><input type="text" id="t1"></td></tr>
            <tr><td>Division</td><td><input type="text" id="t2"></td></tr>
            <tr><td>Games Played</td><td><input type="text" id="t3"></td></tr>
            <tr><td>Games Won</td><td><input type="text" id="t4"></td></tr>
            <tr><td>Games Lost</td><td><input type="text" id="t15"></td></tr>
            <tr><td>Games Drawn</td><td><input type="text" id="t5"></td></tr>
            <tr><td>Games Played At Home</td><td><input type="text" id="t6"></td></tr>
            <tr><td>Games Played Away</td><td><input type="text" id="t7"></td></tr>
            <tr><td>Games Won At Home</td><td><input type="text" id="t8"></td></tr>
            <tr><td>Games Won Away</td><td><input type="text" id="t9"></td></tr>
            <tr><td>Games Lost At Home</td><td><input type="text" id="t10"></td></tr>
            <tr><td>Games Lost Away</td><td><input type="text" id="t11"></td></tr>
            <tr><td>Points For</td><td><input type="text" id="t12"></td></tr>
            <tr><td>Points Against</td><td><input type="text" id="t13"></td></tr>
            <tr><td>Playoffs</td><td><input type="text" id="t14"></td></tr>            
        </table>
		
        <button onclick="createTeam()" class="btn btn-primary">Create</a>-->
		
        
    </p>
    
</div>