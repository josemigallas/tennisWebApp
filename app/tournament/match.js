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

export class ChildMatch extends Match {
    constructor(firstParent, secondParent) {
        super(secondParent.round + 1);
        firstParent.setNextMatch(this);
        secondParent.setNextMatch(this);

        if (firstParent.round === 1 && firstParent.players.length === 1) {
            firstParent.setWinner(0);
        } else if (secondParent.round === 1 && secondParent.players.length === 1) {
            secondParent.setWinner(0);
        }
    }
}
