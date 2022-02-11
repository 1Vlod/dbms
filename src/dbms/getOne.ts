import fs from 'fs/promises';
import { UPLOADS_DIR_NAME, STORAGE_FILE_NAME } from '../../config.json';

const storagePath = `${UPLOADS_DIR_NAME}/${STORAGE_FILE_NAME}`;

export const getOne = async (id: number) => {
  try {
    const buffer = await fs.readFile(storagePath);
    const data = buffer.toString().split('\n');
    console.log('parsed', data);

    const value = data.find((elem) => {
      const key = +elem.split(':')[0];
      if (!Number.isInteger(key)) {
        throw Error('Parsed error');
      }

      if (key === id) {
        return true;
      }
    });
    return value;
  } catch (error) {
    throw error;
  }
};
