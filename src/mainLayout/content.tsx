import React, { useState, useContext, useEffect } from 'react';
import { router, withRouter } from 'umi';
import classnames from 'classnames';
import { Layout, Tabs } from 'antd';
import { MenuUtils } from './utils';
import { ContentProps } from './typings';
import { context } from '../configProvider';
import styles from './index.less';

const { TabPane } = Tabs;

type TabItem = {
  [propName: string]: { search: string; name: string };
};

const Content: React.FC<ContentProps> = props => {
  const {
    render = (_: React.ReactNode) => _,
    children,
    style,
    className,
    location,
    isTab,
    onDelete,
  } = props;

  const { menuData } = useContext(context);

  const [tabList, setTabList] = useState<TabItem>({});
  const [activeKey, setActiveKey] = useState<string>();

  const menuUtils = new MenuUtils();

  const flatternMenuData = menuUtils.getFlatMenus(menuData, [], true);

  const insertTab = (path: string, search: string) => {
    const targetTab = tabList[path];
    if (!targetTab || targetTab?.search !== search) {
      const name = flatternMenuData[path]?.name;
      if (name) {
        const newTabList = { ...tabList };
        newTabList[path] = { search, name };
        setTabList(newTabList);
      }
    }
  };

  const delTab = (path: string, search: string) => {
    const newTabList = { ...tabList };
    const { length } = Object.keys(tabList);
    if (newTabList[path]?.search === search && length !== 1) {
      delete newTabList[path];
      const lastKey = Object.keys(newTabList)[length - 2];
      const lastTab = newTabList[lastKey];
      const newActiveKey = `${lastKey}${lastTab?.search}`;
      router.push(newActiveKey);
      setTabList(newTabList);
    }
    if (onDelete) {
      setTimeout(() => onDelete(path), 0);
    }
  };

  const changeActiveKey = (path: string, search: string) => {
    const name = flatternMenuData[path]?.name;
    if (name) {
      const newKey = `${path}${search}`;
      setActiveKey(newKey);
    }
  };

  useEffect(() => {
    insertTab(location?.pathname, location?.search);
    changeActiveKey(location?.pathname, location?.search);
  }, [location?.pathname, location?.search, menuData]);

  const contentClassName = classnames(styles.content, className);

  return (
    <Layout.Content className={contentClassName} style={style}>
      {isTab && (
        <Tabs
          tabBarStyle={{ marginBottom: 4 }}
          activeKey={activeKey}
          type="editable-card"
          hideAdd
          onChange={key => router.push(key)}
          onEdit={(key, action) => {
            if (typeof key === 'string') {
              const [path, search] = key.split('?');
              if (action === 'remove') delTab(path, search ? `?${search}` : '');
            }
          }}
        >
          {Object.keys(tabList).map(tab => {
            const targetTab = tabList[tab];
            const path = `${tab}${targetTab?.search}`;
            return <TabPane tab={targetTab?.name} key={path} />;
          })}
        </Tabs>
      )}
      {render(children)}
    </Layout.Content>
  );
};

export default withRouter(Content);
