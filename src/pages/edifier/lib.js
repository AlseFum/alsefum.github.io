export class Location {
    constructor(i) {
        Object.assign(this, i)
    }
    name;
    description = "aef";
    options = [":hell"];
    state=Location.Default;
    static Default=0;
    static Discovered=2;
    static Mentionedd=3;
}
export function attempt(n, ...args) {
    return typeof n === "function" ? n(...args) : n
}
export class Content {
    rules = {
        hell:
            function(){
                let res=new Location()
                res.name="Hell"+Math.random()
                res.options=[":hell",":N"]
                return res;
            },
            N:function(){
                let res=new Location()
                res.name="N"+Math.random()
                res.options=["hell","N"]
                res.description="NNN"
                return res;
            },
    }

}