import { FlowMapConst } from '../flow-map.actionTypes';
import {
  flowMapRequest,
  flowMapSuccess,
  flowMapFailure,
} from '../flow-map.actions';

describe('flowMapActions', () => {
  it('should flowMapRequest add post data to payload and call dispatch', () => {
    const postData = 'POST_DATA';
    const store = { dispatch: data => data };
    const spy = jest.spyOn(store, 'dispatch');
    const action = flowMapRequest(postData);
    action(store.dispatch);
    expect(spy).toHaveBeenCalledWith({
      type: FlowMapConst.FLOW_MAP_REQUEST,
      payload: postData,
    });
  });

  it('should flowMapSuccess return action with data as payload', () => {
    const data = 'TEST_DATA';
    const action = flowMapSuccess(data);
    expect(action).toEqual({
      type: FlowMapConst.FLOW_MAP_SUCCESS,
      payload: data,
    });
  });

  it('should flowMapFailure return action with data as payload', () => {
    const data = 'ERROR_DATA';
    const action = flowMapFailure(data);
    expect(action).toEqual({
      type: FlowMapConst.FLOW_MAP_FAILURE,
      payload: data,
    });
  });
});
