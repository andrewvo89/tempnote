import { SendSmtpEmailBcc, SendSmtpEmailCc } from 'sib-api-v3-typescript';

export interface OptionalParameters {
  params?: Record<string, string>;
  cc?: SendSmtpEmailCc[];
  bcc?: SendSmtpEmailBcc[];
}
