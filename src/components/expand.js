export default function(n){
    let n1=Object.assign({},n);
    n1.label+=Math.rand(18)+"_"
    let n2=Object.assign({},n);
    n2.label+=Math.rand(18)+"_"
    return [n1,n2]
}