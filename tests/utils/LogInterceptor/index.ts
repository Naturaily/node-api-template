import { DebugWritableStream } from './DebugWritableStream';
import { Stream } from 'stream';

export class LogInterceptor {
  private logs = [];
  private logStream = new DebugWritableStream(this.logs);

  constructor(stdout: Stream) {
    stdout.pipe(this.logStream);
  }

  getLogs() {
    return this.logs;
  }

  cleanLogs() {
    this.logs = [];
  }

  async waitFor(predicate: (logs: string[]) => Promise<boolean>, timeout: number, maxIterations: number) {
    const finishTime = Date.now() + timeout;

    while (Date.now() < finishTime && maxIterations) {
      const isReady = await predicate(this.logs);
      if (isReady && Date.now() < finishTime) return Promise.resolve('Success');

      maxIterations--;
    }
    throw new Error(maxIterations ? 'Timeout was reached' : 'Number of iterations exceeded');
  }

  countErrors() {
    return this.logs.filter(({ level }) => level === 50).length;
  }

  expectLogs(expectedCount: number, strict = true) {
    const isExpectedCount = strict ? this.logs.length === expectedCount : this.logs.length >= expectedCount;

    if (!isExpectedCount) {
      throw new Error("Log count doesn't match expected value");
    }
  }
}
