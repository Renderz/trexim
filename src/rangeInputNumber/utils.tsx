import React, { useState } from 'react';
import { Input, InputNumber } from 'antd';
import { RangeInputNumberProps } from './typings';

class InputNumberUtils {
  constructor(props: RangeInputNumberProps) {
    this.props = props;
  }

  props: RangeInputNumberProps;

  getContent = (): React.ReactNode => {
    const { value = [], defaultValue = [], separator = ' ~', id, ...rest } = this.props;

    const [valuePair, setValuePair] = useState(value);

    const triggerChange = (_valuePair: number[]) => {
      setValuePair(_valuePair);
      if (this.props.onChange) {
        this.props.onChange(_valuePair);
      }
    };

    const onChange = (type: number) => (rawValue?: any): void => {
      const number = Number(rawValue);

      if (!Number.isNaN(number)) {
        const newValuePair = [...valuePair];
        newValuePair[type] = number;
        triggerChange(newValuePair);
      }
    };

    const onBlur = (): void => {
      const [value0, value1] = valuePair;
      if (value0 > value1) {
        triggerChange([value1, value0]);
      }
    };

    return (
      <Input.Group compact onBlur={onBlur}>
        <InputNumber
          {...rest}
          style={{ width: '40%' }}
          onChange={onChange(0)}
          value={valuePair[0]}
          defaultValue={defaultValue[0]}
        />
        <Input
          style={{
            width: '20%',
            borderLeft: 0,
            pointerEvents: 'none',
            backgroundColor: '#fff',
          }}
          placeholder={separator}
          disabled
        />
        <InputNumber
          {...rest}
          onChange={onChange(1)}
          style={{ width: '40%', borderLeft: 0 }}
          value={valuePair[1]}
          defaultValue={defaultValue[1]}
        />
      </Input.Group>
    );
  };
}

export default InputNumberUtils;
