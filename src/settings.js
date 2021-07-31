//系统的全局设置
module.exports = {
    title: 'vue admin system',

    /**
     * @type {boolean} true | false
     */
    showSettings: true,
    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView: true,

    /**
     * @type {boolean} true | false
     * @description Whether fiex the header
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in the header
     */
    sidebarLogo: false,
    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production'
}