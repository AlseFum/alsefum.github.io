import { World, Entity, Prop } from './statics.js'
import uh from '../util/uniquehex.js'
const uhgene = uh();
export const flatworld = new World();
flatworld.title = "FlatWorld"
flatworld.flexible = ["CHA", "DEX", new Prop({
    name: "ddd", render(n) {
        return "[]" + JSON.stringify(n) + "[]"
    }
})]
flatworld.stable = ["STR", "HP"]

export const JohnDoe = new Entity();
JohnDoe.new = function () {
    let ret = Object.create(this);
    ret.name = "JD" + Math.random();
    ret.hash = uhgene();
    return ret;
};
export const doom = new World()
doom.title = "DOOM"
doom.stable = ["HP", "VL"]
doom.flexible = ["Ammo", "KillCount"]
export const worldTemplates = [
    flatworld, doom
]
export const dangeru = new Entity();
dangeru.name = "Dangeru"
dangeru.HP = 12
export const entityTemplates = [
    dangeru, JohnDoe,
]
export const knightsim = new World({
    title: "女骑士模拟器（？）",
    stable: ["STR", "DEX", "INT", "CHM"],
})
knightsim.choosefor = function (e) {
    if (!e.orcseized) {
        return [
                [1, (e, wc, we) => {
                    if (Math.random() > 0.5) {
                        we.log("女骑士赢了");
                        wc.orcwined = true;
                    }
                    else {
                        e.orcseized = true;
                        we.log("女骑士被兽人打趴下，关起来了")
                    }
                }]
        ];
    }
    else {
        return [
            [0.2, (e, wc, we) => { we.log("女骑士逃出来了."); e.orcseized = false; }],
            [0.8, (_1, _2, e) => e.log("女骑士还在受折磨")]
        ]
    }
}
export const knight = new Entity({
    name: "knight",
    new() {
        let ret = Object.create(this);
        ret.STR = Math.floor(Math.random() * 10);
        ret.DEX = Math.floor(Math.random() * 10);
        ret.INT = Math.floor(Math.random() * 10);
        ret.CHM = Math.floor(Math.random() * 10);
        ret.hash = uhgene();
        return ret;
    },
    tick(wc, we) {
        let req = wc.choosefor(this);
        console.log(req,wc)
        if (req.length == 0) we.log("被撅了")
        else {
            //应该是概率，事件单项
            let sum = 0;
            for (let iter of req) {
                sum += iter[0]
            }
            sum *= Math.random();
            for (let iter of req) {
                sum -= iter[0];
                if (sum <= 0) {
                    iter[1](this, wc, we);
                    break;
                }
            }
        }
    }
});
worldTemplates.push(knightsim)
entityTemplates.push(knight)