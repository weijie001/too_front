import axios from '../axios'
export const getItems = (params) => {
    return axios({
        url: '/itemC/getItems',
        method: 'get',
        params
    })
}

export const addItems = (params) => {
    return axios({
        url: '/itemC/addItems',
        method: 'get',
        params
    })
}

export const getTables = (params) => {
    return axios({
        url: '/itemC/getTables',
        method: 'get',
        params
    })
}

export const exportData = (params) => {
    return axios({
        url: '/itemC/exportData',
        method: 'get',
        params
    })
}

