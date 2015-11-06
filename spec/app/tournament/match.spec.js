import * as match from "../../../app/tournament/match"

describe('class Match', function() {
    it('should be in 1 round by default', function() {
        var mMatch = new match.Match();
        expect(mMatch.round).toEqual(1);
    });

    it('addPlayer should rise an error if more than 2 players are added', function() {
        var mMatch = new match.Match();
        mMatch.addPlayer();
        mMatch.addPlayer();
        expect( function() { mMatch.addPlayer(); }).toThrow(new Error("Match has already 2 players"));
    });
});
