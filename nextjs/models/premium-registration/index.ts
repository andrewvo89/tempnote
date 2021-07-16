import axios from 'axios';
import Captcha from '@models/captcha';

/**
 * A class representing a Premium Registration.
 * @class PremiumRegistration
 */
class PremiumRegistration {
  /**
   * Sends a registration request to the backend using POST.
   * @static
   * @param {string} email
   * @return {*}  {Promise<void>}
   * @memberof PremiumRegistration
   */
  static async register(email: string): Promise<void> {
    const captchaToken = await Captcha.get();
    await axios.post('/api/premium/register', {
      email: email,
      captchaToken: captchaToken,
    });
  }
}

export default PremiumRegistration;
