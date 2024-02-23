const { defineStore } = Pinia

export default defineStore("loadingStore", {
    state: () => ({
        //loading 控制
        isLoading: false
    }),
    actions:{
        toggleLoading(){
            this.isLoading = !this.isLoading
        }
    }
})