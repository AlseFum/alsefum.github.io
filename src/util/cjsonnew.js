class Scope extends Map {
    constructor(prior) {
        super();
        return new Proxy(this,
            {
                get(obj, prop) {
                    if (obj.get(prop) == undefined) return prior?.get?.(prop);
                    return obj.get(prop)
                },
                set(obj, prop, value) {
                    return obj.set(prop, value)
                }
            }
        )
    }
}
function Context(arg) {
    return {
        refs: new Scope(),
        deeper() { let ret = Object.create(this); ret.depth = (this.depth ?? 0) + 1;ret.refs=new Scope(this.refs); return ret;}, 
        ...arg
    }
}
let fail = Symbol("branch failed, or no output")
function branch(target, context = { depth: 0 }) {
    if (!context || typeof context.depth != "number" || context.depth <= 0) { context = Context(context); }
    switch (typeof target) {
        case "object": {
            if (Array.isArray(target)) {
                if (!context.useArray)
                    return target;
                else { }
            }
            else {
                let ret = {};
                if (!context.useKey) {
                    for (let i in target) {
                        let cur=target[i];
                        if (cur["&ref"]) {
                            let res=branch(cur.value, context.deeper());
                            if(typeof res != "object"){
                                return fail
                            }
                            ret[i]=Object.assign(res,context.refs[ target[i]["&ref"]])
                            delete ret[i]["&let"];
                            if(res["&let"])ret[i]["&let"]=res["&let"]
                            //重复？
                        }
                        else {
                            ret[i]=branch(cur,context.deeper());
                        }

                        if(cur["&let"]){
                            context.refs[target[i]["&let"]]=ret[i]
                 
                        }
                    }
                    return ret;
                } else {
                    for (let i in target) {
                        //这里跟key有关了
                    }
                }
            }
        }; return target;
        case "string": if (context.useString) {0&& console.log("usingString, but unimplemented yet"); return target } else return target;
        case "function":
        default: return target;
    }
}
export default branch;