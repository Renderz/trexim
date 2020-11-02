import React, { useContext } from 'react';
import { Select, Tooltip } from 'antd';
import GlobalContext from '../configProvider/context';
import {
  ExSelectProps,
  RawDataType,
  StandardDataType,
  ArrayDataType,
  ObjectDataType,
  ItemType,
  SelectProps,
} from './typings';

const { Option } = Select;

class SelectUtils {
  constructor(props: ExSelectProps) {
    this.props = props;
    // this.enumList = enumList;
  }

  props: ExSelectProps;

  getProps = (): SelectProps<string | number> => {
    const {
      children,
      enumType,
      data,
      mapping,
      disabledKeys,
      hiddenKeys,
      renderName,
      renderTitle,
      showTooltip,
      ...rest
    } = this.props;

    return {
      ...rest,
    };
  };

  /**
   * 主进程
   */
  getContent = (): React.ReactNode => {
    const { children } = this.props;
    if (children) {
      return children;
    }

    return this.data2Options();
  };

  /**
   * 生成统一的data. enumType优先级比data高
   * 暂时只支持 [{ value: 'income', name: '收入' }, { value: 'outgoing', name: '支出' }] 数组格式
   */
  data2Options = (): React.ReactNode => {
    const { enumType, data } = this.props;

    const { enumList = {} } = useContext(GlobalContext);

    // 这里必须分开做不能先生成相同的数据再统一处理. 因为消耗性能太多

    if (enumType) {
      const enumItem = enumList[enumType] || {};
      return this.handleObject2Options(enumItem);
    }

    if (Array.isArray(data)) {
      return this.handleArray2Options(data);
    }

    return this.handleObject2Options(data || {});
  };

  getStandardItem = (item: RawDataType): StandardDataType => {
    const { mapping = {} } = this.props;

    // key允许复用value的值
    // title允许复用name的值
    const value = item[mapping.value || 'value'];
    const key = item[mapping.key || 'key'] || value;
    const name = item[mapping.name || 'name'];
    const title = item[mapping.title || 'title'] || name;

    return {
      key,
      value,
      name,
      title,
    };
  };

  getName = (key: string, name: string): string => {
    const { renderName } = this.props;
    return renderName ? renderName(key, name) : name;
  };

  getTitle = (key: string, name: string): string => {
    const { renderTitle } = this.props;
    return renderTitle ? renderTitle(key, name) : name;
  };

  /**
   * 对象转换成options的方法
   */
  handleObject2Options = (object: ObjectDataType) => {
    const { disabledKeys = [], hiddenKeys = [], showTooltip } = this.props;
    return Object.keys(object)
      .filter(key => !hiddenKeys.includes(key))
      .map(key => {
        const rawName = object[key];
        const name = this.getName(key, rawName);
        const title = this.getTitle(key, rawName);

        return (
          <Option value={key} key={key} title={title} disabled={disabledKeys.includes(key)}>
            {showTooltip ? <Tooltip title={name}>{<span>{name}</span>}</Tooltip> : name}
          </Option>
        );
      });
  };

  /**
   * 数组转换成options的方法
   */
  handleArray2Options = (array: ArrayDataType) => {
    const { disabledKeys = [], hiddenKeys = [], showTooltip } = this.props;
    return array
      .filter((item: ItemType) => {
        const { key } = this.getStandardItem(item);
        return !hiddenKeys.includes(key);
      })
      .map((item: ItemType) => {
        const { key, value, ...rest } = this.getStandardItem(item);
        const title = rest.title || this.getTitle(key, rest.name);
        const name = this.getName(key, rest.name);
        return (
          <Option value={value} key={key} title={title} disabled={disabledKeys.includes(key)}>
            {showTooltip ? <Tooltip title={name}>{<span>{name}</span>}</Tooltip> : name}
          </Option>
        );
      });
  };
}

export default SelectUtils;
