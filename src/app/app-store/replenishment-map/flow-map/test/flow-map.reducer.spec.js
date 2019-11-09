import { flowMapReducer, initialState } from '../flow-map.reducer';
import { FlowMapConst } from '../flow-map.actionTypes';

describe('Test FlowMapReducer', () => {
  let state = null;

  beforeEach(() => {
    state = initialState;
  });

  it('should reduce for FLOW_MAP_REQUEST and fill filters from payload', () => {
    const testFilter = { filters: { test: 'test_filter' } };
    state = flowMapReducer(state, {
      type: FlowMapConst.FLOW_MAP_REQUEST,
      payload: testFilter,
    });
    expect(state.filters.test).toEqual(testFilter.filters.test);
    expect(state.loading).toEqual(true);
  });

  it('should reduce for FLOW_MAP_SUCCESS and assign payload to state', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = flowMapReducer(state, {
      type: FlowMapConst.FLOW_MAP_SUCCESS,
      payload: testPayload,
    });
    expect(state.data).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });

  it('should reduce for FLOW_MAP_FAILURE and change the loading state to false', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = flowMapReducer(state, {
      type: FlowMapConst.FLOW_MAP_FAILURE,
      payload: testPayload,
    });
    expect(state.error).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });
});
