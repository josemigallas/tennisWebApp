export class Player {
    constructor(name, rank) {
        validateName(name);
        validateRank(rank);

        this.name = name;
        this.rank = rank;
    }
}

function validateName(name) {
    if (!name) {
        throw new PlayerError("Name cannot be empty");
    }
}

function validateRank(rank) {
    if (rank < 1) {
        throw new PlayerError(`Rank (${rank}) has to be greater than 0`);
    }
}

export class PlayerError extends Error {
    constructor(msg) {
        super(msg);
    }
};
