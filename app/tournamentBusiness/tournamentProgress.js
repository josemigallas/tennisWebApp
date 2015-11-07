import $ from "jquery";
import {Tournament} from "../tournament/tournament";

export function init(tournament) {
    printBracket(tournament);
}

function printBracket(tournament) {
    divideBracketInColumns(tournament.matches);
    updateMatchesInHTML(tournament.matches);
}

function divideBracketInColumns(matches) {
    var lastRound = matches[matches.length - 1].round
    var colSize = 12/lastRound;

    for (var r = 1; r <= lastRound; r++) {
        $("#tournamentBracket").append(
            `<div class="col-xs-${colSize}" id="round${r}"></div>`
        );
    }
}

function updateMatchesInHTML(matches) {
    matches.forEach( function(match, index) {
        $(`#round${match.round}`).append(
            `<div class="panel panel-default box-bracket">
            <div>${match.players[0].name} <a id="match${index}player0">win</a></div>
            <div>${match.players[1].name} <a id="match${index}player1">win</a></div>
            </div>`
        );
    });
}
