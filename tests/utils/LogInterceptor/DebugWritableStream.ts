import { Writable } from 'stream';

export class DebugWritableStream extends Writable {
  private partialChunk = '';

  constructor(public resultsArray = []) {
    super();
  }

  _write(chunk: string | Buffer, bufferEncoding, done) {
    if (chunk instanceof Buffer) {
      chunk = chunk.toString('utf8');
    }

    const chunks = `${this.partialChunk}${chunk}`.split('\n');
    this.partialChunk = chunks.pop();

    chunks.forEach((item) => {
      try {
        this.resultsArray.push(JSON.parse(item));
      } catch (err) {
        this.resultsArray.push(`Invalid JSON log entry: ${err}, Item: ${item}`);
      }
    });

    done();
  }
}
