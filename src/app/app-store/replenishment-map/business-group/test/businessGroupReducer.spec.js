import { businessGroupReducer, initialState } from '../business-group.reducer';
import { BusinessGroupConst } from '../business-group.actionTypes';

describe('Test BusinerssGroupReducer', () => {
  let state = null;
  beforeEach(() => {
    state = initialState;
  });

  it('should reduce for BUSINESS_GROUP_REQUEST and fill filters from payload', () => {
    const testFilter = { filters: { test: 'test_filter' } };
    state = businessGroupReducer(state, {
      type: BusinessGroupConst.BUSINESS_GROUP_REQUEST,
      payload: testFilter,
    });
    expect(state.filters.test).toEqual(testFilter.filters.test);
    expect(state.loading).toEqual(true);
  });

  it('should reduce for BUSINESS_GROUP_SUCCESS and assign payload to state', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = businessGroupReducer(state, {
      type: BusinessGroupConst.BUSINESS_GROUP_SUCCESS,
      payload: testPayload,
    });
    expect(state.data).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });

  it('should reduce for FULL_BUSINESS_GROUP_SUCCESS and change to loading state to true', () => {
    state = businessGroupReducer(state, {
      type: BusinessGroupConst.FULL_BUSINESS_GROUP_SUCCESS,
      payload: null,
    });
    expect(state.loading).toEqual(true);
  });

  it('should reduce for FULL_BUSINESS_GROUP_REQUEST and change the loading state to false', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = businessGroupReducer(state, {
      type: BusinessGroupConst.FULL_BUSINESS_GROUP_REQUEST,
      payload: testPayload,
    });
    expect(state.data).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });

  it('should reduce for BUSINESS_GROUP_FAILURE and change the loading state to false', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = businessGroupReducer(state, {
      type: BusinessGroupConst.BUSINESS_GROUP_FAILURE,
      payload: testPayload,
    });
    expect(state.error).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });
});
