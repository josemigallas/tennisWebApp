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

    var spiderman = new Player("Spiderman", 1);
    var batman = new Player("Batman", 3);
    var theThing = new Player("The Thing", 5);

    var firstParent;
    var secondParent;

    beforeEach( function() {
        firstParent = new Match(1);
        secondParent = new Match(1);
    });

    it('should be in round 2 having both parents in round 1', function() {
        var child = new ChildMatch(firstParent, secondParent);

        expect( child.round ).toEqual(2);
    });

    it('should be in round 3 having first parent in round 1 and second in round 2', function() {
        secondParent.round = 2;

        var child = new ChildMatch(firstParent, secondParent);

        expect( child.round ).toEqual(3);
    });

    it('should have automatically a winner having first parent only 1 player', function() {
        firstParent.addPlayer(spiderman);

        secondParent.addPlayer(theThing);
        secondParent.addPlayer(batman);

        var child = new ChildMatch(firstParent, secondParent);

        expect( child.players.length ).toEqual(1);
        expect( child.players.pop().name ).toEqual(spiderman.name);
    });

    it('should throw an error trying to set a winner from an unplayed match', function() {
        firstParent.addPlayer(spiderman);
        firstParent.addPlayer(theThing);

        secondParent.addPlayer(batman);

        var child = new ChildMatch(firstParent, secondParent);

        expect( child.players.length ).toEqual(0);
        expect( function() {child.setWinnerFromParent(0,0)} ).not.toThrow(new Error("Parent match has not finished yet"));
        expect( function() {child.setWinnerFromParent(1,0)} ).toThrow(new Error("Parent match has not finished yet"));
    });
});
