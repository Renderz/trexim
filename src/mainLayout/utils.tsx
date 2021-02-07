import React, { useContext } from 'react';
import { Menu } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { context } from '../configProvider';
import { MenuDataItem, KeyMap } from '../typings';

/**
 * Menu相关helpers
 */
export class MenuUtils {
  constructor() {
    const { menuKeyMap } = useContext(context);
    this.keyMap = menuKeyMap;
  }

  keyMap?: KeyMap;

  /**
   * 主进程
   */
  getMenuItems = (menuData?: MenuDataItem[]): React.ReactNode[] =>
    (menuData || [])
      .filter(item => this.getName(item) && !this.getHide(item))
      .map(item => this.getSubMenuOrItem(item));

  /**
   * 渲染方法
   */
  getSubMenuOrItem = (item: MenuDataItem): React.ReactNode => {
    const title = this.getTitle(item);

    const key = this.getKey(item);

    const path = this.conversionPath(this.getPath(item));

    const isHttpUrl = this.isHttpUrl(path);

    const children = this.getChildren(item);

    if (Array.isArray(children) && children.some(child => child && !!this.getName(child))) {
      return (
        <Menu.SubMenu title={title} key={key}>
          {this.getMenuItems(children)}
        </Menu.SubMenu>
      );
    }

    let menuItemDom: React.ReactNode;

    if (isHttpUrl) {
      menuItemDom = <a onClick={() => window.open(path)}>{title}</a>;
    } else {
      menuItemDom = <Link to={path}>{title}</Link>;
    }

    return <Menu.Item key={key}>{menuItemDom}</Menu.Item>;
  };

  /**
   * 获取key
   * TODO: 这里的默认值怎么搞???
   */
  getKey = (item: MenuDataItem): string => {
    const target1 = this.keyMap?.key || 'key';
    const target2 = this.keyMap?.path || 'path';
    const key = item[target1] || item[target2] || '__BLANK_KEY__';
    return key;
  };

  /**
   * 获取title
   * TODO: 对接异步Icon组件
   */
  getTitle = (item: MenuDataItem): React.ReactNode => {
    const title = this.getIcon(item) ? (
      <span>
        {this.getIcon(item)}
        {/* TODO: 对接异步Icon组件 */}
        {/* <StarOutlined /> */}
        <span>{this.getName(item)}</span>
      </span>
    ) : (
      this.getName(item)
    );
    return title;
  };

  getIcon = (item: MenuDataItem): React.ReactNode => {
    const target = this.keyMap?.icon || 'icon';
    return item[target] || <StarOutlined />;
  };

  getName = (item: MenuDataItem): string => {
    const target = this.keyMap?.name || 'name';
    return item[target];
  };

  getPath = (item: MenuDataItem): string => {
    const target = this.keyMap?.path || 'path';
    return item[target];
  };

  getHide = (item: MenuDataItem): boolean => {
    const target = this.keyMap?.hide || 'hide';
    return Boolean(Number(item[target]));
  };

  getChildren = (item: MenuDataItem): MenuDataItem[] => {
    const target = this.keyMap?.children || 'children';
    return item[target];
  };

  /**
   * path转换helper
   */
  conversionPath = (path: string = '/') => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  /**
   * 通过当前pathname获取selectedKeys
   */
  getMenuProps = (
    pathname: string,
    menuData?: MenuDataItem[],
  ): { selectedKeys?: string[]; defaultOpenKeys?: string[] } => {
    const flatMenu = this.getFlatMenus(menuData, [], false);

    const selectedMenuItem = flatMenu[pathname] || {};

    const selectedKey = selectedMenuItem.key;
    const selectedKeys = selectedKey ? [selectedKey] : undefined;
    const defaultOpenKeys = selectedMenuItem.parentKeys;

    return {
      selectedKeys,
      defaultOpenKeys,
    };
  };

  /**
   * 获取打平的menu
   */
  getFlatMenus = (
    menuData: MenuDataItem[] = [],
    parentKeys: string[],
    returnHide: boolean,
  ): {
    [key: string]: MenuDataItem;
  } => {
    let menus = {};
    menuData.forEach(item => {
      if (!item || (!returnHide && this.getHide(item))) {
        return;
      }
      const key = this.getKey(item);
      const name = this.getName(item);
      const path = this.getPath(item);
      const children = this.getChildren(item);

      menus[path || '/'] = { key, name, path, parentKeys };
      if (children) {
        const newParentKey = [...parentKeys, this.getKey(item)];
        menus = { ...menus, ...this.getFlatMenus(children, newParentKey, returnHide) };
      }
    });
    return menus;
  };

  /**
   * 判断是否是外部地址
   * @param path
   */
  isHttpUrl = (path: string = '/'): boolean => {
    const httpUrlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return httpUrlReg.test(path);
  };
}
