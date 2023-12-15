import { defineStore } from "pinia"
export default defineStore("idlesim", {
    state: () => {
        return {
            worlds: {},
            entities: {},
            idleTime: 0
        }
    },
    actions: {
        setWorld(name, value) {
            this.worlds[name] = value;
        },
        getWorld(name) {
            return this.worlds[name]
        },
        setEntity(name, value) {
            this.entities[name] = value;
        },
        getEntity(name) {
            return this.entities[name]
        }
        ,
        getEntityList(arr) {
            return arr.map(e => this.getEntity(e))
        }
    },
}
)