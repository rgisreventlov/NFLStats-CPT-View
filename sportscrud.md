<h2>Manage NFL Team Data</h2>
<button onclick="createNewTeam()" type="button">Create a Team</button> 
<div class="card-body">
	<p style="color:red" id="result"></p>
    <p class="card-text">
		
        <script>
            // prepare URL's to allow easy switch from deployment and localhost
            const url = "https://fnvs.duckdns.org/api/nflteam";
            //const url = "http://127.0.0.1:8679/api/nflteam";
			const resultContainer = document.getElementById("result");
            const read_fetch = url + '/';
			const delete_fetch = url + '/delete';
            
			function createNewTeam(){
                window.location.assign("sportscrud-create");
            }
			
			function editTeam(teamName){
                window.location.assign("sportscrud-create?name="+teamName);
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
						console.log(response);
						response.json().then(teams => {
							console.log(teams);
							resultContainer.innerHTML ="Could not create '"+t1.value+"' Team. Error: " + teams.message;
						})
                        return;
                    }
                    // valid response will have json data
                    response.json().then(teams => {
                        console.log(teams);
                        let teamtable = "<table border='1' style='border-collapse: separate;'><tr><th>Team</th><th>Division</th><th>Games Played</th><th>Games Won</th><th>Games Lost</th><th>Games Drawn</th><th>Games Played At Home</th><th>Games Played Away</th><th>Games Won At Home</th><th>Games Won Away</th><th>Games Lost At Home</th><th>Games Lost Away</th><th>Points For</th><th>Points Against</th><th>Playoffs</th><th>Actions</th></tr>"
                        for (let team in teams) {
                            teamtable += "<tr><td>" + teams[team].team + "</td><td>" + teams[team].division + "</td><td><div contenteditable>" + teams[team].gamesplayed + "</div></td><td onchange='test()'><div contenteditable>" + teams[team].gameswon + "</div></td><td><div contenteditable>" + teams[team].gameslost + "</div></td><td><div contenteditable>" + teams[team].gamesdrawn + "</div></td><td><div contenteditable>" + teams[team].gamesplayedathome + "</div></td><td><div contenteditable>" + teams[team].gamesplayedaway + "</div></td><td><div contenteditable>" + teams[team].gameswonathome + "</div></td><td><div contenteditable>" + teams[team].gameswonaway + "</div></td><td><div contenteditable>" + teams[team].gameslostathome + "</div></td><td><div contenteditable>" + teams[team].gameslostaway + "</div></td><td><div contenteditable>" + teams[team].pointsfor + "</div></td><td><div contenteditable>" + teams[team].pointsagainst + "</div></td><td><div contenteditable>" + teams[team].playoffs + "</div></td><td><a href=\"javascript:editTeam('"+teams[team].team+"')\"><i style='font-size:24px' class='fas fa-edit'></i></a><a href=\"javascript:deleteTeam('"+teams[team].id+"','"+teams[team].team+"')\"><i style='font-size:24px' class='fas fa-trash'></i></a></td></tr>";
                        }
                        teamtable += "</table>";
                        
                        document.getElementById("teamtable").innerHTML = teamtable;
                    })
                }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
					console.error(err);
					resultContainer.innerHTML = err;
                });
            }
			
			function deleteTeam(teamId, teamName) {
                // prepare fetch options
				let delete_fetch_url = delete_fetch + "?id="+teamId;
                const read_options = {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                },
                };     // fetch the data from API
                fetch(delete_fetch_url, read_options)
                // response is a RESTful "promise" on any successful fetch
                .then(response => {
                    // check for response errors
                    if (response.status !== 200) {
						console.log(response);
						response.json().then(teams => {
							console.log(teams);
							resultContainer.innerHTML ="Could not delete team " + teamName +"("+teamId+"). Error: " + teams.message;
						})
                        return;
                    }
                    // valid response will have json data
                    response.json().then(teams => {
                        console.log(teams);
                        resultContainer.innerHTML ="Successfully deleted team " + teamName +"("+teamId+")";
						load();
                    })
                }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
					console.error(err);
					resultContainer.innerHTML = err;
                });
            }
            
            load();
        </script>
        <h3 class="card-title">Team Stats at a Glance</h3>
        <p id="teamtable"></p>
    </p>
    
</div>