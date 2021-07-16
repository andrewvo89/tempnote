import axios from 'axios';

/**
 * Class representing a Captcha.
 * @class Captcha
 */
class Captcha {
  #token: string;

  /**
   * Creates an instance of Captcha.
   * @param {string} token
   * @memberof Captcha
   */
  constructor(token: string) {
    this.#token = token;
  }

  /**
   * Get the token
   * @readonly
   * @memberof Captcha
   */
  get token() {
    return this.#token;
  }

  /**
   * @return {*}  {Promise<boolean>}
   * @memberof Captcha
   */

  /**
   * Determines if the token passes the max score threshold.
   * @param {number} maxScore
   * @return {*}  {Promise<boolean>}
   * @memberof Captcha
   */
  async validateToken(maxScore: number): Promise<boolean> {
    try {
      const captchaSecret = process.env.CAPTCHA_SERVER_API_KEY;
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${this.token}`,
      );
      const data = response.data;
      if (!data.success) {
        return false;
      }
      if (data.score <= maxScore) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default Captcha;
