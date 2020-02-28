import React, { useState, useContext } from 'react';
import { Layout } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { context } from '../configProvider';
import LayoutContext from './context';
import Sider from './sider';
import Header from './header';
import Content from './content';
import { MainLayoutProps } from './typings';

const MainLayout: React.FC<MainLayoutProps> = props => {
  const {
    children,
    headerBar,
    headerClass,
    headerStyle,
    siderBackground,
    siderLogo,
    siderClass,
    siderStyle,
    siderRender,
    contentClass,
    contentStyle,
    contentRender,
  } = props;

  const { menuData } = useContext(context);

  const isMobile = useMediaQuery({ maxWidth: '767px' }, undefined, handleMediaQueryChange);

  const [collapsed, setCollapsed] = useState(isMobile);

  function handleMediaQueryChange(matches: boolean): void {
    requestAnimationFrame(() => {
      setCollapsed(matches);
    });
  }

  return (
    <LayoutContext.Provider
      value={{
        isMobile,
        collapsed,
        menuData,
      }}
    >
      <Layout style={{ minHeight: '100%' }} hasSider>
        <Sider
          background={siderBackground}
          logo={siderLogo}
          style={siderStyle}
          className={siderClass}
          render={siderRender}
        />
        <Layout>
          <Header
            setCollapsed={setCollapsed}
            content={headerBar}
            className={headerClass}
            style={headerStyle}
          />
          <Content style={contentStyle} className={contentClass} render={contentRender}>
            {children}
          </Content>
          {/* <Layout.Footer></Layout.Footer> */}
        </Layout>
      </Layout>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
