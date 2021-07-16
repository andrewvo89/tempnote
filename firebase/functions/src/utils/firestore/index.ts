import admin = require('firebase-admin');
const firestore = admin.firestore();

/**
 * A class representing Firestore.
 *
 * @class Firestore
 */
class Firestore {
  /**
   * Generate a document ID for any collection.
   * @static
   * @param {string} collectionName
   * @memberof Firestore
   */
  static generateDocumentId = (collectionName: string): string => {
    const doc = firestore.collection(collectionName).doc();
    return doc.id;
  };

  /**
   * Create a document in a collection.
   * @static
   * @param {string} collectionName
   * @param {Record<string, unknown>} data
   * @param {string} [docId]
   * @return {*}  {Promise<void>}
   * @memberof Firestore
   */
  static async create(
    collectionName: string,
    data: Record<string, unknown>,
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
   * Update a document in a collection.
   * @static
   * @param {string} collectionName
   * @param {string} docId
   * @param {Record<string, unknown>} data
   * @return {*}  {Promise<void>}
   * @memberof Firestore
   */
  static async update(
    collectionName: string,
    docId: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    const collectionRef = firestore.collection(collectionName);
    const docRef = collectionRef.doc(docId);
    await docRef.update(data);
  }

  /**
   * Set a document in a collection.
   * @static
   * @param {string} collectionName
   * @param {string} docId
   * @param {Record<string, unknown>} data
   * @param {boolean} merge
   * @return {*}  {Promise<void>}
   * @memberof Firestore
   */
  static async set(
    collectionName: string,
    docId: string,
    data: Record<string, unknown>,
    merge: boolean,
  ): Promise<void> {
    const collectionRef = firestore.collection(collectionName);
    const docRef = collectionRef.doc(docId);
    await docRef.set(data, { merge: merge });
  }

  /**
   * Get a collection reference.
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
   * Get a document reference.
   * @static
   * @param {string} colletionName
   * @param {string} docId
   * @return {*}  {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>}
   * @memberof Firestore
   */
  static getDocRef(
    colletionName: string,
    docId: string,
  ): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> {
    return this.get(colletionName).doc(docId);
  }

  /**
   * Delete a document from a collection.
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
   * Increment a field value in a document.
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
        [fieldName]: admin.firestore.FieldValue.increment(amount),
      });
  }

  /**
   * Get the increment field value.
   * @static
   * @param {number} amount
   * @return {*}  {FirebaseFirestore.FieldValue}
   * @memberof Firestore
   */
  static incrementFieldValue(amount: number): FirebaseFirestore.FieldValue {
    return admin.firestore.FieldValue.increment(amount);
  }

  /**
   * Get a firestore batch value.
   * @static
   * @return {*}  {FirebaseFirestore.WriteBatch}
   * @memberof Firestore
   */
  static getBatch(): FirebaseFirestore.WriteBatch {
    return admin.firestore().batch();
  }
}

export default Firestore;
