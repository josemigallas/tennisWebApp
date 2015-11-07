import {Player, validatePlayer} from "./player";
import {Match} from "./match";
import * as utils from "../common/utils";

export class Tournament {
    constructor() {
        this.players = [];
        this.matches = [];
    }

    addPlayer(player) {
        this.players.push(new Player(player.name, player.rank));
    }

    needGhostPlayers() {
        return !Number.isInteger(Math.log2(this.players.length));
    }

    generate() {
        fillUpWithGhostIfNeeded(this);
        generateEmptyMatches(this);
        generateTournamentBracket(this);
        pairUpPlayers(this);
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
            return player.name.toLowerCase() === this.name.toLowerCase();
        }, player);
    }
}

function fillUpWithGhostIfNeeded(tournament) {
    if (tournament.needGhostPlayers()){
        fillUpWithGhosts(tournament);
    }
}

function fillUpWithGhosts(tournament) {
    var goodNumber = parseInt(Math.pow(10, tournament.players.length.toString(2).length), 2);
    var i = 1;
    while (tournament.players.length < goodNumber) {
        tournament.addPlayer(new Player(`Ghost${i++}`, 1));
    }
}

function generateEmptyMatches(tournament) {
    var totalMatches = calculateTotalMatches(tournament);
    for (var i=0; i<totalMatches; i++) {
        tournament.matches.push(new Match());
    }
}

function calculateTotalMatches(tournament) {
    return tournament.players.length - 1;
}

function generateTournamentBracket(tournament) {
    var totalRounds = calculateTotalRounds(tournament);

    tournament.matches.forEach( function(match, i, matches) {
        var round = totalRounds - parseInt(Math.log2(i + 1));
        if (round > 1) {
            match.round = round;
            match.parents[0] = matches[i*2+1];
            match.parents[1] = matches[i*2+2];
        }
    });
}

function calculateTotalRounds(tournament) {
    return Math.log2(tournament.players.length);
}

function pairUpPlayers(tournament) {
    var playersCopy = tournament.players.slice();
    for (var match of tournament.matches) {
        if (match.round == 1) {
            match.addPlayer(utils.spliceItemRandomly(playersCopy));
            match.addPlayer(utils.spliceItemRandomly(playersCopy));
        }
    }
}
