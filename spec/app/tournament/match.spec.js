import {Match} from "../../../app/tournament/match"

describe('class Match', function() {
    it('should be in round 1 by default', function() {
        var match = new Match();

        expect( match.round ).toEqual(1);
    });

    it('should throw an error adding more than 2 players', function() {
        var match = new Match();
        match.addPlayer();
        match.addPlayer();

        expect( function() { match.addPlayer(); }).toThrow(new Error("Match has already 2 players"));
    });

    it('should throw an error adding more than 2 match parents', function() {
        var match = new Match();
        match.addParent();
        match.addParent();

        expect( function() { match.addParent(); }).toThrow(new Error("Match has already 2 parents"));
    });
});
