function initContext(c) {
    c.pervpoint = 0;
    c.distance = 1;
    c.heartbeat = 70;
    c.aroused = 0;
    c.exhib = 0;
    c.striking = 0;
    return c;
}
function PublicArea() {
    return this;
}
export default {
    id: "perv",
    title: "PervWalker",
    scenes: [
        {
            id: "start",
            template: "干点坏事",
            inputs: [{
                label: "好", exec(c, e) {
                    initContext(c);
                    e.goto("prepare")
                }
            }]
        },
        {
            id: "prepare",
            render(c, e) {
                return `
pervpoint:${c.pervpoint}           
exhib:${c.exhib}
striking:${c.striking}`
            },
            inputs: [{
                label: "去公共地区",
                exec(c, e) {
                    e.goto('publicArea')
                },
            }, {
                label: "open点",
                exec(c, e) {
                    c.exhib += 10;
                }
            }
            ]
        },
        {
            id: "publicArea",
            render(c, e) {

                return "道路：pp:" + c.pervpoint + c.distance
            },
            inputs: [
                {
                    label: "远点",
                    exec(c, e) {
                        c.distance++;
                    }
                }, {
                    label: "驻留",
                    exec(c, e) { }
                },{
                label:"跟踪路人",
                exec(c,e){
                    e.goto("stalk")
                }
                }
            ],
            watch: ['pervpoint', "heartbeat"]
        }, {
            id: "siteArea",
            render() { return "siteArea" },
            inputs: [{
                label: "返回", exec(c, e) {
                    e.back();
                }
            }]
        },{
            id:"stalk",type:"plot",
            render(c,e,i){
                
                if (typeof i === "object") {
                    i.num++;

                    if(i.num<4)return "你跟着它";
                    console.log("time to return")
                    return { goto: "failed" }
                }
                if(i===Symbol.for("back"))return true;
                if (i === undefined) return "你瞄准了一个目标。。。"
                return "你跟着它"
            }
        },{
            id:"failed",
            render(){return "你被发现了。"},
            inputs:[{
                label:"再来",
                exec(c,e){
                    e.goto('start')
                }
            }]
        }
    ]
}