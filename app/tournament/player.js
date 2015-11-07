export class Player {
    constructor(name, rank) {
        this.name = name;
        this.rank = rank;
    }
}

export function validatePlayer(data) {
    var validationResult = {};

    validationResult.error = validateName(data.name) + validateRank(data.rank);
    validationResult.success = validationResult.error.length === 0;

    return validationResult;
}

function validateName(name) {
    return (!name) ? "Name cannot be empty. " : "";
}

function validateRank(rank) {
    return (rank < 1) ? "Rank has to be greater than 0." : "";
}
