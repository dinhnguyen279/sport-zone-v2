import axiosClient from './axiosClient'

const FavoriteAPI = {

    getFavorite: () => {
        const url = `/carts`
        return axiosClient.get(url)
    },

    getFavoriteById: (id) => {
        const url = `/favorite${id}`
        return axiosClient.get(url)
    },

    postAddToFavorite: (data) => {
        const url = `/favorite/send${data}`
        return axiosClient.post(url)
    },

    deleteToFavorite: (id) => {
        const url = `/deleteFavorite${id}`
        return axiosClient.delete(url)
    },

}

export default FavoriteAPI