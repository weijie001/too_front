import axios from '../axios'
export const runSql = (params) => {
    return axios({
        url: '/dataC/runSql',
        method: 'get',
        params
    })
}

export const executeSql = (params) => {
    return axios({
        url: '/dataC/executeSql',
        method: 'get',
        params
    })
}