function initContext(c) {
    c.pervpoint = 0;
    c.distance = 1;
    c.heartbeat = 70;
    c.aroused = 1;
    c.exhib = 1;
    c.striking = 0;
    return c;
}

class PublicArea {
    constructor(a) {
        Object.assign(this, a)
    }
    title;
    proximility = 10;
    description;
    tolerance = 10;
    events = [];
    enter(c) {
        c.areaType = "public",
            c.area = Object.create(this);
        return true;
    }
    leave() {
        c.areaType = null;
        c.area = null;
        return true;
    }
    drawEvent(c, e, info) {
        return this.events[Math.floor(this.events.length * Math.random()) - 1];
    }
}
class SiteArea {
    constructor(a) {
        //很多要重做
        Object.assign(this, a)
    }
    title;
    proximility = 10;
    description;
    tolerance = 10;
    events = [];
    enter(c) {
        c.areaType = "site",
            c.area = Object.create(this);
        return true;
    }
    leave() {
        c.areaType = null;
        c.area = null;
        return true;
    }
}
// function calcPervPoint(c) { return c.exhib * c.aroused; };
// let heartbeatHis = [];
// function calcHeartbeat(c) {
//     heartbeatHis.push(c.heartbeat);
//     return ((heartbeatHis[heartbeatHis.length - 1] ?? 70) + (heartbeatHis[heartbeatHis.length - 2] ?? 70)) / 2 + c.aroused + c.striking;
// };
// function calcExhib() { };

// function normalTime(c, act) {
//     //c是上下文，act是动静大小
//     c.pervpoint += calcPervPoint(c); c.heartbeat = calcHeartbeat(c);
//     calcExhib();
//     checkIfActEvents();
//     calcAroused();

// };
// function tickTime(c, act) {

// }
// function normalTimeEvent(c) {
//     //太过头了或者别的可能触发一些事件？
// }
class Action {
    type;
    static Reveal = 0;
    static Flash = 2;
    static Continuous = 3;

}
function dealAction(c, e, act) {
    if (act?.type === Action.Continuous) {
        let trydraw = c.area.drawEvent(c, e, act);
        if (trydraw) {
            trydraw.preact(c, e, act);
        } else { }
        calcstatus(c, e, act);
        if (trydraw) trydraw.act(c, e, act);
    } else if (act?.type === Action.Reveal) {
        let trydraw = c.area.drawEvent(c, e, act);

    } else if (act?.type === Action.Flash) {

    }
}
function pipe(label, arr) {
    return {
        label, exec(c, e, info) { for (let i of arr) { info = i(c, e, info); }; return info; }
    }
}
let com = new Proxy({}, {
    get(obj, prop) {
        return function () {
            return (c, e) => e[prop](...arguments)
        }
    },
    set() { return this; }
})
//com.goto<get returned>("prepare")
let log = "";
let start = {
    id: "start",
    render:(c,e,a)=> "干点坏事"+a,
    inputs: [pipe("来！", [initContext, com.goto("prepare")
    ])]
}
let prepare = {
    id: "prepare", title: "准备",
    render(c, e) {
        c.willArea = new PublicArea();
        return "nihao,[" + JSON.stringify(c.willArea) + "]"
    },
    inputs: [pipe("出门", [c => { c.willArea.enter(c); c.willArea = null; }, com.goto('publicArea')])]
}
let publicArea = {
    id: "publicArea", title: (c, e) => c?.pb?.title ?? "(empty)",
    render(c, e) {
        return `
        exhib:${c.exhib};striking:${c.striking};heartbeat:${c.heartbeat};distance:${c.distance};pervpoint:${c.pervpoint}
        ${log}`
    },
    inputs: [
        {
            label: "远点",
            exec(c, e) {
                c.distance++;
                // normalTime(c, 0);
                // normalTimeEvent(c);
            }
        }, {
            label: "驻留",
            exec(c, e) {
                log = "你稍作停留。。。";

                // normalTime(c, 0);
                // normalTimeEvent(c);

            }
        }, {
            label: "跟踪路人",
            exec(c, e) {
                e.goto("stalk")
            }
        }
    ]
}
let siteArea = {
    id: "siteArea", title: "现在，你不该来",
    render() { return "siteArea" },
    inputs: [{
        label: "返回", exec(c, e) {
            e.back();
        }
    }]
}
let stalk = {
    id: "stalk", type: "plot",
    render(c, e, i) {
        if (typeof i === "object") {
            i.num++;

            if (i.num < 4) return "你跟着它";
            console.log("time to return")
            if (Math.random() < 0.5) return { goto: "failed" }
            else return "它快察觉了"
        }
        if (i === Symbol.for("back")) return true;
        if (i === undefined) return "你瞄准了一个目标。。。"
        return "你跟着它"
    }
}
let failed = {
    id: "failed",
    render() { return "你被发现了。" },
    inputs: [{
        label: "再来",
        exec(c, e) {
            e.goto('start')
        }
    }]
}
export default {
    id: "perv",
    title: "PervWalker",
    scenes: [start
        , prepare
        , publicArea
        , siteArea, stalk, failed
    ]
}