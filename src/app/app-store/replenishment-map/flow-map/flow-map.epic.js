import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FlowMapConst } from './flow-map.actionTypes';
import { flowMapSuccess, flowMapFailure } from './flow-map.actions';

import { rxAjax } from '../../../utils';
import config from '../../../config';

export const flowMap = action$ =>
  action$.pipe(
    ofType(FlowMapConst.FLOW_MAP_REQUEST),
    mergeMap(action => {
      return rxAjax({
        endpoint: `${config.apiGateway.BASE_URL}/api/replenishment/flowMap`,
        method: 'POST',
        payload: action.payload,
        headers: {
          client_id: action.payload.client_id,
          client_secret: action.payload.client_secret,
        },
      }).pipe(
        map(data => flowMapSuccess(data)),
        catchError(error => {
          flowMapFailure(error);
          return of(error);
        }),
      );
    }),
  );
