import React from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import { ContentProps } from './typings';
import styles from './index.less';

const Content: React.FC<ContentProps> = props => {
  const { render = (_: React.ReactNode) => _, children, style, className } = props;

  const contentClassName = classnames(styles.content, className);

  return (
    <Layout.Content className={contentClassName} style={style}>
      {render(children)}
    </Layout.Content>
  );
};

export default Content;
