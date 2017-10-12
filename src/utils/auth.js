
import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

const getQueryParams = () => {
    debugger
    const params = {}
    //alert('2 getQueryParams window.location.href = ' + window.location.href)
    window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
        params[$1] = $3
        //alert('getQueryParams param = ' + $3)
    })
    //alert('getQueryParams param.id_token = ' + params.id_token)
    return params
}

export const extractInfoFromHash = () => {
    // debugger
    //alert('extractInfoFromHash SERVER_BUILD=' + process.SERVER_BUILD)
    if (process.SERVER_BUILD) return
    const { id_token, state } = getQueryParams()
    return {
        token: id_token,
        secret: state
    }
}

export const setToken = (token) => {
    //alert ("setToken 1: ")
    if (process.SERVER_BUILD) return
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
    Cookie.set('jwt', token)
    //alert ("setToken 2: ")
}

export const unsetToken = () => {
    if (process.SERVER_BUILD) return
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('secret')
    Cookie.remove('jwt')
    window.localStorage.setItem('logout', Date.now())
}

export const getUserFromCookie = (req) => {
    if (!req.headers.cookie) return
    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
    if (!jwtCookie) return
    const jwt = jwtCookie.split('=')[1]

    // if (jwtDecode(jwt)) console.log('getUserFromCookie: got user from cookie')

    return jwtDecode(jwt)
}

export const getUserFromLocalStorage = () => {
    const json = window.localStorage.getItem('user')

    //alert ("json: " + json)

    // if (json ? JSON.parse(json) : undefined) console.log('getUserFromLocalStorage: got user from local storage')

    return json ? JSON.parse(json) : undefined
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret