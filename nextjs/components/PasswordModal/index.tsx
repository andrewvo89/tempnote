import { Props } from '@components/PasswordModal/types';
import { schema } from '@components/PasswordModal/schema';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Button,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  Collapse,
  CloseButton,
} from '@chakra-ui/react';

/**
 * Password modal input component.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const PasswordModal = (props: Props): JSX.Element => {
  const router = useRouter();
  const { showModal, submitHandler } = props;
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: async (values) => {
      setShowError(false);
      setLoading(true);
      try {
        await submitHandler(values);
      } catch (error) {
        setShowError(true);
        if (passwordInputRef.current) {
          // @ts-ignore
          passwordInputRef.current.select();
        }
      } finally {
        setLoading(false);
      }
    },
    validationSchema: schema,
    initialErrors: {
      //@ts-ignore
      password: 'Password is a required field',
    },
  });

  /**
   * Toggle password field.
   * @return {*}  {void}
   */
  const showPasswordClickHandler = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  /**
   * Handle cancel button.
   * @return {*}  {void}
   */
  const cancelButtonClickHandler = (): void => {
    router.push('/');
  };

  return (
    <Modal
      motionPreset='scale'
      onClose={() => null}
      isOpen={showModal}
      isCentered
    >
      <ModalOverlay>
        <ModalContent w='md' maxW='95%'>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>Protected Note</ModalHeader>
            <ModalBody>
              <Collapse in={showError} animateOpacity>
                <Alert status='error' mb='8px' rounded='md'>
                  <AlertIcon />
                  Password is incorrect
                  <CloseButton
                    onClick={() => setShowError(false)}
                    position='absolute'
                    right='8px'
                    top='8px'
                  />
                </Alert>
              </Collapse>
              <FormControl
                isInvalid={!!formik.errors.password && formik.touched.password}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    ref={passwordInputRef}
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm password'
                    onBlur={formik.handleBlur('password')}
                    onChange={formik.handleChange('password')}
                    value={formik.values.password}
                    max={7}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={showPasswordClickHandler}
                    >
                      Show
                      {/* {showConfirmPassword ? 'Hide' : 'Show'} */}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter gridGap={2}>
              <Button
                rounded='full'
                variant='outline'
                disabled={loading}
                onClick={cancelButtonClickHandler}
              >
                Cancel
              </Button>
              <Button
                rounded='full'
                colorScheme='blue'
                type='submit'
                disabled={!formik.isValid || loading}
                isLoading={formik.isSubmitting || loading}
                loadingText='Verifying...'
                spinnerPlacement='start'
              >
                Confrim
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default PasswordModal;
