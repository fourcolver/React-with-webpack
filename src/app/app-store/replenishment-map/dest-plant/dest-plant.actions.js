import { DestPlantConst } from './dest-plant.actionTypes';

export const destPlantRequest = postData => dispatch => {
  dispatch({
    type: DestPlantConst.DEST_PLANT_REQUEST,
    payload: postData,
  });
};

export const destPlantSuccess = data => {
  return {
    type: DestPlantConst.DEST_PLANT_SUCCESS,
    payload: data,
  };
};

export const destPlantFailure = data => {
  return {
    type: DestPlantConst.DEST_PLANT_FAILURE,
    payload: data,
  };
};
