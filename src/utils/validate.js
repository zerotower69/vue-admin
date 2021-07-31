/**
 *  Create by ZeroTower 21/7/29
 */

/**
 * 判断链接是否外链地址，邮箱或者电话号码
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path){
    return /^(https?:|mailTo:|tel:)/.test(path);
}

/**
 * 验证用户角色
 * @param {string} str
 * @returns {boolean}
 */
export function validUser(str){
    const valid_map=["editor",'admin','test'];
    return valid_map.indexOf(str.trim())>=0;
}

