export type CipherGCMTypes = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm';

export const ALGORITHM: {
  BLOCK_CIPHER: CipherGCMTypes;
  AUTH_TAG_BYTE_LEN: number;
  IV_BYTE_LEN: number;
  KEY_BYTE_LEN: number;
  SALT_BYTE_LEN: number;
} = {
  /**
   * GCM is an authenticated encryption mode that
   * not only provides confidentiality but also
   * provides integrity in a secured way.
   */
  BLOCK_CIPHER: 'aes-256-gcm',

  /**
   * 128 bit auth tag is recommended for GCM.
   */
  AUTH_TAG_BYTE_LEN: 16,

  /**
   * NIST recommends 96 bits or 12 bytes IV for GCM
   * to promote interoperability, efficiency, and
   * simplicity of design.
   */
  IV_BYTE_LEN: 12,

  /**
   * Note: 256 (in algorithm name) is key size.
   * Block size for AES is always 128.
   */
  KEY_BYTE_LEN: 32,

  /**
   * To prevent rainbow table attacks.
   */
  SALT_BYTE_LEN: 16,
};
