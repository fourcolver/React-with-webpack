import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BusinessGroupConst } from './business-group.actionTypes';
import {
  businessGroupSuccess,
  fullBusinessGroupSuccess,
  businessGroupFailure,
} from './business-group.actions';

import { rxAjax } from '../../../utils';
import config from '../../../config';

export const businessGroup = action$ =>
  action$.pipe(
    ofType(BusinessGroupConst.BUSINESS_GROUP_REQUEST),
    mergeMap(action => {
      return rxAjax({
        endpoint: `${config.apiGateway.BASE_URL}/api/replenishment/businessGroup`,
        method: 'POST',
        payload: action.payload,
        headers: {
          client_id: action.payload.client_id,
          client_secret: action.payload.client_secret,
        },
      }).pipe(
        map(data => businessGroupSuccess(data)),
        catchError(error => {
          businessGroupFailure(error);
          return of(error);
        }),
      );
    }),
  );

export const FullBusinessGroup = action$ =>
  action$.pipe(
    ofType(BusinessGroupConst.FULL_BUSINESS_GROUP_SUCCESS),
    mergeMap(action => {
      return rxAjax({
        endpoint: `${config.apiGateway.BASE_URL}/api/replenishment/full`,
      }).pipe(
        map(data => fullBusinessGroupSuccess(data)),
        catchError(error => {
          businessGroupFailure(error);
          return of(error);
        }),
      );
    }),
  );
