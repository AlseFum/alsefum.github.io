function golocation(loc,title){
    let str=typeof loc=="object"?loc.name:loc
    return {label:title??str, exec(c,e){
        e.goto(str,c);
    }}
}
function place(id,templateOrRender,{title,inputs=[],watch}={}){
    return {
        id,
        [templateOrRender instanceof Function? "render": "template"]:templateOrRender,
        inputs,watch,
        $connect(placeOrId,label){
            this.inputs.push(placeOrId,label)
        }
    }
}
let sceneMansion = [{
    id: "sm_info",
    render(c) {
        return "keys:" + c.mansionkeys + "\n"

    }, inputs: [golocation("sm_1","进入洋馆")]
},
{
    id: "sm_start",
    render(c) {
        c.mansionkeys = 0;
        return "笼罩在阴影中的洋馆。你要进去吗？"
    },
    inputs: [golocation("sm_1","进入洋馆"), {
        label: "返回",exec(c, emu) {emu.back();}
    }]
},
{
    id: "sm_1",title:"一楼",
    render() { return "大厅。这里是一楼。" },
    inputs: [golocation("sm_2","》上二楼"), {
        label: "》房间3",
        exec(c, emu) { emu.goto("sm_room3") }
    },
    
    { label: "》出去", exec(c, e) { e.goto("sm_out") } }
        ,
    { label: "看看", exec(c, e) { e.push("sm_info") } }]
},
{
    id: "sm_2",title:"二楼",
    render() {
        return "洋馆上层。"
    }, inputs: [golocation("sm_1","》下一楼"),
     golocation("sm_room1","房间1"),
     golocation("sm_room2","房间2"),]
}, {
    id: "sm_out",
    render() {
        return "出去的门已经合上了。需要锁。"
    },
    inputs: [{
        label: "...",
        exec(c, e) { e.goto("sm_1") }
    },
    {
        label: "开锁", exec(c, e) {
            if (c.mansionkeys <= 0) {
                e.goto("sm_1")
            } else {
                e.back();
            }
        }
    }]
},
place("sm_room1","一号房间",{inputs:[golocation("sm_room2","去隔壁")]}),
{
    id: "sm_room2",
    render() {
        return "房间二号"
    },
    inputs: [{
        label: "出去", exec(c, e) { e.goto("sm_1") }
    }]
},
{
    id: "sm_room3",
    render() {
        return "房间三号<br/>有一堆钥匙。可能是开门的"
    },
    inputs: [{
        label: "出去", exec(c, e) { e.goto("sm_1") }
    },
    {
        label: "拿一把钥匙", exec(c, e) { c.mansionkeys++; }
    }],watch:["mansionkeys"]
},
]
export default {
    id: "mist",
    title:"谜林",
    scenes: [
        {
            id: "start",title:"雾林",
            render() { return "<br/>踏入此林，不复归返" },
            inputs: [
                {
                    label: "》进入《",
                    exec(context, emu) {
                        context.CHA = Math.ceil(Math.random() * 6)
                        context.DEX = Math.ceil(Math.random() * 6)
                        context.STR = Math.ceil(Math.random() * 6)
                        context.INT = Math.ceil(Math.random() * 6)
                        context.light = 10;
                        context.sanity = 10;
                        context.depth = 0;
                        emu.goto("main")
                    }
                }
            ]
        }, {
            id: "main",
            render(context, emu) {
                let raw= `途中。<br/>`;
                if(context.light>=10)raw+="烛火通明<br/>"
                if(context.light>5&&context.light<10)raw+="烛火飘摇<br/>";
                if(context.light<5)raw+="烛火飘忽<br/>";
                if(context.sanity>5&&context.sanity<10)raw+="理智在线"
                return raw;
            },
            inputs: [ {
                label: "深入",
                exec(c, emu) {
                    c.sanity--;
                    c.light--;
                    c.depth++;
                    if (c.sanity <= 0 || c.light <= 0) {  emu.goto("lost"); return; }
                    if(Math.random()>0.3){
                        emu.push("sm_start")
                    }
                    if(c.depth>=10)emu.goto("passed")
                    if(Math.random()>0.5)emu.goto("moth")
                }
                
            }],
            watch: ["light", "sanity"]
        },  {
            id: "lost",
            title:"失去踪迹",
            render() { return "<br/>无论是丧失理智还是迷失方向，你都-逃不掉了。" },
            inputs: [golocation("start","重来")]
        }, {
            id: "passed",
            title:"穿越密林",
            render() { return "<br/>无论是好运还是...，你出来了。然而你只有一个选择。" },
            inputs: [golocation("start","重来")]
        },
    ].concat(sceneMansion).concat([
        place("moth","一只蛾子吸引着你的目光。",{
            inputs:[
                {
                    label:"追逐",disabled:()=>false,
                    exec(c,emu){
                        c.sanity--;
                        c.light--;
                        c.depth+=5*(Math.random()>0.8?1:0)+3*(Math.random()>0/5?1:0)+(Math.random()>0.5?1:0);
                        if(c.sanity<=0||c.light<=0)emu.goto("lost");
                        if(c.depth>=10)emu.goto("passed");
                    }
                },golocation("main","不追了")
            ],
            watch:["light","sanity","depth"]
        })
    ])
}