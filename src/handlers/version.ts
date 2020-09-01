import * as pjson from '../../package.json';

export async function version() {
  return { version: pjson.version };
}
