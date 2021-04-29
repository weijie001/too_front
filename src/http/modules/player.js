import axios from '../axios'
export const getPlayers = (params) => {
    return axios({
        url: '/playerC/getPlayers',
        method: 'get',
        params
    })
}
export const addPlayers = (params) => {
    return axios({
        url: '/playerC/addPlayers',
        method: 'get',
        params
    })
}