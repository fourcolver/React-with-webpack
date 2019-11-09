import { BusinessGroupConst } from './business-group.actionTypes';

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
  fullData: [],
  error: null,
};

export const businessGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case BusinessGroupConst.BUSINESS_GROUP_REQUEST: {
      return {
        ...state,
        filters: {
          ...action.payload.filters,
        },
        loading: true,
      };
    }
    case BusinessGroupConst.BUSINESS_GROUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case BusinessGroupConst.FULL_BUSINESS_GROUP_SUCCESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case BusinessGroupConst.FULL_BUSINESS_GROUP_REQUEST: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case BusinessGroupConst.BUSINESS_GROUP_FAILURE: {
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
