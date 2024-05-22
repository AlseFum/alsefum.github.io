export class Location {
    constructor(i) { Object.assign(this, i) }
    id;
    label;
    description = "";
    options = [];
    state
        = [ //key of location states
            'knowness'// 0:default 1:discovered 2:mentioned
        ]

    static Default = 0;
    static Discovered = 2;
    static Mentioned = 3;
    watch = [];//key that need to be watched
    onDiscover() {
    }
    onEnter() {

    }
    onLeave() {
    }
}
export function throttle( fn,n=200) {
    let timer = new Date();
    let lastResult;
    return () => {
        if (new Date() - timer > n) {
            timer = new Date();
            lastResult = fn()
            return lastResult
        } else {
            return lastResult;
        }
    }
}

export function attempt(n, ...args) {
    if (n.$$) {
        switch (n.$$) {
            case "rand":
                return Math.floor(Math.random() * (
                    (n.max ?? n.range ?? 0) - (n.min ?? 0)
                ))
            case "enum":
                return n.body?.random?.() ?? null
        }
    } else return typeof n === "function" ? n(...args) : n
}
const rules = {
    start() {
        let res = Object.assign(new Location(), {
            id: "start",
            description: "nihao",
            options:['loop'],
        })
        return res;
    },loop(){
        return Object.assign(new Location(), {
            id: "loop",
            description: "some where to return",
            label:"LOOP",
            options:['start'],
        })
    }
}


export class Game {
    //all arguments are (options,game)
    rules = rules;
    map_record = new Map();
    curKey = Game.START;
    state = [];//key of gamestates
    static START = 'start'
    constructor(rule = rules, save = {}) {
        //save :unimplemented yet
        this.rules = rule
        this.map_record.set(Game.START,this.rules[Game.START](null,this));
        this.into({ loc_key: Game.START }, this)
        //no onEnter or onLeave?
    }
    into({ loc_key, lastLoc },game) {
        if(!game)game=this;
        game.curKey = loc_key;
        let inst = game.map_record.get(loc_key);
        if(!inst){console.log("Found no inst for key:",loc_key);return;}
        if (inst.knowness == Location.Mentioned || inst.knowness == Location.Default) {
            inst.onDiscover?.(game, lastLoc)
            inst.knowness = Location.Discovered
        }
    }
    //special cause it's public
    goto(id, { lastLoc, game  }) {
        if(game===undefined)game=this
        else if(id ===undefined)return;
        if(id.value)id=id.value
        game.map_record.get(game.curKey)?.onLeave?.({ lastLoc }, game)

        if (!game.map_record.has(id) && game.rules[id]) {
            let res = game.rules[id]({ lastLoc }, game);
            game.map_record.set(res.id, res)
            id=res.id
        } else if (!game.rules[id]) {
            console.log("Uncaught id:",id)
            return;
        }
        let accepted = game.map_record.get(id)?.onEnter?.({ lastLoc}, game )
        if (accepted === false) return;
        game.into({loc_key:id,lastLoc},game )
    }

}