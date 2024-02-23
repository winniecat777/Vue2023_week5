const { mapState, mapActions } = Pinia
import productStore from "../store/productStore.js"
import categoryStore from "../store/categoryStore.js"

export default {
    data() {
        return {
            //當前產品分類
            currentCategory: "",            
        }
    },
    template: /*html*/`<div>
            <label for="category" class="me-3">產品分類篩選</label>
            <select name="category" id="category" v-model="currentCategory">
            <option value="">全部</option>
            <option :value="item" v-for="item in categoryList" :key="item">{{item}}</option>
            </select>
        </div>
        `,
    watch: {
        currentCategory(){
            this.getProductList(1, this.currentCategory)
        } 
    },
    computed: {
        ...mapState(categoryStore, ['categoryList']),
    },
    methods: {
        ...mapActions(productStore, ['getProductList']),
        ...mapActions(categoryStore, ['getCategoryList']),
    }
}
