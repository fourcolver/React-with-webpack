import { FlowMapConst } from './flow-map.actionTypes';

export const initialState = {
  loading: false,
  filters: {
    clientId: null,
    clientSecret: null,
    startDate: null,
    endDate: null,
    unitOfMeasure: null,
    businessGroup: null,
    destPlant: null,
  },
  data: [],
  error: null,
};

export const flowMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FlowMapConst.FLOW_MAP_REQUEST: {
      return {
        ...state,
        filters: {
          ...action.payload.filters,
        },
        loading: true,
      };
    }
    case FlowMapConst.FLOW_MAP_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case FlowMapConst.FLOW_MAP_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
