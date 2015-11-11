import $ from "jquery";
import * as tournamentAlerts from "./tournamentAlerts";

var tournament;

export function init(t) {
    tournament = t;

    generateHTMLTournamentBracket();
}

function generateHTMLTournamentBracket() {
    cleanBracket();
    divideBracketVerticallyInRounds(tournament.getRounds());
    appendAllMatchesWithSpacesToHtml(tournament.matches);
    bindClickEventOnWinButtons(tournament.matches);
}

function cleanBracket() {
    $("#tournamentBracket").empty();
}

function divideBracketVerticallyInRounds(rounds) {
    var colSize = 100/rounds;

    for (var r = 1; r <= rounds; r++) {
        $("#tournamentBracket").append(
            `<div class="col-xs-1" id="round${r}" style="width: ${colSize}%; padding: 0;"></div>`
        );
    }
}

function appendAllMatchesWithSpacesToHtml() {
    tournament.matches.forEach( function(match, i, matches) {
        if (match.round > 1) {
            appendTransparenSpacesToHtml(match.round, matches[i-1].round);
        }
        appendMatchHtmlPanel(match, i);
    });
}

function appendTransparenSpacesToHtml(round, lastRound) {
    $(`#round${round}`).append(
        generateHtmlTransparentSpaces(round, lastRound)
    );
}

function generateHtmlTransparentSpaces(round, lastRound) {
    var space = "";

    if (round !== lastRound) {
        if (round > 1) {
            space += `<div class="panel panel-default box-bracket-ghost-med"></div>`;
        }
        if (round > 2) {
            space += `<div class="panel panel-default box-bracket-ghost"></div>`.repeat(round - 2);
        }

    } else {
        space += `<div class="panel panel-default box-bracket-ghost"></div>`;
    }

    return space;
}

function appendMatchHtmlPanel(match, i) {
    $(`#round${match.round}`).append(
        generateMatchHtmlPanel(match, i)
    );
}

function generateMatchHtmlPanel(match, i) {
    var html = `<div class="panel panel-default box-bracket"><div>`;

    if (match.players[0]) {
        html += `${match.players[0].name}`;
        html += match.winner ? "" : ` <a id="match${i}player0">win</a>`;
    }

    html += "</div><div>";

    if (match.players[1]) {
        html += `${match.players[1].name}`;
        html += match.winner ? "" : ` <a id="match${i}player1">win</a>`;
    }

    html += "</div></div>";

    return html;
}

function bindClickEventOnWinButtons() {
    for (var m = 0; m < tournament.matches.length; m++) {
        $(`#match${m}player0`).click(createOnClickCallback(tournament.matches[m], 0));
        $(`#match${m}player1`).click(createOnClickCallback(tournament.matches[m], 1));
    }
}

function createOnClickCallback(match, playerIndex) {
    return function() {
        if (match.players.length === 2) {
            if (isFinalMatch(match)) {
                setFinalWinner(match, playerIndex);
            } else {
                match.setWinner(playerIndex);
            }
            generateHTMLTournamentBracket(tournament);
        } else {
            tournamentAlerts.showMatchNotFinished();
        }
    };
}

function isFinalMatch(match) {
    return tournament.getRounds() === match.round;
}

function setFinalWinner(match, playerIndex) {
    tournamentAlerts.showWinner(match.players[playerIndex]);
    match.setWinner(playerIndex);
}
