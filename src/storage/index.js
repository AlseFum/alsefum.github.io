import { defineStore } from "pinia";
export default defineStore("mainpage",{
    state: () => {
        return {
            title: "mainpage"
        }
    },
    actions: {
        setTitle(title) {
            this.title = title
        }
    }
})