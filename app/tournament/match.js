export class Match {
    constructor(round) {
        this.round = round;
        this.players = [];
    }

    addPlayer(player) {
        if (this.players.length >= 2) {
            throw new Error("Match has already 2 players");
        }
        this.players.push(player);
    }
}

export class ChildMatch extends Match {
    constructor(parentMatch1, parentMatch2) {
        super(parentMatch2.round + 1);
        this.parents = [parentMatch1, parentMatch2];

        if (parentMatch1.players.length === 1) {
            this.addPlayer(parentMatch1.players[0]);
        }
    }

    setWinnerFromParent(parentIndex, playerIndex) {
        if (this.parents[parentIndex].players.length !== 2) {
            throw new Error("Parent match has not finished yet");
        }
        this.addPlayer(this.parents[parentIndex].players[playerIndex]);
    }
}
