import admin = require('firebase-admin');
const storage = admin.storage();
const bucket = storage.bucket();

/**
 * A class representing Storage.
 * @class Storage
 */
class Storage {
  #path: string;

  /**
   * Creates an instance of Storage.
   * @param {string} path
   * @memberof Storage
   */
  constructor(path: string) {
    this.#path = path;
  }

  /**
   * Delete a file from a bucket.
   * @return {*}  {Promise<void>}
   * @memberof Storage
   */
  async delete(): Promise<void> {
    await bucket.file(this.#path).delete();
  }

  /**
   * Delete an entire directory from a bucket.
   * @static
   * @param {string} folderPath
   * @return {*}  {Promise<void>}
   * @memberof Storage
   */
  static async deleteDirectory(folderPath: string): Promise<void> {
    await bucket.deleteFiles({
      prefix: folderPath,
    });
  }
}

export default Storage;
