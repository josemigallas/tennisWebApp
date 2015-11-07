import $ from "jquery";

var tournament;
var round1Matches = 0;

export function init(t) {
    tournament = t;

    tournament.matches.forEach( function(match) {
        if (match.round === 1) round1Matches++;
    });

    generateHTMLTournamentBracket(tournament);
}

function generateHTMLTournamentBracket(tournament) {
    cleanBracket();
    divideBracketVerticallyInRounds(tournament.getRounds());
    printAllMatchesInHTML(tournament.matches);
    bindClickEventOnWinButtons(tournament.matches);
}

function cleanBracket() {
    $("#tournamentBracket").empty();
}

function divideBracketVerticallyInRounds(rounds) {
    var colSize = 12/rounds;

    for (var r = 1; r <= rounds; r++) {
        $("#tournamentBracket").append(
            `<div class="col-xs-${colSize}" id="round${r}"></div>`
        );
    }
}

function printAllMatchesInHTML(matches) {
    matches.forEach( function(match, index, matches) {
        var p0 = match.players[0] === undefined ? "..." : match.players[0].name;
        var p1 = match.players[1] === undefined ? "..." : match.players[1].name;

        $(`#round${match.round}`).append(
            `<div class="panel panel-default box-bracket">
            <div>${p0} <a id="match${index}player0">win</a></div>
            <div>${p1} <a id="match${index}player1">win</a></div>
            </div>`
        );
    });
}

function bindClickEventOnWinButtons(matches) {
    for (var m = 0; m < matches.length; m++) {
        $(`#match${m}player0`).click(createOnClickCallback(m-m%2, m%2, 0));
        $(`#match${m}player1`).click(createOnClickCallback(m-m%2, m%2, 1));
    }
}

function createOnClickCallback(m, parentIndex, playerIndex) {
    return function() {
        tournament.matches[round1Matches - m/2 + m].setWinnerFromParent(parentIndex, playerIndex);
        generateHTMLTournamentBracket(tournament);
    };
}
