import Email from '../../utils/email';
import { SendSmtpEmailTo } from 'sib-api-v3-typescript';

/**
 * A class representing a Use Case submission.
 * @class UseCaseSubmission
 */
class UseCaseSubmission {
  #name: string;
  #content: string;
  /**
   * Creates an instance of UseCaseSubmission.
   * @param {string} name
   * @param {string} content
   * @memberof UseCaseSubmission
   */
  constructor(name: string, content: string) {
    this.#name = name;
    this.#content = content;
  }

  /**
   * Send an email to self as a notification.
   * @return {*}  {Promise<void>}
   * @memberof UseCaseSubmission
   */
  async sendEmailToSelf(): Promise<void> {
    const toEmail = new SendSmtpEmailTo();
    toEmail.email = process.env.DEFAULT_EMAIL_ADDRESS as string;
    const email = new Email([toEmail], 5, {
      params: {
        name: this.#name,
        content: this.#content,
      },
    });
    await email.send();
  }
}

export default UseCaseSubmission;
