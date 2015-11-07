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
