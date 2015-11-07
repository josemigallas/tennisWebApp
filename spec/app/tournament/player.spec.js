import {Player, validatePlayer} from "../../../app/tournament/player";

describe('class Player', function() {

    it('should return a validation error if rank is 0', function() {
        var validationResult = validatePlayer(new Player("Spiderman", 0))

        expect( validationResult.error ).toEqual("Rank has to be greater than 0.");
    });

    it('should return a validation error if rank is negative', function() {
        var validationResult = validatePlayer(new Player("Spiderman", -1))

        expect( validationResult.error ).toEqual("Rank has to be greater than 0.");
    });

    it('should throw an error if name is empty', function() {
        var validationResult = validatePlayer(new Player("", 1));

        expect( validationResult.error ).toEqual("Name cannot be empty. ");
    });
});
