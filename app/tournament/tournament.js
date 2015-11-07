import {Player, validatePlayer} from "./player";
import * as match from "./match";
import * as utils from "../common/utils";

export class Tournament {
    constructor() {
        this.players = [];
        this.matches = [];
    }

    addPlayer(player) {
        this.players.push(new Player(player.name, player.rank));
    }

    generate() {
        this.fillUpWithGhostIfNeeded();
        this.generateEmptyMatches();
        this.generateTournamentBracket();
        this.pairUpPlayers();
    }

    fillUpWithGhostIfNeeded() {
        if (this.needGhostPlayers()){
            this.fillUpWithGhosts();
        }
    }

    enaughPlayers() {
        return this.players.length >= 2;
    }

    needGhostPlayers() {
        return !Number.isInteger(Math.log2(this.players.length));
    }

    fillUpWithGhosts() {
        var goodNumber = parseInt(Math.pow(10, this.players.length.toString(2).length), 2);
        var i = 1;
        while (this.players.length < goodNumber) {
            this.addPlayer(new Player(`Ghost${i++}`, 1));
        }
    }

    generateEmptyMatches() {
        for (var i=0; i<this.totalMatches(); i++) {
            this.matches.push(new match.Match());
        }
    }

    totalMatches() {
        return this.players.length - 1;
    }

    generateTournamentBracket() {
        var totalRounds = this.totalRounds();

        this.matches.forEach( function(match, i, matches) {
            var round = totalRounds - parseInt(Math.log2(i + 1));
            if (round > 1) {
                match.round = round;
                match.parents[0] = matches[i*2+1];
                match.parents[1] = matches[i*2+2];
            }
        });
    }

    totalRounds() {
        return Math.log2(this.players.length);
    }

    pairUpPlayers() {
        var playersCopy = this.players.slice();
        for (var match of this.matches) {
            if (match.round == 1) {
                match.addPlayer(utils.spliceItemRandomly(playersCopy));
                match.addPlayer(utils.spliceItemRandomly(playersCopy));
            }
        }
    }

    validatePlayer(player) {
        var validationResult = validatePlayer(player);

        if (validationResult.success && this.players.find(this.isEnrolled, player)) {
            validationResult.error += "Player already enrolled";
            validationResult.success = false;
        }

        return validationResult;
    }

    isEnrolled(player) {
        return player.name.toLowerCase() === this.name.toLowerCase();
    }
}
