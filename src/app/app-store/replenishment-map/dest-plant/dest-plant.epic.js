import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DestPlantConst } from './dest-plant.actionTypes';
import { destPlantSuccess, destPlantFailure } from './dest-plant.actions';

import { rxAjax } from '../../../utils';
import config from '../../../config';

export const destPlant = action$ =>
  action$.pipe(
    ofType(DestPlantConst.DEST_PLANT_REQUEST),
    mergeMap(action => {
      return rxAjax({
        endpoint: `${config.apiGateway.BASE_URL}/api/replenishment/destPlant`,
        method: 'POST',
        payload: action.payload,
        headers: {
          client_id: action.payload.client_id,
          client_secret: action.payload.client_secret,
        },
      }).pipe(
        map(data => destPlantSuccess(data)),
        catchError(error => {
          destPlantFailure(error);
          return of(error);
        }),
      );
    }),
  );
