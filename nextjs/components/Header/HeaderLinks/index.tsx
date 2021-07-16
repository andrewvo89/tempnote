import { Fragment } from 'react';
import { Link } from '@chakra-ui/react';

/**
 * Header links component.
 * @return {*}  {JSX.Element}
 */
const HeaderLinks = (): JSX.Element => (
  <Fragment>
    <Link fontSize={['sm', 'md']} href='/'>
      Home
    </Link>
    <Link fontSize={['sm', 'md']} href='/premium'>
      Premium
    </Link>
    <Link fontSize={['sm', 'md']} href='/faq'>
      FAQ
    </Link>
    <Link fontSize={['sm', 'md']} href='/about'>
      About
    </Link>
  </Fragment>
);

export default HeaderLinks;
