import Firebase from './utils/firebase';
import dotenv = require('dotenv');

/** These initialization actions must occur before the rest of the imports. */
dotenv.config();
Firebase.initialize();

/** Scheduled functions. */
import {
  deleteExpiredNotes,
  createStatisticsDocument,
} from './scheduled-functions';

/** Firestore listeners. */
import {
  updateStatistics,
  deleteStorageFiles,
  sendContactMessageEmails,
  sendPremiumRegistrationEmails,
  sendUseCaseSubmissionEmail,
} from './firestore-listeners';

export {
  updateStatistics,
  deleteExpiredNotes,
  createStatisticsDocument,
  deleteStorageFiles,
  sendContactMessageEmails,
  sendPremiumRegistrationEmails,
  sendUseCaseSubmissionEmail,
};
