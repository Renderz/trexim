export default {
  entry: 'src/index.ts',
  esm: 'rollup',
  cjs: 'rollup',
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
};
