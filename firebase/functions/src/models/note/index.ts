import Firestore from '../../utils/firestore';
import Storage from '../../utils/storage';
import admin = require('firebase-admin');

/**
 * A class representing a Note.
 * @class Note
 */
class Note {
  #noteId: string;
  #accessLinkId: string;
  #title: Buffer;
  #content: Buffer;
  #expiryDate: Date;
  #expiryMinutes: number;
  #viewsLimitEnabled: boolean;
  #viewsLimit: number | null;
  #viewsCount: number;
  #deleteLinkEnabled: boolean;
  #deleteLinkId: string | null;
  #passwordEnabled: boolean;
  #password: string | null;
  #metadata: {
    createdAt: Date;
    updatedAt: Date;
  };

  /**
   * Creates an instance of Note.
   * @param {string} noteId
   * @param {string} accessLinkId
   * @param {Buffer} title
   * @param {Buffer} content
   * @param {Date} expiryDate
   * @param {number} expiryMinutes
   * @param {boolean} viewsLimitEnabled
   * @param {(number | null)} viewsLimit
   * @param {number} viewsCount
   * @param {boolean} deleteLinkEnabled
   * @param {(string | null)} deleteLinkId
   * @param {boolean} passwordEnabled
   * @param {(string | null)} password
   * @param {{
   *       createdAt: Date;
   *       updatedAt: Date;
   *     }} metadata
   * @memberof Note
   */
  constructor(
    noteId: string,
    accessLinkId: string,
    title: Buffer,
    content: Buffer,
    expiryDate: Date,
    expiryMinutes: number,
    viewsLimitEnabled: boolean,
    viewsLimit: number | null,
    viewsCount: number,
    deleteLinkEnabled: boolean,
    deleteLinkId: string | null,
    passwordEnabled: boolean,
    password: string | null,
    metadata: {
      createdAt: Date;
      updatedAt: Date;
    },
  ) {
    this.#noteId = noteId;
    this.#accessLinkId = accessLinkId;
    this.#title = title;
    this.#content = content;
    this.#expiryDate = expiryDate;
    this.#expiryMinutes = expiryMinutes;
    this.#viewsLimitEnabled = viewsLimitEnabled;
    this.#viewsLimit = viewsLimit;
    this.#viewsCount = viewsCount;
    this.#deleteLinkEnabled = deleteLinkEnabled;
    this.#deleteLinkId = deleteLinkId;
    this.#passwordEnabled = passwordEnabled;
    this.#password = password;
    this.#metadata = metadata;
  }

  /**
   * Get the ID of a note.
   * @readonly
   * @type {string}
   * @memberof Note
   */
  get noteId(): string {
    return this.#noteId;
  }

  /**
   * Get the metadata.
   * @readonly
   * @type {{
   *     createdAt: Date;
   *     updatedAt: Date;
   *   }}
   * @memberof Note
   */
  get metadata(): {
    createdAt: Date;
    updatedAt: Date;
  } {
    return this.#metadata;
  }

  /**
   * Get access link ID.
   * @readonly
   * @type {string}
   * @memberof Note
   */
  get accessLinkId(): string {
    return this.#accessLinkId;
  }

  /**
   * Get delete link ID.
   * @readonly
   * @type {(string | null)}
   * @memberof Note
   */
  get deleteLinkId(): string | null {
    return this.#deleteLinkId;
  }

  /**
   * Get whether a delete link is enabled on the note.
   * @readonly
   * @type {boolean}
   * @memberof Note
   */
  get deleteLinkEnabled(): boolean {
    return this.#deleteLinkEnabled;
  }

  /**
   * Get the expiry date of the note.
   * @readonly
   * @type {Date}
   * @memberof Note
   */
  get expiryDate(): Date {
    return this.#expiryDate;
  }

  /**
   * Get the expiry minutes.
   * @readonly
   * @type {number}
   * @memberof Note
   */
  get expiryMinutes(): number {
    return this.#expiryMinutes;
  }

  /**
   * Get where the note as a views limit.
   * @readonly
   * @type {boolean}
   * @memberof Note
   */
  get viewsLimitEnabled(): boolean {
    return this.#viewsLimitEnabled;
  }

  /**
   * Get the views limite.
   * @readonly
   * @type {(number | null)}
   * @memberof Note
   */
  get viewsLimit(): number | null {
    return this.#viewsLimit;
  }

  /**
   * Get the views count.
   * @readonly
   * @type {number}
   * @memberof Note
   */
  get viewsCount(): number {
    return this.#viewsCount;
  }

  /**
   * Get whether or not password is enabled.
   * @readonly
   * @type {boolean}
   * @memberof Note
   */
  get passwordEnabled(): boolean {
    return this.#passwordEnabled;
  }

  /**
   * Get the password of the note.
   * @readonly
   * @type {(string | null)}
   * @memberof Note
   */
  get password(): string | null {
    return this.#password;
  }

  /**
   * Get the encrypted content.
   * @readonly
   * @type {Buffer}
   * @memberof Note
   */
  get content(): Buffer {
    return this.#content;
  }

  /**
   * Get the encrypted title.
   * @readonly
   * @type {Buffer}
   * @memberof Note
   */
  get title(): Buffer {
    return this.#title;
  }

  /**
   * Get all notes that are expired.
   * @static
   * @return {*}  {Promise<Note[]>}
   * @memberof Note
   */
  static async getExpired(): Promise<Note[]> {
    const NOW_TIMESTAMP = admin.firestore.Timestamp.fromMillis(
      new Date().getTime(),
    );
    const collection = await Firestore.get('notes')
      .where('expiryDate', '<=', NOW_TIMESTAMP)
      .get();
    const notes = collection.docs.map(
      (doc) =>
        new Note(
          doc.id,
          doc.data().accessLinkId,
          doc.data().title,
          doc.data().content,
          doc.data().expiryDate.toDate(),
          doc.data().expiryMinutes,
          doc.data().viewsLimitEnabled,
          doc.data().viewsLimit,
          doc.data().viewsCount,
          doc.data().deleteLinkEnabled,
          doc.data().deleteLinkId,
          doc.data().passwordEnabled,
          doc.data().password,
          doc.data().metadata,
        ),
    );
    return notes;
  }

  /**
   * Get a firestore document ref for a note.
   * @return {*}  {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>}
   * @memberof Note
   */
  getDocRef(): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> {
    return Firestore.getDocRef('notes', this.#noteId);
  }

  /**
   * Delete all files associated with the note.
   * @return {*}  {Promise<void>}
   * @memberof Note
   */
  async deleteAllFiles(): Promise<void> {
    await Storage.deleteDirectory(`notes/${this.#noteId}`);
  }
}

export default Note;
