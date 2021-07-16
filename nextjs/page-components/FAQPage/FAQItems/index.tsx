import FAQItem from '@page-components/FAQPage/FAQItems/FAQItem';
import { Fragment } from 'react';
import { Link } from '@chakra-ui/react';

/**
 * Collection of FAQ item components.
 * @return {*}  {JSX.Element}
 */
const FAQItems = (): JSX.Element => (
  <Fragment>
    <FAQItem
      question='Are my notes secure?'
      answer='Notes are encrypted on the server using AES-256 encryption before writing to the database. Not even system administrators or our cloud prodivers can see your note.'
    />
    <FAQItem
      question='Can I set a password for my notes?'
      answer='Of course, we encourgage you to password protect your notes. Not only will your note be protected by a password, the password will also be used to form the encryption key.'
    />
    <FAQItem
      question='Is the password I set for my note secure?'
      answer='Yes, all passwords are hashed before being stored into the database. This means your password is resistant to rainbow table attacks and brute force attacks.'
    />
    <FAQItem
      question='Are the pictures I upload within my note secure?'
      answer='All pictures undergo the same encyption methods as the note. They are not stored as viewable images on our servers.'
    />
    <FAQItem
      question='What happens when someone tries to access my link after it is expired?'
      answer='The user will be denied access. Once a note has expired, it gets deleted from the database for good and cannot be retrieved.'
    />
    <FAQItem
      question='Can I delete a note before the expiry time?'
      answer='Yes, upon creating a note there is an option to generate a manual destruction link. Use this link to invalidate the note at any time before the expiry time.'
    />
    <FAQItem
      question='I forgot the password to my notes, what can I do?'
      answer='Unfortunately, there is no password recovery mechanism right now so please write down your password when you create your protected note.'
    />
    <FAQItem
      question='Can I be notified when my note expires?'
      answer={
        <Fragment>
          {
            'This is a premium feature planned for the future. Register your interest on our '
          }
          <Link href='/premium' color='blue.400'>
            premium page.
          </Link>
        </Fragment>
      }
    />
    <FAQItem
      question='How long do the notes stay stored on the server?'
      answer='From the moment the note expires, the maximum amount of time it stays on the server is 1 hour after expiry.'
    />
    <FAQItem
      question='Is my data being shared with third party oragnizations or the government?'
      answer='We take privacy very seriously and make it a priority to keep your data safe and secure. Your data is encrypted upon writing to the disk and is deleted within an hour of the expiry time.'
    />
    <FAQItem
      question='Can I use Tempnote on my mobile device?'
      answer='Tempnote is very mobile friendly. The user interface is responsive to desktop, tablets and mobile devices.'
    />
    <FAQItem
      question='Can I see the source code for this app?'
      answer={
        <Fragment>
          {'Yes, this project is 100% open source and licensed under the '}
          <Link
            color='blue.400'
            href='https://github.com/andrewvo89/tempnote/blob/main/LICENSE'
            target='_blank noopener noreferrer'
          >
            MIT License
          </Link>
          {'. The code can be viewed '}
          <Link
            color='blue.400'
            href='https://github.com/andrewvo89/tempnote'
            target='_blank noopener noreferrer'
          >
            here
          </Link>
          {'.'}
        </Fragment>
      }
    />
  </Fragment>
);

export default FAQItems;
