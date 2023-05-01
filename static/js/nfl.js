// prepare URL's to allow easy switch from deployment and localhost
//const url = "https://fnvs.duckdns.org/api/nflteam";
const url = "http://127.0.0.1:8679/api/nflteam";
const resultContainer = document.getElementById("result");
const read_fetch = url + '/';
const delete_fetch = url + '/delete';
const create_fetch = url + '/create';
const update_fetch = url + '/update';
let teamName = "";

function onLoadNFLCreateUpdate(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    
    teamName = params.name;
    console.log("Request Parameter: name -- " + teamName);

    if (teamName != null){
        document.getElementById("createBtn").setAttribute("onclick", "updateTeam()");
        document.getElementById("createBtn").innerHTML = 'Update Team';
        loadTeam();
    } else{
        document.getElementById("createBtn").setAttribute("onclick", "createTeam()");
        document.getElementById("createBtn").innerHTML = 'Create Team';
    }
}

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
            resultContainer.innerHTML ="Successfully created '"+team_name.value+"' Team. ";
            //const myTimeout = setTimeout(backToTeams, 5000);
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
            resultContainer.innerHTML ="Successfully updated '"+team_name.value+"' Team.";
            //const myTimeout = setTimeout(backToTeams, 5000);
        })
    }) 
    // catch fetch errors (ie ACCESS to server blocked)
    .catch(err => {
        console.error(err);
        resultContainer.innerHTML = err;
    });
}

function editTeam(teamName){
    window.location.assign("nfl_team_create?name="+teamName);
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

function showTeam1Stats(){
    console.debug("inside showTeam1Stats()");
    var t1Name  = $('#team1_name').val();                 
    if (t1Name != ""){
        console.log("Team1:"+t1Name);
        //showStats(text, "team1_stats");
        $(document).ready(function() {
            $('#team1_stats').load('nfl?name='+encodeURIComponent(t1Name), function( response, status, xhr ) {
                if ( status == "success" ) {
                    var t2Name  = $('#team2_name').val();  
                    if (t2Name != ""){
                        console.log("Team2:"+t2Name);
                        $('#result').load('nfl_compare?t1='+encodeURIComponent(t1Name)+'&t2='+encodeURIComponent(t2Name));
                    }
                }
            });
        });
    } else {
        $('#team1_stats').html("");
        $('#result').html("");
    }
}
function showTeam2Stats(){
    console.debug("inside showTeam2Stats()");
    //var t2 = document.getElementById("team2_name");
    var t2Name  = $('#team2_name').val();                
    if (t2Name != ""){
        console.log("Team2:"+t2Name);
        //showStats(text, "team2_stats");
        $(document).ready(function() {
            $('#team2_stats').load('nfl?name='+encodeURIComponent(t2Name), function( response, status, xhr ) {
                if ( status == "success" ) {
                    var t1Name  = $('#team1_name').val();          
                    if (t1Name != ""){
                        console.log("Team1:"+t1Name);
                        $('#result').load('nfl_compare?t2='+encodeURIComponent(t2Name)+'&t1='+encodeURIComponent(t1Name));
                    }
                }
            });
        });
    } else {
        $('#team2_stats').html("");
        $('#result').html("");
    }
}