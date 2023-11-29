export class Scope extends Map {
    constructor(prior) {
        super();
        return new Proxy(this,
            {
                get(obj, prop) {
                    if (obj.get(prop) == undefined) { return prior?.[prop]; }
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
    let r = new Map();
    if (arg.refs && !(arg.refs instanceof Scope)) {
        for (let iter in arg.refs) {
            r.set(iter, arg.refs[iter])
        }
    }
    return {
        refs: new Scope(r), pwd: "3qChen",
        deeper() {
            let ret = Object.create(this);
            ret.depth = (this.depth ?? 0) + 1;
            ret.refs = new Scope(this.refs);
            return ret;
        },
        ...arg
    }
}
import CryptoJS from 'crypto-js'

function encrypt(password, plaintext) {
    // 将密码转换为 UTF-8 编码的字节数组
    const keyUtf8 = CryptoJS.enc.Utf8.parse(password);

    // 使用 DES 加密模式创建加密器
    const encryptor = CryptoJS.DES.encrypt(plaintext, keyUtf8, {
        mode: CryptoJS.mode.ECB, // 加密模式为 ECB
        padding: CryptoJS.pad.Pkcs7 // 填充方式为 PKCS7
    });

    // 获取加密后的密文
    const ciphertext = encryptor.toString();

    return ciphertext;
}

// DES 解密函数
function decrypt(password, ciphertext) {
    // 将密码转换为 UTF-8 编码的字节数组
    const keyUtf8 = CryptoJS.enc.Utf8.parse(password);

    // 使用 DES 解密模式创建解密器
    const decryptor = CryptoJS.DES.decrypt(ciphertext, keyUtf8, {
        mode: CryptoJS.mode.ECB, // 解密模式为 ECB
        padding: CryptoJS.pad.Pkcs7 // 填充方式为 PKCS7
    });

    // 将解密后的结果转换为 UTF-8 编码的字符串
    const plaintext = decryptor.toString(CryptoJS.enc.Utf8);

    return plaintext;
}
let sign = {
    random: "&random",
    template: "&template",
    packed: Symbol("packed"),
    let: "&let",
    ref: "&ref",
    var: "&var",
    encrypted: "&encrypted",
    fail: Symbol("fail"),
    fn: "&fn"
}

function dealDicted(target, context) {
    let ret;//what is the ret;
    if (0) { }
    else if (target[sign.template] !== undefined) {
        if (target[sign.template] === "join" || target[sign.template] === true) {
            ret = branch(target.sub, context)?.join?.("") ?? "";
        } else if (target[sign.template] === "template") {
            //这一块不好搞
            const data = context.refs;
            ret = target.raw.replace(/\${(.*?)}/g, (match, key) => data[key]);
        }
    }
    else if (target[sign.random] !== undefined) {
        if (target[sign.random] === "range" || target[sign.random] === true) {
            ret = target.range[0] + Math.floor(Math.random() * (target.range[1] - target.range[0] + 1));
        } else if (target[sign.random] === "item") {
            ret = target.item[Math.floor(Math.random() * target.item.length)];
        } else if (target[sign.random] === "deck") {
            //这里想做deck那样的
            //或者接指称？
        }
    }
    else if (target[sign.encrypted] !== undefined) {
        if (decrypt(target.validate) === "succeed") {

            try { res = branch(JSON.parse(decrypt(target.value)), context.deeper()); }
            catch (e) {
                ret = sign.fail
            }
            if (typeof res !== "symbol") {
                if (!(res[sign.packed]))
                    ret = res;
            } else {
                if (res.let) {
                    context.refs[res.let] = res.value;
                }
                ret = res.value
            }
        } else ret = sign.fail
    }
    else if (target[sign.fn] !== undefined) {
        if (target[sign.fn] === true) {
            ret = new Function(...(target.params ?? []), target.body)
        } else if (Array.isArray(target[sign.fn])) ret = new Function(...target[sign.fn])
    }
    else if (target[sign.struct] !== undefined) {
        //true,array,props,value
        let propmap = target[sign.struct].prop ??
            (Array.isArray(target[sign.struct])) ? target[sign.struct] : []
        if (target[sign.struct] === 'simple') {
            //简单映射。只支持数组。不是数组管td
            ret = {};
            for (let i in target.value) {
                ret[propmap[i]] = target.value[i]
            }
        } else {
            //去他妈的用proxy了，何必手动copy折磨自己也折磨CPU
            let tv=target.value;
            for (let i in tv) {
                ret[i]=new Proxy(tv[i],{
                    get(obj,prop){
                        return obj[propmap.indexOf(prop)]
                    }
                })
            }
        }
    }
    else {
        //一般处理
        //sign.var用于存这个层级使用但是不记录的变量，不知道这是不是个蠢设计
        //因为sign.let对于同级的下侧成员
        ret = {};
        if (target[sign.var]) {
            let cd = context.deeper()
            for (let iter in target[sign.var]) {
                let res = branch(target[sign.var][iter], cd)
                if (!res[sign.packed]) context.refs[iter] = res;
                else {
                    if (res.let) {//这一步算其内部的ref吧
                        cd.refs[res.let] = res.value
                    }
                    context.refs[iter] = res.value
                }
            }
        }
        for (let ip in target) {
            if (ip === sign.var) continue;
            let res = branch(target[ip], context.deeper());
            if (typeof res !== "symbol") {
                if (!res[sign.packed]) ret[ip] = res;
                else {
                    if (res.let) {
                        context.refs[res.let] = res.value;
                        ret[ip] = res.value;
                    }
                }
            }
        }

    }

    //if unpacked
    let toPack = false;
    let toLet;
    //这里是ref，let，sibling相关的
    if (target[sign.ref]) {
        ret = Object.assign(ret, context.refs[target[sign.ref]]);
        delete ret[sign.ref];
    }
    //这里toLet是否重复？
    //算了先这么放着，也影响不了太多性能
    //说不定后面还要加呢
    if (target[sign.let]) {
        toLet = target[sign.let];
        delete ret[sign.let];
        toPack = true;
    }

    if (toPack) {
        ret = {
            [sign.packed]: true,
            value: ret,
            let: toLet,
        }
    }
    return ret;
}
function dealIndexed(target, context) {
    //这里好像不会有失败的可能？
    let arr = [];
    let cd = context.deeper()
    for (let i in target) {
        let cur = branch(target[i], cd);
        if (typeof cur != "symbol") {
            if (!cur[sign.packed]) { arr.push(cur); } else {
                if (cur.let) context.refs[cur.let] = cur.value;
                arr.push(cur.value)
            }
        }
    }
    return arr;
}
function dealDictedSpec(target, context) { }
function dealIndexedSpec(target, context) { }
function branch(target, context = { depth: 0 }) {
    if (!context || typeof context.depth != "number" || context.depth <= 0) { context = Context(context); }
    switch (typeof target) {
        case "object": {
            if (Array.isArray(target)) {
                if (!context.useArray)
                    return dealIndexed(target, context);
                else { return dealIndexedSpec(target, context); }
            }
            else {
                if (!context.useKey) {
                    return dealDicted(target, context);
                } else { return dealDictedSpec(target, context); }
            }
        };
        case "string": //if (context.useString) { 0 && console.log("usingString, but unimplemented yet"); return target } else return target;
        case "function":
        default: return target;
    }
}
export default branch;