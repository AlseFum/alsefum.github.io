export class Material{
    label;
    description="看样子没有什么描述";
    recipe=[];
    static Random(mg,ext){
        let ret=  new Material();
        ret.label=""
        for(let i =0;i<4;i++){ret.label+="0123456789ABCDEF"[Math.floor(Math.random()*16)]}

        let rate=0.8,cont=true;

        let drawFrom=mg.concat(ext);
        let resMap=new Map();
        while (cont&&drawFrom) {
            let topush=drawFrom[Math.floor(Math.random()*drawFrom.length)]
            if( topush ==undefined||topush == null) continue;

            resMap.set(topush.label??topush,
                (i=>i>1?i:1)
                (Math.ceil(rate*10*Math.random())))
            if((Math.random()>rate))cont=false;
            rate-=0.8*Math.random();
        }
         ret.recipe=Array.from(resMap);
        
        return ret;
    }
}
function increase(map,prop,num){
    map.set(prop,(map.get(prop)??0)+num)
}
export class Idle{
    basicPoint=BigInt(0)
    blocks=[]
    materialAmount=new Map();
    materialList;
    constructor(){
        let mag=[]
        for(let iter=0;iter<3;iter++){
            mag.push(Material.Random(mag,["basicPoint"]))
        }

        mag.forEach(i=>{
            this.materialAmount.set(i.label,0)
        })
        this.materialList=mag;
    }
    tick(){
        this.blocks.forEach(i=>{
            if(i.type===Block.produce){
                if(i.materialType==="basicPoint"){
                    this.basicPoint+=BigInt(i.tickAmount);
                }else
                increase(this.materialAmount,i.materialType,i.tickAmount);
            }else if(i.type===Block.functional){
                i.onTick(this);
            }
        })
    }
    click(){
        this.blocks.forEach(i=>{
            if(i.type===Block.produce){
                
            }else if(i.type===Block.functional){
                i.onClick(this);
            }
        })
    }
    newBlockPd(str){
        this.basicPoint=this.basicPoint-BigInt(10);
        
        this.blocks.push(new BlockPd(str))
    }
}
export class Block{
    static produce=Symbol();
    static functional=Symbol();
}
export class BlockFn extends Block{
    type=Block.functional;
    onClick(){};
    onTick(inst){
        inst.basicPoint++;
    };
    slots=[];
    units=[];
    tags=[];
}
export class BlockPd extends Block{
    type=Block.produce
    materialType;
    constructor(str){
        super();
        this.materialType=str??"basicPoint";
    }
    tickAmount=1;
    slots=[];
    units=[];
    tags=["tag_exp"];
}
export class Slot{
    /**
     * 放Unit的？不，放upgrade的
     */
}
export class Unit{

}