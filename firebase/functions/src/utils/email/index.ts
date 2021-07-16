import { OptionalParameters } from './types';
import SibApiV3Sdk = require('sib-api-v3-typescript');
import http = require('http');

/**
 * A class representing an Email.
 * @class Email
 */
class Email {
  #to: SibApiV3Sdk.SendSmtpEmailTo[];
  #templateId: number;
  #optionalParameters?: OptionalParameters;

  /**
   * Creates an instance of Email.
   * @param {SibApiV3Sdk.SendSmtpEmailTo[]} to
   * @param {number} templateId
   * @param {OptionalParameters} [optionalParameters]
   * @memberof Email
   */
  constructor(
    to: SibApiV3Sdk.SendSmtpEmailTo[],
    templateId: number,
    optionalParameters?: OptionalParameters,
  ) {
    this.#to = to;
    this.#templateId = templateId;
    this.#optionalParameters = optionalParameters;
  }

  /**
   * Send an email using the SendInBlue SDK
   * @return {*}  {Promise<{
   *     response: http.IncomingMessage;
   *     body: SibApiV3Sdk.CreateSmtpEmail;
   *   }>}
   * @memberof Email
   */
  async send(): Promise<{
    response: http.IncomingMessage;
    body: SibApiV3Sdk.CreateSmtpEmail;
  }> {
    const { SEND_IN_BLUE_API_KEY } = process.env;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    // Configure API key authorization: apiKey
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      SEND_IN_BLUE_API_KEY as string,
    );
    // Initialize email properties
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = this.#to;
    sendSmtpEmail.templateId = this.#templateId;
    if (this.#optionalParameters) {
      if (this.#optionalParameters.params) {
        sendSmtpEmail.params = this.#optionalParameters.params;
      }
      if (this.#optionalParameters.cc) {
        sendSmtpEmail.cc = this.#optionalParameters.cc;
      }
      if (this.#optionalParameters.bcc) {
        sendSmtpEmail.bcc = this.#optionalParameters.bcc;
      }
    }
    // Send email
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return response;
  }
}

export default Email;
