import React, { useContext } from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import Menu from './menu';
import LayoutContext from './context';
import { SiderProps } from './typings';
import styles from './index.less';

const Sider: React.FC<SiderProps> = props => {
  const { background, logo = [], style, className, render = () => null, width = 256 } = props;

  const [normalLogo, smallLogo] = logo;

  const { collapsed } = useContext(LayoutContext);

  const menuMode = collapsed ? 'vertical' : 'inline';

  const backgroundClass = classnames(styles.siderBackground);

  const logoStyle = { backgroundImage: `url(${collapsed ? smallLogo : normalLogo})` };

  const logoClass = classnames(styles.logo, className);

  return (
    <Layout.Sider
      width={width}
      collapsed={collapsed}
      collapsible
      trigger={null}
      className={styles.sider}
      theme="dark"
    >
      <div className={backgroundClass} style={{ backgroundImage: `url(${background})` }} />
      <div className={logoClass} style={{ ...logoStyle, ...style }}>
        {render(collapsed)}
      </div>
      <Menu mode={menuMode} />
    </Layout.Sider>
  );
};

export default Sider;
