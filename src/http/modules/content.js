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

export const getTableData = (params) => {
    return axios({
        url: '/dataC/getTableData',
        method: 'get',
        params
    })
}

export const deleteTableData = (params) => {
    return axios({
        url: '/dataC/deleteTableData',
        method: 'get',
        params
    })
}

export const getAllTables = (params) => {
    return axios({
        url: '/dataC/getAllTables',
        method: 'get',
        params
    })
}