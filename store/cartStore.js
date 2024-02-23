const { defineStore } = Pinia
import loadingStore from "./loadingStore.js";

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'winnie05';

export default defineStore("cartStore", {
    state: () => ({
        //購物車列表
        cartsList: [],  
        //動作成功提示
        showToast: false      
    }),
    actions: {
        //取得購物車列表
        getCartsList() {
            //資料處理
            const url = `${apiUrl}/api/${apiPath}/cart`
            axios.get(url)
                .then(res => {
                    this.cartsList = res.data.data
                })
                .catch(err => Swal.fire(
                    {
                        icon: "error",
                        text: err.response.data.message
                    }
                ))
        },

        //加入購物車
        addToCart(id, qty) {
            //開啟 loading
            const { toggleLoading } = loadingStore()
            toggleLoading()

            //資料處理
            const url = `${apiUrl}/api/${apiPath}/cart`
            const item = {
                data: {
                    product_id: id,
                    qty
                }
            }

            axios.post(url, item)
                .then(res => {
                    //提示訊息
                    this.showToast = !this.showToast
                    //重整購物車
                    this.getCartsList()
                })
                .catch(err => Swal.fire(
                    {
                        icon: "error",
                        text: err.response.data.message
                    }
                ))
                .finally(() => {
                    //關閉 loading
                    toggleLoading()
                })
        },

        //更新購物車
        updateCart(data) {
            //開啟 loading
            const { toggleLoading } = loadingStore()
            toggleLoading()

            //資料處理
            const url = `${apiUrl}/api/${apiPath}/cart/${data.id}`
            const item = {
                data: {
                    product_id: data.product_id,
                    qty: data.qty
                }
            }              

            axios.put(url, item)
                .then(res => {
                    //提示訊息
                    this.showToast = !this.showToast
                    //重整購物車
                    this.getCartsList()

                })
                .catch(err => Swal.fire(
                    {
                        icon: "error",
                        text: err.response.data.message
                    }
                ))
                .finally(() => {
                    //關閉 loading
                    toggleLoading()
                })
        },

        //刪除購物車單一品項
        deleteCartItem(id) {
            //開啟 loading
            const { toggleLoading } = loadingStore()
            toggleLoading()

            //資料處理
            const url = `${apiUrl}/api/${apiPath}/cart/${id}`
            axios.delete(url)
                .then(res => {
                    //提示訊息
                    this.showToast = !this.showToast
                    //重整購物車
                    this.getCartsList()
                })
                .catch(err => Swal.fire({
                    icon: "error",
                    text: err.response.data.message
                }))
                .finally(() => {
                    //關閉 loading
                    toggleLoading()
                })
        },
        //刪除全部購物車
        clearCartsList() {
            //刪除前提示詢問
            Swal.fire({
                title: "確定要清空購物車嗎？",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK"               
            }).then((result) => {

                //確認刪除
                if (result.isConfirmed) {
                    //開啟 loading
                    const { toggleLoading } = loadingStore()
                    toggleLoading()

                    //資料處理
                    const url = `${apiUrl}/api/${apiPath}/carts`

                    axios.delete(url)
                        .then(res => {
                            //提示訊息
                            Swal.fire(res.data.message)
                            //重整購物車
                            this.getCartsList()
                        })
                        .catch(err => Swal.fire({
                            icon: "error",
                            text: err.response.data.message
                        }))
                        .finally(() => {
                            //關閉 loading
                            toggleLoading()
                        })
                }

            });

        },
    },
})