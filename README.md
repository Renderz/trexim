# trexim

## Getting Started
```bash
# Install
$ yarn add trexim
```

## ConfigProvider && Layout
```tsx
import { ConfigProvider, Layout } from 'trexim';

const enumList = {
  transactionType: {
    income: '收入',
    outgoing: '支出',
  },
  sex: {
    0: '男',
    1: '女'
  }
};

const menuData = [
  {
    name: 'parent1',
    path: '/parent1',
    icon: 'test',
    children: [
      {
        name: 'children1',
        path: '/path1',
      },
      {
        name: 'hideChildren',
        path: '/path2',
        hide: true,
      },
      {
        name: 'children2',
        path: 'https://www.baidu.com',
      },
    ],
  },
];

export default ({ children }) => <ConfigProvider enumList={enumList} menuData={menuData}><Layout>{children}</Layout></ConfigProvider>
```

**Read the Doc To See More Detail**