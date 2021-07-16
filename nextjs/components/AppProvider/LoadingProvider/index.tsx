import FullPageSpinner from '@components/FullPageSpinner';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Fragment, useContext, useEffect } from 'react';
import { Props } from '@components/AppProvider/LoadingProvider/types';

/**
 * Provides the app with a loading spinner.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const LoadingProvider = (props: Props): JSX.Element => {
  const { appLoading } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflowY = appLoading ? 'hidden' : 'auto';
  }, [appLoading]);

  return (
    <Fragment>
      {props.children}
      <FullPageSpinner show={appLoading} />
    </Fragment>
  );
};

export default LoadingProvider;
