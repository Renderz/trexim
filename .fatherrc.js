export default {
    entry: 'src/index.tsx',
    esm: 'rollup',
    cjs: 'rollup',
    cssModules: true,
    extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
};