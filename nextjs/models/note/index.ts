import axios from 'axios';
import Captcha from '@models/captcha';
import { ActionTypes } from '@models/note/types';
import { getGetUrl, getUnlockUrl } from '@server/utils/note';
import { NoteStatuses } from '@models/note/types';
import { RawDraftContentState } from 'draft-js';
import { Success } from '@components/AppProvider/ContextProvider/types';
/**
 * A class representing a Note.
 * @class Note
 */
class Note {
  #title: string;
  #content: string;
  #status: NoteStatuses;

  /**
   * Creates an instance of Note.
   * @param {string} title
   * @param {string} content
   * @param {NoteStatuses} status
   * @memberof Note
   */
  constructor(title: string, content: string, status: NoteStatuses) {
    this.#title = title;
    this.#content = content;
    this.#status = status;
  }

  /**
   * Get the title of a note.
   * @readonly
   * @type {string}
   * @memberof Note
   */
  get title(): string {
    return this.#title;
  }

  /**
   * Get the content of the note.
   * @readonly
   * @type {string}
   * @memberof Note
   */
  get content(): string {
    return this.#content;
  }

  /**
   * Get the note status of the note.
   * @readonly
   * @type {NoteStatuses}
   * @memberof Note
   */
  get status(): NoteStatuses {
    return this.#status;
  }

  /**
   * Sends a PUT request to the backend to create a note.
   * @static
   * @param {string} title
   * @param {RawDraftContentState} content
   * @param {number} expiryMinutes
   * @param {boolean} viewsLimitEnabled
   * @param {number} viewsLimit
   * @param {boolean} deleteLinkEnabled
   * @param {boolean} passwordEnabled
   * @param {string} password
   * @param {string} passwordConfirmation
   * @return {*}  {Promise<Success>}
   * @memberof Note
   */
  static async create(
    title: string,
    content: RawDraftContentState,
    expiryMinutes: number,
    viewsLimitEnabled: boolean,
    viewsLimit: number,
    deleteLinkEnabled: boolean,
    passwordEnabled: boolean,
    password: string,
    passwordConfirmation: string,
  ): Promise<Success> {
    const captchaToken = await Captcha.get();
    const response = await axios.post('/api/create', {
      title: title,
      content: content,
      expiryMinutes: expiryMinutes,
      viewsLimitEnabled: viewsLimitEnabled,
      viewsLimit: viewsLimit,
      deleteLinkEnabled: deleteLinkEnabled,
      passwordEnabled: passwordEnabled,
      password: password,
      passwordConfirmation: passwordConfirmation,
      captchaToken: captchaToken,
    });
    const success = response.data as Success;
    return success;
  }

  /**
   * Get the api URL for a link.
   * @static
   * @param {(string | null)} linkId
   * @param {string} page
   * @return {*}  {string}
   * @memberof Note
   */
  static getLink(linkId: string | null, page: string): string {
    if (!linkId) {
      return `${process.env.NEXT_PUBLIC_BASE_URL}`;
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${page}/${linkId}`;
  }

  /**
   * Get a note from the back end using a POST request.
   * @param  {string} linkId
   * @param  {ActionTypes} action
   */
  static async get(linkId: string, action: ActionTypes) {
    const captchaToken = await Captcha.get();
    const url = `${getGetUrl(action)}/${linkId}`;
    const response = await axios.post(url, {
      captchaToken: captchaToken,
    });
    return response.data;
  }

  /**
   * Send a POST request to the back end to delete a note.
   * @static
   * @param {string} deleteLinkId
   * @param {string} password
   * @return {*}  {Promise<void>}
   * @memberof Note
   */
  static async delete(deleteLinkId: string, password: string): Promise<void> {
    const captchaToken = await Captcha.get();
    await axios.post(`/api/delete/${deleteLinkId}`, {
      password: password,
      captchaToken: captchaToken,
    });
  }

  /**
   * Send a POST request to the back end to unlock a note with a password.
   * @static
   * @param {string} linkId
   * @param {string} password
   * @param {ActionTypes} action
   * @return {*}  {Promise<Note>}
   * @memberof Note
   */
  static async unlock(
    linkId: string,
    password: string,
    action: ActionTypes,
  ): Promise<Note> {
    const captchaToken = await Captcha.get();
    const url = `${getUnlockUrl(action)}/${linkId}`;
    const response = await axios.post(url, {
      password: password,
      captchaToken: captchaToken,
    });
    const note = new Note(
      response.data.title,
      response.data.content,
      response.data.status,
    );
    return note;
  }
}

export default Note;
