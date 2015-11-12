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

    setNextMatch(match) {
        this.nextMatch = match;
    }

    setWinner(playerIndex) {
        if (this.winner === undefined) {
            this.winner = this.players[playerIndex];
            this.nextMatch.addPlayer(this.players[playerIndex]);
        }
    }
}

export class MatchFromPrevRound extends Match {
    constructor(leftMatch, rightMatch) {
        super(rightMatch.round + 1);
        leftMatch.setNextMatch(this);
        rightMatch.setNextMatch(this);
    }
}
