import axiosClient from "./axiosClient";

const Categories = {

    getAllCategories: () => {
        const url = "categories"
        return axiosClient.get(url)
    },

    getDetailCategories: (id) => {
        const url = `category${id}`
        return axiosClient.get(url)
    }
}

export default Categories