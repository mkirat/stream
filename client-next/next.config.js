// const withLess = require("@zeit/next-less");
// const lessToJS = require("less-vars-to-js");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
// const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
// const isProd = process.env.NODE_ENV === "production";
//
// const fs = require("fs");
// const path = require("path");
//
// //Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//     fs.readFileSync(
//         path.resolve(__dirname, "./src/styles/antd-theme.less"),
//         "utf8"
//     )
// );

const withTM = require("next-transpile-modules")([
  "@solana/wallet-adapter-base",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-wallets",
  "@solana/wallet-adapter-react-ui",
  "@solana/wallet-adapter-bitkeep",
  "@solana/wallet-adapter-bitpie",
  "@solana/wallet-adapter-blocto",
  "@solana/wallet-adapter-clover",
  "@solana/wallet-adapter-coin98",
  "@solana/wallet-adapter-coinhub",
  "@solana/wallet-adapter-ledger",
  "@solana/wallet-adapter-mathwallet",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-safepal",
  "@solana/wallet-adapter-slope",
  "@solana/wallet-adapter-sollet",
  "@solana/wallet-adapter-solflare",
  "@project-serum/sol-wallet-adapter",
  "@solana/wallet-adapter-solong",
  "@solana/wallet-adapter-torus",
]);
const plugins = [
  // [
  //   withLess({
  //     lessLoaderOptions: {
  //       javascriptEnabled: true,
  //       modifyVars: themeVariables, // make your antd custom effective
  //     },
  //     webpack: (config, { isServer }) => {
  //       if (isServer) {
  //         const antStyles = /antd\/.*?\/style.*?/;
  //         const origExternals = [...config.externals];
  //         config.externals = [
  //           (context, request, callback) => {
  //             if (request.match(antStyles)) return callback();
  //             if (typeof origExternals[0] === "function") {
  //               origExternals[0](context, request, callback);
  //             } else {
  //               callback();
  //             }
  //           },
  //           ...(typeof origExternals[0] === "function" ? [] : origExternals),
  //         ];
  //
  //         config.module.rules.unshift({
  //           test: antStyles,
  //           use: "null-loader",
  //         });
  //       }
  //
  //       const builtInLoader = config.module.rules.find((rule) => {
  //         if (rule.oneOf) {
  //           return (
  //               rule.oneOf.find((deepRule) => {
  //                 return (
  //                     deepRule.test && deepRule.test.toString().includes("/a^/")
  //                 );
  //               }) !== undefined
  //           );
  //         }
  //         return false;
  //       });
  //
  //       if (typeof builtInLoader !== "undefined") {
  //         config.module.rules.push({
  //           oneOf: [
  //             ...builtInLoader.oneOf.filter((rule) => {
  //               return (
  //                   (rule.test && rule.test.toString().includes("/a^/")) !== true
  //               );
  //             }),
  //           ],
  //         });
  //       }
  //
  //       config.resolve.alias["@"] = path.resolve(__dirname);
  //       config.plugins.push(new MomentLocalesPlugin());
  //       return config;
  //     },
  //   }),
  // ],
  [
    withTM,
    {
      webpack5: true,
      reactStrictMode: true,
    },
  ],
  withBundleAnalyzer,
];

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/user-meta-image/:name*",
        destination: "/api/meta-image/:name*",
      },
      {
        source: "/instagram-fetch",
        destination: "/api/instagram",
      },
      // {
      //   source: "/fetch-metadata",
      //   destination: "/api/url-metadata-fetch",
      // },
    ];
  },
};

module.exports = withPlugins(plugins, nextConfig);
