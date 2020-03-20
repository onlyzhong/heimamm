const TOKEN_KEY = "heimamm"

// 设置token
export function setToken(value) {

    // var strValue=JSON.stringify(value)
    // window.localStorage.setItem(TOKEN_KEY, strValue)
    window.localStorage.setItem(TOKEN_KEY, value)
}

//获取token
export function getToken() {
    return window.localStorage.getItem(TOKEN_KEY)
}

// 删除token
export function removeToken() {
    window.localStorage.removeItem(TOKEN_KEY)
}