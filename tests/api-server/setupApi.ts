import { fork } from 'child_process';
import { LogInterceptor } from '../utils/LogInterceptor';
import { predicateGenerator } from '../integration/utils';
import db from './db';
import expect from 'expect';
import { User } from '../../src/database/User';
import { userAccessor } from '../utils/userAccessor';
import * as tcpProxy from './tcpProxy';

const globalAny: any = global;

process.env.NODE_ENV = 'test';

module.exports = async () => {
  debugger;
  // await db.connect();
  // await db.sync({ force: true });

  // const user = (await db.models.User.create({
  //   email: 'naturalnyjanusztestowy@gmail.com',
  //   name: 'Januszek',
  // })) as User;
  // const userRaw = user.toJSON() as User;
  // userAccessor.set({ ...userRaw });

  const env = { ...process.env };
  // env.database__port = `${tcpProxy.postgresPort}`;
  // env.database__host = 'localhost';

  // tcpProxy.postgres.start = () =>
  //   tcpProxy.postgres.createProxy({
  //     forwardPort: 5432,
  //     forwardHost: 'postgres-test',
  //   });
  // tcpProxy.postgres.start();

  globalAny.apiServerProcess = fork('src/', [], {
    silent: true,
    env,
    execArgv: ['-r', 'ts-node/register'],
  });

  const apiServerProcess = globalAny.apiServerProcess;

  // Pipe apiServerProcess errors to testing process stderr
  apiServerProcess.stderr.pipe(process.stderr);

  if (process.env.pipeLogging === 'true') {
    apiServerProcess.stdout.pipe(process.stdout);
  }

  // const logInterceptor = new LogInterceptor(apiServerProcess.stdout);
  // const serverState: 'Success' | string = await new Promise((resolve) => {
  //   apiServerProcess
  //     .on('error', (err) => {
  //       throw new Error(err);
  //     })
  //     .on('message', (msg) => {
  //       if (msg === 'Server started') {
  //         logInterceptor.expectLogs(1);
  //         resolve(logInterceptor.waitFor(predicateGenerator('Server listening at http://0.0.0.0:8080'), 2000, 500));
  //       }
  //     });
  // });
  // expect(serverState).toBe('Success');

  process.on('exit', () => {
    // hard kill child processes
    if (apiServerProcess) {
      apiServerProcess.kill('SIGTERM');
    }
  });
};
