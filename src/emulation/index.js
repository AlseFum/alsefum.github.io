//本质上是一个router,切换各种场景，执行各种逻辑，并提供一个context作为变量库
//scene就是场景
//input是场景提供的各种输出，有类型，也有tag
//context是存变量的，怎么设计都可以
//view是视窗，监控变量，独立于场景显示之外


//需要有使用存档的能力
export class Emulator {
    constructor(def, env) {
        //应当是对象输入，否则将字符串合理化
        let definition = buildFromJSONObject(def);
        1 && console.log("[new Emulation]definition:", definition)
        let { context, scenes, title } = definition;

        this.env = env;
        if (!this?.env.print || 0) console.warn("no enough env func");

        this.title = title;//这个理论上只是在大头？

        this.scenes = new Map();
        if (scenes) if (scenes instanceof Map) this.scenes = scenes;
        else scenes.map(i => new Scene(i)).forEach(element => {
            this.scenes.set(element.id, element);
        });

        this.context = new Context(context);

        this.goto(this.scenes.get(this.scenes.keys().next().value).id)
    }
    context;
    scenes;//newMap
    title = "default";

    currentScene;
    goto(sceneName, context) {
        if (this.scenes.has(sceneName)) {
            this.currentScene = this.scenes.get(sceneName);
            
            let toprint=this.currentScene.render(context??this.context, this) ?? ""
            console.log("goto rendering:",toprint,context??this.context);
            this.env.print(toprint);

            // if (typeof this.currentScene.title === "function")
            //     this.title = this.currentScene?.title?.(context, this);
            // else this.title = this.currentScene.title;

        } else {
            return false;
        }
    };
    history = [];

    load(context) { this.context = new Context(); return this; };
    save() { return this.context.raw.toString() };
    command(cstr) { eval(cstr) };
    /**
     * 这个是外界提供的接口
     * 需要提供一些ui方面的内容
     * 比如基本的writeLine
     * 或者print
     */
    //view
    env;

}
class Scene {
    constructor(sceneDef) {
        this.id = sceneDef.id;

        if (sceneDef.inputs) this.inputs = sceneDef.inputs.map(i => new Input(i));

        if (typeof sceneDef.title == 'function') this.title = sceneDef.title;
        else this.title = it => sceneDef.title ?? "untitled";

        if (typeof sceneDef.render == 'function') this.render = sceneDef.render;
        else this.render = (context, emulator) => sceneDef.render ?? "Hello Emulator";

        //views

    }
    title = i => ""
    id;
    render() { }
    inputs = []

}
class Input {
    constructor(i) {
        Object.assign(this, i);
    }
    exec(context, emulator) { }
    hidden = (context, emulator) => false;
    disabled = (context, emulator) => false;
    label = "";

    type = Input.Button;
    static Type = {
        Button: 1,
    }
}
export class Context extends Map {
    constructor() {
        super();
        // return new Proxy(this, {
        //     get(obj, prop) {
        //         if (prop === 'raw') return obj;
        //         if (prop != 'get' && prop != 'raw') return obj.get(prop)
        //     },
        //     set(obj, prop, value) {
        //         return obj.set(prop, value);
        //     }
        // })
        return this;
    }
}
export class View {
    constructor() { }
    title() { return "default" }
}
export function buildFromJSONObject(mid) {
    function branch(n) {

        if (Object.keys(n).length == 2 && n.params && n.body) {
            return obj2fn(n);
        }
        else if (n instanceof Array) {
            let ret = [];
            for (let i of n) {
                ret.push(branch(i));
            }
            return ret;
        }

        else if (typeof n == 'object') {
            let ret = {};
            for (let i in n) {
                ret[i] = branch(n[i]);
            }
            return ret
        }
        else return n;
    };
    return branch(typeof mid === 'object' ? mid : JSON.parse(mid));
}
function obj2fn(obj) {
    if (!obj.params || !obj.body) return false;
    else {
        return new Function(...obj.params, obj.body);
    }
}
// /console.log(buildFromJSONObject({n:23,shit:{params:['x','y'],body:"return x+y"}}))