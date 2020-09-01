import { version as versionInfo } from '../../package.json';

export async function version() {
  return { version: versionInfo };
}
