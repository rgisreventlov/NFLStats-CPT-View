# NFL

<html>
<body>

<table style="width:100%" id="table">
  <tr>
    <th>Check for your Favorite NFL Team! Your favorite team's statistics will show the number of games they have played, their overall regular season record, and different statistics about the number of points they have scored and allowed. The last column shows if your team made the playoffs! You may also use the match predictor that uses an algorithm to predict which team will win using the team statistics!</th>
  </tr>
</table>
<h2>NFL Team Showdown</h2>
<div class="card-body">
    <p id="result"></p>
    <p class="card-text">
        <script>
            const team1Vals = {};
            const team2Vals = {};
            const resultContainer = document.getElementById("result");
            // prepare URL's to allow easy switch from deployment and localhost
            const url = "https://fnvs.duckdns.org/api/nflteam"
            //const url = "https://flask.nighthawkcodingsociety.com/api/users"
            const create_fetch = url + '/create';
            const read_fetch = url + '/';
            function test(){
                console.log("TD Change");
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
                        const tr = document.createElement("tr");
                        const td = document.createElement("td");
                        td.innerHTML = errorMsg;
                        tr.appendChild(td);
                        return;
                    }
                    // valid response will have json data
                    response.json().then(teams => {
                        console.log(teams);
                        let team1Select = "<select name='team1_name' id='team1_name' onchange='showTeam1Stats()' onfocus='showTeam1Stats()'><option value=''>Select Team</option>";
                        let team2Select = "<select name='team2_name' id='team2_name' onchange='showTeam2Stats()' onfocus='showTeam2Stats()'><option value=''>Select Challenger</option>";
                        let text = "<table border='1' style='border-collapse: separate;'><tr><th>Team</th><th>Division</th><th>Games Played</th><th>Games Won</th><th>Games Lost</th><th>Games Drawn</th><th>Games Played At Home</th><th>Games Played Away</th><th>Games Won At Home</th><th>Games Won Away</th><th>Games Lost At Home</th><th>Games Lost Away</th><th>Points For</th><th>Points Against</th><th>Playoffs</th></tr>"
                        for (let team in teams) {
                            team1Select+= "<option value='"+teams[team].team+"'>"+teams[team].team+"</option>";
                            team2Select+= "<option value='"+teams[team].team+"'>"+teams[team].team+"</option>";
                            text += "<tr><td>" + teams[team].team + "</td><td>" + teams[team].division + "</td><td><div contenteditable>" + teams[team].gamesplayed + "</div></td><td onchange='test()'><div contenteditable>" + teams[team].gameswon + "</div></td><td><div contenteditable>" + teams[team].gameslost + "</div></td><td><div contenteditable>" + teams[team].gamesdrawn + "</div></td><td><div contenteditable>" + teams[team].gamesplayedathome + "</div></td><td><div contenteditable>" + teams[team].gamesplayedaway + "</div></td><td><div contenteditable>" + teams[team].gameswonathome + "</div></td><td><div contenteditable>" + teams[team].gameswonaway + "</div></td><td><div contenteditable>" + teams[team].gameslostathome + "</div></td><td><div contenteditable>" + teams[team].gameslostaway + "</div></td><td><div contenteditable>" + teams[team].pointsfor + "</div></td><td><div contenteditable>" + teams[team].pointsagainst + "</div></td><td><div contenteditable>" + teams[team].playoffs + "</div></td></tr>";
                        }
                        text += "</table>";
                        team1Select+= "</select>";
                        team2Select+= "</select>";
                        document.getElementById("team1").innerHTML = team1Select;
                        document.getElementById("team2").innerHTML = team2Select;
                        document.getElementById("demo").innerHTML = text;
                    })
                }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
                console.error(err);
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.innerHTML = err;
                tr.appendChild(td);
                resultContainer.appendChild(tr);
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
                            const tr = document.createElement("tr");
                            const td = document.createElement("td");
                            td.innerHTML = errorMsg;
                            tr.appendChild(td);
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
                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    td.innerHTML = err;
                    tr.appendChild(td);
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
            function createTeam() {
                var t1 = document.getElementById("t1");
                var t2 = document.getElementById("t2");
                var t3 = document.getElementById("t3");
                var t4 = document.getElementById("t4");
                var t5 = document.getElementById("t5");
                var t6 = document.getElementById("t6");
                var t7 = document.getElementById("t7");
                var t8 = document.getElementById("t8");
                var t9 = document.getElementById("t9");
                var t10 = document.getElementById("t10");
                var t11 = document.getElementById("t11");
                var t12 = document.getElementById("t12");
                var t13 = document.getElementById("t13");
                var t14 = document.getElementById("t14");
                var t15 = document.getElementById("t15");
                let reqData = "{\"division\":\""
                + t2.value 
                + "\",\"gamesdrawn\":" 
                + t5.value 
                + ",\"gameslostathome\":" 
                + t10.value 
                + ",\"gameslost\":" 
                + t15.value 
                + ",\"gameslostaway\":" 
                + t11.value 
                + ",\"gamesplayed\":" 
                + t3.value 
                + ",\"gamesplayedathome\":" 
                + t6.value 
                + ",\"gamesplayedaway\":" 
                + t7.value 
                + ",\"gameswon\":" 
                + t4.value 
                + ",\"gameswonathome\":" 
                + t8.value 
                + ",\"gameswonaway\":" 
                + t9.value 
                + "4,\"playoffs\":\"" 
                + t14.value 
                + "\",\"pointsagainst\":" 
                + t13.value 
                + ",\"pointsfor\":" 
                + t12.value 
                + ",\"team\":\"" 
                + t1.value 
                + "\"}";
                console.log(reqData);
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
                        const errorMsg = 'Database read error: ' + response.status;
                        console.log(errorMsg);
                        const tr = document.createElement("tr");
                        const td = document.createElement("td");
                        td.innerHTML = errorMsg;
                        tr.appendChild(td);
                        return;
                    }
                    // valid response will have json data
                    response.json().then(teams => {
                        console.log(teams);
                        load();
                        document.getElementById("team_created_message").innerHTML ="Successfully created "+t1.value+" Team";
                    })
                }) 
                // catch fetch errors (ie ACCESS to server blocked)
                .catch(err => {
                    console.error(err);
                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    td.innerHTML = err;
                    tr.appendChild(td);
                    resultContainer.appendChild(tr);
                });
            }
            load();
        </script>
        <table width="100%">
            <tr><td>Team</td><td>Challenger</td></tr>
            <tr><td id="team1"></td><td id="team2"></td></tr>
            <tr><td id="team1_stats"></td><td id="team2_stats"></td></tr>
        </table>
        <p id="team_created_message"></p>
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
        <a onclick="createTeam()" class="btn btn-primary">Create</a>
        <br><br>
        <h5 class="card-title">Team Stats at a Glance</h5>
        <p id="demo"></p>
    </p>
    
</div>