import {Match} from "../../../app/tournament/match";
import {ChildMatch} from "../../../app/tournament/match";
import {Player} from "../../../app/tournament/player";

describe('class Match', function() {
    it('should throw an error adding more than 2 players', function() {
        var match = new Match();
        match.addPlayer();
        match.addPlayer();

        expect( function() { match.addPlayer(); }).toThrow(new Error("Match has already 2 players"));
    });
});

describe('class ChildMatch', function() {

    it('should be in round 2 having both parents in round 1', function() {
        var parentMatch1 = new Match(1);
        var parentMatch2 = new Match(1);
        var childMatch = new ChildMatch(parentMatch1, parentMatch2);

        expect( childMatch.round ).toEqual(2);
    });

    it('should be in round 3 having first parent in round 1 and second in round 2', function() {
        var parentMatch1 = new Match(1);
        var parentMatch2 = new Match(2);
        var childMatch = new ChildMatch(parentMatch1, parentMatch2);

        expect( childMatch.round ).toEqual(3);
    });

    it('should have automatically a winner having first parent only 1 player', function() {
        var parentMatch1 = new Match(1);
        parentMatch1.addPlayer(new Player("Spiderman", 1));

        var parentMatch2 = new Match(1);
        parentMatch2.addPlayer(new Player("The Thing", 2));
        parentMatch2.addPlayer(new Player("Batman", 3));

        var childMatch = new ChildMatch(parentMatch1, parentMatch2);

        expect( childMatch.players.length ).toEqual(1);
        expect( childMatch.players.pop().name ).toEqual("Spiderman");
    });

    it('should throw an error trying to set a winner from unplayed match', function() {
        var parentMatch1 = new Match(1);
        parentMatch1.addPlayer(new Player("Spiderman", 1));
        parentMatch1.addPlayer(new Player("The Thing", 2));

        var parentMatch2 = new Match(1);
        parentMatch2.addPlayer(new Player("Batman", 3));

        var childMatch = new ChildMatch(parentMatch1, parentMatch2);

        expect( childMatch.players.length ).toEqual(0);
        expect( function() {childMatch.setWinnerFromParent(0,0)} ).not.toThrow(new Error("Parent match has not finished yet"));
        expect( function() {childMatch.setWinnerFromParent(1,0)} ).toThrow(new Error("Parent match has not finished yet"));
    });
});
