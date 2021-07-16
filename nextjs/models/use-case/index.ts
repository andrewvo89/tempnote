import axios from 'axios';
import Captcha from '@models/captcha';

/**
 * A class representing a Use Case.
 * @class UseCase
 */
class UseCase {
  /**
   * Sends a POST request to the back end to register a new Use Case suggestion.
   * @static
   * @param {string} name
   * @param {string} content
   * @return {*}  {Promise<void>}
   * @memberof UseCase
   */
  static async send(name: string, content: string): Promise<void> {
    const captchaToken = await Captcha.get();
    await axios.post('/api/use-case/send', {
      name: name,
      content: content,
      captchaToken: captchaToken,
    });
  }
}

export default UseCase;
