import { fork } from 'child_process';

let apiServerProcess;

describe('Smoke test', () => {
  it('should always pass', async () => expect('Hello world!'));

  it('should start API server', (done) => {
    let isApiStarted = false;

    const env = { ...process.env };

    apiServerProcess = fork('src/', [], {
      silent: true,
      env,
      execArgv: ['-r', 'ts-node/register'],
    });

    apiServerProcess
      .on('error', (err) => done(err))
      .on('message', (msg) => {
        if (msg === 'Server started' && !isApiStarted) {
          isApiStarted = true;
          done();
        }
      });

    // Pipe apiServerProcess errors to testing process stderr
    apiServerProcess.stderr.pipe(process.stderr);

    if (process.env.pipeLogging === 'true') {
      apiServerProcess.stdout.pipe(process.stdout);
    }
  }, 60000);
});

afterAll(() => {
  // soft kill child process
  if (apiServerProcess) {
    apiServerProcess.kill('SIGINT');
  }
});

process.on('exit', () => {
  // hard kill child processes
  if (apiServerProcess) {
    apiServerProcess.kill('SIGTERM');
  }
});
