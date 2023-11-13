
// class scope extends Map{
//     constructor(prior){
//         super();
//         return new Proxy(this,
//         //     {
//         //     get(obj,prop){
//         //         if(obj.prop==undefined)return prior?.get[prop];
//         //         return obj.prop
//         //     }
//         // }
//         )
//     }
// }
// //
// keyProcess
// arrayProcess
// dictprocess

// //

function branch(n, { depth = 0 ,} = {}) {
    if (typeof n !== 'object') return n;
    if (Array.isArray(n)) {
        let ret = [];
        for (let i of n) {
            ret.push(branch(i, { depth: depth + 1 }));
        }
        return ret;
    }
    else {
        //obj才是主体，或者说现在的主体
        
        // let keys=Object.keys(n);
        // if(keys.includes(\dear\))console.log("dear!!")
        if (n["&group"]) {
            let ret = [];
            let addi = pairs2obj(n["&group"]);
            for (let i of n.children ?? n.sub) {
                ret.push(
                    branch(
                        Object.assign(i, addi)
                        , { depth: depth + 1 }));
            }
            return ret;
        }
        else if (n["&type"] === 'fn' || n["&type"] === 'func' || n["&type"] === 'function' ||
            (Object.keys(n).length === 2 && n.params && n.body)) {
            return obj2fn(n);
        }

        else {
            //这里是键名部分的指令
            let ret = {};
            for (let i in n) {

                if (i.endsWith("%fn")) {
                    ret[i.slice(0, -3)] = typeof n[i] === 'string' ?
                        new Function(n[i])
                        : new Function(...n[i])
                        ; continue
                }
                ret[i] = branch(n[i], { depth: depth + 1 });

            }
            return ret;
        }
    }



};
function obj2fn(obj, funcProcessor = i => i) {
    return new Function(...obj.params ?? [], funcProcessor(obj.body ?? []));
}
function pairs2obj(pairs) {
    let ret = {}
    for (let i of pairs) {
        if (Array.isArray(i))
            ret[i[0]] = i[1];
        else ret[i] = true;
    }
    return ret;
}
export default {
    parse(data) {
        return branch(typeof data === 'object' ? data : JSON.parse(data));
    },
    // scope
}