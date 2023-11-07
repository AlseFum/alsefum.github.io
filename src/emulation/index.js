//本质上是一个router,切换各种场景，执行各种逻辑，并提供一个context作为变量库
//scene就是场景
//input是场景提供的各种输出，有类型，也有tag
//context是存变量的，怎么设计都可以
//view是视窗，监控变量，独立于场景显示之外
//需要有使用存档的能力
export class Emulator {
    constructor({ env, context, scenes, title, } = {}) {
        this.env = env;
        if (!this.env.print || 0) console.warn("no enough env func");
        else this.env.setTitle?.(this.title);

        this.scenes = new Map();
        if (scenes) if (scenes instanceof Map) this.scenes = scenes; else scenes.map(i => new Scene(i)).forEach(element => {
            this.scenes.set(element.id, element);
        });

        this.context = new Context(context);

        this.title = title;//这个理论上只是在大头？
        this.currentScene = this.scenes.values().next().value;

    }
    context;
    scenes;//newMap
    title = "default";

    currentScene;
    goto(sceneName, context) {
        if (this.scenes.has(sceneName)) {
            this.env.print(this.scenes.get(sceneName).render(context) ?? "");
            this.currentScene = this.scenes.get(sceneName);
            console.log(this.currentScene)
        } else {
            return false;
        }
    };
    history = [];
    load(context) { this.context = new Context();return this; };
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
    constructor(i) {
        if(typeof i ==='string'){}
        this.inputs = i.inputs.map(i => new Input(i));
        this.id = i.id;
        if (typeof i.title == 'function') this.title = i.title;
        else this.title = i => this.name;

        if (typeof i.render == 'function') this.render = i.render;
        else this.render = (context, emulator) => i.render;

        //views
        return this;
    }
    title = i => "default"
    id;
    render(context, emulator) {
        return "hello Emulation"
    }
    inputs = []

}
class Input {
    constructor(i) {
        Object.assign(this, i)
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
        return new Proxy(this, {
            get(obj, prop) {
                if(prop ==='raw')return obj;
                if (prop != 'get' && prop != 'raw') return obj.get(prop)
            },
            set(obj, prop, value) {
                return obj.set(prop, value);
            }
        })
    }
}
export class View {
    constructor() {

    }
    title() { return "default" }
}
function obj2fn(obj){
    if(!obj.params||!obj.body)return false;
    else{
        return new Function(...obj.params, obj.body);
    }
}