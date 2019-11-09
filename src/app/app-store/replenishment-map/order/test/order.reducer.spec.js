import { orderReducer, initialState } from '../order.reducer';
import { OrderConst } from '../order.actionTypes';

describe('Test orderReducer', () => {
  let state = null;

  beforeEach(() => {
    state = initialState;
  });

  it('should reduce for ORDER_REQUEST and fill filters from payload', () => {
    const testFilter = { filters: { test: 'test_filter' } };
    state = orderReducer(state, {
      type: OrderConst.ORDER_REQUEST,
      payload: testFilter,
    });
    expect(state.filters.test).toEqual(testFilter.filters.test);
    expect(state.loading).toEqual(true);
  });

  it('should reduce for ORDER_SUCCESS and assign payload to state', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = orderReducer(state, {
      type: OrderConst.ORDER_SUCCESS,
      payload: testPayload,
    });
    expect(state.data).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });

  it('should reduce for ORDER_FAILURE and change the loading state to false', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = orderReducer(state, {
      type: OrderConst.ORDER_FAILURE,
      payload: testPayload,
    });
    expect(state.error).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });
});
