import { Location } from "./lib"
export function simp1(n) {
    return () => new Location({
        id: n + Math.rand(256),
        label: n,
        options: ['start']
    })
}
function link(from, to, options, game) {
    let tol;
    if (typeof to === "function") {
        tol = to(options, game);
    } else {
        if (typeof to === "string") tol = game.map_record.get(to)
        if (!tol) return;
    }
    from.options.push(tol.id);
    game.map_record.set(tol.id, tol)
}
const cache = {}
export const daten = {
    start(_, game) {
        let ret = new Location({
            id: "Daten_entry" + [1, 2, 3, 4].random(),
            label: "Entry to Daten ",
            options: [
                { label: "终局", value: "ending", manual: true }],
            onDiscover(_, game) {
                console.log("discovered start")
                link(ret, daten.road, _, game)
            }
        })
        return ret
    },
    road(_, game) {
        return new Location({
            id: "Daten_road" + [1, 2, 3, 4].random(),
            label: "堕天城路",
            options: ['slum']
        })
    },
    centerarea: simp1("center"),
    industryarea: simp1('industry'),
    slum: function ({ lastLoc }, game) {
        if (!cache.slum) cache.slum = {}
        if (cache.slum[game.curKey]) return cache.slum[game.curKey]
        let res = new Location({
            id: "slum" + Math.rand(16),
            label: "slum",
            options: [{ label: 'start', value: "start", manual: false }]
        })
        cache.slum[res.id] = res
        return res

    },

    technicarea: simp1("technica"),
    redlightarea: simp1("redlight"),
    middlearea: simp1("middle"),
    transportarea: simp1("transport"),
    outerarea: simp1("outer")
    ,
    ending(_, game) {
        return new Location({
            id: "ending",
            label: "结束",
            options: ['start']
        })
    }
}