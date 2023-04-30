import threading
import requests
import json
from flask import request, redirect, url_for, session, make_response
from flask_login import LoginManager

# import "packages" from flask
from flask import render_template  # import render_template from "public" flask libraries

# import "packages" from "this" project
from __init__ import app, login_manager  # Definitions initialization

rootUrl = "http://192.168.68.53:8679/api/"

@app.errorhandler(404)  # catch for URL not found
def page_not_found(e):
    return render_template('404.html'), 404

# index page
# there is an option to sign up or login or play game in guest mode
# if the user is logged in, the user's score is saved every time the game ends
# guest mode does not save the scores
@login_manager.user_loader
@app.route('/')
def index():
    session.permanent = False
    return redirect(url_for("nfl_challenge"))

@app.route('/nfl')
def nfl_challenge():
    session.permanent = False
    name = request.args.get('name')
    # check if the name argument is present. Load only that team's data
    if name is None or len(name) == 0:
        url = rootUrl + "/nflteam/"
        teamResponse = requests.get(url=url)
        teamsData = json.loads(teamResponse.text)
        print(teamsData)

        return render_template("nfl_challenge.html", teams_data=teamsData)
    else:
        url = rootUrl + "/nflteam/?name="+name
        teamResponse = requests.get(url=url)
        teamData = json.loads(teamResponse.text)
        print(teamData)
        template_name = 'nfl_team_details.html'
        return render_template(template_name, team_data=teamData)

@app.route('/nfl_compare')
def nfl_compare():
    t1Name = request.args.get('t1')
    t2Name = request.args.get('t2')

    if t1Name is not None and len(t1Name) > 0:
        if t2Name is not None and len(t2Name) > 0:
            challenger_points = 0
            url = rootUrl + "/nflteam/?name="+t1Name
            team1Response = requests.get(url=url)
            team1Vals = json.loads(team1Response.text)
            url = rootUrl + "/nflteam/?name="+t2Name
            team2Response = requests.get(url=url)
            team2Vals = json.loads(team2Response.text)
    
            if (team2Vals["gameswon"] > team1Vals["gameswon"] ):
                challenger_points += 1
            elif (team2Vals["gameswon"] < team1Vals["gameswon"] ):
                challenger_points -= 1
            if (team2Vals["pointsfor"] > team1Vals["pointsfor"] ):
                challenger_points += 1
            elif (team2Vals["pointsfor"] < team1Vals["pointsfor"] ):
                challenger_points -= 1
            if (team2Vals["pointsagainst"] < team1Vals["pointsagainst"] ):
                challenger_points += 1
            elif (team2Vals["pointsagainst"] > team1Vals["pointsagainst"] ):
                challenger_points -= 1
            if (team2Vals["playoffs"] == "Yes" ):
                challenger_points += 1
            if (team1Vals["playoffs"] == "Yes" ):
                challenger_points -= 1
            if (challenger_points > 0):
                return team2Vals["team"] + " has better chances of winning over "+team1Vals["team"]
            elif (challenger_points < 0):
                return team1Vals["team"] + " has better chances of winning over "+team2Vals["team"]
            elif (challenger_points == 0):
                return team2Vals["team"] + " has same chances of winning as "+team1Vals["team"]

@app.route('/nfl_team_stats')
def nfl_team_stats():
    session.permanent = False
    url = rootUrl + "/nflteam/"
    teamResponse = requests.get(url=url)
    teamsData = json.loads(teamResponse.text)
    print(teamsData)
    return render_template("nfl_team_stats.html", teams_data=teamsData)

@app.route('/nfl_team_create')
def nfl_team_create():
    session.permanent = False
    
    return render_template("nfl_team_create.html")
# this runs the application on the development server
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="8096")
