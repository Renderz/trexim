import React, { useContext } from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import LayoutContext from './context';
import { HeaderProps } from './typings';
import styles from './index.less';

const Header: React.FC<HeaderProps> = props => {
  const { setCollapsed, content, style, className } = props;

  const { isMobile, collapsed } = useContext(LayoutContext);

  const displayTrigger = !isMobile;

  const trigger = collapsed ? (
    <MenuFoldOutlined className={styles.trigger} onClick={() => setCollapsed(false)} />
  ) : (
    <MenuUnfoldOutlined className={styles.trigger} onClick={() => setCollapsed(true)} />
  );

  const contentClassName = classnames(styles.headerContent, className);

  return (
    <Layout.Header className={styles.header}>
      {displayTrigger && trigger}
      <div className={contentClassName} style={style}>
        {content}
      </div>
    </Layout.Header>
  );
};

export default Header;
