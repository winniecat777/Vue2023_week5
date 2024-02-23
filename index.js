const { createPinia } = Pinia;
const { mapState, mapActions } = Pinia

/* 元件匯入 */
import productModal from "./components/productModal.js";
import pagination from "./components/pagination.js";
import filterCategory from "./components/filterCategory.js";
import navbar from "./components/navbar.js";
import toastMessage from "./components/toastMessage.js";

/* store 匯入 */
import productStore from "./store/productStore.js";
import categoryStore from "./store/categoryStore.js";
import cartStore from "./store/cartStore.js";
import loadingStore from "./store/loadingStore.js";

/* 全域資料 */
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'winnie05';

/* VeeValidate 規則 */
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./components/zh_TW.json');

// 套用語系檔案
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 輸入文字時，就立即進行驗證
});

/* Vue */
const app = Vue.createApp({
  data() {
    return {
      //產品細項
      productDetail: {},
      //訂單欄位
      form: {
        user: {
          email: "",
          tel: "",
          address: "",
        },
        message: ""
      },
    }
  },
  methods: {
    ...mapActions(productStore, ['getProductList']),
    ...mapActions(categoryStore, ['getCategoryList']),
    ...mapActions(cartStore, ['getCartsList', 'addToCart', 'updateCart', 'deleteCartItem', 'clearCartsList']),
    ...mapActions(loadingStore, ['toggleLoading']),

    //取得產品細項
    getProductDetail(id) {
      //資料處理
      const url = `${apiUrl}/api/${apiPath}/product/${id}`
      axios.get(url)
        .then(res => {
          const product = res.data.product
          this.productDetail = {
            product,
            currentImage: product.imageUrl,
            imagesStock: [product.imageUrl, ...product.imagesUrl]
          }

          //開啟 modal
          this.$refs.productModal.openModal()
        })
        .catch(err => Swal.fire(
          {
            icon: "error",
            text: err.response.data.message
          }
        ))
    },

    //送出訂單
    submitOrder() {
      //檢查購物車是否為空
      if (!cartList.length) {
        Swal.fire("購物車內沒有商品")
        return
      }

      //開啟 loading
      this.toggleLoading()

      //資料處理
      const url = `${apiUrl}/api/${apiPath}/order`
      const order = {
        data: this.form
      }

      

      axios.post(url, order)
        .then(res => {
          //提示訊息
          Swal.fire(res.data.message)
          //清除表單
          this.$refs.form.resetForm();
          //重整購物車
          this.getCartsList()
        })
        .catch(err => Swal.fire(
            {
              icon: "error",
              text: err.response.data.message
            }
          )
          )
        .finally(() => {
          //關閉 loading
          this.toggleLoading()
        })
    }
  },
  computed: {
    ...mapState(productStore, ['productsList', 'pagination']),
    ...mapState(categoryStore, ['categoryList']),
    ...mapState(cartStore, ['cartsList']),
    ...mapState(loadingStore, ['isLoading'])
  },
  mounted() {
    this.getProductList()
    this.getCartsList()
    this.getCategoryList()
  },
})




//導覽列
app.component("navbar", navbar)

//產品 Modal
app.component("productModal", productModal)

//產品分類篩選
app.component("filterCategory", filterCategory)

//頁碼
app.component("pagination", pagination)

//通知 toast
app.component("toastMessage", toastMessage)

/* Vue Loading */
app.component("loading", VueLoading.Component)

/* VeeValidate 註冊 */
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

/* Pinia */
const pinia = createPinia()
app.use(pinia)

app.mount("#app")