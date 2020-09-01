import 'source-map-support/register';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

import { start } from './app';

(async () => {
  try {
    await start();

    if (process.send) {
      process.send('Server started');
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
