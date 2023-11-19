let start = {
    id: "start",
    title: "开始",
    inputs:[{
        label:"来吧",
        exec(c,e){
            startFunc(c);
            c.x=0;
            c.y=0;
            e.push("main");
        }
    }]
}
function startFunc(c) {
    let map1 = [];
    for (let i = 0; i < 10; i++) {
        let map2 = [];
        for (let j = 0; j < 10; j++) {
            map2.push([Math.floor(Math.random() * 3),//类型
                 Math.floor(Math.random()*2),//右
                  Math.floor(Math.random()*2),//下
                   Math.floor(Math.random()*2),//左
                    Math.floor(Math.random()*2),//上
                ]);
        }
        map1.push(map2);
    }
    c.map=map1;
}
function move(c,direction){
    c.hint="moving"
    switch (direction){
        case 0:
            if(c.x<9)c.x++;break;
        case 1:
            if(c.y<9)c.y++;break;
            
        case 2:
            if(c.x>0)c.x--;break;
        case 3:
            if(c.y>0)c.y--;break;
    }
}
let main = {
    title: "main",
    id: "main",
    render(c,e){
        return `${c.x},${c.y}<br/>${c.hint?c.hint:""}
        上：${c.map[c.x][c.y][4]?"×":"√"}
        
        左：${c.map[c.x][c.y][3]?"×":"√"}          右：${c.map[c.x][c.y][1]?"×":"√"}
        
        下：${c.map[c.x][c.y][2]?"×":"√"}
        `
    },
    inputs: [
        {label:"向上",exec(c,e){move(c,3)},disabled:c=>c.y<=0&&c.map[c.x][c.y][4]==0},
        {label:"向右",exec(c,e){move(c,0)},disabled:c=>c.x>9&&c.map[c.x][c.y][1]==0},
        {label:"向下",exec(c,e){move(c,1)},disabled:c=>c.y>9&&c.map[c.x][c.y][2]==0},
        {label:"向左",exec(c,e){move(c,2)},disabled:c=>c.x<=0&&c.map[c.x][c.y][3]==0},
        {label:"看地图",exec(c,e){e.push("bigmap")}}
    ]
}
let sign=function(right,down,left,up){

    return  "┼┬├┌┴─└┄┤┐│┆┘┄┆ "[right*8+down*4+left*2+up]
}
let bigMap={
    id:"bigmap",
    render(c){
        let ret=""
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                let plus=sign(c.map[i][j][1],c.map[i][j][2],c.map[i][j][3],c.map[i][j][4])
                if(plus==undefined)console.log("un",c.map[i][j][1],c.map[i][j][2],c.map[i][j][3],c.map[i][j][4])
                ret+=plus;
            }
            ret+="<br/>"
        }
        return ret
    },
    inputs:[{label:"回去",exec(c,e){e.back()}}]
}
export default {
    id: "haustedstreet",
    title: "鬼街",
    scenes:[start,main,bigMap]
}