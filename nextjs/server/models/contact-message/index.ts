import Firestore from '@server/utils/firestore';
import Metadata from '@server/models/metadata';

/**
 * Class representing a Contact Message.
 * @class ContactMessage
 */
class ContactMessage {
  /**
   * Create a contact message document in the database.
   * @static
   * @param {string} name
   * @param {string} email
   * @param {string} message
   * @return {*}  {Promise<void>}
   * @memberof ContactMessage
   */
  static async create(
    name: string,
    email: string,
    message: string,
  ): Promise<void> {
    const metadata = new Metadata();
    await Firestore.create('contact-messages', {
      name: name,
      email: email,
      message: message,
      metadata: metadata.object,
    });
  }
}

export default ContactMessage;
