const { mapActions } = Pinia
import cartStore from "../store/cartStore.js"

export default {
  data() {
    return {
      qty: 1,
      modal: null
    }
  },
  props: ["product"],
  template:/*html*/`<div ref="modal"  class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-xl" role="document">
           <div class="modal-content border-0" v-if="product.product">
             <div class="modal-header bg-dark text-white">
               <h5 class="modal-title" id="exampleModalLabel">
                 <span>{{ product.product.title }}</span>
               </h5>
               <button type="button" class="btn-close"
                       data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
               <div class="row">
                 <div class="col-sm-6">
                 <img class="img-fluid" :src="product.currentImage" :alt="product.title">
                 <div>
                    <a href="#" v-for="(img, idx) in product.imagesStock" :key="'img' + idx" @click.prevent="changeImage(idx)">
                      <img :src="img" alt="productImg" class="img-store m-1" :class="img === product.currentImage ? 'border border-3 border-primary' : '' ">
                    </a>
                 </div>
                 </div>
                 <div class="col-sm-6">
                   <span class="badge bg-primary rounded-pill">{{ product.product.category }}</span>
                   <p>商品描述：{{ product.product.description }}</p>
                   <p>商品內容：{{ product.product.content }}</p>
                   <div class="h5" v-if="!product.price">{{ product.product.origin_price }} 元</div>
                   <del class="h6" v-if="product.price">原價 {{ product.product.origin_price }} 元</del>
                   <div class="h5" v-if="product.price">現在只要 {{ product.product.price }} 元</div>
                   <div>
                     <div class="input-group">
                     <input type="number" class="form-control"
                     v-model.number="qty" min="1">
                       <button type="button" class="btn btn-primary" @click="addCartHandle(product.product.id, qty)">加入購物車</button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>`,
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    });
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),

    //切換顯示圖
    changeImage(idx) {
      this.product.currentImage = this.product.imagesStock[idx]
    },

    //開啟 modal
    openModal() {
      this.modal.show()
    },

    //關閉 modal
    hideModal() {
      this.modal.hide()
    },
    
    //加入購物車
    addCartHandle(id, qty) {
      this.hideModal()
      this.addToCart(id, qty)
    }
  },
}