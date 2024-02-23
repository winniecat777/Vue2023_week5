const { defineStore } = Pinia

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'winnie05';

export default defineStore("productStore", {
    state: () => ({
        //產品列表
        productsList: [],
        //頁碼
        pagination: {},
    }),
    actions: {
        //取得產品列表
        getProductList(page = 1, category) {
            let url = `${apiUrl}/api/${apiPath}/products?page=${page}`
            if (category) { url += `&category=${category}` }

            axios.get(url)
                .then(res => {
                    const { products, pagination } = res.data
                    this.productsList = products
                    this.pagination = pagination
                })
                .catch(err => Swal.fire(
                    {
                        icon: "error",
                        text: err.response.data.message
                    }
                ))
        },
    }
})