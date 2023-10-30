import { defineStore } from "pinia";
export default defineStore("mainpage",{
    state: () => {
        return {
            name: "mainpage"
        }
    },
    actions: {
        setName(name) {
            this.name = name
        }
    }
})