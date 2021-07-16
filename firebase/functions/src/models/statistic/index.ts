import Firestore from '../../utils/firestore';
import Note from '../note';
import dayjs = require('dayjs');

/**
 * A class representing a Statistic
 * @class Statistic
 */
class Statistic {
  #date: string;
  #notes: number;
  #expiryMinutes: {
    '5': number;
    '15': number;
    '30': number;
    '60': number;
    '360': number;
    '720': number;
    '1440': number;
    '4320': number;
    '7200': number;
    '10080': number;
  };
  #viewsLimitEnabled: number;
  #deleteLinkEnabled: number;
  #passwordEnabled: number;

  /**
   * Creates an instance of Statistic.
   * @memberof Statistic
   */
  constructor() {
    this.#date = dayjs().add(1, 'hour').format('YYYY-MM-DD');
    this.#notes = 0;
    this.#expiryMinutes = {
      '5': 0,
      '15': 0,
      '30': 0,
      '60': 0,
      '360': 0,
      '720': 0,
      '1440': 0,
      '4320': 0,
      '7200': 0,
      '10080': 0,
    };
    this.#viewsLimitEnabled = 0;
    this.#deleteLinkEnabled = 0;
    this.#passwordEnabled = 0;
  }

  /**
   * Creates a statistic document for the day.
   * @return {*}  {Promise<void>}
   * @memberof Statistic
   */
  async create(): Promise<void> {
    await Firestore.set(
      'statistics',
      this.#date,
      {
        notes: this.#notes,
        expiryMinutes: this.#expiryMinutes,
        viewsLimitEnabled: this.#viewsLimitEnabled,
        deleteLinkEnabled: this.#deleteLinkEnabled,
        passwordEnabled: this.#passwordEnabled,
      },
      true,
    );
  }

  /**
   * Updates and merges an existing statistic document in the database.
   * @static
   * @param {Note} note
   * @return {*}  {Promise<void>}
   * @memberof Statistic
   */
  static async update(note: Note): Promise<void> {
    const data: {
      notes: FirebaseFirestore.FieldValue;
      expiryMinutes: {
        [key: number]: FirebaseFirestore.FieldValue;
      };
      viewsLimitEnabled?: FirebaseFirestore.FieldValue;
      deleteLinkEnabled?: FirebaseFirestore.FieldValue;
      passwordEnabled?: FirebaseFirestore.FieldValue;
    } = {
      notes: Firestore.incrementFieldValue(1),
      expiryMinutes: {
        [note.expiryMinutes]: Firestore.incrementFieldValue(1),
      },
    };
    if (note.viewsLimitEnabled) {
      data.viewsLimitEnabled = Firestore.incrementFieldValue(1);
    }
    if (note.deleteLinkEnabled) {
      data.deleteLinkEnabled = Firestore.incrementFieldValue(1);
    }
    if (note.passwordEnabled) {
      data.passwordEnabled = Firestore.incrementFieldValue(1);
    }
    await Firestore.set('statistics', dayjs().format('YYYY-MM-DD'), data, true);
  }
}

export default Statistic;
