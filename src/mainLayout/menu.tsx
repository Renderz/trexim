import React, { useContext } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'umi';
import { MenuUtils } from './utils';
import { BaseMenuProps } from './typings';
import { context } from '../configProvider';
import styles from './index.less';

const BaseMenu: React.FC<BaseMenuProps> = props => {
  const {
    mode,
    location: { pathname = '/' },
  } = props;

  const { menuData } = useContext(context);

  const menuUtils = new MenuUtils();

  const menuProps = menuUtils.getMenuProps(pathname, menuData);

  const content = menuUtils.getMenuItems(menuData);

  return (
    <Menu mode={mode} {...menuProps} className={styles.menus} theme="dark">
      {content.length >= 1 && content}
    </Menu>
  );
};

export default withRouter(BaseMenu);
