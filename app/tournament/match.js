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
}
