module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    // 'storybook-addon-next',
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-jest",
  ],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  // PathAliasの設定
  // webpackFinal(config) {
  //   config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../src')];
  //   config.resolve.plugins = [...(config.resolve.plugins || []), new TsconfigPathsPlugin()];
  //   return config;
  // },
  docs: {
    autodocs: true,
  },
};
