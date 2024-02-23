const { defineStore } = Pinia

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'winnie05';

export default defineStore("categoryStore", {
    state: () => ({
        //產品分類列表
        categoryList: [],
    }),
    actions: {
        //取得產品分類列表
        getCategoryList() {
            const url = `${apiUrl}/api/${apiPath}/products/all`

            axios.get(url)
                .then(res => {
                    const products = res.data.products
                    const categoryList = new Set(products.map(item => item.category))
                    this.categoryList = [...categoryList]
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