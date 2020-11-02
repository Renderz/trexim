import React, { useContext } from 'react';
import context from '../configProvider/context';

type Props = {
  url?: string;
};

const Auth: React.FC<Props> = props => {
  const { url, children } = props;
  const { limits } = useContext(context);

  if (url && limits?.includes(url)) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Auth;
