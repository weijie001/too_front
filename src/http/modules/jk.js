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

export const getLogDir = (params) => {
    return axios({
        url: '/jk/getLogDir',
        method: 'get',
        params
    })
}

export const getLogFile = (params) => {
    return axios({
        url: '/jk/getLogFile',
        method: 'get',
        params
    })
}

export const getEnv = (params) => {
    return axios({
        url: '/mainC/getEnv',
        method: 'get',
        params
    })
}

export const changeEnv = (params) => {
    return axios({
        url: '/mainC/changeEnv',
        method: 'get',
        params
    })
}

export const getDate = (params) => {
    return axios({
        url: '/jk/getDate',
        method: 'get',
        params
    })
}

export const setDate = (params) => {
    return axios({
        url: '/jk/setDate',
        method: 'get',
        params
    })
}

export const startServer = (params) => {
    return axios({
        url: '/jk/startServer',
        method: 'get',
        params
    })
}

export const stopServer = (params) => {
    return axios({
        url: '/jk/stopServer',
        method: 'get',
        params
    })
}

export const queryTeamInfo = (params) => {
    return axios({
        url: '/jk/queryTeamInfo',
        method: 'get',
        params
    })
}

export const updateTeamInfo = (params) => {
    return axios({
        url: '/jk/updateTeamInfo',
        method: 'get',
        params
    })
}

export const refreshConfig = (params) => {
    return axios({
        url: '/jk/refreshConfig',
        method: 'get',
        params
    })
}

export const compare = (params) => {
    return axios({
        url: '/dbC/compare',
        method: 'get',
        params
    })
}

export const compare2 = (params) => {
    return axios({
        url: '/dbC/compare2',
        method: 'get',
        params
    })
}

export const execSql = (params) => {
    return axios({
        url: '/dbC/execSql',
        method: 'get',
        params
    })
}

export const tableSql = (params) => {
    return axios({
        url: '/dbC/tableSql',
        method: 'get',
        params
    })
}