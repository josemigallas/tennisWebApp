import {Player, validatePlayer} from "./player";
import {Match, ChildMatch} from "./match";
import * as utils from "../common/utils";

export class Tournament {
    constructor() {
        this.players = [];
        this.matches = [];
    }

    addPlayer(player) {
        this.players.push(new Player(player.name, player.rank));
    }

    addMatch(match) {
        this.matches.push(match);
    }

    generate() {
        generateTournamentBracket(this);
    }

    validatePlayer(player) {
        var validationResult = validatePlayer(player);

        if (validationResult.success && this.existsPlayer(player)) {
            validationResult.error += "Player already enrolled";
            validationResult.success = false;
        }

        return validationResult;
    }

    existsPlayer(player) {
        return this.players.find(function() {
            return player.name.toLowerCase() === this.name.toLowerCase()
                || player.rank === this.rank;
        }, player);
    }
}

function generateTournamentBracket(tournament) {
    tournament.players.sort( function(p1, p2) {
        return p1.rank - p2.rank;
    });

    var oddPlayers = tournament.players.length % 2;
    if (oddPlayers) {
        var match = new Match(1);
        match.addPlayer(tournament.players[0]);
        tournament.addMatch(match);
    }

    var bestPlayers = tournament.players.slice(oddPlayers, tournament.players.length / 2 + oddPlayers);
    var worstPlayers = tournament.players.slice(tournament.players.length / 2);

    while (bestPlayers.length) {
        var match = new Match(1);
        match.addPlayer(utils.spliceItemRandomly(bestPlayers));
        match.addPlayer(utils.spliceItemRandomly(worstPlayers));
        tournament.addMatch(match);
    }

    for (var i = 0; i < tournament.matches.length - 1; i += 2) {
        tournament.addMatch(new ChildMatch(
            tournament.matches[i],
            tournament.matches[i+1]
        ));
    }
}
