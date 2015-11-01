import * as player from "../../../app/tournament/player";
import * as tournament from "../../../app/tournament/tournament";

describe('class Tournament', function() {
    it('adding a second players with same name should throw an error', function() {
        var mPlayer = new player.Player("pepe", 2);
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(mPlayer);
        expect( function() {mTournament.addPlayer(mPlayer)} ).toThrow(new tournament.TournamentError(`Duplicate player: "${player.name}".`));
    });

    it('generating a tournament with less than 2 players throw an error', function() {
        var mTournament = new tournament.Tournament();
        expect( function() {mTournament.generate()} ).toThrow(new tournament.TournamentError(`Too few players: ${mTournament.players.length}`));

        mTournament.addPlayer(new player.Player("Spiderman", 1));
        expect( function() {mTournament.generate()} ).toThrow(new tournament.TournamentError(`Too few players: ${mTournament.players.length}`));
    });

    it('a total of 3 players should not be a proper number', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        expect(mTournament.hasProperNumberOfPlayers()).toEqual(false);
    });

    it('a total of 4 players should not be a proper number', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        expect(mTournament.hasProperNumberOfPlayers()).toEqual(true);
    });

    it('generating a tournament with 4 players should not add any ghost player', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        mTournament.generate();
        expect(mTournament.players.length).toEqual(4);
    });

    it('generating a tournament with 3 players should add 1 ghost player', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.generate();
        expect(mTournament.players.length).toEqual(4);
    });

    it('generating a tournament with 5 players should add 3 ghost player', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        mTournament.addPlayer(new player.Player("Sandman", 1));
        mTournament.generate();
        expect(mTournament.players.length).toEqual(8);
    });

    it('generating a tournament with 4 players should create 3 matches', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        mTournament.generate();
        expect(mTournament.matches.length).toEqual(3);
    });
});
