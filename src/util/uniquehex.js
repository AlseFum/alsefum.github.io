export default function () {
    let gened = new Set();
    let str = "0123456789ABCDEF"
    return function () {

        let ret = str[Math.floor(Math.random() * 16)] + str[Math.floor(Math.random() * 16)] + str[Math.floor(Math.random() * 16)] + str[Math.floor(Math.random() * 16)]+str[Math.floor(Math.random() * 16)] + str[Math.floor(Math.random() * 16)] + str[Math.floor(Math.random() * 16)] + str[Math.floor(Math.random() * 16)];
        if (gened.has(ret)) {

            return this();
        }
        else {
            gened.add(ret);
            return ret;
        }
    }
}