import {Player, validatePlayer} from "../../../app/tournament/player";

describe('class Player', function() {

    it('should has no validation error if name is a string and rank is an integer greater than 0', function() {
        var validationResult = validatePlayer(new Player("Spiderman", 1));

        expect( validationResult.success ).toBe(true);
        expect( validationResult.error ).toBeUndefined;
    });

    it('should has no validation error if name is a string and rank is a string containing an integer greater than 0', function() {
        var validationResult = validatePlayer(new Player("Spiderman", "1"));

        expect( validationResult.success ).toBe(true);
        expect( validationResult.error ).toBeUndefined;
    });

    it('should return a validation error if rank is not a number', function() {
        var validationResult1 = validatePlayer(new Player("Spiderman", "two"));
        var validationResult2 = validatePlayer(new Player("Spiderman", undefined));
        var validationResult3 = validatePlayer(new Player("Spiderman", NaN));
        var validationResult4 = validatePlayer(new Player("Spiderman", null));

        expect( validationResult1.error.pop() ).toEqual("Rank has to be an integer number greater than 0.");
        expect( validationResult2.error.pop() ).toEqual("Rank has to be an integer number greater than 0.");
        expect( validationResult3.error.pop() ).toEqual("Rank has to be an integer number greater than 0.");
        expect( validationResult4.error.pop() ).toEqual("Rank has to be an integer number greater than 0.");
    });

    it('should return a validation error if rank is 0', function() {
        var validationResult = validatePlayer(new Player("Spiderman", 0))

        expect( validationResult.success ).toBe(false);
        expect( validationResult.error.pop() ).toEqual("Rank has to be an integer number greater than 0.");
    });

    it('should return a validation error if rank is negative', function() {
        var validationResult = validatePlayer(new Player("Spiderman", -1))

        expect( validationResult.success ).toBe(false);
        expect( validationResult.error.pop() ).toEqual("Rank has to be an integer number greater than 0.");
    });

    it('should return a validation error if rank is not an integer number', function() {
        var validationResult = validatePlayer(new Player("Spiderman", 2.5));

        expect( validationResult.success ).toBe(false);
        expect( validationResult.error.pop() ).toEqual("Rank has to be an integer number greater than 0.");
    });

    it('should throw an error if name is empty', function() {
        var validationResult = validatePlayer(new Player("", 1));

        expect( validationResult.success ).toBe(false);
        expect( validationResult.error.pop() ).toEqual("Name cannot be empty.");
    });
});
