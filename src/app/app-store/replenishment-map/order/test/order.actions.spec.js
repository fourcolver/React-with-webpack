import { OrderConst } from '../order.actionTypes';
import { orderRequest, orderSuccess, orderFailure } from '../order.actions';

describe('orderActions', () => {
  it('should orderRequest add post data to payload and call dispatch', () => {
    const postData = 'POST_DATA';
    const store = { dispatch: data => data };
    const spy = jest.spyOn(store, 'dispatch');
    const action = orderRequest(postData);
    action(store.dispatch);
    expect(spy).toHaveBeenCalledWith({
      type: OrderConst.ORDER_REQUEST,
      payload: postData,
    });
  });

  it('should orderSuccess return action with data as payload', () => {
    const data = 'TEST_DATA';
    const action = orderSuccess(data);
    expect(action).toEqual({
      type: OrderConst.ORDER_SUCCESS,
      payload: data,
    });
  });

  it('should orderFailure return action with data as payload', () => {
    const data = 'ERROR_DATA';
    const action = orderFailure(data);
    expect(action).toEqual({
      type: OrderConst.ORDER_FAILURE,
      payload: data,
    });
  });
});
