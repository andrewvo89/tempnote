export interface Props {
  heroImage: string;
}

export interface ExpiryOption {
  name: string;
  value: number;
}

export const expiryOptions: ExpiryOption[] = [
  {
    name: '5 minutes',
    value: 5,
  },
  {
    name: '15 minutes',
    value: 15,
  },
  {
    name: '30 minutes',
    value: 30,
  },
  {
    name: '1 hour',
    value: 60,
  },
  {
    name: '6 hours',
    value: 360,
  },
  {
    name: '12 hours',
    value: 720,
  },
  {
    name: '1 day',
    value: 1440,
  },
  {
    name: '3 days',
    value: 4320,
  },
  {
    name: '5 days',
    value: 7200,
  },
  {
    name: '1 week',
    value: 10080,
  },
];

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
    captchaOnLoad: () => void;
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => void;
  execute: (key: string, options: ReCaptchaExecuteOptions) => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => any;
}

interface ReCaptchaExecuteOptions {
  action: string;
}

interface ReCaptchaRenderOptions {
  sitekey: string;
  size: 'invisible';
}
