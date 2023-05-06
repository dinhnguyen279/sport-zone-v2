import axiosClient from './axiosClient'

const HistoryAPI = {

    getHistoryAPI: (query) => {
        const url = `/histori${query}`
        return axiosClient.get(url)
    },

    getDetail: (id) => {
        const url = `/histori/${id}`
        return axiosClient.get(url)
    }

}

export default HistoryAPI