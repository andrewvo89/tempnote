import ContactMessage from '../models/contact-message';
import Firebase from '../utils/firebase';
import Note from '../models/note';
import PremiumRegistration from '../models/premium-registration';
import Statistic from '../models/statistic';
import UseCaseSubmission from '../models/use-case-submission';
import functions = require('firebase-functions');
import dayjs = require('dayjs');
import utc = require('dayjs/plugin/utc');
import timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

/** Log statitics on how notes are used. */
export const updateStatistics = functions
  .runWith(Firebase.getRuntimeOptions())
  .firestore.document('notes/{docId}')
  .onCreate(async (doc) => {
    const note = new Note(
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
    );
    await Statistic.update(note);
  });

/** Side effect of document being deleted in firestore. */
export const deleteStorageFiles = functions
  .runWith(Firebase.getRuntimeOptions())
  .firestore.document('notes/{docId}')
  .onDelete(async (doc) => {
    const note = new Note(
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
    );
    // Delete all associated files in storage buckets
    await note.deleteAllFiles();
  });

/** For when a user registers interest in premium features. */
export const sendPremiumRegistrationEmails = functions
  .runWith(Firebase.getRuntimeOptions())
  .firestore.document('premium-registrations/{docId}')
  .onCreate(async (doc) => {
    const email = doc.data().email as string;
    const premiumRegistration = new PremiumRegistration(email);
    await Promise.all([
      // Send email to self
      premiumRegistration.sendEmailToSelf(),
      // Send email to use to notify them
      premiumRegistration.sendEmailToUser(),
    ]);
  });

/** When a user contacts Tempnote. */
export const sendContactMessageEmails = functions
  .runWith(Firebase.getRuntimeOptions())
  .firestore.document('contact-messages/{docId}')
  .onCreate(async (doc) => {
    const email = doc.data().email as string;
    const name = doc.data().name as string;
    const message = doc.data().message as string;
    const contactMessage = new ContactMessage(email, name, message);
    await Promise.all([
      // Send email to self
      contactMessage.sendEmailToSelf(),
      // Send email to use to notify them
      contactMessage.sendEmailToUser(),
    ]);
  });

/** When user submits a use case. */
export const sendUseCaseSubmissionEmail = functions
  .runWith(Firebase.getRuntimeOptions())
  .firestore.document('use-cases/{docId}')
  .onCreate(async (doc) => {
    const name = doc.data().name as string;
    const content = doc.data().content as string;
    const useCaseSubmission = new UseCaseSubmission(name, content);
    // Send email to self
    await useCaseSubmission.sendEmailToSelf();
  });
