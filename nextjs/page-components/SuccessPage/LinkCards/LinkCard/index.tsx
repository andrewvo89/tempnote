import { copyToClipboard } from '@utils/data';
import { Props } from '@page-components/SuccessPage/LinkCards/LinkCard/types';
import {
  useToast,
  InputGroup,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  FormControl,
  Tooltip,
} from '@chakra-ui/react';

/**
 * Card component for a link.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const LinkCard = (props: Props): JSX.Element => {
  const { tooltipLabel, formLabel, link } = props;
  const toast = useToast();

  /**
   * Copies link to clipboard.
   * @param {string} link
   * @return {*}  {void}
   */
  const linkCopyHandler = (link: string): void => {
    copyToClipboard(link);
    toast({
      description: 'Link copied!',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <FormControl>
      <Tooltip label={tooltipLabel} hasArrow placement='auto'>
        <FormLabel
          width='fit-content'
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          {formLabel}
        </FormLabel>
      </Tooltip>
      <InputGroup>
        <Input pr='4.5rem' placeholder='Link' readOnly value={link} />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            type='button'
            onClick={linkCopyHandler.bind(this, link)}
          >
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default LinkCard;
