const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");//日志处理插件

const resolve = (dir) => {
    return path.join(__dirname,".", dir);
}

const files = require("./src/store/modules/index");
console.log(files)
//配置
module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    chainWebpack: (config) => {
        //svg
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader,如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        // 添加要替换的 loader
        svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        //配置别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("components", resolve("src/components"))
            .set("api", resolve("src/api"))
            .set("store", resolve("src/store"))
            .set("utils",resolve("src/utils"))
            .set("router",resolve("src/router"))
            .set("layout",resolve("src/layout"))
            .set("views",resolve("src/views"))
            .set("assets",resolve("src/assets"))
            .set("icons",resolve("src/icons"))
        // config.optimization= {
        //     minimizer:[
        //         new TerserPlugin({
        //             terserOptions: {
        //                 ecma: undefined,
        //                 warnings: false,
        //                 parse: {},
        //                 compress: {
        //                     drop_console: true,
        //                     drop_debugger: false,
        //                     pure_funcs: ['console.log'] // 移除console
        //                 }
        //             }
        //         })
        //     ]
        // }
    },
    devServer: {
        host: "localhost",
        port: 8000
    }
}