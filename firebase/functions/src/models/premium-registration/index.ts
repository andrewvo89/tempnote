import Email from '../../utils/email';
import { SendSmtpEmailBcc, SendSmtpEmailTo } from 'sib-api-v3-typescript';

/**
 * A class representing a Premium Registration
 * @class PremiumRegistration
 */
class PremiumRegistration {
  #email: string;
  /**
   * Creates an instance of PremiumRegistration.
   * @param {string} email
   * @memberof PremiumRegistration
   */
  constructor(email: string) {
    this.#email = email;
  }

  /**
   * Sends an email to self as a notification.
   * @return {*}  {Promise<void>}
   * @memberof PremiumRegistration
   */
  async sendEmailToSelf(): Promise<void> {
    const toEmail = new SendSmtpEmailTo();
    toEmail.email = process.env.DEFAULT_EMAIL_ADDRESS as string;
    const email = new Email([toEmail], 1, {
      params: {
        email: this.#email,
      },
    });
    await email.send();
  }

  /**
   * Sends an email to the user to confirm their registration has been recieved.
   * @return {*}  {Promise<void>}
   * @memberof PremiumRegistration
   */
  async sendEmailToUser(): Promise<void> {
    const toEmail = new SendSmtpEmailTo();
    toEmail.email = this.#email;
    const bccEmail = new SendSmtpEmailBcc();
    bccEmail.email = process.env.DEFAULT_EMAIL_ADDRESS as string;
    const email = new Email([toEmail], 2, {
      bcc: [bccEmail],
    });
    await email.send();
  }
}

export default PremiumRegistration;
