import { fork } from 'child_process';
import { LogInterceptor } from '../utils/LogInterceptor';
import { predicateGenerator } from '../integration/utils';
import expect from 'expect';

const globalAny: any = global;

process.env.NODE_ENV = 'test';

module.exports = async () => {
  const env = process.env;

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

  const logInterceptor = new LogInterceptor(apiServerProcess.stdout);
  const serverState: 'Success' | string = await new Promise((resolve) => {
    apiServerProcess
      .on('error', (err) => {
        throw new Error(err);
      })
      .on('message', (msg) => {
        if (msg === 'Server started') {
          resolve(logInterceptor.waitFor(predicateGenerator('Server listening at http://0.0.0.0:8080'), 2000, 500));
        }
      });
  });
  expect(serverState).toBe('Success');

  process.on('exit', () => {
    // hard kill child processes
    if (globalAny.apiServerProcess) {
      globalAny.apiServerProcess.kill('SIGTERM');
    }
  });
};
