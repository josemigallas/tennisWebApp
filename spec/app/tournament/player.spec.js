import * as player from "../../../app/tournament/player";

describe('class Player', function() {
    it('should constructor throw an error if rank is 0', function() {
        expect( function() {new player.Player("pepe", 0)} ).toThrow(new player.PlayerError("Rank (0) have to be greater than 0"));
    });

    it('should constructor throw an error if rank is negative', function() {
        expect( function() {new player.Player("pepe", -1)} ).toThrow(new player.PlayerError("Rank (1) have to be greater than 0"));
    });

    it('should throw an error if name is empty', function() {
        expect( function() {new player.Player("", 1)} ).toThrow(new player.PlayerError("Name cannot be empty"));
        expect( function() {new player.Player(undefined, 1)} ).toThrow(new player.PlayerError("Name cannot be empty"));
        expect( function() {new player.Player(null, 1)} ).toThrow(new player.PlayerError("Name cannot be empty"));
    });
});
