import admin = require('firebase-admin');
import functions = require('firebase-functions');
/**
 * A class representing Firebase.
 *
 * @class Firebase
 */
class Firebase {
  /**
   * Firebase initialization.
   * @static
   * @memberof Firebase
   */
  static initialize() {
    admin.initializeApp();
    admin.firestore().settings({
      ignoreUndefinedProperties: true,
    });
  }

  /**
   * Get run time options for app.
   * @static
   * @return {*}  {functions.RuntimeOptions}
   * @memberof Firebase
   */
  static getRuntimeOptions(): functions.RuntimeOptions {
    const memory = process.env.FIREBASE_FUNCTIONS_MEMORY as string;
    const timeoutSeconds = process.env.FIREBASE_FUNCTIONS_TIMEOUT as string;
    return {
      memory: memory,
      timeoutSeconds: parseInt(timeoutSeconds),
    } as functions.RuntimeOptions;
  }
}

export default Firebase;
