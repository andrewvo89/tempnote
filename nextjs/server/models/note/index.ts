import Crypto from '@server/utils/crypto';
import Firestore from '@server/utils/firestore';
import Hash from '@server/utils/hash';
import Image from '@server/utils/image';
import Metadata from '@server/models/metadata';
import path from 'path';
import Storage from '@server/utils/storage';
import { LinkIdFields } from '@server/models/note/types';
import { RawDraftContentState, RawDraftEntity } from 'draft-js';
/**
 * Class representing a Note.
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
  #salt: Buffer | null;
  #metadata: Metadata;

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
   * @param {(Buffer | null)} salt
   * @param {Metadata} metadata
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
    salt: Buffer | null,
    metadata: Metadata,
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
    this.#salt = salt;
    this.#metadata = metadata;
  }

  /**
   * Get the ID of the note.
   * @readonly
   * @type {string}
   * @memberof Note
   */
  get noteId(): string {
    return this.#noteId;
  }

  /**
   * Get the access link ID.
   * @readonly
   * @type {string}
   * @memberof Note
   */
  get accessLinkId(): string {
    return this.#accessLinkId;
  }

  /**
   * Get the delete link ID.
   * @readonly
   * @type {(string | null)}
   * @memberof Note
   */
  get deleteLinkId(): string | null {
    return this.#deleteLinkId;
  }

  /**
   * Get whether or not a delete link is enabled.
   * @readonly
   * @type {boolean}
   * @memberof Note
   */
  get deleteLinkEnabled(): boolean {
    return this.#deleteLinkEnabled;
  }

  /**
   * Get the note's expiry date.
   * @readonly
   * @type {Date}
   * @memberof Note
   */
  get expiryDate(): Date {
    return this.#expiryDate;
  }

  /**
   * Get the note's expiry minutes.
   * @readonly
   * @type {number}
   * @memberof Note
   */
  get expiryMinutes(): number {
    return this.#expiryMinutes;
  }

  /**
   * Get whether or not there is views limit.
   * @readonly
   * @type {boolean}
   * @memberof Note
   */
  get viewsLimitEnabled(): boolean {
    return this.#viewsLimitEnabled;
  }

  /**
   * Get the note's views limit.
   * @readonly
   * @type {number}
   * @memberof Note
   */
  get viewsLimit(): number | null {
    return this.#viewsLimit;
  }

  /**
   * Get the current views of the note.
   * @readonly
   * @type {number}
   * @memberof Note
   */
  get viewsCount(): number {
    return this.#viewsCount;
  }

  /**
   * Get the whether or password is enabled.
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
   * Get the encrypted content of the note.
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
   * Get the salt of the note.
   * @readonly
   * @type {(Buffer | null)}
   * @memberof Note
   */
  get salt(): Buffer | null {
    return this.#salt;
  }

  /**
   * Generate a document ID before writing to the database.
   * @static
   * @return {*}  {string}
   * @memberof Note
   */
  static generateDocumentId(): string {
    return Firestore.generateDocumentId('notes');
  }

  /**
   * Encrypt the note.
   * @static
   * @param {string} content
   * @param {Buffer} key
   * @return {*}  {Buffer}
   * @memberof Note
   */
  static encrypt(content: string, key: Buffer): Buffer {
    const contentBuffer = Buffer.from(content, 'utf-8');
    const contentEncrypted = Crypto.encrypt(contentBuffer, key);
    return contentEncrypted;
  }

  /**
   * Decrypt the note.
   * @static
   * @param {Buffer} content
   * @param {Buffer} key
   * @return {*}  {string}
   * @memberof Note
   */
  static decrypt(content: Buffer, key: Buffer): string {
    const contentDecrypted = Crypto.decrypt(content, key);
    return contentDecrypted.toString('utf-8');
  }

  /**
   * Get the hashed password of the note.
   * @static
   * @param {boolean} passwordEnabled
   * @param {string} password
   * @return {*}  {(Promise<string | null>)}
   * @memberof Note
   */
  static async getPassword(
    passwordEnabled: boolean,
    password: string,
  ): Promise<string | null> {
    if (!passwordEnabled) {
      return null;
    }
    const hashedPassword = await Hash.hash(password);
    return hashedPassword;
  }

  /**
   * Create metadata for this note.
   * @static
   * @return {*}  {Metadata}
   * @memberof Note
   */
  static createMetadata(): Metadata {
    const metadata = new Metadata();
    return metadata;
  }

  /**
   * Get note from database using access link ID or delete link ID.
   * @static
   * @param {string} linkId
   * @param {LinkIdFields} linkIdField
   * @return {*}  {(Promise<Note | null>)}
   * @memberof Note
   */
  static async getWithLinkId(
    linkId: string,
    linkIdField: LinkIdFields,
  ): Promise<Note | null> {
    const collection = await Firestore.get('notes')
      .where(linkIdField, '==', linkId)
      .limit(1)
      .get();
    if (collection.docs.length === 0) {
      return null;
    }

    const doc = collection.docs[0];

    // Download content from storage.
    const storagePath = `notes/${doc.id}/content`;
    const localPath = path.join('/tmp', 'content');
    const encryptedContent = await Storage.download(storagePath, localPath);
    await Storage.deleteLocal(localPath);

    const note = new Note(
      doc.id,
      doc.data().accessLinkId,
      doc.data().title,
      encryptedContent,
      doc.data().expiryDate.toDate(),
      doc.data().expiryMinutes,
      doc.data().viewsLimitEnabled,
      doc.data().viewsLimit,
      doc.data().viewsCount,
      doc.data().deleteLinkEnabled,
      doc.data().deleteLinkId,
      doc.data().passwordEnabled,
      doc.data().password,
      doc.data().salt,
      doc.data().metadata,
    );
    return note;
  }

  /**
   * Uploads image to storage bucket.
   * @static
   * @param {string} noteId
   * @param {RawDraftContentState} content
   * @return {*}  {Promise<{ [key: string]: RawDraftEntity }>}
   * @memberof Note
   */
  static async uploadImages(
    noteId: string,
    content: RawDraftContentState,
  ): Promise<{ [key: string]: RawDraftEntity }> {
    const entityMap = {
      ...content.entityMap,
    };
    for (const key in content.entityMap) {
      const type = content.entityMap[key].type;
      if (type === 'IMAGE') {
        const base64String = content.entityMap[key].data.src as string;
        const buffer = Image.encrypt(base64String);
        await Storage.upload(`notes/${noteId}/images/${key}`, buffer);
        entityMap[key].data.src = '';
      }
    }
    return entityMap;
  }

  /**
   * Downloads images and restores them into RawDraftEntity.
   * @static
   * @param {string} noteId
   * @param {RawDraftContentState} content
   * @return {*}  {Promise<{ [key: string]: RawDraftEntity }>}
   * @memberof Note
   */
  static async downloadImages(
    noteId: string,
    content: RawDraftContentState,
  ): Promise<{ [key: string]: RawDraftEntity }> {
    const entityMap = {
      ...content.entityMap,
    };
    for (const key in content.entityMap) {
      const type = content.entityMap[key].type;
      if (type === 'IMAGE') {
        const storagePath = `notes/${noteId}/images/${key}`;
        const localPath = path.join('/tmp', key);
        const buffer = await Storage.download(storagePath, localPath);
        const base64String = Image.decrypt(buffer);
        entityMap[key].data.src = base64String;
        // Clean up local storage
        await Storage.deleteLocal(localPath);
      }
    }
    return entityMap;
  }

  /**
   * Create a note in the database.
   * @return {*}  {Promise<void>}
   * @memberof Note
   */
  async create(): Promise<void> {
    await Storage.upload(`notes/${this.#noteId}/content`, this.#content);
    await Firestore.create(
      'notes',
      {
        accessLinkId: this.#accessLinkId,
        title: this.#title,
        expiryDate: this.#expiryDate,
        expiryMinutes: this.#expiryMinutes,
        viewsLimitEnabled: this.#viewsLimitEnabled,
        viewsLimit: this.#viewsLimit,
        viewsCount: this.#viewsCount,
        deleteLinkEnabled: this.#deleteLinkEnabled,
        deleteLinkId: this.#deleteLinkId,
        passwordEnabled: this.#passwordEnabled,
        password: this.#password,
        salt: this.#salt,
        metadata: this.#metadata.object,
      },
      this.#noteId,
    );
  }

  /**
   * Delete a note in the database.
   * @return {*}  {Promise<void>}
   * @memberof Note
   */
  async delete(): Promise<void> {
    await Firestore.delete('notes', this.#noteId);
  }

  /**
   * Increment the views count by 1 in the database.
   * @return {*}  {Promise<void>}
   * @memberof Note
   */
  async increaseViewCount(): Promise<void> {
    await Firestore.increment('notes', this.#noteId, 'viewsCount', 1);
  }
}

export default Note;
