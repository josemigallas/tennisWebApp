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

        setAutomaticWinnerIfSomePlayerHasNoOpponen(this);
    }

    setWinnerFromParent(parentIndex, playerIndex) {
        if (this.parents[parentIndex].players.length !== 2) {
            throw new Error("Parent match has not finished yet");
        }
        this.addPlayer(this.parents[parentIndex].players[playerIndex]);
    }
}

function setAutomaticWinnerIfSomePlayerHasNoOpponen(childMatch) {
    childMatch.parents.forEach( function(parent) {
        if (parent.round === 1 && parent.players.length === 1) {
            childMatch.addPlayer(parent.players[0]);
        }
    });
}
