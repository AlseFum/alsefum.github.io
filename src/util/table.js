export default function (_proto, keyIfArray) {
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