import { Location } from "./lib"
export function simp1(n) {
    return () => new Location({
        id: n + Math.rand(256),
        label: n,
        options: ['start']
    })
}
export const daten = {
    start(_, game) {
        return new Location({
            id: "Daten_entry" + [1, 2, 3, 4].random(),
            label: "Entry to Daten",
            options: [{ label: "ending", value: "ending", manual: false },
                'centerarea', 'industryarea', 'slum',
                'technicarea', 'redlightarea', 'middlearea', 'transportarea', 'outerarea'
            ]
        })
    },
    road(_, game) {
        return new Location({
            id: "Daten_road" + [1, 2, 3, 4].random(),
            label: "堕天城路",
            options: []
        })
    },
    centerarea: simp1("center"),
    industryarea: simp1('industry'),
    slum: simp1('slum'),

    technicarea: simp1("technica"),
    redlightarea: simp1("redlight"), 
    middlearea: simp1("middle"),
    transportarea:simp1("transport"),
    outerarea:simp1("outer")
    ,
    ending(_, game) {
        return new Location({
            id: "ending",
            label: "结束",
            options: ['start']
        })
    }
}