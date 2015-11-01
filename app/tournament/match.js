export class Match {
    constructor() {
        this.round = 1;
        this.players = [];
        this.parents = [];
    }

    addPlayer(player) {
        if (this.players.length >= 2) {
            throw new MatchException("Match has already 2 players");
        }
        this.players.push(player);
    }
}

export class MatchException extends Match {
    constructor(msg) {
        super(msg);
    }
}
