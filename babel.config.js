module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env:{
    "test":{
      //解决require.context报错
      "plugins":["transform-require-context","transform-es2015-modules-commonjs"]
    }
  }
}
