import Firestore from '@server/utils/firestore';
import Metadata from '@server/models/metadata';

/**
 * A class representing a Use Case.
 * @class UseCase
 */
class UseCase {
  /**
   * Creates a database entry for a use case submission.
   * @static
   * @param {string} name
   * @param {string} content
   * @return {*}  {Promise<void>}
   * @memberof UseCase
   */
  static async send(name: string, content: string): Promise<void> {
    const metadata = new Metadata();
    await Firestore.create('use-cases', {
      name: name,
      content: content,
      metadata: metadata.object,
    });
  }
}

export default UseCase;
