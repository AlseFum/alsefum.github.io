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
                        context.light=10;
                        context.sanity=10;
                        emu.goto("level1")
                    }
                }
            ]
        },{
            id:"level1",
            render(context,emu){
                return `light:${context.light}<br/>sanity:${context.sanity}`
            },
            inputs:[{
                label:"理智->灯光",
                exec(c){
                    c.sanity-=1;
                    c.light+=2;

                }
            }],
            watch:["light","sanity"]
        }
    ],
}