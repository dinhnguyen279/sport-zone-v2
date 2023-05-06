import axiosClient from './axiosClient'

const UserAPI = {

    getAllData: () => {
        const url = '/users'
        return axiosClient.get(url)
    },

    getDetailData: (id) => {
        const url = `/user/${id}`
        return axiosClient.get(url)
    },

    postSignUp: (data) => {
        const url = `/signup/${data}`
        return axiosClient.post(url)
    }

}

export default UserAPI