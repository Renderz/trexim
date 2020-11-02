import React, { useState, useContext, useEffect, useImperativeHandle } from 'react';
import { router, withRouter } from 'umi';
import classnames from 'classnames';
import { Layout, Tabs } from 'antd';
import { MenuUtils } from './utils';
import { ContentProps } from './typings';
import { context } from '../configProvider';
import styles from './index.less';

const { TabPane } = Tabs;

type TabItem = {
  [propName: string]: { search: string; name: string; query: object; children: React.ReactNode };
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
    allowDiffOnSearch = false,
    contentRef,
  } = props;

  const { menuData } = useContext(context);

  const [tabList, setTabList] = useState<TabItem>({});
  const [activeKey, setActiveKey] = useState<string>();

  const menuUtils = new MenuUtils();

  const flatternMenuData = menuUtils.getFlatMenus(menuData, [], true);

  const insertTab = (path: string, search: string, query: object, _children: React.ReactNode) => {
    const enhancedPath = allowDiffOnSearch ? `${path}${search}` : path;
    const targetTab = tabList[enhancedPath];
    if (!targetTab || targetTab?.search !== search) {
      const name = flatternMenuData[path]?.name;
      if (name) {
        const newTabList = { ...tabList };
        newTabList[enhancedPath] = { search, name, query, children: _children };
        setTabList(newTabList);
      }
    }
  };

  const delTab = (path: string, search: string) => {
    const enhancedPath = allowDiffOnSearch ? `${path}${search}` : path;
    const newTabList = { ...tabList };
    const { length } = Object.keys(tabList);
    if (newTabList[enhancedPath]?.search === search) {
      delete newTabList[enhancedPath];
      const lastKey = Object.keys(newTabList)[length - 2];

      if (!lastKey) {
        router.push('/');
        setTabList(newTabList);
      } else {
        const lastTab = newTabList[lastKey];
        const newActiveKey = allowDiffOnSearch ? lastKey : `${lastKey}${lastTab?.search}`;
        router.push(newActiveKey);
        setTabList(newTabList);
      }
    }
    if (onDelete) {
      setTimeout(() => onDelete(path), 0);
    }
  };

  useImperativeHandle(contentRef, () => ({
    del: (path: string, search: string) => {
      delTab(path, search);
    },
  }));

  const changeActiveKey = (path: string, search: string) => {
    const name = flatternMenuData[path]?.name;
    if (name) {
      const newKey = `${path}${search}`;
      setActiveKey(newKey);
    }
  };

  useEffect(() => {
    insertTab(location?.pathname, location?.search, location?.query, children);
    changeActiveKey(location?.pathname, location?.search);
  }, [location?.pathname, location?.search, menuData]);

  const contentClassName = classnames(styles.content, className);

  return (
    <Layout.Content className={contentClassName} style={style}>
      {isTab && (
        <Tabs
          size="small"
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
            const path = allowDiffOnSearch ? tab : `${tab}${targetTab?.search}`;
            return (
              <TabPane tab={targetTab?.name} key={path}>
                {/* {targetTab?.children} */}
              </TabPane>
            );
          })}
        </Tabs>
      )}
      {render(children)}
    </Layout.Content>
  );
};

export default withRouter(Content);
