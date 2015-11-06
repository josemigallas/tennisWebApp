export class Match {
    constructor() {
        this.round = 1;
        this.players = [];
        this.parents = [];
    }

    addPlayer(player) {
        if (this.players.length >= 2) {
            throw new Error("Match has already 2 players");
        }
        this.players.push(player);
    }

    addParent(match) {
        if (this.parents.length >= 2) {
            throw new Error("Match has already 2 parents");
        }
        this.parents.push(match);
    }
}
