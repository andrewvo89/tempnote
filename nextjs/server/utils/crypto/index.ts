import crypto from 'crypto';
import { ALGORITHM } from '@server/utils/crypto/types';

/**
 * A class representing Crypto.
 * @see https://stackoverflow.com/questions/6953286/how-to-encrypt-data-that-needs-to-be-decrypted-in-node-js
 * @class Crypto
 */
class Crypto {
  /**
   * Get a random ciper iv
   * @static
   * @return {*}  {Buffer}
   * @memberof Crypto
   */
  static getIV(): Buffer {
    return crypto.randomBytes(ALGORITHM.IV_BYTE_LEN);
  }

  /**
   * Get salt to prevent rainbow attacks
   * @static
   * @return {*}  {Buffer}
   * @memberof Crypto
   */
  static getSalt(): Buffer {
    return crypto.randomBytes(ALGORITHM.SALT_BYTE_LEN);
  }

  /**
   * To be used when key needs to be generated based on password.
   * The caller of this function has the responsibility to clear
   * the Buffer after the key generation to prevent the password
   * from lingering in the memory
   * @static
   * @param {Buffer} password - The password to be used for generating key
   * @param {Buffer} salt - The salt rounds to be ysed
   * @return {*} {Buffer}
   * @memberof Crypto
   */
  static getKeyFromPassword(password: Buffer, salt: Buffer): Buffer {
    return crypto.scryptSync(password, salt, ALGORITHM.KEY_BYTE_LEN);
  }

  /**
   * The caller of this function has the responsibility to clear
   * the Buffer after the encryption to prevent the message text
   * and the key from lingering in the memory
   * @static
   * @param {Buffer} messagetext - The clear text message to be encrypted
   * @param {Buffer} key - The key to be used for encryption
   * @return {*}  {Buffer}
   * @memberof Crypto
   */
  static encrypt(messagetext: Buffer, key: Buffer): Buffer {
    const iv = Crypto.getIV();
    const cipher = crypto.createCipheriv(ALGORITHM.BLOCK_CIPHER, key, iv, {
      authTagLength: ALGORITHM.AUTH_TAG_BYTE_LEN,
    });
    let encryptedMessage = cipher.update(messagetext);
    encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()]);
    return Buffer.concat([iv, encryptedMessage, cipher.getAuthTag()]);
  }

  /**
   * The caller of this function has the responsibility to clear
   * the Buffer after the decryption to prevent the message text
   * and the key from lingering in the memory
   * @static
   * @param {Buffer} ciphertext - Cipher text
   * @param {Buffer} key - The key to be used for decryption
   * @return {*}  {Buffer}
   * @memberof Crypto
   */
  static decrypt(ciphertext: Buffer, key: Buffer): Buffer {
    const authTag = ciphertext.slice(-16);
    const iv = ciphertext.slice(0, 12);
    const encryptedMessage = ciphertext.slice(12, -16);
    const decipher = crypto.createDecipheriv(ALGORITHM.BLOCK_CIPHER, key, iv, {
      authTagLength: ALGORITHM.AUTH_TAG_BYTE_LEN,
    });
    decipher.setAuthTag(authTag);
    let messagetext = decipher.update(encryptedMessage);
    messagetext = Buffer.concat([messagetext, decipher.final()]);
    return messagetext;
  }
}

export default Crypto;
