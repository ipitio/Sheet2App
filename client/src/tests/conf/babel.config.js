module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-transform-modules-commonjs',
        {
          allowTopLevelThis: true,
          loose: true,
          noInterop: true,
          exclude: [/@babel\/runtime/, /core-js/, /regenerator-runtime/],
        },
      ],
    ],
};
