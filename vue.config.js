module.exports = {
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Open Manager";
            return args;
        })
},
  css: {
    extract: false,
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/project-management/" : "/",
};
