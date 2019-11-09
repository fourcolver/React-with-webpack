import { BusinessGroupConst } from '../business-group.actionTypes';
import {
  businessGroupRequest,
  businessGroupSuccess,
  fullBusinessGroupRequest,
  fullBusinessGroupSuccess,
  businessGroupFailure,
} from '../business-group.actions';

describe('businessGroupActions', () => {
  it('should businessGroupRequest add post data to payload and call dispatch', () => {
    const postData = 'POST_DATA';
    const store = { dispatch: data => data };
    const spy = jest.spyOn(store, 'dispatch');
    const action = businessGroupRequest(postData);
    action(store.dispatch);
    expect(spy).toHaveBeenCalledWith({
      type: BusinessGroupConst.BUSINESS_GROUP_REQUEST,
      payload: postData,
    });
  });

  it('should businessGroupSuccess return action with data as payload', () => {
    const data = 'TEST_DATA';
    const action = businessGroupSuccess(data);
    expect(action).toEqual({
      type: BusinessGroupConst.BUSINESS_GROUP_SUCCESS,
      payload: data,
    });
  });

  it('should fullBusinessGroupRequest add post data to payload and call dispatch', () => {
    const postData = 'POST_DATA';
    const store = { dispatch: data => data };
    const spy = jest.spyOn(store, 'dispatch');
    const action = fullBusinessGroupRequest(postData);
    action(store.dispatch);
    expect(spy).toHaveBeenCalledWith({
      type: BusinessGroupConst.FULL_BUSINESS_GROUP_REQUEST,
      payload: postData,
    });
  });

  it('should fullBusinessGroupSuccess return action with data as payload', () => {
    const data = 'TEST_DATA';
    const action = fullBusinessGroupSuccess(data);
    expect(action).toEqual({
      type: BusinessGroupConst.FULL_BUSINESS_GROUP_SUCCESS,
      payload: data,
    });
  });

  it('should businessGroupFailure return action with data as payload', () => {
    const data = 'ERROR_DATA';
    const action = businessGroupFailure(data);
    expect(action).toEqual({
      type: BusinessGroupConst.BUSINESS_GROUP_FAILURE,
      payload: data,
    });
  });
});
