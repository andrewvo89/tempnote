import Crypto from '@server/utils/crypto';

/**
 * A class representing an Image.
 * @class Image
 */
class Image {
  /**
   * Encrypts an image's base64 string.
   * @static
   * @param {string} content
   * @return {*}  {Buffer}
   * @memberof Image
   */
  static encrypt(content: string): Buffer {
    // Get the encryption key
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error('Something went wrong!');
    }
    // Create a buffer for the encryption key
    const keyBuffer = Buffer.from(key, 'utf-8');
    // Encrypt the note
    const contentBuffer = Buffer.from(content, 'utf-8');
    const contentEncrypted = Crypto.encrypt(contentBuffer, keyBuffer);
    return contentEncrypted;
  }

  /**
   * Decrypts a buffer to a base64 string.
   * @static
   * @param {Buffer} content
   * @return {*}  {string}
   * @memberof Image
   */
  static decrypt(content: Buffer): string {
    // Get the encryption key
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error('Something went wrong!');
    }
    // Create a buffer for the encryption key
    const keyBuffer = Buffer.from(key, 'utf-8');
    // Encrypt the note
    // const contentBuffer = Buffer.from(content, 'utf-8');
    const contentDecrypted = Crypto.decrypt(content, keyBuffer);
    return contentDecrypted.toString('utf-8');
  }
}

export default Image;
