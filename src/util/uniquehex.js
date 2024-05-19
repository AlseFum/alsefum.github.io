export default function (str="0123456789ABCDEF") {
    let gened = new Set();
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