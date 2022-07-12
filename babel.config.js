module.exports = (api) => {
  const isTest = api.env('test');
  if (isTest) {
    return {
      presets: ['next/babel'],
      plugins: ['styled-jsx/babel-test', 'dynamic-import-node'],
    };
  }
  return {
    presets: [
      ['next/babel'],
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '2',
          include: ['es6.map', 'es6.set', 'es6.object.assign'],
          forceAllTransforms: true,
        },
      ],
    ],
    plugins: [
      'styled-jsx/babel-test',
      'dynamic-import-node',
      '@babel/plugin-proposal-class-properties',
    ],
  };
};
