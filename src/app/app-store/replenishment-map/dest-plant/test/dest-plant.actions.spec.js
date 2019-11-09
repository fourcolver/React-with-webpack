import { DestPlantConst } from '../dest-plant.actionTypes';
import {
  destPlantRequest,
  destPlantSuccess,
  destPlantFailure,
} from '../dest-plant.actions';

describe('destPlantActions', () => {
  it('should destPlantRequest add post data to payload and call dispatch', () => {
    const postData = 'POST_DATA';
    const store = { dispatch: data => data };
    const spy = jest.spyOn(store, 'dispatch');
    const action = destPlantRequest(postData);
    action(store.dispatch);
    expect(spy).toHaveBeenCalledWith({
      type: DestPlantConst.DEST_PLANT_REQUEST,
      payload: postData,
    });
  });

  it('should destPlantSuccess return action with data as payload', () => {
    const data = 'TEST_DATA';
    const action = destPlantSuccess(data);
    expect(action).toEqual({
      type: DestPlantConst.DEST_PLANT_SUCCESS,
      payload: data,
    });
  });

  it('should destPlantFailure return action with data as payload', () => {
    const data = 'ERROR_DATA';
    const action = destPlantFailure(data);
    expect(action).toEqual({
      type: DestPlantConst.DEST_PLANT_FAILURE,
      payload: data,
    });
  });
});
