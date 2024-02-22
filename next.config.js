const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
// /**
//  * @param {boolean} isServer
//  */
// const remotes = (isServer) => {
//   return {
//     ...createRemote(isServer, {
//       mfeName: "header",
//       serverUrl: "http://header:3001",
//       chunkUrl: "http://localhost:3001",
//     }),
//     ...createRemote(isServer, {
//       mfeName: "services",
//       serverUrl: "http://services:3002",
//       chunkUrl: "http://localhost:3002",
//     }),
//   };
// };

/**
 * @param {boolean} isServer
 */
const remotes = (isServer) => {
  return {
    ...createRemote(isServer, {
      mfeName: "services",
      serverUrl:
        "http://bitovi-r2wc-mfe-services-main-540863391.us-east-1.elb.amazonaws.com",
      chunkUrl:
        "http://bitovi-r2wc-mfe-services-main-540863391.us-east-1.elb.amazonaws.com",
    }),
    ...createRemote(isServer, {
      mfeName: "header",
      serverUrl:
        "http://bitovi-r2wc-mfe-header-main-46250868.us-east-1.elb.amazonaws.com",
      chunkUrl:
        "http://bitovi-r2wc-mfe-header-main-46250868.us-east-1.elb.amazonaws.com",
    }),
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        filename: "static/chunks/remoteEntry.js",
        remotes: remotes(options.isServer),
        shared: {},
      })
    );

    return config;
  },
};

module.exports = nextConfig;

const urlServer = (host) => {
  return `${host}/_next/static/ssr/remoteEntry.js`;
};

const urlChunk = (host) => {
  return `${host}/_next/static/chunks/remoteEntry.js`;
};

const createRemote = (isServer, { mfeName, serverUrl, chunkUrl }) => {
  return {
    [mfeName]: isServer
      ? `${mfeName}@${urlServer(serverUrl)}`
      : `${mfeName}@${urlChunk(chunkUrl)}`,
  };
};
