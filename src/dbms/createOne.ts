import fs from 'fs/promises';
import { UPLOADS_DIR_NAME, STORAGE_FILE_NAME } from '../../config.json';

const storagePath = `${UPLOADS_DIR_NAME}/${STORAGE_FILE_NAME}`;
export const createOne = async (key: number, value: string) => {
  try {
    let buffer: Buffer | undefined = undefined;
    try {
      buffer = await fs.readFile(storagePath);
    } catch (error: any) {
      if (error.errno === '-2') {
        await fs.writeFile(storagePath, '', { flag: 'w' });
      } else {
        throw error;
      }
    }

    if (!buffer) throw Error('Buffer not found');
    console.log('buffer.length', buffer.length);
    const data = buffer.toString();
    const parsedData = data.split('\n');
    console.log('parsed', parsedData);
    parsedData.push(`${key}: ${value}`); //TODO: add function for creating strings in the right way

    await fs.writeFile(storagePath, parsedData.join('\n'));
  } catch (error: any) {
    throw error;
  }
};
