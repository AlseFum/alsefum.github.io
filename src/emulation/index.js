//本质上是一个router,切换各种场景，执行各种逻辑，并提供一个context作为变量库
//scene就是场景
//input是场景提供的各种输出，有类型，也有tag
//context是存变量的，怎么设计都可以
//view是视窗，监控变量，独立于场景显示之外
//有好几种scene，对应不同的显示方式，具体显示需要一套协定
import { cjson } from '../util'
import Table from "../util/table.js"
export let Context = Table
//需要有使用存档的能力
export class Emulator {
    constructor(def, env) {
        //应当是对象输入，否则将字符串合理化
        let definition = cjson.parse(def);
        0 && console.log("[new Emulation]definition:", definition)
        let { context, scenes, title } = definition;

        this.env = env;
        if (!this?.env.print) console.warn("no enough env func");

        this.title = title;//这个理论上只是在大头？
        this.context =Context(context);
        this.scenes=Table(scenes.map(s=>new Scene(s)),"id");

        let start;
        //实现for of！
        for(let i of this.scenes){
            if(i.isStart||i.id==='start'){start=i;break;}
        }
        if(start)this.goto(start.id);
        else{
            this.currentScene=null;
            //null就是自选
        }
    }
    context;
    scenes;
    title = "default";

    currentScene;
    goto(sceneName, context = this.context) {
        if (this.scenes.has(sceneName)) {
            this.currentScene = this.scenes[sceneName];
            let toprint = this.currentScene.render(context ?? this.context, this) ?? ""
            this.env.print(toprint);
            // if (typeof this.currentScene.title === "function")
            //     this.title = this.currentScene?.title?.(context, this);
            // else this.title = this.currentScene.title;

        } else {
            return false;
        }
    };
    push(sceneName, context = this.context) {
        this.history.push(this.currentScene?.id);
        this.goto(sceneName, context);
    };
    back(_sceneName, context = this.context) {
        let d = this.history.pop();
     //   console.log("backing to ", d)
        if (d) this.goto(d);
        else this.goto(_sceneName);
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
        Object.assign(this,sceneDef);
        if(!this.type)this.type="scene";
        switch(this.type){
case "scene":{break;}
case "plot":{break;}
        }
        
        // if (sceneDef.inputs) this.inputs = sceneDef.inputs.map(i => new Input(i));

        // if (typeof sceneDef.title == 'function') this.title = sceneDef.title;
        // else this.title = it => sceneDef.title ?? "";

        // if (typeof sceneDef.render == 'function') this.render = sceneDef.render;
        // else this.render = (context, emulator) => (sceneDef.render ?? sceneDef.template ?? "Hello Emulator");

        // //views
        // if (sceneDef.watch) this.watch = sceneDef.watch;

    }
    title = i => ""
    id;
    render() { }

}
class Input {
    constructor(i) { Object.assign(this, i); }
    exec(context, emulator) { }
    hidden = (context, emulator) => false;
    disabled = (context, emulator) => false;
    label = "";
    group = []
    static Button=1;
    static Text=2;
    static Select=3;
}
class InputButton extends Input {
    type=Input.Button
}
class InputText extends Input {
    type=Input.Text
}
class InputSelect extends Input {
    type=Input.Select
}