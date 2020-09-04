import { DebugWritableStream } from './DebugWritableStream';
import { Stream } from 'stream';

export class LogInterceptor {
  private logs = [];
  private logStream = new DebugWritableStream(this.logs);

  constructor(stdout: Stream) {
    stdout.pipe(this.logStream);
  }

  getLogs() {
    return this.logStream.resultsArray;
  }

  cleanLogs() {
    this.logs = [];
  }

  countErrors() {
    return this.logs.filter(({ level }) => level === 50).length;
  }

  expectLogs(expectedCount: number, strict = true) {
    const isExpectedCount = strict ? this.logs.length === expectedCount : this.logs.length >= expectedCount;

    if (!isExpectedCount) {
      throw new Error("Count of logs doesn't match expected count of logs");
    }
  }
}
