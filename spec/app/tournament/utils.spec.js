import * as utils from "../../../app/common/utils";

describe('method getAndRemoveItemRandomlyFromArray', function() {

    it('should delete and return one single item randomly within an array, reducing its length by 1', function() {
        var array = [1, 2, 3, 4, 5];
        var originalLength = array.length;

        var deleted = utils.getAndRemoveItemRandomlyFromArray(array)

        expect( array.indexOf(deleted) ).toEqual(-1);
        expect( Array.isArray(deleted) ).toBe(false);
        expect( array.length ).toEqual(originalLength - 1);
    });
});
