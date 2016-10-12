const expect = require('chai').expect;
const recordsFromStoreResult = require('./records_from_store_result');
const mockResult = {
  meta: {},
  payload: {
    records: ['a', 'b', 'c']
  },
  count: 3
};

describe('recordsFromStoreResult', () => {
  it('should extract records from a store find request', () => {
    expect(recordsFromStoreResult(mockResult)).to.eql(['a', 'b', 'c']);
  });
});