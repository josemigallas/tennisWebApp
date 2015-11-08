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
        var html = `<div class="panel panel-default box-bracket"><div>`;

        if (match.players[0]) {
            html += `${match.players[0].name}`;
            html += match.isFinished ? "" : ` <a id="match${index}player0">win</a>`;
        }

        html += "</div><div>";

        if (match.players[1]) {
            html += `${match.players[1].name}`;
            html += match.isFinished ? "" : ` <a id="match${index}player1">win</a>`;
        }

        html += "</div></div>";

        $(`#round${match.round}`).append(html);
    });
}

function bindClickEventOnWinButtons(matches) {
    for (var m = 0; m < matches.length-1; m++) {
        $(`#match${m}player0`).click(createOnClickCallback(m, 0));
        $(`#match${m}player1`).click(createOnClickCallback(m, 1));
    }
}

function createOnClickCallback(match, player) {
    return function() {
        if (tournament.matches[match].players.length === 2) {
            tournament.matches[match].setWinner(player);
            generateHTMLTournamentBracket(tournament);
        } else {
            alert("The match has not even started yet!");
        }
    };
}
