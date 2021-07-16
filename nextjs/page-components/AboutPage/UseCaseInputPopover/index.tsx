import BeatLoader from 'react-spinners/BeatLoader';
import UseCase from '@models/use-case';
import { ChangeEvent, useCallback, useEffect, useReducer, useRef } from 'react';
import { schema } from '@page-components/AboutPage/UseCaseInputPopover/schema';
import { useFormik } from 'formik';
import {
  Text,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  VStack,
  HStack,
  Textarea,
  Button,
  useColorModeValue,
  Collapse,
  Alert,
  AlertIcon,
  CloseButton,
  useToast,
  Popover,
  Portal,
  Input,
} from '@chakra-ui/react';
import {
  ActionTypes,
  Form,
  Props,
} from '@page-components/AboutPage/UseCaseInputPopover/types';
import {
  initialState,
  reducer,
} from '@page-components/AboutPage/UseCaseInputPopover/reducer';

/**
 * Popover component for use case input.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const UseCaseInputPopover = (props: Props): JSX.Element => {
  const { open, setOpen, children } = props;
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, success, error, debounced } = state;
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const color = useColorModeValue('gray.600', 'gray.400');
  const toast = useToast();

  useEffect(() => {
    if (success) {
      toast({
        title: 'Thank you!',
        description: 'Your use case has been submitted succesfully',
        status: 'info',
        duration: 10000,
        isClosable: true,
      });
      dispatch({ type: ActionTypes.RESET_STATE });
      setOpen(false);
    }
  }, [success, toast, setOpen]);

  const formik = useFormik({
    initialValues: {
      name: '',
      content: '',
    },
    onSubmit: async (values: Form) => {
      dispatch({ type: ActionTypes.SEND_USE_CASE_START });
      try {
        await UseCase.send(values.name.trim(), values.content.trim());
        dispatch({ type: ActionTypes.SEND_USE_CASE_SUCCESS });
        formik.resetForm();
      } catch (error) {
        dispatch({ type: ActionTypes.SEND_USE_CASE_ERROR });
      }
    },
    validationSchema: schema,
    initialErrors: {
      //@ts-ignore
      content: 'Use case is a required field',
    },
  });

  const { setFieldValue, validateField } = formik;

  /**
   * Gets the length of a trimmed string
   * @param {string} text
   * @return {*}  {number}
   */
  const getCharacterCount = (text: string): number => text.trim().length;

  const setDebounceField = useCallback(
    (field: string, value: any) => {
      if (debounced && debounceRef.current) {
        // If in debounced state, clear existing timer
        clearTimeout(debounceRef.current);
      }
      // Set field state, but don't validate
      setFieldValue(field, value, false);
      dispatch({ type: ActionTypes.SET_DEBOUNCE });
      // Run validation 3 seconds after to save on performance
      debounceRef.current = setTimeout(async () => {
        await validateField(field);
        dispatch({ type: ActionTypes.RESET_DEBOUNCED });
      }, 1000);
    },
    [debounced, setFieldValue, validateField],
  );

  return (
    <Popover isOpen={open} initialFocusRef={nameInputRef} closeOnBlur={false}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <form onSubmit={formik.handleSubmit}>
              <VStack align='stretch'>
                {!success && !error && (
                  <CloseButton
                    alignSelf='flex-end'
                    onClick={() => setOpen(false)}
                    disabled={formik.isSubmitting || debounced || loading}
                  />
                )}
                <Collapse in={error} animateOpacity>
                  <Alert status='error' mb='8px' rounded='md'>
                    <AlertIcon />
                    Message failed
                    <CloseButton
                      onClick={() =>
                        dispatch({ type: ActionTypes.RESET_ERROR })
                      }
                      position='absolute'
                      right='8px'
                      top='8px'
                    />
                  </Alert>
                </Collapse>
                <Input
                  ref={nameInputRef}
                  placeholder='Your name'
                  value={formik.values.name}
                  onBlur={formik.handleBlur('name')}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setDebounceField('name', event.currentTarget.value)
                  }
                  isInvalid={!!formik.errors.name && !!formik.touched.name}
                />
                <Textarea
                  rows={4}
                  resize='none'
                  placeholder='Your use case'
                  value={formik.values.content}
                  onBlur={formik.handleBlur('content')}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setDebounceField('content', event.currentTarget.value)
                  }
                  isInvalid={
                    !!formik.errors.content && !!formik.touched.content
                  }
                />
                <HStack justify='space-between' align='flex-start'>
                  <Text fontSize='sm' color={color}>{`${getCharacterCount(
                    formik.values.content,
                  )}/500`}</Text>
                  <Button
                    type='submit'
                    colorScheme='blue'
                    rounded='full'
                    disabled={!formik.isValid || debounced || loading}
                    isLoading={formik.isSubmitting || debounced || loading}
                    loadingText={debounced ? undefined : 'Sending...'}
                    spinner={
                      debounced ? (
                        <BeatLoader size={8} color='white' />
                      ) : undefined
                    }
                    spinnerPlacement='start'
                  >
                    Send
                  </Button>
                </HStack>
              </VStack>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default UseCaseInputPopover;
