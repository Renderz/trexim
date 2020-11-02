import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { LoaderProps } from './typings';

const Loader: React.FC<LoaderProps> = props => {
  const {
    spinning = false,
    fullScreen = false,
    loadingText = 'LOADING',
    error = false,
    errorText = 'Loading Error, Please contact stuff',
    children,
  } = props;

  if (spinning) {
    return (
      <div
        className={classNames(styles.loader, {
          [styles.hidden]: !spinning,
          [styles.fullScreen]: fullScreen,
        })}
      >
        <div className={styles.wrapper}>
          <div className={styles.inner} />
          {error ? (
            <div className={styles.error}>{errorText}</div>
          ) : (
            <div className={styles.text}>{loadingText}</div>
          )}
        </div>
      </div>
    );
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default Loader;
