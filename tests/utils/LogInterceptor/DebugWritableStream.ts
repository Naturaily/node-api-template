import { Writable } from 'stream';

export class DebugWritableStream extends Writable {
  private partialChunk = '';

  constructor(public resultsArray = []) {
    super();
  }

  _write(chunk: string | Buffer) {
    if (chunk instanceof Buffer) {
      chunk = chunk.toString('utf8');
    }

    const chunks = `${this.partialChunk}${chunk}`.split('\n');
    this.partialChunk = chunks.pop();

    chunks.forEach((item) => {
      try {
        item = JSON.parse(item);
      } catch (err) {
        item = `Invalid JSON log entry: ${err}, Item: ${item}`;
      }

      this.resultsArray.push(item);
    });
  }
}
