import * as player from "./player";
import * as match from "./match";
import * as utils from "../common/utils";

export class Tournament {
    constructor() {
        this.players = [];
        this.matches = [];
    }

    addPlayer(player) {
        if (this.existsAlready(player)) {
            throw new TournamentError(`Duplicate player: "${player.name}".`);
        }
        this.players.push(player);
    }

    existsAlready(player) {
        for (var p of this.players) {
            if (p.name.toLowerCase() === player.name.toLowerCase()) {
                return true;
            }
        };
        return false;
    }

    generate() {
        this.checkNumberOfPlayers();
        this.generateEmptyMatches();
        this.generateTournamentBracket();
    }

    checkNumberOfPlayers() {
        if (!this.enaughPlayers()) {
            throw new TournamentError(`Too few players: ${this.players.length}`);
        }
        if (!this.hasProperNumberOfPlayers()){
            this.fillUpWithGhosts();
        }
    }

    enaughPlayers() {
        return this.players.length >= 2;
    }

    hasProperNumberOfPlayers() {
        return Number.isInteger(Math.log2(this.players.length));
    }

    fillUpWithGhosts() {
        var goodNumber = parseInt(Math.pow(10, this.players.length.toString(2).length), 2);
        var i = 1;
        while (this.players.length < goodNumber) {
            this.addPlayer(new player.Player(`Ghost${i++}`, 1));
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
}

export class TournamentError extends Error {
    constructor(msg) {
        super(msg);
    }
}
