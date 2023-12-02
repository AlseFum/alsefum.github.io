function initContext(c) {
    c.pervpoint = 0;
    c.distance = 1;
    c.heartbeat = 70;
    c.aroused = 0;
    c.exhib = 0;
    return c;
}
function PublicArea(){
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
                `
            },
            inputs: [{
                label: "去公共地区",
                exec(c, e) {
                    e.goto('publicroad')
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
            id: "publicroad",
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
                }
            ],
            watch: ['pervpoint', "heartbeat"]
        }
    ]
}