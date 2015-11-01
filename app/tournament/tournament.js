import * as player from "./player";

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
        var match = {
            player1: "pepe",
            player2: "maria"
        }

        for (var i=0; i<this.players.length-1; i++){
            this.matches[i] = match;
        }
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
}

export class TournamentError extends Error {
    constructor(msg) {
        super(msg);
    }
}
