import PremiumRegistration from '@models/premium-registration';
import { ActionTypes } from '@page-components/PremiumPage/RegisterInterestForm/types';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { schema } from '@page-components/PremiumPage/RegisterInterestForm/schema';
import { useContext, useReducer } from 'react';
import { useFormik } from 'formik';
import {
  Heading,
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Text,
  Collapse,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';
import {
  initialState,
  reducer,
} from '@page-components/PremiumPage/RegisterInterestForm/reducer';

/**
 * Form component to register interest in premium features.
 * @return {*}  {JSX.Element}
 */
const RegisterInterestForm = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, success, error } = state;
  const { appLoading } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values: { email: string }) => {
      dispatch({ type: ActionTypes.REGISTRATION_START });
      try {
        await PremiumRegistration.register(values.email.trim());
        dispatch({ type: ActionTypes.REGISTRATION_SUCCESS });
        formik.resetForm();
      } catch (error) {
        dispatch({ type: ActionTypes.REGISTRATION_ERROR });
      }
    },
    validationSchema: schema,
    initialErrors: {
      //@ts-ignore
      email: 'Email is a required field',
    },
  });

  const submitDisabled = !formik.isValid || appLoading || loading;
  const submitLoading = formik.isSubmitting || appLoading || loading;

  return (
    <VStack spacing={4} alignItems='stretch' maxW='md' alignSelf='center'>
      <Heading size='lg' textAlign='center'>
        Register your interest for a premium experience
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing='8px' alignItems='stretch' maxW='md' alignSelf='center'>
          <Collapse in={success} animateOpacity>
            <Alert status='info' mb='8px' rounded='md'>
              <AlertIcon />
              Registration successful
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
              Registration failed
              <CloseButton
                onClick={() => dispatch({ type: ActionTypes.RESET_ERROR })}
                position='absolute'
                right='8px'
                top='8px'
              />
            </Alert>
          </Collapse>
          <FormControl
            isInvalid={formik.touched.email && !!formik.errors.email}
          >
            <Input
              placeholder='Enter your email to register'
              onBlur={formik.handleBlur('email')}
              onChange={formik.handleChange('email')}
              value={formik.values.email}
              isReadOnly={submitLoading}
              isRequired
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <Button
            rounded='full'
            colorScheme='blue'
            type='submit'
            disabled={submitDisabled}
            isLoading={submitLoading}
            loadingText='Registering...'
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

export default RegisterInterestForm;
