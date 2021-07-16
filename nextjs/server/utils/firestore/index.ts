import firebase from '@server/utils/firebase';
const firestore = firebase.firestore();

/**
 * A class representing Firestore.
 * @class Firestore
 */
class Firestore {
  /**
   * Generate a document ID of a document inside a collection.
   * @param {string} collectionName
   * @return {*}  {string}
   */
  static generateDocumentId = (collectionName: string): string => {
    const doc = firestore.collection(collectionName).doc();
    return doc.id;
  };

  /**
   * Creates a document in the database.
   * @static
   * @param {string} collectionName
   * @param {{ [key: string]: any }} data
   * @param {string} [docId]
   * @return {*}  {Promise<void>}
   * @memberof Firestore
   */
  static async create(
    collectionName: string,
    data: { [key: string]: any },
    docId?: string,
  ): Promise<void> {
    const collectionRef = firestore.collection(collectionName);
    // If document id is supplied, run create() function
    if (docId) {
      const docRef = collectionRef.doc(docId);
      await docRef.create(data);
      return;
    }
    // Otherwise run add() function which generates a docId for you
    await collectionRef.add(data);
  }

  /**
   * Gets a colletion reference.
   * @static
   * @param {string} collectionName
   * @return {*}  {FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>}
   * @memberof Firestore
   */
  static get(
    collectionName: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return firestore.collection(collectionName);
  }

  /**
   * Deletes a document from the database.
   * @static
   * @param {string} collectionName
   * @param {string} documentId
   * @return {*}  {Promise<void>}
   * @memberof Firestore
   */
  static async delete(
    collectionName: string,
    documentId: string,
  ): Promise<void> {
    await firestore.collection(collectionName).doc(documentId).delete();
  }

  /**
   * Increments a field value in a document.
   * @static
   * @param {string} collectionName
   * @param {string} documentId
   * @param {string} fieldName
   * @param {number} amount
   * @return {*}  {Promise<void>}
   * @memberof Firestore
   */
  static async increment(
    collectionName: string,
    documentId: string,
    fieldName: string,
    amount: number,
  ): Promise<void> {
    await firestore
      .collection(collectionName)
      .doc(documentId)
      .update({
        [fieldName]: firebase.firestore.FieldValue.increment(amount),
      });
  }
}

export default Firestore;
