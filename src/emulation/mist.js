
export default {
    id:"mist",
    scenes:[
        {
            id:"start",
            render(){return "no out"},
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
                return `h`
            },
            inputs:[{
                label:"理智->灯光",
                exec(c){
                    c.sanity-=1;
                    c.light+=2;
                   
                }
            },{
                label:"深入",
                exec(c,emu){
                    c.sanity--;
                    c.light--;
                    c.depth++;
                    if(c.depth>10){emu.goto("start");return ;}
                    if(Math.random()>0.7)emu.goto("level1_witch")
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
        }
    ],
}