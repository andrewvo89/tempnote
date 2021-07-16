import BeatLoader from 'react-spinners/BeatLoader';
import dynamic from 'next/dynamic';
import ImageClass from '@utils/image';
import Note from 'models/note';
import styles from '@page-components/HomePage/styles.module.scss';
import { AppContext } from 'components/AppProvider/ContextProvider';
import { EditorState, Modifier, RawDraftContentState } from 'draft-js';
import { expiryOptions, Props } from '@page-components/HomePage/types';
import { getPluralText } from '@utils/data';
import { ImageTypes } from '@utils/image/types';
import { schema } from '@page-components/HomePage/schema';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { useRouter } from 'next/dist/client/router';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Editor as EditorType,
  SyntheticKeyboardEvent,
} from 'react-draft-wysiwyg';
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Container,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Select,
  Switch,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
  Box,
  Collapse,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  useToast,
  Link,
  useColorModeValue,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';

const Editor = dynamic(
  //@ts-ignore
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
) as typeof EditorType;

/**
 * Home page.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const HomePage = (props: Props): JSX.Element | null => {
  const { success, setSuccess, appLoading, setAppLoading, setStickyFooter } =
    useContext(AppContext);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const viewsLimitInputRef = useRef<HTMLInputElement | null>(null);
  const [debounced, setDebounced] = useState(false);

  const router = useRouter();
  const { push } = router;
  const toast = useToast();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  const textColor = useColorModeValue('gray.600', 'gray.400');
  const isMobile = useBreakpointValue([true, false]);
  const editorHeight = useBreakpointValue(['unset', '1px']);

  // Initialize page
  useEffect(() => {
    setPageLoaded(true);
    setSuccess(null);
    setAppLoading(false);
    setStickyFooter(false);
  }, [setSuccess, setAppLoading, setStickyFooter]);

  // If success is found from App context, go to success page
  useEffect(() => {
    if (!success) {
      return;
    }
    push('/success');
  }, [success, push, setAppLoading]);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: {
        blocks: [],
        entityMap: {},
      } as RawDraftContentState,
      expiryMinutes: expiryOptions[0].value,
      viewsLimitEnabled: false,
      viewsLimit: 1,
      deleteLinkEnabled: false,
      passwordEnabled: false,
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: async (values: {
      title: string;
      content: RawDraftContentState;
      expiryMinutes: number;
      viewsLimitEnabled: boolean;
      viewsLimit: number;
      deleteLinkEnabled: boolean;
      passwordEnabled: boolean;
      password: string;
      passwordConfirmation: string;
    }) => {
      setAppLoading(true);
      try {
        const responseData = await Note.create(
          values.title,
          values.content,
          values.expiryMinutes,
          values.viewsLimitEnabled,
          values.viewsLimit,
          values.deleteLinkEnabled,
          values.passwordEnabled,
          values.password,
          values.passwordConfirmation,
        );
        setSuccess(responseData);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Something went wrong',
          description: 'Sorry! Your note could not be created',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setAppLoading(false);
      }
    },
    validationSchema: schema,
    initialErrors: {
      //@ts-ignore
      content: 'Content is a required field',
    },
  });

  const {
    setFieldValue,
    validateField,
    values: { passwordEnabled, viewsLimitEnabled },
  } = formik;

  // Set focus to password field after enabling password
  useEffect(() => {
    if (passwordEnabled && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [passwordEnabled]);

  // Set focus to input field after enabling views limit
  useEffect(() => {
    if (viewsLimitEnabled && viewsLimitInputRef.current) {
      viewsLimitInputRef.current.focus();
    }
  }, [viewsLimitEnabled]);

  const setDebounceField = useCallback(
    (field: string, value: any) => {
      if (debounced && debounceRef.current) {
        // If in debounced state, clear existing timer
        clearTimeout(debounceRef.current);
      }
      // Set field state, but don't validate
      setFieldValue(field, value, false);
      setDebounced(true);
      // Run validation 3 seconds after to save on performance
      debounceRef.current = setTimeout(async () => {
        await validateField(field);
        setDebounced(false);
      }, 1000);
    },
    [debounced, setFieldValue, validateField],
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Show or hide the password field.
   * @return {*}  {void}
   */
  const showPasswordClickHandler = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  /**
   * Show or hide the confirm password field.
   * @return {*}  {void}
   */
  const showConfirmPasswordClickHandler = (): void => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  /**
   * Handle tab and shift+tab inside the editor.
   * @param {SyntheticKeyboardEvent} event
   * @return {*} {void}
   */
  const editorTabPressHandler = (event: SyntheticKeyboardEvent): void => {
    event.preventDefault();
    if (event.shiftKey) {
      const currentSelection = editorState.getSelection();
      const currentBlockKey = currentSelection.getAnchorKey();
      const currentPosition = currentSelection.getAnchorOffset();
      const currentBlock = editorState
        .getCurrentContent()
        .getBlockForKey(currentBlockKey);
      const currentBlockText = currentBlock.getText();
      const lastText = currentBlockText.substring(
        currentPosition - 1,
        currentPosition,
      );
      const isTab = lastText === '	';
      if (isTab) {
        const targetSelection = currentSelection.merge({
          anchorOffset: currentSelection.getAnchorOffset() - 1,
        });
        const contentState = Modifier.removeRange(
          editorState.getCurrentContent(),
          targetSelection,
          'backward',
        );
        const newEditorState = EditorState.push(
          editorState,
          contentState,
          'delete-character',
        );
        setEditorState(newEditorState);
      }
      return;
    } else {
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        '\t',
        editorState.getCurrentInlineStyle(),
      );
      const newEditorState = EditorState.push(
        editorState,
        contentState,
        'insert-characters',
      );
      setEditorState(newEditorState);
    }
  };

  const selectedExpiryOption = useMemo(
    () =>
      expiryOptions.find(
        (expiryOption) => expiryOption.value === formik.values.expiryMinutes,
      ),
    [formik.values.expiryMinutes],
  );

  /**
   * Uploads an image and returns a base64 representation of the image
   * @param {File} file
   * @return {*}  {(Promise<{ data: { link: string | ArrayBuffer | null } }>)}
   */
  const uploadImageHandler = async (
    file: File,
  ): Promise<{ data: { link: string | ArrayBuffer | null } }> => {
    const resizedFile = await ImageClass.resizeImage(
      file,
      ImageTypes.JPEG,
      800,
      0.2,
    );
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // eslint-disable-line no-undef
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          resolve({
            data: {
              link: e.target.result,
            },
          });
        }
      };
      reader.onerror = (e: ProgressEvent<FileReader>) => reject(e);
      reader.readAsDataURL(resizedFile);
    });
  };

  /**
   * Conditionally get class name to apply styles to the editor.
   * @return {*}  {string}
   */
  const getEditorWrapperClassName = (): string => {
    const editorWrapperClassName = [
      'rdw-editor-wrapper',
      styles['editor-wrapper'],
    ];
    if (formik.errors.content && formik.touched.content) {
      editorWrapperClassName.push(styles['editor-wrapper-error']);
    }
    return editorWrapperClassName.join(' ');
  };

  // Wait for page to be loaded
  if (!pageLoaded) {
    return null;
  }

  return (
    <Container
      maxW='4xl'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack direction='column' spacing={8} align='stretch'>
          {isMobile && (
            <Image
              src={props.heroImage}
              alt='hero-image'
              w='3xl'
              opacity={0.8}
            />
          )}
          <FormControl
            isInvalid={formik.touched.title && !!formik.errors.title}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Input
              autoFocus
              ref={titleInputRef}
              placeholder='Title of the this note'
              onBlur={formik.handleBlur('title')}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setDebounceField('title', event.currentTarget.value)
              }
              value={formik.values.title}
              isRequired
              variant='unstyled'
              fontSize='xx-large'
              fontWeight='bold'
              borderRadius={0}
              textAlign='center'
              maxLength={40}
            />
            <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
          </FormControl>
          <Stack
            direction={['column-reverse', 'row']}
            spacing={4}
            align='stretch'
            justify='space-evenly'
          >
            <Stack
              direction='column'
              align='stretch'
              alignSelf='flex-end'
              spacing={4}
            >
              {!isMobile && (
                <Image
                  src={props.heroImage}
                  alt='hero-image'
                  w='3xl'
                  opacity={0.8}
                />
              )}
              <Box p='16px' borderWidth='1px' borderRadius='8px'>
                <Stack alignItems='flex-start' spacing='16px'>
                  <FormControl
                    isInvalid={
                      !!formik.errors.expiryMinutes &&
                      formik.touched.expiryMinutes
                    }
                  >
                    <FormLabel>Expiry time</FormLabel>
                    <Select
                      onBlur={formik.handleBlur('expiryMinutes')}
                      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        setDebounceField(
                          'expiryMinutes',
                          parseInt(event.currentTarget.value),
                        )
                      }
                      value={formik.values.expiryMinutes}
                      isRequired
                    >
                      {expiryOptions.map((expiryOption) => (
                        <option
                          key={expiryOption.value}
                          value={expiryOption.value}
                        >
                          {expiryOption.name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>
                      {formik.errors.expiryMinutes}
                    </FormErrorMessage>
                  </FormControl>
                  {selectedExpiryOption && (
                    <Text>
                      {`The note will be automatically destroyed ${selectedExpiryOption.name} from now`}
                    </Text>
                  )}
                </Stack>
              </Box>
              <Box p='16px' borderWidth='1px' borderRadius='8px'>
                <Stack
                  direction='column'
                  alignItems='flex-start'
                  spacing='16px'
                >
                  <FormControl
                    display='flex'
                    alignItems='center'
                    isInvalid={
                      !!formik.errors.viewsLimitEnabled &&
                      formik.touched.viewsLimitEnabled
                    }
                  >
                    <Switch
                      isChecked={formik.values.viewsLimitEnabled}
                      onBlur={formik.handleBlur('viewsLimitEnabled')}
                      onChange={formik.handleChange('viewsLimitEnabled')}
                      pr='8px'
                    />
                    <FormLabel mb={0}>Limit to number of views</FormLabel>
                    <FormErrorMessage>
                      {formik.errors.viewsLimitEnabled}
                    </FormErrorMessage>
                  </FormControl>
                  <Collapse in={formik.values.viewsLimitEnabled} animateOpacity>
                    <Stack direction='row' align='center'>
                      <Text>{'or after'}</Text>
                      <NumberInput
                        maxW={32}
                        min={1}
                        max={1000000}
                        value={formik.values.viewsLimit}
                        onChange={(value: string) =>
                          formik.setFieldValue('viewsLimit', parseInt(value))
                        }
                      >
                        <NumberInputField ref={viewsLimitInputRef} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>
                        {getPluralText('view', formik.values.viewsLimit)}
                      </Text>
                    </Stack>
                  </Collapse>
                </Stack>
              </Box>
              <Box p='16px' borderWidth='1px' borderRadius='8px'>
                <Stack alignItems='flex-start' spacing='16px'>
                  <FormControl
                    display='flex'
                    alignItems='center'
                    isInvalid={
                      !!formik.errors.deleteLinkEnabled &&
                      formik.touched.deleteLinkEnabled
                    }
                  >
                    <Switch
                      isChecked={formik.values.deleteLinkEnabled}
                      onBlur={formik.handleBlur('deleteLinkEnabled')}
                      onChange={formik.handleChange('deleteLinkEnabled')}
                      pr={'8px'}
                    />
                    <FormLabel mb={0}>
                      Generate a manual destruction link
                    </FormLabel>
                    <FormErrorMessage>
                      {formik.errors.deleteLinkEnabled}
                    </FormErrorMessage>
                  </FormControl>
                  <Collapse in={formik.values.deleteLinkEnabled} animateOpacity>
                    <Text>
                      A link will be generated which can be used to destroy this
                      note before the expiry time
                    </Text>
                  </Collapse>
                </Stack>
              </Box>
              <Box p='16px' borderWidth='1px' borderRadius='8px'>
                <Stack
                  direction='column'
                  alignItems='flex-start'
                  spacing='16px'
                >
                  <FormControl
                    display='flex'
                    alignItems='center'
                    isInvalid={
                      !!formik.errors.passwordEnabled &&
                      formik.touched.passwordEnabled
                    }
                  >
                    <Switch
                      isChecked={formik.values.passwordEnabled}
                      onBlur={formik.handleBlur('passwordEnabled')}
                      onChange={formik.handleChange('passwordEnabled')}
                      pr={'8px'}
                    />
                    <FormLabel mb={0}>Set a password</FormLabel>
                    <FormErrorMessage>
                      {formik.errors.passwordEnabled}
                    </FormErrorMessage>
                  </FormControl>
                  <Collapse in={formik.values.passwordEnabled} animateOpacity>
                    <Stack direction='row' alignItems='flex-start'>
                      <FormControl
                        isInvalid={
                          !!formik.errors.password && formik.touched.password
                        }
                      >
                        <FormLabel fontSize={['sm', 'md']}>Password</FormLabel>
                        <InputGroup size='md'>
                          <Input
                            ref={passwordInputRef}
                            pr='4.5rem'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter password'
                            onBlur={formik.handleBlur('password')}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              setDebounceField(
                                'password',
                                event.currentTarget.value,
                              )
                            }
                            value={formik.values.password}
                          />
                          <InputRightElement width='4.5rem'>
                            <Button
                              tabIndex={-1}
                              h='1.75rem'
                              size='xs'
                              onClick={showPasswordClickHandler}
                            >
                              {showPassword ? 'Hide' : 'Show'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {formik.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          !!formik.errors.passwordConfirmation &&
                          formik.touched.passwordConfirmation
                        }
                      >
                        <FormLabel fontSize={['sm', 'md']}>
                          Confirm Password
                        </FormLabel>
                        <InputGroup size='md'>
                          <Input
                            pr='4.5rem'
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm password'
                            onBlur={formik.handleBlur('passwordConfirmation')}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              setDebounceField(
                                'passwordConfirmation',
                                event.currentTarget.value,
                              )
                            }
                            value={formik.values.passwordConfirmation}
                            max={7}
                          />
                          <InputRightElement width='4.5rem'>
                            <Button
                              tabIndex={-1}
                              h='1.75rem'
                              size='xs'
                              onClick={showConfirmPasswordClickHandler}
                            >
                              {showConfirmPassword ? 'Hide' : 'Show'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {formik.errors.passwordConfirmation}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>
                  </Collapse>
                </Stack>
              </Box>
            </Stack>
            <FormControl
              isInvalid={formik.touched.content && !!formik.errors.content}
              display='flex'
            >
              <Editor
                //@ts-ignore
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbarClassName={[
                  'rdw-editor-toolbar',
                  styles['toolbar'],
                ].join(' ')}
                wrapperClassName={getEditorWrapperClassName()}
                editorClassName={['rdw-editor', styles['editor']].join(' ')}
                editorStyle={{
                  height: editorHeight,
                }}
                onBlur={formik.handleBlur('content')}
                onTab={editorTabPressHandler}
                onContentStateChange={(contentState: RawDraftContentState) =>
                  setDebounceField('content', contentState)
                }
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'fontSize',
                    'fontFamily',
                    'list',
                    'textAlign',
                    'colorPicker',
                    'link',
                    // 'embedded',
                    'emoji',
                    'image',
                    'remove',
                    'history',
                  ],
                  image: {
                    uploadEnabled: true,
                    urlEnabled: false,
                    previewImage: true,
                    uploadCallback: uploadImageHandler,
                    popupClassName: styles['toolbar-imagepicker-modal'],
                  },
                  fontSize: {
                    className: styles['toolbar-font-size'],
                  },
                  fontFamily: {
                    className: styles['toolbar-font-family'],
                  },
                  blockType: {
                    className: styles['toolbar-block-type'],
                  },
                  link: {
                    popupClassName: [
                      styles['toolbar-link-modal'],
                      '.rdw-link-modal',
                    ].join(' '),
                  },
                  colorPicker: {
                    popupClassName: styles['toolbar-colorpicker-modal'],
                  },
                }}
              />
              {/* <FormErrorMessage>{formik.errors.content}</FormErrorMessage> */}
            </FormControl>
          </Stack>
          <Stack alignSelf='flex-end'>
            <Text color={textColor} fontSize='sm' alignSelf='flex-end'>
              {'This site is protected by reCAPTCHA and the Google '}
              <Link
                href='https://policies.google.com/privacy'
                color='blue.400'
                target='_blank noopener noreferrer'
              >
                Privacy Policy
              </Link>
              {' and '}
              <Link
                href='https://policies.google.com/terms'
                color='blue.400'
                target='_blank noopener noreferrer'
              >
                Terms of Service
              </Link>
              {' apply.'}
            </Text>
            <Button
              rounded='full'
              alignSelf='flex-end'
              colorScheme='blue'
              type='submit'
              disabled={!formik.isValid || appLoading || debounced}
              isLoading={formik.isSubmitting || appLoading || debounced}
              loadingText={debounced ? undefined : 'Encrypting...'}
              spinner={
                debounced ? <BeatLoader size={8} color='white' /> : undefined
              }
              spinnerPlacement='start'
            >
              Create note!
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default HomePage;
