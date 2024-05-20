export class Location {
    constructor(i) { Object.assign(this, i) }
    id;
    label;
    description = "";
    options = [];
    state = Location.Default;
    static Default = 0;
    static Discovered = 2;
    static Mentioned = 3;
    watch = [];//key that need to be watched
    onDiscover(game) {

    }
    onEnter() {

    }
    onLeave() {

    }
}
export function throttle(n,fn){
    let timer=new Date();
    let lastResult;
    return ()=>{
        if(new Date()-timer>n){
            timer=new Date();
            lastResult=fn()
            return lastResult
        }else{
            return lastResult;
        }
    }
}
function locfromjson(jsonobj) {
    let inst = new Location()
    ["id",'label','description','options','watch'].forEach(i => {
        inst[i] = jsonobj[i]
    })
    Object.assign(inst,jsonobj.state)
    inst.onDiscover=function(game){
        jsonobj.sub.forEach(i=>{
            let newsub=game.rules[i](inst,game)
            inst.options.push(newsub.id)

            game.map_record.set(newsub.id,newsub)
        })
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
                break;
        }
    }else     return typeof n === "function" ? n(...args) : n
}
const rules = {
    start(from, game) {
        let res = new Location()
        res.id = "start"
        let _this = this;
        res.onDiscover = function (game) {
            console.log("triigered onDiscover")
            let t1 = _this.tiny()
            let t2 = _this.tiny()
            let t3 = _this.tiny()
            game.map_record.set(t1.id, t1)
            game.map_record.set(t2.id, t2)
            game.map_record.set(t3.id, t3)
            res.options.push(t1.id, t2.id, t3.id, "building")
            res.state = Location.Discovered
        }
        res.options.push(
        "distinct"
        )
        res.description = "nihao"

        return res;
    }, tiny(from, game) {
        let res = new Location()
        res.id = "tiny" + Math.floor(Math.random() * 10)
        res.options = ["start"]
        res.state = Location.Mentioned
        return res;
    },
    hell:function (from) {
            let res = new Location()
            res.id = "Hell " + from.name + Math.random()
            res.options = ["hell", "N","start"]
            res.watch = ['heat']
            res.heat = "1200du"
            return res;
        },
    N: function (_from) {
        let res = new Location()
        res.id = "N" + _from.name + Math.random()
        res.options = ["hell", "N"]
        res.description = "NNN"
        return res;
    }
}
const another={
    distinct(){
        let res = new Location()
        res.id = "Dis."+Math.floor(Math.random()*16)
        res.options = ["start"]
        res.label="<distinct>"
        res.state = Location.Mentioned
        let _this=this;
        res.onDiscover=function(game){
           let res1= _this.building(res,game)
           game.map_record.set(res1.id,res1)
           res.options.push(res1.id)

           let res2= _this.building(res,game)
           game.map_record.set(res2.id,res2)
           res.options.push(res2.id)
        }
        return res
    }, building: function (_from) {
        let res = new Location()
        res.id = "building" + _from.label + Math.floor(Math.random()*256)
        res.options = ["hell", "start"]
        res.description = throttle(500,() => Math.random() > 0.5 ? "普通的建筑" : Math.random() > 0.5 ? "有奇异声响的建筑" : "有奇异造型的楼")
        res.state = Location.Mentioned
        res.onDiscover = function (game) {
            let res1= _this.distinct(res,game)
           game.map_record.set(res1.id,res1)
           res.options.push(res1.id)

           let res2= _this.distinct(res,game)
           game.map_record.set(res2.id,res2)
           res.options.push(res2.id)
        }
        return res;
    }
}
Object.assign(rules,another)
export class Game {
    rules = rules;
    map_record = new Map();
    curKey = Game.START;
    state={};
    static START = 'start'
    constructor() {
        this.map_record.set(Game.START, this.rules.start(null, this));
        this.into(Game.START)
    }
    goto(id, lastLoc, game) {
        this.map_record.get(this.curKey)?.onLeave?.()

        if (this.map_record.has(id)) {
            
            let accepted = this.map_record.get(id)?.onEnter?.()
            if (accepted === false) return ;
            this.into(id)
        }
        else if (this.rules[id]) {
            let res = this.rules[id](lastLoc, game);
            this.map_record.set(res.id, res)

            let accepted = this.map_record.get(id)?.onEnter?.()
            if (accepted === false) return ;
            this.into(res.id)
        }
        
    }
    into(n) {
        this.curKey = n;
        let inst = this.map_record.get(n);
        
        if (inst.state == Location.Mentioned || inst.state == Location.Default) {
            inst.onDiscover?.(this)
            inst.state=Location.Discovered
        }
    }
}