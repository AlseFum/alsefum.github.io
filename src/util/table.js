export default function (_proto, keyIfArray) {

    // let ret={
    //     [Symbol.iterator](){
    //         return function*(){
    //             let d=Object.entries(this);
    //             for(let i in d){
    //                 yield i;
    //             }
    //         }
    //     }
    // }
    // if (!Array.isArray(_proto)) return Object.assign({}, _proto)
    // else if (_proto instanceof Map) {
    //     let ret = {};
    //     for (let i in _proto.entries) {
    //         ret[i[0]] = ret[i][1]
    //     } return ret;
    // } else {
    //     let ret = {}
    //     for (let i in _proto) {
    //         ret[_proto[i][keyIfArray]] = _proto[i]
    //     }
    //     return ret;

    // }
    //只是把proto按键转化为map
    let proto;
    if (!(_proto instanceof Map)) {
        if (!(_proto instanceof Array) || !keyIfArray) {
            proto = new Map();
            for (let i in _proto) {
                proto.set(i, _proto[i])
            }
        } else {
            proto = new Map();
            for (let i in _proto) {
                proto.set(_proto[i][keyIfArray] ?? i, _proto[i])
            }
        }
    }
    else proto = _proto;
    let iteration, selfIteration;
    return new Proxy(new Map(), {
        has(obj, prop) {
            return i => { console.log("here hasing"); obj.has(i) };
        },
        get(obj, prop) {
            if (prop === "has") { return i => obj.has(i) || proto.has(i) };
            if (prop === Symbol.iterator) {
                return function* () {
                    for (let i of proto) {
                        yield i[1]
                    }
                    for (let i of obj) {
                        yield i[1]
                    }
                    return;
                };
            }
            let res = obj.get(prop);
            
            if(prop.startsWith&&!prop.startsWith("_"))console.log("prop:", prop, "  res:", res)
            if (res === undefined) return proto.get ? proto.get(prop) : proto?.[prop]
            return res;
        },
        set(obj, prop, value) {
            obj.set(prop, value);
            return this;
        },
        getPrototypeOf(obj) {
            return proto
        },
        setPrototypeOf(obj, proto) {
            proto = proto;
            return this;
        }
    })
}