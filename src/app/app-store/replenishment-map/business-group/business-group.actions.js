import { BusinessGroupConst } from './business-group.actionTypes';

export const businessGroupRequest = postData => dispatch => {
  dispatch({
    type: BusinessGroupConst.BUSINESS_GROUP_REQUEST,
    payload: postData,
  });
};

export const businessGroupSuccess = data => {
  return {
    type: BusinessGroupConst.BUSINESS_GROUP_SUCCESS,
    payload: data,
  };
};

export const fullBusinessGroupRequest = postData => dispatch => {
  dispatch({
    type: BusinessGroupConst.FULL_BUSINESS_GROUP_REQUEST,
    payload: postData,
  });
};

export const fullBusinessGroupSuccess = data => {
  return {
    type: BusinessGroupConst.FULL_BUSINESS_GROUP_SUCCESS,
    payload: data,
  };
};

export const businessGroupFailure = data => {
  return {
    type: BusinessGroupConst.BUSINESS_GROUP_FAILURE,
    payload: data,
  };
};
