import * as utils from "../../../app/common/utils"

describe('method isPowerOfTwo', function() {
    it('should return true evaluating only powerOfTwo-numbers', function() {
        expect( utils.isPowerOfTwo(2) ).toBe(true);
        expect( utils.isPowerOfTwo(32) ).toBe(true);
        expect( utils.isPowerOfTwo(64) ).toBe(true);

        expect( utils.isPowerOfTwo(-8) ).toBe(false);
        expect( utils.isPowerOfTwo(30) ).toBe(false);
    });
});

describe('method findNextHigherPowerOfTwo', function() {
    it('should return 8 evaluating 5', function() {
        expect( utils.findNextHigherPowerOfTwo(5) ).toEqual(8);
    });

    it('should return 16 evaluating 8', function() {
        expect( utils.findNextHigherPowerOfTwo(8) ).toEqual(16);
    });
});
