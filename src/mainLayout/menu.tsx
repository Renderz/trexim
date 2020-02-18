import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'umi';
import { MenuUtils } from './utils';
import { BaseMenuProps } from './typings';
import styles from './index.less';

const BaseMenu: React.FC<BaseMenuProps> = props => {
  const {
    menuData = [],
    mode,
    location: { pathname = '/' },
  } = props;

  const menuUtils = new MenuUtils(props);

  const menuProps = menuUtils.getMenuProps(pathname, menuData);

  return (
    <Menu mode={mode} {...menuProps} className={styles.menus} theme="dark">
      {menuUtils.getMenuItems(menuData)}
    </Menu>
  );
};

export default withRouter(BaseMenu);
