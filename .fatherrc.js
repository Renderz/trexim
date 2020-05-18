export default {
    entry: 'src/index.tsx',
    esm: { type: 'rollup', importLibToEs: true },
    cjs: 'rollup',
    cssModules: true,
    extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
};