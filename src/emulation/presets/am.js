
export default {
    id: "am",
    title: "劣仿AM",
    scenes: [{
        id: "start",
        type: "plot",
        render(i) {
            if (typeof i === "object") {
                i.num++;
                if (i?.num >= 3) return { goto: "main" }
            }
            if(i===Symbol.for("back"))return true;
            if (i === undefined) return "什么都不给,还想render出东西,做白日梦呢"
            return "拙劣模仿。<br/>实验用<br/>今日的花子"
        },
        inputs: [{ label: "开始", id: "start", exec(c, e) { start(c, e); e.push("main"); } }]
    },{
        id:"main",
        render(){
            return "here 什么都没有。"
        },
        inputs:[{
            label:"回去",
            exec(c,e){
                e.goto("start")
            }
        }]
    }]
}