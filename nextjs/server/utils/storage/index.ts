import firebase from '@server/utils/firebase';
import fs from 'fs';

/**
 * A class representing Storage.
 * @class Storage
 */
class Storage {
  /**
   * Uploads a buffer to the storage bucket.
   * @static
   * @param {string} path
   * @param {Buffer} buffer
   * @return {*}  {Promise<void>}
   * @memberof Storage
   */
  static async upload(path: string, buffer: Buffer): Promise<void> {
    const bucket = firebase.storage().bucket();
    const storageRef = bucket.file(path);
    await storageRef.save(buffer);
  }

  /**
   * Downloads a file from the storage bucket.
   * @static
   * @param {string} path
   * @param {string} destination
   * @return {*}  {Promise<Buffer>}
   * @memberof Storage
   */
  static async download(path: string, destination: string): Promise<Buffer> {
    const bucket = firebase.storage().bucket();
    await bucket.file(path).download({
      destination: destination,
    });
    const buffer = fs.readFileSync(destination);
    return buffer;
  }

  /**
   * Deletes a file from local storage
   * @static
   * @param {string} path
   * @return {*}  {Promise<void>}
   * @memberof Storage
   */
  static async deleteLocal(path: string): Promise<void> {
    return await new Promise((resolve) => fs.unlink(path, () => resolve()));
  }
}

export default Storage;
