import { createServer } from 'http';
import * as config from './config.json';

const server = createServer((req, res) => {
  console.log('req.url:', req.url);
  console.log('req.method:', req.method);

  try {
    const url = req.url?.split('/');
    if (url?.[1] === 'db') {
      switch (req.method) {
        case 'GET': {
          break;
        }
        case 'POST': {
          break;
        }
        case 'DELETE': {
          break;
        }
      }
      return;
    }

    res.statusCode = 404;
    res.end(
      JSON.stringify({
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found',
      })
    );
    return;
  } catch (error) {
    console.log('error', error);
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        statusCode: 500,
        error: 'Internal server error',
        message: JSON.stringify(error),
      })
    );
  }
});

server.listen(config.PORT, () => {
  console.log(`Server started on ${config.PORT} port`);
});

process.on('SIGINT', () => {
  process.exit(0);
});
