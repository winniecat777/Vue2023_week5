const { mapState } = Pinia;
import cartStore from "../store/cartStore.js";

export default {
  data() {
    return {
      toastList: null,
    };
  },
  template: /*html*/`
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div ref="toast" id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body d-flex align-items-center">
        <span class="material-symbols-outlined me-2 text-success">
        check_circle
        </span> 
        <p class="mb-0">購物車已更新</p>
        </div>
      </div>
    </div>
  `,
  mounted() {
    const toastElList = this.$refs.toast;
    this.toastList = new bootstrap.Toast(toastElList, { delay: 1000 });
  },
  computed: {
    ...mapState(cartStore, ['showToast']),
  },
  watch: {
    showToast() {
      this.toastList.show()
    }
  }
};
