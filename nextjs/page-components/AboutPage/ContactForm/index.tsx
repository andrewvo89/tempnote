import Contact from '@models/contact';
import {
  ActionTypes,
  Form,
} from '@page-components/AboutPage/ContactForm/types';
import { AppContext } from '@components/AppProvider/ContextProvider';
import {
  initialState,
  reducer,
} from '@page-components/AboutPage/ContactForm/reducer';
import { schema } from '@page-components/AboutPage/ContactForm/schema';
import { useContext, useReducer } from 'react';
import { useFormik } from 'formik';
import {
  HStack,
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Text,
  Link,
  Textarea,
  Collapse,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';

/**
 * Contact for component.
 * @return {*}  {JSX.Element}
 */
const ContactForm = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, success, error } = state;
  const { appLoading } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async (values: Form) => {
      dispatch({ type: ActionTypes.SEND_MESSAGE_START });
      try {
        await Contact.sendMessage(
          values.name.trim(),
          values.email.trim(),
          values.message.trim(),
        );
        dispatch({ type: ActionTypes.SEND_MESSAGE_SUCCESS });
        formik.resetForm();
      } catch (error) {
        dispatch({ type: ActionTypes.SEND_MESSAGE_ERROR });
      }
    },
    validationSchema: schema,
    initialErrors: {
      //@ts-ignore
      name: 'Full name is a required field',
    },
  });

  const submitLoading = formik.isSubmitting || appLoading || loading;
  const submitDisabled = !formik.isValid || appLoading || loading;

  return (
    <VStack spacing='8px' alignItems='stretch' alignSelf='center' maxW='lg'>
      <Text fontSize='lg'>
        {'Please do not hesitate to contact us at '}
        <Link
          target='_blank noopener noreferrer'
          href='mailto:hello@tempnote.io'
          color='blue.400'
        >
          hello@tempnote.io
        </Link>
        {
          '. We are more than happy to answer any questions you have bout Tempnote or take on any valuable feedback you may give us.'
        }
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing='8px' alignItems='stretch'>
          <Collapse in={success} animateOpacity>
            <Alert status='info' mb='8px' rounded='md'>
              <AlertIcon />
              Message sent successfully
              <CloseButton
                onClick={() => dispatch({ type: ActionTypes.RESET_SUCCESS })}
                position='absolute'
                right='8px'
                top='8px'
              />
            </Alert>
          </Collapse>
          <Collapse in={error} animateOpacity>
            <Alert status='error' mb='8px' rounded='md'>
              <AlertIcon />
              Message failed
              <CloseButton
                onClick={() => dispatch({ type: ActionTypes.RESET_ERROR })}
                position='absolute'
                right='8px'
                top='8px'
              />
            </Alert>
          </Collapse>
          <HStack align='flex-start'>
            <FormControl
              isInvalid={formik.touched.name && !!formik.errors.name}
            >
              <Input
                placeholder='Your full name'
                onBlur={formik.handleBlur('name')}
                onChange={formik.handleChange('name')}
                value={formik.values.name}
                isReadOnly={submitLoading}
                isRequired
              />
              <Collapse in={!!formik.errors.name} animateOpacity>
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </Collapse>
            </FormControl>
            <FormControl
              isInvalid={formik.touched.email && !!formik.errors.email}
            >
              <Input
                placeholder='Your email address'
                onBlur={formik.handleBlur('email')}
                onChange={formik.handleChange('email')}
                value={formik.values.email}
                isReadOnly={submitLoading}
                isRequired
              />
              <Collapse in={!!formik.errors.email} animateOpacity>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </Collapse>
            </FormControl>
          </HStack>
          <FormControl
            isInvalid={formik.touched.message && !!formik.errors.message}
          >
            <Textarea
              placeholder='Your message'
              onBlur={formik.handleBlur('message')}
              onChange={formik.handleChange('message')}
              value={formik.values.message}
              isReadOnly={submitLoading}
              rows={8}
              isRequired
            />
            <Collapse in={!!formik.errors.message} animateOpacity>
              <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
            </Collapse>
          </FormControl>
          <Button
            rounded='full'
            colorScheme='blue'
            type='submit'
            disabled={submitDisabled}
            isLoading={submitLoading}
            loadingText='Sending message...'
            spinnerPlacement='start'
          >
            Submit
          </Button>
          <Text
            textAlign='center'
            color='var(--chakra-colors-gray-600)'
            fontSize='sm'
          >
            {"You won't receive spam from Tempnote"}
          </Text>
        </VStack>
      </form>
    </VStack>
  );
};

export default ContactForm;
