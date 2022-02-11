import { createServer } from 'http';
import { UPLOADS_DIR_NAME, PORT } from '../config.json';
import { createOne } from './dbms/createOne';
import { mkdirIfNotExists } from './fs';

const server = createServer(async (req, res) => {
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
          const buffers = [];

          for await (const chunk of req) {
            buffers.push(chunk);
          }

          const data: { key?: number; value?: string } = JSON.parse(
            Buffer.concat(buffers).toString()
          );
          console.log(data);
          // validate:
          if (data.key && data.value) {
            if (
              typeof data.key === 'number' &&
              typeof data.value === 'string'
            ) {
              await createOne(data.key, data.value);
              res.end(JSON.stringify({ statusCode: 200, message: 'OK' }));
              return;
            }
          }
          throw Error('Unvalid body');
        }
        case 'DELETE': {
          break;
        }
        default: {
          res.statusCode = 404;
          res.end(
            JSON.stringify({
              statusCode: 404,
              error: 'Not Found',
              message: 'Not Found',
            })
          );
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

server.listen(PORT, async () => {
  await mkdirIfNotExists(UPLOADS_DIR_NAME);
  console.log(`Server started on ${PORT} port`);
});

process.on('SIGINT', () => {
  process.exit(0);
});
