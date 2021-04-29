import axios from '../axios'
export const getAccount = (params) => {
    return axios({
        url: '/config/getAccount',
        method: 'get',
        params
    })
}

export const addAccount = (params) => {
    return axios({
        url: '/config/addAccount',
        method: 'get',
        params
    })
}

export const deleteAccount = (params) => {
    return axios({
        url: '/config/deleteAccount',
        method: 'get',
        params
    })
}

export const rebootServer = (params) => {
    return axios({
        url: '/config/rebootServer',
        method: 'get',
        params
    })
}
