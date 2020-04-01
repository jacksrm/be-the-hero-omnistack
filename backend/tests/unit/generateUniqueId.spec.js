const uniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique id', () => {7
        const id = uniqueId();

        expect(id).toHaveLength(8);
    });
});