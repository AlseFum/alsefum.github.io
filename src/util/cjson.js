class scope extends Map {
    constructor(prior) {
        super();
        return new Proxy(this,
            {
                get(obj, prop) {
                    if (obj.get(prop) == undefined) return prior?.get(prop);
                    return obj.get(prop)
                },
                set(obj, prop, value) {
                    return obj.set(prop, value)
                }
            }
        )
    }
}
// //
// keyProcess
//满足键名验证，返回给的结果

// arrayProcess
// dictprocess

// //
//branch应该是中遍历
//两个问题，一个是指令的存在形式，一个是引用
//stringify采取的思路在parse中可能有问题
//stringify中，缓存一定量的对象，如果有引用则直接生成&ref
//parse就认为几个ref中，层级最高的那个是本体。同级的情况下哪个先出现就先返回哪个

// DES 加密函数
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

// // 测试加密和解密函数
// const password = '12345678';
// const plaintext = 'Hello, world!';

// const ciphertext = encrypt(password, plaintext);
// const decryptedText = decrypt(password, ciphertext);

// console.log('Ciphertext:', ciphertext);
// console.log('Decrypted Text:', decryptedText);

function branch(n, { depth = 0,password="ChenEr" } = {}) {
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
        else if (n["&random"]) {
            if (Array.isArray(n.items)) {
                return n.items[Math.floor(Math.random() * n.items.length)];
            } else if (n.range) {
                if (Array.isArray(n.range)) return Math.random() * (n.range[1] - n.range[0]) + n.range[0];
                else return Math.random() * n.range
            }
        }else if(n["&crypted"]){
            if(decrypt(password,n.validate)==="success")
            return decrypt(password,n["&crypted"].value)
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