const { mapState } = Pinia
import cartStore from "../store/cartStore.js"

export default {
    template: `<nav class="navbar bg-light">
    <div class="container-fluid">
      <span class="navbar-brand" href="#">舒果甜點舖</span>
      <a class="btn nav-link" href="#cartList">
        購物車
        <span class="badge rounded-pill bg-danger text-white">{{cartsList.carts?.length}}</span>
      </a>
    </div>
  </nav>`,
    computed: {
        ...mapState(cartStore, ['cartsList']),
    }
}