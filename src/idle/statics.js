class World{
    ctx=new Map();
    open(){}
    choosefor(){
        return []
    }
}
class Entity{
    ctx=new Map();
    enterWorld(){};
    static tick(ec,wc){
        wc.choosefor(ec).exec(ec,wc,this)
    }
}
class Event{
    exec(){

    }
    examp1(ec){
        ec.gainStatus(Drunk(1));

    }
    tempttogain(){}
}
function EventList(){}
EventList.prototype.__proto__=Array.prototype;
class Status{
    name;
    category;//stable relation orwhat
    static findName(){

    }
}
class requirement{

}
function tempt(requirelist){
    //如果都过了，一一执行
}

let w=new World();
let wc=w.open();
let e=new Entity();
let ec=e.enterWorld(wc);

function show(){
    return e.status,e.prop;
}
function main(){
    setInterval();
    Entity.tick(ec,wc,this);
    World.tick(wc,this);
    clearInterval();
}