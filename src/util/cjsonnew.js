class scope extends Map {
    constructor(prior) {
        super();
        return new Proxy(this,
            {
                get(obj, prop) {
                    if (obj.get(prop) == undefined) return prior?.get(prop);
                    return obj.get(prop)
                },
                set(obj, prop, value) {
                    return obj.set(prop, value)
                }
            }
        )
    }
}
function branch(target,context={depth:0}){
    switch(typeof target){
        case "string":break;

        case "object":{
            
        };break;
        case "function":break;
        case "number":
        case "boolean":
        case "undefined":
        case "symbol":
        case "bigint":
        default:return target;
    }
}
export default branch;