const { mapState, mapActions } = Pinia
import productStore from "../store/productStore.js"

export default {
  template:/*html*/`
    <nav aria-label="Page navigation" class="d-flex justify-content-end">
          <ul class="pagination">
            <li class="page-item" :class="{'disabled': !pagination.has_pre}">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active': page === pagination.current_page}">
              <a href="#" class="page-link" @click.prevent="getProductList(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': !pagination.has_next}">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="getProductList(pagination.current_page+1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
    `,
  computed: {
    ...mapState(productStore, ['pagination']),
  },
  methods: {
    ...mapActions(productStore, ['getProductList']),
  }
}