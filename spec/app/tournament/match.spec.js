import {Match} from "../../../app/tournament/match";
import {MatchFromPrevRound} from "../../../app/tournament/match";
import {Player} from "../../../app/tournament/player";

var spiderman = new Player("Spiderman", 1);
var batman = new Player("Batman", 3);
var theThing = new Player("The Thing", 5);

describe('class Match', function() {

    var match;

    beforeEach( function() {
        match = new Match(1);
        match.addPlayer(spiderman);
        match.addPlayer(batman);
    });

    it('should throw an error adding more than 2 players', function() {
        expect( function() {match.addPlayer(theThing);} ).toThrow(new Error("Match has already 2 players"));
    });

    it('should have a winner only right after setting a winner', function() {
        var child = new Match(2);
        match.setNextMatch(child);

        expect( match.winner ).toBeUndefined;

        match.setWinner(0);

        expect( match.winner ).not.toBeUndefined;
    });

    it('should not be able to set a second winner if it has finished', function() {
        var child = new Match(2);
        match.setNextMatch(child);

        match.setWinner(0);
        match.setWinner(1);

        expect( child.players.length ).toEqual(1);
    });
});

describe('class MatchFromPrevRound', function() {

    var leftMatch;
    var rightMatch;

    beforeEach( function() {
        leftMatch = new Match(1);
        rightMatch = new Match(1);
    });

    it('should be in round 2 having both parents in round 1', function() {
        var child = new MatchFromPrevRound(leftMatch, rightMatch);

        expect( child.round ).toEqual(2);
    });

    it('should be in round 3 having first parent in round 1 and second in round 2', function() {
        rightMatch.round = 2;

        var child = new MatchFromPrevRound(leftMatch, rightMatch);

        expect( child.round ).toEqual(3);
    });

    it('should have automatically a winner having its first parent in round 1 and with only 1 player', function() {
        leftMatch.addPlayer(spiderman);

        rightMatch.addPlayer(theThing);
        rightMatch.addPlayer(batman);

        var child = new MatchFromPrevRound(leftMatch, rightMatch);

        expect( child.players.length ).toEqual(1);
        expect( child.players.pop().name ).toEqual(spiderman.name);
    });

    it('should have automatically a winner having its second parent in round 1 and with only 1 player', function() {
        leftMatch.addPlayer(spiderman);
        leftMatch.addPlayer(theThing);

        rightMatch.addPlayer(batman);

        var child = new MatchFromPrevRound(leftMatch, rightMatch);

        expect( child.players.length ).toEqual(1);
        expect( child.players.pop().name ).toEqual(batman.name);
    });
});
