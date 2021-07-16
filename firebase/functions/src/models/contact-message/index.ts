import Email from '../../utils/email';
import { SendSmtpEmailBcc, SendSmtpEmailTo } from 'sib-api-v3-typescript';

/**
 * A class representing a Contact Message.
 * @class ContactMessage
 */
class ContactMessage {
  #email: string;
  #name: string;
  #message: string;
  /**
   * Creates an instance of ContactMessage.
   * @param {string} email
   * @param {string} name
   * @param {string} message
   * @memberof ContactMessage
   */
  constructor(email: string, name: string, message: string) {
    this.#email = email;
    this.#name = name;
    this.#message = message;
  }

  /**
   * Send an email to self to notify of new contact message
   * @return {*}  {Promise<void>}
   * @memberof ContactMessage
   */
  async sendEmailToSelf(): Promise<void> {
    const toEmail = new SendSmtpEmailTo();
    toEmail.email = process.env.DEFAULT_EMAIL_ADDRESS as string;
    const email = new Email([toEmail], 3, {
      params: {
        email: this.#email,
        name: this.#name,
        message: this.#message,
      },
    });
    await email.send();
  }

  /**
   * Send an email to user to confirm their contact message has been recieved.
   * @return {*}  {Promise<void>}
   * @memberof ContactMessage
   */
  async sendEmailToUser(): Promise<void> {
    const toEmail = new SendSmtpEmailTo();
    toEmail.email = this.#email;
    const bccEmail = new SendSmtpEmailBcc();
    bccEmail.email = process.env.DEFAULT_EMAIL_ADDRESS as string;
    const email = new Email([toEmail], 4, {
      bcc: [bccEmail],
      params: {
        name: this.#name,
      },
    });
    await email.send();
  }
}

export default ContactMessage;
