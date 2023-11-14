
let sceneMansion = [{
    id: "sm_info",
    render(c) {
        return "keys:" + c.mansionkeys + "\n"

    }, inputs: [{
        label:(c)=>"还有"+(c.keys??0)+"把钥匙",
        exec(c, e) { e.back(c) }
    }]
},
{
    id: "sm_start",
    render(c) {
        c.mansionkeys = 0;
        return "笼罩在阴影中的洋馆。你要进去吗？"
    },
    inputs: [{
        label: "进去",
        exec(c, emu) { emu.goto("sm_1") }
    }, {
        label: "返回",
        exec(c, emu) {
            emu.goto("start")
        }
    }]
},
{
    id: "sm_1",
    render() { return "大厅。这里是一楼。" },
    inputs: [{
        label: "左手楼梯",
        exec(c, emu) { emu.goto("sm_2") }
    }, {
        label: "房间3",
        exec(c, emu) { emu.goto("sm_room3") }
    },
    {
        label: "右手楼梯",
        exec(c, emu) { emu.goto("sm_2") }
    },
    { label: "出去", exec(c, e) { e.goto("sm_out") } }
        ,
    { label: "看看", exec(c, e) { e.push("sm_info") } }]
},
{
    id: "sm_2",
    render() {
        return "洋馆上层。"
    }, inputs: [{
        label: "左手楼梯",
        exec(c, emu) { emu.goto("sm_1") }
    },
    {
        label: "右手楼梯",
        exec(c, emu) { emu.goto("sm_1") }
    }, {
        label: "房间1",
        exec(c, emu) { emu.goto("sm_room1") }
    },
    {
        label: "房间2",
        exec(c, emu) { emu.goto("sm_room2") }
    },]
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
                e.goto("level1")
            }
        }
    }]
},
{
    id: "sm_room1",
    render() {
        return "房间一号"
    },
    inputs: [{
        label: "出去", exec(c, e) { e.goto("sm_1") }
    }]
},
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
        return "房间三号"
    },
    inputs: [{
        label: "出去", exec(c, e) { e.goto("sm_2") }
    },
    {
        label: "看到什么", exec(c, e) { c.mansionkeys++; }
    }]
},
]
export default {
    id: "mist",
    title:"谜林",
    scenes: [
        {
            id: "start",
            render() { return "雾林level1" },
            inputs: [
                {
                    label: "开始",
                    exec(context, emu) {
                        context.CHA = Math.ceil(Math.random() * 6)
                        context.DEX = Math.ceil(Math.random() * 6)
                        context.STR = Math.ceil(Math.random() * 6)
                        context.INT = Math.ceil(Math.random() * 6)
                        context.light = 10;
                        context.sanity = 10;
                        context.depth = 0;
                        console.log(emu.scenes)
                        emu.goto("sm_start")
                    }
                }
            ]
        }, {
            id: "level1",
            render(context, emu) {
                return `level1 道中`
            },
            inputs: [{
                label: "理智->灯光",
                exec(c, e) {
                    c.sanity -= 1;
                    c.light += 2;
                    if (c.sanity <= 0 || c.light <= 0) { console.log("emmm"); e.goto("level1_lost"); return; }
                }
            }, {
                label: "深入",
                exec(c, emu) {
                    c.sanity--;
                    c.light--;
                    c.depth++;
                    if (c.sanity <= 0 || c.light <= 0) { console.log("emmm"); emu.goto("level1_lost"); return; }
                    if (c.depth > 2) { emu.goto("level1_end"); return; }
                    if (Math.random() > 0.7) emu.goto("level1_end")
                }
            }],
            watch: ["light", "sanity"]
        }, {
            id: "level1_witch",
            render() {
                return `未知的小屋`
            },
            inputs: [
                { label: "歇一歇", exec(c) { c.light += 5, c.sanity += 5; } },
                { label: "继续", exec(c, e) { if (c.INT * Math.random() * 2 > 4) e.goto("level1") } }
            ]
        }, {
            id: "level1_end",
            render() {
                return "level1的终点。"

            },
            inputs: [
                {
                    label: "返回",
                    exec(c, e) {
                        e.goto("start")
                    }
                }
            ]
        }, {
            id: "level1_lost",
            render() { return "无论是丧失理智还是迷失方向，你都-逃不掉了。" },
            inputs: [{
                label: "重来",
                exec(c, e) {
                    e.goto("start")
                }
            }]
        }
    ].concat(sceneMansion)
}