import Firestore from '@server/utils/firestore';
import Metadata from '@server/models/metadata';

/**
 * A class representing a Premium Registration.
 * @class PremiumRegistration
 */
class PremiumRegistration {
  /**
   * Creates a database entry for this registration.
   * @static
   * @param {string} email
   * @return {*}  {Promise<void>}
   * @memberof PremiumRegistration
   */
  static async register(email: string): Promise<void> {
    const metadata = new Metadata();
    await Firestore.create('premium-registrations', {
      email: email,
      metadata: metadata.object,
    });
  }
}

export default PremiumRegistration;
