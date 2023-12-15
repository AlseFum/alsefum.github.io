import uh from '../util/uniquehex.js'
let uhgene = uh();
export class World {
    constructor(i) { Object.assign(this, i); this.hash = uhgene() }
    new() { return Object.create(this) }
    receive(entity) {
        //在这里检查是否能添加entity
        this.entities.push(entity)
    }
    tick() {
        console.log("worldtick")
    }
    choosefor() {
        return []
    }
    title = "Town.Hamlet"
    entities = []
    bp = 0;
    stable;//不常变的变量列表
    flexible;//常变的变量列表
}
export class Entity {
    constructor(i) { Object.assign(this, i); this.hash = uhgene() }
    name="John Doe";
    new() { return Object.create(this) }
    tick(wc, we) {
        wc.bp += 1;
        we.log("hell yeah")
    }
}
export class Prop{
    constructor(n){
        Object.assign(this,n)
    }
    //关于如何解析
    //最简单的是一个字符串，直接体现原obj的键值，没有默认值
    //default;
    //render(){};
    //template"" 会被方块包裹。应该用{{}}插值？
    //template 【】一系列条件对应的{{}}插值
    //形式应该是 [[key,comm,value1,value2,template]]
}