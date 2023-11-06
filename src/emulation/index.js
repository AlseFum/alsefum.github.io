export class Emulator{
    constructor({env,context,scenes,title,}={}){
        this.env=env;
        if(!this.env.print||0)console.warn("no enough env func");

        this.scenes=new Map();
        if(scenes)if(scenes instanceof Map)this.scenes=scenes;else scenes.map(i=>new Scene(i)).forEach(element => {
            this.scenes.set(element.name,element);
        });

        this.context=new Context(context);

        this.title=title;
        this.currentScene=this.scenes.values().next().value;
    }
    context;
    scenes;//newMap
    title="default";
    currentScene;
    goto(sceneName,context){
        if(this.scenes.has(sceneName)){
            this.env.print(this.scenes.get(sceneName).render(context)??"");
            this.currentScene=this.scenes.get(sceneName);
            console.log(this.currentScene)
        }else{
            return false;
        }
    };
    history=[];
    save(){};
    load(){};
    command(cstr){eval(cstr)};
    /**
     * 这个是外界提供的接口
     * 需要提供一些ui方面的内容
     * 比如基本的writeLine
     * 或者print
     */
    env;
}
class Scene{
    constructor(i){
        this.inputs=i.inputs.map(i=>new Input(i));
        this.name=i.name;
        if(typeof i.title  == 'function')this.title=i.title;
        else this.title=i=>this.name;

        if(typeof i.render=='function')this.render=i.render;
        else this.render=(context,emulator)=>i.render;
        return this;
    }
    title=i=>"default"
    name;
    render(context,emulator){
        return "hello Emulation"
    }
    inputs=[]
    
}
class Input{
    constructor(i){
        Object.assign(this,i)
    }
    exec(context,emulator){}
    hidden=(context,emulator)=>false;
    disabled=(context,emulator)=>false;
    label="";
    type=Input.Button;
    static Type={
        Button:1,
    }
}
export class Context extends Map{
constructor(){
    super();
    return new Proxy(this,{
get(obj,prop){
   if(prop!='get')return obj.get(prop)
},
set(obj,prop,value){
    return obj.set(prop,value);
}
    })
}
}