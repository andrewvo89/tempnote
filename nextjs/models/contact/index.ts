import axios from 'axios';
import Captcha from '@models/captcha';

/**
 * A class representing a Contact.
 * @class Contact
 */
class Contact {
  /**
   * Sends a POST request to the backend to submit the contact message form.
   * @static
   * @param {string} name
   * @param {string} email
   * @param {string} message
   * @return {*}  {Promise<void>}
   * @memberof Contact
   */
  static async sendMessage(
    name: string,
    email: string,
    message: string,
  ): Promise<void> {
    const captchaToken = await Captcha.get();
    await axios.post('/api/contact/send-message', {
      name: name,
      email: email,
      message: message,
      captchaToken: captchaToken,
    });
  }
}

export default Contact;
