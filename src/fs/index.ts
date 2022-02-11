import fs from 'fs';
import fsPromises from 'fs/promises';

export const mkdirIfNotExists = async (name: string) => {
  if (!fs.existsSync(name)) {
    await fsPromises.mkdir(name);
  }
};
