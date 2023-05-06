import axiosClient from './axiosClient'

const CartAPI = {

    getCart: () => {
        const url = `/carts`
        return axiosClient.get(url)
    },

    getCartById: (id) => {
        const url = `/getCartById${id}`
        return axiosClient.get(url)
    },

    getCartByIdFieldDeletedIsNull: (id) => {
        const url = `/getCartByIdFieldDeletedIsNull${id}`
        return axiosClient.get(url)
    },


    postAddToCart: (data) => {
        const url = `/cart/add${data}`
        return axiosClient.post(url)
    },

    deleteToCart: (id) => {
        const url = `/deleteCart${id}`
        return axiosClient.delete(url)
    },

    putToCart: (data) => {
        const url = `/updateCart${data}`
        return axiosClient.put(url)
    }

}

export default CartAPI