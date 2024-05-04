import { defineStore } from "pinia";
export default defineStore("mainpage",{
    state: () => {
        return {
            title: "mainpage",
            side:[[
                "[label]click me!",function(){alert("你点击了我")}]
            ]
        }
    },
    actions: {
        setTitle(title) {
            this.title = title
        }
    }
})