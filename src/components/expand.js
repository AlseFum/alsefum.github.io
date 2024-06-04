export default function expand(n) {
    if (!n instanceof Object) return null;
    let direct_child = [], groups = [];

    if (n.required) n.required.forEach?.(el => {
        direct_child.push(ev(el, n));
    });

    const min = n.min ?? 0;
    const max = n.max ?? 1;
    const rate = 1 / (max - min);

    for (let i = 0; i < max; i++) {
        if (i > min) if (Math.random() > rate * (i - min)) break;
        direct_child.push(ev(n.options?.random?.(), n))
    }


    if (n.groups) Object.keys(n.groups).forEach(g => {
        if (Math.random() < (g.chance ?? 0.4)) {
            if (g.required) {
                g.required.forEach(i=>groups.push(i))
            }
            const min = g.min ?? 0;
            const max = g.max ?? 1;
            const rate = 1 / (max - min);
            for (let i = 0; i < max; i++) {
                if (i > min) if (Math.random() > rate * (i - min)) break;
                let r = g.options?.random?.()
                if (r !== null && r !== undefined){
                    groups.push(r)
                }

            }
        }
    })
    console.log(groups)
    return [direct_child, groups.map(el => ev(el, n))]
}
function ev(el, n) {
    if (!el?.startsWith?.("."))
        return Object.assign({}, n[el] ??n.groups[el] ??{});
    return null;
}
class Expandable {
    required
    label
    digest//not necessary
    options
    max
    min

    group//会一起出现。
    /*
    key:{required:[],label:,digest:,options:,neccsary?}
    */
    scope//?
}