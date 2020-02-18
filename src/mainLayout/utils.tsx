import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { BaseMenuProps } from './typings';
import { MenuDataItem } from '../typings';

/**
 * Menu相关helpers
 */
export class MenuUtils {
  constructor(props: BaseMenuProps) {
    this.props = props;
  }

  props: BaseMenuProps;

  /**
   * 主进程
   */
  getMenuItems = (menuData: MenuDataItem[]): React.ReactNode =>
    menuData.filter(item => item.name && !item.hide).map(item => this.getSubMenuOrItem(item));

  /**
   * 渲染方法
   */
  getSubMenuOrItem = (item: MenuDataItem): React.ReactNode => {
    const title = this.getTitle(item);

    const key = this.getKey(item);

    const path = this.conversionPath(item.path);

    const isHttpUrl = this.isHttpUrl(path);

    if (Array.isArray(item.children) && item.children.some(child => child && !!child.name)) {
      return (
        <Menu.SubMenu title={title} key={key}>
          {this.getMenuItems(item.children)}
        </Menu.SubMenu>
      );
    }

    let menuItemDom: React.ReactNode;

    if (isHttpUrl) {
      menuItemDom = <a href={path}>{title}</a>;
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
    const key = item.key || item.path || '__BLANK_KEY__';
    return key;
  };

  /**
   * 获取title
   * TODO: 对接异步Icon组件
   */
  getTitle = (item: MenuDataItem): React.ReactNode => {
    const title = item.icon ? (
      <span>
        {item.icon}
        {/* TODO: 对接异步Icon组件 */}
        {/* <StarOutlined /> */}
        <span>{item.name}</span>
      </span>
    ) : (
      item.name
    );
    return title;
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
    menuData: MenuDataItem[],
  ): { selectedKeys?: string[]; defaultOpenKeys?: string[] } => {
    const flatMenu = this.getFlatMenus(menuData, []);
    const selectedMenuItem = flatMenu[pathname] || {};

    const selectedKey = this.getKey(selectedMenuItem);
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
  ): {
    [key: string]: MenuDataItem;
  } => {
    let menus = {};
    menuData.forEach(item => {
      if (!item || item.hide) {
        return;
      }
      const { name, path } = item;
      menus[item.path || '/'] = { name, path, parentKeys };
      if (item.children) {
        const newParentKey = [...parentKeys, this.getKey(item)];
        menus = { ...menus, ...this.getFlatMenus(item.children, newParentKey) };
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
