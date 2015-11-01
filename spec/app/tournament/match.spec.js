import * as match from "../../../app/tournament/match"
import * as player from "../../../app/tournament/player"

describe('class Match', function() {
    it('should be in 1 round by default', function() {
        var mMatch = new match.Match();
        expect(mMatch.round).toEqual(1);
    });

    it('addPlayer should rise an error if more than 2 players are added', function() {
        var mMatch = new match.Match();
        mMatch.addPlayer(new player.Player("Pepe", 1));
        mMatch.addPlayer(new player.Player("Marta", 2));
        expect( function() { mMatch.addPlayer(); }).toThrow(new match.MatchException("Match has already 2 players"));
    });
});
