import productModal from "./productModal.js";

// VeeValidate 規則
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale 套用語系檔案
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 輸入文字時，是否立即進行驗證
});

const app = Vue.createApp({
  data() {
    return {
      apiUrl: 'https://ec-course-api.hexschool.io/v2',
      apiPath: 'winnie05',
      products: [],
      showProduct: {},
      cart: [],
      isLoading: true,
      form: {
          user: {
              name: '',
              email: '',
              tel: '',
              address: '',
          },
          message: '',
      },
    }
  },
  methods: {
    // 取得所有產品資訊
    getProducts() {
        axios.get(`${this.apiUrl}/api/${this.apiPath}/products`)
            .then(res => {
                this.products = res.data.products;
                this.isLoading = false;
            })
            .catch(err => {
              alert(err.response.data.message);
            });
    },
    getProduct(id) {
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      this.loadingStatus.loadingItem = id;
      axios.get(url).then((response) => {
        this.loadingStatus.loadingItem = '';
        this.product = response.data.product;
        this.$refs.userProductModal.openModal();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    // spinner
    toggleSpinner(id, refName) {
        const spinnerArray = this.$refs[refName + id];
        const spinner = spinnerArray[0];
        spinner.classList.remove('d-none');
        spinner.classList.add('d-block');
        setTimeout(() => {
            spinner.classList.remove('d-block');
            spinner.classList.add('d-none');
        }, 500)
    },
    // 打開 modal
    openModal(id) {
        this.showProduct = this.products.find(item => item.id === id);
        this.toggleSpinner(id, 'spinner');
        setTimeout(() => {
            this.$refs.productModal.openModal();
        }, 500);
    },
    // 加入購物車
    addCart(id, qty = 1) {
        this.toggleSpinner(id, 'cartSpinner');
        setTimeout(() => {
            this.$refs.productModal.hideModal();
        }, 550);
        const cart = {
            qty,
            "product_id": id
        };
        axios.post(`${this.apiUrl}/api/${this.apiPath}/cart`, { "data": cart })
            .then(res => {
                alert(res.data.message);
                this.getCart();
            })
            .catch(err => {
                console.log(err);
            });
    },
    // 取得購物車
    getCart() {
        axios.get(`${this.apiUrl}/api/${this.apiPath}/cart`)
            .then((res) => {
                this.cart = res.data.data;
            }).catch((err) => {
                console.log(err);
            });
    },
    // 更新購物車品項數量
    updateItem(item) {
        const cart = {
            "qty": item.qty,
            "product_id": item.product_id
        };
        axios.put(`${this.apiUrl}/api/${this.apiPath}/cart/${item.id}`, { "data": cart })
            .then((res) => {
                alert(res.data.message);
                this.getCart();
            }).catch((err) => {
                console.log(err);
            });
    },
    // 刪除單一購物車品項
    delItem(id) {
        this.toggleSpinner(id, 'delSpinner');
        axios.delete(`${this.apiUrl}/api/${this.apiPath}/cart/${id}`)
            .then(res => {
                alert(res.data.message);
                this.getCart();
            })
            .catch(err => {
                console.log(err);
            });
    },
    // 清空購物車
    delCart() {
        axios.delete(`${this.apiUrl}/api/${this.apiPath}/carts`)
            .then(res => {
                alert(res.data.message);
                this.getCart();
            })
            .catch(err => {
                console.log(err);
            });
    },
    // 表單-手機驗證
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入09開頭的手機號碼'
    },
    // 表單-提交
    onSubmit() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      const order = this.form;
      axios.post(url, { data: order }).then((response) => {
        alert(response.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    }
  },
  mounted() {
    this.getProduct();
    this.getCart();
  }
});

//產品 Modal
app.component('productModal', productModal);
// Vue Loading
app.component('loading', VueLoading.Component);
// VeeValidate 註冊
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.use(VueLoading.LoadingPlugin);
app.mount('#app');