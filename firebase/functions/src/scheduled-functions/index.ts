import Firebase from '../utils/firebase';
import Firestore from '../utils/firestore';
import Note from '../models/note';
import Statistic from '../models/statistic';
import functions = require('firebase-functions');

/** At 11:55pm GMT time every day create a new record for the next day's statistic document */
export const createStatisticsDocument = functions
  .runWith(Firebase.getRuntimeOptions())
  .pubsub.schedule('every day 23:55')
  .onRun(async () => {
    const statistic = new Statistic();
    await statistic.create();
  });

/** At second :00, at minute :00, every hour starting at 00am, of every day */
export const deleteExpiredNotes = functions
  .runWith(Firebase.getRuntimeOptions())
  .pubsub.schedule('every 1 hours from 00:00 to 23:59')
  .onRun(async () => {
    // Get any note with expiry date prior to now
    const notes = await Note.getExpired();
    const promises = [];
    // Start a new firestore batch
    let batch = Firestore.getBatch();
    let count = 0;
    // Loop through all expired notes and add each one to batch
    for (const note of notes) {
      batch.delete(note.getDocRef());
      count++;
      if (count === 500) {
        promises.push(batch.commit());
        batch = Firestore.getBatch();
        count = 0;
      }
    }
    promises.push(batch.commit());
    // Perform all batch commits in parrallel
    await Promise.all(promises);
  });
