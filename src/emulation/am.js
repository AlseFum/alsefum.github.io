function place(id,templateOrRender,{title,inputs=[],watch}={}){
    return {
        id,
        [templateOrRender instanceof Function? "render": "template"]:templateOrRender,
        inputs,watch,title,
        $connect(placeOrId,label){
            this.inputs.push(
                golocation(placeOrId,label))
        }
    }
}
function golocation(loc,title){
    let str=typeof loc=="object"?loc.id:loc
    return {label:title??str, exec(c,e){
        e.goto(str,c);
    }}
}
function  mainRender(c,e){
    return `${c.player.name}`
}
function start(c,e){
    c.player={name:Math.random()}
}
let main=place("main",mainRender,{title:"恁家"})
let school=place("school","学校",{title:"学校"})
school.$connect(main,"回家")
main.$connect(school,"学校")
export default {
    id:"am",
    title:"劣仿AM",
    scenes:[{
        id:"start",render(){
            return "拙劣模仿。<br/>实验用<br/>今日的花子从屁股里抽出了"+["跳蛋","扳手","幻龙","肛塞"][Math.floor(Math.random()*4)]
        },
        inputs:[{label:"开始",id:"start",exec(c,e){start(c,e);e.push("main");}}]
    },main,school]
}