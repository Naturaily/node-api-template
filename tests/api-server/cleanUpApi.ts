import * as tcpProxy from './tcpProxy';
import db from './db';

const globalAny: any = global;
const { apiServerProcess } = globalAny;

module.exports = () => {
  db.disconnect();
  tcpProxy.postgres.end();

  if (apiServerProcess) {
    apiServerProcess.kill('SIGINT');
  }
};
