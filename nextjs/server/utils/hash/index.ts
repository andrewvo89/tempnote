import bcrypt from 'bcrypt';
/**
 * A class representing Hash.
 * @class Hash
 */
class Hash {
  /**
   * Hash a plain text password.
   * @static
   * @param {string} password
   * @return {*}  {Promise<string>}
   * @memberof Hash
   */
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  }

  /**
   * Compare a plain text password with a hashed password.
   * @static
   * @param {string} password
   * @param {string} hashedPassword
   * @return {*}  {Promise<boolean>}
   * @memberof Hash
   */
  static async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  }
}

export default Hash;
