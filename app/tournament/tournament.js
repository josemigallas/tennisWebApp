import {Player, validatePlayer} from "./player";
import {Match, MatchFromPrevRound} from "./match";
import * as utils from "../common/utils";

export class Tournament {
    constructor() {
        this.players = [];
        this.matches = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    addMatch(match) {
        this.matches.push(match);
    }

    getNumberOfRounds() {
        return this.matches[this.matches.length - 1].round;
    }

    generate() {
        generateTournamentBracket(this);
    }

    validatePlayer(player) {
        var validationResult = validatePlayer(player);

        if (validationResult.success && this.existsPlayer(player)) {
            validationResult.error.push("Player already enrolled");
            validationResult.success = false;
        }

        return validationResult;
    }

    existsPlayer(player) {
        return undefined !== this.players.find( function(p) {
            return p.name.toLowerCase() === this.name.toLowerCase()
            || p.rank === this.rank;
        }, player);
    }
}

function sortPlayersByRank(tournament) {
    tournament.players.sort( function(p1, p2) {
        return p1.rank - p2.rank;
    });
}

function generateTournamentBracket(tournament) {
    sortPlayersByRank(tournament);
    generateFirstRoundMatches(tournament);
    generateRestOfMatches(tournament);
}

function generateFirstRoundMatches(tournament) {
    var oddNumberPlayers = tournament.players.length % 2;

    pairUpGoodWithBadPlayersRandomly(tournament, oddNumberPlayers);

    if (oddNumberPlayers) {
        bestPlayerDoesntPlayFirstRound(tournament);
    }
}

function bestPlayerDoesntPlayFirstRound(tournament) {
    var match = new Match(1);
    match.addPlayer(tournament.players[0]);
    tournament.addMatch(match);
}

function pairUpGoodWithBadPlayersRandomly(tournament, oddNumberPlayers) {
    var bestPlayers = tournament.players.slice(oddNumberPlayers, tournament.players.length / 2 + oddNumberPlayers);
    var worstPlayers = tournament.players.slice(tournament.players.length / 2 + oddNumberPlayers);

    while (bestPlayers.length) {
        var match = new Match(1);
        match.addPlayer(utils.getAndRemoveItemRandomlyFromArray(bestPlayers));
        match.addPlayer(utils.getAndRemoveItemRandomlyFromArray(worstPlayers));
        tournament.addMatch(match);
    }
}

function generateRestOfMatches(tournament) {
    for (var i = 0; i < tournament.matches.length - 1; i += 2) {
        tournament.addMatch(new MatchFromPrevRound(
            tournament.matches[i],
            tournament.matches[i+1]
        ));
    }
}
