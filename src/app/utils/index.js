import {ajax} from 'rxjs/ajax';

export function rxAjax(action) {
  const errors = [];
  const settings = {};
  let {method} = action;

  if (!method) {
    method = 'GET';
  }

  if (!action.endpoint) {
    errors.push('endpoint');
  }

  if (!action.payload && (method !== 'GET' && method !== 'DELETE')) {
    errors.push('payload');
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  settings.url = action.endpoint;
  settings.method = method;
  settings.crossDomain = true;
  settings.headers = {
    'Content-Type': 'application/json',
    ...action.headers,
  };
  if (action.responseType) settings.responseType = action.responseType;

  if (method !== 'GET') {
    settings.body = action.payload;
  }
  return ajax(settings);
}
