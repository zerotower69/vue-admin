const tokens={
    //管理员拥有所有的权限
   admin:{
       token:'admin-token'
   },
    //编辑者拥有部分的编辑权限
    editor:{
       token:'editor-token'
    },
    //游客只有访问的权限，任何的数据都是不可编辑的
    visitor:{
       token:'visitor-token'
    }
}

const users={
    "admin-token":{
        roles:['admin'],
        name:'管理员',
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        email:"zerotower@163.com",
        gender:'male'
    },
    'editor-token':{
        roles:['editor'],
        name:'作家',
        introduction:"I'm a editor",
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        email:"zerotower@163.com",
        gender:'female'
    },
    'visitor-token':{
        roles:['visitor'],
        name:'访问者',
        introduction:"I'm a visitor, I want to see your works.",
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        email:"zerotower@163.com",
        gender:'male'
    }
}

module.exports = [
    // user login
    {
        url: '/vue-element-admin/user/login',
        type: 'post',
        response: config => {
            const { username } = config.body
            const token = tokens[username]

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect.'
                }
            }

            return {
                code: 20000,
                data: token
            }
        }
    },

    // get user info
    {
        url: '/vue-element-admin/user/info\\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 20000,
                data: info
            }
        }
    },

    // user logout
    {
        url: '/vue-element-admin/user/logout',
        type: 'post',
        // eslint-disable-next-line no-unused-vars
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]