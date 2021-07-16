/**
 * A class representing a Captcha.
 * @class Captcha
 */
class Captcha {
  /**
   * Gets the captcha token for submit action.
   * @static
   * @return {*}  {Promise<string>}
   * @memberof Captcha
   */
  static async get(): Promise<string> {
    await Captcha.captchaLoaded();
    const captchaToken: string = await new Promise((resolve, reject) =>
      window.grecaptcha.ready(async () => {
        const scriptElement = document.getElementById(
          'recaptcha',
        ) as HTMLScriptElement;
        if (scriptElement) {
          const recaptchaKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
          if (recaptchaKey) {
            const captchaToken = await window.grecaptcha.execute(recaptchaKey, {
              action: 'submit',
            });
            resolve(captchaToken);
          }
        } else {
          reject('Captcha not available');
        }
      }),
    );
    return captchaToken;
  }

  /**
   * Polls the window object every 100ms for the grecaptcha object.
   * @static
   * @return {*}  {Promise<void>}
   * @memberof Captcha
   */
  static async captchaLoaded(): Promise<void> {
    return await new Promise((resolve) => {
      const intervalTimer = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(intervalTimer);
          resolve();
        }
      }, 100);
    });
  }
}

export default Captcha;
