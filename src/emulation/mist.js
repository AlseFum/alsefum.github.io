
export default {
    id:"mist",
    scenes:[
        {
            id:"start",
            render(){return "雾林level1"},
            inputs:[
                {
                    label:"开始",
                    exec(context,emu){
                        context.CHA=Math.ceil(Math.random()*6)
                        context.DEX=Math.ceil(Math.random()*6)
                        context.STR=Math.ceil(Math.random()*6)
                        context.INT=Math.ceil(Math.random()*6)
                        context.light=10;
                        context.sanity=10;
                        context.depth=0;
                        emu.goto("level1")
                    }
                }
            ]
        },{
            id:"level1",
            render(context,emu){
                return `level1 道中`
            },
            inputs:[{
                label:"理智->灯光",
                exec(c,e){
                    c.sanity-=1;
                    c.light+=2;
                    if(c.sanity<=0||c.light<=0){console.log("emmm");e.goto("level1_lost");return;}
                }
            },{
                label:"深入",
                exec(c,emu){
                    c.sanity--;
                    c.light--;
                    c.depth++;
                    if(c.sanity<=0||c.light<=0){console.log("emmm");emu.goto("level1_lost");return;}
                    if(c.depth>2){emu.goto("level1_end");return ;}
                    if(Math.random()>0.7)emu.goto("level1_end")
                }
            }],
            watch:["light","sanity"]
        },{
            id:"level1_witch",
            render(){
                return `未知的小屋`
            },
            inputs:[
                {label:"歇一歇",exec(c){c.light+=5,c.sanity+=5;}},
            {label:"继续",exec(c,e){if(c.INT*Math.random()*2>4)e.goto("level1")}}
            ]
        },{
            id:"level1_end",
            render(){
                return "level1的终点。"

            },
            inputs:[
                {
                    label:"返回",
                    exec(c,e){
                        e.goto("start")
                    }
                }
            ]
        },{
            id:"level1_lost",
            render(){return "无论是丧失理智还是迷失方向，你都-逃不掉了。"},
            inputs:[{
                label:"重来",
                exec(c,e){
                    e.goto("start")
                }
            }]
        }
    ],
}