import axios from '../axios'


export const selectUrl = (params) => {
    return axios({
        url: '/jk/select',
        method: 'get',
        params
    })
}

export const getInputParam = (params) => {
    return axios({
        url: '/jk/getInputParam',
        method: 'post',
        params
    })
}

export const getConfigFile = (params) => {
    return axios({
        url: '/jk/getConfigFile',
        method: 'get',
        params
    })
}

export const getData = (params) => {
    return axios({
        url: '/jk/getData',
        method: 'get',
        params
    })
}

export const loginValid = (params) => {
    return axios({
        url: '/jk/loginValid',
        method: 'get',
        params
    })
}

export const loginValid2 = (params) => {
    return axios({
        url: '/jk/loginValid2',
        method: 'get',
        params
    })
}

export const deleteFile = (params) => {
    return axios({
        url: '/jk/deleteFile',
        method: 'get',
        params
    })
}
export const deleteProtoFile = (params) => {
    return axios({
        url: '/jk/deleteProtoFile',
        method: 'get',
        params
    })
}

export const getTeamInfo = (params) => {
    return axios({
        url: '/jk/getTeamInfo',
        method: 'get',
        params
    })
}
