<h2>Create NFL Team Data</h2>
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
            const update_fetch = url + '/update';
            const read_fetch = url + '/';
			const params = new Proxy(new URLSearchParams(window.location.search), {
				get: (searchParams, prop) => searchParams.get(prop),
			});
			
			let teamName = params.name;
			console.log("Request Parameter: name -- " + teamName);
			
			
			
			function loadTeam() {
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
							document.getElementById("team_name").value = team.team;
							document.getElementById("team_division").value = team.division;
							document.getElementById("games_played").value = team.gamesplayed;
							document.getElementById("games_won").value = team.gameswon;
							document.getElementById("games_lost").value = team.gameslost;
							document.getElementById("games_drawn").value = team.gamesdrawn;
							document.getElementById("games_played_at_home").value = team.gamesplayedathome;
							document.getElementById("games_played_away").value = team.gamesplayedaway;
							document.getElementById("games_won_at_home").value = team.gameswonathome;
							document.getElementById("games_won_away").value = team.gameswonaway;
							document.getElementById("games_lost_at_home").value = team.gameslostathome;
							document.getElementById("games_lost_away").value = team.gameslostaway;
							document.getElementById("points_for").value = team.pointsfor;
							document.getElementById("points_against").value = team.pointsagainst;
							document.getElementById("play_offs").value = team.playoffs;
							document.getElementById("teamid").value = team.id;
                        })
                    }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
                    console.error(err);
                    resultContainer.innerHTML = err
                    resultContainer.appendChild(tr);
                });
            }
			
			function getTeamJson(update) {
				var team_name = document.getElementById("team_name");
                var team_division = document.getElementById("team_division");
                var games_played = document.getElementById("games_played");
                var games_won = document.getElementById("games_won");
                var games_drawn = document.getElementById("games_drawn");
                var games_played_at_home = document.getElementById("games_played_at_home");
                var games_played_away = document.getElementById("games_played_away");
                var games_won_at_home = document.getElementById("games_won_at_home");
                var games_won_away = document.getElementById("games_won_away");
                var games_lost_at_home = document.getElementById("games_lost_at_home");
                var games_lost_away = document.getElementById("games_lost_away");
                var points_for = document.getElementById("points_for");
                var points_against = document.getElementById("points_against");
                var play_offs = document.getElementById("play_offs");
                var games_lost = document.getElementById("games_lost");
                let reqData = "{\"division\":\""
                + team_division.value 
                + "\",\"gamesdrawn\":" 
                + games_drawn.value 
                + ",\"gameslostathome\":" 
                + games_lost_at_home.value 
                + ",\"gameslost\":" 
                + games_lost.value 
                + ",\"gameslostaway\":" 
                + games_lost_away.value 
                + ",\"gamesplayed\":" 
                + games_played.value 
                + ",\"gamesplayedathome\":" 
                + games_played_at_home.value 
                + ",\"gamesplayedaway\":" 
                + games_played_away.value 
                + ",\"gameswon\":" 
                + games_won.value 
                + ",\"gameswonathome\":" 
                + games_won_at_home.value 
                + ",\"gameswonaway\":" 
                + games_won_away.value 
                + ",\"playoffs\":\"" 
                + play_offs.value 
                + "\",\"pointsagainst\":" 
                + points_against.value 
                + ",\"pointsfor\":" 
                + points_for.value 
                + ",\"team\":\"" 
                + team_name.value
				+ "\"";
				
				
				if (update){
					reqData += ",\"id\":"; 
					reqData += document.getElementById("teamid").value;
				}
				
				reqData += "}";
				console.log(reqData);
				return reqData;
			}
			
			function backToTeams(){
				window.location.assign("sportscrud");
			}
            
            function createTeam() {
                let reqData = getTeamJson();
                // prepare fetch options
                const read_options = {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'omit', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: reqData
                };     // fetch the data from API
                fetch(create_fetch, read_options)
                // response is a RESTful "promise" on any successful fetch
                .then(response => {
                    // check for response errors
                    if (response.status !== 200) {
					console.log(response);
						response.json().then(teams => {
							console.log(teams);
							resultContainer.innerHTML ="Could not create '"+team_name.value+"' Team. Error: " + teams.message;
						})
                        return;
                    }
                    // valid response will have json data
                    response.json().then(teams => {
                        console.log(teams);
                        resultContainer.innerHTML ="Successfully created '"+team_name.value+"' Team. (page with automatically refresh to show teams)";
						const myTimeout = setTimeout(backToTeams, 5000);
                    })
                }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
                    console.error(err);
                    resultContainer.innerHTML = err;
                });
            }
			
			function updateTeam() {
                let reqData = getTeamJson(true);
                // prepare fetch options
                const read_options = {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'omit', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: reqData
                };     // fetch the data from API
                fetch(update_fetch, read_options)
                // response is a RESTful "promise" on any successful fetch
                .then(response => {
                    // check for response errors
                    if (response.status !== 200) {
					console.log(response);
						response.json().then(teams => {
							console.log(teams);
							resultContainer.innerHTML ="Could not update '"+team_name.value+"' Team. Error: " + teams.message;
						})
                        return;
                    }
                    // valid response will have json data
                    response.json().then(teams => {
                        console.log(teams);
                        resultContainer.innerHTML ="Successfully updated '"+team_name.value+"' Team. (page with automatically refresh to show teams)";
						const myTimeout = setTimeout(backToTeams, 5000);
                    })
                }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
                    console.error(err);
                    resultContainer.innerHTML = err;
                });
            }
        </script>
        <!--<table width="100%">
            <tr><td>Team</td><td>Challenger</td></tr>
            <tr><td id="team1"></td><td id="team2"></td></tr>
            <tr><td id="team1_stats"></td><td id="team2_stats"></td></tr>
        </table>-->
        <table width="100%">
            <tr><td>Team</td><td><input type="text" id="team_name"></td></tr>
            <tr><td>Division</td>
				<td>
					<select id="team_division">
					<option value="">Select a Division</option>
					<option value="NFC East">NFC East</option>
					<option value="NFC West">NFC West</option>
					<option value="NFC North">NFC North</option>
					<option value="NFC South">NFC South</option>
					</select>
					<!--<input type="text" id="team_division">-->
				</td>
			</tr>
            <tr><td>Games Played</td><td><input type="text" id="games_played"></td></tr>
            <tr><td>Games Won</td><td><input type="text" id="games_won"></td></tr>
            <tr><td>Games Lost</td><td><input type="text" id="games_lost"></td></tr>
            <tr><td>Games Drawn</td><td><input type="text" id="games_drawn"></td></tr>
            <tr><td>Games Played At Home</td><td><input type="text" id="games_played_at_home"></td></tr>
            <tr><td>Games Played Away</td><td><input type="text" id="games_played_away"></td></tr>
            <tr><td>Games Won At Home</td><td><input type="text" id="games_won_at_home"></td></tr>
            <tr><td>Games Won Away</td><td><input type="text" id="games_won_away"></td></tr>
            <tr><td>Games Lost At Home</td><td><input type="text" id="games_lost_at_home"></td></tr>
            <tr><td>Games Lost Away</td><td><input type="text" id="games_lost_away"></td></tr>
            <tr><td>Points For</td><td><input type="text" id="points_for"></td></tr>
            <tr><td>Points Against</td><td><input type="text" id="points_against"></td></tr>
            <tr><td>Playoffs</td>
				<td>
					<select id="play_offs">
					<option value="">Playoffs</option>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
					</select><!--<input type="text" id="play_offs">-->
				</td>
			</tr>
        </table>
        <button id="createBtn" onclick="createTeam()" type="button">Create Team</button>
		<input type="hidden" id="teamid"/>
		<script>
		if (teamName != null){
			document.getElementById("createBtn").setAttribute("onclick", "updateTeam()");
			document.getElementById("createBtn").innerHTML = 'Update Team';
			loadTeam();
		} else{
			document.getElementById("createBtn").setAttribute("onclick", "createTeam()");
			document.getElementById("createBtn").innerHTML = 'Create Team';
		}
		</script>
    </p>
    
</div>