import { destPlantReducer, initialState } from '../dest-plant.reducer';
import { DestPlantConst } from '../dest-plant.actionTypes';

describe('Test destPlantReducer', () => {
  let state = null;

  beforeEach(() => {
    state = initialState;
  });

  it('should reduce for DEST_PLANT_REQUEST and fill filters from payload', () => {
    const testFilter = { filters: { test: 'test_filter' } };
    state = destPlantReducer(state, {
      type: DestPlantConst.DEST_PLANT_REQUEST,
      payload: testFilter,
    });
    expect(state.filters.test).toEqual(testFilter.filters.test);
    expect(state.loading).toEqual(true);
  });

  it('should reduce for DEST_PLANT_SUCCESS and assign payload to state', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = destPlantReducer(state, {
      type: DestPlantConst.DEST_PLANT_SUCCESS,
      payload: testPayload,
    });
    expect(state.data).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });

  it('should reduce for DEST_PLANT_FAILURE and change the loading state to false', () => {
    const testPayload = 'TEST_PAYLOAD';
    state = destPlantReducer(state, {
      type: DestPlantConst.DEST_PLANT_FAILURE,
      payload: testPayload,
    });
    expect(state.error).toEqual(testPayload);
    expect(state.loading).toEqual(false);
  });
});
